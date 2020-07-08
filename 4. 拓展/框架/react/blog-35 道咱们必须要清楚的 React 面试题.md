# [35 道咱们必须要清楚的 React 面试题](https://juejin.im/post/5dc20a4ff265da4d4e30040b)


1. 什么是虚拟DOM?

    虚拟DOM是真实DOM在内存中的表示。UI的表示形式保存在内存中，并与实际的DOM同步；

2. 类组件和函数组件之间的区别是啥？

    * 类组件可以使用其他特性，如状态state和生命周期钩子；
    * 当组件只是接收props渲染到页面时，就是无状态组件，就属于函数组件；

    函数组件性能要优于类组件，因为类组件使用的时候要实例化，而函数组件直接执行函数返回结果；

3. React的refs干嘛的？

    refs提供了一种访问在render方法中创建的DOM节点和元素的方法。在典型数据流中，props是父子组件交互的唯一方法，想要修改子组件，需要使用新的props重新渲染它；

    如果想要在典型数据流外修改子组件，可以使用refs；

    可以在组件添加一个ref属性，属性的值是一个回调函数，接收作为其第一个参数的底层DOM元素或组件的挂载实例；

    ```js
      class UnControlledForm extends Component {
        handleSubmit = () => {
          console.log("Input Value: ", this.input.value)
        }
        render () {
          return (
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                ref={(input) => this.input = input} />
              <button type='submit'>Submit</button>
            </form>
          )
        }
      }
    ```

    input元素有一个ref属性，它的值是一个函数；该函数接收输入的实际DOM元素，然后将其放在实例上；这样可以在handleSubmit的函数中访问它；

    经常被误解的只有在类组件中才能使用refs，但是refs可以