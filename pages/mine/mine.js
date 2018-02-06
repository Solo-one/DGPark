//index.js
var base = require('../../config')
//获取应用实例
var app = getApp()
Page({
  data: {
    headerImage: '',
    motto: '您还没有认证呢——',
    userInfo: { avatarUrl: '/image/rz.png', nickName: '您好！' },
    showView: true,
    companyName: '',
    role: '',
    name: '',
    cardType: '',
    cardID: '',
    phone: '',
    status: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad.mine')
    var that = this;
    var status = app.globalData.status;
    console.log(status)
    switch (status) {
      case -2:
        wx.showLoading({
          title: '加载中',
        })
        app.doLogin(function (status) {
          if (status == -1) {
            that.setData({
              showView: true
            })
            app.getUserInfo(function (userInfo) {
              that.setData({
                userInfo: userInfo
              })
              wx.hideLoading()
            })
          } else if (status == 0) {
            that.getData();
          } else if (status == 1) {
            that.getData();
          } else if (status == 2) {
            that.getData();
          }
        })
        break;
      case -1:
        that.setData({
          showView: true
        })
        app.getUserInfo(function (userInfo) {
          that.setData({
            userInfo: userInfo
          })
          wx.hideLoading()
        })
        break;
      case 0:
      case 1:
      case 2:
        that.getData();
        break;
      default:
        break;
    }

  },
  onShow: function () {
    console.log('onShow.mine')
    var that = this
    var status = app.globalData.status;
    if (status == 11 || status == 1) {
      that.setData({
        showView: false
      })
      if (status == 11) {
        wx.showLoading({
          title: '加载中',
        })
      }
      wx.request({
        url: base.getUser,
        data: {
          'openid': app.globalData.openid
        },
        success: function (res) {
          var userJson = res.data;
          that.changeData(userJson);
          if (status == 11) {
            wx.hideLoading()
          }
          app.globalData.status = userJson.status;
          app.globalData.userJson = userJson;//很重要
          //app.globalData.status = userJson.status;
          try {
            // wx.clearStorage()
            // wx.clearStorageSync()
          } catch (e) {
            // Do something when catch error
          }

        }
      })
    }

  },
  playTap: function (e) {
    wx.navigateTo({
      url: `../renzheng/renzheng`
    })
  },
  getData: function () {
    var that = this;
    that.setData({
      showView: false
    })
    var userJson = app.globalData.userJson
    that.changeData(userJson);
    wx.hideLoading()
  },
  changeData: function (res) {
    var that = this;
    if (res == null || res == "" || res == "{}" || res.status == null) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: base.getUser,
        data: {
          'openid': app.globalData.openid
        },
        success: function (res) {
          var userJson = res.data;
          that.changeData(userJson);
          wx.hideLoading()
        }
      })
      return;
    }

    var userJson = res;
    var CT = "身份证"
    var ST = "未认证"
    var sex = "男"
    if (userJson.cardType == 0) {
      CT = "身份证"
    } else if (userJson.cardType == 1) {
      CT = "驾驶证"
    } else if (userJson.cardType == 2) {
      CT = "居住证"
    }
    if (userJson.status == 0) {
      ST = "认证未通过"
    } else if (userJson.status == 1) {
      ST = "审批中"
    } else if (userJson.status == 2) {
      ST = "已认证"
    }
    if (userJson.sex == 0) {
      sex = "男"
    } else if (userJson.sex == 1) {
      sex = "女"
    }

    that.setData({
      companyName: userJson.companyName,
      role: userJson.role,
      name: userJson.name + '（' + sex + '）',
      cardType: CT,
      cardID: userJson.cardID,
      phone: userJson.phone,
      headerImage: base.getHeaderImg + userJson.headerImg,
      status: ST,
    })
  }
})
