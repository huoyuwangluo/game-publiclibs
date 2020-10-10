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
var renderer;
(function (renderer) {
    var SelectItemIconRenderer = (function (_super) {
        __extends(SelectItemIconRenderer, _super);
        function SelectItemIconRenderer() {
            return _super.call(this) || this;
        }
        SelectItemIconRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SelectItemIconRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (!this.data) {
                this.reset();
                return;
            }
            if (this.data instanceof vo.ItemVO) {
                this.initViewByItemVO();
            }
            if (typeof this.data === 'string') {
                this.initViewByString();
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        SelectItemIconRenderer.prototype.initViewByItemVO = function () {
            this._itemVO = this.data;
            this.labCount.text = this._itemVO.count.toString();
            this.initView();
        };
        SelectItemIconRenderer.prototype.initViewByString = function () {
            var item = this.data.split("_");
            var count;
            if (item.length > 1)
                count = parseInt(item[1]);
            else
                count = 1;
            var temp = Templates.getTemplateById(templates.Map.ITEM, item[0]);
            if (temp)
                this._itemVO = vo.fromPool(vo.ItemVO, temp);
            else {
                temp = Templates.getTemplateById(templates.Map.EQUIP, item[0]);
                this._itemVO = vo.fromPool(vo.EquipVO, temp);
            }
            this._itemVO.count = count;
            this.labCount.text = this._itemVO.count.toString();
            this.initView();
        };
        SelectItemIconRenderer.prototype.initView = function () {
            this.labName.text = this._itemVO.name;
            this.imgIcon.source = this._itemVO.icon;
            if (this._itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._itemVO.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                this.imgQuality.source = ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
                this.labName.textColor = TypeQuality.getQualityColor(TypeQuality.getQualityByStar(tem.star));
            }
            else {
                this.imgQuality.source = ResPath.getQuality(this._itemVO.quality);
                this.labName.textColor = TypeQuality.getQualityColor(this._itemVO.quality);
            }
            this.imgSelect.visible = this.selected;
            this.removeEffect();
            this.addEffect();
        };
        SelectItemIconRenderer.prototype.onClick = function (e) {
            switch (e.target) {
                case this.imgIcon:
                    this.showItemTip();
                    break;
            }
            if (this._clickCallBack)
                this._clickCallBack.runWith(this);
        };
        Object.defineProperty(SelectItemIconRenderer.prototype, "clickCallBack", {
            set: function (value) {
                this._clickCallBack = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectItemIconRenderer.prototype.addEffect = function () {
            if (!this._effect) {
                var index = this._itemVO.quality;
                var isPet = false;
                if (this._itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._itemVO.type)) {
                    // var tem: templates.general = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                    isPet = true;
                }
                if (isPet && index == TypeQuality.GOLDEN)
                    return;
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.x = 46;
                this._effect.y = 42;
                if (index == TypeQuality.PURPLE) {
                    this._effect.resId = TypeEffectId.PURPLE_EFF;
                }
                else if (index == TypeQuality.ORANGE) {
                    this._effect.resId = TypeEffectId.ORANGE_EFF;
                }
                else if (index == TypeQuality.RED) {
                    this._effect.resId = TypeEffectId.RED_EFF;
                }
                else if (index >= TypeQuality.GOLDEN) {
                    this._effect.resId = TypeEffectId.GOLDEN_EFF;
                }
                this._effect.frameRate = 12;
                this.addChildAt(this._effect, 2);
                this._effect.play();
            }
        };
        SelectItemIconRenderer.prototype.removeEffect = function () {
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        Object.defineProperty(SelectItemIconRenderer.prototype, "id", {
            get: function () {
                return this._itemVO.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectItemIconRenderer.prototype, "isSelected", {
            get: function () {
                return this.selected;
            },
            set: function (value) {
                this.selected = value;
                this.imgSelect.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectItemIconRenderer.prototype.reset = function () {
            this.removeEffect();
            this.imgIcon.source = null;
            this.imgQuality.source = null;
            this.selected = false;
            if (this._clickCallBack) {
                this._clickCallBack.recover();
                this._clickCallBack = null;
            }
            if (this._itemVO) {
                vo.toPool(this._itemVO);
                this._itemVO = null;
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        SelectItemIconRenderer.prototype.showItemTip = function () {
            if (!this._itemVO)
                return;
            switch (this._itemVO.mainType) {
                case TypeItem.EQUIP:
                    mg.TipManager.instance.showTip(tips.EquipTip, this._itemVO);
                    break;
                default:
                    mg.TipManager.instance.showTip(tips.PropTip, this._itemVO);
                    break;
            }
        };
        return SelectItemIconRenderer;
    }(ui.SelectItemIconSkin));
    renderer.SelectItemIconRenderer = SelectItemIconRenderer;
    __reflect(SelectItemIconRenderer.prototype, "renderer.SelectItemIconRenderer");
})(renderer || (renderer = {}));
