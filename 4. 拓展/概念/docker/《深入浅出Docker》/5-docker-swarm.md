# Docker Swarm，规模集群策略

swarm有两个核心组件：安全集群、编排引擎

## 基本概念

Docker swarm是docker集群的一个方案

每一台docker主机都可以选择加入一个swarm集群或者自己创建一个swarm集群，这样这台主机就成了集群中的一个节点

节点分成管理节点和工作节点。几乎所有的docker swarm命令只能是由管理节点执行，工作节点可以执行docker swarm leave命令来离开集群；

每个集群中只有一个管理节点可以成为leader，使用raft协议。

### 服务和任务

swarm最小调度单位是任务（task），目前可以指单一的容器；

服务指的是一组任务的集合，服务有两种模式：

* replicated services，按照一定规则，在各个工作节点上，运行指定个数任务；
* global services，每个工作节点运行一个任务；

## [raft协议](https://zhuanlan.zhihu.com/p/27207160)

...

## 