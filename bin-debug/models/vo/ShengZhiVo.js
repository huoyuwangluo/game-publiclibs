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
    var ShengZhiVo = (function (_super) {
        __extends(ShengZhiVo, _super);
        function ShengZhiVo() {
            return _super.call(this) || this;
        }
        ShengZhiVo.prototype.initialize = function () {
        };
        ShengZhiVo.prototype.reset = function () {
            this._shengZhiInfo = null;
            this._taskId = "";
            this._taskRefId = 0;
            this._unionList = [];
            this._status = 0;
            this._leftTime = 0;
            this._petList = [];
        };
        ShengZhiVo.prototype.decode = function (data) {
            data.autoRecover = false;
            this._shengZhiInfo = data;
            this._taskId = data.TaskId;
            this._taskRefId = data.TaskRefId;
            this._unionList = data.UnionCond;
            this._status = data.Status;
            this._leftTime = data.LeftTime;
            this._petList = data.PetList;
            if (data.Status == 1) {
                this._older = 2;
            }
            else if (data.Status == 2) {
                this._older = 1;
            }
            else if (data.Status = 3) {
                this._older = 3;
            }
            this._shengZhiTemp = Templates.getTemplateById(templates.Map.SHENGZHIREWARD, this._taskRefId);
            if (this._shengZhiTemp) {
                this._shengZhiSetting = Templates.getTemplateByProperty(templates.Map.SHENGZHISETTING, "quality", this._shengZhiTemp.quality);
            }
        };
        Object.defineProperty(ShengZhiVo.prototype, "taskId", {
            get: function () {
                return this._taskId;
            },
            set: function (v) {
                this._taskId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "taskRefId", {
            get: function () {
                return this._taskRefId;
            },
            set: function (v) {
                this._taskRefId = v;
                this._shengZhiTemp = null;
                this._shengZhiTemp = Templates.getTemplateById(templates.Map.SHENGZHIREWARD, this._taskRefId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "unionList", {
            get: function () {
                return this._unionList;
            },
            set: function (v) {
                this._unionList = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "status", {
            get: function () {
                return this._status;
            },
            set: function (v) {
                this._status = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            set: function (v) {
                this._leftTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "petList", {
            get: function () {
                return this._petList;
            },
            set: function (v) {
                this._petList = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "older", {
            get: function () {
                return this._older;
            },
            set: function (v) {
                if (v == 1) {
                    this._older = 2;
                }
                else if (v == 2) {
                    this._older = 1;
                }
                else if (v = 3) {
                    this._older = 3;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "star", {
            get: function () {
                return this._shengZhiTemp.star == 4 ? 3 : this._shengZhiTemp.star;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "shengZhiTemp", {
            get: function () {
                return this._shengZhiTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShengZhiVo.prototype, "shengZhiSetting", {
            get: function () {
                return this._shengZhiSetting;
            },
            enumerable: true,
            configurable: true
        });
        return ShengZhiVo;
    }(vo.VOBase));
    vo.ShengZhiVo = ShengZhiVo;
    __reflect(ShengZhiVo.prototype, "vo.ShengZhiVo");
})(vo || (vo = {}));
