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
    var ModelOneCountRedPoint = (function (_super) {
        __extends(ModelOneCountRedPoint, _super);
        function ModelOneCountRedPoint() {
            return _super.call(this) || this;
        }
        ModelOneCountRedPoint.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._isOpenGongXunView = [false, false, false];
            this._isOpenVipBuyView = false;
            this._isOpenTeamView = false;
            this._isOpenWeekCardView = false;
            this._isOpenChangeViewView = false;
            this._isOpenWushenView = false;
            this._isOpenShilianView = false;
        };
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenWushenView", {
            /**是否打开武神塔界面 */
            get: function () {
                return this._isOpenWushenView;
            },
            set: function (value) {
                this._isOpenWushenView = value;
                GameModels.state.updateState(GameRedState.EXPLORE_PETPAGODA);
                GameModels.state.updateState(GameRedState.CITY);
            },
            enumerable: true,
            configurable: true
        });
        ModelOneCountRedPoint.prototype.checkWushenViewRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 1)) {
                if (!this._isOpenWushenView)
                    return true;
            }
            return false;
        };
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenShilianView", {
            /**是否打开试炼塔界面 */
            get: function () {
                return this._isOpenShilianView;
            },
            set: function (value) {
                this._isOpenShilianView = value;
                GameModels.state.updateState(GameRedState.EXPLORE_SUOYAOPAGODA);
                GameModels.state.updateState(GameRedState.CITY);
            },
            enumerable: true,
            configurable: true
        });
        ModelOneCountRedPoint.prototype.checkShilianViewRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 2)) {
                if (!this._isOpenShilianView)
                    return true;
            }
            return false;
        };
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenWuHunView", {
            /**是否打开武魂塔界面 */
            get: function () {
                return this._isOpenWuHunView;
            },
            set: function (value) {
                this._isOpenWuHunView = value;
                GameModels.state.updateState(GameRedState.EXPLORE_WUHUNPAGODA);
                GameModels.state.updateState(GameRedState.CITY);
            },
            enumerable: true,
            configurable: true
        });
        ModelOneCountRedPoint.prototype.checkWuHunViewRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 0)) {
                if (!this._isOpenWuHunView)
                    return true;
            }
            return false;
        };
        /**是否打开过 0功勋商城 1观星商城 2名将商城 */
        ModelOneCountRedPoint.prototype.getOpenGongXunView = function (index) {
            if (index === void 0) { index = 0; }
            return this._isOpenGongXunView[index];
        };
        ModelOneCountRedPoint.prototype.setOpenGongXunView = function (value, index) {
            if (index === void 0) { index = 0; }
            this._isOpenGongXunView[index] = value;
            GameModels.state.updateState(GameRedState.SHENMI_SHOP);
            GameModels.state.updateState(GameRedState.GUANXING_SHOP);
            GameModels.state.updateState(GameRedState.MINGJIANG_SHOP);
        };
        ModelOneCountRedPoint.prototype.checkGongXunRedPoint = function (index) {
            if (index === void 0) { index = 0; }
            if (index == 0) {
                if (!this._isOpenGongXunView[index])
                    return true;
            }
            else if (index == 1) {
                if (!this._isOpenGongXunView[index] && GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN) >= 20)
                    return true;
            }
            else {
                if (!this._isOpenGongXunView[index] && GameModels.bag.getItemCountById(ConfigData.MINGJIANG_ITEM) >= 40)
                    return true;
            }
            return false;
        };
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenVipBuyView", {
            /**是否打开过vip限购商城 */
            get: function () {
                return this._isOpenVipBuyView;
            },
            set: function (value) {
                this._isOpenVipBuyView = value;
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenTeamView", {
            /**是否打开材料组队界面 */
            get: function () {
                return this._isOpenTeamView;
            },
            set: function (value) {
                this._isOpenTeamView = value;
                // GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZUDUI_FUBEN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenWeekCardView", {
            /**是否打开周卡界面 */
            get: function () {
                return this._isOpenWeekCardView;
            },
            set: function (value) {
                this._isOpenWeekCardView = value;
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_ZHOUKA);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelOneCountRedPoint.prototype, "isOpenChangeViewView", {
            /**是否打开更换头像界面 */
            get: function () {
                return this._isOpenChangeViewView;
            },
            set: function (value) {
                this._isOpenChangeViewView = value;
                GameModels.state.updateState(GameRedState.MAIN_SET_HEAD);
            },
            enumerable: true,
            configurable: true
        });
        ModelOneCountRedPoint.prototype.checkSetViewRedPoint = function () {
            // if (!this._isOpenChangeViewView) {
            // 	if (GameModels.pet && GameModels.pet.isFirst > 0) {
            // 		return true;
            // 	}
            // }
            return false;
        };
        return ModelOneCountRedPoint;
    }(mo.ModelBase));
    mo.ModelOneCountRedPoint = ModelOneCountRedPoint;
    __reflect(ModelOneCountRedPoint.prototype, "mo.ModelOneCountRedPoint");
})(mo || (mo = {}));
