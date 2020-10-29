var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/objectSpread"));

getApp();

Page({
    data: {
        hideBottom: !0,
        now: 0,
        height: "",
        list: [],
        allPages: 0,
        currentPage: 1,
        total: 0,
        hasMoreData: !1,
        isLoading: !0
    },
    onLoad: function(t) {
        var a = this.data.now || 0, e = parseInt(t.mark || a);
        a === e ? (wx.showNavigationBarLoading(), this.getListBypage(1)) : this.setData({
            now: e
        });
    },
    onShow: function() {},
    loadMore: function(t) {
        if (!this.data.hasMoreData) return this.setData({
            hasMoreData: !1,
            hideBottom: !1,
            isLoading: !1
        }), !1;
        var a = this.data.currentPage;
        a += 1, this.setData({
            currentPage: a,
            isLoading: !0
        }), this.getListBypage(a);
    },
    getListBypage: function(a, e) {
        var i = this.data, s = i.now, r = i.list, n = i.hideBottom, o = i.hasMoreData, u = (i.allPages, 
        i.isLoading, i.startDate), g = i.endDate, l = SystemConstant.API_SERVER_URL + "/member/subject/memberCourseList.htm", d = parseInt(s) + parseInt(1), h = {
            "pageResult.currentPage": a,
            "pageResult.pageSize": SystemConstant.PAGE_SIZE,
            "condition.courseStatus": d
        };
        1 === s && (h["condition.startTime"] = u + " 00:00:00", h["condition.endTime"] = g + " 00:00:00");
        var c = this;
        AjaxUtil.post(l, h, function(e) {
            if ("SUCCESS" !== e.status) return wx.showModal({
                title: "提示",
                content: "加载数据失败",
                showCancel: !1,
                confirmColor: "#333",
                confirmText: "知道了"
            }), !1;
            var i = e.data;
            r = 1 === a ? i.pageResult.resultList.map(function(a) {
                return (0, t.default)({}, a, {
                    startDate: DateTimeUtil.formatTimestamp(a.startDate, "MM月dd日"),
                    startTime: DateTimeUtil.formatTimestamp(a.startTime, "HH:mm"),
                    endTime: DateTimeUtil.formatTimestamp(a.endTime, "HH:mm")
                });
            }) : r.concat(i.pageResult.resultList);
            var s = i.pageResult["pageResult.allPages"], u = i.pageResult["pageResult.rows"];
            0 === s ? (n = !0, o = !1) : a === s ? (n = !1, o = !1) : (n = !0, o = !0), c.setData({
                list: r,
                isLoading: !1,
                hideBottom: n,
                hasMoreData: o,
                currentPage: a,
                allPages: s,
                total: u
            });
        }, function(t) {
            wx.showModal({
                title: "提示",
                content: "加载数据异常",
                showCancel: !1,
                confirmColor: "#333",
                confirmText: "知道了"
            });
        }, function(t) {
            wx.hideLoading(), wx.hideNavigationBarLoading(), e && e();
        });
    },
    onTabTap: function(t) {
        var a = t.currentTarget.dataset.current;
        if (this.data.now === a) return !1;
        this.setData({
            now: a,
            startDate: startDate
        });
    },
    onSwiperChange: function(t) {
        wx.showNavigationBarLoading(), this.setData({
            now: t.detail.current,
            startDate: startDate,
            hideBottom: !0,
            list: [],
            currentPage: 1,
            hasMoreData: !1,
            isLoading: !0
        }), this.getListBypage(1);
    },
    onDetail: function(t) {
        var a = t.currentTarget.dataset, e = (a.id, a.courseId);
        wx.navigateTo({
            url: "/pages/getCourse/getCourse?mark=1&id=" + t.currentTarget.dataset.id + "&courseId=" + e
        });
    },
    onTeacher: function(t) {
        wx.navigateTo({
            url: "/pages/teacher/teacherDetail/teacherDetail?teacherId=" + t.currentTarget.dataset.id
        });
    },
    onPullDownRefresh: function() {
        this.getListBypage(1, function() {
            wx.stopPullDownRefresh();
        });
    },
    startDateChange: function(t) {
        var a = t.detail.value;
        this.setData({
            startDate: a
        }), this.getListBypage(1);
    },
    endDateChange: function(t) {
        var a = t.detail.value;
        this.setData({
            endDate: a
        }), this.getListBypage(1);
    }
});