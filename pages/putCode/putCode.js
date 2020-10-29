var a = getApp();

Page({
    data: {
        username: null,
        selTypeIndex: 0,
        imgUrl: "",
        code: "",
        typesArr: [],
        nickName: ""
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var n = this;
        if (wx.getStorageSync("isLogined")) {
            a.appData.userinfo = wx.getStorageSync("userinfo"), this.setData({
                username: a.appData.userinfo.username
            });
            var e = n.data.username, t = n.data.username, o = e;
            n.setData({
                imgUrl: a.appData.url + "/wx/cast/code?uid=" + o
            }), wx.request({
                url: a.appData.url + "weChatApplet/findNick?mobile=" + t,
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    try {
                        n.setData({
                            nickName: a.data.data.nick
                        });
                    } catch (a) {}
                },
                fail: function(a) {}
            });
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});