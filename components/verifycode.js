var s = require("../utils/util.js");

getApp();

Component({
    options: {
        multipleSlots: !0
    },
    data: {
        isShow: !1,
        isFocus: !1,
        isUse: !1,
        inputValue: "",
        src: "image/close.png",
        phone: "15200000000",
        codes: [ "", "", "", "", "", "" ]
    },
    properties: {
        title: {
            type: String,
            value: "请输入验证码"
        },
        content: {
            type: String,
            value: "已发送到手机号:"
        }
    },
    methods: {
        showView: function(t) {
            var e = t.phone, i = t.inputSuccess;
            this.inputSuccess = i;
            var o = "";
            s.isAvalible(e) && (o = e.substr(0, 3) + "****" + e.substr(7)), this.setData({
                isShow: !this.data.isShow,
                phone: o,
                isFocus: !0,
                codes: [ "", "", "", "", "", "" ]
            });
        },
        closeView: function(s) {
            this.setData({
                isShow: !this.data.isShow,
                isFocus: !1
            }), this.data.isUse && (this.closeSuccess(), this.data.isUse = !1);
        },
        closeSuccessMe: function(t) {
            var e = t.isUse, i = t.closeSuccess;
            s.isAvalible(i) && (this.closeSuccess = i, this.data.isUse = e);
        },
        closeSuccess: function() {},
        openKeyboard: function() {
            this.setData({
                isFocus: !0
            });
        },
        listenKeyInput: function(s) {
            for (var t = s.detail.value, e = t.length, i = new Array(), o = 0; o < (e > 6 ? 6 : e); o++) {
                var a = t.substr(o, 1);
                i[o] = a;
            }
            for (o = i.length; o < 6; o++) i.push("");
            if (this.setData({
                codes: i
            }), e > 5) {
                var c = t.substr(0, 6);
                this.inputSuccess(c), this.setData({
                    inputValue: ""
                });
            }
        }
    }
});