# [WebAssembly完全入门——了解wasm的前世今身](https://juejin.im/post/5be293daf265da616c65157e)

## webAssembly是什么

    WebAssembly是一个可移植、体积小、加载快并且兼容web的全新格式。

## 编译目标

WebAssembly的可写性和可读性很差，因为它不是一行一行代码打出来的，而是一个编译目标；也就是webAssembly是经过编译之后出来的文件；

## webAssembly的由来

### 性能瓶颈

javascript语言没有静态变量类型，导致代码量大、复杂度高的项目中效率低下；

### 静态变量类型带来的问题

js引擎解析过程：

* js文件被下载下来；
* 进入parser，生成ast；
* byteCode compiler根据ast生成引擎能够直接阅读、执行的字节码；
* 字节码进入翻译器，将字节码一行行翻译成效率十分高的machine code；

引擎会将执行较多的function优化，将其编译成machine code后打包到顶部的just-in-time Compiler（JIT），下次再执行这个函数，就会直接执行编译好的machine code。但是由于js的动态变量，上一秒可能是array，下一秒就可能是object，那么上一次引擎的优化就失去了作用。

### asm.js--webAssembly的前身

asm.js是js的一个严格子集，它只包含两种变量类型：32位的整形和64位的浮点型；

合理合法的asm.js一定是合理合法的javascript，反过来不成立；

和webAssembly一样，asm也是一个编译目标，并不是一行行写的；

    ```js
    function asmJs() {
        'use asm';

        let myInt = 0 | 0;
        let myDouble = +1.1;
    }
    ```

### asm.js不能解决所有的问题

asm.js对静态类型做得再好，始终逃不过要经过parser和byteCode Compiler，这两步是js解析过程最耗时的步骤，而webAssembly可以跳过这两步，这也是为什么webAssembly比asm.js更快的原因；

### webAssembly横空出世

2015年，我们迎来了webAssembly。webAssembly是经过编译器编译之后的代码，体积小，起步快，语法上脱离javaScript，同时具有沙盒化的执行环境。webAssembly同样的强制静态类型，是c/c++/Rust的编译目标。

## webAssembly优势

1. 性能优于asm.js；
2. 性能几乎是js的两倍；

## webAssembly的大型应用

1. AutoCAD

    一个用于画图的软件，由于底层是c++实现的，所以一直无法发布浏览器版本的应用。webAssembly出现后，直接将AutoCAD的源码编译成webAssembly，同时性能得到了很大的提升。

2. 谷歌地图

    因为需要展示很多3D图像，所以对性能的要求很高，所以采取了一些native的技术。

3. unity和unreal游戏引擎

## webAssembly和javascript的关系

两者是协作关系，webAssembly是javascript的一个补充和完善，并不能取代js。

## 使用webAssembly的时机

* 对性能要求很高的App/Module/游戏；
* 在web中使用C/C++/Rust/Go的库，例如要实现web版本的ins或者facebook,想要提高效率，就可以把其中对图片进行压缩、解压缩、处理的工具，用c++实现，然后再编译回webAssembly；

## 几个webAssembly的开发工具

* AssemblyScript。支持直接将ts编译成webAssembly；
* Emscripten。编译器，将其他的高级语言，编译成webAssembly；
* WABT。将webAssembly在字节码和文本格式相互转换的工具；

## webAssembly的意义

* 给了web更好的性能；
* 给了web更多的可能；

## 实操（省略...）
