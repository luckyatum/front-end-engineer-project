// js实现二分查找算法
function findIndex (arr, num) {
  if (arr.length == 0) {
    return -1
  }
  var lIndex = 0
  var rIndex = arr.length - 1
  var mIndex

  while (true) {
    mIndex = parseInt((rIndex + lIndex) / 2)

    if (arr[mIndex] > num) {
      rIndex = mIndex - 1
    } else if (arr[mIndex] < num) {
      lIndex = mIndex + 1
    } else {
      return mIndex
    }

    if (rIndex < lIndex) {
      return -1
    }
  }
}
