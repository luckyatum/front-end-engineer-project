# mind-关于React hooks、Render Props和HOC的一些总结和思考

首先假设我们有一个书城网站，该网站有一个页面展示了所有的书籍列表，我们来用class语法实现一个获取书籍列表数据并展示的组件：

    ```js
        import React from 'react';

        export class BookList extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    books: []
                };
            }

            componentDidMount() {
                getBooksData();
            }

            async getBooksData() {
                const books = await axios.get();
                this.setState({ books });
            }

            render() {
                const { books } = this.state;
                return (
                    <ul>
                        {
                            books.map(book => (
                                <li key={book.id}>{book.name}</li>
                            ))
                        }
                    </ul>
                )
            }
        }
    ```

上面我们成功实现了一个书籍获取和展示页面，现在再假设该书城还有一个书籍管理页面，管理页面可以对书城所有的书籍进行删除操作。

    ```js
        import React from 'react';

        export class BookManage extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    books: []
                };
            }

            componentDidMount() {
                getBooksData();
            }

            async getBooksData() {
                const books = await axios.get();
                this.setState({ books });
            }

            async handleDelete(book) {
                await deleteBook({ id: book.id });
                this.getBooksData();
            }

            render() {
                const { books } = this.state;
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>书籍名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        {
                            books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>
                                        <button onClick={() => this.handleDelete(book)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                )
            }
        }
    ```

显然，我们看到上面的两个组件都用了一些同样的逻辑，就是获取书籍并更新状态的逻辑，现在让我们把这个逻辑单独抽取出来以便复用。

    ```js
        import React from 'react';

        export class BookData extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    books: []
                };
            }

            componentDidMount() {
                getBooksData();
            }

            async getBooksData() {
                const books = await axios.get();
                this.setState({ books });
            }

            render() {
                return '这里没有东西可以渲染。'
            }
        }
    ```

上面BookData组件实现了获取books数据，并且维护books数据的逻辑，接下来我们把上面的BookList和BookManage组件重构一下：

首先是BookList组件，重构成一个函数式组件，它接收books书籍列表参数，并且返回列表内容：

    ```js
        export const BookList = books => {
            return (
                <ul>
                    {
                        books.map(book => (
                            <li key={book.id}>{book.name}</li>
                        ))
                    }
                </ul>
            )
        }
    ```

然后是BookManage组件，同样重构成一个函数式组件，它接收books书籍列表参数，返回一个管理表格页面以供管理书籍：

    ```js
        const handleDelete = async (books) => {
            await deleteBook({ id: book.id });
            // @todo 这里需要重新获取书籍列表
        }

        export const BookManage = books => {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>书籍名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    {
                        books.map(book => (
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(book)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            )
        }
    ```

上面我们把两个组件都重构成了函数式组件，那么怎么样才能把BookData复用到两个组件中去呢？

## Render Props

这里其中的一个解决方案就是Render Props，这个方案解释起来也很简单，就是在BookData组件内部的render函数中，调用父组件传进来的render属性，这个属性是一个函数，不过BookData不需要关心这个函数做了什么，只要把当前它维护的books数据当作参数传递进去就好了，我们看下具体代码：

    ```js
        import React from 'react';

        export class BookData extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    books: []
                };
            }

            componentDidMount() {
                getBooksData();
            }

            async getBooksData() {
                const books = await axios.get();
                this.setState({ books });
            }

            render() {
                const { books } = this.state;
                return this.props.render({ books });
            }
        }
    ```

然后使用这个组件的话应该是像下面这样：

    ```js
        <BookData render={books => <BookList books={books} />} />

        <BookData render={books => <BookManage books={books} />} />
    ```
这就是为什么这个方案叫做Render Props的原因，因为是给组件传递一个叫做render（名字其实可以改）的属性，该属性是一个函数，然后组件内部调用该函数，把自己维护的状态数据当作参数传进函数，从而达到复用的效果；

## 高阶组件(HOC)

如果说Render Props是给复用组件传递参数从而达到目的的话，HOC则是直接将整个组件传递给复用组件，然后返回一个新的Component对象；

我们先定义一个函数，该函数用于生成高阶组件，它接收一个组件参数，然后最后返回这个组件；

    ```js
        import React from 'react';

        const withBookData = WrappedComponent => {
            class BookData extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        books: []
                    };
                }

                componentDidMount() {
                    getBooksData();
                }

                async getBooksData() {
                    const books = await axios.get();
                    this.setState({ books });
                }

                render() {
                    const { books } = this.state;
                    return <WrappedComponent books={books} />;
                }
            }
        }
    ```

然后我们可以通过调用这个函数来生成我们想要的组件

    ```js
        const BookListWithData = withBookData(BookList);
        const BookManageWithData = withBookData(BookManage);

        render() {
            return (
                <BookListWithData />
                <BookManageWithData />
            );
        }
    ```

完了。
