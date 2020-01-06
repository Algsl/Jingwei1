const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    newImage0: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formsubmit: function (e) {
    var that = this
    var formData = e.detail.value
    console.log(e.detail.value)
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/getLikelyPartjob.html',
      data: {title:e.detail.value.input},
      success: function (res) {
        util.formatArray(res.data.data,1)
        that.setData({
          newImage0: res.data.data
        })
      }
    })
  },
  onShareAppMessage: function () {

  },
})