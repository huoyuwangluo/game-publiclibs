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
    var GamePetPosVO = (function (_super) {
        __extends(GamePetPosVO, _super);
        function GamePetPosVO() {
            var _this = _super.call(this) || this;
            _this._fightValue = 0;
            _this._mergeCd = 0;
            _this._serverData = {};
            return _this;
        }
        GamePetPosVO.prototype.initialize = function (data) {
            if (data === void 0) { data = null; }
            this._fightValue = 0;
            if (data)
                this.decodeProto(data);
        };
        GamePetPosVO.prototype.reset = function () {
            this._isMerged = false;
            this._fightValue = 0;
            this._position = 0;
            this._uid = "";
            this._mergeCd = 0;
            this._lock = -1;
            this._serverData = {};
        };
        GamePetPosVO.prototype.resetMergeState = function () {
            this._isMerged = false;
        };
        Object.defineProperty(GamePetPosVO.prototype, "property", {
            /**更新pos属性 */
            set: function (value) {
                this._serverData = value;
            },
            enumerable: true,
            configurable: true
        });
        /**更新pos属性 */
        GamePetPosVO.prototype.updatePropertyByType = function (type, value) {
            this._serverData[type] = value;
        };
        /**更新pos属性 */
        GamePetPosVO.prototype.updateProperty = function (proto) {
            this._serverData[proto.Type] = proto.Value;
        };
        /**获取pos属性 */
        GamePetPosVO.prototype.getProperty = function (type) {
            return this._serverData[type] ? this._serverData[type] : 0;
        };
        Object.defineProperty(GamePetPosVO.prototype, "serverDate", {
            /**获取属性 */
            get: function () {
                return this._serverData;
            },
            enumerable: true,
            configurable: true
        });
        /**更新pos属性列表 */
        GamePetPosVO.prototype.updataPropertyList = function (data, FightValue) {
            if (FightValue)
                this._fightValue = FightValue;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var property = data_1[_i];
                this.updateProperty(property);
            }
        };
        GamePetPosVO.prototype.decodeProto = function (data) {
            this._position = data.PosId;
            this._uid = data.CurPetId;
            this._lock = data.IsLock;
            this._isMerged = false; //data.IsHeTi == 1;
        };
        GamePetPosVO.prototype.decodeRobot = function (pos, uid) {
            this._position = pos;
            this._uid = uid;
            this._isMerged = false;
        };
        GamePetPosVO.prototype.updateMergedState = function (v) {
            this._isMerged = v;
            this._mergeCd = egret.getTimer();
        };
        Object.defineProperty(GamePetPosVO.prototype, "isMerged", {
            get: function () {
                return this._isMerged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "isMergeCding", {
            get: function () {
                return (egret.getTimer() - this._mergeCd) < 5000;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "mergeCd", {
            get: function () {
                return this._mergeCd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "position", {
            /**位置信息 */
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "petId", {
            get: function () {
                return this._uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "fightpower", {
            get: function () {
                return this._fightValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "lock", {
            get: function () {
                return this._lock;
            },
            set: function (value) {
                if (this._lock != value)
                    this._lock = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "hpMax", {
            // public get petLvTemplates(): templates.generalLv {
            // 	return this._petLvTemplates;
            // }
            /**血量上限 */
            get: function () {
                return this.getProperty(TypeProperty.MaxHp);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "healHP", {
            /**生命回复 */
            get: function () {
                return 0; //this.getProperty(TypeProperty.HealHP);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "attack", {
            /**攻击 */
            get: function () {
                return this.getProperty(TypeProperty.PAtk);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "pDef", {
            /**物防 */
            get: function () {
                return this.getProperty(TypeProperty.PDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "mDef", {
            /**法防 */
            get: function () {
                return 0; //this.getProperty(TypeProperty.MDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ignorePDef", {
            /**物防穿透 */
            get: function () {
                return this.getProperty(TypeProperty.IgnorePDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ignoreMDef", {
            /**法防穿透 */
            get: function () {
                return 0; //this.getProperty(TypeProperty.IgnoreMDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "crit", {
            /**暴击 */
            get: function () {
                return this.getProperty(TypeProperty.Crit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "critInjure", {
            /**暴击伤害 */
            get: function () {
                return this.getProperty(TypeProperty.CritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ignoreCrit", {
            /**抗暴 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCrit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ignoreCritInjure", {
            /**暴击抵抗 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "hit", {
            /**命中 */
            get: function () {
                return this.getProperty(TypeProperty.Hit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "dodge", {
            /**闪避 */
            get: function () {
                return this.getProperty(TypeProperty.Dodge);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "injureAdd", {
            /**伤害加深 */
            get: function () {
                return this.getProperty(TypeProperty.InjureAdd);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "injureIgnore", {
            /**伤害减免 */
            get: function () {
                return this.getProperty(TypeProperty.InjureIgnore);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "heal", {
            /**治疗 */
            get: function () {
                return this.getProperty(TypeProperty.Heal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "beHeal", {
            /**受疗 */
            get: function () {
                return this.getProperty(TypeProperty.BeHeal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ctrl", {
            /**控制 */
            get: function () {
                return this.getProperty(TypeProperty.Ctrl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetPosVO.prototype, "ignoreCtrl", {
            /**抗控 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCtrl);
            },
            enumerable: true,
            configurable: true
        });
        return GamePetPosVO;
    }(vo.VOBase));
    vo.GamePetPosVO = GamePetPosVO;
    __reflect(GamePetPosVO.prototype, "vo.GamePetPosVO");
})(vo || (vo = {}));
