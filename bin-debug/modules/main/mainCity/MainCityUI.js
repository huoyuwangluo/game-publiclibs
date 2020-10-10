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
var main;
(function (main) {
    var MainCityUI = (function (_super) {
        __extends(MainCityUI, _super);
        function MainCityUI() {
            var _this = _super.call(this) || this;
            _this._timeArr = [1, 3, 5, 7];
            _this._point1 = [{ x: 442, y: 632 }, { x: 749, y: 791 }];
            _this._point2 = [{ x: 520, y: 882 }, { x: 240, y: 742 }];
            return _this;
        }
        MainCityUI.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            GameModels.state.registerWarnTarget(GameRedState.PETWANFA, this.imgRedPoint1);
            GameModels.state.registerWarnTarget(GameRedState.MATERIAL_COPY, this.imgRedPoint2);
            GameModels.state.registerWarnTarget(GameRedState.EXPLORE_XIANSHI, this.imgRedPoint3);
            GameModels.state.registerWarnTarget(GameRedState.LILIAN, this.imgRedPoint6);
            GameModels.state.registerWarnTarget(GameRedState.DAZAO, this.imgRedPoint7);
            GameModels.state.registerWarnTarget(GameRedState.ARENA, this.imgRedPoint8);
            GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY, this.imgRedPoint9);
            GameModels.state.registerWarnTarget(GameRedState.TREASURE, this.imgRedPoint10);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_JUYI, this.imgRedPoint11);
            GameModels.state.registerWarnTarget(GameRedState.ANIMAL, this.imgRedPoint12);
        };
        MainCityUI.prototype.enter = function () {
            this.imgIcon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon11.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon12.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon13.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            GameModels.scene.addEventListener(mo.ModelScene.JOINSCENE_CHANGE, this.updatajoinSceneListEff, this);
            this.imgGuo.visible = false;
            if (GameModels.user.player.legionId) {
                this.imgGuo.visible = true;
                if (GameModels.user.player.legionId == "1") {
                    this.imgGuo.source = "img_city_wei_png";
                }
                else if (GameModels.user.player.legionId == "2") {
                    this.imgGuo.source = "img_city_shu_png";
                }
                else {
                    this.imgGuo.source = "img_city_wu_png";
                }
            }
            if (!this._effect1) {
                this._effect1 = utils.ObjectPool.from(s.AnimationSprite);
                this._effect1.resId = "36001";
                this._effect1.x = this.imgIcon8.x + this.imgIcon8.width / 2;
                this._effect1.y = this.imgIcon8.y + this.imgIcon8.height / 2;
                this._effect1.play();
                this.addChild(this._effect1);
            }
            this.updataEff();
            this.updatajoinSceneListEff();
            this.updataRunEffect(true);
            this.updataRunEffect(false);
        };
        MainCityUI.prototype.clearjoinSceneListEff = function () {
            if (this._effectJoinScene1) {
                if (this._effectJoinScene1.parent) {
                    this._effectJoinScene1.parent.removeChild(this._effectJoinScene1);
                }
                this._effectJoinScene1.stop();
                utils.ObjectPool.to(this._effectJoinScene1, true);
                this._effectJoinScene1 = null;
            }
            if (this._effectJoinScene2) {
                if (this._effectJoinScene2.parent) {
                    this._effectJoinScene2.parent.removeChild(this._effectJoinScene2);
                }
                this._effectJoinScene2.stop();
                utils.ObjectPool.to(this._effectJoinScene2, true);
                this._effectJoinScene2 = null;
            }
            if (this._effectJoinScene3) {
                if (this._effectJoinScene3.parent) {
                    this._effectJoinScene3.parent.removeChild(this._effectJoinScene3);
                }
                this._effectJoinScene3.stop();
                utils.ObjectPool.to(this._effectJoinScene3, true);
                this._effectJoinScene3 = null;
            }
            if (this._effectJoinScene4) {
                if (this._effectJoinScene4.parent) {
                    this._effectJoinScene4.parent.removeChild(this._effectJoinScene4);
                }
                this._effectJoinScene4.stop();
                utils.ObjectPool.to(this._effectJoinScene4, true);
                this._effectJoinScene4 = null;
            }
        };
        MainCityUI.prototype.updatajoinSceneListEff = function () {
            this.clearjoinSceneListEff();
            if (!this._effectJoinScene1 && GameModels.scene.hashjoinSceneListByIndex(1)) {
                this._effectJoinScene1 = utils.ObjectPool.from(s.AnimationSprite);
                this._effectJoinScene1.resId = "30001";
                this._effectJoinScene1.frameRate = 6;
                this._effectJoinScene1.x = this.imgIcon8.x + this.imgIcon8.width / 2;
                this._effectJoinScene1.y = this.imgIcon8.y + this.imgIcon8.width / 2 - 20;
                this._effectJoinScene1.play();
                this.addChild(this._effectJoinScene1);
            }
            if (!this._effectJoinScene2 && GameModels.scene.hashjoinSceneListByIndex(2)) {
                this._effectJoinScene2 = utils.ObjectPool.from(s.AnimationSprite);
                this._effectJoinScene2.resId = "30001";
                this._effectJoinScene2.frameRate = 6;
                this._effectJoinScene2.x = this.imgIcon6.x + this.imgIcon6.width / 2 - 10;
                this._effectJoinScene2.y = this.imgIcon6.y + this.imgIcon6.width / 2 + 30;
                this._effectJoinScene2.play();
                this.addChild(this._effectJoinScene2);
            }
            if (!this._effectJoinScene3 && GameModels.scene.hashjoinSceneListByIndex(3)) {
                this._effectJoinScene3 = utils.ObjectPool.from(s.AnimationSprite);
                this._effectJoinScene3.resId = "30001";
                this._effectJoinScene3.frameRate = 6;
                this._effectJoinScene3.x = this.imgIcon1.x + this.imgIcon1.width / 2 - 20;
                this._effectJoinScene3.y = this.imgIcon1.y + this.imgIcon1.width / 2 - 60;
                this._effectJoinScene3.play();
                this.addChild(this._effectJoinScene3);
            }
            if (!this._effectJoinScene4 && GameModels.scene.hashjoinSceneListByIndex(4)) {
                this._effectJoinScene4 = utils.ObjectPool.from(s.AnimationSprite);
                this._effectJoinScene4.resId = "30001";
                this._effectJoinScene4.frameRate = 6;
                this._effectJoinScene4.x = this.imgIcon2.x + this.imgIcon2.width / 2;
                this._effectJoinScene4.y = this.imgIcon2.y + this.imgIcon2.width / 2 - 20;
                this._effectJoinScene4.play();
                this.addChild(this._effectJoinScene4);
            }
        };
        MainCityUI.prototype.updataRunEffect = function (isUp) {
            if (isUp) {
                utils.timer.clear(this, this.addRunEffect1);
                var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                utils.timer.once(this._timeArr[num] * 1000, this, this.addRunEffect1);
            }
            else {
                utils.timer.clear(this, this.addRunEffect2);
                var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                utils.timer.once(this._timeArr[num] * 1000, this, this.addRunEffect2);
            }
        };
        MainCityUI.prototype.addRunEffect1 = function () {
            var point1 = new egret.Point(this._point1[0].x, this._point1[0].y);
            var point2 = new egret.Point(this._point1[1].x, this._point1[1].y);
            var dire = TypeDirection.getDirection8(point1.x, point1.y, point2.x, point2.y);
            if (!this._effectDirect1) {
                this._effectDirect1 = new s.DirectAnimationSprite();
                this._effectDirect1.initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, true, true);
                this._effectDirect1.setResId("1880");
                this._effectDirect1.direct = dire;
                this._effectDirect1.x = point1.x;
                this._effectDirect1.frameRate = 6;
                this._effectDirect1.y = point1.y;
                this._effectDirect1.play();
                this.addChildAt(this._effectDirect1, 1);
                egret.Tween.get(this._effectDirect1).to({ x: point2.x, y: point2.y }, 10000).call(this.runEffectcallFun, this, [true]);
            }
        };
        MainCityUI.prototype.addRunEffect2 = function () {
            var point1 = new egret.Point(this._point2[0].x, this._point2[0].y);
            var point2 = new egret.Point(this._point2[1].x, this._point2[1].y);
            var dire = TypeDirection.getDirection8(point1.x, point1.y, point2.x, point2.y);
            // if (!this._effectDirect2) {
            //     this._effectDirect2 = new s.DirectAnimationSprite();
            //     this._effectDirect2.initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, true, true);
            //     this._effectDirect2.setResId("1880");
            //     this._effectDirect2.direct = dire;
            //     this._effectDirect2.x = point1.x;
            //     this._effectDirect2.y = point1.y;
            //     this._effectDirect2.frameRate = 6;
            //     this._effectDirect2.play();
            //     this.addChildAt(this._effectDirect2, 1);
            //     egret.Tween.get(this._effectDirect2).to({ x: point2.x, y: point2.y }, 8000).call(this.runEffectcallFun, this, [false]);
            // }
        };
        MainCityUI.prototype.runEffectcallFun = function (isUp) {
            this.removeRunEffect(isUp);
            this.updataRunEffect(isUp);
        };
        MainCityUI.prototype.removeRunEffect = function (isUp) {
            if (isUp) {
                if (this._effectDirect1) {
                    egret.Tween.removeTweens(this._effectDirect1);
                    if (this._effectDirect1.parent) {
                        this._effectDirect1.parent.removeChild(this._effectDirect1);
                    }
                    this._effectDirect1.stop();
                    utils.ObjectPool.to(this._effectDirect1, true);
                    this._effectDirect1 = null;
                }
            }
            else {
                if (this._effectDirect2) {
                    egret.Tween.removeTweens(this._effectDirect2);
                    if (this._effectDirect2.parent) {
                        this._effectDirect2.parent.removeChild(this._effectDirect2);
                    }
                    this._effectDirect2.stop();
                    utils.ObjectPool.to(this._effectDirect2, true);
                    this._effectDirect2 = null;
                }
            }
        };
        MainCityUI.prototype.updataEff = function () {
            if (!this._effect)
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
            this._effect.resId = "31035";
            this._effect.frameRate = 5;
            this._effect.x = this.imgIcon2.x + this.imgIcon2.width / 2 - 25;
            this._effect.y = this.imgIcon2.y + this.imgIcon2.height / 2 + 20;
            this.addChildAt(this._effect, this.getChildIndex(this.imgIcon2) - 1);
            this._effect.parent;
            this._effect.visible;
            this._effect.playOnce();
            this._effect.onCompleteOnce(this, function () {
                if (this._effect)
                    this._effect.stop();
                var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                utils.timer.clear(this, this.updataEff);
                utils.timer.once(this._timeArr[num] * 1000, this, this.updataEff, true);
            });
        };
        MainCityUI.prototype.exit = function () {
            utils.timer.clear(this, this.updataEff);
            utils.timer.clear(this, this.addRunEffect1);
            utils.timer.clear(this, this.addRunEffect2);
            this.removeRunEffect(true);
            this.removeRunEffect(false);
            if (this._effect) {
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                this._effect.stop();
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
            if (this._effect1) {
                if (this._effect1.parent) {
                    this._effect1.parent.removeChild(this._effect1);
                }
                this._effect1.stop();
                utils.ObjectPool.to(this._effect1, true);
                this._effect1 = null;
            }
            this.clearjoinSceneListEff();
            this.imgIcon1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon7.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon8.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon9.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon11.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon12.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon13.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            GameModels.scene.removeEventListener(mo.ModelScene.JOINSCENE_CHANGE, this.updatajoinSceneListEff, this);
        };
        MainCityUI.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.imgIcon1:
                    mg.uiManager.show(dialog.yuanZheng.petWanFaMainDilog);
                    break;
                case this.imgIcon2:
                    mg.uiManager.show(dialog.explore.CopyMaterialDialog, { tabIndex: 0 });
                    break;
                case this.imgIcon3:
                    mg.uiManager.show(dialog.battlefield.BattlefieldMain);
                    break;
                case this.imgIcon6:
                    mg.uiManager.show(dialog.explore.CopyPagodaMain, { tabIndex: 0 });
                    break;
                case this.imgIcon7:
                    mg.uiManager.show(dialog.dazao.DaoZaoMainDialog);
                    break;
                case this.imgIcon8:
                    mg.uiManager.show(dialog.sport.SportsMainDialog);
                    break;
                case this.imgIcon9:
                    if (GameModels.task.hasTask && GameModels.task.curTask.hasFunc && GameModels.task.curTask.type == TypeTask.PERSON_BOSS) {
                        mg.uiManager.showByName(GameModels.task.curTask.funcId, GameModels.task.curTask.funcParams, [GameModels.task.curTask.type, 1]);
                    }
                    else {
                        mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 0 });
                    }
                    break;
                case this.imgIcon10:
                    mg.uiManager.show(treasure.TreasureMain, { tabIndex: 0 });
                    break;
                case this.imgIcon11:
                    mg.uiManager.show(pet.PetGongMingMain);
                    break;
                case this.imgIcon12:
                    mg.uiManager.show(dialog.list.PetListFenJieDialog);
                    break;
                case this.imgIcon13:
                    mg.uiManager.show(animal.AnimalDialogMain);
                    break;
            }
        };
        return MainCityUI;
    }(ui.MainCityUISkin));
    main.MainCityUI = MainCityUI;
    __reflect(MainCityUI.prototype, "main.MainCityUI");
})(main || (main = {}));
