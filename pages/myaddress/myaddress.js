var e = getApp();

Page({
    data: {
        region: [ "北京市", "北京市", "朝阳区" ],
        customItem: "全部",
        btnDisabled: !0,
        list: [],
        nothing: "",
        adressitem: "",
        hasAddress: !1
    },
    onLoad: function(e) {
        var s = this;
        wx.getSystemInfo({
            success: function(e) {
                s.setData({
                    view: {
                        Height: e.windowHeight
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var s = this, t = e.appData.userinfo.username;
        wx.request({
            url: e.appData.url + "customer/getAddress?userName=" + t,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var t = e.data.errcode, n = e.data.data, a = n.nick, d = n.mobile, i = n.address;
                0 === t || 1 === t ? s.setData({
                    nothing: "nothing",
                    adressitem: "adressitem",
                    nick: a,
                    mobile: d,
                    address: i,
                    hasAddress: !0
                }) : 3 === t ? (s.setData({
                    nothing: "nothing",
                    adressitem: "adressitem",
                    nick: a,
                    mobile: d,
                    address: i,
                    hasAddress: !0
                }), wx.showToast({
                    title: e.data.errmsg,
                    icon: "none",
                    duration: 3e3,
                    mask: !0
                })) : s.setData({
                    nothing: "displayblock",
                    adressitem: "none_adressitem",
                    hasAddress: !1
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    addAddre: function() {
        wx.navigateTo({
            url: "/pages/newEditAddress/newEditAddress"
        });
    },
    toModifyAddre: function() {
        wx.navigateTo({
            url: "/pages/newEditAddress/newEditAddress"
        });
    }
});