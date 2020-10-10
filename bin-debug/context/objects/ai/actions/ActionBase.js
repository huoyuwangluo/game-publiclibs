var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var ActionBase = (function () {
        function ActionBase(name) {
            this._name = name;
        }
        Object.defineProperty(ActionBase.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActionBase.prototype, "runing", {
            get: function () {
                return this._runing;
            },
            enumerable: true,
            configurable: true
        });
        ActionBase.prototype.initialize = function (body) {
            this._body = body;
            this._runing = false;
        };
        ActionBase.prototype.reset = function () {
            this._runing = false;
            this.offComplete();
        };
        ActionBase.prototype.onCompleteOnce = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            this.offComplete();
            this._complete = utils.Handler.create(caller, method, args, once);
        };
        ActionBase.prototype.offComplete = function () {
            var that = this;
            if (that._complete) {
                that._complete.recover();
                that._complete = null;
            }
        };
        ActionBase.prototype.callComplete = function () {
            var that = this;
            if (that._complete) {
                var handler = that._complete;
                if (handler.once) {
                    that._complete = null;
                }
                handler.run();
            }
        };
        ActionBase.prototype.start = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._runing = true;
            return this;
        };
        ActionBase.prototype.end = function () {
            var that = this;
            that._runing = false;
            this.callComplete();
        };
        ActionBase.prototype.updateRender = function (timeStamp) {
            return true;
        };
        return ActionBase;
    }());
    s.ActionBase = ActionBase;
    __reflect(ActionBase.prototype, "s.ActionBase");
})(s || (s = {}));
