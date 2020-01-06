var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issue: [],
    hide1: true,
    id: 0,
    money: 0,
  },

  onLoad: function (options) {
    var that = this
    /*if (options.id != null) {
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/delJob',
        data: { id: options.id },
        success: function (res) {
          wx.navigateBack({})
          wx.navigateBack({})
        }
      })
    }*/

    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
      data: { code: wx.getStorageSync(app.globalData.openId), status: 2 },
      success: function (res) {
        console.log(res.data)
        that.setData({ issue: res.data.data })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://haijiao.pw/test/test.php',
          data: { code: res.code },
          success: function (res) {
            wx.request({
              url: 'https://haijiao.pw/test/pay1.php',
              data: { fee: e.detail.value.money, openId: res.data },
              success: function (res) {
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function (res) {
                    //console.log(that.data.id)
                    var formData = e.detail.value
                    formData.id = that.data.id
                    wx.request({
                      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/cPay',
                      data: formData,
                      success: function (res) {
                        that.setData({ hide1: true })
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/delChat',
                          data: { code: wx.getStorageSync(app.globalData.openId) },
                        })
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
                          data: { id: that.data.id },
                          success: function (res) {
                            //console.log(res.data.length)
                            for (var i = 0; i < res.data.length; i++) {
                              //console.log(res.data[i].openId)
                              wx.request({
                                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus2',
                                data: { openId: res.data[i].openId },
                                success: function (res) {

                                }
                              })
                            }
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })

  },
  pay: function (e) {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
      data: { id: e.target.id },
      success: function (res) {
        var num = res.data.length
        wx.request({
          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
          data: { id: e.target.id },
          success: function (res) {
            that.setData({ id: e.target.id, hide1: false, money: res.data.price * res.data.day * num })
          }
        })
      }
    })
  },
  onShareAppMessage: function () {

  },
})