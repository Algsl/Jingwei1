var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['充场人员', '问卷调查员', '派发传单', '展会协助', '餐饮工', '超市店员', '话务客服', '扫码兼职', 'APP推广', '地推人员', '保洁员', '推销员', '初中家教', '高中家教', '超市理货员', '送餐员', '校园代理', '促销导购', '服务生', '车展模特', '礼仪', '爵士舞队伍'],
    age: ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    index: 0,
    index1: 0,
    img: null,
    wtime1: '2019-04-23',
    t1: '08:00',
    t2: '12:00',
    t3: '14:00',
    t4: '18:00',
    index0: 0,
    array0: ['天', '次', '小时', '周', '月'],
    pjid: 0,
    template: '',
    savemsg: [],
  },
  chooseImageTap: function () {
    var that = this;
    that.setData({ photo: true })
    wx.showActionSheet({
      itemList: ['相册选取公司logo'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        wx.uploadFile({
          url: 'https://jwjob.gesilaa6.club/index.php/index/see/uploadFile.html',
          filePath: res.tempFilePaths[0],
          name: 'img',
          formData: { type: 3 },
          success: function (res) {
            that.setData({ img: res.data })
          }
        })
      }
    })
  },
  agechange: function (e) {
    this.setData({ index1: e.detail.value })
  },
  datechange1: function (e) {
    this.setData({ wtime1: e.detail.value })
  },
  pchange: function (e) {
    this.setData({ index: e.detail.value })
  },
  pchange0: function (e) {
    this.setData({ index0: e.detail.value })
  },
  bindTimeChange1: function (e) {
    var that = this
    that.setData({ t1: e.detail.value })
  },
  bindTimeChange2: function (e) {
    var that = this
    that.setData({ t2: e.detail.value })
  },
  bindTimeChange3: function (e) {
    var that = this
    that.setData({ t3: e.detail.value })
  },
  bindTimeChange4: function (e) {
    var that = this
    that.setData({ t4: e.detail.value })
  },
  formSubmit: function (e) {
    var time1 = Date.parse(this.data.wtime1)
    var index = this.data.index
    var index0 = this.data.index0
    var that = this
    var atime1 = that.data.t1
    var atime2 = that.data.t2
    var ptime1 = that.data.t3
    var ptime2 = that.data.t4
    wx.showLoading({
      title: '请等待发布',
      duration: 800,
      success: function (res) {
        console.log(e.detail.value)
        if (that.data.img == null) {
          wx.showToast({
            title: '请选择公司logo',
            image: '../../../images/info.png'
          })
        } else if (e.detail.value.title.length == 0) {
          wx.showToast({
            title: '请填写职位标题',
            image: '../../../images/info.png'
          })
        } else if (e.detail.value.need.length == 0) {
          wx.showToast({
            title: '请填写需求人数',
            image: '../../../images/info.png'
          })
        } else if (e.detail.value.day.length == 0) {
          wx.showToast({
            title: '请填写工作天数',
            image: '../../../images/info.png'
          })
        } else if (e.detail.value.price.length == 0) {
          wx.showToast({
            title: '请填写价格',
            image: '../../../images/info.png'
          })
        } else if (e.detail.value.area.length < 5) {
          wx.showToast({
            title: '工作地点不具体',
            image: '../../../images/info.png'
          })
        } else {
          var formData = e.detail.value
          formData.wtime1 = time1 / 1000
          formData.type = index
          formData.ctype = index0
          formData.atime1 = atime1
          formData.atime2 = atime2
          formData.ptime1 = ptime1
          formData.ptime2 = ptime2
          formData.openId = app.globalData.openId
          formData.code = wx.getStorageSync(app.globalData.openId)
          formData.img=that.data.img
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/addPartjob.html',
            data: formData,
            success: function (res) {
              wx.navigateBack({})
              //that.setData({pjid:res.data.data})
              /*wx.request({
                url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/addJob',
                data: formData,
                success: function (res) {
                  console.log(res.data)
                  wx.showModal({
                    title: '提示',
                    content: '是否将此次内容保存为模板，以便下次使用？',
                    cancelText: '不保存',
                    confirmText: '保存',
                    success: function (res) {
                      if (res.confirm) {
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/changeBus1',
                          data: { code: wx.getStorageSync(app.globalData.openId), template: that.data.pjid },
                          success: function (res) {
                            wx.navigateBack({})
                          }
                        })
                      } else if (res.cancel) {
                        wx.navigateBack({})
                      }
                    },
                  })
                }
              })*/
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
        that.setData({ winHeight: res.windowHeight })
      },
    })
  },
  useModel: function () {
    /*var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/getUser',
      data: { code: wx.getStorageSync(app.globalData.openId) },
      success: function (res) {
        wx.request({
          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
          data: { id: res.data.template },
          success: function (res) {
            that.setData({ savemsg: res.data, index0: res.data.ctype, index: res.data.type })
          }
        })
      }
    })*/
  },
  onShow: function () {
    var that = this
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/getUser',
      data: { code: wx.getStorageSync(app.globalData.openId) },
      success: function (res) {
        that.setData({ template: res.data.template })
      }
    })*/
  },
  onShareAppMessage: function () {

  },
})