var e = require("../../utils/crypto.js"),
    t = require("../../utils/util.js"),
    o = getApp().globalData.header,
    a = (o = getApp().globalData.header,
        ""),
    n = getApp();

Page({
    data: {
        username: null,
        nickName: null,
        password: null,
        customerId: null,
        appIP: n.IP,
        phone_input_width: .92 * wx.getSystemInfoSync().windowWidth - 56,
        input_width: .88 * wx.getSystemInfoSync().windowWidth - 178,
        sendmsg: "sendmsg",
        getmsg: "获取验证码",
        update: 1,
        login_img: "",
        url: null,
        isLoginMobile: !1
    },
    onLoad: function (e) {
        n.onLaunch();
        this.verifycode = this.selectComponent("#verifycode"), this.toast = this.selectComponent("#toast");
        var o = e.updatePhone;
        t.isAvalible(e.fromPage) && this.setData({
            fromPage: e.fromPage
        }), o && this.setData({
            update: 2
        });
    },
    onReady: function () {},
    toggleLoginMobile: function () {
        this.setData({
            isLoginMobile: !this.data.isLoginMobile
        });
    },
    onShow: function () {},
    onHide: function () {},
    getPhoneNumber: function (t) {
        if ("getPhoneNumber:fail user deny" == t.detail.errMsg) {
            wx.showModal({
                title: "提示",
                showCancel: !1,
                content: "未授权",
                success: function (e) {}
            });
        } else {
            console.log(n.appData.ID + "----" + wx.getStorageSync("session_key"));
            var a = new e(n.appData.ID, wx.getStorageSync("session_key")).decryptData(t.detail.encryptedData, t.detail.iv);
            console.log("data", a);
            var s = "?phone=" + a.purePhoneNumber + "&openid=" + wx.getStorageSync("openid");
            wx.request({
                url: n.appData.url + "weChatApplet/wxChatLogin" + s,
                header: o,
                dataType: "json",
                responseType: "text",
                success: function (e) {
                    console.log("解密后，请求后台微信快速登录接口的结果是：" + e.data.errcode), "-1" == e.data.errcode ? (wx.setStorageSync("isLogined", !1),
                        wx.setStorageSync("userinfo", null), wx.showToast({
                            title: e.data.errmsg,
                            icon: "none",
                            duration: 5e3
                        })) : (console.log("微信登录res", e), wx.setStorageSync("isLogined", !0), wx.setStorageSync("userinfo", {
                        username: a.purePhoneNumber,
                        nickName: "爱分类达人" + a.purePhoneNumber.slice(7),
                        customerId: e.data.customerId
                    }), n.appData.userinfo = {
                        username: a.purePhoneNumber,
                        nickName: "爱分类达人" + a.purePhoneNumber.slice(7),
                        customerId: e.data.customerId
                    }, wx.showToast({
                        title: e.data.errmsg,
                        icon: "success",
                        duration: 1e4
                    }), wx.switchTab({
                        url: "../index/index"
                    }));
                },
                fail: function (e) {},
                complete: function (e) {}
            });
        }
    },
    saveCode: function (e) {
        a = e.detail.value;
    },
    bindUserName: function (e) {
        var s = this,
            i = wx.getStorageSync("openid");
        t.isAvalible("") ? /^1[34578]\d{9}$/.test("") ? "".length > 11 ? s.toast.showView("手机号有误") : "" != a ? wx.request({
            url: n.appData.url + "/weChatApplet/chatLogin/",
            data: {
                phone: "",
                code: a,
                openid: i
            },
            header: o,
            method: "GET",
            dataType: "json",
            success: function (e) {
                console.log("手机登陆", e);
                e.data.customerId;
                if ("-1" == e.data.errcode) return wx.setStorageSync("isLogined", !1), wx.setStorageSync("userinfo", null),
                    void s.toast.showView(e.data.errmsg);
                e.data.customerId;
                wx.setStorageSync("isLogined", !0), wx.setStorageSync("userinfo", {
                    username: "",
                    nickName: "爱分类达人" + "".slice(7),
                    customerId: e.data.customerId
                }), n.appData.userinfo = {
                    username: s.data.username,
                    password: s.data.password,
                    nickName: "爱分类达人" + s.data.username.slice(7),
                    customerId: e.data.customerId
                }, wx.switchTab({
                    url: "../index/index"
                }), console.log("手机号登录customerId", n.appData.userinfo);
            },
            fail: function (e) {
                wx.setStorageSync("isLogined", !1), wx.setStorageSync("userinfo", null), s.toast.showView("请求失败，请重试！");
            },
            complete: function (e) {}
        }) : s.toast.showView("输入验证码") : s.toast.showView("手机号有误") : s.toast.showView("请输入手机号");
    },
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        });
    },
    onUnload: function () {
        wx.reLaunch({
            url: "../index/index"
        });
    }
});