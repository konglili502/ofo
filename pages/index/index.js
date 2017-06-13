// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:45,
    longitude:126
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.timer = options.timer;
    wx.getLocation({
      success: (res) => {
        console.log(res);
        console.log(this);
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        });
      }
    });
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          controls: [
            {
              id:1,
              iconPath:"/images/location.png",
              position:{
                width:50,
                height:50,
                top:res.windowHeight - 80,
                left:20
              },
              clickable:true
            },
            {
              id: 2,
              iconPath: "/images/use.png",
              position: {
                width: 90,
                height: 90,
                top: res.windowHeight - 100,
                left: res.windowWidth/2 -45
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: "/images/warn.png",
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 80,
                left: res.windowWidth - 70
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: "/images/marker.png",
              position: {
                width: 30,
                height: 45,
                top: res.windowHeight/2 - 45,
                left: res.windowWidth/2 - 15
              }
            },
            {
              id: 5,
              iconPath: "/images/avatar.png",
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 155,
                left: res.windowWidth - 70
              },
              clickable: true
            }
          ]
        });
      }
    });
  },
  // 根据id判断点击事件
  bindtap: function(e) {
    console.log(e);
    switch(e.controlId){
      case 1: this.movetoCenter();
      break;
      case 2: 
      if(this.timer === undefined){
        wx.scanCode({
          success: () => {
            wx.showLoading({
              title: '正在获取密码',
            });
            wx.request({
              //引用本地假数据时在要文件开始 require("/data/data.js");
              url: 'https://www.easy-mock.com/mock/592baa7e91470c0ac1fea5eb/ofo/password',
              success: (res) => {
                console.log(res);
                wx.hideLoading();
                // 跳转页面
                wx.redirectTo({
                  url: '../scanresult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                  success: () => {
                    wx.showToast({
                      title: '获取密码成功',
                    })
                  }
                });
              }
            })
          }
        })
      }else{
        //没结束骑行回到首页情况下，点立即用车回到计费页面
        wx.navigateBack({
          dalta:1
        });
      }
      break;
      case 3:
      wx.navigateTo({
        url: '../warn/index'
      });
      break;
      case 5:
      wx.navigateTo({
        url: '../my/index'
      });
      break;
    }
  },
  movetoCenter: function() {
    this.map = wx.createMapContext("ofo-map");
    this.map.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})