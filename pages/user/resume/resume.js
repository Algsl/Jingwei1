var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '----',
    date1: '----',
    date2: '----',
    date3: '----',
    high: ['----', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185'],
    politic: ['----', '团员', '党员', '预备党员', '群众'],
    nation: ['----', '汉', '满', '回', '蒙古'],
    hindex: 0,
    pindex: 0,
    nindex: 0,
    img: null,
    resume: [],
    hide: false,
    video: null,
    sModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/getResume',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data) {
          that.setData({ resume: res.data })
        }
        if (res.data.img) { that.setData({ img: res.data.img }) }
        if (res.data.height) { that.setData({ hindex: res.data.height }) }
        if (res.data.politic) { that.setData({ pindex: res.data.politic }) }
        if (res.data.nation) { that.setData({ nindex: res.data.nation }) }
        if (res.data.born) { that.setData({ date: res.data.born }) }
        if (res.data.date1) { that.setData({ date1: res.data.date1 }) }
        if (res.data.date2) { that.setData({ date2: res.data.date2 }) }
        if (res.data.date3) { that.setData({ date3: res.data.date3 }) }
      }
    })
  },
  onShow: function () {

  },
  bindDateChange: function (e) {
    this.setData({ date: e.detail.value })
  },
  bindHighChange: function (e) {
    this.setData({ hindex: e.detail.value })
  },
  bindPoliticChange: function (e) {
    this.setData({ pindex: e.detail.value })
  },
  bindNationChange: function (e) {
    this.setData({ nindex: e.detail.value })
  },
  bindDate1Change: function (e) {
    this.setData({ date1: e.detail.value })
  },
  bindDate2Change: function (e) {
    this.setData({ date2: e.detail.value })
  },
  bindDate3Change: function (e) {
    this.setData({ date3: e.detail.value })
  },

  chooseImageTap: function () {
    var that = this;
    that.setData({ photo: true })
    wx.showActionSheet({
      itemList: ['相册选取头像'],
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
        that.setData({ img: res.tempFilePaths[0] })
      }
    })
  },
  chooseVideoTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['相册选取视频'],
      itemColor: "#f7982a",
      success: function (res) {
        that.chooseV('album')
      }
    })
  },
  chooseV: function (type) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({ video: res.tempFilePath })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    if (that.data.img == null) {
      wx.showToast({
        title: '请上传图片',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '姓名为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.school.length == 0) {
      wx.showToast({
        title: '学校为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.academy.length == 0) {
      wx.showToast({
        title: '学院为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.major.length == 0) {
      wx.showToast({
        title: '专业为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.job.length == 0) {
      wx.showToast({
        title: '就业意向为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.native.length == 0) {
      wx.showToast({
        title: '籍贯为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.address.length == 0) {
      wx.showToast({
        title: '家庭住址为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.dorm.length == 0) {
      wx.showToast({
        title: '住宿地址为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.tel.length == 0) {
      wx.showToast({
        title: '联系电话为空',
        image: '../../../images/info.png',
        duration: 1000,
      })
    } else if (e.detail.value.cell.length != 11) {
      wx.showToast({
        title: '手机号码错误',
        image: '../../../images/error.png',
        duration: 1000,
      })
    } else {
      wx.uploadFile({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/upload',
        filePath: that.data.img,
        name: 'photo',
        success: function (res) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/addPhoto',
            data: { openId: app.globalData.openId, img: res.data },
            success: function (res) {
              wx.getImageInfo({
                src: res.data,
                success: function (res) {
                  wx.request({
                    url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/addPhoto1',
                    data: { openId: app.globalData.openId, imgpath: res.path },
                    success: function (res) {
                      console.log("执行1")
                    }
                  })
                }
              })
            }
          })
        }
      })
      var formData = e.detail.value
      var date = Date.parse(that.data.date)
      var date1 = Date.parse(that.data.date1)
      var date2 = Date.parse(that.data.date2)
      var date3 = Date.parse(that.data.date3)
      formData.openId = app.globalData.openId
      formData.born = date / 1000
      formData.date1 = date1 / 1000
      formData.date2 = date2 / 1000
      formData.date3 = date3 / 1000
      wx.request({
        url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/addResume',
        data: formData,
        success: function (res) {
          console.log("执行2")
          that.setData({ hide: true })
        }
      })
    }
  },
  preview: function () {
    if (app.globalData.ios) {
      wx.showToast({
        title: 'ios不支持预览',
      })
    } else {
      wx.navigateTo({
        url: '../../user/toimg/toimg',
      })
    }
  },
  onShareAppMessage: function () {

  }
})