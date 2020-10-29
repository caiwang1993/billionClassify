Component({
    options: {
        multipleSlots: !0,
        addGlobalClass: !0
    },
    properties: {
        tagList: {
            type: Array,
            value: []
        },
        currentIndex: {
            type: Number,
            value: 0
        },
        height: {
            type: Number,
            value: 300
        }
    },
    data: {
        moveBarWidth: 0,
        moveBarTransform: 0,
        eventType: "transition"
    },
    methods: {
        tagIndexChange: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setData({
                currentIndex: e,
                eventType: t.type
            });
        },
        swiperChange: function(t) {},
        transitionChange: function(t) {
            if (this.data.eventType === t.type) {
                var e = this.data.currentIndex * this.data.moveBarWidth + t.detail.dx * this.data.moveBarWidth / this.data.width;
                this.setData({
                    moveBarTransform: e
                });
            }
        },
        animationfinishHandler: function(t) {
            var e = this;
            "animationfinish" === t.type && ("tap" === this.data.eventType ? this.setData({
                currentIndex: t.detail.current,
                moveBarTransform: t.detail.current * this.data.moveBarWidth,
                eventType: "transition"
            }) : this.setData({
                currentIndex: t.detail.current
            }), wx.nextTick(function() {
                return e.tagChangeAction();
            }));
        },
        scrolltolowerHandler: function(t) {
            var e = {
                index: this.data.currentIndex
            };
            this.triggerEvent("scrolltolower", e);
        },
        scrolltoupperHandler: function(t) {
            var e = {
                index: this.data.currentIndex
            };
            this.triggerEvent("scrolltoupper", e);
        },
        scrollHandler: function(t) {},
        tagChangeAction: function() {
            var t = {
                index: this.data.currentIndex
            };
            this.triggerEvent("tagChangeAction", t);
        }
    },
    lifetimes: {
        ready: function() {
            var t = this, e = this.createSelectorQuery(), n = this;
            e.select(".tab-slider-hd").boundingClientRect(function(t) {
                n.setData({
                    width: t.width,
                    moveBarWidth: t.width / n.data.tagList.length
                });
            }).exec(), wx.nextTick(function() {
                return t.tagChangeAction();
            });
        }
    }
});