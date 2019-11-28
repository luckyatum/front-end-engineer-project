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
