var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var vo;
(function (vo) {
    var BuffVO = (function (_super) {
        __extends(BuffVO, _super);
        function BuffVO() {
            return _super.call(this) || this;
        }
        BuffVO.prototype.initialize = function (caster, body, data) {
            this._caster = caster;
            this._body = body;
            if (data instanceof templates.skillBuffNew) {
                this._template = data;
            }
            else if ((typeof data) == "number") {
                this._template = Templates.getTemplateById(templates.Map.SKILLBUFFNEW, data);
            }
        };
        BuffVO.prototype.reset = function () {
            this.stopInterval();
            this.stopDelay();
            this.offComplete();
            this._template = null;
        };
        BuffVO.prototype.onComplete = function (caller, method, args) {
            if (args === void 0) { args = null; }
            this.offComplete();
            this._complete = utils.Handler.create(caller, method, args, false);
        };
        BuffVO.prototype.offComplete = function () {
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
        };
        BuffVO.prototype.start = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        BuffVO.prototype.end = function () {
            this.stopInterval();
            this.stopDelay();
            if (this._complete) {
                this._complete.runWith(this);
            }
        };
        BuffVO.prototype.startDelay = function (time) {
            if (!time)
                return;
            utils.timer.once(time, this, this.end);
        };
        BuffVO.prototype.stopDelay = function () {
            utils.timer.clear(this, this.end);
        };
        BuffVO.prototype.startInterval = function () {
            utils.timer.loop(900, this, this.intervalHandler);
        };
        BuffVO.prototype.stopInterval = function () {
            utils.timer.clear(this, this.intervalHandler);
        };
        BuffVO.prototype.intervalHandler = function () { };
        Object.defineProperty(BuffVO.prototype, "type", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffVO.prototype, "continueTime", {
            get: function () {
                return this._template.Time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffVO.prototype, "propervalue", {
            get: function () {
                return this._template.effectNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        return BuffVO;
    }(vo.VOBase));
    vo.BuffVO = BuffVO;
    __reflect(BuffVO.prototype, "vo.BuffVO");
})(vo || (vo = {}));
