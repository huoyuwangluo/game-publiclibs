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
var animal;
(function (animal) {
    var AnimalForest = (function (_super) {
        __extends(AnimalForest, _super);
        function AnimalForest() {
            var _this = _super.call(this) || this;
            _this._effArr = [];
            _this._pos = 0;
            _this._num = 0;
            _this._time = 20;
            return _this;
        }
        AnimalForest.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._effArr = [];
            // this._imgIcon = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4,
            // this.reward5, this.reward6, this.reward7];
        };
        AnimalForest.prototype.enter = function () {
            var _this = this;
            this.imgAddItem.visible = GameModels.platform.isPay;
            this._count = 0;
            this._angle = 0;
            this._type = 0;
            this._effArr = [];
            this.initBtnView(true);
            GameModels.tavern.requestAnimalInfo(utils.Handler.create(this, function () {
                // this._rewadTmps = GameModels.tavern.animalTemplates;
                // for (var i = 0; i < 10; i++) {
                // 	if (this._rewadTmps[i]) {
                // 		this._imgIcon[i].dataSource = this._rewadTmps[i].itemId;
                // 		this._imgIcon[i].labName.text = "";
                // 		this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                // 	}
                // }
                _this.showView();
            }));
            this.boxReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            this.imgAddItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.btnTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.imgPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.tavern.addEventListener(mo.ModelTavern.ANIMAL_GETREWARD, this.showView, this);
        };
        AnimalForest.prototype.showView = function () {
            this.labProCount.text = GameModels.tavern.animalScore + "/1000";
            if (GameModels.tavern.animalScore >= 1000) {
                this.imgPreBg.visible = true;
                this.tweenPreviewImgHandler();
            }
            else {
                this.imgPreBg.visible = false;
                egret.Tween.removeTweens(this.imgPreBg);
            }
            var hashAnimal = false;
            var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
            if (yaoHuanimal && yaoHuanimal.isAct && yaoHuanimal.step >= 6) {
                hashAnimal = true;
            }
            var num = GameModels.tavern.animalScore / 1000;
            this.pro.noTweenValue = num > 1 ? 1 : num;
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ANIAML_ZHAOHUAN);
            var itemCount = GameModels.bag.getItemCountById(ConfigData.ANIAML_ZHAOHUAN);
            this.itemIcon.source = item.icon;
            this.labName.text = item.name;
            this.labCount.text = itemCount.toString();
            if (itemCount >= 1) {
                this.imgIcon1.source = item.icon;
                this.lab1.text = 1 + "";
                if (itemCount >= 10) {
                    this.imgIcon10.source = item.icon;
                    this.lab10.text = 10 + "";
                }
                else {
                    this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                    this.lab10.text = (hashAnimal ? Math.ceil(3000 / 2) : 3000) + "";
                }
            }
            else {
                this.imgIcon1.source = this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                this.lab1.text = (hashAnimal ? Math.ceil(320 / 2) : 320) + "";
                this.lab10.text = (hashAnimal ? Math.ceil(3000 / 2) : 3000) + "";
            }
            this.labLeft.text = Language.getExpression(Language.E_SYMFCS1, GameModels.tavern.animalLeftCount);
            if (GameModels.tavern.animalLeftCount <= 0) {
                this.labLeft.textColor = TypeColor.RED1;
            }
            else {
                this.labLeft.textColor = TypeColor.GREEN1;
            }
        };
        AnimalForest.prototype.initBtnView = function (canTouch) {
            this.btnOne.touchEnabled = this.btnTen.touchEnabled = canTouch;
        };
        AnimalForest.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        AnimalForest.prototype.onChouJiangClick = function (e) {
            if (e.currentTarget == this.btnOne) {
                this._type = 1;
            }
            else {
                this._type = 2;
            }
            var itemCount = GameModels.bag.getItemCountById(ConfigData.ANIAML_ZHAOHUAN);
            if (this._type == 1 && GameModels.tavern.animalLeftCount > 0) {
                this.requestChouJiang();
                return;
            }
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act3);
            if (vo.actCfgId == 80502 && ((this._type == 1 && itemCount >= 1) || (this._type == 2 && itemCount >= 10))) {
                mg.TipManager.instance.showCheckAlert(Language.J_TIPS1, TypeBtnLabel.OK, TypeCheck.INDEX_2, null, utils.Handler.create(this, function () {
                    this.requestChouJiang();
                }));
                return;
            }
            this.requestChouJiang();
        };
        AnimalForest.prototype.requestChouJiang = function () {
            var _this = this;
            GameModels.tavern.requestAnimalChouJiang(this._type, utils.Handler.create(this, function () {
                // this.initBtnView(false);
                _this.showView();
                var data = GameModels.tavern.animalItemList;
                mg.alertManager.showAlert(AnimalGetAlert, true, true, data, _this._type, ConfigData.ANIAML_ZHAOHUAN, _this, _this.requestChouJiang);
                // if (data && data.length > 0) {
                // 	this._pos = data[0].Pos + 15;
                // 	this.playRewardTween();
                // }
            }));
        };
        AnimalForest.prototype.onRewardClick = function () {
            mg.alertManager.showAlert(GodDuanZaoJiFenReward, true, true, 2);
        };
        AnimalForest.prototype.onAddItemClick = function (e) {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ANIAML_ZHAOHUAN);
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, item.id); //激活道具获得途径
        };
        AnimalForest.prototype.onPreviewClick = function (e) {
            mg.alertManager.showAlert(treasure.GodDuanZaoAllPrize, true, true, 2100000);
        };
        AnimalForest.prototype.exit = function () {
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
            GameModels.tavern.removeEventListener(mo.ModelTavern.ANIMAL_GETREWARD, this.showView, this);
        };
        return AnimalForest;
    }(ui.AnimalForestSkin));
    animal.AnimalForest = AnimalForest;
    __reflect(AnimalForest.prototype, "animal.AnimalForest");
})(animal || (animal = {}));
