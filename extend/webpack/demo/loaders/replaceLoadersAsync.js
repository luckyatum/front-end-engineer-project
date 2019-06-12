module.exports = function(source) {
    callback = this.async();
    setTimeout(() => {
      const result = source.replace('Hello', 'Hi!')
      callback(null, result)
    }, 1000)
}