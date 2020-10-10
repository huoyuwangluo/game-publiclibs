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
    var ModelShiLiTa = (function (_super) {
        __extends(ModelShiLiTa, _super);
        function ModelShiLiTa() {
            var _this = _super.call(this) || this;
            _this._currIndex = 0;
            return _this;
        }
        ModelShiLiTa.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.requestShiLiTaInfo();
            this._currIndex = 0;
            this._currStep = [];
        };
        Object.defineProperty(ModelShiLiTa.prototype, "currStep", {
            get: function () {
                return this._currStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShiLiTa.prototype, "currIndex", {
            get: function () {
                return this._currIndex;
            },
            set: function (v) {
                this._currIndex = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShiLiTa.prototype, "monsterData", {
            get: function () {
                return this._monsterData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShiLiTa.prototype, "nowPlayerData", {
            get: function () {
                return this._nowPlayerData;
            },
            enumerable: true,
            configurable: true
        });
        ModelShiLiTa.prototype.getCopyMaxPassUp = function (type, maxPassStep) {
            if (maxPassStep < 5)
                return GameModels.copyBoss.getVOByStep(type, 5);
            var curNum = maxPassStep % 5;
            var maxPassUpStep = maxPassStep + (5 - curNum);
            var copyVoUp = GameModels.copyBoss.getVOByStep(type, maxPassUpStep);
            if (copyVoUp)
                return copyVoUp;
            var copyVoPass = GameModels.copyBoss.getVOByStep(type, maxPassStep);
            if (copyVoPass)
                return copyVoPass;
            return null;
        };
        ModelShiLiTa.prototype.requestShiLiTaInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShiLiTa_GetInfo);
            this.request(n.MessageMap.C2G_SHILITA_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._currStep = data.CurrStepList.concat();
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelShiLiTa.prototype.requestShiLiTaChapterInfo = function (chapterId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShiLiTa_GetChapterInfo);
            msg.ChapterId = chapterId;
            this.request(n.MessageMap.C2G_SHILITA_GETCHAPTERINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._nowPlayerData) {
                    n.MessagePool.to(_this._nowPlayerData);
                    _this._nowPlayerData = null;
                }
                _this._nowPlayerData = data;
                _this._nowPlayerData.autoRecover = false;
                _this._monsterData = _this._nowPlayerData.EnemyInfo;
                if (complete)
                    complete.runWith(data);
            }));
        };
        return ModelShiLiTa;
    }(mo.ModelBase));
    mo.ModelShiLiTa = ModelShiLiTa;
    __reflect(ModelShiLiTa.prototype, "mo.ModelShiLiTa");
})(mo || (mo = {}));
