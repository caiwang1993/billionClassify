App({
    onLaunch: function(o) {
        console.log(o), this.globalData = {};
        try {
            this.globalData.systemInfo = wx.getSystemInfoSync();
        } catch (o) {
            this.globalData.systemInfo = null;
        }
        if (wx.login({
            success: function(o) {
                console.log("调用登录接口，获取 code，通过传code到后台换取openId", o), wx.request({
                    url: getApp().appData.url + "weChatApplet/jscode2session",
                    data: {
                        code: o.code
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "GET",
                    success: function(o) {
                        console.log("已经发送 res.code，到后台换取 openId, sessionKey, unionId", o), -1 == o.data.errcode ? (console.log("登录失败"), 
                        wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: "登录失败",
                            success: function(o) {}
                        })) : (wx.setStorageSync("session_key", o.data.session_key), wx.setStorageSync("openid", o.data.openid));
                    },
                    fail: function(o) {},
                    complete: function(o) {}
                });
            }
        }), wx.canIUse("getUpdateManager")) {
            var n = wx.getUpdateManager();
            n.onCheckForUpdate(function(o) {
                console.log("onCheckForUpdate====", o), o.hasUpdate && (console.log("res.hasUpdate===="), 
                n.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(o) {
                            console.log("success====", o), o.confirm && n.applyUpdate();
                        }
                    });
                }), n.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        }
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function(o) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    appData: {
        userinfo: null,
        url: "https://www.delanshi.cn/evt/",
        ID: "wx7b8b1932bc1b604e"
    }
});