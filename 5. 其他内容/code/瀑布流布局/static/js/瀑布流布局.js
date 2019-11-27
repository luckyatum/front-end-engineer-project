$(function () {
  // 瀑布流

  var globel = {
    instance: {
      resizeTimeInstance: null // 重绘定时器实例
    },
    data: {
      imgs: [] // 图片地址数组
    },
    // 配置
    config: {
      imgPre: './static/images/', // 图片地址前缀
      resizeTimeMs: 50 // 重绘定时器间隔毫秒
    }
  }

  // 初始化
  init()
  // 绑定事件
  bindEvent()

  // 初始化
  function init () {
    // 获取随机照片数组
    globel.data.imgs = getRandomImgs()
    // 渲染页面
    renderPage(globel.data.imgs)
  };

  // 绑定事件
  function bindEvent () {
    $(window).resize(function () {
      if (globel.instance.resizeTimeInstance) {
        clearTimeout(globel.instance.resizeTimeInstance)
      }

      globel.instance.resizeTimeInstance = setTimeout(function () {
        refreshWaterFlow()
      }, globel.config.resizeTimeMs)
    })
  };

  // 刷新瀑布流
  function refreshWaterFlow (isInit) {
    var list = globel.data.imgs

    if (list.length == 0) {
      return
    }

    // 获取list宽度
    var listWidth = $('[data-name="flowList"]').outerWidth()

    // 计算当前宽度能展示多少个item
    var itemWidth = $('[data-name="flowItem"]').outerWidth()
    var itemCount = parseInt(listWidth / (itemWidth + 20))

    var arr = []

    $('[data-name="flowItem"]').each(function (index) {
      var $cur = $(this)

      // 获取当前item的高度
      var curItemHeight = $cur.outerHeight()

      if (index < itemCount) {
        // 第一行
        $cur.css({
          top: 0,
          left: index * itemWidth + index * 10
        })

        // 保存第一行所有item高度
        arr.push(curItemHeight)
      } else {
        // 其他行

        // 找到数组中最小高度 和 它的索引
        var minHeight = arr[0]
        var index = 0
        for (var i = 0; i < arr.length; i++) {
          if (minHeight > arr[i]) {
            minHeight = arr[i]
            index = i
          }
        }

        // 设置下一行的第一个盒子位置
        // top值就是最小列的高度
        $cur.css({
          top: arr[index] + 10,
          left: $('[data-name="flowItem"]:eq(' + index + ')').css('left')
        })

        // 修改最小列的高度
        // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 10间隔
        arr[index] = arr[index] + curItemHeight + 10
      }
    })

    // 如果是初始化进来，则移除掉list的隐藏类
    isInit && $('[data-name="flowList"]').removeClass('hide')
  };

  // 生成随机照片数组
  function getRandomImgs () {
    // 序号数组
    var imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    var imgsSrc = []

    // 循环20次生成图片数组
    for (var i = 0; i < 20; i++) {
      // 生成0-序号长度的随机数
      var imgIndex = createRandom(0, imgs.length)

      // 把该index对应的序号移除，并且把图片地址保存起来
      imgsSrc.push('test-(' + imgs[imgIndex] + ').jpg')
      imgs.splice(imgIndex, 1)
    }

    return imgsSrc
  };

  // 渲染页面
  function renderPage (list) {
    var _str = ''
    for (var i = 0; i < list.length; i++) {
      var src = globel.config.imgPre + list[i]
      console.log(src, 'src')
      _str += '<div class="flow-item" data-name="flowItem"><img class="flow-item-img" data-name="flowItemImgNew" src="' + src + '" alt=""><div class="flow-item-foot">这是真正的瀑布流</div></div>'
    }

    $('[data-name="flowList"]').append(_str)
    // 监听图片加载完成没有
    bindImgLoad()
  };

  // 监听图片加载完成没有
  function bindImgLoad (count) {
    var $img = $('[data-name="flowItemImgNew"]')
    var count = 0

    $img.each(function () {
      var $curImg = $(this)
      $curImg.load(function () {
        // 清空加载完成的img名称
        $curImg.data('name', '')
        count += 1

        if (count >= $img.length) {
          // 所有图片加载完毕，初始化瀑布流
          refreshWaterFlow(true)
        }
      })
    })
  };

  // 生成m-n的随机数
  function createRandom (m, n) {
    return parseInt(Math.random() * (m - n) + n)
  };
})
