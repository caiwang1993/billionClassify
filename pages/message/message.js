var a = getApp();

Page({
    data: {
        tagList: [ {
            key: "notice",
            name: "社区通知",
            hasUnRead: !1
        }, {
            key: "recovery",
            name: "上门回收",
            hasUnRead: !1
        }, {
            key: "feedback",
            name: "巡检反馈",
            hasUnRead: !1
        }, {
            key: "sysmsgs",
            name: "系统消息",
            hasUnRead: !1
        } ],
        tagData: {
            notice: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1
            },
            recovery: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1
            },
            feedback: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1
            },
            sysmsgs: {
                noMore: !1,
                pageNum: 1,
                pageSize: 10,
                data: [],
                noData: !1
            }
        },
        height: 0,
        currentIndex: 0,
        api: {
            0: "notice/communityMessage",
            1: "notice/recoveryMessage",
            2: "notice/feedbackMessage",
            3: "notice/sysMessage"
        },
        mapTags: {
            0: "notice",
            1: "recovery",
            2: "feedback",
            3: "sysmsgs"
        }
    },
    tagChangeAction: function(a) {
        var t = this, e = a.detail.index;
        this.setData({
            currentIndex: e
        }), wx.nextTick(function() {
            var a = t.data.currentIndex, e = t.data.tagData[t.data.mapTags[a]];
            e.noMore || e.noData || e.data.length > 0 || t.fetchData();
        });
    },
    scrolltolowerHandler: function() {
        var t = this, e = this.data.currentIndex, n = a.appData.url, o = this.data.api[e], i = ("".concat(n).concat(o), 
        this.data.tagData[this.data.mapTags[e]]);
        i.noMore || (i.pageNum++, this.setData({
            tagData: this.data.tagData
        }), wx.nextTick(function() {
            return t.fetchData();
        }));
    },
    goDetail: function(a) {
        var t = a.currentTarget.dataset, e = (t.id, t.index), n = t.lookup;
        0 === Number(n) && this.updateUnRead(e);
    },
    updateUnRead: function(a) {
        var t = this, e = this.data.currentIndex, n = this.data.mapTags[e], o = this.data.tagData, i = this.data.tagList, s = o[n];
        a >= 0 && (s.data[a].cLookUp = 1);
        try {
            i[e].hasUnRead = s.data.filter(function(a) {
                return 0 === a.cLookUp;
            }).length > 0;
        } catch (a) {
            console.log(a);
        }
        var c = a > 0 ? 1e3 : 200;
        t.delay(c, function() {
            t.setData({
                tagList: i,
                tagData: o
            });
        });
    },
    delay: function(a, t) {
        setTimeout(function() {
            t && t();
        }, a);
    },
    onLoad: function(a) {},
    onReady: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    height: t.windowHeight - 40
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    fetchData: function() {
        var t = this, e = this.data.currentIndex, n = a.appData.url, o = this.data.api[e], i = "".concat(n).concat(o), s = this.data.mapTags[e], c = this.data.tagData[s];
        c.noMore || c.noData || (wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: i,
            data: {
                customerId: a.appData.userinfo.customerId,
                pageNumber: c.pageNum,
                isWx: 1
            },
            success: function(a) {
                if (200 === a.statusCode) {
                    var e = a.data;
                    if (0 === e.errcode) {
                        var n = e.data.list, o = n.length;
                        0 === c.data.length && 0 === o && (c.noData = !0), (0 === o || o < c.pageSize) && (c.noMore = !0), 
                        c.pageNum > 1 && c.noMore && wx.showToast({
                            icon: "none",
                            title: "没有更多数据了"
                        }), o > 0 && (c.data = c.data.concat(n)), t.setData({
                            tagData: t.data.tagData
                        }), wx.nextTick(function() {
                            t.updateUnRead();
                        });
                    }
                }
            },
            fail: function() {},
            complete: function() {
                wx.hideLoading();
            }
        }));
    }
});