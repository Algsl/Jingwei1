var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['充场人员', '问卷调查员', '派发传单', '展会协助', '餐饮工', '超市店员', '话务客服', '扫码兼职', 'APP推广', '地推人员', '保洁员', '推销员', '初中家教', '高中家教', '超市理货员', '送餐员', '校园代理', '促销导购', '服务生', '车展模特', '礼仪', '爵士舞队伍'],
    info: [],
    winHeight: 0,
    jobhunter: true,
    pid: 0,
    hide: false,
    title: '',
    anum: 0,
  },
  location: function () {
    wx.navigateTo({
      url: '../ldetail/location/location',
    })
  },
  see: function (e) {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/cFormId',
      data: { id: that.data.pid, formId: e.detail.formId }
    })
  },
  apply: function (e) {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.name) {
          if (res.data.audit == 0) {
            wx.showToast({
              title: '用户信息待审核',
              duration: 1000,
              image: '../../../images/info.png'
            })
          } else if (res.data.audit == 1) {
            wx.request({
              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
              data: { openId: app.globalData.openId },
              success: function (res) {
                wx.showModal({
                  title: '审核失败',
                  content: res.data.reason,
                  showCancel: false,
                  success: function (res) {
                    wx.switchTab({
                      url: '../../user/user',
                    })
                  }
                })
              }
            })

          }
          //判断当前是否有工作未完成
          /*else if(res.data.apply!=0){
            wx.showToast({
              title: '已有申请的工作',
              duration: 1000,
              image: '../../../images/info.png'
            })
          }*/else {
            wx.showLoading({
              title: '请稍等',
              duration: 1200,
              success: function (res) {
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/addJob',
                  data: { openId: app.globalData.openId, id: wx.getStorageSync(app.globalData.keyid) },
                  success: function (res) {
                    wx.request({
                      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
                      data: { openId: app.globalData.openId },
                      success: function (res) {
                        var Info = app.globalData.userInfo
                        Info.pjid = res.data.apply
                        Info.formId = e.detail.formId
                        Info.openId = res.data.openId
                        Info.name = res.data.name
                        Info.born = res.data.born
                        Info.sex = res.data.sex
                        Info.phone = res.data.phone
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/addApply',
                          data: Info,
                          success: function (res) {

                          }
                        })
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                          data: { id: res.data.apply },
                          success: function (res) {
                            that.setData({ title: res.data.title })
                            wx.request({
                              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/getUser1',
                              data: { openId: res.data.openId },
                              success: function (res) {
                                //申请成功发送短信告知商家
                                /*wx.request({
                                  url: 'https://haijiao.pw/SMS/sendSms.php',
                                  data:{phone:res.data.phone,code:1,title:that.data.title},
                                  success:function(res){
                                    
                                  }
                                })*/
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
                wx.request({
                  url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/editNeed',
                  data: { id: wx.getStorageSync(app.globalData.keyid) },
                  success: function (res) {
                  }
                })
                wx.switchTab({
                  url: '../../user/user',
                })
              }
            })
          }
        } else {
          wx.showModal({
            title: '请完善个人信息',
            content: '未完善个人信息不能申请职位哦',
            showCancel: false,
            image: '../../../images/info.png',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../../user/user',
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/getDetail.html',
      data: { id: options.id },
      success: function (res) {
        that.setData({ info: res.data.data })
        if (res.data.openId != app.globalData.openId) {
          that.setData({ hide: true })
        }
      }
    })
    /*var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Status/Status/getStatus',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (!res.data.jobhunter) {
          that.setData({ jobhunter: false })
        }
      }
    })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/getApply',
      data: { id: options.id },
      success: function (res) {
        if (res.data != null) {
          that.setData({ anum: res.data.length })
        }
      }
    })
    that.setData({ pid: options.id })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winHeight: res.windowHeight })
      },
    })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Status/Status/getStatus',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.jobhunter) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/addHot',
            data: { id: options.id },
          })
        }
      }
    })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
      data: { id: options.id },
      success: function (res) {
        that.setData({ info: res.data })
        if (res.data.openId != app.globalData.openId) {
          that.setData({ hide: true })
        }
      }
    })
    wx.setStorageSync(app.globalData.keyid, options.id)*/
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
})