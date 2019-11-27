/**
 * js实现bitMap算法
 *
 * @author luckyatum
 * @date 2019-11-07 18:16
 */

// 定义全局数据
const global = {
    data: {
        ids: []
    }
}

// 入口
function enter(data) {
    global.data.ids = data.map(i => i.id);
    // 组装数据
    assembleData(data);
}

// 组装数据
function assembleData(data) {
    const bitsMap = {};
    if (data.length < 0) {
        return [];
    }

    const firstRow = data[0];
    const firstRowKeys = Object.keys(firstRow);
    firstRowKeys.forEach(i => {
        if (i !== 'id' && i !== 'name') {
            // 默认长度为4的数组
            bitsMap[i] = new Array(4).fill('00000000');
        }
    });
    console.log('bitsMap', bitsMap);
}


const inputData = require('./bitMapTestData').data;
enter(inputData)
