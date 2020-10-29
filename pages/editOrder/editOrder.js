var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/toConsumableArray")), a = (require("../../utils/crypto.js"), 
require("../../utils/util.js"), getApp().globalData.header, getApp().globalData.header, 
getApp());

Page({
    data: {
        username: null,
        nick: null,
        mobile: "",
        provinceCityName: "",
        address: "",
        unit_id: "",
        region: [ "北京市", "北京市", "朝阳区" ],
        customItem: "全部",
        imagesSrc: [],
        previousChooseImages: [],
        tempFilePaths: [],
        flag: !1
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        var e = this;
        if (wx.getStorageSync("isLogined")) {
            var t = wx.getStorageSync("userinfo").username;
            wx.request({
                url: a.appData.url + "customer/getAddress?userName=" + t + "&isDoorRecovery=1",
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    var t = a.data.data, o = t.nick, n = t.mobile, i = t.provinceName + t.cityName + t.areaName, s = t.address, r = t.unit_id, l = a.data.errcode, u = a.data.errmsg;
                    0 === l ? e.setData({
                        nick: o,
                        mobile: n,
                        provinceCityName: i,
                        address: s,
                        unit_id: r
                    }) : 2 === l ? wx.showModal({
                        title: u,
                        showCancel: !0,
                        cancelText: "取消",
                        cancelColor: "#707070",
                        confirmText: "完善地址",
                        confirmColor: "#53f4eb",
                        success: function(e) {
                            e.confirm ? wx.navigateTo({
                                url: "/pages/myaddress/myaddress"
                            }) : e.cancel && wx.showToast({
                                title: "用户点击取消",
                                icon: "none",
                                duration: 2e3
                            });
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "操作提示",
                                content: "操作失败"
                            });
                        }
                    }) : wx.showToast({
                        title: u,
                        icon: "none",
                        duration: 3e3,
                        mask: !0
                    });
                },
                fail: function(e) {
                    wx.showModal({
                        title: "操作提示",
                        content: "操作失败"
                    });
                }
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
    uploadImg: function() {
        var t = this, o = t.data.previousChooseImages, n = 4 - o.length;
        if (n <= 0) return wx.showToast({
            title: "最多上传四张图片",
            icon: "none"
        });
        wx.chooseImage({
            count: n,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(n) {
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e3
                });
                var i = n.tempFilePaths, s = [];
                o.length > 0 ? (s = i.filter(function(e) {
                    return !(o.map(function(e) {
                        return e.slice(-10);
                    }).indexOf(e.slice(-10)) >= 0);
                }), o = [].concat((0, e.default)(o), (0, e.default)(s))) : (s = i, o = i), t.setData({
                    previousChooseImages: o,
                    tempFilePaths: o
                });
                for (var r = 0, l = 0; l < s.length; l++) wx.uploadFile({
                    url: a.appData.url + "uploadPhotos/uploadFileList",
                    filePath: s[l],
                    name: "PHOTOS_FILE",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        var a = t.data.imagesSrc, o = JSON.parse(e.data);
                        a.push(o.data[0]), t.setData({
                            imagesSrc: a
                        }), ++r == s.length && wx.hideToast();
                    },
                    fail: function(e) {
                        wx.hideToast(), wx.showModal({
                            title: "错误提示",
                            content: "上传图片失败",
                            showCancel: !1,
                            success: function(e) {}
                        });
                    }
                });
            }
        });
    },
    listenerButtonPreviewImage: function(e) {
        var a = e.target.dataset.index;
        wx.previewImage({
            current: this.data.tempFilePaths[a],
            urls: this.data.tempFilePaths,
            success: function(e) {},
            fail: function() {}
        });
    },
    formSubmit: function(e) {
        var t = a.appData.userinfo.username, o = e.detail.value.nick, n = e.detail.value.mobile, i = e.detail.value.res_name, s = e.detail.value.imagesSrc, r = e.detail.value.remark, l = e.detail.value.unit_id, u = e.detail.value.address;
        "" == o || ("" == n || /^1(3|4|5|7|8)\d{9}$/.test(n) && ("" == i || (0 === s.length || (this.setData({
            flag: !0
        }), wx.request({
            url: a.appData.url + "recovery/addDoorRecycle",
            data: {
                res_name: i,
                img_url: s,
                userName: t,
                remark: r,
                unit_id: l,
                address: u
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.errmsg;
                console.log("保存上门回收订单", e), 0 === e.data.errcode ? (wx.showToast({
                    title: a,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }), wx.nextTick(function() {
                    return wx.redirectTo({
                        url: "../appointeToDoor/appointeToDoor"
                    });
                })) : wx.showToast({
                    title: a,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            }
        })))));
    }
});