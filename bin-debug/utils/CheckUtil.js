var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /** 检测工具类里所有方法都带有一定的判断检测操作 函数名相当于checkAnd{setLabelMoney}*/
    var CheckUtil = (function () {
        function CheckUtil() {
        }
        /** 检测货币是否满足*/
        CheckUtil.setLabelByMoney = function (moneyId, needMoney, targetLabel, isRatio) {
            if (isRatio === void 0) { isRatio = false; }
            var myMoney = GameModels.user.player.getProperty(moneyId) || 0;
            var flag = myMoney >= needMoney;
            if (targetLabel) {
                targetLabel.text = (!isRatio ? "" : myMoney + "/") + needMoney;
                targetLabel.textColor = flag ? TypeColor.GREEN1 : TypeColor.RED1;
            }
            return flag;
        };
        /** 检测物品是否满足*/
        CheckUtil.setLabelByItemCount = function (itemId, needCount, targetLabel, isRatio) {
            if (isRatio === void 0) { isRatio = false; }
            var myCount = GameModels.bag.getItemCountById(itemId);
            var flag = myCount >= needCount;
            if (targetLabel) {
                if (needCount <= 0) {
                    targetLabel.text = "";
                }
                else {
                    targetLabel.text = (!isRatio ? "" : myCount + "/") + needCount;
                }
                targetLabel.textColor = flag ? TypeColor.GREEN1 : TypeColor.RED1;
            }
            return flag;
        };
        /** 检测等级满足条件*/
        CheckUtil.setLabelByLevel = function (step, level, needLevel, targetLabel) {
            var myLevel = convert.getFormulaLevel(step, level);
            var flag = myLevel >= needLevel;
            if (targetLabel) {
                targetLabel.text = convert.getLevelName(needLevel);
                targetLabel.textColor = flag ? TypeColor.GREEN1 : TypeColor.RED1;
            }
            return flag;
        };
        CheckUtil.setLabelByMyLevel = function (needLevel, targetLabel) {
            return CheckUtil.setLabelByLevel(GameModels.user.player.zhuanShenLevel, GameModels.user.player.level, needLevel, targetLabel);
        };
        CheckUtil.checkUseByType = function (mainType, type) {
            return mainType == TypeItem.TREASURE || mainType == TypeItem.DEBRIS ||
                type == TypeItem.FASHION_CLOATHING || type == TypeItem.SHENMOJINANG;
        };
        // /** 检测合成满足条件*/
        // public static checkCompound(item: vo.ItemVO): boolean {
        // 	if (item) {
        // 		var isHeChengType:boolean = item.type==mo.ModelBag.BAG_SHENGQI1||item.type==mo.ModelBag.BAG_SHENGQI2||item.type==mo.ModelBag.BAG_SHENGQI3||item.type==mo.ModelBag.BAG_ZHANQI
        // 		if (isHeChengType&&item.count >= parseInt(item.templateProp.combine.split("_")[1])) {
        // 			return true;
        // 		}
        // 	}
        // 	return false;
        // }
        CheckUtil.checkDiamonds = function (value, isOpenRecharge) {
            if (isOpenRecharge === void 0) { isOpenRecharge = false; }
            var flag = GameModels.user.player.diamonds >= value;
            if (!flag && isOpenRecharge) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_BZCZ, TypeBtnLabel.RECHARGE, null, utils.Handler.create(this, function () {
                    GameModels.recharge.openRechargeDialog();
                }));
            }
            return flag;
        };
        /**是否充值过*/
        CheckUtil.checkRecharge = function () {
            return GameModels.user.player.getProperty(TypeProperty.TOTAL_RECHARGE) > 0;
        };
        CheckUtil.checkOpenFunction = function () {
            mg.alertManager.tip(Language.J_GNZWKQ, 0xff0000);
            return false;
        };
        CheckUtil.smeltingEqiup = function () {
            var voArr = GameModels.bag.isCanHuiShouequips;
            var tempArr = [];
            for (var i = 0; i < voArr.length; i++) {
                tempArr.push(voArr[i].index);
            }
            if (tempArr.length <= 0) {
                return;
            }
            var fromPoint = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
            GameModels.equip.requesHuiShouNewEquips(TypeSplit.HUISHOU, tempArr, utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.J_HSCG);
                var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                mg.effectManager.flyEffects("6160", 10, fromPoint, moneyPoint, mg.layerManager.top);
                var flyItem = new s.FlyIconsEffect();
                flyItem.initializeConfigStr("210401", fromPoint, mg.layerManager.top);
            }));
        };
        CheckUtil.checkBagSmelting = function () {
            var flag = GameModels.bag.checkOpenSmelting();
            if (flag) {
                if (GameModels.user.player.vip >= 4) {
                    mg.alertManager.showAlert(PromptAlert, true, true, Language.J_BZRLKSHS, TypeBtnLabel.GOTO_MELT1, null, utils.Handler.create(this, this.smeltingEqiup));
                }
                else {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_BZRL, TypeBtnLabel.GOTO_MELT, null, utils.Handler.create(this, function () {
                        mg.uiManager.show(dialog.bag.BagRecycleDialog);
                    }));
                }
            }
            return flag;
        };
        /**检查府邸格子 */
        CheckUtil.checkPetSmelting = function () {
            var flag = GameModels.pet.checkPetSmelting();
            if (flag) {
                mg.alertManager.showAlert(dialog.list.PetListHome, true, true);
            }
            return flag;
        };
        /**检查这个武将是否已足够合成 */
        CheckUtil.checkPetCanCompound = function (copyVo) {
            // let flag: boolean = GameModels.copyBoss.checkPetCommpound(copyVo);
            // if (flag) {
            // 	if (TypeCheck.getCheckType(TypeCheck.PETCOMMEND)) {
            // 		if (GameModels.common.isSelected) {
            // 			return false;
            // 		} else {
            // 			var okHandler: utils.Handler = utils.Handler.create(this, () => {
            // 				mg.uiManager.removeAllDialogs();
            // 				mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 2 });
            // 			})
            // 			if (okHandler) okHandler.once = true;
            // 			if (okHandler) {
            // 				okHandler.run();
            // 				okHandler = null;
            // 			}
            // 		}
            // 	} else {
            // 		mg.alertManager.showCheckAlert(Language.getExpression(Language.E_BZRL, copyVo.bossName), TypeBtnLabel.OK, TypeCheck.PETCOMMEND, null, utils.Handler.create(this, () => {
            // 			mg.uiManager.removeAllDialogs();
            // 			mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 2 });
            // 		}));
            // 	}
            // }
            // return flag;
            return false;
        };
        return CheckUtil;
    }());
    utils.CheckUtil = CheckUtil;
    __reflect(CheckUtil.prototype, "utils.CheckUtil");
})(utils || (utils = {}));
