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
    var ModelRecharge = (function (_super) {
        __extends(ModelRecharge, _super);
        // private _rechargeMoJingData: Array<vo.RechargeVO>;
        function ModelRecharge() {
            return _super.call(this) || this;
        }
        ModelRecharge.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rechargeData = [];
            // this._rechargeMoJingData = [];
            var items = Templates.getTemplatesByProperty(templates.Map.GAMERECHARGE, "type", 3);
            for (var i = 0; i < items.length; i++) {
                this._rechargeData[i] = vo.fromPool(vo.RechargeVO, items[i], false);
            }
            // let items1: Array<templates.gameRecharge> = Templates.getTemplatesByProperty(templates.Map.GAMERECHARGE, "type", 10);
            // for (let i: number = 0; i < items1.length; i++) {
            // 	this._rechargeMoJingData[i] = vo.fromPool(vo.RechargeVO, items1[i], false) as vo.RechargeVO;
            // }
            this._beforeReCharge = GameModels.user.player.getProperty(TypeProperty.TOTAL_RECHARGE) || 0;
        };
        ModelRecharge.prototype.requestRechargeData = function (callback) {
            n.net.request(n.MessageMap.C2G_RECHARGE_INFO, n.MessagePool.from(n.C2G_Recharge_Info), utils.Handler.create(this, function (data) {
                for (var i = 0; i < data.RechargeId.length; i++) {
                    for (var _i = 0, _a = this._rechargeData; _i < _a.length; _i++) {
                        var d = _a[_i];
                        if (d.template.id == data.RechargeId[i]) {
                            d.buyState = true;
                        }
                    }
                    // for (let d1 of this._rechargeMoJingData) {
                    // 	if (d1.template.id == data.RechargeId[i]) {
                    // 		d1.buyState = true;
                    // 	}
                    // }
                }
                if (callback) {
                    callback.run();
                }
            }));
        };
        Object.defineProperty(ModelRecharge.prototype, "rechargeData", {
            // public get rechargeMoJingData(): Array<vo.RechargeVO> {
            // 	return this._rechargeMoJingData;
            // }
            get: function () {
                if (GameModels.user.player.getProperty(TypeProperty.VIP_EXP) < 200000) {
                    var arrTemp = [];
                    for (var i = 0; i < this._rechargeData.length; i++) {
                        if (this._rechargeData[i].template.RMB <= 2000) {
                            arrTemp.push(this._rechargeData[i]);
                        }
                    }
                    return arrTemp;
                }
                return this._rechargeData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRecharge.prototype, "beforeReCharge", {
            get: function () {
                return this._beforeReCharge;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRecharge.prototype, "totalRecharge", {
            get: function () {
                return this._totalRecharge;
            },
            enumerable: true,
            configurable: true
        });
        /**打开充值面板同一接口*/
        ModelRecharge.prototype.openRechargeDialog = function () {
            /**黄纪珊 */
            if (!GameModels.platform.isPay) {
                mg.uiManager.show(MallScene);
                return;
            }
            if (GameModels.user.player.totalRecharge > 0) {
                mg.uiManager.show(MallScene);
            }
            else {
                mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
            }
            // var voMRCZ: vo.SgActivityListVO = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
            // if (!voMRCZ || (voMRCZ && voMRCZ.hashYYQGAndMRCZReceive)) {
            // 	mg.uiManager.show(MallScene);
            // }
            // else {
            // 	mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
            // }
        };
        return ModelRecharge;
    }(mo.ModelBase));
    mo.ModelRecharge = ModelRecharge;
    __reflect(ModelRecharge.prototype, "mo.ModelRecharge");
})(mo || (mo = {}));
