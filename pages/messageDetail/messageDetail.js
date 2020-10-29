var t = getApp();

Page({
    data: {
        article: [],
        error: !1,
        type: "",
        url: "",
        id: "",
        imgWidth: 0
    },
    onLoad: function(e) {
        var a = this, i = e.type, o = e.id;
        wx.setNavigationBarTitle({
            title: "get" === i.slice(0, 3) ? "新闻详情" : "消息详情"
        });
        var n = t.appData.url, r = "".concat(n).concat({
            communityDetails: "notice/communityDetails",
            recoveryDetails: "notice/recoveryDetails",
            feedbackDetails: "notice/feedbackDetails",
            sysDetails: "notice/sysDetails",
            getNewsById: "appDiscovery/getNewsById",
            getKnowledgeById: "appDiscovery/getKnowledgeById",
            getActivityById: "appDiscovery/getActivityById"
        }[i]);
        this.setData({
            url: r,
            id: o,
            type: i
        }), wx.nextTick(function() {
            return a.fetchData(r, o);
        });
    },
    fetchData: function(e, a) {
        var i = this;
        wx.showLoading(), wx.request({
            url: e,
            data: {
                customerId: t.appData.userinfo.customerId,
                id: a,
                isWx: 1
            },
            success: function(t) {
                var a = t.data;
                200 === t.statusCode ? 0 === a.errcode ? i.setData({
                    article: [ a.data ],
                    error: !1
                }) : (wx.showToast({
                    title: a.errmsg,
                    icon: "none",
                    duration: 2e3
                }), i.setData({
                    error: !0
                })) : console.error("请求失败 url:" + e + " errMsg:" + t.errMsg);
            },
            fail: function() {
                i.setData({
                    error: !0
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    refresh: function() {
        var t = this;
        wx.nextTick(function() {
            return t.fetchData(t.data.url, t.data.id);
        });
    },
    onReady: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    imgWidth: e.windowWidth - 32
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});