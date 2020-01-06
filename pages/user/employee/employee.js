var app = getApp()
Page({
  data: {
    isHidden: true,
    lists: [
      /*{ id: 1, img: '../../../images/1.jpg', name: '张三', sex: '0', status: '0' },
      { id: 3, img: '../../../images/add.png', name: '张三', sex: '0', status: '1' },
      { id: 5, img: '../../../images/add.png', name: '张三', sex: '0', status: '2' },
      { id: 6, img: '../../../images/add.png', name: '张三', sex: '0', status: '1' },*/],
    cId: 0,
    openId: null,
  },
  over: function (e) {
    this.setData({ isHidden: false, cId: e.target.id })
  },
  cancel: function () {
    this.setData({ isHidden: true })
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.praise.length == 0) {
      wx.showToast({
        title: '原因不能为空',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else if (e.detail.value.money <= 0) {
      wx.showToast({
        title: '支付金额应大于0',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else {
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://haijiao.pw/test/test.php',
            data: { code: res.code },
            success: function (res) {
              console.log(res.data)
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
                      console.log(res.data)
                      wx.request({
                        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getOpenId',
                        data: { id: that.data.cId },
                        success: function (res) {
                          console.log(res.data)
                          that.setData({ openId: res.data.openId })
                          wx.request({
                            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Trade/Trade/addTrade',
                            data: { openId: res.data.openId, title: '精卫兼职', type: 0, sum: e.detail.value.money },
                            success: function (res) {
                              console.log("添加交易记录成功")
                            }
                          })
                          wx.request({
                            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cJStatus',
                            data: { openId: res.data.openId, money: e.detail.value.money },
                            success: function (res) {
                              console.log("更改状态成功")
                            }
                          })
                          wx.request({
                            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                            data: { id: res.data.pjid },
                            success: function (res) {
                              var time = Date.parse(res.data.time) / 1000
                              wx.request({
                                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Finish/Finish/addFinish',
                                data: { id: res.data.id, openId: that.data.openId, title: res.data.title, price: res.data.price, img: res.data.img, ftime: time, area: res.data.area, day: res.data.day },
                                success: function (res) {
                                  console.log("添加到完成任务成功")
                                }
                              })
                            }
                          })
                        }
                      })
                      console.log("输入的内容：" + e.detail.value + "职位申请的id为：" + that.data.cId)
                      var formData = e.detail.value
                      formData.id = that.data.cId
                      wx.request({
                        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/fsoon',
                        data: formData,
                        success: function (res) {
                          console.log("添加到提前结账成功")
                          wx.navigateBack({})
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

  },
  change: function (e) {
    var that = this
    if (e.detail.value == 1) {
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getOpenId',
        data: { id: e.target.id },
        success: function (res) {
          //通知学生审核结果
          /*wx.request({
            url: 'https://haijiao.pw/SMS/sendSms.php',
            data: { phone: res.data.phone, code: 2 },
            success: function (res) {
              console.log(res.data)
            }
          })*/
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus1',
            data: { openId: res.data.openId, choose: e.detail.value },
            success: function (res) {

            }
          })
        }
      })
    } else if (e.detail.value = 2) {
      var refuse = e.detail.value - 3
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getOpenId',
        data: { id: e.target.id },
        success: function (res) {
          console.log(res.data)
          wx.request({
            url: 'https://haijiao.pw/SMS/sendSms.php',
            data: { phone: res.data.phone, code: 3 },
            success: function (res) {

            }
          })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/editNeed1',
            data: { id: res.data.pjid },
            success: function (res) {
            }
          })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/delApply',
            data: { openId: res.data.openId },
            success: function (res) {

            }
          })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus1',
            data: { openId: res.data.openId, choose: refuse },
            success: function (res) {
            }
          })
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
      data: { id: options.id },
      success: function (res) {
        that.setData({ lists: res.data })
      }
    })
  },

  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})