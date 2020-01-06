var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },
  clickTab: function (e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swiperTab: function (e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
    wx.showLoading({
      title: '加载中...',
      duration: 1000,
      success: function (res) {
        if (e.detail.current == 0) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ status: res.data.status })
              if (res.data.status == 0) {
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                  data: { id: res.data.apply },
                  success: function (res) {
                    //console.log(res.data)
                    that.setData({ apply: false, applyInfo: res.data })
                  }
                })
              }
            }
          })
        } else if (e.detail.current = 1) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ status: res.data.status })
              if (res.data.status == 1) {
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                  data: { id: res.data.apply },
                  success: function (res) {
                    that.setData({ apply: false, work: res.data })
                  }
                })
              }
            }
          })
        } else if (e.detail.current = 2) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Finish/Finish/getFinish',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ finish: res.data })
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    if (options.id >= 5) {
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/delApply',
        data: { openId: app.globalData.openId },
        success: function (res) {
        }
      })
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/editNeed1',
        data: { id: options.id },
        success: function (res) {
          wx.navigateBack({})
          wx.navigateBack({})
        }
      })
    }
    that.setData({ currentTab: options.id })
    wx.showLoading({
      title: '加载中...',
      duration: 1000,
      success: function (res) {
        if (options.id == 0) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ status: res.data.status })
              if (res.data.status == 0) {
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                  data: { id: res.data.apply },
                  success: function (res) {
                    if (res.data) {
                      that.setData({ apply: false, applyInfo: res.data })
                    }
                  }
                })
              }
            }
          })
        } else if (options.id == 1) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ status: res.data.status })
              if (res.data.status == 1) {
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                  data: { id: res.data.apply },
                  success: function (res) {
                    //console.log(res.data)
                    that.setData({ apply: false, work: res.data })
                  }
                })
              }
            }
          })
        } else if (options.id = 2) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Finish/Finish/getFinish',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ finish: res.data })
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
})