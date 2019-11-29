# 【深入浅出docker】第7章-Docker容器

## Docker容器-简介

容器是镜像的运行时实例；

用户可以从单个镜像上启动多个容器，虚拟机和容器的最大区别是容器更快并且更加轻量——容器会共享其所在主机的操作系统和内核；

启动容器的命令是：docker container run；该命令可以携带很多参数；

docker container run <image> <app>；指定了所需的镜像和要运行的应用，如：

docker container run -it ubuntu /bin/bash则会启动某个Ubuntu Linux容器，并运行Bash Shell作为其应用；-it参数表示将当前终端连接到容器的shell之上；

容器随着应用的退出而终止，上述ubuntu容器会随着bash shell退出后终止；

使用docker container stop命令可以手动停止容器运行；使用docker container start可以再次运行停止的容器；使用docker container rm可以删除容器；

## Docker容器-详解

### 容器 vs 虚拟机

容器和虚拟机都依赖宿主机才能运行；

虚拟机模型中，首先要开启物理机并启动Hypervisor引导程序，一旦Hypervisor程序启动，就会占有机器上的全部物理资源，然后将这些资源划分给虚拟资源，看起来和真实资源无异；

然后Hypervisor会打包资源进入一个叫做虚拟机的软件中，这样用户就可以使用这些虚拟机，并在其中安装操作系统和应用；

所以，如果先要在物理机上运行四个应用，就需要在Hypervisor上创建四个虚拟机并安装4个操作系统，然后安装4个应用；

容器模型中，服务器启动之后，所选择的操作系统会启动，OS层也会占用了全部的硬件资源，在OS层之上，需要安装容器引擎（即Docker），容器引擎可以获取系统资源，比如进程树、文件系统以及网络栈等，然后将资源分割为安全的互相隔离的资源结构，称为容器；

每个容器就像是真实的操作系统，在其内部可以运行应用；所以，如果要在物理机上运行四个应用，就需要划分四个容器，每个容器上运行一个应用；

更高层面来讲，虚拟机是硬件虚拟化，Hypervisor将硬件物理资源划分为虚拟资源；容器是操作系统虚拟化，容器将系统资源划分为虚拟资源；

### 虚拟机的额外开销

Hypervisor模型的主要问题；

首先我们目标是在一个物理机器上运行4个业务相关的应用，两种模型都安装了一个操作系统或者Hypervisor。

虚拟机模型将底层硬件资源划分到虚拟机中，每个虚拟机都是包含了虚拟CPU、虚拟RAM、虚拟磁盘等资源的一种软件结构，因此每个虚拟机都需要有自己的操作系统来声明、初始化和管理这些虚拟资源，但是每一个操作系统都是有额外的开销的；

容器模型则是所有的容器共享一个操作系统，这意味着只有一个操作系统消耗CPU、RAM和存储资源；也就是只有一份OS消耗；

另一个值得注意的就是启动时间，因为容器并不是完整的操作系统，所以其启动要远比虚拟机快。唯一对容器启动有影响的就是容器内应用的启动时间；

综上所述，容器比在虚拟机模型上可以使用更少的资源运行更多的应用，启动更快，并且支付更少的授权和管理费用；

### 运行的容器

通常登陆Docker主机后的第一件事情就是检查docker是否在运行；

$ docker version用于查看主机上的Docker版本信息；

启动一个简单的容器：docker container run -it ubuntu:latest

在敲击回车键后，Docker客户端会选择合适的API来调用Docker daemon，Docker daemon接收到命令并搜索Docker本地缓存，观察是否有命令所请求的镜像，没有的话，会检查Docker Hub中是否存在该镜像，找到后拉取到本地；

镜像拉取完毕后，daemon就创建容器并在其中运行指定的应用；

### 容器进程

启动Ubuntu容器之时，让容器运行Bash Shell，这使得Bash Shell成为容器内运行的且唯一运行的进程；可以通过ps -elf命令在容器内查看；

这意味着如果通过输入exit来退出Bash Shell进程，那么容器也会退出；原因是容器如果不存在任何进程则无法存在；

Ctrl PQ组合键可以退出容器但不终止容器的运行，这样会切回Docker主机的终端，并保持容器在后台运行；可以使用docker container ls命令来观察当前正在运行的容器列表；

通过docker container exec命令将终端重新连接到Docker；

**注：通过命令docker container exec -it containerID bash重新运行的容器，会存在两个bash进程，所以即使在终端内执行exit退出进程，也不会使得容器停止运行，因为还存在一开始的bash进程。**

使用docker container stop containerID和docker container rm containerID来停止和删除容器；

### 容器生命周期

人们认为容器不擅长做持久化工作或者持久化数据，噢！天呐，这是多么的愚蠢～

下面是一个容器从创建、运行、休眠，直到销毁的过程

$ docker container run --name percy -it ubuntu:latest /bin/bash

创建新的容器，名称为“percy”；

接下来把容器投入使用，把一部分数据写入其中；

root@880bd3505b50:/# cd tmp
root@880bd3505b50:/tmp# ls -l
total 0
root@880bd3505b50:/tmp# echo "DevOps FTW" > newfile
root@880bd3505b50:/tmp# ls -l
total 4
-rw-r--r-- 1 root root 11 Nov 29 07:11 newfile
root@880bd3505b50:/tmp# cat newfile
DevOps FTW

接下来使用Ctrl PQ组合键退出容器，然后使用docker container stop命令停止容器运行；

~ docker container stop 880bd3505b50
880bd3505b50
~ docker container ls
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

可以看到停止运行的容器不会出现在上面，加上-a参数可以查看所有的容器，包括停止运行的容器；

~ docker container ls -a
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS                        PORTS               NAMES
880bd3505b50        ubuntu:latest        "bash"                   5 minutes ago       Exited (0) 2 minutes ago                          percy

尽管容器已经停止运行，但是容器的全部配置和内容仍然保存在Docker主机中，可以随时重新启动；

~ docker container start percy
percy
~ docker container ls
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
880bd3505b50        ubuntu:latest       "bash"              9 minutes ago       Up 9 seconds                            percy

重新运行容器并进入容器；

~ docker container exec -it percy bash
root@880bd3505b50:/# cd tmp
root@880bd3505b50:/tmp# ls -l
total 4
-rw-r--r-- 1 root root 11 Nov 29 07:11 newfile
root@880bd3505b50:/tmp# cat newfile
DevOps FTW

上面可以看到数据仍然存在，这表示停止容器运行并不会损毁容器或者其中的数据；

下面把容器删除，使用Ctrl PQ组合键退出终端；

~ docker container stop percy
percy
~ docker container rm percy

容器删除后，如果该容器是一个有用的容器，则可以作为无服务的工具使用，如果没有用处，则就是一个蹩脚的终端；

