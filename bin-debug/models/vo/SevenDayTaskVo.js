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
    var SevenDayTaskVo = (function (_super) {
        __extends(SevenDayTaskVo, _super);
        function SevenDayTaskVo() {
            return _super.call(this) || this;
        }
        SevenDayTaskVo.prototype.initialize = function () {
            this._cfgId = 0;
            this._template = null;
            this._parm1 = 0;
            this._parm2 = 0;
            this._status = 0;
            this._older = 0;
        };
        SevenDayTaskVo.prototype.reset = function () {
            this._cfgId = 0;
            this._template = null;
            this._parm1 = 0;
            this._parm2 = 0;
            this._status = 0;
            this._older = 0;
        };
        SevenDayTaskVo.prototype.decode = function (data) {
            this._cfgId = data.CfgId;
            this._template = Templates.getTemplateById(templates.Map.SEVENDAYTARGET, this._cfgId);
            this._parm1 = data.Param1;
            this._parm2 = data.Param2;
            this._status = data.Status;
            if (this._status == 2) {
                this._older = 999;
            }
            else if (this._status == 1) {
                this._older = 0;
            }
            else {
                this._older = this._template.order;
            }
        };
        Object.defineProperty(SevenDayTaskVo.prototype, "id", {
            get: function () {
                return this._cfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "older", {
            get: function () {
                return this._older;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "parm1", {
            get: function () {
                return this._parm1;
            },
            set: function (v) {
                this._parm1 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "parm2", {
            get: function () {
                return this._parm2;
            },
            set: function (v) {
                this._parm2 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "status", {
            get: function () {
                return this._status;
            },
            set: function (v) {
                this._status = v;
                if (this._status == 2) {
                    this._older = 999;
                }
                else if (this._status == 1) {
                    this._older = 0;
                }
                else {
                    this._older = this._template.order;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "parm1Target", {
            get: function () {
                return this._template.params1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "parm2Target", {
            get: function () {
                return this._template.params2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "type", {
            get: function () {
                return this._template.tabId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayTaskVo.prototype, "tasktype", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        return SevenDayTaskVo;
    }(vo.VOBase));
    vo.SevenDayTaskVo = SevenDayTaskVo;
    __reflect(SevenDayTaskVo.prototype, "vo.SevenDayTaskVo");
})(vo || (vo = {}));
