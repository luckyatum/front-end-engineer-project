const LoaderUtils = require('loader-utils');


module.exports = function(source) {
    const options = LoaderUtils.getOptions(this);
    console.log('options', options);
    console.log('source', source);
    const result = source.replace('world', options.name)
    this.callback(null ,result)
}