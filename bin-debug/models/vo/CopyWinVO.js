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
    var CopyWinVO = (function (_super) {
        __extends(CopyWinVO, _super);
        function CopyWinVO() {
            var _this = _super.call(this) || this;
            _this.star = 0;
            _this.dropItems = null;
            _this.killTotalCount = 0;
            _this.property = null;
            // public exp: string = null;
            _this.gold = null;
            _this.ranking = 0;
            _this.endParam = "";
            _this.playerLevel = 0;
            _this.petDebris = null;
            _this.selfEndVo = null;
            _this.otherEndVo = null;
            _this.isFive = null;
            _this.copyVo = null;
            return _this;
        }
        CopyWinVO.prototype.initialize = function (caller, method) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            this.caller = caller;
            this.method = method;
        };
        CopyWinVO.prototype.call = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.method) {
                (_a = this.method).call.apply(_a, [this.caller].concat(args));
            }
            var _a;
        };
        CopyWinVO.prototype.reset = function () {
            this.copyVo = null;
            this.isFive = null;
            this.type = 0;
            this.caller = null;
            this.method = null;
            this.star = 0;
            this.dropItems = null;
            this.killTotalCount = 0;
            this.property = null;
            // this.exp=null;
            this.gold = null;
            this.endParam = "";
            this.playerLevel = 0;
            this.petDebris = null;
            this.selfEndVo = null;
            this.otherEndVo = null;
        };
        return CopyWinVO;
    }(vo.VOBase));
    vo.CopyWinVO = CopyWinVO;
    __reflect(CopyWinVO.prototype, "vo.CopyWinVO");
})(vo || (vo = {}));
