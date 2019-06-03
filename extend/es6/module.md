# module的语法

CommonJs是运行时加载，es6模块加载是编译时加载

```js
// CommonJs
let { stat, readFile, exits } = require('fs');
// es6
import { stat, readFile, exits } from 'fs';
```

上述代码中，