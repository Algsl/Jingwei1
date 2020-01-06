// pages/user/retripwd/retripwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  retripwd: function (e) {
    if (e.detail.value.code.length < 6) {
      wx.showToast({
        title: '用户名错误',
        image: '../../../images/error.png'
      })
    } else if (e.detail.value.pwd.length == 0) {
      wx.showToast({
        title: '请输入密码',
        image: '../../../images/info.png'
      })
    } else if (e.detail.value.rpwd.length == 0) {
      wx.showToast({
        title: '请输入确认密码',
        image: '../../../images/info.png'
      })
    } else if (e.detail.value.rpwd != e.detail.value.pwd) {
      wx.showToast({
        title: '密码不一致',
        image: '../../../images/error.png'
      })
    } else if (e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '手机号错误',
        image: '../../../images/error.png'
      })
    } else {
      var formData = e.detail.value
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/business/retripwd.html',
        data: formData,
        success: function (res) {
          console.log(res.data)
          wx.navigateBack({

          })
        }
      })
    }
  },
  onShareAppMessage: function () {

  }
})