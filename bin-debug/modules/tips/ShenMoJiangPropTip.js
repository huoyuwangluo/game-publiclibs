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
    var ShenMoJiangPropTip = (function (_super) {
        __extends(ShenMoJiangPropTip, _super);
        function ShenMoJiangPropTip() {
            var _this = _super.call(this) || this;
            _this._effArr = [];
            _this._effArr = [];
            _this._imgIcon = [_this.img_icon1, _this.img_icon2, _this.img_icon3, _this.img_icon4, _this.img_icon5,
                _this.img_icon6, _this.img_icon7, _this.img_icon8, _this.img_icon9, _this.img_icon10];
            _this._labCount = [_this.labCount1, _this.labCount2, _this.labCount3, _this.labCount4, _this.labCount5,
                _this.labCount6, _this.labCount7, _this.labCount8, _this.labCount9, _this.labCount10];
            return _this;
        }
        Object.defineProperty(ShenMoJiangPropTip.prototype, "tavernTemplates", {
            get: function () {
                var tem = Templates.getTemplatesByProperty(templates.Map.TAVERN4, "type", 1);
                if (tem) {
                    tem.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                }
                return tem;
            },
            enumerable: true,
            configurable: true
        });
        ShenMoJiangPropTip.prototype.show = function () {
            this.btnChouJiang.touchEnabled = true;
            this._temp = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENMOJIAONIAO);
            this.imgDaoJu.source = this._temp.icon;
            var count = GameModels.bag.getItemCountById(this._temp.id);
            this.labDaoJu.text = count + "/" + 1;
            this.labDaoJu.textColor = count >= 1 ? 0x00ff00 : 0xff0000;
            this._rewadTmps = this.tavernTemplates;
            for (var i = 0; i < 10; i++) {
                if (this._rewadTmps[i]) {
                    var strItem = this._rewadTmps[i].itemId.split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, strItem[0]);
                    if (this._rewadTmps[i].isShow && item) {
                        var animation = this.fromEffect("");
                        animation.scale(0.8);
                        var quality = item.quality;
                        if (TypeItem.checkIsPetTypeOrPetSuiTyp(item.type)) {
                            var tem = Templates.getTemplateById(templates.Map.GENERAL, item.type == TypeItem.PET_SUI ? item.nextId : item.id);
                            quality = TypeQuality.getQualityByStar(tem.star);
                        }
                        animation.resId = TypeEffectId.getEffIdByQuality(quality);
                        animation.touchEnabled = false;
                        animation.x = this._imgIcon[i].x + 30;
                        animation.y = this._imgIcon[i].y + 30;
                        animation.play();
                        this.addChildAt(animation, this.getChildIndex(this._imgIcon[i]) + 1);
                        this._effArr.push(animation);
                    }
                    if (item) {
                        this._imgIcon[i].source = item.icon;
                        this._labCount[i].text = strItem[1];
                        this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                    }
                }
            }
            this.btnChouJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        ShenMoJiangPropTip.prototype.onBtnClick = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        ShenMoJiangPropTip.prototype.onIconClick = function (e) {
            for (var i = 0; i < 10; i++) {
                if (e.currentTarget == this._imgIcon[i]) {
                    if (this._rewadTmps[i]) {
                        var strItem = this._rewadTmps[i].itemId.split("_");
                        var item = Templates.getTemplateById(templates.Map.ITEM, strItem[0]);
                        if (item) {
                            mg.TipManager.instance.showTip(tips.PropTip, item);
                        }
                    }
                    break;
                }
            }
        };
        ShenMoJiangPropTip.prototype.onChouJiangClick = function () {
            this.requestChouJiang();
        };
        ShenMoJiangPropTip.prototype.requestChouJiang = function () {
            var _this = this;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            GameModels.jiangxing.requestTavernDoChouJiang4(utils.Handler.create(this, function () {
                _this.btnChouJiang.touchEnabled = false;
                var data = GameModels.jiangxing.daojuItemList1;
                if (data && data.length > 0) {
                    _this.playZhuanPanRotation(data[0].Pos);
                }
            }));
        };
        ShenMoJiangPropTip.prototype.playZhuanPanRotation = function (pos) {
            logger.log("转盘停下来的位置", pos);
            egret.Tween.get(this.imgSelecd).to({ rotation: 720 + ((pos - 1) * 360 / 10) }, 3000, utils.Ease.quartOut).call(function (index) {
                this.imgSelecd.rotation = ((pos - 1) * 360 / 10);
                this.btnChouJiang.touchEnabled = true;
                var count = GameModels.bag.getItemCountById(this._temp.id);
                this.labDaoJu.text = count + "/" + 1;
                this.labDaoJu.textColor = count >= 1 ? 0x00ff00 : 0xff0000;
                mg.TipManager.instance.showTip(tips.ShenMoPetGetTip, { data: GameModels.jiangxing.daojuItemList1, call: this, handler: this.onChouJiangClick });
            }, this, [pos]);
        };
        ShenMoJiangPropTip.prototype.hide = function () {
            egret.Tween.removeTweens(this.imgSelecd);
            this.btnChouJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            for (var i = 0; i < this._effArr.length; i++) {
                if (this._effArr[i]) {
                    this._effArr[i].touchEnabled = true;
                    this._effArr[i].scale(1);
                    if (this._effArr[i].parent) {
                        this._effArr[i].parent.removeChild(this._effArr[i]);
                    }
                    this._effArr[i].stop();
                    utils.ObjectPool.to(this._effArr[i], true);
                    this._effArr[i] = null;
                }
            }
            this._effArr.length = 0;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ShenMoJiangPropTip;
    }(ui.ShenMoJiangPropTipSkin));
    tips.ShenMoJiangPropTip = ShenMoJiangPropTip;
    __reflect(ShenMoJiangPropTip.prototype, "tips.ShenMoJiangPropTip", ["IAlert", "egret.DisplayObject"]);
})(tips || (tips = {}));
