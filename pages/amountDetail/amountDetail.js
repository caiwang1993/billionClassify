var t = getApp();

Page({
    data: {
        deliveryPass: "/images/icon_delivery_pass.png",
        castListd: [],
        itemLength: "",
        disPlay: "disNone"
    },
    onLoad: function(a) {
        var e = this;
        e.setData({
            username: t.appData.userinfo.username
        });
        var n = e.data.username;
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), wx.request({
            url: t.appData.url + "weChatApplet/wxChatCostDatil",
            data: {
                phone: n
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var a = t.data.errmsg, n = (t.data.errmsg.length, t.data.errcode);
                t.data.errmsg.status;
                -1 == n ? e.setData({
                    disPlay: "disBlock"
                }) : 1 == n && e.setData({
                    disPlay: "disNone",
                    errmsgList: a
                });
            },
            fail: function() {
                setTimeout(function() {
                    e.toast.showView("加载失败");
                }, 100);
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    onReady: function(t) {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});