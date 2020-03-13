var app = getApp()
Page({
  data: {
    regInfo: [],/*注册者信息*/
    bimg: null,/*营业执照图片*/
    photo: true,/*图片*/
    nobey: true,/*未遵守协议*/
    npay: true,
    phone: '',/*手机号*/
    margin: '0'
  },

  /*文字点击事件：显示/关闭照片示例*/
  showP: function (e) {
    var that = this
    that.setData({ photo: !this.data.photo })
  },

  /*复选框：若选中，则按钮可点击*/
  choosed: function () {
    var that = this
    that.setData({ nobey: !this.data.nobey })
  },

  /*点击协议：跳转到协议详情页*/
  obey: function () {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },
  pay: function () {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  /*获取用户手机号*/
  getPhone: function (e) {
    var that = this
    wx.login({
      success: function (res) {
        //console.log("登录：" + res.code + " " + e.detail.encryptedData + " " + e.detail.iv)
        //调用短信接口，进行短信发送，参数为：code,encryptedData,iv,session_key
        wx.request({
          url: 'https://jwjob.gesilaa6.club/SMS/demo.php',
          data: { code: res.code, encryptedData: e.detail.encryptedData, iv: e.detail.iv, session_key: app.globalData.session_key },
          success: function (res) {
            app.globalData.phone = res.data.phoneNumber
            if (res.data.phoneNumber != null || res.data == -41001) {
              that.setData({ phone: app.globalData.phone })
            } else {
              wx.showToast({
                title: '获取失败',
                image: '../../../images/error.png'
              })
            }
          }
        })
      }
    })
  },

  /*从相册选取营业执照*/
  chooseImageTap: function () {
    var that = this;
    that.setData({ photo: true })
    wx.showActionSheet({
      itemList: ['选取营业执照/证件照'],
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
          formData: { type: 2 },
          success: function (res) {
            that.setData({ bimg: res.data })
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    wx.showLoading({
      title: '请等待...',
      duration: 1200,
      success: function (res) {
        if (that.data.bimg == null) {
          wx.showToast({
            title: '请上传营业执照',
            duration: 1000
          })
        } else if (e.detail.value.cname.length == 0) {
          wx.showToast({
            title: '公司名称未填写',
            duration: 1000
          })
        } else if (e.detail.value.name.length == 0) {
          wx.showToast({
            title: '姓名未填写',
            duration: 1000
          })
        }else {
          var formData = e.detail.value
          formData.openId = app.globalData.openId
          formData.bimg=that.data.bimg
          formData.code = wx.getStorageSync(app.globalData.openId)
          wx.request({
            url: 'https://jwjob.gesilaa6.club/index.php/index/business/editBusiness.html',
            data: formData,
            success: function (res) {
              wx.navigateBack({})
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/business/getBusiness.html',
      data: { code: wx.getStorageSync(app.globalData.openId) },
      success: function (res) {
        that.setData({ regInfo:res.data.data,bimg:res.data.data.bimg})
        /*if (res.data.margin != 0) {
          that.setData({ npay: false })
        }*/
      }
    })
  },
  onShareAppMessage: function () {

  },
})