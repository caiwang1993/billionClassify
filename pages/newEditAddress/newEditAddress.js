var e = getApp();

Page({
    data: {
        region: [ "北京市", "北京市", "朝阳区" ],
        customItem: "全部",
        nick: "",
        userName: "",
        disabled: "",
        provinces: "noProvinces",
        adsPicker: "",
        villageable: ""
    },
    onLoad: function(a) {
        var i = this, n = e.appData.userinfo.username;
        wx.request({
            url: e.appData.url + "customer/getAddress?userName=" + n,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.errcode, n = e.data.data, s = n.nick, t = n.mobile, o = (n.address, 
                n.provinceName + n.cityName + n.areaName), r = n.unitName;
                0 === a || 1 === a ? i.setData({
                    nick: s,
                    mobile: t,
                    provinces: "provinces",
                    Provinces: o,
                    village: r,
                    adsPicker: "hidadsPicker",
                    villageable: "disabled"
                }) : 2 === a ? i.setData({
                    provinces: "noProvinces",
                    adsPicker: "adsPicker",
                    villageable: ""
                }) : (i.setData({
                    nick: s,
                    mobile: t,
                    provinces: "provinces",
                    Provinces: o,
                    village: r,
                    adsPicker: "hidadsPicker",
                    villageable: "disabled"
                }), wx.showToast({
                    title: e.data.errmsg,
                    icon: "none",
                    duration: 3e3,
                    mask: !0
                }));
            }
        }), i.setData({
            userName: n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        });
    },
    neweditaddressSubmit: function(a) {
        var i = "", n = !1, s = a.detail.value, t = e.appData.userinfo.username, o = s.nick, r = s.mobile;
        console.log("省市区undefined", a.detail.value.address_picker);
        var c = s.address_picker[0], d = s.address_picker[1], l = s.address_picker[2], u = s.village, p = s.unit, m = s.address_picker;
        "" == o ? i = "请填写联系人姓名！" : "" == r ? i = "请填写您的手机号！" : /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(r) ? "0" == m ? i = "请选择您的所在省市区" : "" == u ? i = "请输入您的小区名称" : (n = !0, 
        wx.request({
            url: e.appData.url + "customer/upUnit",
            data: {
                userName: t,
                nick: o,
                mobile: r,
                provinceName: c,
                cityName: d,
                areaName: l,
                village: u,
                unit: p
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                0 === e.data.errcode ? wx.redirectTo({
                    url: "../myaddress/myaddress"
                }) : wx.showToast({
                    title: e.data.errmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            }
        })) : i = "手机号格式不正确", 0 == n && wx.showModal({
            title: "提示",
            content: i
        });
    }
});