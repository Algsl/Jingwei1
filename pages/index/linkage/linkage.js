var left = require('../../../data/data.js')
/*联动兼职信息 */
Page({
  data: {
    tselect: '',
    left: [],
    right: [],
    txt: '',
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/getOtherPartjob.html',
      data: { type: 0 },
      success: function (res) {
        //console.log(res.data)
        that.setData({ right: res.data.data })
      }
    })
    that.setData({ left: left.typelist, tselect: 0, txt: left.typelist[0].type })
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/getOtherPartjob.html',
      data: { type: 0 },
      success: function (res) {
        //console.log(res.data)
        that.setData({ right: res.data.data })
      }
    })
    //console.log(that.data.tselect)
  },
  /*putArray:function(i){
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Partjob/Partjob/getJobByType1',
      data: { type: i-1 },
      success: function (res) {
        left.clist[i].content=res.data
      }
    })
    i-=1;
    if(i>0){
      this.putArray(i);
    }
    return left.clist;
  },*/
  left: function (e) {
    var that = this
    var regId = e.target.id
    wx.request({
      url: 'https://jwjob.gesilaa6.club/index.php/index/partjob/getOtherPartjob.html',
      data: { type: regId },
      success: function (res) {
        that.setData({ right: res.data.data, txt: left.typelist[regId].type })
      }
    })
    that.setData({ tselect: regId, regId: regId })
  },
  /*scroll: function (e) {
    var that = this
    var scrollTop = e.detail.scrollTop, h = 0, tselect
    that.data.left.forEach(function (clssfiy, i) {
      var _h = 26+ that.length(clssfiy['id']) *90
      if (scrollTop >= h) {
        tselect = clssfiy['id']
      }
      h += _h;
    })
    that.setData({ tselect: tselect })
  },
  length: function (e) {
    var that = this
    var rightData = that.data.right
    for (var i = 0; i < rightData.length; i++) {
      if (rightData[i].id == e) {
        return rightData[i].content.length
      }
    }
  }*/
})