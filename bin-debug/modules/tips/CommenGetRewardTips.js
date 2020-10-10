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
var tipUps;
(function (tipUps) {
    var CommenGetRewardTips = (function (_super) {
        __extends(CommenGetRewardTips, _super);
        function CommenGetRewardTips() {
            var _this = _super.call(this) || this;
            _this._count = 0;
            _this._angle = 0;
            return _this;
        }
        Object.defineProperty(CommenGetRewardTips.prototype, "data", {
            set: function (data) {
                this.show(data);
            },
            enumerable: true,
            configurable: true
        });
        CommenGetRewardTips.prototype.show = function (data) {
            for (var z = this.petGroup.numChildren; z >= 0; z--) {
                var btns = this.petGroup.getChildAt(z);
                if (btns) {
                    this.petGroup.removeChildAt(z);
                }
            }
            this.scroller.touchChildren = false;
            this.reward.visible = false;
            if (data.length == 1) {
                this.reward.visible = true;
                this.reward.imgStar.source = null;
                var str = data[0];
                this.reward.dataSource = str;
                var item = Templates.getTemplateById(templates.Map.ITEM, str.split("_")[0]);
                if (item.type == 130) {
                    var pet = Templates.getTemplateById(templates.Map.GENERAL, item.id);
                    this.reward.imgStar.source = "tujian_json.img_star" + pet.star;
                    this.reward.labCount.text = "";
                }
                mg.TipManager.instance.unBind(this.reward);
            }
            else {
                if (data.length <= 10) {
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i])
                            continue;
                        var itemTemp = new components.RewardItemBox();
                        itemTemp.dataSource = data[i];
                        var item = Templates.getTemplateById(templates.Map.ITEM, data[i].split("_")[0]);
                        if (item.type == 130) {
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, item.id);
                            itemTemp.imgStar.visible = true;
                            itemTemp.imgStar.source = "tujian_json.img_star" + pet.star;
                            itemTemp.labCount.text = "";
                        }
                        this.petGroup.addChild(itemTemp);
                    }
                    if (data.length < 5) {
                        this.petGroup.x = 60 + (5 - data.length) * 60 - (8 * (5 - data.length));
                    }
                    else {
                        this.petGroup.x = 63;
                    }
                }
                else {
                    this.list.dataProvider = new eui.ArrayCollection(data);
                }
                this.list.dataProvider = new eui.ArrayCollection(data);
            }
            egret.Tween.removeTweens(this.img_ratoion);
            this.tweenPreviewImgHandler();
            this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
        };
        CommenGetRewardTips.prototype.onCloseClick = function (e) {
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        CommenGetRewardTips.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        CommenGetRewardTips.prototype.removeSelf = function () {
            mg.TipUpManager.instance.setCurrent();
            this._count = 0;
            this._angle = 0;
            egret.Tween.removeTweens(this.img_ratoion);
            this.clearList(this.list);
            this.reward.dataSource = null;
            this.touchGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return CommenGetRewardTips;
    }(ui.UsePropGetGiftSkin));
    tipUps.CommenGetRewardTips = CommenGetRewardTips;
    __reflect(CommenGetRewardTips.prototype, "tipUps.CommenGetRewardTips", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));
