var a = getApp();

Page({
    data: {
        username: null,
        phoneNumber: "null",
        nickName: "null",
        showAddress: "",
        showModal: !1
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var e = this;
        if (wx.getStorageSync("isLogined")) {
            a.appData.userinfo = wx.getStorageSync("userinfo"), e.setData({
                username: a.appData.userinfo.username
            });
            e.data.username;
            var t = e.data.username;
            wx.request({
                url: a.appData.url + "weChatApplet/findNick?mobile=" + t,
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    e.setData({
                        showAddress: a.data.data.address
                    });
                    try {
                        wx.setStorageSync("addressInfo", a.data.data), e.setData({
                            nickName: a.data.data.nick
                        });
                    } catch (a) {}
                },
                fail: function(a) {}
            });
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    goMyaddress: function() {
        wx.navigateTo({
            url: "../myaddress/myaddress"
        });
    },
    goAboutUs: function() {
        wx.navigateTo({
            url: "../aboutUs/aboutUs"
        });
    },
    goSettings: function() {
        wx.navigateTo({
            url: "../settings/settings"
        });
    },
    uploadImg: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e3
                });
                var n = t.tempFilePaths;
                e.setData({
                    tempFilePaths: n
                });
                var o = 0;
                wx.uploadFile({
                    url: a.appData.url + "uploadPhotos/uploadFileList",
                    filePath: n[i],
                    name: "uploadheadimg_ant",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(a) {
                        e.data.headimgSrc;
                        var t = JSON.parse(a.data);
                        images.push(t.data[0]), e.setData({
                            imagesSrc: images
                        }), ++o == n.length && wx.hideToast();
                    },
                    fail: function(a) {
                        wx.hideToast(), wx.showModal({
                            title: "错误提示",
                            content: "上传图片失败",
                            showCancel: !1,
                            success: function(a) {}
                        });
                    }
                });
            }
        });
    },
    preventTouchMove: function() {},
    onCancel: function() {
        this.hideModal();
    },
    goMessage: function() {
        wx.navigateTo({
            url: "../message/message"
        });
    }
});