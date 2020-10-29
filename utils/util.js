var e = getApp(), n = getApp().globalData.header, t = require("time.js"), r = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    province: t.province,
    city: t.city,
    formatTime: function(e) {
        var n = e.getFullYear(), t = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), u = e.getMinutes(), i = e.getSeconds();
        return [ n, t, a ].map(r).join("/") + " " + [ o, u, i ].map(r).join(":");
    },
    getAddress: function(e) {
        var n = wx.getStorageSync("addressInfo");
        return n ? "short" === e ? n.address : "full" === e ? "\n      ".concat(n.provinceName, " \n      ").concat(n.cityName, " \n      ").concat(n.areaName, " \n      ").concat(n.address, " \n      ").concat(n.unitName, "\n    ") : n.address : null;
    }
}, module.exports.isAvalible = function(e) {
    return null != e && "undefined" != e && null != e && "" != e && "null" != e;
}, module.exports.changeTwoDecimal_f = function(e) {
    parseFloat(e);
    var n = (Math.round(100 * e) / 100).toString(), t = n.indexOf(".");
    for (t < 0 && (t = n.length, n += "."); n.length <= t + 2; ) n += "0";
    return n;
}, module.exports.findCurLoginUser = function() {
    wx.request({
        url: e.IP + "chatUser/findCurLoginUser",
        data: {},
        header: n,
        method: "GET",
        dataType: "json",
        success: function(e) {
            "true" == e.data.result && wx.setStorageSync("user", e.data.user), "1002" == e.data.result && wx.navigateTo({
                url: "../pages/binding_phone/binding_phone?updatePhone=true"
            });
        },
        fail: function(e) {},
        complete: function(e) {}
    });
};