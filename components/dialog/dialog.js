Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        title: {
            type: String,
            value: "提示"
        },
        istrue: {
            type: Boolean,
            value: !1
        },
        primaryText: {
            type: String,
            value: "确定"
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        showCancel: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        closeDialog: function(e) {
            var t = e.currentTarget.dataset.from;
            this.triggerEvent("closeDialog", {
                from: t
            });
        }
    },
    lifetimes: {
        ready: function() {}
    }
});