// 图片懒加载代码实现
// html部分代码--<img class="lazyimg" data-src="./images/hd_01-three-hdcg.png" alt="">
var index = {
    loadImgs: null, // 需要懒加载的图片数组
    imgLoadLock: null,
    init: function () {
        var _this = this;
        _this.loadImgs = $('img.lazyimg');
        $('body,html').scrollTop(0);
        $(window).on('scroll', function () {
            // 处理图片懒加载
            if (_this.loadImgs.length > 0) {
                if (_this.imgLoadLock != null) {
                    clearTimeout(_this.imgLoadLock);
                }
                _this.imgLoadLock = setTimeout(function () {
                    _this.imgHandle();
                }, 100);
            }
        });
    },
    // 处理图片懒加载
    imgHandle: function () {
        var _this = this;
        $.each(_this.loadImgs, function (i, el) {
            var $el = $(el),
                dsrc = $(el).attr('data-src'),
                isLoadImg = _this.isLoadImg($el),
                isShow = _this.chekImgShow($el);
            if (isShow && !isLoadImg) {
                $el.attr('src', dsrc);
            }
        });
    },
    // 检查图片是否显示
    chekImgShow: function ($img) {
        var scrollTop = $(window).scrollTop();  //即页面向上滚动的距离
        var windowHeight = $(window).height(); // 浏览器自身的高度
        var offsetTop = $img.offset().top;  //目标标签img相对于document顶部的位置
        if (offsetTop < (scrollTop + windowHeight + 150) && offsetTop > scrollTop) { //在2个临界状态之间的就为出现在视野中的
            return true;
        }
        return false;
    },
    // 图片是否已加载
    isLoadImg: function ($img) {
        return $img.attr('data-src') === $img.attr('src');
    }
};
index.init();