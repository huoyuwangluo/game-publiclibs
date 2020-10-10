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
    var LadderRewardsVO = (function (_super) {
        __extends(LadderRewardsVO, _super);
        function LadderRewardsVO() {
            return _super.call(this) || this;
        }
        LadderRewardsVO.prototype.initialize = function (id, isGet, isUpGrade) {
            if (isGet === void 0) { isGet = false; }
            if (isUpGrade === void 0) { isUpGrade = false; }
            this._isGet = isGet;
            this._isUpGrade = isUpGrade;
            this._template = Templates.getTemplateById(templates.Map.LADDER, id);
            return this;
        };
        LadderRewardsVO.prototype.reset = function () {
            this._isGet = false;
            this._isUpGrade = false;
            this._template = null;
        };
        Object.defineProperty(LadderRewardsVO.prototype, "isGet", {
            get: function () {
                return this._isGet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRewardsVO.prototype, "isUpGrade", {
            get: function () {
                return this._isUpGrade;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRewardsVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        return LadderRewardsVO;
    }(vo.VOBase));
    vo.LadderRewardsVO = LadderRewardsVO;
    __reflect(LadderRewardsVO.prototype, "vo.LadderRewardsVO");
})(vo || (vo = {}));
