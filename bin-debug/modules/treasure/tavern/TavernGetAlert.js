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
var TavernGetAlert = (function (_super) {
    __extends(TavernGetAlert, _super);
    function TavernGetAlert() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        return _this;
    }
    TavernGetAlert.prototype.show = function (data, count, configId, call, handler) {
        if (count === void 0) { count = 1; }
        if (call === void 0) { call = null; }
        if (handler === void 0) { handler = null; }
        this.reward.visible = false;
        this._handler = handler;
        this._call = call;
        if (data.length == 1) {
            this.reward.visible = true;
            var str = data[0].ItemId + "_" + data[0].Count;
            this.reward.dataSource = str;
        }
        else {
            this.list.dataProvider = new eui.ArrayCollection(data);
        }
        if (configId == ConfigData.GODDUANZAO_ITEM) {
            var item = Templates.getTemplateById(templates.Map.ITEM, configId);
            var itemCount = GameModels.bag.getItemCountById(configId);
            this.imgDaoJu.source = item.icon;
            var needOneCount = 0;
            var needTenCount = 0;
            var hashAnimal = false;
            if (configId == ConfigData.GODDUANZAO_ITEM) {
                var animal = GameModels.animal.getAnimalBuyType(18); //龙马
                if (animal.isAct && animal.step >= 6) {
                    hashAnimal = true;
                }
            }
            if (count == 2) {
                if (itemCount >= 10) {
                    this.labDaoJu.text = 10 + "";
                }
                else {
                    this.imgDaoJu.source = "uiMain_json.main_img_diamonds";
                    this.labDaoJu.text = (hashAnimal ? Math.ceil(4500 / 2) : 4500) + "";
                }
                this.btnOne.label = Language.C_ZLSC;
            }
            else {
                if (itemCount >= 1) {
                    this.labDaoJu.text = 1 + "";
                }
                else {
                    this.imgDaoJu.source = "uiMain_json.main_img_diamonds";
                    this.labDaoJu.text = (hashAnimal ? Math.ceil(500 / 2) : 500) + "";
                }
                this.btnOne.label = Language.C_ZLYC;
            }
        }
        else {
            var itemcount = GameModels.bag.getItemCountById(configId);
            var item = Templates.getTemplateById(templates.Map.ITEM, configId);
            this.imgDaoJu.source = item.icon;
            if (count == 2) {
                this.btnOne.label = Language.C_ZLSC;
                this.labDaoJu.text = itemcount + "/" + 10;
                this.labDaoJu.textColor = itemcount >= 10 ? 0x00ff00 : 0xff0000;
            }
            else {
                this.btnOne.label = Language.C_ZLYC;
                this.labDaoJu.text = itemcount + "/" + 1;
                this.labDaoJu.textColor = itemcount >= 1 ? 0x00ff00 : 0xff0000;
            }
        }
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
        utils.timer.clearAll(this);
        // if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.JIANGXING_CHOUJIANG) {
        // 	if (GameModels.task.curTask.canSubmit) {
        // 		utils.timer.once(400, this, function () {
        // 			mg.guideManager.guideImmediately(this.btnClose, Language.J_DJGB, TypeDirection.UP);
        // 		});
        // 	}
        // }
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showInfo, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    TavernGetAlert.prototype.onBtnClick = function (e) {
        if (e.currentTarget == this.btnOne) {
            if (this._call && this._handler) {
                this._handler.call(this._call);
            }
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    TavernGetAlert.prototype.showInfo = function (e) {
        this._targetItem = e.itemRenderer;
        if (!this._targetItem.itemVo)
            return;
        if (this._targetItem.itemVo.mainType == TypeItem.EQUIP) {
            mg.TipManager.instance.showTip(tips.EquipTip, this._targetItem.itemVo);
        }
        else {
            mg.TipManager.instance.showTip(tips.PropTip, this._targetItem.itemVo);
        }
    };
    TavernGetAlert.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    TavernGetAlert.prototype.hide = function () {
        this._count = 0;
        this._angle = 0;
        egret.Tween.removeTweens(this.img_ratoion);
        utils.timer.clearAll(this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showInfo, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.clearList(this.list);
        this.reward.dataSource = null;
        this._call = null;
        this._handler = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return TavernGetAlert;
}(ui.TavernGetAlertSkin));
__reflect(TavernGetAlert.prototype, "TavernGetAlert", ["IAlert", "egret.DisplayObject"]);
