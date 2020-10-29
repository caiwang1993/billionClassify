var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/slicedToArray")), e = getApp();

Page({
    data: {
        Height: 0,
        scale: 13,
        latitude: "",
        longitude: "",
        speed: "",
        accuracy: "",
        markers: [],
        controls: [ {
            id: 1,
            iconPath: "/images/icon_jian.png",
            position: {
                left: 310,
                top: 30,
                width: 32,
                height: 32
            },
            clickable: !0
        }, {
            id: 2,
            iconPath: "/images/icon_jia.png",
            position: {
                left: 310,
                top: 70,
                width: 32,
                height: 32
            },
            clickable: !0
        } ],
        circles: []
    },
    onLoad: function() {},
    regionchange: function(t) {},
    markertap: function(e) {
        var a = e.markerId, i = this.data.markers.find(function(t) {
            return t.id === a;
        }), o = i.latitude, n = i.longitude, s = i.title.split(","), c = (0, t.default)(s, 1)[0];
        wx.showActionSheet({
            itemList: [ "导航过去", "取消" ],
            itemColor: "#000000",
            success: function(t) {
                console.log("res.tapIndex是什么：", t.tapIndex), 0 === t.tapIndex ? wx.openLocation({
                    latitude: Number(o),
                    longitude: Number(n),
                    name: c,
                    address: c
                }) : wx.hideToast({
                    success: function() {},
                    fail: function() {},
                    complete: function() {}
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    controltap: function(t) {
        1 === t.controlId ? this.setData({
            scale: --this.data.scale
        }) : this.setData({
            scale: ++this.data.scale
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.showToast({
            title: "请打开手机GPS,否则可能无法加载回收机设备的位置信息",
            icon: "none",
            duration: 4e3,
            mask: "ture"
        });
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    view: {
                        Height: t.windowHeight
                    }
                });
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(i) {
                a.setData({
                    latitude: i.latitude,
                    longitude: i.longitude,
                    speed: i.speed,
                    accuracy: i.accuracy,
                    circles: [ {
                        latitude: i.latitude,
                        longitude: i.longitude,
                        color: "#2d8eff42",
                        fillColor: "#2d8eff42",
                        radius: 3e3,
                        strokeWidth: 1
                    } ],
                    covers: []
                });
                var o = a.data.latitude, n = a.data.longitude, s = a.data.speed, c = a.data.accuracy;
                wx.request({
                    url: e.appData.url + "/weChatApplet/deviceGps?latitude=" + o + "&longitude=" + n + "&speed=" + s + "&accuracy=" + c,
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        var i = [ {
                            id: "1",
                            latitude: o,
                            longitude: o,
                            width: 20,
                            height: 20,
                            iconPath: "/images/location.png",
                            title: "我的位置"
                        } ], n = e.data.errmsg, s = e.data.errmsg.length;
                        e.data.errmsg.device_type, e.data.errmsg.statusName;
                        if (1 === e.data.errcode) if (s > 0) {
                            for (var c = 0; c < s; c++) {
                                var d = {}, l = n[c], u = l.gaode.split(","), r = (0, t.default)(u, 2), g = r[0], h = r[1], p = l.deviceName + "," + l.statusName;
                                d.id = l.id, d.latitude = h, d.longitude = g, d.width = 20, d.height = 20, d.iconPath = "/images/loc_equipment.png", 
                                d.title = p, i.push(d);
                            }
                            a.setData({
                                markers: i
                            }), console.log("标记点数组", i);
                        } else wx.showToast({
                            title: "附近回收机数组数量为0",
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        }); else wx.showToast({
                            title: e.data.errmsg,
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "getLocation函数失败",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            complete: function(t) {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});