// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrls:[],
    bikeInfo: {
      number: 0,
      desc: ""
    },
    checkboxValues: [],
    btnBg:"",
    actionText:"照相/相册",
    itemsValues:[
      {
        value:"私锁私用",
        checked:false,
        color:"#b9dd08"
      },
      {
        value: "车牌缺损",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "轮胎坏了",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "车锁坏了",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "违规乱停",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "密码不对",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "刹车坏了",
        checked: false,
        color: "#b9dd08"
      },
      {
        value: "其他故障",
        checked: false,
        color: "#b9dd08"
      }
    ]
  },
  changeCheckbox:function(e){
    console.log(e);
    let _values = e.detail.value;
    this.setData({
      checkboxValues:_values
    });
    if(_values.length === 0){
      this.setData({
        btnBg:""
      });
    }else{
      this.setData({
        btnBg:"#b9dd08"
      });
    }
  },
  bindPhoto:function(){
    wx.chooseImage({
      success: (res) => {
        console.log(res);
        var tfps = res.tempFilePaths;
        let _picUrls = this.data.picUrls;
        for(let i = 0;i < tfps.length; i ++){
          _picUrls.push(tfps[i]);
        }
        this.setData({
          picUrls : _picUrls,
          actionText: "+"
        });
      }
    })
  },
  delete:function(e){
    console.log(e);
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index, 1);
    if(_picUrls.length === 0){
      this.setData({
        picUrls: _picUrls,
        actionText:"照相/相册"
      });
    } 
    this.setData({
      picUrls: _picUrls
    });
  },
  changeNumber:function(e){
    console.log(e);
    this.setData({
      bikeInfo:{
        number:e.detail.value,
        desc:this.data.bikeInfo.desc
      }
    });
  },
  changeDesc:function(e){
    console.log(e);
    this.setData({
      bikeInfo: {
        number: this.data.bindInfo.number,
        desc: e.detail.value
      }
    });
  },
  submit:function(){
    if(this.data.picUrls.length > 0 && this.data.checkboxValues.length > 0){
      wx.request({
        url: 'https://www.easy-mock.com/mock/592baa7e91470c0ac1fea5eb/ofo/submitSuccess',
        // method:"POST",
        // data:{
        //   checkboxValues:this.data.checkboxValues
        // },
        success:(res) => {
          console.log(res);
          wx.showToast({
            title: '提交成功',
            icon:"success",
            duration:2000
          })
        }
      });
    }else{
      wx.showModal({
        title: '请填写信息',
        content: '你真美',
        confirmText:"这就去填",
        cancelText:"就不填",
        success: (res) => {
          console.log(res);
          if(res.confirm){

          }else{
            wx.redirectTo({
              url: '../index/index'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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