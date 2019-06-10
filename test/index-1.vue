<template>
  <div class="award-info">
      <div class="self-award-info">
          <img src="http://fed.webdev.ouj.com/48x48" alt="" class="head-img">
          <div class="info">
              <div class="name">Lily <span>[注销]</span></div>
              <div class="btn">我的背包</div>
          </div>
      </div>
      <div class="pick-up-detail">
          <h1 class="title">实时领取名单</h1>
          <div class="detail-list-wrap">
            <ul class="detail-list">
                <li class="item-wrap" v-for="item in list1" :key="item">
                    <div class="date">
                        <p>ji***87 {{item}}<span class="text">抢到了</span></p>
                        <span>11:29</span>
                    </div>
                    <div class="prize">
                        <img src="http://fed.webdev.ouj.com/48x48" alt="" class="head-img">
                        <div class="award-name">
                            <p class="icon"></p>
                            <div class="name">
                                <span class="text-one">至臻 卡东海</span>
                                <span class="text-two">皮肤中心</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="detail-list">
                <li class="item-wrap" v-for="item in list2" :key="item">
                    <div class="date">
                        <p>ji***87 {{item}}<span class="text">抢到了</span></p>
                        <span>11:29</span>
                    </div>
                    <div class="prize">
                        <img src="http://fed.webdev.ouj.com/48x48" alt="" class="head-img">
                        <div class="award-name">
                            <p class="icon"></p>
                            <div class="name">
                                <span class="text-one">至臻 卡东海</span>
                                <span class="text-two">皮肤中心</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
          </div>
      </div>
      <div class="awarn">
          <div class="awarn-box one">
              <i class="icon-q icon-question"></i>问题反馈
          </div>
           <div class="awarn-box">
              <i class="icon-q icon-advisory"></i>
              <span> 如遇到更多问题，请联系YY在线客服进行咨询</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            isAddAnimation: true,
            list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            list2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },

    computed: {},

    mounted () {
    },

    methods: {}
}
</script>

<style lang='less' scoped>
.award-info{
    width:250px;
    height:667px;
    border-radius: 4px;
    background:#fff;
    padding:0 14px;
    box-sizing: border-box;
   .self-award-info{
       display: flex;
       padding:22px 0 17px;
       border-bottom:1px solid rgba(75,83,92,0.2);
       .head-img{
           width:48px;
           height:48px;
           border-radius: 50%;
       }
       .info{
           margin-left:20px;
           .name{
               font-size:14px;
               color:#333;
               span{
                   font-size:12px;
                   color:#eb4c4c;
                   font-weight: bold;
                   margin-left:12px;
               }
           }
           .btn{
               width:69px;
               height:23px;
               background:#EB4C4C;
               font-size:12px;
               color:#fff;
               line-height:23px;
               text-align: center;
               margin-top:9px;
               cursor: pointer;
           }
       }
   }
   .pick-up-detail{
       margin:17px 0 26px;
       .title{
           font-size:16px;
           color:#333;
           font-weight: bold;
       }
       .detail-list-wrap{
            overflow: hidden;
            height:408px;
            margin-top:15px;
       }
       .detail-list{
            position: relative;
            animation: 10s scroll linear infinite;
       }
       .item-wrap{
          padding-top:15px;
       }
       .date{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:12px;
            color:#999;
            .text{
                margin-left:15px;
            }
        }
        .prize{
            display: -webkit-box;
            align-items: center;
            margin-top:8px;
            .head-img{
                display: inline-block;
                width:48px;
                height:48px;
                border-radius: 50%;
                position: relative;
                z-index:1;
            }
            .icon{
                width:36px;
                height:36px;
                background:#fff;
                margin-right:8px;
            }
            .award-name{
                width:194px;
                height:48px;
                display: flex;
                align-items: center;
                background:#f1f1f1;
                margin-left:-18px;
                padding-left:28px;
                box-sizing: border-box;
            }
            .name{
                display: flex;
                flex-direction: column;
            }
            .text-one{
                font-size:12px;
                color:#666;
            }
            .text-two{
                font-size:12px;
                color:#999;
                margin-top:8px;
            }
        }
   }
   .awarn{
      border-top:1px solid rgba(75,83,92,0.2);
      padding-top:5px;
     .awarn-box{
         display: flex;
         align-items: flex-start;
         justify-content: flex-start;
         font-size:12px ;
         color:#999;
         margin-top:8px;
         .icon-q{
            width:14px;
            height:14px;
            display: block;
            margin-right:7px;
         }
         .icon-question{
         }
         .icon-advisory{
            padding-top:10px;
            margin:0 9px 0 2px;
         }
         span{
            line-height: 23px;
         }
     }
   }
   @keyframes scroll {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(0, -910px, 0);
        }
   }
}
</style>
