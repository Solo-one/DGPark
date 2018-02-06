//index.js
var base = require('../../config')
//获取应用实例
var app = getApp()
Page({
  data: {
    headerImage: '/image/face.png',
    array: ['身份证', '驾驶证', '居住证'],
    companyName: '',
    role: '',
    Name: '',
    sex: 0,
    cardType: '',
    cardID: '',
    phone: '',
    items: [
      { name: 0, value: '男', checked: 'true' },
      { name: 1, value: '女', },
    ]
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      cardType: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('renzhnegonLoad' + options.id)
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '申请认证'
    })
  },
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  playTap: function (e) {
    this.takephoto();
  },
  playSub: function (e) {
    var that = this;
    if (e.detail.value.companyName.length == 0 || e.detail.value.role.length == 0 || e.detail.value.Name.length == 0 || e.detail.value.phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '所填项不能为空！',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
      return;
    } else {
      this.setData({
        companyName: e.detail.value.companyName,
        role: e.detail.value.role,
        Name: e.detail.value.Name,
        cardID: e.detail.value.cardID,
        phone: e.detail.value.phone
      })
    }

    if (this.data.headerImage == "/image/face.png") {
      wx.showModal({
        title: '提示',
        content: '必须上传人脸照片',
        success: function (res) {
          if (res.confirm) {
            that.takephoto();
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
      return;
    }

    if (app.globalData.status == 1) {
      wx.showModal({
        title: '提示',
        content: '您已经提交了申请认证，需要重新认证吗？',
        success: function (res) {
          if (res.confirm) {
            //提交数据
            that.submitData(e.detail.formId);
          } else if (res.cancel) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      })
      return;
    }
    //提交数据
    this.submitData(e.detail.formId);

  },
  takephoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          headerImage: tempFilePaths[0]
        });
      }
    })
  },
  submitData: function (formId) {
    var that = this;
    wx.uploadFile({//"https://www.playgo.xin/horizon-web/personIdentify/inPersonIden.wf"  base.uploadImageUrl
      url: base.uploadImageUrl,
      filePath: this.data.headerImage,
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        'path': 'dgyq',
        'openid': app.globalData.openid,
        'companyName': that.data.companyName,
        'role': that.data.role,
        'Name': that.data.Name,
        'sex': that.data.sex,
        'cardType': that.data.cardType,
        'cardID': that.data.cardID,
        'phone': that.data.phone,
        'formId': formId
      },
      success: function (res) {
        var data = res.data
        console.log(data);
        //do something  
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        app.globalData.status = 11;

        setTimeout(function () {
          wx.hideLoading()
          wx.switchTab({
            url: '../mine/mine',
          })
        }, 1000)
      },
      fail: function (res) {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })

    wx.showLoading({
      title: '提交中',
    })
    
  }
})
