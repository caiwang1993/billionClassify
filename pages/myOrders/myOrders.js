var t = getApp();

Page({
    data: {
        Height: 0,
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        status: 1,
        userName: "",
        orderList: [],
        nothing: "nothing",
        order_inner: "order_inner"
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    view: {
                        Height: t.windowHeight,
                        tabContentHeight: t.windowHeight - 57
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        if (wx.getStorageSync("isLogined")) {
            t.appData.userinfo = wx.getStorageSync("userinfo"), this.setData({
                username: t.appData.userinfo.username
            });
            var e = wx.getStorageSync("userinfo").username;
            this.setData({
                status: 1,
                userName: e
            }), this.getOrderList(1, e);
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    tabFun: function(t) {
        var e = wx.getStorageSync("userinfo").username, n = t.target.dataset.id, a = t.target.dataset.status, o = {};
        o.curHdIndex = n, o.curBdIndex = n, this.setData({
            tabArr: o,
            status: a,
            userName: e
        }), this.getOrderList(a, e);
    },
    getOrderList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n, a = this;
        wx.request({
            url: t.appData.url + "customer/queryHomeRes",
            method: "GET",
            data: {
                status: e,
                userName: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = t.data.data.list || [];
                0 == t.data.errcode ? a.setData({
                    orderList: e,
                    nothing: "nothing",
                    order_inner: "order_inner"
                }) : a.setData({
                    nothing: "display",
                    order_inner: "no_order_inner"
                });
            },
            fail: function(t) {
                a.setData({
                    nothing: "nothing"
                });
            }
        });
    },
    cancleOrder: function(e) {
        var n = this, a = "", o = e.currentTarget.dataset.orderid;
        wx.showModal({
            title: "操作提示",
            content: "您确定要取消订单吗",
            success: function(e) {
                if (e.confirm) {
                    var r = wx.getStorageSync("userinfo").username;
                    wx.request({
                        url: t.appData.url + "recovery/cancel?id=" + o,
                        data: {},
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(e) {
                            0 === e.data.errcode ? (a = e.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3,
                                mask: !0,
                                success: function(e) {
                                    wx.request({
                                        url: t.appData.url + "customer/queryHomeRes",
                                        method: "GET",
                                        data: {
                                            status: 1,
                                            userName: r
                                        },
                                        header: {
                                            "content-type": "application/json"
                                        },
                                        success: function(t) {
                                            var e = t.data.data.list || [];
                                            e.id;
                                            0 === t.data.errcode ? n.setData({
                                                orderList: e,
                                                nothing: "nothing"
                                            }) : n.setData({
                                                nothing: "displayblock",
                                                order_inner: "no_order_inner"
                                            });
                                        },
                                        fail: function(t) {
                                            n.setData({
                                                nothing: "nothing"
                                            });
                                        }
                                    });
                                }
                            })) : (a = e.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3
                            }));
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "取消订单操作提示",
                                content: "取消失败"
                            });
                        }
                    });
                } else e.cancel && wx.showToast({
                    title: "用户点击取消",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    deleteOrder: function(e) {
        var n = this, a = "", o = (n.data.status, e.currentTarget.dataset.orderid), r = e.currentTarget.dataset.orderstate;
        5 === r ? n.setData({
            status: 3
        }) : 2 !== r && 3 !== r && 4 !== r || n.setData({
            status: 2
        }), wx.showModal({
            title: "操作提示",
            content: "您确定要删除订单吗",
            success: function(e) {
                if (e.confirm) {
                    var r = r, s = wx.getStorageSync("userinfo").username;
                    wx.request({
                        url: t.appData.url + "recovery/deleteOrder?id=" + o,
                        data: {},
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(e) {
                            0 === e.data.errcode ? (a = e.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3,
                                mask: !0,
                                success: function(e) {
                                    wx.request({
                                        url: t.appData.url + "customer/queryHomeRes",
                                        method: "GET",
                                        data: {
                                            status: r,
                                            userName: s
                                        },
                                        header: {
                                            "content-type": "application/json"
                                        },
                                        success: function(t) {
                                            var e = t.data.data.list || [];
                                            e.id;
                                            0 === t.data.errcode ? n.setData({
                                                orderList: e,
                                                nothing: "nothing"
                                            }) : (n.setData({
                                                nothing: "displayblock",
                                                order_inner: "no_order_inner"
                                            }), console.log("显示暂无数据"));
                                        },
                                        fail: function(t) {
                                            n.setData({
                                                nothing: "nothing"
                                            });
                                        }
                                    });
                                }
                            })) : (a = e.data.errmsg, wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3
                            }));
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "操作提示",
                                content: "删除订单失败"
                            });
                        }
                    });
                } else e.cancel && wx.showToast({
                    title: "用户点击取消",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    listenerButtonPreviewImage: function(t) {
        var e = t.target.dataset.url, n = e.split(",");
        wx.previewImage({
            current: e,
            urls: n,
            success: function(t) {},
            fail: function() {}
        });
    }
});