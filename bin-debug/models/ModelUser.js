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
    var ModelUser = (function (_super) {
        __extends(ModelUser, _super);
        function ModelUser() {
            return _super.call(this) || this;
        }
        ModelUser.prototype.initializeData = function (data) {
            this._playerVO = new vo.GamePlayerVO();
            // this._playerVO.onPropertyChange(TypeProperty.FightValue, this, function (smartVO: vo.GamePlayerVO, propertyId: number): void {
            // 	// FightTip.instance.updateFight(smartVO.getProperty(propertyId));
            // 	this.refreshTotalForce();
            // });
            this._playerVO.initialize(data.CharInfo);
            this._playerVO.autoRecover = false;
            this.addSourceTips();
            this.onRoute(n.MessageMap.G2C_CHARACTERPROPERTYUPDATE, utils.Handler.create(this._playerVO, this._playerVO.nCharacterPropertyUpdate, null, false));
            this.onRoute(n.MessageMap.G2C_NAMEUPDATE_NOTIFY_SUCCESS, utils.Handler.create(this._playerVO, this._playerVO.nPlayerNameUpdate, null, false));
            // this.onRoute(n.MessageMap.G2C_PROTODEITYBODYSUIT_NOTIFY, utils.Handler.create(this._playerVO, this._playerVO.nPlayerTalentAdd, null, false));
            //this.onRoute(n.MessageMap.G2C_UPDATETALENTLIST_NOTIFY, utils.Handler.create(this._playerVO, this._playerVO.nPlayerUpdateTalentList, null, false));
        };
        ModelUser.prototype.addSourceTips = function () {
            this._souceValue = {};
            this.setSourceTip(TypeProperty.Gold, Language.C_HD + Language.C_JB + " : ");
            this.setSourceTip(TypeProperty.UnbindedGold, Language.C_HD + Language.C_MS + " : ");
            this.setSourceTip(TypeProperty.Exp, Language.C_HD + Language.C_JY + " : ");
            this.setSourceTip(TypeProperty.LIANGCAO, Language.C_HD + Language.C_LC + " : ");
            this.setSourceTip(TypeProperty.HonorId, Language.C_HD + Language.C_GX + " : ");
            this.setSourceTip(TypeProperty.UnionGongXian, Language.C_HD + Language.C_JTGX + " : ");
            this.setSourceTip(TypeProperty.ZHANSHEN_COIN, Language.C_HD + Language.C_ZSB + " : ");
            this.setSourceTip(TypeProperty.GODBONE_JADE, Language.C_HD + Language.C_YSJH + " : ");
            this.setSourceTip(TypeProperty.LIFESOUL_EXP, Language.C_HD + Language.C_MHJY + " : ");
            this.setSourceTip(TypeProperty.LIFESOUL_HALIDOM_ELITE, Language.C_HD + Language.C_SWJH + " : ");
            this.setSourceTip(TypeProperty.GODHOOD_EXP, Language.C_HD + Language.C_SGJY + " : ");
        };
        ModelUser.prototype.setSourceTip = function (type, tips) {
            this._souceValue[type] = this._playerVO.getProperty(type);
            GameModels.user.player.onPropertyChange(type, this, function (smartVO, propertyId) {
                var curValue = smartVO.getProperty(propertyId);
                var value = this._souceValue[type];
                // if (curValue > value) {
                // 	mg.alertManager.sourceTip(tips + (curValue - value), 0xae8538);
                // }
                this._souceValue[type] = curValue;
            });
        };
        Object.defineProperty(ModelUser.prototype, "player", {
            get: function () {
                return this._playerVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelUser.prototype, "lastDeadTime", {
            /**最后死亡时间 */
            get: function () {
                return this._playerVO.lastDeadTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelUser.prototype, "myConfigLevel", {
            get: function () {
                return this._playerVO.level; //convert.getConfigLevel(this._playerVO.zhuanShenLevel, this._playerVO.level);
            },
            enumerable: true,
            configurable: true
        });
        return ModelUser;
    }(mo.ModelBase));
    mo.ModelUser = ModelUser;
    __reflect(ModelUser.prototype, "mo.ModelUser");
})(mo || (mo = {}));
