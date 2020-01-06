var app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    hide1: true,
    id: 0,
    money: 0,
    employee: [],
    hour: 0,
    minute: 0,
    second: 0
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
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getMyJob3',
            data: { code: wx.getStorageSync(app.globalData.openId) },
            success: function (res) {
              that.setData({ audit: res.data })
            }
          })
        } else if (e.detail.current == 1) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 2 },
            success: function (res) {
              //console.log(res.data.id)
              util.formatArray(res.data.data, 1)
              that.setData({ issue: res.data.data })
            }
          })
        } else if (e.detail.current == 2) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 3 },
            success: function (res) {
              util.formatArray(res.data.data, 1)
              that.setData({ pay: res.data.data })
            }
          })
        } else if (e.detail.current == 3) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 4 },
            success: function (res) {
              util.formatArray(res.data.data, 1)
              that.setData({ finish: res.data.data })
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    if (options.id >= 5) {
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/delJob',
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
      duration: 1500,
      success: function (res) {
        if (options.id == 0) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getMyJob3',
            data: { code: wx.getStorageSync(app.globalData.openId) },
            success: function (res) {
              that.setData({ audit: res.data })
            }
          })
        } else if (options.id == 1) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 2 },
            success: function (res) {
              util.formatArray(res.data.data, 1)
              that.setData({ issue: res.data.data })
              /*var u = that.data.employee
              if (res.data != null) {
                for (var i = 0; i < res.data.length; i++) {
                  wx.request({
                    url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
                    data: { id: res.data[i].id },
                    success: function (res) {

                    }
                  })
                }
              }*/
            }
          })
        } else if (options.id == 2) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 3 },
            success: function (res) {
              util.formatArray(res.data.data, 1)
              that.setData({ pay: res.data.data })
            }
          })
        } else if (options.id == 3) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJob.html',
            data: { code: wx.getStorageSync(app.globalData.openId), status: 4 },
            success: function (res) {
              util.formatArray(res.data.data, 1)
              that.setData({ finish: res.data.data })
            }
          })
        }
      }
    })
  },
  pay: function (e) {
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
      data: { id: e.target.id },
      success: function (res) {
        if (res.data != null) {
          var num = res.data.length
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
            data: { id: e.target.id },
            success: function (res) {
              that.setData({ id: e.target.id, hide1: false, money: res.data.price * res.data.day * num })
              wx.navigateTo({
                url: '../../user/pay/pay?id=' + e.target.id + '&money=' + res.data.price * res.data.day * num,
              })
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
                data: { id: e.target.id },
                success: function (res) {
                }
              })
              console.log(e.target.id)
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
})