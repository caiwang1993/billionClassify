var t = require("../../utils/accounting.min.js"), e = (require("../../utils/debounce.js"), 
getApp());

Page({
    data: {
        showTips: !1,
        customerCountScore: 0,
        negativeScore: 0,
        positiveScore: 0,
        busModel: 0,
        filterData: [ {
            key: "idVOList",
            name: "选择类型",
            id: 0,
            state: "up",
            data: []
        }, {
            key: "customers",
            name: "请选择人员",
            id: 0,
            state: "up",
            data: []
        } ],
        filterbdHeight: 0,
        filterbdData: [],
        selected: [],
        filterBdTop: 0,
        contentHeight: 0,
        subDataList: {
            pageNum: 1,
            pageSize: 10,
            noMore: !1,
            noData: !1,
            filterStr: "",
            data: []
        },
        scrolltop: 0,
        scrollDebouncedHandler: null
    },
    filterItemTap: function(t) {
        var e = this;
        this.checkFilter() || wx.nextTick(function() {
            var a = t.currentTarget.dataset.index, n = e.data.filterData[a];
            n.state = "up" === n.state ? "down" : "up", e.setData({
                filterData: e.data.filterData,
                filterbdData: "up" === n.state ? [] : n,
                filterbdHeight: "up" === n.state ? 0 : 200,
                showTips: !0
            });
        });
    },
    checkFilter: function() {
        var t = !1, e = this.data.filterData.map(function(e) {
            return "down" === e.state && (e.state = "up", t = !0), e;
        });
        return t && this.setData({
            filterData: e,
            filterbdData: [],
            filterbdHeight: 0,
            showTips: !1
        }), t;
    },
    selectedItem: function(t) {
        var e = this;
        if ("tap" === t.type) {
            var a = t.currentTarget.dataset.key, n = Number(t.currentTarget.dataset.index), i = this.data.filterData, o = i.findIndex(function(t) {
                return t.key === a;
            });
            o >= 0 && (i[o].data.forEach(function(t, e, a) {
                t.selected = e == n;
            }), "idVOList" === a ? (i[o].name = i[o].data[n].title, i[o].id = i[o].data[n].id) : (i[o].name = i[o].data[n].nick, 
            i[o].id = i[o].data[n].id), this.setData({
                filterData: i
            }), wx.nextTick(function() {
                return e.checkFilter();
            })), this.fetchSubData();
        }
    },
    getSelectedItems: function() {
        var t = {}, e = {
            customers: "user",
            idVOList: "status"
        };
        return this.data.filterData.map(function(a) {
            var n = a.name, i = a.id, o = a.key;
            t[e[o]] = {
                name: n,
                id: i,
                key: o
            };
        }), t;
    },
    fetchData: function() {
        var a = this, n = e.appData.url, i = "".concat(n).concat("appHome/newGetScore");
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: i,
            data: {
                customerId: e.appData.userinfo.customerId,
                isWx: 1
            },
            success: function(e) {
                if (200 === e.statusCode) {
                    var n = e.data;
                    if (0 === n.errcode) {
                        var o = n.data, r = o.customerCountScore, c = o.negativeScore, s = o.positiveScore, u = o.customers, d = o.idVOList, l = a.data.filterData.map(function(t) {
                            return "customers" === t.key ? u.length > 0 && (t.data = u.map(function(t) {
                                return t.selected = !1, t;
                            }), t.name = u[0].nick, t.id = u[0].id) : "idVOList" === t.key && d.length > 0 && (t.data = d.map(function(t) {
                                return t.selected = !1, t;
                            }), t.name = d[0].title, t.id = d[0].id), t;
                        });
                        a.setData({
                            filterData: l,
                            customerCountScore: t.formatNumber(r),
                            negativeScore: t.formatNumber(c),
                            positiveScore: t.formatNumber(s)
                        }), wx.nextTick(function() {
                            a.fetchSubData();
                        });
                    }
                } else console.error("请求失败 url:" + i);
            },
            fail: function() {},
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    fetchSubData: function() {
        var t = this, a = e.appData.url, n = "".concat(a).concat("appHome/newGetScoreListDetail"), i = this.getSelectedItems(), o = i.user.id, r = i.status.id, c = "".concat(o, ",").concat(r), s = t.data.subDataList, u = t.data.subDataList.pageNum;
        0 === s.filterStr.length && (s.filterStr = c), s.filterStr === c && (s.noData || s.noMore) || (s.filterStr !== c && t.setData({
            scrolltop: 0,
            subDataList: {
                pageNum: 1,
                pageSize: 10,
                noMore: !1,
                noData: !1,
                filterStr: c,
                data: []
            }
        }), wx.nextTick(function() {
            u = t.data.subDataList.pageNum, wx.request({
                url: n,
                data: {
                    customerId: e.appData.userinfo.customerId,
                    pageNum: u,
                    user: o,
                    status: r,
                    isWx: 1
                },
                success: function(e) {
                    if (200 === e.statusCode) {
                        var a = e.data;
                        0 === a.errcode && wx.nextTick(function() {
                            var e = t.data.subDataList, n = a.data.map(function(e) {
                                return e.getScore > 0 && (e.getScore = "+".concat(e.getScore)), 4 === e.sourceId && (e.title = "".concat(e.title, " ").concat(null === e.weight ? "0" : e.weight, "g")), 
                                6 === e.sourceId && (e.title = "上门回收预约结算"), e.iconPath = t.getIcon(e.sourceId), 
                                e;
                            });
                            e.data = e.data.concat(n), 0 === a.data.length && 1 === e.pageNum && (e.noData = !0), 
                            a.data.length < e.pageSize && (e.noMore = !0), e.noMore && u > 1 && wx.showToast({
                                title: "没有更多数据了",
                                icon: "none",
                                duration: 2e3
                            }), wx.nextTick(function() {
                                t.setData({
                                    subDataList: e
                                });
                            });
                        });
                    } else console.error("请求失败 url:" + n);
                },
                fail: function() {},
                complete: function() {
                    wx.hideLoading();
                }
            });
        }));
    },
    scrolltolowerHandler: function(t) {
        var e = this;
        if (console.log("scrolltolowerHandler called...", t), "scrolltolower" === t.type) {
            var a = this.data.subDataList;
            a.pageNum++, this.setData({
                subDataList: a
            }), wx.nextTick(function() {
                e.fetchSubData();
            });
        }
    },
    scrollHandler: function(t) {},
    getIcon: function(t) {
        var e = "../../images/", a = {
            1: e + "icon_toudi@3x.png",
            2: e + "icon_duihuan@3x.png",
            3: e + "icon_rgkc@3x.png",
            5: e + "icon_duihuan@3x.png",
            6: e + "icon_smhs@3x.png",
            7: e + "icon_tixian@3x.png",
            8: e + "icon_ddqxth@3x.png"
        };
        return a[t] ? a[t] : "../../images/icon_rgkc@3x.png";
    },
    onLoad: function(t) {
        if (wx.getStorageSync("isLogined")) {
            var e = this;
            t.busModel && this.setData({
                busModel: t.busModel
            }), this.fetchData(), this.createSelectorQuery().select("#top-main").boundingClientRect(function(t) {
                e.setData({
                    filterBdTop: t.height
                });
                wx.getSystemInfoSync();
                wx.getSystemInfo({
                    success: function(a) {
                        e.setData({
                            contentHeight: a.windowHeight - t.height
                        });
                    }
                });
            }).exec();
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    gotoWallet: function() {
        wx.navigateTo({
            url: "/pages/wallet/wallet"
        });
    }
});