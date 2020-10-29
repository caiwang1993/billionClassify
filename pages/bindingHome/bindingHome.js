var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../@babel/runtime/regenerator")), n = t(require("../../@babel/runtime/helpers/asyncToGenerator")), a = getApp();

Page({
    data: {
        bindingList: {
            pageNumber: 1,
            pageSize: 10,
            data: {
                belongId: [],
                customer: {}
            },
            noData: !1,
            noMore: !1
        },
        defaultImg: "../../images/tabbar_user_selected.png",
        istrue: !1,
        inputValue: "",
        hasInputError: !1,
        errorTips: "",
        qrCodeAccount: "",
        typeid: null
    },
    fetchData: function() {
        var t = this, e = a.appData.url, n = "".concat(e).concat("binderAccount/listCustomer"), r = this.data.bindingList;
        wx.showLoading(), wx.request({
            url: n,
            data: {
                customerId: a.appData.userinfo.customerId,
                pageNumber: r.pageNumber,
                isWx: 1
            },
            success: function(e) {
                if (200 === e.statusCode) {
                    var a = e.data;
                    0 === a.errcode ? (r.data = a.data, t.isEmpty(r.data.customer.headPic) && (r.data.customer.headPic = t.data.defaultImg), 
                    r.data.belongId && Array.isArray(r.data.belongId) ? r.data.belongId = r.data.belongId.map(function(e) {
                        return t.isEmpty(e.headPic) && (e.headPic = t.data.defaultImg), e;
                    }) : r.data.belongId = [], t.setData({
                        bindingList: r
                    })) : wx.showToast({
                        title: a.errmsg,
                        icon: "none",
                        duration: 2e3
                    });
                } else console.error("请求失败 url:" + n);
            },
            fail: function() {},
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    bindingAction: function() {
        var t = (0, n.default)(e.default.mark(function t(n) {
            var a, r, o, i;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = n.currentTarget.dataset.typeid, this.setData({
                        typeid: a
                    }), t.next = 4, this.scanCodeAction();

                  case 4:
                    if (0 === (r = t.sent).errcode) {
                        t.next = 8;
                        break;
                    }
                    return wx.showToast({
                        title: r.errmsg,
                        icon: "none",
                        duration: 2e3
                    }), t.abrupt("return");

                  case 8:
                    return o = r.result, t.next = 11, this.validateAccount(o);

                  case 11:
                    if (0 === (i = t.sent).errcode) {
                        t.next = 15;
                        break;
                    }
                    return wx.showToast({
                        title: i.errmsg,
                        icon: "none",
                        duration: 2e3
                    }), t.abrupt("return");

                  case 15:
                    this.setData({
                        qrCodeAccount: o,
                        istrue: !0
                    });

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(),
    validateAccount: function(t) {
        return new Promise(function(e, n) {
            var r = a.appData.url, o = "".concat(r).concat("binderAccount/bagQr");
            wx.showLoading({
                title: "检测账户中..."
            }), wx.request({
                url: o,
                data: {
                    customerId: a.appData.userinfo.customerId,
                    number: t,
                    isWx: 1
                },
                success: function(t) {
                    e(t.data);
                },
                fail: function() {
                    e({
                        errcode: 999,
                        errmsg: "请求接口失败"
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    scanCodeAction: function() {
        return new Promise(function(t, e) {
            wx.scanCode({
                scanType: [ "qrCode" ],
                success: function(e) {
                    var n = {};
                    "QR_CODE" !== e.scanType ? (n.errcode = 1, n.errmsg = "不支持的类型") : (n.errcode = 0, 
                    n.errmsg = "", n.result = e.result), t(n);
                },
                fail: function(e) {
                    t({
                        errcode: 2,
                        errmsg: "扫码失败，请重试"
                    });
                }
            });
        });
    },
    bindingAccount: function() {
        var t = this;
        return new Promise(function(e, n) {
            var r = a.appData.url, o = t.data.typeid, i = 1 === o ? "binderAccount/binDingBelongId" : "binderAccount/binDingMain";
            console.log(o);
            var u = "".concat(r).concat(i);
            wx.showLoading({
                title: "处理中..."
            }), wx.request({
                url: u,
                method: "POST",
                data: {
                    customerId: a.appData.userinfo.customerId,
                    number: t.data.qrCodeAccount,
                    passWord: t.data.inputValue,
                    isWx: 1
                },
                success: function(t) {
                    wx.hideLoading(), e(t.data);
                },
                fail: function() {
                    wx.hideLoading(), e({
                        errcode: 999,
                        errmsg: "请求接口失败"
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    closeDialog: function() {
        var t = (0, n.default)(e.default.mark(function t(n) {
            var a, r;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (a = this, "ok" === n.detail.from) {
                        t.next = 5;
                        break;
                    }
                    return this.setData({
                        istrue: !1
                    }), t.abrupt("return");

                  case 5:
                    if (!(this.data.inputValue.length <= 0)) {
                        t.next = 8;
                        break;
                    }
                    return this.setData({
                        hasInputError: !0,
                        errorTips: "关联账号的密码不可为空"
                    }), t.abrupt("return");

                  case 8:
                    return t.next = 10, this.bindingAccount();

                  case 10:
                    r = t.sent, this.setData({
                        hasInputError: !1,
                        errorTips: "",
                        istrue: !1,
                        inputValue: "",
                        qrCodeAccount: ""
                    }), wx.nextTick(function() {
                        0 === r.errcode ? (wx.showToast({
                            title: "账号关联成功",
                            icon: "success",
                            duration: 2e3
                        }), setTimeout(function() {
                            a.fetchData();
                        }, 2050)) : wx.showToast({
                            title: r.errmsg,
                            icon: "none",
                            duration: 5e3
                        });
                    });

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(),
    inputAction: function(t) {
        "input" === t.type && this.setData({
            inputValue: t.detail.value
        });
    },
    isEmpty: function(t) {
        return null == t || "" === t;
    },
    onLoad: function(t) {
        this.fetchData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});