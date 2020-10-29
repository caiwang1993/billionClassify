var a = getApp();

Page({
    data: {
        nothing: "nothing",
        tagList: [],
        textErrmsg: "暂无数据~~"
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var n = this;
        if (wx.getStorageSync("isLogined")) {
            a.appData.userinfo = wx.getStorageSync("userinfo"), console.log("app.appData.userinfo里面是否有customerId", a.appData.userinfo), 
            n.setData({
                username: a.appData.userinfo.username,
                nickName: a.appData.userinfo.nickName,
                customerId: a.appData.userinfo.customerId
            });
            n.data.username;
            var t = n.data.customerId;
            wx.request({
                url: a.appData.url + "customer/wxRecovery",
                method: "GET",
                data: {
                    customerId: t
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    var t = a.data.data.list || [];
                    0 === a.data.errcode ? n.setData({
                        tagList: t,
                        nothing: "nothing"
                    }) : n.setData({
                        nothing: "displayblock",
                        order_inner: "no_order_inner",
                        main_order: "no_main_order",
                        textErrmsg: a.data.errmsg
                    });
                },
                fail: function(a) {
                    n.setData({
                        nothing: "nothing"
                    });
                }
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