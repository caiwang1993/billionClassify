var t = getApp();

Page({
    data: {
        tagList: [ {
            key: "cast",
            name: "投递记录",
            hasUnRead: !1
        }, {
            key: "recovery",
            name: "人工回收记录",
            hasUnRead: !1
        }, {
            key: "sweep",
            name: "预约上门",
            hasUnRead: !1
        } ],
        tagData: {
            cast: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1,
                count: 0
            },
            recovery: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1,
                count: 0
            },
            sweep: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1,
                count: 0
            }
        },
        height: 0,
        currentIndex: 0,
        api: {
            0: "appHome/getCastListDetail",
            1: "appHome/doorRecoveryDetailList",
            2: "appHome/listSweepDetail"
        },
        mapTags: {
            0: "cast",
            1: "recovery",
            2: "sweep"
        }
    },
    tagChangeAction: function(t) {
        var a = this, e = t.detail.index;
        this.setData({
            currentIndex: e
        }), wx.nextTick(function() {
            var t = a.data.currentIndex, e = a.data.tagData[a.data.mapTags[t]];
            e.noMore || e.noData || e.data.length > 0 || a.fetchData();
        });
    },
    scrolltolowerHandler: function() {
        var a = this, e = this.data.currentIndex, o = t.appData.url, n = this.data.api[e], c = ("".concat(o).concat(n), 
        this.data.tagData[this.data.mapTags[e]]);
        c.noMore || (c.pageNum++, this.setData({
            tagData: this.data.tagData
        }), wx.nextTick(function() {
            return a.fetchData();
        }));
    },
    goDetail: function(t) {
        var a = t.currentTarget.dataset, e = (a.id, a.index), o = a.lookup;
        0 === Number(o) && this.updateUnRead(e);
    },
    updateUnRead: function(t) {
        var a = this, e = this.data.currentIndex, o = this.data.mapTags[e], n = this.data.tagData, c = this.data.tagList, i = n[o];
        t >= 0 && (i.data[t].cLookUp = 1);
        try {
            c[e].hasUnRead = i.data.filter(function(t) {
                return 0 === t.cLookUp;
            }).length > 0;
        } catch (t) {
            console.log(t);
        }
        var r = t > 0 ? 1e3 : 200;
        a.delay(r, function() {
            a.setData({
                tagList: c,
                tagData: n
            });
        });
    },
    delay: function(t, a) {
        setTimeout(function() {
            a && a();
        }, t);
    },
    onLoad: function(t) {},
    onReady: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    height: a.windowHeight - 30
                });
            }
        });
    },
    onShow: function() {
        wx.getStorageSync("isLogined") ? (t.appData.userinfo = wx.getStorageSync("userinfo"), 
        this.setData({
            customerId: t.appData.userinfo.customerId
        })) : wx.navigateTo({
            url: "../login/login"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    fetchData: function() {
        var a = this, e = this.data.currentIndex, o = t.appData.url, n = this.data.api[e], c = "".concat(o).concat(n), i = this.data.mapTags[e], r = this.data.tagData[i];
        r.noMore || r.noData || wx.request({
            url: c,
            data: {
                customerId: t.appData.userinfo.customerId,
                pageNum: r.pageNum,
                isWx: 1
            },
            success: function(t) {
                if (200 === t.statusCode) {
                    var e = t.data;
                    if (0 === e.errcode) {
                        var o = e.data.list, n = o.length;
                        0 === r.data.length && 0 === n && (r.noData = !0), (0 === n || n < r.pageSize) && (r.noMore = !0), 
                        r.pageNum > 1 && r.noMore && wx.showToast({
                            icon: "none",
                            title: "没有更多数据了"
                        }), r.count = e.data.count, n > 0 && (o.forEach(function(t) {
                            return t.details.forEach(function(t) {
                                try {
                                    t.iconPath = a.getIcon(t.sourceId);
                                    var e = 2 === a.data.currentIndex ? a.getHomeStatus(t.statue) : a.getStatus(t.statue);
                                    t.statusTxt = e.txt, t.statusTxtClass = e.color, t.isPass = 0 !== t.statue && 2 !== t.statue;
                                } catch (t) {}
                            }), t;
                        }), r.data = r.data.concat(o)), a.setData({
                            tagData: a.data.tagData
                        });
                    }
                }
            },
            fail: function() {},
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    getIcon: function(t) {
        return "../../images/icon_toudi@3x.png";
    },
    getStatus: function(t) {
        return {
            0: {
                txt: "待巡检",
                color: "c-blue"
            },
            1: {
                txt: "巡检已通过",
                color: ""
            },
            2: {
                txt: "巡检未通过",
                color: "c-red"
            },
            3: {
                txt: "已回收",
                color: ""
            },
            4: {
                txt: "已清运",
                color: ""
            }
        }[t];
    },
    getHomeStatus: function(t) {
        return {
            0: {
                txt: "待处理",
                color: "c-blue"
            },
            1: {
                txt: "确认上门",
                color: "c-blue"
            },
            2: {
                txt: "拒绝上门",
                color: "c-red"
            },
            3: {
                txt: "超时取消",
                color: "c-red"
            },
            4: {
                txt: "回收失败",
                color: "c-red"
            },
            5: {
                txt: "回收成功",
                color: ""
            }
        }[t];
    }
});