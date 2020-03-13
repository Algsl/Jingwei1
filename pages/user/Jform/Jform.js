var app = getApp()
const util = require('../../../utils/util.js')
Page({
  data: {
    born: '1990-01-01',
    allVall: '',
    userInfo: [],
    photo: true,
    img: null,
    nobey: true,
    npay: true,
    sendmsg: "sendmsg",
    getmsg: "获取验证码",
    mobile: null,
    margin: 0,
  },
  showP: function (e) {
    var that = this
    that.setData({ photo: !this.data.photo })
  },
  choosed: function () {
    var that = this
    that.setData({ nobey: !this.data.nobey })
  },
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
  chooseImageTap: function () {
    var that = this;
    that.setData({ photo: true })
    wx.showActionSheet({
      itemList: ['相册选取学生证'],
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
          formData: { type: 1 },
          success: function (res) {
            that.setData({ img: res.data })
          }
        })
      }
    })
  },
  last: function () {
    wx.navigateTo({
      url: '../../list/list'
    })
  },
  datachange: function (e) {
    this.setData({
      born: e.detail.value
    })
  },
  formReset: function (e) {
    this.setData({
      allvalue: '',
      img: null
    })
  },
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
            app.globalData.mobile = res.data.phoneNumber
            if (res.data.phoneNumber != null || res.data == -41001) {
              that.setData({ mobile: app.globalData.mobile })
            }
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    if (this.data.img == null) {
      wx.showToast({
        title: '请上传学生证',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else if (e.detail.value.num.length == 0) {
      wx.showToast({
        title: '学号为空',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '姓名为空',
        image: '../../../images/info.png',
        duration: 1000
      })
    } else if (e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        image: '../../../images/error.png',
        duration: 1000
      })
    } else {
      var formData = e.detail.value
      var time = Date.parse(this.data.born)
      formData.born = time / 1000
      formData.openId = app.globalData.openId
      formData.img=this.data.img
      that.setData({ allvalue: e.detail.value })
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/jobhunter/changeUserMsg.html',
        data: formData,
        success:function(res){
          console.log(res.data)
        }
      })
      /*wx.request({
        url: 'https://haijiao.pw/SMS/sendSms.php',
        data: { mobile: 18435224024, code: 5, title: e.detail.value.name },
        success: function (res) {
        }
      })*/
      wx.switchTab({
        url: '../../user/user',
      })
    }
  },
  onLoad: function (options) {
    //console.log(Date.parse(this.data.born)/1000)
    var that = this
    that.setData({ mobile: app.globalData.mobile })
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
      data: { openId: app.globalData.openId },
      success: function (res) {
        console.log(res.data)
        that.setData({ userInfo: res.data, born: res.data.born, img: res.data.img })
        if (res.data.audit == 1) {
          wx.showModal({
            title: '审核失败',
            content: res.data.reason,
            showCancel: false,
            success: function (res) {

            }
          })
        }
      }
    })*/
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/jobhunter/getUserMsg.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        util.formatSingle(res.data.data, 2)
        that.setData({ userInfo: res.data.data, born: res.data.data.born, img: res.data.data.img })
      }
    })
  },
  onShow: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '完善信息',
    })
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.margin != 0) {
          that.setData({ npay: false })
        }
      }
    })*/
  },
  onShareAppMessage: function () {

  },
})