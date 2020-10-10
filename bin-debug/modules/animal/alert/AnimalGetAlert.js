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
var AnimalGetAlert = (function (_super) {
    __extends(AnimalGetAlert, _super);
    function AnimalGetAlert() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        _this._startPointX = 255;
        _this._startPointY = 475;
        _this._itemArr = [];
        return _this;
    }
    AnimalGetAlert.prototype.show = function (data, count, configId, call, handler) {
        if (count === void 0) { count = 1; }
        if (call === void 0) { call = null; }
        if (handler === void 0) { handler = null; }
        this.reward.visible = false;
        this._handler = handler;
        this._call = call;
        this._type = count;
        this._configId = configId;
        this.onceGroup.visible = false;
        this.clearItem();
        if (data.length == 1) {
            this.showOnceBtn();
            this.reward.visible = true;
            var str = data[0].ItemId + "_" + data[0].Count;
            this.reward.dataSource = str;
        }
        else {
            this.creatItem(data);
            this.starBoFangYanHua();
            //this.list.dataProvider = new eui.ArrayCollection(data);
        }
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    AnimalGetAlert.prototype.clearItem = function () {
        this._endPointArr = [];
        for (var i = 0; i < this._itemArr.length; i++) {
            if (this._itemArr[i]) {
                if (this._itemArr[i].parent)
                    this._itemArr[i].parent.removeChild(this._itemArr[i]);
                egret.Tween.removeTweens(this._itemArr[i]);
            }
        }
        this._itemArr = [];
    };
    AnimalGetAlert.prototype.creatItem = function (data) {
        for (var i = 0; i < 10; i++) {
            var item = new components.RewardItemBox();
            if (i < 5) {
                item.x = i * 103 + 50;
                item.y = 214;
            }
            else {
                item.x = (i - 5) * 103 + 50;
                item.y = 330;
            }
            item.dataSource = data[i].ItemId + "_" + data[i].Count;
            this.addChild(item);
            this._itemArr.push(item);
            this._endPointArr.push(new egret.Point(item.x, item.y));
            item.x = this._startPointX;
            item.y = this._startPointY;
            item.visible = false;
        }
    };
    AnimalGetAlert.prototype.playTween = function (index) {
        var _this = this;
        egret.Tween.removeTweens(this._itemArr[index]);
        this._itemArr[index].visible = true;
        egret.Tween.get(this._itemArr[index]).to({ x: this._endPointArr[index].x, y: this._endPointArr[index].y }, 200).call(function () {
            _this._itemArr[index].touchEnabled = true;
            if (index == _this._itemArr.length - 1) {
                _this.showOnceBtn();
            }
        });
    };
    AnimalGetAlert.prototype.starBoFangYanHua = function () {
        for (var i = 0; i < this._itemArr.length; i++) {
            this._itemArr[i].touchEnabled = false;
            utils.timer.once(i * 50, this, this.playTween, false, i);
        }
    };
    AnimalGetAlert.prototype.showOnceBtn = function () {
        this.onceGroup.visible = true;
        var item = Templates.getTemplateById(templates.Map.ITEM, this._configId);
        var itemCount = GameModels.bag.getItemCountById(this._configId);
        this.imgDaoJu.source = item.icon;
        var needOneCount = 0;
        var needTenCount = 0;
        var hashAnimal = false;
        var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
        if (yaoHuanimal && yaoHuanimal.isAct && yaoHuanimal.step >= 6) {
            hashAnimal = true;
        }
        if (this._type == 2) {
            if (itemCount >= 10) {
                this.labDaoJu.text = 10 + "";
            }
            else {
                this.imgDaoJu.source = "uiMain_json.main_img_diamonds";
                this.labDaoJu.text = (hashAnimal ? Math.ceil(3000 / 2) : 3000) + "";
            }
            this.btnOne.label = Language.C_ZLSC;
        }
        else {
            if (itemCount >= 1) {
                this.labDaoJu.text = 1 + "";
            }
            else {
                this.imgDaoJu.source = "uiMain_json.main_img_diamonds";
                this.labDaoJu.text = (hashAnimal ? Math.ceil(320 / 2) : 320) + "";
            }
            this.btnOne.label = Language.C_ZLYC;
        }
    };
    AnimalGetAlert.prototype.onBtnClick = function (e) {
        if (e.currentTarget == this.btnOne) {
            if (this._call && this._handler) {
                this._handler.call(this._call);
            }
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    AnimalGetAlert.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    AnimalGetAlert.prototype.hide = function () {
        this._count = 0;
        this._angle = 0;
        egret.Tween.removeTweens(this.img_ratoion);
        utils.timer.clearAll(this);
        this.clearItem();
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
    return AnimalGetAlert;
}(ui.AnimalGetAlertSkin));
__reflect(AnimalGetAlert.prototype, "AnimalGetAlert", ["IAlert", "egret.DisplayObject"]);
