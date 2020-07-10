# [MVVM与MVC设计模式区别...](https://juejin.im/post/5ceb4a2ef265da1b6f435291)

## MVC概念

一般MVC分为Model(模型)、View(视图)、Controller(控制器)。View指令被送到Controller，Controller完成业务逻辑后改变Model状态，Model将新的数据发送至View，用户得到反馈。

## MVVM概念

View的变化会自动更新到ViewModel，ViewModel的变化也会自动同步到View上，通过数据来驱动图层。

## MVVM模式的优缺点

* 优点

  * 低耦合：View可以独立于Model变化和修改，一个ViewModel可以绑定到不同的View上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
  * 可重用性：可以把一些视图逻辑放在一个ViewModel里面，让很多View重用这段逻辑。
  * 独立开发：开发人员可以专注于业务逻辑和数据的开发，设计人员可以专注于页面的设计。
