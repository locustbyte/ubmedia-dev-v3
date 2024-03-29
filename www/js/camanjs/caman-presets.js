function selectText() {
    var a;
    if (document.selection) { a = document.body.createTextRange();
        a.moveToElementText(this);
        a.select() } else {
        if (window.getSelection) { a = document.createRange();
            a.selectNode(this);
            window.getSelection().addRange(a) } } }
$(document).ready(function() { $("body").on("click", ".CopyCommand", selectText) });
(function() {
    var m = document.createElement("input");
    try { m.type = "range";
        if (m.type == "range") {
            return } } catch (k) {
        return }
    if (!document.mozSetImageElement || !("MozAppearance" in m.style)) {
        return }
    var g;
    var j = navigator.platform == "MacIntel";
    var a = { radius: j ? 9 : 6, width: j ? 22 : 12, height: j ? 16 : 20 };
    var d = "-moz-linear-gradient(top, transparent " + (j ? "6px, #999 6px, #999 7px, #ccc 9px, #bbb 11px, #bbb 12px, transparent 12px" : "9px, #999 9px, #bbb 10px, #fff 11px, transparent 11px") + ", transparent)";
    var n = { "min-width": a.width + "px", "min-height": a.height + "px", "max-height": a.height + "px", padding: 0, border: 0, "border-radius": 0, cursor: "default", "text-indent": "-999999px" };
    var l = document.createEvent("HTMLEvents");
    l.initEvent("change", true, false);
    if (document.readyState == "loading") { document.addEventListener("DOMContentLoaded", h, true) } else { h() }

    function h() { Array.forEach(document.querySelectorAll("input[type=range]"), f);
        document.addEventListener("DOMNodeInserted", i, true) }

    function i(o) { c(o.target);
        if (o.target.querySelectorAll) { Array.forEach(o.target.querySelectorAll("input"), c) } }

    function c(e, o) {
        if (e.localName != "input" || e.type == "range") {} else {
            if (e.getAttribute("type") == "range") { f(e) } else {
                if (!o) { setTimeout(c, 0, e, true) } } } }

    function f(F) {
        var w, L, v, K, H, I, u;
        var G, J, y, D, E = F.value;
        if (!g) { g = document.body.appendChild(document.createElement("hr"));
            b(g, { "-moz-appearance": j ? "scale-horizontal" : "scalethumb-horizontal", display: "block", visibility: "visible", opacity: 1, position: "fixed", top: "-999999px" });
            document.mozSetImageElement("__sliderthumb__", g) }
        var q = function() {
            return "" + E };
        var p = function p(M) { E = "" + M;
            w = true;
            A();
            delete F.value;
            F.value = E;
            F.__defineGetter__("value", q);
            F.__defineSetter__("value", p) };
        F.__defineGetter__("value", q);
        F.__defineSetter__("value", p);
        F.__defineGetter__("type", function() {
            return "range" });
        ["min", "max", "step"].forEach(function(M) {
            if (F.hasAttribute(M)) { L = true }
            F.__defineGetter__(M, function() {
                return this.hasAttribute(M) ? this.getAttribute(M) : "" });
            F.__defineSetter__(M, function(N) { N === null ? this.removeAttribute(M) : this.setAttribute(M, N) }) });
        F.readOnly = true;
        b(F, n);
        z();
        F.addEventListener("DOMAttrModified", function(M) {
            if (M.attrName == "value" && !w) { E = M.newValue;
                A() } else {
                if (~["min", "max", "step"].indexOf(M.attrName)) { z();
                    L = true } } }, true);
        F.addEventListener("mousedown", x, true);
        F.addEventListener("keydown", r, true);
        F.addEventListener("focus", t, true);
        F.addEventListener("blur", B, true);

        function x(O) { K = true;
            setTimeout(function() { K = false }, 0);
            if (O.button || !D) {
                return }
            var N = parseFloat(getComputedStyle(this, 0).width);
            var P = (N - a.width) / D;
            if (!P) {
                return }
            var M = O.clientX - this.getBoundingClientRect().left - a.width / 2 - (E - G) * P;
            if (Math.abs(M) > a.radius) { v = true;
                this.value -= -M / P }
            I = E;
            u = O.clientX;
            this.addEventListener("mousemove", C, true);
            this.addEventListener("mouseup", o, true) }

        function C(N) {
            var M = parseFloat(getComputedStyle(this, 0).width);
            var O = (M - a.width) / D;
            if (!O) {
                return }
            I += (N.clientX - u) / O;
            u = N.clientX;
            v = true;
            this.value = I }

        function o() { this.removeEventListener("mousemove", C, true);
            this.removeEventListener("mouseup", o, true) }

        function r(M) {
            if (M.keyCode > 36 && M.keyCode < 41) { t.call(this);
                v = true;
                this.value = E + (M.keyCode == 38 || M.keyCode == 39 ? y : -y) } }

        function t() {
            if (!K) { this.style.boxShadow = !j ? "0 0 0 2px #fb0" : "0 0 2px 1px -moz-mac-focusring, inset 0 0 1px -moz-mac-focusring" } }

        function B() { this.style.boxShadow = "" }

        function s(M) {
            return !isNaN(M) && +M == parseFloat(M) }

        function z() { G = s(F.min) ? +F.min : 0;
            J = s(F.max) ? +F.max : 100;
            if (J < G) { J = G > 100 ? G : 100 }
            y = s(F.step) && F.step > 0 ? +F.step : 1;
            D = J - G;
            A(true) }

        function e() {
            if (!w && !L) { E = F.getAttribute("value") }
            if (!s(E)) { E = (G + J) / 2 }
            E = Math.round((E - G) / y) * y + G;
            if (E < G) { E = G } else {
                if (E > J) { E = G + ~~(D / y) * y } } }

        function A(O) { e();
            if (v && E != H) { F.dispatchEvent(l) }
            v = false;
            if (!O && E == H) {
                return }
            H = E;
            var M = D ? (E - G) / D * 100 : 0;
            var N = "-moz-element(#__sliderthumb__) " + M + "% no-repeat, ";
            b(F, { background: N + d }) } }

    function b(e, o) {
        for (var p in o) { e.style.setProperty(p, o[p], "important") } } })();
(function() {
    var w = this;
    var k = w._;
    var E = {};
    var D = Array.prototype,
        g = Object.prototype,
        r = Function.prototype;
    var I = D.push,
        o = D.slice,
        y = D.concat,
        B = D.unshift,
        d = g.toString,
        j = g.hasOwnProperty;
    var M = D.forEach,
        q = D.map,
        F = D.reduce,
        c = D.reduceRight,
        b = D.filter,
        C = D.every,
        p = D.some,
        n = D.indexOf,
        l = D.lastIndexOf,
        u = Array.isArray,
        f = Object.keys,
        G = r.bind;
    var N = function(O) {
        if (O instanceof N) {
            return O }
        if (!(this instanceof N)) {
            return new N(O) }
        this._wrapped = O };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) { exports = module.exports = N }
        exports._ = N } else { w._ = N }
    N.VERSION = "1.4.2";
    var J = N.each = N.forEach = function(T, S, R) {
        if (T == null) {
            return }
        if (M && T.forEach === M) { T.forEach(S, R) } else {
            if (T.length === +T.length) {
                for (var Q = 0, O = T.length; Q < O; Q++) {
                    if (S.call(R, T[Q], Q, T) === E) {
                        return } } } else {
                for (var P in T) {
                    if (N.has(T, P)) {
                        if (S.call(R, T[P], P, T) === E) {
                            return } } } } } };
    N.map = N.collect = function(R, Q, P) {
        var O = [];
        if (R == null) {
            return O }
        if (q && R.map === q) {
            return R.map(Q, P) }
        J(R, function(U, S, T) { O[O.length] = Q.call(P, U, S, T) });
        return O };
    N.reduce = N.foldl = N.inject = function(S, R, O, Q) {
        var P = arguments.length > 2;
        if (S == null) { S = [] }
        if (F && S.reduce === F) {
            if (Q) { R = N.bind(R, Q) }
            return P ? S.reduce(R, O) : S.reduce(R) }
        J(S, function(V, T, U) {
            if (!P) { O = V;
                P = true } else { O = R.call(Q, O, V, T, U) } });
        if (!P) {
            throw new TypeError("Reduce of empty array with no initial value") }
        return O };
    N.reduceRight = N.foldr = function(U, R, O, Q) {
        var P = arguments.length > 2;
        if (U == null) { U = [] }
        if (c && U.reduceRight === c) {
            if (Q) { R = N.bind(R, Q) }
            return arguments.length > 2 ? U.reduceRight(R, O) : U.reduceRight(R) }
        var T = U.length;
        if (T !== +T) {
            var S = N.keys(U);
            T = S.length }
        J(U, function(X, V, W) { V = S ? S[--T] : --T;
            if (!P) { O = U[V];
                P = true } else { O = R.call(Q, O, U[V], V, W) } });
        if (!P) {
            throw new TypeError("Reduce of empty array with no initial value") }
        return O };
    N.find = N.detect = function(R, Q, P) {
        var O;
        A(R, function(U, S, T) {
            if (Q.call(P, U, S, T)) { O = U;
                return true } });
        return O };
    N.filter = N.select = function(R, Q, P) {
        var O = [];
        if (R == null) {
            return O }
        if (b && R.filter === b) {
            return R.filter(Q, P) }
        J(R, function(U, S, T) {
            if (Q.call(P, U, S, T)) { O[O.length] = U } });
        return O };
    N.reject = function(R, Q, P) {
        var O = [];
        if (R == null) {
            return O }
        J(R, function(U, S, T) {
            if (!Q.call(P, U, S, T)) { O[O.length] = U } });
        return O };
    N.every = N.all = function(R, Q, P) { Q || (Q = N.identity);
        var O = true;
        if (R == null) {
            return O }
        if (C && R.every === C) {
            return R.every(Q, P) }
        J(R, function(U, S, T) {
            if (!(O = O && Q.call(P, U, S, T))) {
                return E } });
        return !!O };
    var A = N.some = N.any = function(R, Q, P) { Q || (Q = N.identity);
        var O = false;
        if (R == null) {
            return O }
        if (p && R.some === p) {
            return R.some(Q, P) }
        J(R, function(U, S, T) {
            if (O || (O = Q.call(P, U, S, T))) {
                return E } });
        return !!O };
    N.contains = N.include = function(Q, P) {
        var O = false;
        if (Q == null) {
            return O }
        if (n && Q.indexOf === n) {
            return Q.indexOf(P) != -1 }
        O = A(Q, function(R) {
            return R === P });
        return O };
    N.invoke = function(P, Q) {
        var O = o.call(arguments, 2);
        return N.map(P, function(R) {
            return (N.isFunction(Q) ? Q : R[Q]).apply(R, O) }) };
    N.pluck = function(P, O) {
        return N.map(P, function(Q) {
            return Q[O] }) };
    N.where = function(P, O) {
        if (N.isEmpty(O)) {
            return [] }
        return N.filter(P, function(R) {
            for (var Q in O) {
                if (O[Q] !== R[Q]) {
                    return false } }
            return true }) };
    N.max = function(R, Q, P) {
        if (!Q && N.isArray(R) && R[0] === +R[0] && R.length < 65535) {
            return Math.max.apply(Math, R) }
        if (!Q && N.isEmpty(R)) {
            return -Infinity }
        var O = { computed: -Infinity };
        J(R, function(V, S, U) {
            var T = Q ? Q.call(P, V, S, U) : V;
            T >= O.computed && (O = { value: V, computed: T }) });
        return O.value };
    N.min = function(R, Q, P) {
        if (!Q && N.isArray(R) && R[0] === +R[0] && R.length < 65535) {
            return Math.min.apply(Math, R) }
        if (!Q && N.isEmpty(R)) {
            return Infinity }
        var O = { computed: Infinity };
        J(R, function(V, S, U) {
            var T = Q ? Q.call(P, V, S, U) : V;
            T < O.computed && (O = { value: V, computed: T }) });
        return O.value };
    N.shuffle = function(R) {
        var Q;
        var P = 0;
        var O = [];
        J(R, function(S) { Q = N.random(P++);
            O[P - 1] = O[Q];
            O[Q] = S });
        return O };
    var a = function(O) {
        return N.isFunction(O) ? O : function(P) {
            return P[O] } };
    N.sortBy = function(R, Q, O) {
        var P = a(Q);
        return N.pluck(N.map(R, function(U, S, T) {
            return { value: U, index: S, criteria: P.call(O, U, S, T) } }).sort(function(V, U) {
            var T = V.criteria;
            var S = U.criteria;
            if (T !== S) {
                if (T > S || T === void 0) {
                    return 1 }
                if (T < S || S === void 0) {
                    return -1 } }
            return V.index < U.index ? -1 : 1 }), "value") };
    var t = function(T, S, P, R) {
        var O = {};
        var Q = a(S);
        J(T, function(W, U) {
            var V = Q.call(P, W, U, T);
            R(O, V, W) });
        return O };
    N.groupBy = function(Q, P, O) {
        return t(Q, P, O, function(R, S, T) {
            (N.has(R, S) ? R[S] : (R[S] = [])).push(T) }) };
    N.countBy = function(Q, P, O) {
        return t(Q, P, O, function(R, S, T) {
            if (!N.has(R, S)) { R[S] = 0 }
            R[S]++ }) };
    N.sortedIndex = function(V, U, R, Q) { R = R == null ? N.identity : a(R);
        var T = R.call(Q, U);
        var O = 0,
            S = V.length;
        while (O < S) {
            var P = (O + S) >>> 1;
            R.call(Q, V[P]) < T ? O = P + 1 : S = P }
        return O };
    N.toArray = function(O) {
        if (!O) {
            return [] }
        if (O.length === +O.length) {
            return o.call(O) }
        return N.values(O) };
    N.size = function(O) {
        return (O.length === +O.length) ? O.length : N.keys(O).length };
    N.first = N.head = N.take = function(Q, P, O) {
        return (P != null) && !O ? o.call(Q, 0, P) : Q[0] };
    N.initial = function(Q, P, O) {
        return o.call(Q, 0, Q.length - ((P == null) || O ? 1 : P)) };
    N.last = function(Q, P, O) {
        if ((P != null) && !O) {
            return o.call(Q, Math.max(Q.length - P, 0)) } else {
            return Q[Q.length - 1] } };
    N.rest = N.tail = N.drop = function(Q, P, O) {
        return o.call(Q, (P == null) || O ? 1 : P) };
    N.compact = function(O) {
        return N.filter(O, function(P) {
            return !!P }) };
    var x = function(P, Q, O) { J(P, function(R) {
            if (N.isArray(R)) { Q ? I.apply(O, R) : x(R, Q, O) } else { O.push(R) } });
        return O };
    N.flatten = function(P, O) {
        return x(P, O, []) };
    N.without = function(O) {
        return N.difference(O, o.call(arguments, 1)) };
    N.uniq = N.unique = function(U, T, S, R) {
        var P = S ? N.map(U, S, R) : U;
        var Q = [];
        var O = [];
        J(P, function(W, V) {
            if (T ? (!V || O[O.length - 1] !== W) : !N.contains(O, W)) { O.push(W);
                Q.push(U[V]) } });
        return Q };
    N.union = function() {
        return N.uniq(y.apply(D, arguments)) };
    N.intersection = function(P) {
        var O = o.call(arguments, 1);
        return N.filter(N.uniq(P), function(Q) {
            return N.every(O, function(R) {
                return N.indexOf(R, Q) >= 0 }) }) };
    N.difference = function(P) {
        var O = y.apply(D, o.call(arguments, 1));
        return N.filter(P, function(Q) {
            return !N.contains(O, Q) }) };
    N.zip = function() {
        var O = o.call(arguments);
        var R = N.max(N.pluck(O, "length"));
        var Q = new Array(R);
        for (var P = 0; P < R; P++) { Q[P] = N.pluck(O, "" + P) }
        return Q };
    N.object = function(S, Q) {
        var O = {};
        for (var R = 0, P = S.length; R < P; R++) {
            if (Q) { O[S[R]] = Q[R] } else { O[S[R][0]] = S[R][1] } }
        return O };
    N.indexOf = function(S, Q, R) {
        if (S == null) {
            return -1 }
        var P = 0,
            O = S.length;
        if (R) {
            if (typeof R == "number") { P = (R < 0 ? Math.max(0, O + R) : R) } else { P = N.sortedIndex(S, Q);
                return S[P] === Q ? P : -1 } }
        if (n && S.indexOf === n) {
            return S.indexOf(Q, R) }
        for (; P < O; P++) {
            if (S[P] === Q) {
                return P } }
        return -1 };
    N.lastIndexOf = function(S, Q, R) {
        if (S == null) {
            return -1 }
        var O = R != null;
        if (l && S.lastIndexOf === l) {
            return O ? S.lastIndexOf(Q, R) : S.lastIndexOf(Q) }
        var P = (O ? R : S.length);
        while (P--) {
            if (S[P] === Q) {
                return P } }
        return -1 };
    N.range = function(T, R, S) {
        if (arguments.length <= 1) { R = T || 0;
            T = 0 }
        S = arguments[2] || 1;
        var P = Math.max(Math.ceil((R - T) / S), 0);
        var O = 0;
        var Q = new Array(P);
        while (O < P) { Q[O++] = T;
            T += S }
        return Q };
    var H = function() {};
    N.bind = function e(R, P) {
        var Q, O;
        if (R.bind === G && G) {
            return G.apply(R, o.call(arguments, 1)) }
        if (!N.isFunction(R)) {
            throw new TypeError }
        O = o.call(arguments, 2);
        return Q = function() {
            if (!(this instanceof Q)) {
                return R.apply(P, O.concat(o.call(arguments))) }
            H.prototype = R.prototype;
            var T = new H;
            var S = R.apply(T, O.concat(o.call(arguments)));
            if (Object(S) === S) {
                return S }
            return T } };
    N.bindAll = function(P) {
        var O = o.call(arguments, 1);
        if (O.length == 0) { O = N.functions(P) }
        J(O, function(Q) { P[Q] = N.bind(P[Q], P) });
        return P };
    N.memoize = function(Q, P) {
        var O = {};
        P || (P = N.identity);
        return function() {
            var R = P.apply(this, arguments);
            return N.has(O, R) ? O[R] : (O[R] = Q.apply(this, arguments)) } };
    N.delay = function(P, Q) {
        var O = o.call(arguments, 2);
        return setTimeout(function() {
            return P.apply(null, O) }, Q) };
    N.defer = function(O) {
        return N.delay.apply(N, [O, 1].concat(o.call(arguments, 1))) };
    N.throttle = function(Q, R) {
        var P, T, U, V, S, W;
        var O = N.debounce(function() { S = V = false }, R);
        return function() { P = this;
            T = arguments;
            var X = function() { U = null;
                if (S) { W = Q.apply(P, T) }
                O() };
            if (!U) { U = setTimeout(X, R) }
            if (V) { S = true } else { V = true;
                W = Q.apply(P, T) }
            O();
            return W } };
    N.debounce = function(Q, S, P) {
        var R, O;
        return function() {
            var W = this,
                V = arguments;
            var U = function() { R = null;
                if (!P) { O = Q.apply(W, V) } };
            var T = P && !R;
            clearTimeout(R);
            R = setTimeout(U, S);
            if (T) { O = Q.apply(W, V) }
            return O } };
    N.once = function(Q) {
        var O = false,
            P;
        return function() {
            if (O) {
                return P }
            O = true;
            P = Q.apply(this, arguments);
            Q = null;
            return P } };
    N.wrap = function(O, P) {
        return function() {
            var Q = [O];
            I.apply(Q, arguments);
            return P.apply(this, Q) } };
    N.compose = function() {
        var O = arguments;
        return function() {
            var P = arguments;
            for (var Q = O.length - 1; Q >= 0; Q--) { P = [O[Q].apply(this, P)] }
            return P[0] } };
    N.after = function(P, O) {
        if (P <= 0) {
            return O() }
        return function() {
            if (--P < 1) {
                return O.apply(this, arguments) } } };
    N.keys = f || function(Q) {
        if (Q !== Object(Q)) {
            throw new TypeError("Invalid object") }
        var P = [];
        for (var O in Q) {
            if (N.has(Q, O)) { P[P.length] = O } }
        return P };
    N.values = function(Q) {
        var O = [];
        for (var P in Q) {
            if (N.has(Q, P)) { O.push(Q[P]) } }
        return O };
    N.pairs = function(Q) {
        var P = [];
        for (var O in Q) {
            if (N.has(Q, O)) { P.push([O, Q[O]]) } }
        return P };
    N.invert = function(Q) {
        var O = {};
        for (var P in Q) {
            if (N.has(Q, P)) { O[Q[P]] = P } }
        return O };
    N.functions = N.methods = function(Q) {
        var P = [];
        for (var O in Q) {
            if (N.isFunction(Q[O])) { P.push(O) } }
        return P.sort() };
    N.extend = function(O) { J(o.call(arguments, 1), function(P) {
            for (var Q in P) { O[Q] = P[Q] } });
        return O };
    N.pick = function(P) {
        var Q = {};
        var O = y.apply(D, o.call(arguments, 1));
        J(O, function(R) {
            if (R in P) { Q[R] = P[R] } });
        return Q };
    N.omit = function(Q) {
        var R = {};
        var P = y.apply(D, o.call(arguments, 1));
        for (var O in Q) {
            if (!N.contains(P, O)) { R[O] = Q[O] } }
        return R };
    N.defaults = function(O) { J(o.call(arguments, 1), function(P) {
            for (var Q in P) {
                if (O[Q] == null) { O[Q] = P[Q] } } });
        return O };
    N.clone = function(O) {
        if (!N.isObject(O)) {
            return O }
        return N.isArray(O) ? O.slice() : N.extend({}, O) };
    N.tap = function(P, O) { O(P);
        return P };
    var K = function(V, U, P, Q) {
        if (V === U) {
            return V !== 0 || 1 / V == 1 / U }
        if (V == null || U == null) {
            return V === U }
        if (V instanceof N) { V = V._wrapped }
        if (U instanceof N) { U = U._wrapped }
        var S = d.call(V);
        if (S != d.call(U)) {
            return false }
        switch (S) {
            case "[object String]":
                return V == String(U);
            case "[object Number]":
                return V != +V ? U != +U : (V == 0 ? 1 / V == 1 / U : V == +U);
            case "[object Date]":
            case "[object Boolean]":
                return +V == +U;
            case "[object RegExp]":
                return V.source == U.source && V.global == U.global && V.multiline == U.multiline && V.ignoreCase == U.ignoreCase }
        if (typeof V != "object" || typeof U != "object") {
            return false }
        var O = P.length;
        while (O--) {
            if (P[O] == V) {
                return Q[O] == U } }
        P.push(V);
        Q.push(U);
        var X = 0,
            Y = true;
        if (S == "[object Array]") { X = V.length;
            Y = X == U.length;
            if (Y) {
                while (X--) {
                    if (!(Y = K(V[X], U[X], P, Q))) {
                        break } } } } else {
            var T = V.constructor,
                R = U.constructor;
            if (T !== R && !(N.isFunction(T) && (T instanceof T) && N.isFunction(R) && (R instanceof R))) {
                return false }
            for (var W in V) {
                if (N.has(V, W)) { X++;
                    if (!(Y = N.has(U, W) && K(V[W], U[W], P, Q))) {
                        break } } }
            if (Y) {
                for (W in U) {
                    if (N.has(U, W) && !(X--)) {
                        break } }
                Y = !X } }
        P.pop();
        Q.pop();
        return Y };
    N.isEqual = function(P, O) {
        return K(P, O, [], []) };
    N.isEmpty = function(P) {
        if (P == null) {
            return true }
        if (N.isArray(P) || N.isString(P)) {
            return P.length === 0 }
        for (var O in P) {
            if (N.has(P, O)) {
                return false } }
        return true };
    N.isElement = function(O) {
        return !!(O && O.nodeType === 1) };
    N.isArray = u || function(O) {
        return d.call(O) == "[object Array]" };
    N.isObject = function(O) {
        return O === Object(O) };
    J(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(O) { N["is" + O] = function(P) {
            return d.call(P) == "[object " + O + "]" } });
    if (!N.isArguments(arguments)) { N.isArguments = function(O) {
            return !!(O && N.has(O, "callee")) } }
    if (typeof(/./) !== "function") { N.isFunction = function(O) {
            return typeof O === "function" } }
    N.isFinite = function(O) {
        return N.isNumber(O) && isFinite(O) };
    N.isNaN = function(O) {
        return N.isNumber(O) && O != +O };
    N.isBoolean = function(O) {
        return O === true || O === false || d.call(O) == "[object Boolean]" };
    N.isNull = function(O) {
        return O === null };
    N.isUndefined = function(O) {
        return O === void 0 };
    N.has = function(P, O) {
        return j.call(P, O) };
    N.noConflict = function() { w._ = k;
        return this };
    N.identity = function(O) {
        return O };
    N.times = function(R, Q, P) {
        for (var O = 0; O < R; O++) { Q.call(P, O) } };
    N.random = function(P, O) {
        if (O == null) { O = P;
            P = 0 }
        return P + (0 | Math.random() * (O - P + 1)) };
    var m = { escape: { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;" } };
    m.unescape = N.invert(m.escape);
    var L = { escape: new RegExp("[" + N.keys(m.escape).join("") + "]", "g"), unescape: new RegExp("(" + N.keys(m.unescape).join("|") + ")", "g") };
    N.each(["escape", "unescape"], function(O) { N[O] = function(P) {
            if (P == null) {
                return "" }
            return ("" + P).replace(L[O], function(Q) {
                return m[O][Q] }) } });
    N.result = function(O, Q) {
        if (O == null) {
            return null }
        var P = O[Q];
        return N.isFunction(P) ? P.call(O) : P };
    N.mixin = function(O) { J(N.functions(O), function(P) {
            var Q = N[P] = O[P];
            N.prototype[P] = function() {
                var R = [this._wrapped];
                I.apply(R, arguments);
                return s.call(this, Q.apply(N, R)) } }) };
    var z = 0;
    N.uniqueId = function(O) {
        var P = z++;
        return O ? O + P : P };
    N.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
    var v = /(.)^/;
    var h = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\t": "t", "\u2028": "u2028", "\u2029": "u2029" };
    var i = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    N.template = function(W, R, Q) { Q = N.defaults({}, Q, N.templateSettings);
        var S = new RegExp([(Q.escape || v).source, (Q.interpolate || v).source, (Q.evaluate || v).source].join("|") + "|$", "g");
        var T = 0;
        var O = "__p+='";
        W.replace(S, function(Y, Z, X, ab, aa) { O += W.slice(T, aa).replace(i, function(ac) {
                return "\\" + h[ac] });
            O += Z ? "'+\n((__t=(" + Z + "))==null?'':_.escape(__t))+\n'" : X ? "'+\n((__t=(" + X + "))==null?'':__t)+\n'" : ab ? "';\n" + ab + "\n__p+='" : "";
            T = aa + Y.length });
        O += "';\n";
        if (!Q.variable) { O = "with(obj||{}){\n" + O + "}\n" }
        O = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + O + "return __p;\n";
        try {
            var P = new Function(Q.variable || "obj", "_", O) } catch (U) { U.source = O;
            throw U }
        if (R) {
            return P(R, N) }
        var V = function(X) {
            return P.call(this, X, N) };
        V.source = "function(" + (Q.variable || "obj") + "){\n" + O + "}";
        return V };
    N.chain = function(O) {
        return N(O).chain() };
    var s = function(O) {
        return this._chain ? N(O).chain() : O };
    N.mixin(N);
    J(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(O) {
        var P = D[O];
        N.prototype[O] = function() {
            var Q = this._wrapped;
            P.apply(Q, arguments);
            if ((O == "shift" || O == "splice") && Q.length === 0) { delete Q[0] }
            return s.call(this, Q) } });
    J(["concat", "join", "slice"], function(O) {
        var P = D[O];
        N.prototype[O] = function() {
            return s.call(this, P.apply(this._wrapped, arguments)) } });
    N.extend(N.prototype, { chain: function() { this._chain = true;
            return this }, value: function() {
            return this._wrapped } }) }).call(this);
(function() {
    var f, a, l, n, v, w, r, A, C, D, B, d, x, g, q, E, k, b, u, z, m, i, h, t, s, j, c = [].indexOf || function(H) {
            for (var G = 0, F = this.length; G < F; G++) {
                if (G in this && this[G] === H) {
                    return G } }
            return -1 },
        p = [].slice,
        o = {}.hasOwnProperty,
        y = function(I, G) {
            for (var F in G) {
                if (o.call(G, F)) { I[F] = G[F] } }

            function H() { this.constructor = I }
            H.prototype = G.prototype;
            I.prototype = new H();
            I.__super__ = G.prototype;
            return I },
        e = function(F, G) {
            return function() {
                return F.apply(G, arguments) } };
    t = ["extended", "included"];
    E = (function() {
        function F() {}
        F["extends"] = function(J) {
            var G, I, H;
            for (G in J) { I = J[G];
                if (c.call(t, G) < 0) { this[G] = I } }
            if ((H = J.extended) != null) { H.apply(this) }
            return this };
        F.includes = function(J) {
            var G, I, H;
            for (G in J) { I = J[G];
                if (c.call(t, G) < 0) { this.prototype[G] = I } }
            if ((H = J.included) != null) { H.apply(this) }
            return this };
        F.delegate = function() {
            var I, K, L, J, H, G;
            I = 1 <= arguments.length ? p.call(arguments, 0) : [];
            L = I.pop();
            G = [];
            for (J = 0, H = I.length; J < H; J++) { K = I[J];
                G.push(this.prototype[K] = L.prototype[K]) }
            return G };
        F.aliasFunction = function(I, H) {
            var G = this;
            return this.prototype[I] = function() {
                var J;
                J = 1 <= arguments.length ? p.call(arguments, 0) : [];
                return G.prototype[H].apply(G, J) } };
        F.aliasProperty = function(H, G) {
            return Object.defineProperty(this.prototype, H, { get: function() {
                    return this[G] }, set: function(I) {
                    return this[G] = I } }) };
        F.included = function(G) {
            return G.call(this, this.prototype) };
        return F })();
    s = Array.prototype.slice;
    f = function(G, F) {
        if (F == null) { F = document }
        if (typeof G === "object" || (typeof exports !== "undefined" && exports !== null)) {
            return G }
        return F.querySelector(G) };
    i = (function() {
        function F() {}
        F.uniqid = (function() {
            var G;
            G = 0;
            return { get: function() {
                    return G++ } } })();
        F.extend = function() {
            var M, H, J, L, K, I, G;
            J = arguments[0], K = 2 <= arguments.length ? p.call(arguments, 1) : [];
            H = J;
            for (I = 0, G = K.length; I < G; I++) { M = K[I];
                for (L in M) {
                    if (!o.call(M, L)) {
                        continue }
                    H[L] = M[L] } }
            return H };
        F.clampRGB = function(G) {
            switch (G >> 8) {
                case 0:
                    return G;
                case -1:
                    return 0;
                case 1:
                    return 255 } };
        F.copyAttributes = function(N, O, G) {
            var L, J, M, K, I, H;
            if (G == null) { G = {} }
            K = N.attributes;
            H = [];
            for (J = 0, M = K.length; J < M; J++) { L = K[J];
                if ((G.except != null) && (I = L.nodeName, c.call(G.except, I) >= 0)) {
                    continue }
                H.push(O.setAttribute(L.nodeName, L.nodeValue)) }
            return H };
        F.dataArray = function(G) {
            if (G == null) { G = 0 }
            if (v.NodeJS || (window.Uint8Array != null)) {
                return new Uint8Array(G) }
            return new Array(G) };
        return F })();
    if (typeof exports !== "undefined" && exports !== null) { z = exports;
        r = require("canvas");
        x = r.Image;
        D = require("fibers");
        h = require("fs") } else { z = window }
    v = (function(G) { y(F, G);
        F.version = { release: "4.1.1", date: "4/8/2013" };
        F.DEBUG = false;
        F.allowRevert = true;
        F.crossOrigin = "anonymous";
        F.remoteProxy = "";
        F.proxyParam = "camanProxyUrl";
        F.NodeJS = typeof exports !== "undefined" && exports !== null;
        F.autoload = !F.NodeJS;
        F.toString = function() {
            return "Version " + F.version.release + ", Released " + F.version.date };
        F.getAttrId = function(H) {
            if (F.NodeJS) {
                return true }
            if (typeof H === "string") { H = f(H) }
            if (!((H != null) && (H.getAttribute != null))) {
                return null }
            return H.getAttribute("data-caman-id") };

        function F() {
            var H, K, J, I = this;
            if (arguments.length === 0) {
                throw "Invalid arguments" }
            if (this instanceof F) { this.finishInit = this.finishInit.bind(this);
                this.imageLoaded = this.imageLoaded.bind(this);
                H = arguments[0];
                if (!F.NodeJS) { J = parseInt(F.getAttrId(H[0]), 10);
                    K = typeof H[1] === "function" ? H[1] : typeof H[2] === "function" ? H[2] : function() {};
                    if (!isNaN(J) && m.has(J)) {
                        return m.execute(J, K) } }
                this.id = i.uniqid.get();
                this.initializedPixelData = this.originalPixelData = null;
                this.cropCoordinates = { x: 0, y: 0 };
                this.cropped = false;
                this.resized = false;
                this.pixelStack = [];
                this.layerStack = [];
                this.canvasQueue = [];
                this.currentLayer = null;
                this.scaled = false;
                this.analyze = new a(this);
                this.renderer = new u(this);
                this.domIsLoaded(function() { I.parseArguments(H);
                    return I.setup() });
                return this } else {
                return new F(arguments) } }
        F.prototype.domIsLoaded = function(H) {
            var I, J = this;
            if (F.NodeJS) {
                return setTimeout(function() {
                    return H.call(J) }, 0) } else {
                if (document.readyState === "complete") { q.debug("DOM initialized");
                    return setTimeout(function() {
                        return H.call(J) }, 0) } else { I = function() {
                        if (document.readyState === "complete") { q.debug("DOM initialized");
                            return H.call(J) } };
                    return document.addEventListener("readystatechange", I, false) } } };
        F.prototype.parseArguments = function(I) {
            var J, L, K, H;
            if (I.length === 0) {
                throw "Invalid arguments given" }
            this.initObj = null;
            this.initType = null;
            this.imageUrl = null;
            this.callback = function() {};
            this.setInitObject(I[0]);
            if (I.length === 1) {
                return }
            switch (typeof I[1]) {
                case "string":
                    this.imageUrl = I[1];
                    break;
                case "function":
                    this.callback = I[1] }
            if (I.length === 2) {
                return }
            this.callback = I[2];
            if (I.length === 4) { K = I[4];
                H = [];
                for (J in K) {
                    if (!o.call(K, J)) {
                        continue }
                    L = K[J];
                    H.push(this.options[J] = L) }
                return H } };
        F.prototype.setInitObject = function(H) {
            if (F.NodeJS) { this.initObj = H;
                this.initType = "node";
                return }
            if (typeof H === "object") { this.initObj = H } else { this.initObj = f(H) }
            if (this.initObj == null) {
                throw "Could not find image or canvas for initialization." }
            return this.initType = this.initObj.nodeName.toLowerCase() };
        F.prototype.setup = function() {
            switch (this.initType) {
                case "node":
                    return this.initNode();
                case "img":
                    return this.initImage();
                case "canvas":
                    return this.initCanvas() } };
        F.prototype.initNode = function() {
            var H = this;
            q.debug("Initializing for NodeJS");
            this.image = new x();
            this.image.onload = function() { q.debug("Image loaded. Width = " + (H.imageWidth()) + ", Height = " + (H.imageHeight()));
                H.canvas = new r(H.imageWidth(), H.imageHeight());
                return H.finishInit() };
            this.image.onerror = function(I) {
                throw I };
            return this.image.src = this.initObj };
        F.prototype.initImage = function() { this.image = this.initObj;
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            i.copyAttributes(this.image, this.canvas, { except: ["src"] });
            this.image.parentNode.replaceChild(this.canvas, this.image);
            this.imageAdjustments();
            return this.waitForImageLoaded() };
        F.prototype.initCanvas = function() { this.canvas = this.initObj;
            this.context = this.canvas.getContext("2d");
            if (this.imageUrl != null) { this.image = document.createElement("img");
                this.image.src = this.imageUrl;
                this.imageAdjustments();
                return this.waitForImageLoaded() } else {
                return this.finishInit() } };
        F.prototype.imageAdjustments = function() {
            if (this.needsHiDPISwap()) { q.debug(this.image.src, "->", this.hiDPIReplacement());
                this.swapped = true;
                this.image.src = this.hiDPIReplacement() }
            if (d.isRemote(this.image)) { this.image.src = d.proxyUrl(this.image.src);
                return q.debug("Remote image detected, using URL = " + this.image.src) } };
        F.prototype.waitForImageLoaded = function() {
            if (this.isImageLoaded()) {
                return this.imageLoaded() } else {
                return this.image.onload = this.imageLoaded } };
        F.prototype.isImageLoaded = function() {
            if (!this.image.complete) {
                return false }
            if ((this.image.naturalWidth != null) && this.image.naturalWidth === 0) {
                return false }
            return true };
        F.prototype.imageWidth = function() {
            return this.image.width || this.image.naturalWidth };
        F.prototype.imageHeight = function() {
            return this.image.height || this.image.naturalHeight };
        F.prototype.imageLoaded = function() { q.debug("Image loaded. Width = " + (this.imageWidth()) + ", Height = " + (this.imageHeight()));
            if (this.swapped) { this.canvas.width = this.imageWidth() / this.hiDPIRatio();
                this.canvas.height = this.imageHeight() / this.hiDPIRatio() } else { this.canvas.width = this.imageWidth();
                this.canvas.height = this.imageHeight() }
            return this.finishInit() };
        F.prototype.finishInit = function() {
            var J, I, L, H, K;
            if (this.context == null) { this.context = this.canvas.getContext("2d") }
            this.originalWidth = this.preScaledWidth = this.width = this.canvas.width;
            this.originalHeight = this.preScaledHeight = this.height = this.canvas.height;
            this.hiDPIAdjustments();
            if (!this.hasId()) { this.assignId() }
            if (this.image != null) { this.context.drawImage(this.image, 0, 0, this.imageWidth(), this.imageHeight(), 0, 0, this.preScaledWidth, this.preScaledHeight) }
            this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.pixelData = this.imageData.data;
            if (F.allowRevert) { this.initializedPixelData = i.dataArray(this.pixelData.length);
                this.originalPixelData = i.dataArray(this.pixelData.length);
                K = this.pixelData;
                for (J = L = 0, H = K.length; L < H; J = ++L) { I = K[J];
                    this.initializedPixelData[J] = I;
                    this.originalPixelData[J] = I } }
            this.dimensions = { width: this.canvas.width, height: this.canvas.height };
            m.put(this.id, this);
            this.callback.call(this, this);
            return this.callback = function() {} };
        F.prototype.reloadCanvasData = function() { this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            return this.pixelData = this.imageData.data };
        F.prototype.resetOriginalPixelData = function() {
            var K, J, M, I, L, H;
            if (!F.allowRevert) {
                throw "Revert disabled" }
            this.originalPixelData = i.dataArray(this.pixelData.length);
            L = this.pixelData;
            H = [];
            for (K = M = 0, I = L.length; M < I; K = ++M) { J = L[K];
                H.push(this.originalPixelData[K] = J) }
            return H };
        F.prototype.hasId = function() {
            return F.getAttrId(this.canvas) != null };
        F.prototype.assignId = function() {
            if (F.NodeJS || this.canvas.getAttribute("data-caman-id")) {
                return }
            return this.canvas.setAttribute("data-caman-id", this.id) };
        F.prototype.hiDPIDisabled = function() {
            return this.canvas.getAttribute("data-caman-hidpi-disabled") !== null };
        F.prototype.hiDPIAdjustments = function() {
            var H;
            if (F.NodeJS || !this.needsHiDPISwap()) {
                return }
            H = this.hiDPIRatio();
            if (H !== 1) { q.debug("HiDPI ratio = " + H);
                this.scaled = true;
                this.preScaledWidth = this.canvas.width;
                this.preScaledHeight = this.canvas.height;
                this.canvas.width = this.preScaledWidth * H;
                this.canvas.height = this.preScaledHeight * H;
                this.canvas.style.width = "" + this.preScaledWidth + "px";
                this.canvas.style.height = "" + this.preScaledHeight + "px";
                this.context.scale(H, H);
                this.width = this.originalWidth = this.canvas.width;
                return this.height = this.originalHeight = this.canvas.height } };
        F.prototype.hiDPIRatio = function() {
            var I, H;
            H = window.devicePixelRatio || 1;
            I = this.context.webkitBackingStorePixelRatio || this.context.mozBackingStorePixelRatio || this.context.msBackingStorePixelRatio || this.context.oBackingStorePixelRatio || this.context.backingStorePixelRatio || 1;
            return H / I };
        F.prototype.hiDPICapable = function() {
            return (window.devicePixelRatio != null) && window.devicePixelRatio !== 1 };
        F.prototype.needsHiDPISwap = function() {
            if (this.hiDPIDisabled() || !this.hiDPICapable()) {
                return false }
            return this.hiDPIReplacement() !== null };
        F.prototype.hiDPIReplacement = function() {
            if (this.image == null) {
                return null }
            return this.image.getAttribute("data-caman-hidpi") };
        F.prototype.replaceCanvas = function(I) {
            var H;
            H = this.canvas;
            this.canvas = I;
            this.context = this.canvas.getContext("2d");
            if (!F.NodeJS) { H.parentNode.replaceChild(this.canvas, H) }
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.reloadCanvasData();
            return this.dimensions = { width: this.canvas.width, height: this.canvas.height } };
        F.prototype.render = function(I) {
            var H = this;
            if (I == null) { I = function() {} }
            C.trigger(this, "renderStart");
            return this.renderer.execute(function() { H.context.putImageData(H.imageData, 0, 0);
                return I.call(H) }) };
        F.prototype.revert = function(K) {
            var J, I, M, H, L;
            if (K == null) { K = true }
            if (!F.allowRevert) {
                throw "Revert disabled" }
            L = this.originalVisiblePixels();
            for (J = M = 0, H = L.length; M < H; J = ++M) { I = L[J];
                this.pixelData[J] = I }
            if (K) {
                return this.context.putImageData(this.imageData, 0, 0) } };
        F.prototype.reset = function() {
            var J, P, M, H, I, O, K, N, L;
            J = document.createElement("canvas");
            i.copyAttributes(this.canvas, J);
            J.width = this.originalWidth;
            J.height = this.originalHeight;
            P = J.getContext("2d");
            H = P.getImageData(0, 0, J.width, J.height);
            O = H.data;
            L = this.initializedPixelData;
            for (M = K = 0, N = L.length; K < N; M = ++K) { I = L[M];
                O[M] = I }
            P.putImageData(H, 0, 0);
            this.cropCoordinates = { x: 0, y: 0 };
            this.resized = false;
            return this.replaceCanvas(J) };
        F.prototype.originalVisiblePixels = function() {
            var O, W, V, I, H, X, Z, P, Q, T, S, aa, Y, U, L, J, ab, R, N, M, K;
            if (!F.allowRevert) {
                throw "Revert disabled" }
            T = [];
            aa = this.cropCoordinates.x;
            I = aa + this.width;
            Y = this.cropCoordinates.y;
            H = Y + this.height;
            if (this.resized) { O = document.createElement("canvas");
                O.width = this.originalWidth;
                O.height = this.originalHeight;
                V = O.getContext("2d");
                Z = V.getImageData(0, 0, O.width, O.height);
                Q = Z.data;
                R = this.originalPixelData;
                for (X = L = 0, ab = R.length; L < ab; X = ++L) { P = R[X];
                    Q[X] = P }
                V.putImageData(Z, 0, 0);
                S = document.createElement("canvas");
                S.width = this.width;
                S.height = this.height;
                V = S.getContext("2d");
                V.drawImage(O, 0, 0, this.originalWidth, this.originalHeight, 0, 0, this.width, this.height);
                Q = V.getImageData(0, 0, this.width, this.height).data;
                U = this.width } else { Q = this.originalPixelData;
                U = this.originalWidth }
            for (X = J = 0, N = Q.length; J < N; X = J += 4) { W = k.locationToCoordinates(X, U);
                if (((aa <= (M = W.x) && M < I)) && ((Y <= (K = W.y) && K < H))) { T.push(Q[X], Q[X + 1], Q[X + 2], Q[X + 3]) } }
            return T };
        F.prototype.process = function(H, I) { this.renderer.add({ type: B.Type.Single, name: H, processFn: I });
            return this };
        F.prototype.processKernel = function(I, M, N, H) {
            var J, L, K;
            if (N == null) { N = null }
            if (H == null) { H = 0 }
            if (N == null) { N = 0;
                for (J = L = 0, K = M.length; 0 <= K ? L < K : L > K; J = 0 <= K ? ++L : --L) { N += M[J] } }
            this.renderer.add({ type: B.Type.Kernel, name: I, adjust: M, divisor: N, bias: H });
            return this };
        F.prototype.processPlugin = function(I, H) { this.renderer.add({ type: B.Type.Plugin, plugin: I, args: H });
            return this };
        F.prototype.newLayer = function(I) {
            var H;
            H = new g(this);
            this.canvasQueue.push(H);
            this.renderer.add({ type: B.Type.LayerDequeue });
            I.call(H);
            this.renderer.add({ type: B.Type.LayerFinished });
            return this };
        F.prototype.executeLayer = function(H) {
            return this.pushContext(H) };
        F.prototype.pushContext = function(H) { this.layerStack.push(this.currentLayer);
            this.pixelStack.push(this.pixelData);
            this.currentLayer = H;
            return this.pixelData = H.pixelData };
        F.prototype.popContext = function() { this.pixelData = this.pixelStack.pop();
            return this.currentLayer = this.layerStack.pop() };
        F.prototype.applyCurrentLayer = function() {
            return this.currentLayer.applyToParent() };
        return F })(E);
    z.Caman = v;
    v.Analyze = (function() {
        function F(G) { this.c = G }
        F.prototype.calculateLevels = function() {
            var G, L, M, K, I, H, J;
            L = { r: {}, g: {}, b: {} };
            for (G = K = 0; K <= 255; G = ++K) { L.r[G] = 0;
                L.g[G] = 0;
                L.b[G] = 0 }
            for (G = I = 0, J = this.c.pixelData.length; I < J; G = I += 4) { L.r[this.c.pixelData[G]]++;
                L.g[this.c.pixelData[G + 1]]++;
                L.b[this.c.pixelData[G + 2]]++ }
            M = this.c.pixelData.length / 4;
            for (G = H = 0; H <= 255; G = ++H) { L.r[G] /= M;
                L.g[G] /= M;
                L.b[G] /= M }
            return L };
        return F })();
    a = v.Analyze;
    v.DOMUpdated = function() {
        var H, K, J, I, G, F;
        K = document.querySelectorAll("img[data-caman]");
        if (!(K.length > 0)) {
            return }
        F = [];
        for (I = 0, G = K.length; I < G; I++) { H = K[I];
            F.push(J = new w(H, function() { this.parse();
                return this.execute() })) }
        return F };
    if (v.autoload) {
        (function() {
            if (document.readyState === "complete") {
                return v.DOMUpdated() } else {
                return document.addEventListener("DOMContentLoaded", v.DOMUpdated, false) } })() }
    w = (function() {
        var G;
        G = "(\\w+)\\((.*?)\\)";

        function F(I, H) { this.dataStr = I.getAttribute("data-caman");
            this.caman = v(I, H.bind(this)) }
        F.prototype.parse = function() {
            var R, Q, I, J, O, S, K, H, P, M, T, N, L;
            this.ele = this.caman.canvas;
            H = new RegExp(G, "g");
            P = this.dataStr.match(H);
            if (!(P.length > 0)) {
                return }
            H = new RegExp(G);
            L = [];
            for (M = 0, T = P.length; M < T; M++) { O = P[M];
                N = O.match(H), K = N[0], I = N[1], R = N[2];
                S = new Function("return function() {        this." + I + "(" + R + ");      };");
                try { J = S();
                    L.push(J.call(this.caman)) } catch (U) { Q = U;
                    L.push(q.debug(Q)) } }
            return L };
        F.prototype.execute = function() {
            var H;
            H = this.ele;
            return this.caman.render(function() {
                return H.parentNode.replaceChild(this.toImage(), H) }) };
        return F })();
    v.Blender = (function() {
        function F() {}
        F.blenders = {};
        F.register = function(G, H) {
            return this.blenders[G] = H };
        F.execute = function(G, H, I) {
            return this.blenders[G](H, I) };
        return F })();
    l = v.Blender;
    v.Calculate = (function() {
        function F() {}
        F.distance = function(H, J, G, I) {
            return Math.sqrt(Math.pow(G - H, 2) + Math.pow(I - J, 2)) };
        F.randomRange = function(I, G, H) {
            var J;
            if (H == null) { H = false }
            J = I + (Math.random() * (G - I));
            if (H) {
                return J.toFixed(H) } else {
                return Math.round(J) } };
        F.luminance = function(G) {
            return (0.299 * G.r) + (0.587 * G.g) + (0.114 * G.b) };
        F.bezier = function(W, S, P, U, ae, Y) {
            var ad, ac, am, al, X, V, aa, I, H, ah, af, G, K, ab, ak, aj, ai, ag, T, R, O, N, M, L, J, Z, Q;
            ak = W[0];
            T = W[1];
            aj = S[0];
            R = S[1];
            ai = P[0];
            O = P[1];
            ag = U[0];
            N = U[1];
            aa = {};
            X = parseInt(3 * (aj - ak), 10);
            am = 3 * (ai - aj) - X;
            ad = ag - ak - X - am;
            V = 3 * (R - T);
            al = 3 * (O - R) - V;
            ac = N - T - V - al;
            for (ah = M = 0; M < 1000; ah = ++M) { ab = ah / 1000;
                I = Math.round((ad * Math.pow(ab, 3)) + (am * Math.pow(ab, 2)) + (X * ab) + ak);
                H = Math.round((ac * Math.pow(ab, 3)) + (al * Math.pow(ab, 2)) + (V * ab) + T);
                if (ae && H < ae) { H = ae } else {
                    if (Y && H > Y) { H = Y } }
                aa[I] = H }
            if (aa.length < U[0] + 1) {
                for (ah = L = 0, Z = U[0]; 0 <= Z ? L <= Z : L >= Z; ah = 0 <= Z ? ++L : --L) {
                    if (aa[ah] == null) { G = [ah - 1, aa[ah - 1]];
                        for (af = J = ah, Q = U[0]; ah <= Q ? J <= Q : J >= Q; af = ah <= Q ? ++J : --J) {
                            if (aa[af] != null) { K = [af, aa[af]];
                                break } }
                        aa[ah] = G[1] + ((K[1] - G[1]) / (K[0] - G[0])) * (ah - G[0]) } } }
            if (aa[U[0]] == null) { aa[U[0]] = aa[U[0] - 1] }
            return aa };
        return F })();
    n = v.Calculate;
    v.Convert = (function() {
        function F() {}
        F.hexToRGB = function(J) {
            var G, I, H;
            if (J.charAt(0) === "#") { J = J.substr(1) }
            H = parseInt(J.substr(0, 2), 16);
            I = parseInt(J.substr(2, 2), 16);
            G = parseInt(J.substr(4, 2), 16);
            return { r: H, g: I, b: G } };
        F.rgbToHSL = function(G, K, M) {
            var L, J, H, N, I, O;
            if (typeof G === "object") { K = G.g;
                M = G.b;
                G = G.r }
            G /= 255;
            K /= 255;
            M /= 255;
            N = Math.max(G, K, M);
            I = Math.min(G, K, M);
            H = (N + I) / 2;
            if (N === I) { J = O = 0 } else { L = N - I;
                O = H > 0.5 ? L / (2 - N - I) : L / (N + I);
                J = (function() {
                    switch (N) {
                        case G:
                            return (K - M) / L + (K < M ? 6 : 0);
                        case K:
                            return (M - G) / L + 2;
                        case M:
                            return (G - K) / L + 4 } })();
                J /= 6 }
            return { h: J, s: O, l: H } };
        F.hslToRGB = function(J, I, H) {
            var G, L, N, M, K;
            if (typeof J === "object") { I = J.s;
                H = J.l;
                J = J.h }
            if (I === 0) { K = L = G = H } else { M = H < 0.5 ? H * (1 + I) : H + I - H * I;
                N = 2 * H - M;
                K = this.hueToRGB(N, M, J + 1 / 3);
                L = this.hueToRGB(N, M, J);
                G = this.hueToRGB(N, M, J - 1 / 3) }
            return { r: K * 255, g: L * 255, b: G * 255 } };
        F.hueToRGB = function(I, H, G) {
            if (G < 0) { G += 1 }
            if (G > 1) { G -= 1 }
            if (G < 1 / 6) {
                return I + (H - I) * 6 * G }
            if (G < 1 / 2) {
                return H }
            if (G < 2 / 3) {
                return I + (H - I) * (2 / 3 - G) * 6 }
            return I };
        F.rgbToHSV = function(G, J, L) {
            var K, I, M, H, O, N;
            G /= 255;
            J /= 255;
            L /= 255;
            M = Math.max(G, J, L);
            H = Math.min(G, J, L);
            N = M;
            K = M - H;
            O = M === 0 ? 0 : K / M;
            if (M === H) { I = 0 } else { I = (function() {
                    switch (M) {
                        case G:
                            return (J - L) / K + (J < L ? 6 : 0);
                        case J:
                            return (L - G) / K + 2;
                        case L:
                            return (G - J) / K + 4 } })();
                I /= 6 }
            return { h: I, s: O, v: N } };
        F.hsvToRGB = function(K, Q, O) {
            var N, M, L, J, I, H, G, P;
            J = Math.floor(K * 6);
            M = K * 6 - J;
            I = O * (1 - Q);
            H = O * (1 - M * Q);
            P = O * (1 - (1 - M) * Q);
            switch (J % 6) {
                case 0:
                    G = O;
                    L = P;
                    N = I;
                    break;
                case 1:
                    G = H;
                    L = O;
                    N = I;
                    break;
                case 2:
                    G = I;
                    L = O;
                    N = P;
                    break;
                case 3:
                    G = I;
                    L = H;
                    N = O;
                    break;
                case 4:
                    G = P;
                    L = I;
                    N = O;
                    break;
                case 5:
                    G = O;
                    L = I;
                    N = H }
            return { r: Math.floor(G * 255), g: Math.floor(L * 255), b: Math.floor(N * 255) } };
        F.rgbToXYZ = function(J, I, H) {
            var G, L, K;
            J /= 255;
            I /= 255;
            H /= 255;
            if (J > 0.04045) { J = Math.pow((J + 0.055) / 1.055, 2.4) } else { J /= 12.92 }
            if (I > 0.04045) { I = Math.pow((I + 0.055) / 1.055, 2.4) } else { I /= 12.92 }
            if (H > 0.04045) { H = Math.pow((H + 0.055) / 1.055, 2.4) } else { H /= 12.92 }
            G = J * 0.4124 + I * 0.3576 + H * 0.1805;
            L = J * 0.2126 + I * 0.7152 + H * 0.0722;
            K = J * 0.0193 + I * 0.1192 + H * 0.9505;
            return { x: G * 100, y: L * 100, z: K * 100 } };
        F.xyzToRGB = function(H, L, K) {
            var G, J, I;
            H /= 100;
            L /= 100;
            K /= 100;
            I = (3.2406 * H) + (-1.5372 * L) + (-0.4986 * K);
            J = (-0.9689 * H) + (1.8758 * L) + (0.0415 * K);
            G = (0.0557 * H) + (-0.204 * L) + (1.057 * K);
            if (I > 0.0031308) { I = (1.055 * Math.pow(I, 0.4166666667)) - 0.055 } else { I *= 12.92 }
            if (J > 0.0031308) { J = (1.055 * Math.pow(J, 0.4166666667)) - 0.055 } else { J *= 12.92 }
            if (G > 0.0031308) { G = (1.055 * Math.pow(G, 0.4166666667)) - 0.055 } else { G *= 12.92 }
            return { r: I * 255, g: J * 255, b: G * 255 } };
        F.xyzToLab = function(O, L, K) {
            var N, M, J, I, H, G;
            if (typeof O === "object") { L = O.y;
                K = O.z;
                O = O.x }
            I = 95.047;
            H = 100;
            G = 108.883;
            O /= I;
            L /= H;
            K /= G;
            if (O > 0.008856451679) { O = Math.pow(O, 0.3333333333) } else { O = (7.787037037 * O) + 0.1379310345 }
            if (L > 0.008856451679) { L = Math.pow(L, 0.3333333333) } else { L = (7.787037037 * L) + 0.1379310345 }
            if (K > 0.008856451679) { K = Math.pow(K, 0.3333333333) } else { K = (7.787037037 * K) + 0.1379310345 }
            J = 116 * L - 16;
            N = 500 * (O - L);
            M = 200 * (L - K);
            return { l: J, a: N, b: M } };
        F.labToXYZ = function(J, I, H) {
            var G, L, K;
            if (typeof J === "object") { I = J.a;
                H = J.b;
                J = J.l }
            L = (J + 16) / 116;
            G = L + (I / 500);
            K = L - (H / 200);
            if (G > 0.2068965517) { G = G * G * G } else { G = 0.1284185493 * (G - 0.1379310345) }
            if (L > 0.2068965517) { L = L * L * L } else { L = 0.1284185493 * (L - 0.1379310345) }
            if (K > 0.2068965517) { K = K * K * K } else { K = 0.1284185493 * (K - 0.1379310345) }
            return { x: G * 95.047, y: L * 100, z: K * 108.883 } };
        F.rgbToLab = function(J, I, G) {
            var H;
            if (typeof J === "object") { I = J.g;
                G = J.b;
                J = J.r }
            H = this.rgbToXYZ(J, I, G);
            return this.xyzToLab(H) };
        F.labToRGB = function(I, H, G) {};
        return F })();
    A = v.Convert;
    v.Event = (function() {
        function F() {}
        F.events = {};
        F.types = ["processStart", "processComplete", "renderStart", "renderFinished", "blockStarted", "blockFinished"];
        F.trigger = function(N, I, M) {
            var J, L, H, K, G;
            if (M == null) { M = null }
            if (this.events[I] && this.events[I].length) { K = this.events[I];
                G = [];
                for (L = 0, H = K.length; L < H; L++) { J = K[L];
                    if (J.target === null || N.id === J.target.id) { G.push(J.fn.call(N, M)) } else { G.push(void 0) } }
                return G } };
        F.listen = function(J, I, H) {
            var K, G;
            if (typeof J === "string") { G = J;
                K = I;
                J = null;
                I = G;
                H = K }
            if (c.call(this.types, I) < 0) {
                return false }
            if (!this.events[I]) { this.events[I] = [] }
            this.events[I].push({ target: J, fn: H });
            return true };
        return F })();
    C = v.Event;
    v.Filter = (function() {
        function F() {}
        F.Type = { Single: 1, Kernel: 2, LayerDequeue: 3, LayerFinished: 4, LoadOverlay: 5, Plugin: 6 };
        F.register = function(G, H) {
            return v.prototype[G] = H };
        return F })();
    B = v.Filter;
    v.IO = (function() {
        function F() {}
        F.domainRegex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/;
        F.isRemote = function(G) {
            if (G == null) {
                return false }
            if (this.corsEnabled(G)) {
                return false }
            return this.isURLRemote(G.src) };
        F.corsEnabled = function(G) {
            var H;
            return (G.crossOrigin != null) && ((H = G.crossOrigin.toLowerCase()) === "anonymous" || H === "use-credentials") };
        F.isURLRemote = function(G) {
            var H;
            H = G.match(this.domainRegex);
            if (H) {
                return H[1] !== document.domain } else {
                return false } };
        F.remoteCheck = function(G) {
            if (this.isURLRemote(G)) {
                if (!v.remoteProxy.length) { q.info("Attempting to load a remote image without a configured proxy. URL: " + G) } else {
                    if (v.isURLRemote(v.remoteProxy)) { q.info("Cannot use a remote proxy for loading images.");
                        return }
                    return this.proxyUrl(G) } } };
        F.proxyUrl = function(G) {
            return "" + v.remoteProxy + "?" + v.proxyParam + "=" + (encodeURIComponent(G)) };
        F.useProxy = function(H) {
            var G;
            G = { ruby: "rb", python: "py", perl: "pl", javascript: "js" };
            H = H.toLowerCase();
            if (G[H] != null) { H = G[H] }
            return "proxies/caman_proxy." + H };
        return F })();
    v.prototype.save = function() {
        if (typeof exports !== "undefined" && exports !== null) {
            return this.nodeSave.apply(this, arguments) } else {
            return this.browserSave.apply(this, arguments) } };
    v.prototype.browserSave = function(F) {
        var G;
        if (F == null) { F = "png" }
        F = F.toLowerCase();
        G = this.toBase64(F).replace("image/" + F, "image/octet-stream");
        return document.location.href = G };
    v.prototype.nodeSave = function(H, F) {
        var I, G;
        if (F == null) { F = true }
        try { G = h.statSync(H);
            if (G.isFile() && !F) {
                return false } } catch (J) { I = J;
            q.debug("Creating output file " + H) }
        return h.writeFile(H, this.canvas.toBuffer(), function() {
            return q.debug("Finished writing to " + H) }) };
    v.prototype.toImage = function(G) {
        var F;
        F = document.createElement("img");
        F.src = this.toBase64(G);
        F.width = this.dimensions.width;
        F.height = this.dimensions.height;
        if (window.devicePixelRatio) { F.width /= window.devicePixelRatio;
            F.height /= window.devicePixelRatio }
        return F };
    v.prototype.toBase64 = function(F) {
        if (F == null) { F = "png" }
        F = F.toLowerCase();
        return this.canvas.toDataURL("image/" + F) };
    d = v.IO;
    v.Layer = (function() {
        function F(G) { this.c = G;
            this.filter = this.c;
            this.options = { blendingMode: "normal", opacity: 1 };
            this.layerID = i.uniqid.get();
            this.canvas = typeof exports !== "undefined" && exports !== null ? new r() : document.createElement("canvas");
            this.canvas.width = this.c.dimensions.width;
            this.canvas.height = this.c.dimensions.height;
            this.context = this.canvas.getContext("2d");
            this.context.createImageData(this.canvas.width, this.canvas.height);
            this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.pixelData = this.imageData.data }
        F.prototype.newLayer = function(G) {
            return this.c.newLayer.call(this.c, G) };
        F.prototype.setBlendingMode = function(G) { this.options.blendingMode = G;
            return this };
        F.prototype.opacity = function(G) { this.options.opacity = G / 100;
            return this };
        F.prototype.copyParent = function() {
            var H, G, J, I;
            G = this.c.pixelData;
            for (H = J = 0, I = this.c.pixelData.length; J < I; H = J += 4) { this.pixelData[H] = G[H];
                this.pixelData[H + 1] = G[H + 1];
                this.pixelData[H + 2] = G[H + 2];
                this.pixelData[H + 3] = G[H + 3] }
            return this };
        F.prototype.fillColor = function() {
            return this.c.fillColor.apply(this.c, arguments) };
        F.prototype.overlayImage = function(G) {
            if (typeof G === "object") { G = G.src } else {
                if (typeof G === "string" && G[0] === "#") { G = f(G).src } }
            if (!G) {
                return this }
            this.c.renderer.renderQueue.push({ type: B.Type.LoadOverlay, src: G, layer: this });
            return this };
        F.prototype.applyToParent = function() {
            var L, N, M, O, G, I, J, K, H;
            M = this.c.pixelStack[this.c.pixelStack.length - 1];
            N = this.c.pixelData;
            H = [];
            for (L = J = 0, K = N.length; J < K; L = J += 4) { I = { r: M[L], g: M[L + 1], b: M[L + 2], a: M[L + 3] };
                G = { r: N[L], g: N[L + 1], b: N[L + 2], a: N[L + 3] };
                O = l.execute(this.options.blendingMode, G, I);
                O.r = i.clampRGB(O.r);
                O.g = i.clampRGB(O.g);
                O.b = i.clampRGB(O.b);
                if (O.a == null) { O.a = G.a }
                M[L] = I.r - ((I.r - O.r) * (this.options.opacity * (O.a / 255)));
                M[L + 1] = I.g - ((I.g - O.g) * (this.options.opacity * (O.a / 255)));
                H.push(M[L + 2] = I.b - ((I.b - O.b) * (this.options.opacity * (O.a / 255)))) }
            return H };
        return F })();
    g = v.Layer;
    v.Logger = (function() {
        function F() {
            var H, J, G, I;
            I = ["log", "info", "warn", "error"];
            for (J = 0, G = I.length; J < G; J++) { H = I[J];
                this[H] = (function(K) {
                    return function() {
                        var L, M;
                        L = 1 <= arguments.length ? p.call(arguments, 0) : [];
                        if (!v.DEBUG) {
                            return }
                        try {
                            return console[K].apply(console, L) } catch (N) { M = N;
                            return console[K](L) } } })(H) }
            this.debug = this.log }
        return F })();
    q = new v.Logger();
    v.Pixel = (function() { F.coordinatesToLocation = function(G, I, H) {
            return (I * H + G) * 4 };
        F.locationToCoordinates = function(I, H) {
            var G, J;
            J = Math.floor(I / (H * 4));
            G = (I % (H * 4)) / 4;
            return { x: G, y: J } };

        function F(J, I, G, H, K) { this.r = J != null ? J : 0;
            this.g = I != null ? I : 0;
            this.b = G != null ? G : 0;
            this.a = H != null ? H : 255;
            this.c = K != null ? K : null;
            this.loc = 0 }
        F.prototype.setContext = function(G) {
            return this.c = G };
        F.prototype.locationXY = function() {
            var G, H;
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            H = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4));
            G = (this.loc % (this.c.dimensions.width * 4)) / 4;
            return { x: G, y: H } };
        F.prototype.pixelAtLocation = function(G) {
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            return new F(this.c.pixelData[G], this.c.pixelData[G + 1], this.c.pixelData[G + 2], this.c.pixelData[G + 3], this.c) };
        F.prototype.getPixelRelative = function(I, G) {
            var H;
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            H = this.loc + (this.c.dimensions.width * 4 * (G * -1)) + (4 * I);
            if (H > this.c.pixelData.length || H < 0) {
                return new F(0, 0, 0, 255, this.c) }
            return this.pixelAtLocation(H) };
        F.prototype.putPixelRelative = function(J, G, H) {
            var I;
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            I = this.loc + (this.c.dimensions.width * 4 * (G * -1)) + (4 * J);
            if (newLoc > this.c.pixelData.length || newLoc < 0) {
                return }
            this.c.pixelData[newLoc] = H.r;
            this.c.pixelData[newLoc + 1] = H.g;
            this.c.pixelData[newLoc + 2] = H.b;
            this.c.pixelData[newLoc + 3] = H.a;
            return true };
        F.prototype.getPixel = function(G, I) {
            var H;
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            H = this.coordinatesToLocation(G, I, this.width);
            return this.pixelAtLocation(H) };
        F.prototype.putPixel = function(G, J, H) {
            var I;
            if (this.c == null) {
                throw "Requires a CamanJS context" }
            I = this.coordinatesToLocation(G, J, this.width);
            this.c.pixelData[I] = H.r;
            this.c.pixelData[I + 1] = H.g;
            this.c.pixelData[I + 2] = H.b;
            return this.c.pixelData[I + 3] = H.a };
        F.prototype.toString = function() {
            return this.toKey() };
        F.prototype.toHex = function(G) {
            var H;
            if (G == null) { G = false }
            H = "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
            if (G) {
                return H + this.a.toString(16) } else {
                return H } };
        return F })();
    k = v.Pixel;
    v.Plugin = (function() {
        function F() {}
        F.plugins = {};
        F.register = function(G, H) {
            return this.plugins[G] = H };
        F.execute = function(I, H, G) {
            return this.plugins[H].apply(I, G) };
        return F })();
    b = v.Plugin;
    v.Renderer = (function() { F.Blocks = v.NodeJS ? require("os").cpus().length : 4;

        function F(G) { this.c = G;
            this.processNext = e(this.processNext, this);
            this.renderQueue = [];
            this.modPixelData = null }
        F.prototype.add = function(G) {
            if (G == null) {
                return }
            return this.renderQueue.push(G) };
        F.prototype.processNext = function() {
            var G;
            if (this.renderQueue.length === 0) { C.trigger(this, "renderFinished");
                if (this.finishedFn != null) { this.finishedFn.call(this.c) }
                return this }
            this.currentJob = this.renderQueue.shift();
            switch (this.currentJob.type) {
                case B.Type.LayerDequeue:
                    G = this.c.canvasQueue.shift();
                    this.c.executeLayer(G);
                    return this.processNext();
                case B.Type.LayerFinished:
                    this.c.applyCurrentLayer();
                    this.c.popContext();
                    return this.processNext();
                case B.Type.LoadOverlay:
                    return this.loadOverlay(this.currentJob.layer, this.currentJob.src);
                case B.Type.Plugin:
                    return this.executePlugin();
                default:
                    return this.executeFilter() } };
        F.prototype.execute = function(G) { this.finishedFn = G;
            this.modPixelData = i.dataArray(this.c.pixelData.length);
            return this.processNext() };
        F.prototype.eachBlock = function(R) {
            var Q, S, T, K, P, N, J, H, G, L, M, I, O = this;
            this.blocksDone = 0;
            H = this.c.pixelData.length;
            S = Math.floor((H / 4) / F.Blocks);
            Q = S * 4;
            J = Q + ((H / 4) % F.Blocks) * 4;
            I = [];
            for (N = L = 0, M = F.Blocks; 0 <= M ? L < M : L > M; N = 0 <= M ? ++L : --L) { G = N * Q;
                K = G + (N === F.Blocks - 1 ? J : Q);
                if (v.NodeJS) { P = D(function() {
                        return R.call(O, N, G, K) });
                    T = P.run();
                    I.push(this.blockFinished(T)) } else { I.push(setTimeout((function(V, W, U) {
                        return function() {
                            return R.call(O, V, W, U) } })(N, G, K), 0)) } }
            return I };
        F.prototype.executeFilter = function() { C.trigger(this.c, "processStart", this.currentJob);
            if (this.currentJob.type === B.Type.Single) {
                return this.eachBlock(this.renderBlock) } else {
                return this.eachBlock(this.renderKernel) } };
        F.prototype.executePlugin = function() { q.debug("Executing plugin " + this.currentJob.plugin);
            b.execute(this.c, this.currentJob.plugin, this.currentJob.args);
            q.debug("Plugin " + this.currentJob.plugin + " finished!");
            return this.processNext() };
        F.prototype.renderBlock = function(J, L, G) {
            var I, H, K;
            q.debug("Block #" + J + " - Filter: " + this.currentJob.name + ", Start: " + L + ", End: " + G);
            C.trigger(this.c, "blockStarted", { blockNum: J, totalBlocks: F.Blocks, startPixel: L, endPixel: G });
            H = new k();
            H.setContext(this.c);
            for (I = K = L; K < G; I = K += 4) { H.loc = I;
                H.r = this.c.pixelData[I];
                H.g = this.c.pixelData[I + 1];
                H.b = this.c.pixelData[I + 2];
                H.a = this.c.pixelData[I + 3];
                this.currentJob.processFn(H);
                this.c.pixelData[I] = i.clampRGB(H.r);
                this.c.pixelData[I + 1] = i.clampRGB(H.g);
                this.c.pixelData[I + 2] = i.clampRGB(H.b);
                this.c.pixelData[I + 3] = i.clampRGB(H.a) }
            if (v.NodeJS) {
                return D.yield(J) } else {
                return this.blockFinished(J) } };
        F.prototype.renderKernel = function(Y, N, K) {
            var U, L, O, T, J, Q, X, W, V, P, S, aa, R, M, Z, I, H, G;
            aa = this.currentJob.name;
            O = this.currentJob.bias;
            Q = this.currentJob.divisor;
            S = this.c.pixelData.length;
            U = this.currentJob.adjust;
            L = Math.sqrt(U.length);
            P = [];
            q.debug("Rendering kernel - Filter: " + this.currentJob.name);
            N = Math.max(N, this.c.dimensions.width * 4 * ((L - 1) / 2));
            K = Math.min(K, S - (this.c.dimensions.width * 4 * ((L - 1) / 2)));
            T = (L - 1) / 2;
            M = new k();
            M.setContext(this.c);
            for (X = I = N; I < K; X = I += 4) { M.loc = X;
                J = 0;
                for (W = H = -T; - T <= T ? H <= T : H >= T; W = -T <= T ? ++H : --H) {
                    for (V = G = T; T <= -T ? G <= -T : G >= -T; V = T <= -T ? ++G : --G) { R = M.getPixelRelative(W, V);
                        P[J * 3] = R.r;
                        P[J * 3 + 1] = R.g;
                        P[J * 3 + 2] = R.b;
                        J++ } }
                Z = this.processKernel(U, P, Q, O);
                this.modPixelData[X] = i.clampRGB(Z.r);
                this.modPixelData[X + 1] = i.clampRGB(Z.g);
                this.modPixelData[X + 2] = i.clampRGB(Z.b);
                this.modPixelData[X + 3] = this.c.pixelData[X + 3] }
            if (v.NodeJS) {
                return D.yield(Y) } else {
                return this.blockFinished(Y) } };
        F.prototype.blockFinished = function(H) {
            var G, J, I;
            if (H >= 0) { q.debug("Block #" + H + " finished! Filter: " + this.currentJob.name) }
            this.blocksDone++;
            C.trigger(this.c, "blockFinished", { blockNum: H, blocksFinished: this.blocksDone, totalBlocks: F.Blocks });
            if (this.blocksDone === F.Blocks) {
                if (this.currentJob.type === B.Type.Kernel) {
                    for (G = J = 0, I = this.c.pixelData.length; 0 <= I ? J < I : J > I; G = 0 <= I ? ++J : --J) { this.c.pixelData[G] = this.modPixelData[G] } }
                if (H >= 0) { q.debug("Filter " + this.currentJob.name + " finished!") }
                C.trigger(this.c, "processComplete", this.currentJob);
                return this.processNext() } };
        F.prototype.processKernel = function(K, N, M, G) {
            var H, L, J, I;
            L = { r: 0, g: 0, b: 0 };
            for (H = J = 0, I = K.length; 0 <= I ? J < I : J > I; H = 0 <= I ? ++J : --J) { L.r += K[H] * N[H * 3];
                L.g += K[H] * N[H * 3 + 1];
                L.b += K[H] * N[H * 3 + 2] }
            L.r = (L.r / M) + G;
            L.g = (L.g / M) + G;
            L.b = (L.b / M) + G;
            return L };
        F.prototype.loadOverlay = function(H, I) {
            var G, K, J = this;
            G = document.createElement("img");
            G.onload = function() { H.context.drawImage(G, 0, 0, J.c.dimensions.width, J.c.dimensions.height);
                H.imageData = H.context.getImageData(0, 0, J.c.dimensions.width, J.c.dimensions.height);
                H.pixelData = H.imageData.data;
                J.c.pixelData = H.pixelData;
                return J.processNext() };
            K = d.remoteCheck(I);
            return G.src = K != null ? K : I };
        return F })();
    u = v.Renderer;
    v.Store = (function() {
        function F() {}
        F.items = {};
        F.has = function(G) {
            return this.items[G] != null };
        F.get = function(G) {
            return this.items[G] };
        F.put = function(G, H) {
            return this.items[G] = H };
        F.execute = function(G, I) {
            var H = this;
            setTimeout(function() {
                return I.call(H.get(G), H.get(G)) }, 0);
            return this.get(G) };
        F.flush = function(G) {
            if (G == null) { G = false }
            if (G) {
                return delete this.items[G] } else {
                return this.items = {} } };
        return F })();
    m = v.Store;
    l.register("normal", function(F, G) {
        return { r: F.r, g: F.g, b: F.b } });
    l.register("multiply", function(F, G) {
        return { r: (F.r * G.r) / 255, g: (F.g * G.g) / 255, b: (F.b * G.b) / 255 } });
    l.register("screen", function(F, G) {
        return { r: 255 - (((255 - F.r) * (255 - G.r)) / 255), g: 255 - (((255 - F.g) * (255 - G.g)) / 255), b: 255 - (((255 - F.b) * (255 - G.b)) / 255) } });
    l.register("overlay", function(G, H) {
        var F;
        F = {};
        F.r = H.r > 128 ? 255 - 2 * (255 - G.r) * (255 - H.r) / 255 : (H.r * G.r * 2) / 255;
        F.g = H.g > 128 ? 255 - 2 * (255 - G.g) * (255 - H.g) / 255 : (H.g * G.g * 2) / 255;
        F.b = H.b > 128 ? 255 - 2 * (255 - G.b) * (255 - H.b) / 255 : (H.b * G.b * 2) / 255;
        return F });
    l.register("difference", function(F, G) {
        return { r: F.r - G.r, g: F.g - G.g, b: F.b - G.b } });
    l.register("addition", function(F, G) {
        return { r: G.r + F.r, g: G.g + F.g, b: G.b + F.b } });
    l.register("exclusion", function(F, G) {
        return { r: 128 - 2 * (G.r - 128) * (F.r - 128) / 255, g: 128 - 2 * (G.g - 128) * (F.g - 128) / 255, b: 128 - 2 * (G.b - 128) * (F.b - 128) / 255 } });
    l.register("softLight", function(G, H) {
        var F;
        F = {};
        F.r = H.r > 128 ? 255 - ((255 - H.r) * (255 - (G.r - 128))) / 255 : (H.r * (G.r + 128)) / 255;
        F.g = H.g > 128 ? 255 - ((255 - H.g) * (255 - (G.g - 128))) / 255 : (H.g * (G.g + 128)) / 255;
        F.b = H.b > 128 ? 255 - ((255 - H.b) * (255 - (G.b - 128))) / 255 : (H.b * (G.b + 128)) / 255;
        return F });
    l.register("lighten", function(F, G) {
        return { r: G.r > F.r ? G.r : F.r, g: G.g > F.g ? G.g : F.g, b: G.b > F.b ? G.b : F.b } });
    l.register("darken", function(F, G) {
        return { r: G.r > F.r ? F.r : G.r, g: G.g > F.g ? F.g : G.g, b: G.b > F.b ? F.b : G.b } });
    B.register("fillColor", function() {
        var F;
        if (arguments.length === 1) { F = A.hexToRGB(arguments[0]) } else { F = { r: arguments[0], g: arguments[1], b: arguments[2] } }
        return this.process("fillColor", function(G) { G.r = F.r;
            G.g = F.g;
            G.b = F.b;
            G.a = 255;
            return G }) });
    B.register("brightness", function(F) { F = Math.floor(255 * (F / 100));
        return this.process("brightness", function(G) { G.r += F;
            G.g += F;
            G.b += F;
            return G }) });
    B.register("saturation", function(F) { F *= -0.01;
        return this.process("saturation", function(H) {
            var G;
            G = Math.max(H.r, H.g, H.b);
            if (H.r !== G) { H.r += (G - H.r) * F }
            if (H.g !== G) { H.g += (G - H.g) * F }
            if (H.b !== G) { H.b += (G - H.b) * F }
            return H }) });
    B.register("vibrance", function(F) { F *= -1;
        return this.process("vibrance", function(H) {
            var J, I, G;
            G = Math.max(H.r, H.g, H.b);
            I = (H.r + H.g + H.b) / 3;
            J = ((Math.abs(G - I) * 2 / 255) * F) / 100;
            if (H.r !== G) { H.r += (G - H.r) * J }
            if (H.g !== G) { H.g += (G - H.g) * J }
            if (H.b !== G) { H.b += (G - H.b) * J }
            return H }) });
    B.register("greyscale", function(F) {
        return this.process("greyscale", function(G) {
            var H;
            H = n.luminance(G);
            G.r = H;
            G.g = H;
            G.b = H;
            return G }) });
    B.register("contrast", function(F) { F = Math.pow((F + 100) / 100, 2);
        return this.process("contrast", function(G) { G.r /= 255;
            G.r -= 0.5;
            G.r *= F;
            G.r += 0.5;
            G.r *= 255;
            G.g /= 255;
            G.g -= 0.5;
            G.g *= F;
            G.g += 0.5;
            G.g *= 255;
            G.b /= 255;
            G.b -= 0.5;
            G.b *= F;
            G.b += 0.5;
            G.b *= 255;
            return G }) });
    B.register("hue", function(F) {
        return this.process("hue", function(I) {
            var G, L, J, H, K, M;
            H = A.rgbToHSV(I.r, I.g, I.b);
            J = H.h * 100;
            J += Math.abs(F);
            J = J % 100;
            J /= 100;
            H.h = J;
            M = A.hsvToRGB(H.h, H.s, H.v), K = M.r, L = M.g, G = M.b;
            I.r = K;
            I.g = L;
            I.b = G;
            return I }) });
    B.register("colorize", function() {
        var G, F;
        if (arguments.length === 2) { F = A.hexToRGB(arguments[0]);
            G = arguments[1] } else {
            if (arguments.length === 4) { F = { r: arguments[0], g: arguments[1], b: arguments[2] };
                G = arguments[3] } }
        return this.process("colorize", function(H) { H.r -= (H.r - F.r) * (G / 100);
            H.g -= (H.g - F.g) * (G / 100);
            H.b -= (H.b - F.b) * (G / 100);
            return H }) });
    B.register("invert", function() {
        return this.process("invert", function(F) { F.r = 255 - F.r;
            F.g = 255 - F.g;
            F.b = 255 - F.b;
            return F }) });
    B.register("sepia", function(F) {
        if (F == null) { F = 100 }
        F /= 100;
        return this.process("sepia", function(G) { G.r = Math.min(255, (G.r * (1 - (0.607 * F))) + (G.g * (0.769 * F)) + (G.b * (0.189 * F)));
            G.g = Math.min(255, (G.r * (0.349 * F)) + (G.g * (1 - (0.314 * F))) + (G.b * (0.168 * F)));
            G.b = Math.min(255, (G.r * (0.272 * F)) + (G.g * (0.534 * F)) + (G.b * (1 - (0.869 * F))));
            return G }) });
    B.register("gamma", function(F) {
        return this.process("gamma", function(G) { G.r = Math.pow(G.r / 255, F) * 255;
            G.g = Math.pow(G.g / 255, F) * 255;
            G.b = Math.pow(G.b / 255, F) * 255;
            return G }) });
    B.register("noise", function(F) { F = Math.abs(F) * 2.55;
        return this.process("noise", function(G) {
            var H;
            H = n.randomRange(F * -1, F);
            G.r += H;
            G.g += H;
            G.b += H;
            return G }) });
    B.register("clip", function(F) { F = Math.abs(F) * 2.55;
        return this.process("clip", function(G) {
            if (G.r > 255 - F) { G.r = 255 } else {
                if (G.r < F) { G.r = 0 } }
            if (G.g > 255 - F) { G.g = 255 } else {
                if (G.g < F) { G.g = 0 } }
            if (G.b > 255 - F) { G.b = 255 } else {
                if (G.b < F) { G.b = 0 } }
            return G }) });
    B.register("channels", function(F) {
        var H, G;
        if (typeof F !== "object") {
            return this }
        for (H in F) {
            if (!o.call(F, H)) {
                continue }
            G = F[H];
            if (G === 0) { delete F[H];
                continue }
            F[H] /= 100 }
        if (F.length === 0) {
            return this }
        return this.process("channels", function(I) {
            if (F.red != null) {
                if (F.red > 0) { I.r += (255 - I.r) * F.red } else { I.r -= I.r * Math.abs(F.red) } }
            if (F.green != null) {
                if (F.green > 0) { I.g += (255 - I.g) * F.green } else { I.g -= I.g * Math.abs(F.green) } }
            if (F.blue != null) {
                if (F.blue > 0) { I.b += (255 - I.b) * F.blue } else { I.b -= I.b * Math.abs(F.blue) } }
            return I }) });
    B.register("curves", function() {
        var I, F, Q, J, H, M, P, G, N, L, O, K;
        F = arguments[0], Q = 2 <= arguments.length ? p.call(arguments, 1) : [];
        if (typeof F === "string") { F = F.split("") }
        if (F[0] === "v") { F = ["r", "g", "b"] }
        if (Q.length < 3 || Q.length > 4) {
            throw "Invalid number of arguments to curves filter" }
        G = Q[0];
        J = Q[1];
        H = Q.length === 4 ? Q[2] : Q[1];
        M = Q[Q.length - 1];
        I = n.bezier(G, J, H, M, 0, 255);
        if (G[0] > 0) {
            for (P = N = 0, O = G[0]; 0 <= O ? N < O : N > O; P = 0 <= O ? ++N : --N) { I[P] = G[1] } }
        if (M[0] < 255) {
            for (P = L = K = M[0]; K <= 255 ? L <= 255 : L >= 255; P = K <= 255 ? ++L : --L) { I[P] = M[1] } }
        return this.process("curves", function(R) {
            var S, T;
            for (P = S = 0, T = F.length; 0 <= T ? S < T : S > T; P = 0 <= T ? ++S : --S) { R[F[P]] = I[R[F[P]]] }
            return R }) });
    B.register("exposure", function(H) {
        var F, I, G;
        G = Math.abs(H) / 100;
        F = [0, 255 * G];
        I = [255 - (255 * G), 255];
        if (H < 0) { F = F.reverse();
            I = I.reverse() }
        return this.curves("rgb", [0, 0], F, I, [255, 255]) });
    v.Plugin.register("crop", function(J, G, F, K) {
        var I, H;
        if (F == null) { F = 0 }
        if (K == null) { K = 0 }
        if (typeof exports !== "undefined" && exports !== null) { I = new r(J, G) } else { I = document.createElement("canvas");
            i.copyAttributes(this.canvas, I);
            I.width = J;
            I.height = G }
        H = I.getContext("2d");
        H.drawImage(this.canvas, F, K, J, G, 0, 0, J, G);
        this.cropCoordinates = { x: F, y: K };
        this.cropped = true;
        return this.replaceCanvas(I) });
    v.Plugin.register("resize", function(H) {
        var G, F;
        if (H == null) { H = null }
        if (H === null || ((H.width == null) && (H.height == null))) { q.error("Invalid or missing dimensions given for resize");
            return }
        if (H.width == null) { H.width = this.canvas.width * H.height / this.canvas.height } else {
            if (H.height == null) { H.height = this.canvas.height * H.width / this.canvas.width } }
        if (typeof exports !== "undefined" && exports !== null) { G = new r(H.width, H.height) } else { G = document.createElement("canvas");
            i.copyAttributes(this.canvas, G);
            G.width = H.width;
            G.height = H.height }
        F = G.getContext("2d");
        F.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, H.width, H.height);
        this.resized = true;
        return this.replaceCanvas(G) });
    v.Filter.register("crop", function() {
        return this.processPlugin("crop", Array.prototype.slice.call(arguments, 0)) });
    v.Filter.register("resize", function() {
        return this.processPlugin("resize", Array.prototype.slice.call(arguments, 0)) });
    v.Filter.register("boxBlur", function() {
        return this.processKernel("Box Blur", [1, 1, 1, 1, 1, 1, 1, 1, 1]) });
    v.Filter.register("heavyRadialBlur", function() {
        return this.processKernel("Heavy Radial Blur", [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]) });
    v.Filter.register("gaussianBlur", function() {
        return this.processKernel("Gaussian Blur", [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]) });
    v.Filter.register("motionBlur", function(F) {
        var G;
        if (F === 0 || F === 180) { G = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] } else {
            if ((F > 0 && F < 90) || (F > 180 && F < 270)) { G = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0] } else {
                if (F === 90 || F === 270) { G = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } else { G = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1] } } }
        return this.processKernel("Motion Blur", G) });
    v.Filter.register("sharpen", function(F) {
        if (F == null) { F = 100 }
        F /= 100;
        return this.processKernel("Sharpen", [0, -F, 0, -F, 4 * F + 1, -F, 0, -F, 0]) });
    j = { brightness: function(F, H, G) { F.r = F.r - (F.r * H * G.strength);
            F.g = F.g - (F.g * H * G.strength);
            F.b = F.b - (F.b * H * G.strength);
            return F }, gamma: function(F, H, G) { F.r = Math.pow(F.r / 255, Math.max(10 * H * G.strength, 1)) * 255;
            F.g = Math.pow(F.g / 255, Math.max(10 * H * G.strength, 1)) * 255;
            F.b = Math.pow(F.b / 255, Math.max(10 * H * G.strength, 1)) * 255;
            return F }, colorize: function(F, H, G) { F.r -= (F.r - G.color.r) * H;
            F.g -= (F.g - G.color.g) * H;
            F.b -= (F.b - G.color.b) * H;
            return F } };
    B.register("vignette", function(H, J) {
        var I, F, G, K;
        if (J == null) { J = 60 }
        if (typeof H === "string" && H.substr(-1) === "%") {
            if (this.dimensions.height > this.dimensions.width) { H = this.dimensions.width * (parseInt(H.substr(0, H.length - 1), 10) / 100) } else { H = this.dimensions.height * (parseInt(H.substr(0, H.length - 1), 10) / 100) } }
        J /= 100;
        F = [this.dimensions.width / 2, this.dimensions.height / 2];
        K = Math.sqrt(Math.pow(F[0], 2) + Math.pow(F[1], 2));
        G = K - H;
        I = n.bezier([0, 1], [30, 30], [70, 60], [100, 80]);
        return this.process("vignette", function(L) {
            var N, O, M;
            M = L.locationXY();
            N = n.distance(M.x, M.y, F[0], F[1]);
            if (N > G) { O = Math.max(1, (I[Math.round(((N - G) / H) * 100)] / 10) * J);
                L.r = Math.pow(L.r / 255, O) * 255;
                L.g = Math.pow(L.g / 255, O) * 255;
                L.b = Math.pow(L.b / 255, O) * 255 }
            return L }) });
    B.register("rectangularVignette", function(I) {
        var M, L, H, G, K, F, J;
        M = { strength: 50, cornerRadius: 0, method: "brightness", color: { r: 0, g: 0, b: 0 } };
        I = i.extend(M, I);
        if (!I.size) {
            return this } else {
            if (typeof I.size === "string") { H = parseInt(I.size, 10) / 100;
                I.size = { width: this.dimensions.width * H, height: this.dimensions.height * H } } else {
                if (typeof I.size === "object") { J = ["width", "height"];
                    for (K = 0, F = J.length; K < F; K++) { L = J[K];
                        if (typeof I.size[L] === "string") { I.size[L] = this.dimensions[L] * (parseInt(I.size[L], 10) / 100) } } } else {
                    if (I.size === "number") { G = I.size;
                        I.size = { width: G, height: G } } } } }
        if (typeof I.cornerRadius === "string") { I.cornerRadius = (I.size.width / 2) * (parseInt(I.cornerRadius, 10) / 100) }
        I.strength /= 100;
        I.size.width = Math.floor(I.size.width);
        I.size.height = Math.floor(I.size.height);
        I.image = { width: this.dimensions.width, height: this.dimensions.height };
        if (I.method === "colorize" && typeof I.color === "string") { I.color = A.hexToRGB(I.color) }
        I.coords = { left: (this.dimensions.width - I.size.width) / 2, right: this.dimensions.width - I.coords.left, bottom: (this.dimensions.height - I.size.height) / 2, top: this.dimensions.height - I.coords.bottom };
        I.corners = [{ x: I.coords.left + I.cornerRadius, y: I.coords.top - I.cornerRadius }, { x: I.coords.right - I.cornerRadius, y: I.coords.top - I.cornerRadius }, { x: I.coords.right - I.cornerRadius, y: I.coords.bottom + I.cornerRadius }, { x: I.coords.left + I.cornerRadius, y: I.coords.bottom + I.cornerRadius }];
        I.maxDist = n.distance(0, 0, I.corners[3].x, I.corners[3].y) - I.cornerRadius;
        return this.process("rectangularVignette", function(N) {
            var Q, P, O;
            P = N.locationXY();
            if ((P.x > I.corners[0].x && P.x < I.corners[1].x) && (P.y > I.coords.bottom && P.y < I.coords.top)) {
                return N }
            if ((P.x > I.coords.left && P.x < I.coords.right) && (P.y > I.corners[3].y && P.y < I.corners[2].y)) {
                return N }
            if (P.x > I.corners[0].x && P.x < I.corners[1].x && P.y > I.coords.top) { Q = (P.y - I.coords.top) / I.maxDist } else {
                if (P.y > I.corners[2].y && P.y < I.corners[1].y && P.x > I.coords.right) { Q = (P.x - I.coords.right) / I.maxDist } else {
                    if (P.x > I.corners[0].x && P.x < I.corners[1].x && P.y < I.coords.bottom) { Q = (I.coords.bottom - P.y) / I.maxDist } else {
                        if (P.y > I.corners[2].y && P.y < I.corners[1].y && P.x < I.coords.left) { Q = (I.coords.left - P.x) / I.maxDist } else {
                            if (P.x <= I.corners[0].x && P.y >= I.corners[0].y) { O = v.distance(P.x, P.y, I.corners[0].x, I.corners[0].y);
                                Q = (O - I.cornerRadius) / I.maxDist } else {
                                if (P.x >= I.corners[1].x && P.y >= I.corners[1].y) { O = v.distance(P.x, P.y, I.corners[1].x, I.corners[1].y);
                                    Q = (O - I.cornerRadius) / I.maxDist } else {
                                    if (P.x >= I.corners[2].x && P.y <= I.corners[2].y) { O = v.distance(P.x, P.y, I.corners[2].x, I.corners[2].y);
                                        Q = (O - I.cornerRadius) / I.maxDist } else {
                                        if (P.x <= I.corners[3].x && P.y <= I.corners[3].y) { O = v.distance(P.x, P.y, I.corners[3].x, I.corners[3].y);
                                            Q = (O - I.cornerRadius) / I.maxDist } } } } } } } }
            if (Q < 0) {
                return N }
            return j[I.method](N, Q, I) }) });
    (function() {
        var I, H, F, G, J;
        G = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
        J = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
        H = function(N, X, S, R, Q, P, W) {
            var O, M, V, L, K, U, T;
            O = typeof exports !== "undefined" && exports !== null ? new r() : document.createElement("canvas");
            O.width = N;
            O.height = X;
            L = S + Math.cos(Q) * P * 0.5;
            U = R + Math.sin(Q) * P * 0.5;
            K = S - Math.cos(Q) * P * 0.5;
            T = R - Math.sin(Q) * P * 0.5;
            M = O.getContext("2d");
            V = M.createLinearGradient(L, U, K, T);
            if (!W) { V.addColorStop(0, "white");
                V.addColorStop(1, "black") } else { V.addColorStop(0, "white");
                V.addColorStop(0.5, "black");
                V.addColorStop(1, "white") }
            M.fillStyle = V;
            M.fillRect(0, 0, N, X);
            return M.getImageData(0, 0, N, X) };
        F = function(K, S, O, N, R, Q) {
            var M, L, P;
            M = typeof exports !== "undefined" && exports !== null ? new r() : document.createElement("canvas");
            M.width = K;
            M.height = S;
            L = M.getContext("2d");
            P = L.createRadialGradient(O, N, R, O, N, Q);
            P.addColorStop(1, "white");
            P.addColorStop(0, "black");
            L.fillStyle = P;
            L.fillRect(0, 0, K, S);
            return L.getImageData(0, 0, K, S) };
        I = function() { this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            return this.next = null };
        v.Plugin.register("compoundBlur", function(aH, aB, av, at) {
            var ab, ah, ak, aO, P, aT, az, al, S, M, aF, aS, N, aU, aA, aq, L, aj, ag, aI, af, ac, T, W, ao, Z, R, ad, V, an, Q, ai, U, aR, ar, am, au, aD, ap, O, ay, K, Y, ax, aw, ae, aa, X, aQ, aP, aN, aM, aL, aK, aJ, aG, aE, aC;
            K = this.dimensions.width;
            M = this.dimensions.height;
            aA = this.pixelData;
            ad = aH.data;
            O = K * M;
            ay = O << 2;
            T = [];
            for (aS = aQ = 0; 0 <= ay ? aQ < ay : aQ > ay; aS = 0 <= ay ? ++aQ : --aQ) { T[aS] = aA[aS] }
            P = 0;
            au = at;
            at -= 1;
            while (au-- >= 0) { L = (aB + 0.5) | 0;
                if (L === 0) {
                    continue }
                if (L > 256) { L = 256 }
                aT = L + L + 1;
                ap = K << 2;
                Y = K - 1;
                aF = M - 1;
                V = L + 1;
                aD = V * (V + 1) / 2;
                am = new I();
                U = void 0;
                ai = am;
                for (aS = aP = 1; 1 <= aT ? aP < aT : aP > aT; aS = 1 <= aT ? ++aP : --aP) { ai = ai.next = new I();
                    if (aS === V) { U = ai } }
                ai.next = am;
                aR = null;
                ar = null;
                X = ae = 0;
                ag = G[L];
                Q = J[L];
                for (aw = aN = 0; 0 <= M ? aN < M : aN > M; aw = 0 <= M ? ++aN : --aN) { ao = az = ab = R = S = ak = 0;
                    Z = V * (W = T[ae]);
                    al = V * (ac = T[ae + 1]);
                    ah = V * (af = T[ae + 2]);
                    R += aD * W;
                    S += aD * ac;
                    ak += aD * af;
                    ai = am;
                    for (aS = aM = 0; 0 <= V ? aM < V : aM > V; aS = 0 <= V ? ++aM : --aM) { ai.r = W;
                        ai.g = ac;
                        ai.b = af;
                        ai = ai.next }
                    for (aS = aL = 1; 1 <= V ? aL < V : aL > V; aS = 1 <= V ? ++aL : --aL) { aI = ae + ((Y < aS ? Y : aS) << 2);
                        R += (ai.r = (W = T[aI])) * (an = V - aS);
                        S += (ai.g = (ac = T[aI + 1])) * an;
                        ak += (ai.b = (af = T[aI + 2])) * an;
                        ao += W;
                        az += ac;
                        ab += af;
                        ai = ai.next }
                    aR = am;
                    ar = U;
                    for (ax = aK = 0; 0 <= K ? aK < K : aK > K; ax = 0 <= K ? ++aK : --aK) { T[ae] = (R * ag) >> Q;
                        T[ae + 1] = (S * ag) >> Q;
                        T[ae + 2] = (ak * ag) >> Q;
                        R -= Z;
                        S -= al;
                        ak -= ah;
                        Z -= aR.r;
                        al -= aR.g;
                        ah -= aR.b;
                        aI = (X + ((aI = ax + V) < Y ? aI : Y)) << 2;
                        ao += (aR.r = T[aI]);
                        az += (aR.g = T[aI + 1]);
                        ab += (aR.b = T[aI + 2]);
                        R += ao;
                        S += az;
                        ak += ab;
                        aR = aR.next;
                        Z += (W = ar.r);
                        al += (ac = ar.g);
                        ah += (af = ar.b);
                        ao -= W;
                        az -= ac;
                        ab -= af;
                        ar = ar.next;
                        ae += 4 }
                    X += K }
                for (ax = aJ = 0; 0 <= K ? aJ < K : aJ > K; ax = 0 <= K ? ++aJ : --aJ) { az = ab = ao = S = ak = R = 0;
                    ae = ax << 2;
                    Z = V * (W = T[ae]);
                    al = V * (ac = T[ae + 1]);
                    ah = V * (af = T[ae + 2]);
                    R += aD * W;
                    S += aD * ac;
                    ak += aD * af;
                    ai = am;
                    for (aS = aG = 0; 0 <= V ? aG < V : aG > V; aS = 0 <= V ? ++aG : --aG) { ai.r = W;
                        ai.g = ac;
                        ai.b = af;
                        ai = ai.next }
                    aa = K;
                    for (aS = aE = 1; 1 <= V ? aE < V : aE > V; aS = 1 <= V ? ++aE : --aE) { ae = (aa + ax) << 2;
                        R += (ai.r = (W = T[ae])) * (an = V - aS);
                        S += (ai.g = (ac = T[ae + 1])) * an;
                        ak += (ai.b = (af = T[ae + 2])) * an;
                        ao += W;
                        az += ac;
                        ab += af;
                        ai = ai.next;
                        if (aS < aF) { aa += K } }
                    ae = ax;
                    aR = am;
                    ar = U;
                    for (aw = aC = 0; 0 <= M ? aC < M : aC > M; aw = 0 <= M ? ++aC : --aC) { aI = ae << 2;
                        T[aI] = (R * ag) >> Q;
                        T[aI + 1] = (S * ag) >> Q;
                        T[aI + 2] = (ak * ag) >> Q;
                        R -= Z;
                        S -= al;
                        ak -= ah;
                        Z -= aR.r;
                        al -= aR.g;
                        ah -= aR.b;
                        aI = (ax + (((aI = aw + V) < aF ? aI : aF) * K)) << 2;
                        R += (ao += (aR.r = T[aI]));
                        S += (az += (aR.g = T[aI + 1]));
                        ak += (ab += (aR.b = T[aI + 2]));
                        aR = aR.next;
                        Z += (W = ar.r);
                        al += (ac = ar.g);
                        ah += (af = ar.b);
                        ao -= W;
                        az -= ac;
                        ab -= af;
                        ar = ar.next;
                        ae += K } }
                aB *= av;
                aS = O;
                while (--aS > -1) { aU = aS << 2;
                    aj = (ad[aU + 2] & 255) / 255 * at;
                    aq = aj | 0;
                    if (aq === P) { aO = 256 * (aj - (aj | 0));
                        N = 256 - aO;
                        aA[aU] = (aA[aU] * N + T[aU] * aO) >> 8;
                        aA[aU + 1] = (aA[aU + 1] * N + T[aU + 1] * aO) >> 8;
                        aA[aU + 2] = (aA[aU + 2] * N + T[aU + 2] * aO) >> 8 } else {
                        if (aq === P + 1) { aA[aU] = T[aU];
                            aA[aU + 1] = T[aU + 1];
                            aA[aU + 2] = T[aU + 2] } } }
                P++ }
            return this });
        v.Filter.register("tiltShift", function(K) {
            var M, L;
            M = { center: { x: this.dimensions.width / 2, y: this.dimensions.height / 2 }, angle: 45, focusWidth: 200, startRadius: 3, radiusFactor: 1.5, steps: 3 };
            K = i.extend(M, K);
            K.angle *= Math.PI / 180;
            L = H(this.dimensions.width, this.dimensions.height, K.center.x, K.center.y, K.angle, K.focusWidth, true);
            return this.processPlugin("compoundBlur", [L, K.startRadius, K.radiusFactor, K.steps]) });
        return v.Filter.register("radialBlur", function(M) {
            var O, N, L, K;
            O = { size: 50, center: { x: this.dimensions.width / 2, y: this.dimensions.height / 2 }, startRadius: 3, radiusFactor: 1.5, steps: 3, radius: null };
            M = i.extend(O, M);
            if (!M.radius) { M.radius = this.dimensions.width < this.dimensions.height ? this.dimensions.height : this.dimensions.width }
            L = (M.radius / 2) - M.size;
            K = M.radius / 2;
            N = F(this.dimensions.width, this.dimensions.height, M.center.x, M.center.y, L, K);
            return this.processPlugin("compoundBlur", [N, M.startRadius, M.radiusFactor, M.steps]) }) })();
    v.Filter.register("edgeEnhance", function() {
        return this.processKernel("Edge Enhance", [0, 0, 0, -1, 1, 0, 0, 0, 0]) });
    v.Filter.register("edgeDetect", function() {
        return this.processKernel("Edge Detect", [-1, -1, -1, -1, 8, -1, -1, -1, -1]) });
    v.Filter.register("emboss", function() {
        return this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]) });
    v.Filter.register("posterize", function(H) {
        var F, G;
        F = 256 / H;
        G = 255 / (H - 1);
        return this.process("posterize", function(I) { I.r = Math.floor(Math.floor(I.r / F) * G);
            I.g = Math.floor(Math.floor(I.g / F) * G);
            I.b = Math.floor(Math.floor(I.b / F) * G);
            return I }) });
    v.Filter.register("vintage", function(F) {
        if (F == null) { F = true }
        this.greyscale();
        this.contrast(5);
        this.noise(3);
        this.sepia(100);
        this.channels({ red: 8, blue: 2, green: 4 });
        this.gamma(0.87);
        if (F) {
            return this.vignette("40%", 30) } });
    v.Filter.register("lomo", function(F) {
        if (F == null) { F = true }
        this.brightness(15);
        this.exposure(15);
        this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
        this.saturation(-20);
        this.gamma(1.8);
        if (F) { this.vignette("50%", 60) }
        return this.brightness(5) });
    v.Filter.register("clarity", function(F) {
        if (F == null) { F = false }
        this.vibrance(20);
        this.curves("rgb", [5, 0], [130, 150], [190, 220], [250, 255]);
        this.sharpen(15);
        this.vignette("45%", 20);
        if (F) { this.greyscale();
            this.contrast(4) }
        return this });
    v.Filter.register("sinCity", function() { this.contrast(100);
        this.brightness(15);
        this.exposure(10);
        this.posterize(80);
        this.clip(30);
        return this.greyscale() });
    v.Filter.register("sunrise", function() { this.exposure(3.5);
        this.saturation(-5);
        this.vibrance(50);
        this.sepia(60);
        this.colorize("#e87b22", 10);
        this.channels({ red: 8, blue: 8 });
        this.contrast(5);
        this.gamma(1.2);
        return this.vignette("55%", 25) });
    v.Filter.register("crossProcess", function() { this.exposure(5);
        this.colorize("#e87b22", 4);
        this.sepia(20);
        this.channels({ blue: 8, red: 3 });
        this.curves("b", [0, 0], [100, 150], [180, 180], [255, 255]);
        this.contrast(15);
        this.vibrance(75);
        return this.gamma(1.6) });
    v.Filter.register("orangePeel", function() { this.curves("rgb", [0, 0], [100, 50], [140, 200], [255, 255]);
        this.vibrance(-30);
        this.saturation(-30);
        this.colorize("#ff9000", 30);
        this.contrast(-5);
        return this.gamma(1.4) });
    v.Filter.register("love", function() { this.brightness(5);
        this.exposure(8);
        this.contrast(4);
        this.colorize("#c42007", 30);
        this.vibrance(50);
        return this.gamma(1.3) });
    v.Filter.register("grungy", function() { this.gamma(1.5);
        this.clip(25);
        this.saturation(-60);
        this.contrast(5);
        this.noise(5);
        return this.vignette("50%", 30) });
    v.Filter.register("jarques", function() { this.saturation(-35);
        this.curves("b", [20, 0], [90, 120], [186, 144], [255, 230]);
        this.curves("r", [0, 0], [144, 90], [138, 120], [255, 255]);
        this.curves("g", [10, 0], [115, 105], [148, 100], [255, 248]);
        this.curves("rgb", [0, 0], [120, 100], [128, 140], [255, 255]);
        return this.sharpen(20) });
    v.Filter.register("pinhole", function() { this.greyscale();
        this.sepia(10);
        this.exposure(10);
        this.contrast(15);
        return this.vignette("60%", 35) });
    v.Filter.register("oldBoot", function() { this.saturation(-20);
        this.vibrance(-50);
        this.gamma(1.1);
        this.sepia(30);
        this.channels({ red: -10, blue: 5 });
        this.curves("rgb", [0, 0], [80, 50], [128, 230], [255, 255]);
        return this.vignette("60%", 30) });
    v.Filter.register("glowingSun", function(F) {
        if (F == null) { F = true }
        this.brightness(10);
        this.newLayer(function() { this.setBlendingMode("multiply");
            this.opacity(80);
            this.copyParent();
            this.filter.gamma(0.8);
            this.filter.contrast(50);
            return this.filter.exposure(10) });
        this.newLayer(function() { this.setBlendingMode("softLight");
            this.opacity(80);
            return this.fillColor("#f49600") });
        this.exposure(20);
        this.gamma(0.8);
        if (F) {
            return this.vignette("45%", 20) } });
    v.Filter.register("hazyDays", function() { this.gamma(1.2);
        this.newLayer(function() { this.setBlendingMode("overlay");
            this.opacity(60);
            this.copyParent();
            this.filter.channels({ red: 5 });
            return this.filter.stackBlur(15) });
        this.newLayer(function() { this.setBlendingMode("addition");
            this.opacity(40);
            return this.fillColor("#6899ba") });
        this.newLayer(function() { this.setBlendingMode("multiply");
            this.opacity(35);
            this.copyParent();
            this.filter.brightness(40);
            this.filter.vibrance(40);
            this.filter.exposure(30);
            this.filter.contrast(15);
            this.filter.curves("r", [0, 40], [128, 128], [128, 128], [255, 215]);
            this.filter.curves("g", [0, 40], [128, 128], [128, 128], [255, 215]);
            this.filter.curves("b", [0, 40], [128, 128], [128, 128], [255, 215]);
            return this.filter.stackBlur(5) });
        this.curves("r", [20, 0], [128, 158], [128, 128], [235, 255]);
        this.curves("g", [20, 0], [128, 128], [128, 128], [235, 255]);
        this.curves("b", [20, 0], [128, 108], [128, 128], [235, 255]);
        return this.vignette("45%", 20) });
    v.Filter.register("herMajesty", function() { this.brightness(40);
        this.colorize("#ea1c5d", 10);
        this.curves("b", [0, 10], [128, 180], [190, 190], [255, 255]);
        this.newLayer(function() { this.setBlendingMode("overlay");
            this.opacity(50);
            this.copyParent();
            this.filter.gamma(0.7);
            return this.newLayer(function() { this.setBlendingMode("normal");
                this.opacity(60);
                return this.fillColor("#ea1c5d") }) });
        this.newLayer(function() { this.setBlendingMode("multiply");
            this.opacity(60);
            this.copyParent();
            this.filter.saturation(50);
            this.filter.hue(90);
            return this.filter.contrast(10) });
        this.gamma(1.4);
        this.vibrance(-30);
        this.newLayer(function() { this.opacity(10);
            return this.fillColor("#e5f0ff") });
        return this });
    v.Filter.register("nostalgia", function() { this.saturation(20);
        this.gamma(1.4);
        this.greyscale();
        this.contrast(5);
        this.sepia(100);
        this.channels({ red: 8, blue: 2, green: 4 });
        this.gamma(0.8);
        this.contrast(5);
        this.exposure(10);
        this.newLayer(function() { this.setBlendingMode("overlay");
            this.copyParent();
            this.opacity(55);
            return this.filter.stackBlur(10) });
        return this.vignette("50%", 30) });
    v.Filter.register("hemingway", function() { this.greyscale();
        this.contrast(10);
        this.gamma(0.9);
        this.newLayer(function() { this.setBlendingMode("multiply");
            this.opacity(40);
            this.copyParent();
            this.filter.exposure(15);
            this.filter.contrast(15);
            return this.filter.channels({ green: 10, red: 5 }) });
        this.sepia(30);
        this.curves("rgb", [0, 10], [120, 90], [180, 200], [235, 255]);
        this.channels({ red: 5, green: -2 });
        return this.exposure(15) });
    v.Filter.register("concentrate", function() { this.sharpen(40);
        this.saturation(-50);
        this.channels({ red: 3 });
        this.newLayer(function() { this.setBlendingMode("multiply");
            this.opacity(80);
            this.copyParent();
            this.filter.sharpen(5);
            this.filter.contrast(50);
            this.filter.exposure(10);
            return this.filter.channels({ blue: 5 }) });
        return this.brightness(10) });
    v.Plugin.register("rotate", function(H) {
        var I, G, N, L, M, F, K, J;
        I = H % 360;
        if (I === 0) {
            return this.dimensions = { width: this.canvas.width, height: this.canvas.height } }
        M = Math.PI / 180;
        if (typeof exports !== "undefined" && exports !== null) { G = new r() } else { G = document.createElement("canvas");
            i.copyAttributes(this.canvas, G) }
        if (I === 90 || I === -270 || I === 270 || I === -90) { F = this.canvas.height;
            L = this.canvas.width;
            K = F / 2;
            J = L / 2 } else {
            if (I === 180) { F = this.canvas.width;
                L = this.canvas.height;
                K = F / 2;
                J = L / 2 } else { F = Math.sqrt(Math.pow(this.originalWidth, 2) + Math.pow(this.originalHeight, 2));
                L = F;
                K = this.canvas.height / 2;
                J = this.canvas.width / 2 } }
        G.width = F;
        G.height = L;
        N = G.getContext("2d");
        N.save();
        N.translate(K, J);
        N.rotate(I * M);
        N.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);
        N.restore();
        return this.replaceCanvas(G) });
    v.Filter.register("rotate", function() {
        return this.processPlugin("rotate", Array.prototype.slice.call(arguments, 0)) });
    (function() {
        var G, F, H;
        F = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
        H = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
        G = function() { this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            return this.next = null };
        v.Plugin.register("stackBlur", function(am) {
            var V, aa, ac, aC, al, ad, M, J, ap, aA, Z, ar, Y, W, N, Q, ag, S, L, O, af, K, ab, P, aB, ai, ae, an, ah, I, T, ak, aj, X, U, R, az, ay, ax, aw, av, au, at, aq, ao;
            if (isNaN(am) || am < 1) {
                return }
            am |= 0;
            N = this.pixelData;
            I = this.dimensions.width;
            J = this.dimensions.height;
            aC = am + am + 1;
            ah = I << 2;
            T = I - 1;
            ap = J - 1;
            O = am + 1;
            an = O * (O + 1) / 2;
            ae = new G();
            ab = ae;
            for (aA = az = 1; 1 <= aC ? az < aC : az > aC; aA = 1 <= aC ? ++az : --az) { ab = ab.next = new G();
                if (aA === O) { P = ab } }
            ab.next = ae;
            aB = null;
            ai = null;
            R = X = 0;
            Z = F[am];
            K = H[am];
            for (aj = ay = 0; 0 <= J ? ay < J : ay > J; aj = 0 <= J ? ++ay : --ay) { ag = al = V = L = M = ac = 0;
                S = O * (Q = N[X]);
                ad = O * (W = N[X + 1]);
                aa = O * (Y = N[X + 2]);
                L += an * Q;
                M += an * W;
                ac += an * Y;
                ab = ae;
                for (aA = ax = 0; 0 <= O ? ax < O : ax > O; aA = 0 <= O ? ++ax : --ax) { ab.r = Q;
                    ab.g = W;
                    ab.b = Y;
                    ab = ab.next }
                for (aA = aw = 1; 1 <= O ? aw < O : aw > O; aA = 1 <= O ? ++aw : --aw) { ar = X + ((T < aA ? T : aA) << 2);
                    L += (ab.r = (Q = N[ar])) * (af = O - aA);
                    M += (ab.g = (W = N[ar + 1])) * af;
                    ac += (ab.b = (Y = N[ar + 2])) * af;
                    ag += Q;
                    al += W;
                    V += Y;
                    ab = ab.next }
                aB = ae;
                ai = P;
                for (ak = av = 0; 0 <= I ? av < I : av > I; ak = 0 <= I ? ++av : --av) { N[X] = (L * Z) >> K;
                    N[X + 1] = (M * Z) >> K;
                    N[X + 2] = (ac * Z) >> K;
                    L -= S;
                    M -= ad;
                    ac -= aa;
                    S -= aB.r;
                    ad -= aB.g;
                    aa -= aB.b;
                    ar = (R + ((ar = ak + am + 1) < T ? ar : T)) << 2;
                    ag += (aB.r = N[ar]);
                    al += (aB.g = N[ar + 1]);
                    V += (aB.b = N[ar + 2]);
                    L += ag;
                    M += al;
                    ac += V;
                    aB = aB.next;
                    S += (Q = ai.r);
                    ad += (W = ai.g);
                    aa += (Y = ai.b);
                    ag -= Q;
                    al -= W;
                    V -= Y;
                    ai = ai.next;
                    X += 4 }
                R += I }
            for (ak = au = 0; 0 <= I ? au < I : au > I; ak = 0 <= I ? ++au : --au) { al = V = ag = M = ac = L = 0;
                X = ak << 2;
                S = O * (Q = N[X]);
                ad = O * (W = N[X + 1]);
                aa = O * (Y = N[X + 2]);
                L += an * Q;
                M += an * W;
                ac += an * Y;
                ab = ae;
                for (aA = at = 0; 0 <= O ? at < O : at > O; aA = 0 <= O ? ++at : --at) { ab.r = Q;
                    ab.g = W;
                    ab.b = Y;
                    ab = ab.next }
                U = I;
                for (aA = aq = 1; 1 <= am ? aq <= am : aq >= am; aA = 1 <= am ? ++aq : --aq) { X = (U + ak) << 2;
                    L += (ab.r = (Q = N[X])) * (af = O - aA);
                    M += (ab.g = (W = N[X + 1])) * af;
                    ac += (ab.b = (Y = N[X + 2])) * af;
                    ag += Q;
                    al += W;
                    V += Y;
                    ab = ab.next;
                    if (aA < ap) { U += I } }
                X = ak;
                aB = ae;
                ai = P;
                for (aj = ao = 0; 0 <= J ? ao < J : ao > J; aj = 0 <= J ? ++ao : --ao) { ar = X << 2;
                    N[ar] = (L * Z) >> K;
                    N[ar + 1] = (M * Z) >> K;
                    N[ar + 2] = (ac * Z) >> K;
                    L -= S;
                    M -= ad;
                    ac -= aa;
                    S -= aB.r;
                    ad -= aB.g;
                    aa -= aB.b;
                    ar = (ak + (((ar = aj + O) < ap ? ar : ap) * I)) << 2;
                    L += (ag += (aB.r = N[ar]));
                    M += (al += (aB.g = N[ar + 1]));
                    ac += (V += (aB.b = N[ar + 2]));
                    aB = aB.next;
                    S += (Q = ai.r);
                    ad += (W = ai.g);
                    aa += (Y = ai.b);
                    ag -= Q;
                    al -= W;
                    V -= Y;
                    ai = ai.next;
                    X += I } }
            return this });
        return v.Filter.register("stackBlur", function(I) {
            return this.processPlugin("stackBlur", [I]) }) })();
    v.Filter.register("threshold", function(F) {
        return this.process("threshold", function(H) {
            var G;
            G = (0.2126 * H.r) + (0.7152 * H.g) + (0.0722 * H.b);
            if (G < F) { H.r = 0;
                H.g = 0;
                H.b = 0 } else { H.r = 255;
                H.g = 255;
                H.b = 255 }
            return H }) }) }).call(this);
(function() {
    var f, c, e, b, d, i, a, h, g = {}.hasOwnProperty;
    c = null;
    i = null;
    b = {};
    f = false;
    e = false;
    a = _.throttle(function() {
        var j, k;
        if (f) { e = true;
            return } else { e = false }
        f = true;
        c.revert(false);
        for (j in b) {
            if (!g.call(b, j)) {
                continue }
            k = b[j];
            k = parseFloat(k, 10);
            if (k === 0) {
                continue }
            c[j](k) }
        return c.render(function() { f = false;
            if (e) {
                return a() } }) }, 300);
    d = false;
    h = function(k) {
        var l, j;
        if (d) {
            return }
        $("#PresetFilters a").removeClass("Active");
        l = $("#PresetFilters a[data-preset='" + k + "']");
        j = l.html();
        l.addClass("Active").html("Rendering...");
        d = true;
        i.revert(false);
        i[k]();
        return i.render(function() { l.html(j);
            return d = false }) };
    $(document).ready(function() {
        if (!($("#example").length > 0)) {
            return }
        c = Caman("#example");
        i = Caman("#canvasToThumb");
        $(".FilterSetting input").each(function() {
            var j;
            j = $(this).data("filter");
            return b[j] = $(this).val() });
        $("#Filters").on("change", ".FilterSetting input", function() {
            var j, k;
            j = $(this).data("filter");
            k = $(this).val();
            b[j] = k;
            $(this).find("~ .FilterValue").html(k);
            return a() });
        return $("#PresetFilters").on("click", "a", function() {
            return h($(this).data("preset")) }) }) }).call(this);
(function() {
    var a;
    a = function(d) {
        var b, c, e;
        e = d.attr("id");
        d.attr("id", "");
        c = $("<div>").css({ position: "absolute", visibility: "hidden", top: $(document).scrollTop() + "px" }).attr("id", e).appendTo(document.body);
        document.location.hash = "#" + e;
        c.remove();
        d.attr("id", e);
        b = $("#GuideSections li > a").filter("[href=#" + (d.attr("id")) + "]");
        b.parents("ul").find(".Active").removeClass("Active");
        return b.parents("li").addClass("Active") };
    $(document).ready(function() {
        var b;
        $("#GuideSections").on("click", "a", function() {
            var c, d;
            c = $($(this).attr("href"));
            d = Math.max(0, c.position().top - 129);
            document.location.hash = $(this).attr("href");
            setTimeout(function() {
                return $("body").scrollTop(d) }, 50);
            return false });
        b = _.map($("#GuideSections li > a"), function(c) {
            return $($(c).attr("href")) });
        b = b.reverse();
        return $(document).on("scroll", _.throttle(function() {
            var e, f, d, c;
            f = $(document).scrollTop();
            for (d = 0, c = b.length; d < c; d++) { e = b[d];
                if (f >= e.position().top - 130) { a(e);
                    return } } }, 200)) }) }).call(this);