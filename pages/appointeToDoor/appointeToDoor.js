var e = getApp();

Page({
    data: {
        username: null,
        Height: 0,
        flag: !0,
        nothing: "nothing",
        order_inner: "order_inner",
        main_order: "main_order",
        orderList: []
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    view: {
                        Height: e.windowHeight
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        if (wx.getStorageSync("isLogined")) {
            e.appData.userinfo = wx.getStorageSync("userinfo"), t.setData({
                username: e.appData.userinfo.username,
                nickName: e.appData.userinfo.nickName
            });
            var n = t.data.username;
            wx.request({
                url: e.appData.url + "customer/queryHomeRes",
                method: "GET",
                data: {
                    status: 1,
                    userName: n
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var n = e.data.data.list || [];
                    n.id;
                    0 === e.data.errcode ? t.setData({
                        orderList: n,
                        nothing: "nothing"
                    }) : t.setData({
                        nothing: "displayblock",
                        order_inner: "no_order_inner",
                        main_order: "no_main_order"
                    });
                },
                fail: function(e) {
                    t.setData({
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
    onShareAppMessage: function() {},
    show: function() {
        this.setData({
            flag: !1
        });
    },
    conceal: function() {
        this.setData({
            flag: !0
        });
    },
    cancleOrder: function(t) {
        var n = this, a = "", o = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "操作提示",
            content: "您确定要取消订单吗",
            success: function(t) {
                if (t.confirm) {
                    var r = e.appData.userinfo.username;
                    wx.request({
                        url: e.appData.url + "recovery/cancel?id=" + o,
                        data: {},
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(t) {
                            0 === t.data.errcode ? (a = t.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3,
                                mask: !0,
                                success: function(t) {
                                    wx.request({
                                        url: e.appData.url + "customer/queryHomeRes",
                                        method: "GET",
                                        data: {
                                            status: 1,
                                            userName: r
                                        },
                                        header: {
                                            "content-type": "application/json"
                                        },
                                        success: function(e) {
                                            var t = e.data.data.list || [];
                                            t.id;
                                            0 === e.data.errcode ? n.setData({
                                                orderList: t,
                                                nothing: "nothing"
                                            }) : n.setData({
                                                nothing: "displayblock",
                                                order_inner: "no_order_inner",
                                                main_order: "no_main_order"
                                            });
                                        },
                                        fail: function(e) {
                                            n.setData({
                                                nothing: "nothing"
                                            });
                                        }
                                    });
                                }
                            })) : (a = t.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3
                            }));
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "取消订单操作提示",
                                content: "取消失败"
                            });
                        }
                    });
                } else t.cancel && wx.showToast({
                    title: "用户点击取消",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    markOrder: function() {
        var t = wx.getStorageSync("userinfo").username;
        wx.request({
            url: e.appData.url + "customer/getAddress?userName=" + t + "&isDoorRecovery=1",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var t = e.data.data, n = t.nick, a = t.mobile, o = t.provinceName, r = t.cityName, i = t.areaName, s = t.address, c = t.unit_id, u = e.data.errcode, d = e.data.errmsg;
                0 === u ? wx.navigateTo({
                    url: "/pages/editOrder/editOrder?nick=" + n + "&mobile=" + a + "&provinceName=" + o + "&cityName=" + r + "&areaName=" + i + "&address=" + s + "&unit_id=" + c
                }) : 2 === u ? wx.showModal({
                    title: d,
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#707070",
                    confirmText: "完善地址",
                    confirmColor: "#53f4eb",
                    success: function(e) {
                        e.confirm ? wx.navigateTo({
                            url: "/pages/myaddress/myaddress"
                        }) : e.cancel && wx.showToast({
                            title: "用户点击取消",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "操作提示",
                            content: "操作失败"
                        });
                    }
                }) : wx.showToast({
                    title: d,
                    icon: "none",
                    duration: 3e3,
                    mask: !0
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "操作提示",
                    content: "操作失败"
                });
            }
        });
    },
    listenerButtonPreviewImage: function(e) {
        var t = e.target.dataset.url, n = t.split(",");
        wx.previewImage({
            current: t,
            urls: n,
            success: function(e) {},
            fail: function() {}
        });
    }
});