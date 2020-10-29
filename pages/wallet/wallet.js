var t, a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), e = getApp(), n = require("../../utils/util.js");

Page((t = {
    data: {
        username: null,
        Score: 0,
        openid: "",
        nick: "",
        withDrawTxt: "提现",
        disabled: !1,
        loading: !1,
        delay: 3,
        cashCheckHandler: null,
        showTips: !1,
        flag: !0,
        WithdrawalAmount: 0,
        pageNum: 1,
        hiddenmodalput: !0,
        cashAmount: 1,
        list_inner: "list_inner"
    },
    onLoad: function(t) {
        var a = this, n = this;
        if (wx.getStorageSync("isLogined")) {
            e.appData.userinfo = wx.getStorageSync("userinfo"), this.setData({
                username: e.appData.userinfo.username
            });
            var s = this.data.username;
            wx.showLoading({
                title: "加载中..."
            }), wx.request({
                url: e.appData.url + "/weChatApplet/chatCustCast",
                data: {
                    userName: s
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    n.setData({
                        Score: t.data.data.score,
                        WithdrawalAmount: t.data.data.score / 100
                    });
                },
                fail: function() {
                    console.log("请求数据失败。。。。。");
                },
                complete: function() {
                    wx.hideLoading();
                }
            }), n.startCheckStatus(), n.setData({
                username: e.appData.userinfo.username
            });
            s = n.data.username;
            wx.showToast({
                title: "加载中...",
                icon: "loading"
            }), n.getList(function(t) {
                var n = a, s = a.data, i = s.pageNum;
                s.phone;
                console.log("当前页码数pageNum:" + i), wx.request({
                    url: e.appData.url + "weChatApplet/wxChatCostDatil",
                    data: {
                        pageNum: i,
                        phone: e.appData.userinfo.username
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        var a = n.data, e = a.pageNum, s = a.errmsgList, i = t.data.errmsg || [], o = t.data.errmsg.length, r = t.data.errcode;
                        t.data.errmsg.status;
                        0 === o && wx.showToast({
                            title: "没有更多数据了~~~",
                            icon: "none",
                            duration: 500
                        }), e > 1 && (i = s.concat(i)), 1 == r ? (n.setData({
                            disPlay: "disNone",
                            errmsgList: i,
                            list_inner: "list_inner"
                        }), 0 === o && (n.setData({
                            errmsgList: i
                        }), wx.showToast({
                            title: "没有更多数据了~~~",
                            icon: "none",
                            duration: 500
                        }))) : -1 == r && (n.setData({}), wx.showToast({
                            title: "没有更多数据了~~~",
                            icon: "none",
                            duration: 500
                        }));
                    },
                    fail: function(t) {},
                    complete: function() {
                        t && t();
                    }
                });
            });
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    getList: function(t) {
        var a = this, n = this.data, s = n.pageNum;
        n.phone;
        console.log("当前页码数pageNum:" + s), wx.request({
            url: e.appData.url + "weChatApplet/wxChatCostDatil",
            data: {
                pageNum: s,
                phone: e.appData.userinfo.username
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = a.data, n = e.pageNum, s = e.errmsgList, i = t.data.errmsg || [], o = t.data.errmsg.length, r = t.data.errcode;
                t.data.errmsg.status;
                0 === o && wx.showToast({
                    title: "没有更多数据了~~~",
                    icon: "none",
                    duration: 500
                }), n > 1 && (i = s.concat(i)), 1 == r ? (a.setData({
                    disPlay: "disNone",
                    errmsgList: i,
                    list_inner: "list_inner"
                }), 0 === o && (a.setData({
                    errmsgList: i
                }), wx.showToast({
                    title: "没有更多数据了~~~",
                    icon: "none",
                    duration: 500
                }))) : -1 == r && (a.setData({}), wx.showToast({
                    title: "没有更多数据了~~~",
                    icon: "none",
                    duration: 500
                }));
            },
            fail: function(t) {},
            complete: function() {
                t && t();
            }
        });
    },
    startCheckStatus: function() {
        var t = this;
        null !== this.data.cashCheckHandler && clearInterval(this.data.cashCheckHandler), 
        this.data.cashCheckHandler = setInterval(function() {
            t.checkCashStatus();
        }, 100);
    },
    clearCheckStatus: function() {
        null !== this.data.cashCheckHandler && clearInterval(this.data.cashCheckHandler);
        try {
            wx.removeStorageSync("cashTime"), wx.removeStorageSync("cashResult"), this.setData({
                showTips: !1
            });
        } catch (t) {}
    },
    checkCashStatus: function() {
        var t = null, a = null;
        try {
            t = wx.getStorageSync("cashTime"), a = JSON.parse(wx.getStorageSync("cashResult"));
        } catch (t) {}
        if (t) {
            var e = Number(t), n = new Date(e).getTime(), s = Date.now();
            null !== a && ("fail" === a.result && (this.changeCash(!0), this.clearCheckStatus()), 
            "success" === a.result && ((s - n) / 1e3 >= this.data.delay ? (this.setData({
                showTips: !1
            }), wx.nextTick(function() {
                wx.showToast({
                    title: a.msg,
                    icon: "none",
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../index/index"
                        });
                    }
                });
            }), this.clearCheckStatus()) : this.setData({
                showTips: !0
            })));
        }
    },
    goAmountDetail: function() {
        wx.navigateTo({
            url: "/pages/amountDetail/amountDetail"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.data.Score;
        var t = wx.getStorageSync("openid"), a = this.data.username;
        this.setData({
            money: this.data.Score / 100,
            openid: t,
            nick: a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this, a = this.data.pageNum;
        a += 1, this.setData({
            pageNum: a
        }), wx.nextTick(function() {
            return t.getList();
        });
    },
    onShareAppMessage: function() {}
}, (0, a.default)(t, "onPullDownRefresh", function() {
    wx.setNavigationBarTitle({
        title: "刷新中……"
    }), this.data.pageNum > 1 ? setTimeout(function() {
        wx.stopPullDownRefresh(), wx.setNavigationBarTitle({
            title: "我的钱包"
        });
    }, 1e3) : (this.setData({
        pageNum: 1
    }), this.getList(function() {
        wx.stopPullDownRefresh(), wx.setNavigationBarTitle({
            title: "我的钱包"
        });
    }));
}), (0, a.default)(t, "changeCash", function() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.setData({
        withDrawTxt: "提现",
        disabled: !1,
        loading: !1
    });
}), (0, a.default)(t, "withDraw", function(t) {
    var a = this.data.Score / 100;
    if (this.data.Score < 100) wx.showModal({
        title: "提示",
        content: "您的积分不足100，不可提现"
    }); else {
        var e = "每天可提现一次，一次提现不可超过200元，";
        a > 100 ? this.setData({
            hiddenmodalput: !1
        }) : (e += "本次提现按积分折算金额为: " + a + " 元", this.setData({
            cashAmount: a
        }), this.doWithDraw(e));
    }
}), (0, a.default)(t, "cancelM", function(t) {
    this.setData({
        hiddenmodalput: !0,
        cashAmount: ""
    });
}), (0, a.default)(t, "confirmM", function() {
    this.setData({
        hiddenmodalput: !0
    });
    var t = this.data, a = t.cashAmount, e = t.Score, n = parseInt(a);
    if (0 < n && n < 199 && n < e / 100 + .001) {
        var s = "本次申请提现金额为: ".concat(a, "元，剩余").concat(e / 100 - a, " 元");
        this.doWithDraw(s);
    } else wx.showToast({
        title: "输入的值值必须为大于1小于200的整数，并且不大于积分总额",
        icon: "none",
        time: 5e3
    });
}), (0, a.default)(t, "isCashAmount", function(t) {
    var a = this.validateNumber(t.detail.value);
    this.setData({
        cashAmount: a
    });
}), (0, a.default)(t, "validateNumber", function(t) {
    return /[^\d]/g.test(t) ? 1 < t < 199 && t < this.data.Score / 100 && console.log("val是否大于1小于200", t) : console.log("val是否大于1小于200，且不能大于积分总额"), 
    t;
}), (0, a.default)(t, "canCash", function() {
    Date.now.toString();
    var t = wx.getStorageSync("__cashDate");
    if (!t) return !0;
    var a = n.formatTime(new Date(t));
    return !(n.formatTime(new Date()).slice(0, 10) <= a.slice(0, 10));
}), (0, a.default)(t, "show", function() {
    this.setData({
        flag: !1
    });
}), (0, a.default)(t, "conceal", function() {
    this.setData({
        flag: !0
    });
}), (0, a.default)(t, "doWithDraw", function(t) {
    var a = this;
    wx.showModal({
        title: "你确定要提现吗",
        content: t,
        success: function(t) {
            if (t.confirm) {
                a.changeCash(!1);
                var n = Date.now().toString(), s = {
                    cashTime: n,
                    result: "loading",
                    msg: ""
                };
                wx.setStorageSync("cashTime", n), wx.setStorageSync("cashResult", JSON.stringify(s)), 
                wx.nextTick(function() {
                    return a.startCheckStatus();
                }), wx.request({
                    url: e.appData.url + "wx/pcost",
                    data: {
                        openid: a.data.openid,
                        money: 100 * a.data.cashAmount,
                        nick: a.data.nick
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        0 === t.data.errcode ? (s.result = "success", s.msg = t.data.errmsg, wx.setStorageSync("cashResult", JSON.stringify(s)), 
                        wx.setStorageSync("__cashDate", n), wx.showToast({
                            title: t.data.errmsg,
                            icon: "none",
                            duration: 5e3,
                            mask: !0
                        }), setTimeout(function() {
                            wx.request({
                                url: e.appData.url + "/weChatApplet/chatCustCast",
                                data: {
                                    userName: e.appData.userinfo.username
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(t) {
                                    a.setData({
                                        Score: t.data.data.score,
                                        WithdrawalAmount: t.data.data.score / 100
                                    });
                                },
                                fail: function() {
                                    console.log("请求数据失败。。。。。");
                                },
                                complete: function() {
                                    wx.hideLoading();
                                }
                            });
                        }, 5e3), setTimeout(function() {
                            wx.request({
                                url: e.appData.url + "weChatApplet/wxChatCostDatil",
                                data: {
                                    pageNum: 1,
                                    phone: e.appData.userinfo.username
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(t) {
                                    var e = a.data, n = e.pageNum, s = e.errmsgList, i = t.data.errmsg || [], o = t.data.errmsg.length, r = t.data.errcode;
                                    t.data.errmsg.status;
                                    0 === o && wx.showToast({
                                        title: "没有更多数据了~~~",
                                        icon: "none",
                                        duration: 500
                                    }), n > 1 && (i = s.concat(i)), 1 == r ? (a.setData({
                                        disPlay: "disNone",
                                        errmsgList: i,
                                        list_inner: "list_inner"
                                    }), 0 === o && (a.setData({
                                        errmsgList: i
                                    }), wx.showToast({
                                        title: "没有更多数据了~~~",
                                        icon: "none",
                                        duration: 500
                                    }))) : -1 == r && wx.showToast({
                                        title: "没有更多数据了~~~",
                                        icon: "none",
                                        duration: 500
                                    });
                                },
                                fail: function(t) {},
                                complete: function() {}
                            });
                        }, 5e3)) : (wx.showToast({
                            title: t.data.errmsg,
                            icon: "none",
                            duration: 3e3,
                            mask: !0
                        }), s.result = "fail", s.msg = t.data.errmsg, wx.setStorageSync("cashResult", JSON.stringify(s)));
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "请求提现接口失败，请稍后再试",
                            icon: "none",
                            duration: 3e3,
                            mask: !0
                        }), a.changeCash(!0);
                    }
                });
            } else t.cancel && console.log("用户点击取消");
        }
    });
}), t));