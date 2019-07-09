// 以obj为原型构造空对象
function objectCreate(obj) {
    var G = function() {};
    G.prototype = obj;
    return new G();
}
// 通过把空构造函数原型指向给定对象，可以构造以该对象为原型的新对象，同时不用执行原有构造函数，避免新创建一个对象浪费资源
