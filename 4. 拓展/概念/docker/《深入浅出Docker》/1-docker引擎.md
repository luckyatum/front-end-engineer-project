# 【深入浅出docker】第5章-Docker引擎

## Docker引擎-简介

Docker引擎可以理解为VMware的ESXi角色

Docker构成部分：Docker客户端（Docker client）、Docker守护进程（Docker daemon）、containerd以及runc。它们共同负责容器的构建和运行

## Docker引擎-详解

Docker首次发布时，Docker引擎由两个核心组件构成：LXC和Docker daemon；

Docker daemon是一个单一二进制文件，包含了Docker客户端、Docker API、容器运行时、镜像构建等功能；

LXC提供了跟操作系统打交道的功能，如命名空间（Namespace）和控制组（CGroup）等基础工具操作能力；

### 摆脱LXC

对LXC的依赖自始至终都是一个问题；

1. LXC是依赖于linux平台的，对于跨平台不友好；
2. 如此核心组件依赖于外部工具（LXC），会给项目带来巨大风险，影响其发展；

因此Docker公司开始了名为Libcontainer的自研工具，用于替代LXC；

Libcontainer工具的主要目的：成为与平台无关的工具，可基于不同内核为Docker上层提供必要的容器能力；

### 摒弃大而全的Docker daemon

整体性带来了更多的问题：难以变更、越来越慢等；

Docker公司开始了拆解这个大而全的Docker daemon的工程，主要目标是尽可能拆解出其中的功能特性，并用小而专的工具实现它；

这些小工具是可以替换的，并且可以被第三方拿去构建其他工具；

下面是Docker新版架构

Docker client -> Docker daemon（提供API等功能）-> containerd（容器支持，pause|stop|start）-> shim（启动无守护进程容器）-> runc（容器运行时）-> 容器

### 开放容器计划（OCI）

OCI定义了两个规范：

* 镜像规范；
* 容器运行时规范；

Docker公司参与了标准的制定，并尽可能实现了OCI规范；默认情况下，Docker使用runc来实现这一点；runc是OCI容器运行时标准的实现；

Docker引擎中的containerd组件确保了Docker镜像能够以正确的OCI Bundle的标准格式传递给runc;

### runc

runc实际上是一个轻量级的、针对libcontainer进行了包装的命令行交互工具；（libcontainer取代了早期Docker架构的LXC）;

runc是OCI容器运行时标准的实现；

runc生来只有一个作用——创建容器；实质上是一个独立的容器运行时工具，可以直接下载它或基于源码编译二进制文件都可以使用runc；但是它只是一个基础工具，不具备类似Docker引擎所具备的丰富功能；

有时候也将runc层称为"OCI层"。

### containerd

对Docker daemon进行拆解后，所有的容器执行逻辑被重构到一个containerd工具中，它的主要任务是容器的生命周期管理——start | stop | pause | ...；

containerd在linux和windows下以daemon方式运行；在Docker引擎技术栈中，位于daemon和runc所在的OCI层之间；

containerd一开始只用于容器的生命周期管理，后面给containerd添加了镜像管理等功能，为了便于在其他项目中使用它，这些功能都是模块化、可选择的；

## 启动一个新的容器

常用的启动一个容器的方法：

```shell
docker container run --name ctrl -it alpine:latest sh
```

当使用Docker命令行工具执行上述命令的时候，Docker客户端会将其转换为合适的API格式，并发送到正确的API端点；

API是在daemon中实现的；

一旦daemon接收到创建新容器的命令，它就会向containerd发出调用，daemon已不再包含任何创建容器的代码；

daemon使用一种CRUD风格的API，通过gRPC和containerd通信；

containerd接收到创建容器命令，但是它并不负责创建容器，而是指挥runc去做，containerd将Docker镜像转换成OCI bundle，并让runc基于此去创建一个容器；

然后，runc与操作系统内核接口通信，基于所有必要的工具（Namespace、CGroup等）来创建容器；

容器进程作为runc的子进程启动，启动完毕后，runc将会退出；

## 该模型的显著优势

将所有用于启动、管理容器的逻辑和代码从daemon移除，意味着容器运行时和Docker daemon是解耦的，有时称之为“无守护进程的容器”（daemonless container），这样对Docker的日常维护和更新就不会影响到容器的运行；

旧模型中，所有的容器运行时的逻辑都在daemon中，启动和停止daemon都会导致宿主机上的运行中的所有容器被杀死，噢！这太糟糕了！～

## shim

shim是实现无daemon的容器不可或缺的工具；

containerd通过指挥runc来创建新容器，事实上，每次创建容器它都会fork一个新的runc实例，一旦容器创建完毕，对应的runc进程就会退出，因此即使运行上百个容器也无须保持上百个运行时的runc实例；

一旦容器进程的父进程runc退出，相关联的containerd-shim进程就会成为容器的父进程，其职责如下：

* 保持所有的STDIN和STDOUT流是开启状态，从而当daemon重启的时候，容器不会因为管道的关闭而终止；
* 将容器的退出状态反馈给daemon;
