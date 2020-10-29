var t = require("../@babel/runtime/helpers/interopRequireDefault")(require("../@babel/runtime/helpers/typeof")), e = function(e) {
    var r = (0, t.default)(e);
    return null != e && ("object" == r || "function" == r);
}, r = function() {
    return Date.now();
};

function n(t) {
    var r = parseInt;
    if ("number" == typeof t) return t;
    if (e(t)) {
        var n = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = e(n) ? n + "" : n;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace(/^\s+|\s+$/g, "");
    var i = /^0b[01]+$/i.test(t);
    return i || /^0o[0-7]+$/i.test(t) ? r(t.slice(2), i ? 2 : 8) : /^[-+]0x[0-9a-f]+$/i.test(t) ? NaN : +t;
}

var i = "Expected a function", u = Math.max, o = Math.min;

module.exports = function(t, a, f) {
    var c, v, l, s, p, m, d = 0, b = !1, h = !1, y = !0;
    if ("function" != typeof t) throw new TypeError(i);
    function T(e) {
        var r = c, n = v;
        return c = v = void 0, d = e, s = t.apply(n, r);
    }
    function x(t) {
        var e = t - m;
        return void 0 === m || e >= a || e < 0 || h && t - d >= l;
    }
    function g() {
        var t = r();
        if (x(t)) return $(t);
        p = setTimeout(g, function(t) {
            var e = a - (t - m);
            return h ? o(e, l - (t - d)) : e;
        }(t));
    }
    function $(t) {
        return p = void 0, y && c ? T(t) : (c = v = void 0, s);
    }
    function q() {
        var t = r(), e = x(t);
        if (c = arguments, v = this, m = t, e) {
            if (void 0 === p) return function(t) {
                return d = t, p = setTimeout(g, a), b ? T(t) : s;
            }(m);
            if (h) return clearTimeout(p), p = setTimeout(g, a), T(m);
        }
        return void 0 === p && (p = setTimeout(g, a)), s;
    }
    return a = n(a) || 0, e(f) && (b = !!f.leading, l = (h = "maxWait" in f) ? u(n(f.maxWait) || 0, a) : l, 
    y = "trailing" in f ? !!f.trailing : y), q.cancel = function() {
        void 0 !== p && clearTimeout(p), d = 0, c = m = v = p = void 0;
    }, q.flush = function() {
        return void 0 === p ? s : $(r());
    }, q;
};