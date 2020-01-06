var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    jobhunter: true,
    info: [{ msg: null, itype: null, img: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }, { msg: null }],
    index: 0,
    user: [],
    array: [],
    index0: 0,
    pjid: 0,
  },
  change: function (e) {
    var that = this
    that.setData({ index0: e.detail.value, pjid: that.data.array[e.detail.value].id })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Status/Status/getStatus',
      data: { openId: app.globalData.openId },
      success: function (res) {
        wx.showLoading({
          title: '加载中...',
          duration: 1000,
        })

        if (res.data.jobhunter) {
          //求职者的聊天内容
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply1',
            data: { openId: res.data.openId },
            success: function (res) {
              wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
                data: { pjid: res.data.pjid },
                success: function (res) {
                  that.setData({ user: res.data })
                }
              })
            }
          })
        } else {
          //商家的聊天内容
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
            data: { pjid: that.data.pjid },
            success: function (res) {
              that.setData({ user: res.data })
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winWidth: res.windowWidth, winHeight: res.windowHeight })
      },
    })
  },
  onShow: function () {
    var that = this
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Status/Status/getStatus',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.jobhunter) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply1',
            data: { openId: res.data.openId },
            success: function (res) {
              wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
                data: { pjid: res.data.pjid },
                success: function (res) {
                  that.setData({ user: res.data })
                }
              })
            }
          })
        } else {
          that.setData({ jobhunter: false })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getMyJob2',
            data: { code: wx.getStorageSync(app.globalData.openId) },
            success: function (res) {
              that.setData({ array: res.data, pjid: res.data[0].id })
              wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
                data: { pjid: that.data.pjid },
                success: function (res) {
                  that.setData({ user: res.data })
                }
              })
            }
          })
        }
      }
    })*/
  },
  textarea: function (e) {
    var that = this
    var value = e.detail.value
    var l = parseInt(value.length)
    that.setData({ len: l, msg: e.detail.value })
  },
  send: function () {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Status/Status/getStatus',
      data: { openId: app.globalData.openId },
      success: function (res) {
        var u = that.data.info
        var i = that.data.index
        /*if (i== 10) {
          for (var j= 0; j< 10; j++) {
            u[j].msg = null
          }
        }*/
        if (res.data.jobhunter) {
          u[that.data.index % 10].msg = that.data.msg
          u[that.data.index % 10].img = res.data.img
          u[that.data.index % 10].itype = "jobhunter"
          that.setData({ index: that.data.index % 10 + 1, input: '', jobhunter: true })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply1',
            data: { openId: res.data.openId },
            success: function (res) {
              wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/addChat',
                data: { code: res.data.code, openId: app.globalData.openId, msg: that.data.info[i].msg, itype: that.data.info[i].itype, img: that.data.info[i].img, pjid: res.data.pjid },
                success: function (re) {
                  wx.request({
                    url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
                    data: { pjid: res.data.pjid },
                    success: function (res) {
                      that.setData({ user: res.data })
                    }
                  })
                }
              })
            }
          })
        } else {
          u[that.data.index % 10].msg = that.data.msg
          u[that.data.index % 10].img = res.data.img
          u[that.data.index % 10].itype = "merchant"
          that.setData({ input: '' })
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/addChat',
            data: { code: wx.getStorageSync(app.globalData.openId), openId: res.data.openId, msg: that.data.info[i].msg, itype: that.data.info[i].itype, img: that.data.info[i].img, pjid: that.data.pjid },
            success: function (res) {
              wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Chat1/Chat1/getChat',
                data: { pjid: that.data.pjid },
                success: function (res) {
                  that.setData({ user: res.data })
                }
              })
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
})