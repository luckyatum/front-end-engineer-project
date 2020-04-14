# [[译] 理解 React Render Props 和 HOC](https://juejin.im/post/5c1f8ded6fb9a049b506ce94)

## 为什么我们需要这些模式

    React提供了一种简单的组件复用方式，即组件。组件可以很方便地将我们的逻辑分享出来，供其他人或者其他项目复用。

## 栗子

    假设我们在开发一个电子商务应用程序，应用提供商品展示、添加购物车功能。我们将从api获取商品列表，并将商品目录展示在为卡片列表。

    React组件实现：

    ```js
        import React from 'react';

        class ProduceList extends React.Component {
            state = {
                products: []
            };

            componentDidMount() {
                getProducts().then(products => {
                    this.setState({ products });
                })
            }

            render() {
                return (
                    <ul>
                        {
                            this.state.products.map(product => (
                                <li>
                                    <span>{product.name}</span>
                                    <a href="#">Add to Cart </a>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        }

        export { ProduceList };
    ```

    对于管理员，我们有一个管理门户，可以在其中添加或者删除商品，在该页面中，我们从同一个api获取商品数据，并以表格形式显示商品目录。

    ```js
        import React, { Component } from 'react';

        class ProductTable extends Component {
            state = {
                products: []
            };

            componentDidMount() {
                getProducts().then(products => {
                    this.setState({ products });
                });
            }

            handleDelete = currentProduct => {
                const remainingProducts = this.state.products.filter(product => {
                    product.id !== currentProduct.id;
                });
                deleteProducts(currentProduct.id).then(() => {
                    this.setState({ products: remainingProducts });
                });
            }

            render() {
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            <button onClick={() => this.handleDelete(product)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                );
            }
        }

        export { ProductTable }
    ```

    很显然，这两个页面都实现了商品数据获取逻辑；

    继续深入，以下情况也很有可能发生：

* 我们必须使用商品数据并以不同方式显示它；
* 从不同的产品API获取商品数据（在用户的购物车页面中很有用），但数据的显示和ProductList很类似；
* 我们必须从localStorage中访问它，而不是从api中获取数据；
* 在商品目录中，需要使用具有不同操作的按钮而不是删除按钮；

如果我们为每一个不同的点编写一次代码，那么我们将要复制大量代码；

获取数据和显示数据是两个独立关注点，正如一个组件只负责一个职责一样，我们把上述组件重构；

第一个组件，它接受商品数据为属性，并像之前一样把商品目录渲染成卡片列表。函数式组件写法如下：

    ```js
        import React from 'react';

        const ProductList = ({ products }) => {
            return (
                <ul>
                    {
                        products.map(product => {
                            <li key={product.id}>
                                <span>{product.name}</span>
                                <a href="#">Add to Cart</a>
                            </li>
                        });
                    }
                </ul>
            )
        }
    ```

上面组件接受products为属性，并把数据渲染到表的行中去；

现在我们创建一个名为ProductData的组件，它从api中获取数据，数据的获取和状态的更新将和原先的ProductList组件一样，但是render方法应该放入什么呢？

    ```js
        import React, { Component } from 'react';

        class ProductData extends Componet {
            state = {
                products: []
            };

            componentDidMount() {
                getProducts().then(products => {
                    this.setState({ products });
                });
            }

            render() {
                return 'what should we return here?';
            }
        }
    ```

如果只是简单的放入ProductList组件，那么就不能复用于ProductTable，不管怎样，如果这个组件可以询问要渲染什么，那么问题就会得到解决。所以，在购物车页面，我们要告诉ProductData组件要渲染ProductList组件，在管理门户中，我们告诉它要渲染ProductTable组件。

这就是render props和HOCs发挥作用的地方，它们只是一类方法，即对于一个组件，会询问应该渲染什么内容。

现在我们来看看如何使用它们。

## Render Props

在概念层面理解Render Props非常简单，让我们忘记React一会，看看原生js下的事情。

我们有一个计算两个数字之和的函数，起初我们只想要记录结果到控制台，所以我们这样设计函数：

    ```js
        function sum(a, b) {
            const result = a + b;
            console.log(result);
        }
    ```

    但是我们很快发现sum函数非常有用，我们需要在其他地方使用它，因此我们希望sum函数只提供结果，而不是记录结果到控制台，并让调用者决定如何使用结果。

    它可以这么做：

    ```js
        const sum = (a, b, fn) => {
            const result = a + b;
            fn(result);
        }

        sum(1, 2, result => {
            console.log(result);
        })

        const alertFn = result => {
            alert(result);
        }

        sum(3, 6, alertFn);
    ```

    我们传给sum一个函数作为回调函数，然后sum将计算结果作为参数调用该回调函数，通过这种方式，调用者可以获得计算结果，并且可以对结果进行任意处理。

    这就是Render Props的本质。

    现在的问题，不是计算两个数字之和，而是获取产品数据的组件ProductData。

    现在可以通过属性传递给ProductData一个函数，然后ProductData组件将获取产品数据，并将这些数据提供给以属性方式传递进来的函数，然后传递进来的函数可以拿结果做任何事。

    在React中，它可以这样实现：


    ```js
        import React, { Component } from 'react';

        class ProductData extends Componet {
            state = {
                products: []
            };

            componentDidMount() {
                getProducts().then(products => {
                    this.setState({ products });
                });
            }

            render() {
                return this.props.render({
                    products: this.state.products
                });
            }
        }

        export ProductData;
    ```

就像fn函数一样，我们有一个render属性，它作为一个函数被传递，然后ProductData组件把产品数据作为参数调用这个函数。

因此我们可以以下面的方式使用ProductData组件：

    ```js
        <ProductData render={({products}) => <ProductList products={products}>} />

        <ProductData render={({products}) => <ProductTable products={products}>} />

        <ProductData render={({products}) => (
            <h1>
                Number of Products:
                <strong>{products.length}</strong>
            </h1>
        )} />
    ```

但是，Render Props有一个致命缺点，就是容易形成回调地狱；下面将介绍另一种流行的模式，它被称作HOC。

## 高阶组件（HOC）

在这个模式中，我们定义了一个函数，该函数接受一个组件作为参数，然后返回相同的组件，但是添加了一些功能，听起来就很像装饰器。

    ```js
        import React, { Component } from 'react';

        const withProductData = WrappedComponent => 
            class ProductData extends Component {
                state = {
                    products: []
                }

                componentDidMount() {
                    getProducts().then(products => {
                        this.setState({ products });
                    });
                }

                render() {
                    return <WrappedComponent products={this.state.products} />
                }
            }
    ```

正如我们看到的，数据获取和状态的更新逻辑就和我们在Render Props中的一样，唯一变化的是组件类位于函数内部。该函数接受一个组件作为参数，然后在内部的render方法中渲染这个组件，但是会添加额外的属性，很简单吧？？？？

    ```js
        const ProductListWithData = withProductData(ProductList);
        const ProductTableWithData = withProductData(ProductTable);

        <div>
            <ProductListWithData/>
            <ProductTableWithData/>
        </div>
    ```

现在我们已经理解了如何实现HOC。
