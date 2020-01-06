var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: [],
    money: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
      data: { openId: app.globalData.openId },
      success: function (res) {
        that.setData({ money: res.data.money })
      }
    })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Trade/Trade/getTrade',
      data: { openId: app.globalData.openId },
      success: function (res) {
        that.setData({ list: res.data })
      }
    })
  },
  clickTab: function (e) {
    var that = this
    that.setData({ currentTab: e.target.dataset.current })
  },
  swiperTab: function (e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  submit: function (e) {
    var r = /^[0-9]*[1-9][0-9]*$/
    if (e.detail.value.money == 0) {
      wx.showToast({
        title: '金额不能为0元',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else if (!r.test(e.detail.value.money)) {
      wx.showToast({
        title: '请输入正整数',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else {
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/drop',
        data: { openId: app.globalData.openId, money: e.detail.value.money },
        success: function (res) {
          if (res.data) {
            wx.request({
              url: 'https://haijiao.pw/test/withdraw.php',
              data: { openId: app.globalData.openId, sum: e.detail.value.money },
              success: function (res) {
                console.log(res.data)
                if (res.data.state != 0) {
                  wx.request({
                    url: 'https://haijiao.pw/weicms/index.php?s=/addon/Trade/Trade/addTrade',
                    data: { openId: app.globalData.openId, title: '提现', sum: e.detail.value.money, type: 1 },
                    success: function (res) {
                      wx.navigateBack({})
                    }
                  })
                } else {
                  wx.showToast({
                    title: '商户余额不足',
                    image: '../../../images/info.png',
                    success: function () {
                      wx.request({
                        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/dropFail',
                        data: { openId: app.globalData.openId, money: e.detail.value.money },
                        success: function (res) {
                        }
                      })
                    }
                  })
                }

              }
            })
          } else {
            wx.showToast({
              title: '可用余额不足',
              image: '../../../images/error.png',
              duration: 1000
            })
          }
        },
      })
    }
  }
})