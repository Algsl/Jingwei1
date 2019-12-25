const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      duration: 1500,
      success: function (res) {
        //判断传来参数进行匹配，显示该模板下的列表
        if (options.id == 1) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
            data: { limit: 0, type: 0 },
            success: function (res) {
               util.formatArray(res.data.data);
               that.setData({ list: res.data.data }) 
              }
          })
        } else if (options.id == 2) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
            data: { limit: 0, type: 1 },
            success: function (res) {
                util.formatArray(res.data.data);
                that.setData({ list: res.data.data }) 
              }
          })
        } else if (options.id == 3) {
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
            data: { limit: 0, type: 2 },
            success: function (res) {
              util.formatArray(res.data.data); 
              that.setData({ list: res.data.data }) 
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
})