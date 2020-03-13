var app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motivation: [],
    recreation: [],
    news: [],
    fashion: [],
    hidden: true,
    imgList: [
      /*{ id: 1, img: 'https://haijiao.pw/img/swiper/swiper1.png' },
      { id: 2, img: 'https://haijiao.pw/img/swiper/swiper3.png' },*/
      { id: 3, img: 'https://jwjob.gesilaa6.club/img/swiper1.png' },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  preventTouchMove: function () {

  },
  //给轮播图添加点击事件，跳转到找服务界面
  findJob: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onShow: function () {
    var that = this
    var limit = 0
    var type
    //从数据库获取3条“励志”版块内容
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
      data: { limit: 3, type: 0 },
      success: function (res) { 
        util.formatArray(res.data.data,0);
        that.setData({ motivation: res.data.data, hidden: false }) }
    })
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
      data: { limit: 3, type: 1 },
      success: function (res) {
        util.formatArray(res.data.data,0); 
        that.setData({ recreation: res.data.data, hidden: false }) }
    })
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/see/getList.html',
      data: { limit: 4, type: 2 },
      success: function (res) { 
        util.formatArray(res.data.data,0);
        that.setData({ fashion: res.data.data, hidden: false }) }
    })
    wx.setNavigationBarTitle({
      title: '娱乐天地',
    })
  },
  onShareAppMessage: function () {

  },

})