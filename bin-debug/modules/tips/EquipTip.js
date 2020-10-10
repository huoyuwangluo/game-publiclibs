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
var tips;
(function (tips) {
    var EquipTip = (function (_super) {
        __extends(EquipTip, _super);
        function EquipTip() {
            var _this = _super.call(this) || this;
            _this._starEffectList = [_this._starEffect1, _this._starEffect2, _this._starEffect3, _this._starEffect4, _this._starEffect5, _this._starEffect6, _this._starEffect7, _this._starEffect8, _this._starEffect9, _this._starEffect10];
            return _this;
        }
        Object.defineProperty(EquipTip.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._fight = 0;
                //logger.log("EquipTip", data);
                this.labPropertys.textFlow = null;
                this.btnLock.visible = false;
                if (data instanceof templates.equip) {
                    this.setInfo(data);
                }
                else if (data instanceof vo.EquipOtherPlayerVO) {
                    this.setOtherPlayerInfo(data);
                }
                else if (data instanceof vo.EquipVO) {
                    this.setInfo(data.templateEquip);
                    var equipVO = this._data;
                    if (equipVO.inBag && equipVO.type == TypeEquip.JICHU_EQIUP && equipVO.quality == 4) {
                        this.btnLock.visible = true;
                        this.btnLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLockClick, this);
                        if (equipVO.isLock == 1) {
                            this.btnLock.label = Language.C_JS;
                            this.btnLock.skinName = "skins.SnapBigButton1Skin";
                        }
                        else {
                            this.btnLock.label = Language.C_SD1;
                            this.btnLock.skinName = "skins.SnapBigButton2Skin";
                        }
                    }
                }
                else {
                    this.setInfo(data.templateEquip);
                }
            },
            enumerable: true,
            configurable: true
        });
        EquipTip.prototype.btnLockClick = function () {
            var _this = this;
            if (this._data instanceof vo.EquipVO) {
                var equipVO = this._data;
                if (equipVO.inBag && equipVO.type == TypeEquip.JICHU_EQIUP && equipVO.quality == 4) {
                    GameModels.equip.requesSetLockNewEquips(equipVO.isLock == 0 ? 1 : 0, equipVO.index, utils.Handler.create(this, function (data) {
                        if (data.IsLock == 1) {
                            _this.btnLock.label = Language.C_JS;
                            _this.btnLock.skinName = "skins.SnapBigButton1Skin";
                        }
                        else {
                            _this.btnLock.label = Language.C_SD1;
                            _this.btnLock.skinName = "skins.SnapBigButton2Skin";
                        }
                    }));
                }
            }
        };
        /**设置当前玩家装备信息 */
        EquipTip.prototype.setInfo = function (data) {
            this.setBasicPropertys(data);
            this.equipLabFight.text = utils.htmlUtil.computeModelTatolFighting(data.properties) + "";
        };
        /**设置其他玩家装备信息(排行榜查看) */
        EquipTip.prototype.setOtherPlayerInfo = function (data) {
            this.setBasicPropertys(data.templateEquip);
            this.equipLabFight.text = utils.htmlUtil.computeModelTatolFighting(data.templateEquip.properties) + "";
        };
        /**设置装备详细属性 */
        EquipTip.prototype.setBasicPropertys = function (data) {
            this.imgQuality.source = ResPath.getQuality(data.quality);
            this.imgIcon.source = ResPath.getItemIconKey(data.icon);
            this.updateQualityEfct(data.quality);
            this.labName.text = data.name;
            this.labName.textColor = TypeQuality.getQualityColor(data.quality);
            this.labType.text = TypeEquip.getEquipPosName(data.pos);
            utils.CheckUtil.setLabelByMyLevel(data.lv, this.labStep);
            var propertyData = {};
            var arr = data.properties.split(";");
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i].split("_");
                propertyData[str[0]] = parseInt(str[1]);
            }
            this.labPropertys.textFlow = this.getBestProperty(propertyData);
        };
        EquipTip.prototype.getBestProperty = function (data) {
            var arys = utils.htmlUtil.getBaseAttElement(data);
            arys.unshift({ text: Language.C_JBSX + "\n\n", style: { "textColor": 0Xd1a765 } });
            return arys;
        };
        EquipTip.prototype.updateQualityEfct = function (quality) {
            this.clearEffect();
            switch (quality) {
                // case TypeQuality.GREEN:
                // 	this.addEffect(TypeEffectId.GREEN_EFF, 80, 146, this, 12);
                // 	break;
                // case TypeQuality.BLUE:
                // 	this.addEffect(TypeEffectId.BULE_EFF, 80, 146, this, 12);
                // 	break;
                case TypeQuality.PURPLE:
                    this.addEffect(TypeEffectId.PURPLE_EFF, 80, 146, this, 12);
                    break;
                case TypeQuality.ORANGE:
                    this.addEffect(TypeEffectId.ORANGE_EFF, 80, 146, this, 12);
                    break;
                case TypeQuality.RED:
                    this.addEffect(TypeEffectId.RED_EFF, 80, 146, this, 12);
                    break;
                case TypeQuality.GOLDEN:
                    this.addEffect(TypeEffectId.GOLDEN_EFF, 80, 146, this, 12);
                    break;
            }
        };
        EquipTip.prototype.removeSelf = function () {
            for (var i = 0; i < this._starEffectList.length; i++) {
                if (this._starEffectList[i]) {
                    if (this._starEffectList[i].parent)
                        this._starEffectList[i].parent.removeChild(this._starEffectList[i]);
                    utils.ObjectPool.to(this._starEffectList[i]);
                    this._starEffectList[i].stop();
                    this._starEffectList[i].reset();
                    this._starEffectList[i] = null;
                }
            }
            this.btnLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLockClick, this);
            this.clearEffect();
            this.imgIcon.source = null;
            this.labPropertys.textFlow = null;
            mg.TipManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return EquipTip;
    }(ui.EquipTipSkin));
    tips.EquipTip = EquipTip;
    __reflect(EquipTip.prototype, "tips.EquipTip", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));
