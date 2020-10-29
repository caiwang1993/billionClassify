var e = getApp();

Page({
    data: {
        imgUrls: [ "/images/banner_1@2x.png", "/images/banner_1@2x.png" ],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 400,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        username: null,
        iterm_num: "0",
        delivery_nub: "0",
        gotoWallet: "nogotoWallet",
        busModel: 0,
        latitude: "",
        longitude: "",
        speed: "",
        recycleNumber: 0,
        accuracy: ""
    },
    onLoad: function(e) {
        -1 == e.error ? wx.showToast({
            title: "扫码失败，请重新扫码开门",
            icon: "none",
            duration: 3e3
        }) : 0 == e.error ? wx.showToast({
            title: "您好,投口开启中",
            icon: "success",
            duration: 3e3,
            mask: !0
        }) : 1 == e.error && wx.showToast({
            title: "未扫码",
            icon: "none",
            duration: 3e3
        }), "true" == e.wxkj && wx.showToast({
            title: res.data.errmsg,
            icon: "success",
            duration: 2e3
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {}
                });
            }
        });
    },
    onShow: function(t) {
        var a = this;
        if (wx.getStorageSync("isLogined")) {
            e.appData.userinfo = wx.getStorageSync("userinfo"), this.setData({
                username: e.appData.userinfo.username
            });
            var n = this.data.username;
            wx.request({
                url: e.appData.url + "weChatApplet/chatCustCast",
                data: {
                    userName: n
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var t = e.data.errcode, n = e.data.errmasg, o = e.data.data.busModel;
                    0 === t ? 0 === o ? a.setData({
                        iterm_num: e.data.data.score,
                        delivery_nub: e.data.data.count,
                        gotoWallet: "nogotoWallet",
                        busModel: o
                    }) : a.setData({
                        iterm_num: e.data.data.score,
                        delivery_nub: e.data.data.count,
                        gotoWallet: "gotoWallet",
                        busModel: o
                    }) : "string" == typeof n && wx.showToast({
                        title: n,
                        icon: "none",
                        duration: 3e3,
                        mask: !0
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "请求数据失败",
                        icon: "none",
                        duration: 2e3
                    });
                },
                complete: function() {}
            });
        } else this.setData({
            iterm_num: 0
        }), this.setData({
            delivery_nub: 0
        });
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                a.setData({
                    latitude: t.latitude,
                    longitude: t.longitude,
                    speed: t.speed,
                    accuracy: t.accuracy
                });
                var n = a.data.latitude, o = a.data.longitude, i = a.data.speed, r = a.data.accuracy;
                wx.request({
                    url: e.appData.url + "/weChatApplet/deviceGps?latitude=" + n + "&longitude=" + o + "&speed=" + i + "&accuracy=" + r,
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        e.data.errmsg;
                        var t = e.data.errmsg.length;
                        e.data.errmsg.device_type, e.data.errmsg.statusName;
                        1 === e.data.errcode ? a.setData({
                            recycleNumber: t
                        }) : (a.setData({
                            recycleNumber: 0
                        }), wx.showToast({
                            title: e.data.errmsg,
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        }));
                    }
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "getLocation函数失败",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            complete: function(e) {}
        });
    },
    bindGetUserInfo: function(e) {},
    gotoWallet: function() {
        var e = "/pages/accountView/accountView?busModel=".concat(this.data.busModel);
        wx.navigateTo({
            url: e
        });
    },
    gotoDelivery: function() {
        wx.navigateTo({
            url: "/pages/deliveryRecord/deliveryRecord"
        });
    },
    gotoNearby: function() {
        wx.navigateTo({
            url: "/pages/nearbyEquipment/nearbyEquipment"
        });
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        });
    },
    scanCodeHandler: function() {
        if (!wx.getStorageSync("isLogined")) return wx.navigateTo({
            url: "/pages/login/login"
        }), !1;
        e.appData.userinfo = wx.getStorageSync("userinfo"), this.setData({
            username: e.appData.userinfo.username,
            nickName: e.appData.userinfo.nickName
        });
        this.data.username;
        var t = this.data.username;
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(a) {
                wx.request({
                    url: e.appData.url + "weChatApplet/chatQrCode",
                    data: {
                        qrcode: a.result,
                        phone: t
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
                setTimeout(function() {
                    wx.reLaunch({
                        url: "../index/index"
                    });
                }, 100);
            },
            complete: function(e) {}
        });
    },
    deliveryGuideHandler: function() {},
    onShareAppMessage: function(e) {
        console.log(e);
        return {
            title: "亿分类智能回收",
            path: "pages/index/index"
        };
    }
});