getApp();

Component({
    options: {
        multipleSlots: !0
    },
    data: {
        isShow: !1,
        showContent: ""
    },
    methods: {
        showView: function(t) {
            var o = this;
            o.setData({
                isShow: !0,
                showContent: t
            }), setTimeout(function() {
                o.setData({
                    isShow: !1
                });
            }, 3e3);
        }
    }
});