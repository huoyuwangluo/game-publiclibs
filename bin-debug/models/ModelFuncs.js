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
var mo;
(function (mo) {
    var ModelFuncs = (function (_super) {
        __extends(ModelFuncs, _super);
        function ModelFuncs() {
            return _super.call(this) || this;
        }
        ModelFuncs.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._funPreview = [];
            if (!this._idlib) {
                var list = Templates.getList(templates.Map.GAMEFUNCTIONS);
                this._idlib = {};
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var template = list_1[_i];
                    var funcVO = new FuncVO(template);
                    this._idlib[template.id] = funcVO;
                    if (funcVO.herald > 0) {
                        this._funPreview.push(funcVO);
                    }
                }
            }
        };
        ModelFuncs.prototype.getConfig = function (funcId) {
            return this._idlib[funcId];
        };
        ModelFuncs.prototype.getConfigOpenLv = function (funcId) {
            return this._idlib[funcId].openLv;
        };
        /**
        * 2007 红颜银两升级开放
        */
        ModelFuncs.prototype.hashFunIsOpen = function (funcId) {
            var vo = this.getConfig(funcId);
            if (GameModels.user.player.level < vo.openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay < vo.openDay)) {
                return false;
            }
            return true;
        };
        Object.defineProperty(ModelFuncs.prototype, "funPreview", {
            get: function () {
                this._funPreview.sort(function (a, b) {
                    return a.herald - b.herald;
                });
                return this._funPreview;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFuncs.prototype, "currFunPreview", {
            get: function () {
                var voArr = this.funPreview;
                for (var i = 0; i < voArr.length; i++) {
                    if (GameModels.user.player.level < voArr[i].openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay < voArr[i].openDay)) {
                        return voArr[i];
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return ModelFuncs;
    }(mo.ModelBase));
    mo.ModelFuncs = ModelFuncs;
    __reflect(ModelFuncs.prototype, "mo.ModelFuncs");
    var FuncVO = (function () {
        function FuncVO(template) {
            this._template = template;
        }
        Object.defineProperty(FuncVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "openLv", {
            get: function () {
                return this._template.openLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "tempName", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "openDay", {
            get: function () {
                return this._template.openDay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "openDay2", {
            get: function () {
                return this._template.openDay2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "link", {
            get: function () {
                return this._template.link;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncVO.prototype, "herald", {
            get: function () {
                return this._template.herald;
            },
            enumerable: true,
            configurable: true
        });
        return FuncVO;
    }());
    mo.FuncVO = FuncVO;
    __reflect(FuncVO.prototype, "mo.FuncVO");
})(mo || (mo = {}));
