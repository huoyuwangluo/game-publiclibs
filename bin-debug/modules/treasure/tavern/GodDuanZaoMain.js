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
var treasure;
(function (treasure) {
    var GodDuanZaoMain = (function (_super) {
        __extends(GodDuanZaoMain, _super);
        function GodDuanZaoMain() {
            var _this = _super.call(this) || this;
            _this._effArr = [];
            _this._pos = 0;
            _this._num = 0;
            _this._time = 20;
            return _this;
        }
        GodDuanZaoMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._effArr = [];
            this._imgIcon = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4,
                this.reward5, this.reward6, this.reward7];
        };
        GodDuanZaoMain.prototype.enter = function () {
            var _this = this;
            this.imgAddItem.visible = GameModels.platform.isPay;
            this._count = 0;
            this._angle = 0;
            this._type = 0;
            this._effArr = [];
            this.initBtnView(true);
            GameModels.tavern.requestGodDuanZaoInfo(utils.Handler.create(this, function () {
                _this._rewadTmps = GameModels.tavern.gdTemplates;
                for (var i = 0; i < 10; i++) {
                    if (_this._rewadTmps[i]) {
                        _this._imgIcon[i].dataSource = _this._rewadTmps[i].itemId;
                        _this._imgIcon[i].labName.text = "";
                        _this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onIconClick, _this);
                    }
                }
                _this.showView();
            }));
            this.boxReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            this.imgAddItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.btnTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.imgPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.tavern.addEventListener(mo.ModelTavern.GODDUANZAO_GETREWARD, this.showView, this);
        };
        GodDuanZaoMain.prototype.showView = function () {
            this.labProCount.text = GameModels.tavern.gdScore + "/1000";
            if (GameModels.tavern.gdScore >= 1000) {
                this.imgPreBg.visible = true;
                this.tweenPreviewImgHandler();
            }
            else {
                this.imgPreBg.visible = false;
                egret.Tween.removeTweens(this.imgPreBg);
            }
            var num = GameModels.tavern.gdScore / 1000;
            this.pro.noTweenValue = num > 1 ? 1 : num;
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.GODDUANZAO_ITEM);
            var itemCount = GameModels.bag.getItemCountById(ConfigData.GODDUANZAO_ITEM);
            this.itemIcon.source = item.icon;
            this.labName.text = item.name;
            this.labCount.text = itemCount.toString();
            var hashAnimal = false;
            var animal = GameModels.animal.getAnimalBuyType(18);
            if (animal.isAct && animal.step >= 6) {
                hashAnimal = true;
            }
            if (itemCount >= 1) {
                this.imgIcon1.source = item.icon;
                this.lab1.text = 1 + "";
                if (itemCount >= 10) {
                    this.imgIcon10.source = item.icon;
                    this.lab10.text = 10 + "";
                }
                else {
                    this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                    this.lab10.text = (hashAnimal ? Math.ceil(4500 / 2) : 4500) + "";
                }
            }
            else {
                this.imgIcon1.source = this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                this.lab1.text = (hashAnimal ? Math.ceil(500 / 2) : 500) + "";
                this.lab10.text = (hashAnimal ? Math.ceil(4500 / 2) : 4500) + "";
            }
            this.labLeft.text = Language.getExpression(Language.E_SYMFCS1, GameModels.tavern.gdLeftCount);
            if (GameModels.tavern.gdLeftCount <= 0) {
                this.labLeft.textColor = TypeColor.RED1;
            }
            else {
                this.labLeft.textColor = TypeColor.GREEN1;
            }
        };
        GodDuanZaoMain.prototype.initBtnView = function (canTouch) {
            this.btnOne.touchEnabled = this.btnTen.touchEnabled = canTouch;
        };
        GodDuanZaoMain.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        GodDuanZaoMain.prototype.onChouJiangClick = function (e) {
            if (e.currentTarget == this.btnOne) {
                this._type = 1;
            }
            else {
                this._type = 2;
            }
            var itemCount = GameModels.bag.getItemCountById(ConfigData.GODDUANZAO_ITEM);
            if (this._type == 1 && GameModels.tavern.gdLeftCount > 0) {
                this.requestChouJiang();
                return;
            }
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act3);
            if (vo.actCfgId == 80503 && ((this._type == 1 && itemCount >= 1) || (this._type == 2 && itemCount >= 10))) {
                mg.TipManager.instance.showCheckAlert(Language.J_TIPS3, TypeBtnLabel.OK, TypeCheck.INDEX_3, null, utils.Handler.create(this, function () {
                    this.requestChouJiang();
                }));
                return;
            }
            this.requestChouJiang();
        };
        GodDuanZaoMain.prototype.requestChouJiang = function () {
            var _this = this;
            GameModels.tavern.requestGodDuanZaoDoChouJiang(this._type, utils.Handler.create(this, function () {
                _this.initBtnView(false);
                _this.showView();
                var data = GameModels.tavern.gdItemList;
                _this.showView();
                if (data && data.length > 0) {
                    _this._pos = data[0].Pos + 15;
                    _this.playRewardTween();
                }
            }));
        };
        GodDuanZaoMain.prototype.playRewardTween = function () {
            if (this._num < this._pos) {
                this._num++;
                var index = this._num % 8;
                var disPlay = this._imgIcon[index];
                this.imgSecelted.alpha = 1; //this._time * this._num
                if (this._num <= 10) {
                    egret.Tween.get(this.imgSecelted).to({ x: disPlay.x - 4, y: disPlay.y - 6 }, 100, utils.Ease.quartIn).call(this.playRewardTween, this);
                }
                else {
                    egret.Tween.get(this.imgSecelted).to({ x: disPlay.x - 4, y: disPlay.y - 6 }, 100, utils.Ease.quartInOut).call(this.playRewardTween, this);
                }
            }
            else {
                this._num = this._pos - 16;
                if (this._num < 0)
                    this._num = 0;
                this.imgSecelted.alpha = 1;
                this.initBtnView(true);
                mg.alertManager.showAlert(TavernGetAlert, true, true, GameModels.tavern.gdItemList, this._type, ConfigData.GODDUANZAO_ITEM, this, this.requestChouJiang);
            }
        };
        GodDuanZaoMain.prototype.onIconClick = function (e) {
            for (var i = 0; i < 10; i++) {
                if (e.currentTarget == this._imgIcon[i]) {
                    if (this._rewadTmps[i]) {
                        var strItem = this._rewadTmps[i].itemId.split("_");
                        var item = Templates.getTemplateById(templates.Map.ITEM, strItem[0]);
                        if (item) {
                            mg.TipManager.instance.showTip(tips.PropTip, { count: parseInt(strItem[1]), templateProp: item });
                        }
                    }
                    break;
                }
            }
        };
        GodDuanZaoMain.prototype.onRewardClick = function () {
            mg.alertManager.showAlert(GodDuanZaoJiFenReward, true, true, 1);
        };
        GodDuanZaoMain.prototype.onAddItemClick = function (e) {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.GODDUANZAO_ITEM);
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, item.id); //激活道具获得途径
        };
        GodDuanZaoMain.prototype.onPreviewClick = function (e) {
            mg.alertManager.showAlert(treasure.GodDuanZaoAllPrize, true, true, 714001);
        };
        GodDuanZaoMain.prototype.exit = function () {
            this._count = 0;
            this._angle = 0;
            this._type = 0;
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
            this._effArr = [];
            egret.Tween.removeTweens(this);
            utils.timer.clear(this);
            this.boxReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            this.imgAddItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
            this.btnOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.btnTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.imgPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.tavern.removeEventListener(mo.ModelTavern.GODDUANZAO_GETREWARD, this.showView, this);
        };
        return GodDuanZaoMain;
    }(ui.GodDuanZaoMainSkin));
    treasure.GodDuanZaoMain = GodDuanZaoMain;
    __reflect(GodDuanZaoMain.prototype, "treasure.GodDuanZaoMain");
})(treasure || (treasure = {}));
