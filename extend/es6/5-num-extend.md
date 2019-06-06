# 数值的扩展

二进制和八进制最新写法，0b(0B)和0o(0O)

新增了isFinite()和isNaN()方法，与传统方法区别在于，新方法只对数值有效，对于非数值一律返回false

parseInt()和parseFloat()移植到了Number对象，行为保持不变

Number.isInteger()，返回是否为整数

Number.EPSION，一个极小的常量，用于计算时候判断误差值是否可忽略

Number.isSafeInteger()，js可精确表示的数值范围是-2的53次方到2的53次方，超过范围无法精确表示，该方法判断数值是否位于此范围内