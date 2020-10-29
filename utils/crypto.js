var t = require("../utils/cryptojs/cryptojs.js").Crypto;

getApp();

function e(t, e) {
    this.appId = t, this.sessionKey = e;
}

e.prototype.decryptData = function(e, s) {
    e = t.util.base64ToBytes(e);
    var o = t.util.base64ToBytes(this.sessionKey), r = (s = t.util.base64ToBytes(s), 
    new t.mode.CBC(t.pad.pkcs7));
    try {
        var p = t.AES.decrypt(e, o, {
            asBpytes: !0,
            iv: s,
            mode: r
        }), a = JSON.parse(p);
    } catch (t) {
        console.log(t);
    }
    try {
        a.watermark.appid !== this.appId && console.log(err);
    } catch (t) {
        console.log(t);
    }
    return a;
}, module.exports = e;