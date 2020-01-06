var app = getApp()
Page({
  data: {
    veriCode: null,
    time: '获取验证码',
    currentTime: 60,
    disabled: false,
  },
  getVerification: function () {
    wx.request({
      url: 'https://haijiao.pw/SMS/sendSms.php',
      data: { phone: 18435224024, code: 4 },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  phoneForm: function (e) {
    var that = this
    if (e.detail.value.mobile.length == 0) {
      wx.showToast({
        title: '请填写手机号',
        image: '../../../images/info.png'
      })
    } else if (e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        image: '../../../images/error.png'
      })
    } /*else {
      wx.request({
        url: 'https://haijiao.pw/SMS/sendSms.php',
        data: { phone: e.detail.value.phone, code: 4 },
        success: function (res) {
          that.setData({ veriCode: res.data })
        }
      })
      var that = this
      var currentTime = that.data.currentTime
      that.setData({ disabled: true })
      var interval = setInterval(function () {
        currentTime--;
        that.setData({ time: '重新发送(' + currentTime + 'S)' })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({ time: '重新发送', currentTime: 60, disabled: false })
        }
      }, 1000)
    }*/
  },
  regForm: function (e) {
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
    } /*else if (e.detail.value.veriCode != this.data.veriCode) {
      wx.showToast({
        title: '验证码错误',
        image: '../../../images/error.png'
      })
    } */else {
      var formData = e.detail.value
      console.log(formData)
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/business/register.html',
        data:formData,
        success:function(res){
          if(res.data.code==1){
            wx.navigateBack({})
          }else{
            wx.showToast({
              title: res.data.msg,
              image: '../../../images/error.png'
            })
          }
        }
      })
    }
  },
  /*获取用户手机号*/
  getPhone: function (e) {
    var that = this
    wx.login({
      success: function (res) {
        //console.log("登录：" + res.code + " " + e.detail.encryptedData + " " + e.detail.iv)
        //调用短信接口，进行短信发送，参数为：code,encryptedData,iv,session_key
        wx.request({
          url: 'https://haijiao.pw/test/demo.php',
          data: { code: res.code, encryptedData: e.detail.encryptedData, iv: e.detail.iv, session_key: app.globalData.session_key },
          success: function (res) {
            app.globalData.phone = res.data.phoneNumber
            if (res.data.phoneNumber != null || res.data == -41001) {
              that.setData({ mobile: app.globalData.phone })
            } else {
              wx.showToast({
                title: '获取失败',
                image: '../../../images/error.png'
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (options) {

  },
  onShareAppMessage: function () {

  },
})