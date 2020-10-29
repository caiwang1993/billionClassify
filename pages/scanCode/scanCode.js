var e = getApp();

Page({
    data: {
        username: null,
        show: ""
    },
    onLoad: function(n) {
        if (null == e.appData.userinfo) wx.navigateTo({
            url: "../login/login"
        }); else {
            this.setData({
                username: e.appData.userinfo.username
            });
            var o = this.data.username;
            wx.scanCode({
                onlyFromCamera: !0,
                success: function(n) {
                    wx.request({
                        url: e.appData.url + "/weChatApplet/chatQrCode",
                        data: {
                            qrcode: n.result,
                            phone: o
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        method: "GET",
                        dataType: "json",
                        responseType: "text",
                        success: function(e) {
                            0 == e.data.errcode ? wx.reLaunch({
                                url: "../index/index?error=0"
                            }) : -1 == e.data.errcode && wx.reLaunch({
                                url: "../index/index?error=-1"
                            });
                        },
                        fail: function(e) {
                            wx.reLaunch({
                                url: "../index/index?errorcode=1"
                            });
                        },
                        complete: function(e) {}
                    });
                },
                fail: function(e) {
                    console.log("---进入这里44--扫码失败（未进入请求后台数据步骤）"), setTimeout(function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }, 100);
                },
                complete: function(e) {}
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});