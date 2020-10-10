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
    var CropsVo = (function (_super) {
        __extends(CropsVo, _super);
        function CropsVo() {
            return _super.call(this) || this;
        }
        CropsVo.prototype.initialize = function () {
            this._type = 0;
            this._level = 0;
            this._corpsTemp = null;
            this._cropsInfo = null;
        };
        CropsVo.prototype.reset = function () {
            this._type = 0;
            this._level = 0;
            this._corpsTemp = null;
            if (this._cropsInfo) {
                this._cropsInfo.reset();
                n.MessagePool.to(this._cropsInfo);
                this._cropsInfo = null;
            }
        };
        CropsVo.prototype.decode = function (data) {
            this._cropsInfo = data;
            this._type = data.CorpsType;
            this._level = data.Level;
            this._corpsTemp = Templates.getTemplateByTwoProperty(templates.Map.CORPSLV, "corps", this._type, "lv", this._level);
        };
        Object.defineProperty(CropsVo.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (v) {
                this._type = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CropsVo.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (v) {
                this._level = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CropsVo.prototype, "cropsTemp", {
            get: function () {
                return this._corpsTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CropsVo.prototype, "hashNext", {
            get: function () {
                return this._corpsTemp.nextId != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CropsVo.prototype, "nextCropsTemp", {
            get: function () {
                return Templates.getTemplateById(templates.Map.CORPSLV, this._corpsTemp.nextId);
            },
            enumerable: true,
            configurable: true
        });
        return CropsVo;
    }(vo.VOBase));
    vo.CropsVo = CropsVo;
    __reflect(CropsVo.prototype, "vo.CropsVo");
})(vo || (vo = {}));
