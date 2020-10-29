Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    logout: function() {
        wx.showModal({
            title: "提示",
            content: "确认要退出登录吗？",
            success: function(n) {
                if (n.confirm) {
                    try {
                        wx.removeStorageSync("isLogined"), wx.removeStorageSync("userinfo");
                    } catch (n) {}
                    wx.nextTick(function() {
                        return wx.switchTab({
                            url: "../index/index"
                        });
                    });
                } else n.cancel;
            }
        });
    }
});