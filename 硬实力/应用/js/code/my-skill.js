/**
 * 寄生组合式
 * 
 */
function Parent() {
    this.colors = ['a', 'b'];
}
Parent.prototype.print = function() {};

function Son() {
    Parent.call(this);
}

var proto = Object.create(Parent.prototype);
proto.constructor = Son;
Son.prototype = proto;