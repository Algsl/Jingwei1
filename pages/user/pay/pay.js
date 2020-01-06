var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    id: 0,
    jobhunter: true,
    npay: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/getStatus.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        //判断学生或商家
        if (res.data.data.jobhunter) {//学生
          that.setData({ money: 100, jobhunter: true })
        } else {//商家
          //console.log(options.id)
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getBusiness.html',
            data: { code: wx.getStorageSync(app.globalData.openId) },
            success: function (res) {
              that.setData({ jobhunter: false })

              /*//判断是否缴纳保证金
              if(res.data.margin==0){//未缴纳
                  that.setData({money:100})
              }else{//已缴纳*/
              that.setData({ npay: false })
              /*wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
                data: { id: options.id },
                success: function (res) {
                  //console.log(res.data)
                  if (res.data != null) {
                    var num = res.data.length
                    wx.request({
                      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                      data: { id: options.id },
                      success: function (res) {
                        that.setData({ id: options.id, money: res.data.price * res.data.day * num })
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '删除',
                      content: '由于没有学生申请，将删除该条记录',
                      showCancel: false,
                      success: function (res) {
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/delJob',
                          data: { id: options.id },
                          success: function (res) {
                            wx.switchTab({
                              url: '../../user/user',
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })*/
              // }
            }
          })

        }
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
            console.log(res.data)
            wx.request({
              url: 'https://jwjob.gesilaa6.club/index.php/index/pay/pay.html',
              data: { fee: e.detail.value.money, openId: res.data },
              success: function (res) {
                console.log(res.data)
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function (res) {
                    if (that.data.jobhunter) {
                      wx.request({
                        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/cmargin',
                        data: { openId: app.globalData.openId, margin: 100 },
                        success: function (res) {
                          wx.navigateBack({})
                        }
                      })
                    } else {
                      if (that.data.npay) {
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/cmargin',
                          data: { openId: app.globalData.openId, margin: 100 },
                          success: function (res) {
                            //wx.navigateBack({})
                          }
                        })
                      } else {
                        var formData = e.detail.value
                        formData.id = that.data.id
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/cPay',
                          data: formData,
                          success: function (res) {
                            //删除聊天记录
                            wx.request({
                              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/delChat',
                              data: { code: wx.getStorageSync(app.globalData.openId) },
                            })
                            wx.request({
                              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
                              data: { id: that.data.id },
                              success: function (res) {
                                console.log(res.data)
                                if (res.data != null) {
                                  for (var i = 0; i < res.data.length; i++) {
                                    console.log(res.data[i].openId)
                                    wx.request({
                                      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus2',
                                      data: { openId: res.data[i].openId },
                                      success: function (res) {

                                      }
                                    })
                                  }
                                }
                                wx.switchTab({
                                  url: '../../user/user',
                                })
                              }
                            })
                          }
                        })
                      }
                    }
                  },
                  fail: function (res) {
                    console.log("失败")
                  }
                })
              }
            })
          }
        })
      }
    })
  },
})