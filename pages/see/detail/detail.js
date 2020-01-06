const util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示列表单个条目的详细信息
    var that = this
    wx.showLoading({
      title: '加载中...',
      duration: 1500,
      success: function (res) {
        wx.request({
          url: 'https://jwjob.gesilaa6.club/index.php/index/see/getDetail.html',
          data: { id: options.id },
          success: function (res) {
            util.formatSingle(res.data.data, 0)
            that.setData({info: res.data.data})
          }
        })
      }
    })

  },
  onShareAppMessage: function () {

  },
})