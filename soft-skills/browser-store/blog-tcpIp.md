# [TCP/IP详解学习笔记](https://www.jianshu.com/p/ef892323e68f)

* TCP/IP协议是一个协议簇,包含HTTP协议,IP协议,TCP协议,ftp协议...
![TCP分层2.jpg](https://upload-images.jianshu.io/upload_images/2964446-1fd7a0f3216c0530.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/284/format/webp)
* TCP/IP层次结构
  * 应用层(FTP,TELNET等),向用户提供一组常用的应用程序
  * 传输层(TCP-可靠传输，UDP-不可靠传输)，格式化信息流，提供可靠传输
  * 网络层(IP协议)，负责相邻计算机之间的通信，包括处理来自传输层的分组发送请求，收到请求后，把数据装入ip数据报，填充报头，将数据报发往网络接口；处理输入数据报，检查其合法性，寻径-如果数据报已经到达，则去掉报头，剩下部分交给适当的传输协议，如果尚未到达，则转发该数据报；处理路径，流控，拥塞问题
  * 网络接口层，TCP/IP最底层，接受IP数据报并通过网络发送，或者从网络接受物理帧，抽出IP数据报，交给IP层；
* TCP三次握手
  * client将SYN置1，随机产生一个值seq=J，然后发送给server，client进入syn_send状态，等待server确认
  * server收到SYN=1知道client请求建立连接，server将SYN和ACK位置1，ack=J+1,随机产生一个值seq=K,将数据包发送给client确认连接请求，server进入syn_rcvd状态
  * client收到确认后，检查ack是否为J+1，ACK是否为1，正确的话则将ACK置为1，ack=K+1，并将数据包发送给server，server检查ack是否为K+1，ack是否为1，正确的话则连接建立成功，client和server进入ESTABLISHED状态；
* 四次挥手
  * 当一方完成数据发送任务后，发送一个FIN来终止该方向的连接；
  * client发送一个FIN，用来关闭client到server的数据传送，client进入FIN_WAIT_1状态；
  * server收到FIN后，发送一个ack=FIN序号+1给Client，server进入close_wait状态；
  * server发送一个FIN，关闭server到client的数据传送，server进入last_ack状态；
  * client收到FIN后，client进入time_wait状态，接着发送一个ack给server，server进入closed状态，关闭连接；(这里client进入time_wait状态而不是直接关闭连接，是因为需要保证server端接收到自己最后一个发送的ack确认关闭信息，否则服务端可能会因为网络原因没接收到报文而重发，然后客户端又关闭了连接，服务端会出错；同时还保证了server端剩余的报文已经被client接收到，所以time_wait存在的时间为2MSL，即最大报文段生存时间)