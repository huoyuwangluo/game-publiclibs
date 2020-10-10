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
var components;
(function (components) {
    var RewardItemBox = (function (_super) {
        __extends(RewardItemBox, _super);
        function RewardItemBox() {
            var _this = _super.call(this) || this;
            _this.vipEnabled = false;
            _this.touchChildren = false;
            _this.skinName = 'components.ItemBoxSkin';
            return _this;
        }
        RewardItemBox.prototype.reset = function () {
            _super.prototype.reset.call(this);
            if (this._itemVO) {
                mg.TipManager.instance.unBind(this);
                vo.toPool(this._itemVO);
                this._itemVO = null;
                this._data = null;
                this.labName.text = "";
                this.labCount.text = "";
                this.icon.source = null;
                this.imgStar.source = "";
                this.quality.source = null;
            }
            this.clearEffect();
        };
        RewardItemBox.prototype.dataChange = function () {
            if (this._dataSource) {
                this.updateHandler(this._dataSource);
            }
            else {
                this.visible = false; //改到外面调用
                this.reset();
            }
        };
        RewardItemBox.prototype.updateHandler = function (data) {
            this.visible = true;
            var itemVO = null;
            if (data instanceof vo.ItemVO) {
                itemVO = this._itemVO = data.clone();
            }
            else {
                this._itemVO ? vo.toPool(this._itemVO) : null;
                var rewardData = data.split("_");
                var count = 0;
                if (rewardData.length > 1) {
                    count = parseInt(rewardData[1]);
                }
                var type = Templates.getItemTemplateMainType(rewardData[0]);
                if (type == TypeItem.EQUIP) {
                    itemVO = this._itemVO = vo.fromPool(vo.EquipVO, parseInt(rewardData[0]));
                }
                else {
                    itemVO = this._itemVO = vo.fromPool(vo.ItemVO, parseInt(rewardData[0]));
                }
                itemVO.count = count;
            }
            // if (itemVO.mainType == TypeItem.EQUIP) {
            // 	this.labName.text = convert.getLevelName(itemVO.lv);
            // }
            // else {
            // 	this.labName.text = itemVO.name;
            // }
            this.labName.text = itemVO.name;
            this.labName.textColor = TypeQuality.getQualityColor(itemVO.quality);
            if (itemVO.count) {
                this.labCount.text = "" + equation.thousandChange(itemVO.count);
            }
            else {
                this.labCount.text = "";
            }
            this.imgStar.source = null;
            // this.labCount.text = "" + (itemVO.count || "");
            this.icon.source = ResPath.getItemIconKey(itemVO.icon);
            mg.TipManager.instance.unBind(this);
            switch (itemVO.mainType) {
                case TypeItem.MONEY:
                    if (itemVO.type == TypeItem.PET_TYPE) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, itemVO.id);
                        mg.TipManager.instance.bind(this, tips.GeneralInfoTip, pet);
                    }
                    else {
                        mg.TipManager.instance.bind(this, tips.PropTip, itemVO);
                    }
                    break;
                case TypeItem.DEBRIS:
                    //任选宝箱
                    mg.TipManager.instance.bind(this, tips.SelectedBoxTip, itemVO);
                    break;
                case TypeItem.MATERIAL:
                case TypeItem.TREASURE:
                case TypeItem.DROPGROUP:
                case TypeItem.BINGFA:
                case TypeItem.ITEM:
                    if (itemVO.id == ConfigData.SHENMOJIAONIAO) {
                        mg.TipManager.instance.bind(this, tips.ShenMoJiangPropTip, itemVO);
                    }
                    else {
                        mg.TipManager.instance.bind(this, tips.PropTip, itemVO);
                    }
                    break;
                case TypeItem.EQUIP:
                    mg.TipManager.instance.bind(this, tips.EquipTip, itemVO);
                    break;
            }
            var quality = this._itemVO.quality;
            // if (quality == 6 || quality == 7) quality = 6;
            this.quality.source = this.vipEnabled ? ("vip_json.img_qlt" + quality) : ResPath.getQuality(this._itemVO.quality);
            if (itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(itemVO.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, itemVO.type == TypeItem.PET_SUI ? itemVO.nextId : itemVO.id);
                this.labName.textColor = TypeQuality.getStarColor(tem.star);
                this.quality.source = this.vipEnabled ? ("vip_json.img_qlt" + quality) : ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
            }
            this.vipEnabled ? this.updateQualityEfct(13, 11) : this.updateQualityEfct();
        };
        Object.defineProperty(RewardItemBox.prototype, "tipData", {
            get: function () {
                return this._itemVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RewardItemBox.prototype, "tipEnabled", {
            get: function () {
                return this._itemVO && this._tipEnabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RewardItemBox.prototype, "tipClass", {
            get: function () {
                return this._itemVO && this._itemVO.mainType == TypeItem.EQUIP ? tips.EquipTip : this._itemVO && tips.PropTip;
            },
            enumerable: true,
            configurable: true
        });
        RewardItemBox.prototype.updateQualityEfct = function (fx, fy) {
            if (fx === void 0) { fx = 0; }
            if (fy === void 0) { fy = 0; }
            this.clearEffect();
            if (this._itemVO) {
                var index = this._itemVO.quality;
                var isPet = false;
                if (this._itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._itemVO.type)) {
                    // var tem: templates.general = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                    isPet = true;
                }
                if (isPet && index == TypeQuality.GOLDEN)
                    return;
                switch (index) {
                    // case TypeQuality.GREEN:
                    // 	this.addEffect(TypeEffectId.GREEN_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                    // 	break;
                    // case TypeQuality.BLUE:
                    // 	this.addEffect(TypeEffectId.BULE_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                    // 	break;
                    case TypeQuality.PURPLE:
                        this.addEffect(TypeEffectId.PURPLE_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                        break;
                    case TypeQuality.ORANGE:
                        this.addEffect(TypeEffectId.ORANGE_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                        break;
                    case TypeQuality.RED:
                        this.addEffect(TypeEffectId.RED_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                        break;
                    case TypeQuality.GOLDEN:
                    case TypeQuality.AN_GOLDEN:
                    case TypeQuality.SHENG_GOLDEN:
                        this.addEffect(TypeEffectId.GOLDEN_EFF, 46 + fx, 42 + fy, this, 12, this.getChildIndex(this.labCount));
                        break;
                }
            }
        };
        /**播放飞物品至背包效果 */
        RewardItemBox.prototype.playFlyItem = function (callBackHandler) {
            if (!this._itemVO)
                return;
            switch (this._itemVO.id) {
                case "101":
                    var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                    mg.effectManager.flyEffects("6160", 10, this.localToGlobal(45, 45), moneyPoint, mg.layerManager.top);
                    if (callBackHandler)
                        callBackHandler.run();
                    break;
                case "201":
                    var diamondPoint = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
                    mg.effectManager.flyEffects("6161", 10, this.localToGlobal(45, 45), diamondPoint, mg.layerManager.top);
                    if (callBackHandler)
                        callBackHandler.run();
                    break;
                case "301":
                    var targetPos = mg.uiManager.getView(main.MainUIView).getRolePostion(true);
                    mg.effectManager.flyEffects("6199", 1, this.localToGlobal(45, 45), targetPos, mg.layerManager.top);
                    if (callBackHandler)
                        callBackHandler.run();
                    break;
                default:
                    var flyItem = new s.FlyIconsEffect();
                    flyItem.initializeConfigStr(this._itemVO.id, this.localToGlobal(45, 45), mg.layerManager.top);
                    flyItem.start();
                    if (callBackHandler)
                        callBackHandler.run();
                    break;
            }
        };
        return RewardItemBox;
    }(item.TipIcon));
    components.RewardItemBox = RewardItemBox;
    __reflect(RewardItemBox.prototype, "components.RewardItemBox");
})(components || (components = {}));
