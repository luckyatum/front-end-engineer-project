# 【深入浅出docker】第6章-Docker镜像

## Docker镜像-简介

Docker镜像可以理解为类（class）；

用户需要先从镜像仓库（如：Docker Hub）拉取镜像，然后使用该镜像启动一个或者多个容器；

镜像由多个层组成，每层叠加之后，外界看来就是一个独立的对象。镜像内部是一个精简的操作系统，同时包含应用运行所必须的文件和依赖包。镜像通常都比较小。

## Docker镜像-详解

镜像就像停止运行的容器（类）。

实际上，用户可以停止某个容器的运行，并从中创建新的镜像。

### 镜像和容器的关系

镜像可以理解为构建时结构，容器则是运行时结构。

使用docker container run和docker service create命令从某个镜像中启动一个或多个容器；

在镜像上启动的容器全部停止之前，是无法删除该镜像的。

### 镜像通常比较小

容器的目的是运行应用或者服务，意味着镜像中必须包含应用/服务运行所必须的操作系统和必要文件；

但是，容器又追求快速和小巧，所以构建镜像时通常需要裁掉不需要的部分；

### 拉取镜像

安装完Docker后，本地仓库还没有镜像，需要从远端拉取镜像；

拉取命令: docker image pull xx:latest

查看本地镜像命令：docker images | docker image ls

### 镜像仓库服务

镜像存储在镜像仓库服务（Image Registry）中，可配置，默认使用Docker Hub；

镜像仓库服务包括多个镜像仓库（Image Repository），同样，一个镜像仓库中包含多个镜像。

大部分流行的操作系统和应用在Docker Hub的官方仓库中都有其对应镜像。

### 镜像命名和标签

只需要给出镜像的名字和标签，就能在官方仓库中定位一个镜像。

下面是拉取镜像的几种情况：

$ docker image pull mongo:3.3.11
// 该命令会从官方mongo库拉取标签为3.3.11的镜像

$ docker image pull redis:latest
// 该命令会从官方redis库拉取标签为latest的镜像

$ docker image pull alpine
// 该命令会从官方alpine库拉取标签为latest的镜像

如果镜像后面没有指定具体的版本，默认会拉取latest版本的代码；

latest版本的镜像不代表是最新的镜像；

### 过滤docker image ls的内容

使用--filter参数来过滤镜像内容

docker image ls --filter dangline=true

上面语句只会返回(dangling)镜像，也就是那些没有tag的镜像；

通常出现这种镜像的原因是构建了一个新镜像，然后为该镜像打了一个已经存在的标签。这时候Docker会移除旧镜像上面的标签，然后为新镜像打上该标签，所以旧镜像就变成了dangling镜像（悬虚镜像）；

docker image prune命令可以移除所有的dangling镜像；

目前Docker支持的过滤器：

* dangling: 指定true或者false，即返回悬虚镜像或者返回非悬虚镜像；
* before：需要镜像名称或者ID作为参数，返回在之前被创建的全部镜像；
* since：需要镜像名称或者ID作为参数，返回在之后被创建的全部镜像；
* label：根据label的值对镜像进行过滤；

其他过滤方式可以使用reference；

$ docker image ls --filter reference="*:latest";

上面命令返回所有的latest镜像；

用户也可以使用--format参数，利用GO模版对输出内容进行格式化，如：

$ docker image ls --format "{{.size}}"

该命令只返回镜像大小属性;

### 通过cli方式搜索Docker Hub

docker search命令允许通过cli方式搜索Docker Hub，如：

$ docker search nigelpoulton

上面命令会返回所有NAME属性是"nigelpoulton"镜像的数据;

### 镜像和分层

Docker镜像由一些松耦合的制度镜像层组成；

Docker负责堆叠这些镜像层，并将它们表示为单个统一的对象；

查看镜像分层的方式有两种：

一种是docker image pull命令时候，命令行输出的多行pull complete就表示一个分层；

另一种是使用docker image inspect，直接输出其中的镜像分层；

所有docker镜像起始于一个基础镜像层，进行修改或者增加新内容时，会在当前镜像之上，新增一层镜像；

docker镜像会保证包含了所有的文件，如果某一层镜像的文件内容是上一层的更新版本，那么最后输出的文件就只会有最新版的文件；

### 共享镜像层

Docker会把那些相似度较高的镜像层共享，在用户拉取新的镜像时候，如果监测到本地的镜像中已经有某个镜像层，就会提示already exist，用于提升性能和节省空间；

### 根据摘要拉取镜像

镜像的标签是可变的，意味着可能会出现打错标签，或者给镜像打一个已经存在的标签；

场景还原：生产环境的镜像v1.5出现了bug，你拉取了1.5版本的镜像修复了该bug并且重新打了个1.5的标签后推了上去，此时会出现的情况是生产环境还遗留了很多正在运行的容器，无法分辨哪个镜像是没有问题的，因为两个镜像标签一样；

上述问题，就需要用到摘要（image digest）来解决了；

image digest其实是基于镜像内容的散列值，由于它是基于内容的，所以一旦内容有变更，摘要是一定会变化的；

在docker image pull命令中添加--digest参数可以在本地查看摘要信息；

### 多层架构的镜像

当添加了更多的平台和架构之后，用户发现，在拉取镜像并运行之前，需要考虑镜像是否与当前环境的架构匹配，这破坏了Docker的流畅体验；

多架构镜像就是为了解决这个问题而诞生的；

多架构镜像意味着某个镜像仓库标签下的镜像可以同时支持64位linux、PowerPC Linux、64位windows等架构；

@todo 原理...

### 删除镜像

$ docker image rm命令从Docker主机删除该镜像，删除镜像会删除主机上的镜像和镜像层，但是如果一个镜像层被多个镜像共享，那么只有删除了所有使用该镜像层的镜像，才会删除该镜像层；

删除镜像前，需要停止所有基于该镜像运行的容器；

一种快捷删除镜像的方式就是，docker image rm命令中传入所有的镜像id，通过docker image ls -q获取镜像id列表，然后作为参数传入rm命令中；

$ docker image rm (docker image ls -q) -f

## 镜像命令总结

* docker image pull是下载镜像的命令；
* docker image ls列出本地所有镜像，通过--digest参数来查看镜像签名；
* docker image inspect命令查看镜像的细节，包括镜像层和元数据；
* docker image rm用于删除镜像；
