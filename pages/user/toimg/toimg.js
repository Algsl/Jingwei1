var app = getApp()
Page({
  data: {
    imagePath: "",
    hide: false,
    resume: [],
    high: ['----', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185'],
    politic: ['----', '团员', '党员', '预备党员', '群众'],
    nation: ['----', '汉', '满', '回', '蒙古'],
    img: null,
    imgpath: null,
    winHeight: 0,
    winWidth: 0,
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winWidth: res.windowWidth, winHeight: res.windowHeight })
      },
    })
    that.createNewImg()
  },
  onShow: function () {

  },
  createNewImg: function () {
    var that = this;
    var ct = wx.createCanvasContext('mycanvas');
    var path = "../../../images/1.png";
    wx.request({
      url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/getResume',
      data: { openId: app.globalData.openId },
      success: function (res) {
        console.log("执行1")
        wx.downloadFile({
          url: res.data.img, //仅为示例，并非真实的资源
          success: function (res) {
            that.setData({ imgpath: res.tempFilePath })
          }
        })
        wx.getImageInfo({
          src: res.data.img,
          success: function (r) {
            console.log(r.path + " " + r.width + " " + r.height + "？？？")
            console.log("执行2")
            ct.drawImage(path, 0, 0, 800, 1000);
            //ct.draw(true);
            //ct.draw();
            ct.setFillStyle('#000000');
            ct.setFontSize(16);
            ct.fillText(res.data.academy + '', 160, 162, 400);
            ct.fillText(res.data.major + '', 160, 198, 400);
            ct.fillText(res.data.name + '', 165, 234, 100)
            if (res.data.sex == 0) {
              ct.fillText('男', 360, 234, 100)
            } else {
              ct.fillText('女', 360, 234, 100)
            }
            ct.fillText(that.data.nation[res.data.nation] + '族', 520, 234, 100)
            ct.fillText(res.data.born + '', 145, 270, 100)
            ct.fillText(that.data.politic[res.data.politic] + '', 350, 270, 100)
            ct.fillText(that.data.high[res.data.height] + 'cm', 520, 270, 100)
            ct.fillText(res.data.edu + '', 175, 306, 100)
            ct.fillText(res.data.native + '', 335, 306, 400)
            console.log(that.data.imgpath)
            ct.drawImage(r.path, 620, 142, 120, 170)
            ct.fillText(res.data.job + '', 175, 342, 400)
            ct.fillText(res.data.hobby + '', 175, 375, 400)
            ct.fillText(res.data.intro + '', 175, 410, 400)
            ct.fillText(res.data.address + '', 175, 445, 400)
            ct.fillText(res.data.dorm + '', 160, 480, 400)
            ct.fillText(res.data.tel + '', 455, 480, 100)
            ct.fillText(res.data.cell + '', 655, 480, 100)
            ct.fillText(res.data.office + '', 175, 515, 100)
            ct.fillText(res.data.date1 + '', 200, 590, 100)
            ct.fillText(res.data.school1 + '', 400, 590, 400)
            ct.fillText(res.data.office1 + '', 640, 590, 100)
            ct.fillText(res.data.date2 + '', 200, 625, 100)
            ct.fillText(res.data.school2 + '', 400, 625, 400)
            ct.fillText(res.data.office2 + '', 640, 629, 100)
            ct.fillText(res.data.date3 + '', 200, 658, 100)
            ct.fillText(res.data.school3 + '', 400, 658, 400)
            ct.fillText(res.data.office3 + '', 640, 658, 100)

            ct.fillText(res.data.rpsystem1 + '', 175, 693, 400)
            ct.fillText(res.data.rpsystem2 + '', 175, 728, 400)
            ct.fillText(res.data.rpsystem3 + '', 175, 763, 400)
            ct.fillText(res.data.rpsystem4 + '', 175, 798, 400)
            ct.fillText(res.data.rpsystem5 + '', 175, 833, 400)
            ct.fillText(res.data.rpsystem6 + '', 175, 868, 400)
            //绘制图片
            ct.draw();
          }
        })
        that.setData({ resume: res.data })

        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      }
    })
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  formSubmit: function (e) {
    var that = this;
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 1000,
    })
    that.setData({ hide: true });
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({ imagePath: tempFilePath, });
        wx.uploadFile({
          url: 'https://haijiao.pw/weicms/index.php?s=/addon/Resume/Resume/upload1',
          filePath: res.tempFilePath,
          name: 'photo',
          success: function (res) {

          }
        })
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var that = this
    var img = that.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
})