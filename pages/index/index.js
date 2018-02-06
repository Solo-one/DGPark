//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    desc: [
      '由于道路紧急施工，13栋将于9月1日10点-21点停电，恢复供电时间尚未确定，请大家做好准备!',
      '应园区要求，将于2017-09-01日开始对外来车辆进行登记处理',
      '由于道路紧急施工，13栋将于9月10日10点-21点停电，恢复供电时间尚未确定，请大家做好准备!由于道路紧急施工，13栋将于9月1日10点-21点停电，恢复供电时间尚未确定，请大家做好准备!',
    ],
    timeArr: [
      '2017-08-25 09:07',
      '2017-08-28 14:07',
      '2017-09-08 22:07',
    ],
    time: '2017-08-25 09:07',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    grids: ["申请认证", '申请入住', '更换房间', '交房租', '物业报修', '退租', '临时访问'],
    gridsImg: ["/image/rz.png", "/image/ruzhu.png", "/image/chang.png", "/image/fangzhu.png", "/image/weixiu.png", "/image/tuizu.png", "/image/fangwen.png"]
  },
  onLoad: function () {
    // 关闭调试
    // wx.setEnableDebug({
    //   enableDebug: false
    // })
    console.log('onLoad')
  },
  changeSwiper: function (e) {
    var index = e.detail.current;
    this.setData({
      time: this.data.timeArr[index]
    })
  },
  playTap: function (e) {
    const dataset = e.currentTarget.dataset;
    if (dataset.id == '申请认证') {
      wx.navigateTo({
        url: `../renzheng/renzheng?id=${dataset.id}`
      })
      return;
    }
    wx.showModal({
      title: dataset.id,
      content: '请先通过申请认证',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: `../renzheng/renzheng?id=${dataset.id}`
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})
