var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobhunter: true,
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/getStatus.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
          that.setData({ jobhunter: res.data.data.jobhunter })
      }
    })
  },
  onShareAppMessage: function () {

  },
})