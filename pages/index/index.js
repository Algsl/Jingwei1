var app = getApp()
Page({
  data: {
    newImage0: [],
    imgList: [
      //{id:1, img: 'https://haijiao.pw/img/swiper/swiper1.png' },
      { id: 2, img: 'https://haijiao.pw/img/swiper/swiper2.png' },
      //{id:3, img: 'https://haijiao.pw/img/swiper/swiper3.png' }
    ],
    currentTab: 0,
    hidden: true,
    region: ['山西省', '大同市', '南郊区'],
    array: ['充场人员', '问卷调查员', '派发传单', '展会协助', '餐饮工', '超市店员', '话务客服', '扫码兼职', 'APP推广', '地推人员', '保洁员', '推销员', '初中家教', '高中家教', '超市理货员', '送餐员', '校园代理', '促销导购', '服务生', '车展模特', '礼仪', '爵士舞队'],
    array1: ['天', '次', '小时', '周', '月'],
    array2: ['不限', '男生', '女生'],
    array3: [{ id: '4', title: '餐饮服务', img: '../../images/catering.png' }, { id: '6', title: '话务客服', img: '../../images/service.png' }, { id: '15', title: '送餐员', img: '../../images/delivered.png' }, { id: '19', title: '车展模特', img: '../../images/model.png' }, { id: '2', title: '派发传单', img: '../../images/leaflet.png' }, { id: '12', title: '家教', img: '../../images/educate.png' }, { id: '20', title: '礼仪', img: '../../images/protocol.png' }, { id: '10', title: '保洁员', img: '../../images/clean.png' }, { id: '14', title: '超市理货', img: '../../images/tally.png' }, { id: '22', title: '其他', img: '../../images/other.png' }],
    typeid: -1,
    typeid1: -1,
    typeid2: -1,
  },
  next: function () {
    wx.navigateTo({
      url: '../index/search/search',
    })
  },
  bindChange: function (e) {
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
  },
  choose: function (e) {
    var that = this
    that.setData({ typeid: e.target.id })
  },
  choose1: function (e) {
    var that = this
    that.setData({ typeid1: e.target.id })
  },
  choose2: function (e) {
    var that = this
    that.setData({ typeid2: e.target.id })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  swichNav: function (e) {
    var that = this
    that.setData({
      hidden: !that.data.hidden,
      currentTab: e.target.dataset.current,
    })
    if (e.target.dataset.current == 1) {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/sortPartjob.html',
        data:{type:1},
        success: function (res) {
          that.setData({
            newImage0: res.data.data,
            hidden: !that.data.hidden
          })
        }
      })
    } else if (e.target.dataset.current == 0) {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/sortPartjob.html',
        data:{type:0},
        success: function (res) {
          that.setData({
            newImage0: res.data.data,
            hidden: !that.data.hidden
          })
        }
      })
    } else {
      that.setData({ showModal: true, hidden: false })
    }
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this
    if (this.data.currentTab == 0) {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/sortPartjob.html',
        data:{type:0},
        success: function (res) {
          that.setData({
            newImage0: res.data.data,
            hidden: false,
          })
        }
      })
    } else {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/sortPartjob.html',
        data: { type: 1 },
        success: function (res) {
          that.setData({
            newImage0: res.data.data,
            hidden: false,
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: '找服务',
    })
  },
  onShareAppMessage: function () {

  },
  confirm: function () {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getScreenJob',
      data: { type: that.data.typeid, ctype: that.data.typeid1, sex: that.data.typeid2 },
      success: function (res) {
        that.setData({ newImage0: res.data, hidden: !that.data.hidden })
      }
    })
    that.setData({ showModal: false, hidden: !that.data.hidden })
  },
  cancel: function () {
    this.setData({ typeid: -1, typeid1: -1, typeid2: -1 })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
})