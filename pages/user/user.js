var app = getApp()
Page({
  data: {
    audit: -1,
    noReg: true,
    jobhunter: true,
    hide: false,
    hide1: true,
    hide2: true,
    hint: '',
    id: 0,
    Juser: [],
    Buser: [],
    hasUserInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noC: true,
    hidden: true,
    cid: 0,
    chat: true,
    j1: '',
    j2: '',
    j3: '',
    m1: '',
    m2: '',
    m4: '',
    audit: true,
    showModal: false,
    infoModal: false,
    head: '',
    nickname: '',
    sheight: '',
  },
  onLoad: function () {
    
  },
  apply: function () {
    var that = this
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.name == null) {
          wx.showToast({
            title: '请完善个人信息',
          })
        } else {
          wx.navigateTo({
            url: '../user/apply/apply',
          })
        }
      }
    })
  },
  onShow: function () {
    var that = this
    var jb1 = 0, jb2 = 0, jb3 = 0
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/award',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data > 0) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Trade/Trade/addTrade',
            data: { openId: app.globalData.openId, title: '奖励金', type: 0, sum: res.data }
          })
        }
      }
    })*/
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/jobhunter/getUserMsg.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.data.audit == 1) {
          that.setData({ audit: false })
        } else {
          that.setData({ audit: true })
        }
        if (res.data.data.status) {
          if (res.data.data.status == 0) {
            jb1 = 1;
          } else if (res.data.data.status == 1) {
            jb2 = 1;
          }
        }
        that.setData({ j1: jb1, j2: jb2 })
      }
    })
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Finish/Finish/getFinish',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data) {
          that.setData({ j3: res.data.length })
        } else {
          that.setData({ j3: jb3 })
        }
      }
    })*/
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/business/getMyJobNum.html',
      data: { code: wx.getStorageSync(app.globalData.openId) },
      success: function (res) {
        that.setData({ m1: res.data.data.m1, m2: res.data.data.m2, m3: res.data.data.m3, m4: res.data.data.m4 })
      }
    })
    /*从状态库中查看用户是否注册*/

    /*从状态库查看用户的状态*/
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/getStatus.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        that.setData({
          noReg: res.data.data.noReg,
          jobhunter: res.data.data.jobhunter
        })
        //求职者身份
        /*if (!res.data.noReg && res.data.jobhunter) {
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              that.setData({ Juser: res.data, chat: true })
              //申请职位不为空
              if (res.data.apply != 0) {
                that.setData({ chat: false })
                //工作状态
                if (res.data.status != -1) {
                  //工作状态为2：已完成
                  if (res.data.status == 2) {
                    //将详细信息添加到完成数据表
                    wx.request({
                      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getDetail',
                      data: { id: res.data.apply },
                      success: function (res) {
                        var time = Date.parse(res.data.time) / 1000
                        wx.request({
                          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Finish/Finish/addFinish',
                          data: { id: res.data.id, openId: app.globalData.openId, title: res.data.title, price: res.data.price, img: res.data.img, ftime: time, area: res.data.area, day: res.data.day },
                        })
                      }
                    })
                  }
                }
              }
            }
          })
        }*/
      }
    })
    /*wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/getStatus.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data.data.jobhunter) {
          //获取修改用户的id
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
            data: { openId: app.globalData.openId },
            success: function (res) {
              if (res.data.born != '') {
                that.setData({ id: res.data.id })
              }
            }
          })
        } else {
          //获取修改用户的id
          wx.request({
            url: 'https://haijiao.pw/weicms/index.php?s=/addon/Business/Business/getUser',
            data: { code: wx.getStorageSync(app.globalData.openId) },
            success: function (res) {
              that.setData({ id: 0 })
            }
          })
        }
      }
    })*/
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#12BA74',
    })
    //查看求职者是否完善了信息
    /*wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getNum',
      data: { openId: app.globalData.openId },
      success: function (res) {
        if (res.data != null) {
          that.setData({ noC: false })
        }
      }
    })
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/allJob',
      success: function (res) {
        if (res.data != null) {
          for (var i = 0; i < res.data.length; i++) {
            wx.request({
              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus3',
              data: { id: res.data[i].id },
            })
            wx.request({
              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Apply/Apply/cStatus4',
              data: { id: res.data[i].id },
            })
          }
        }
      }
    })*/
    if (app.globalData.userInfo) {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/status/addStatus.html',
        data: { openId: app.globalData.openId, nick_name: app.globalData.userInfo.nickName, head_img: app.globalData.userInfo.avatarUrl, sex: app.globalData.userInfo.gender, province: app.globalData.userInfo.province, country: app.globalData.userInfo.country },
        success: function (res) {
          that.setData({ hidden: false })
        }
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function (e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (app.globalData.userInfo) {
      wx.request({
        url: 'https://jwjob.gesilaa6.club/index.php/index/status/addStatus.html',
        data: { openId: app.globalData.openId, nick_name: app.globalData.userInfo.nickName, head_img: app.globalData.userInfo.avatarUrl, sex: app.globalData.userInfo.gender, province: app.globalData.userInfo.province, country: app.globalData.userInfo.country },
        success: function (res) {
          that.setData({ hidden: false })
        }
      })
    }
  },
  //选择求职者身份
  jobhunter: function () {
    var that = this
    //状态改变1：未注册->注册
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/chooseType.html',
      data: { openId: app.globalData.openId,type:1 },
      success: function (res) {
        that.setData({ noReg: false,jobhunter:true})
        /*//将求职者添加入求职者数据表中
        wx.request({
          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/addUser',
          data: { openId: app.globalData.openId, nickname: res.data.name, head: res.data.img },
          success: function (res) {
            //获取求职者的信息
            wx.request({
              url: 'https://haijiao.pw/weicms/index.php?s=/addon/Jobhunter/Jobhunter/getUser',
              data: { openId: app.globalData.openId },
              success: function (res) {
                if (res.data.status == 1) {
                  that.setData({ audit: false })
                }
                that.setData({ Juser: res.data })
              }
            })
          }
        })*/
      }
    })
  },

  //商家登录
  formSubmit: function (e) {
    var that = this
    var formData = e.detail.value
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/business/login.html',
      data: formData,
      success: function (res) {
        if (res.data.data) {
          wx.setStorageSync(app.globalData.openId, e.detail.value.code)
          that.setData({ hide: true, hide1: false })
        } else {
          wx.showToast({
            title: res.data.msg,
            image: '../../images/error.png',
            duration: 1000
          })
          that.setData({
            hide2: false
          })
        }
      }
    })
  },

  //商家注册
  register: function () {
    wx.navigateTo({
      url: '../user/register/register'
    })
  },
  merchant: function () {
    //console.log(app.globalData.openId)
    var that = this
    //状态改变2：未注册->注册；求职者->否
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/chooseType.html',
      data: { openId: app.globalData.openId,type:0 },
      success: function (res) {
        that.setData({
          noReg: false,
          jobhunter: false
        })
      }
    })
  },

  //跳转到用户完善信息
  Jform: function () {
    wx.navigateTo({
      url: '../user/Jform/Jform'
    })
  },
  mform: function () {
    wx.navigateTo({
      url: '../user/mform/mform'
    })
  },
  chat: function () {
    if (!this.data.chat) {
      wx.navigateTo({
        url: '../user/chat/chat',
      })
    }
  },
  //用户身份重置
  ireset: function () {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/status/resetStatus.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  money: function () {
    wx.navigateTo({
      url: '../user/withdraw/withdraw',
    })
  },
  //找回密码
  retripwd: function () {
    wx.navigateTo({
      url: '../user/retripwd/retripwd',
    })
  },
  issue: function () {
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/business/getBusiness.html',
      data: { code: wx.getStorageSync(app.globalData.openId) },
      success: function (res) {
        if (res.data.data.cname == null) {
          wx.showToast({
            title: '企业信息待完善',
            image: '../../images/info.png'
          })
        } else if (res.data.data.audit == 0) {
          wx.showToast({
            title: '企业信息待审核',
            image: '../../images/info.png'
          })
        } else if (res.data.data.audit == 1) {
          wx.showToast({
            title: '信息审核失败',
            image: '../../images/error.png'
          })
        } else {
          wx.navigateTo({
            url: '../user/issue/issue',
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },


  level: function () {
    this.setData({ showModal: true })
  },

  confirm: function () {
    this.setData({ showModal: false })
  },
  preventTouchMove: function () {
  },
  confirm1: function () {
    this.setData({ infoModal: true });
  }
})