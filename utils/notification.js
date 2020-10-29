module.exports = {
    init: function() {
        var t = "__sl_notification";
        wx.getStorageSync(t) || wx.setStorageSync(t, {
            version: "1.0.0",
            desc: "缓存消息模块ID，处理小红点(未读、已读)，删除会引起该功能失效",
            communityMessage: [],
            recoveryMessage: [],
            feedbackMessage: [],
            sysMessage: []
        });
    },
    add: function(t, e) {
        var n = "__sl_notification", i = wx.getStorageSync(n);
        i && (i[t].add(e), wx.setStorageSync(n, i));
    },
    isReaded: function(t, e) {
        var n = wx.getStorageSync("__sl_notification");
        return !!n && n[t].filter(function(t) {
            return t.id === e;
        }).length > 0;
    },
    clear: function() {
        try {
            wx.removeStorageSync("__sl_notification");
        } catch (t) {}
    },
    display: function() {
        var t = wx.getStorageSync("__sl_notification");
        console.log(JSON.stringify(t, null, "\t"));
    }
};