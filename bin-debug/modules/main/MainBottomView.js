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
    var MainBottomView = (function (_super) {
        __extends(MainBottomView, _super);
        function MainBottomView() {
            return _super.call(this) || this;
        }
        MainBottomView.prototype.init = function () {
            this._parent = this.parent;
            this._backIconEffect = new s.AnimationSprite();
            this._backIconEffect.resId = '6198';
            this._backIconEffect.x = 42;
            this._backIconEffect.y = 42;
            this._fightIconEffect = new s.AnimationSprite();
            this._fightIconEffect.resId = '6189';
            this._fightIconEffect.x = 189;
            this._fightIconEffect.y = 58;
            this.bottomGroup.addChildAt(this._fightIconEffect, this.bottomGroup.getChildIndex(this.iconFightRedPoint) - 1);
            this._fightIconEffect.touchEnabled = true;
            this._fightIconEffect.play();
            mg.stageManager.onResize(this, this.resizeHandler, true);
            this.refreshBagCount(null);
            GameModels.state.registerWarnTarget(GameRedState.ROLE, this.btnWuJiang);
            GameModels.state.registerWarnTarget(GameRedState.BAG, this.btnBeiBao);
            GameModels.state.registerWarnTarget(GameRedState.BAOWU, this.btnBaoWu);
            GameModels.state.registerWarnTarget(GameRedState.TUJIAN, this.btnTuJian);
            GameModels.state.registerWarnTarget(GameRedState.UNION, this.legionRedPoint);
            GameModels.state.registerWarnTarget(GameRedState.CITY, this.imgCityRedPoint);
            GameModels.state.registerWarnTarget(GameRedState.ATKCITY, this.iconFightRedPoint);
            this.btnWuJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnBeiBao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnBaoWu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.btnWenGuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnTuJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.tipBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            GameModels.bag.addEventListener(mo.ModelBag.BAG_CAPACITY_MAX, this.refreshBagCount, this);
            this._fightIconEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFinght, this);
            this.btnQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.btnCity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCity, this);
            this.btnLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlegion, this);
            GameModels.user.player.onPropertyChange(TypeProperty.Exp, this, this.expChange);
            mg.uiManager.addEventListener(egret.Event.CHANGE, this.uiChangeHandler, this);
            this.backXpGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.xpTouchHandler, this);
            this.backXpGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.xpTouchHandler, this);
            this.backXpGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xpTouchHandler, this);
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler);
            this.gameChangeHandler();
            this.expChange();
        };
        MainBottomView.prototype.clear = function () {
        };
        MainBottomView.prototype.add = function () {
            if (!this.parent) {
                this._parent.addChild(this);
                this._parent.touchEnabled = this._parent.touchChildren = true;
            }
        };
        MainBottomView.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
                //this._parent.touchEnabled=this._parent.touchChildren=false;
            }
        };
        MainBottomView.prototype.uiChangeHandler = function (e) {
            this.updateXpBackState();
        };
        MainBottomView.prototype.gameChangeHandler = function () {
            if (!app.gameContext.manager.gameCurrent)
                return;
            var gameType = app.gameContext.manager.gameCurrent.type;
            if (TypeGame.isFormationGame(true)) {
                this.btnCity.visible = true;
                this.btnQuit.visible = false;
            }
            else {
                if (gameType == TypeGame.CITY || gameType == TypeGame.ATKCITY || gameType == TypeGame.BEGIN) {
                    this.btnCity.visible = true;
                    this.btnQuit.visible = false;
                }
                else {
                    this.btnCity.visible = false;
                    this.btnQuit.visible = true;
                }
            }
        };
        MainBottomView.prototype.onFinght = function (e) {
            if (!TypeGame.isFormationGame(true) && TypeGame.CURRENT_GAME_TYPE != TypeGame.CITY && TypeGame.CURRENT_GAME_TYPE != TypeGame.ATKCITY) {
                mg.alertManager.tip(Language.J_GWFWFQHCJ);
                return;
            }
            mg.uiManager.removeAllDialogs();
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS || app.gameContext.typeGame == TypeGame.DOOR_BOSS) {
                return;
            }
            if (GameModels.scene.getjoinSceneListByType(TypeGame.CHAPTER_BOSS)) {
                app.gameContext.enterChapterBoss("");
                return;
            }
            if (GameModels.scene.getjoinSceneListByType(TypeGame.DOOR_BOSS)) {
                app.gameContext.enterChapterCity("");
                return;
            }
            if (app.gameContext.typeGame != TypeGame.ATKCITY) {
                app.gameContext.enterChapter();
            }
            else {
                mg.alertManager.tip(Language.J_YJZCZZ);
            }
        };
        MainBottomView.prototype.onBack = function (e) {
            var tip;
            switch (app.gameContext.gameCurrent.type) {
                case TypeGame.CHAPTER_BOSS:
                case TypeGame.DOOR_BOSS:
                    GameModels.chapter.bossCancelAutoFight();
                    break;
                case TypeGame.EVERYONE_BOSS:
                // case TypeGame.GOD_DIE:
                // 	tip = Language.J_TCJKCYCCS
                // 	break;
                case TypeGame.LOSE_BOSS:
                case TypeGame.GOD_DOMAIN:
                case TypeGame.COPY_BOSS_FANTASY:
                case TypeGame.CROSS_BOSS:
                case TypeGame.WOORS_BOSS:
                case TypeGame.DEATH_BOSS:
                case TypeGame.SECRET_BOSS:
                case TypeGame.FAMILY_BOSS:
                case TypeGame.LEGION_WAR:
                    tip = Language.J_TCKCJHSFQD;
                    break;
                case TypeGame.JUE_DI_QIU_SHENG:
                    tip = Language.J_TCJHBTT;
                    break;
                case TypeGame.TEAM_COPY_FIGHT:
                    tip = Language.J_TCFBBHKCJLCS;
                    break;
                case TypeGame.MATERIAL_MAIGU:
                    tip = Language.J_TCMGJD;
                    break;
            }
            if (tip) {
                mg.alertManager.showAlert(PromptAlert, false, true, tip, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                    GameModels.copyBoss.disableAutoBoss();
                    app.gameContext.exitToMainGame();
                }));
            }
            else {
                GameModels.copyBoss.disableAutoBoss();
                app.gameContext.exitToMainGame();
            }
        };
        MainBottomView.prototype.onCity = function (e) {
            if (app.gameContext.typeGame == TypeGame.BEGIN || GameModels.chapter.totalChapter <= 1) {
                mg.alertManager.tip(Language.J_QWCXSRW);
                return;
            }
            if (GameModels.chapter.isShowRewardTitle)
                GameModels.chapter.isShowRewardTitle = false;
            if (!TypeGame.isFormationGame(true) && TypeGame.CURRENT_GAME_TYPE != TypeGame.CITY && TypeGame.CURRENT_GAME_TYPE != TypeGame.ATKCITY) {
                mg.alertManager.tip(Language.J_GWFWFQHCJ);
                return;
            }
            mg.uiManager.removeAllDialogs();
            if (app.gameContext.typeGame != TypeGame.CITY) {
                app.gameContext.enterCity();
            }
            else {
                mg.alertManager.tip(Language.J_YJZYDZ);
            }
            // mg.uiManager.show(main.MainCountryWarAdvanceNotice);
        };
        MainBottomView.prototype.onlegion = function (e) {
            if (!GameModels.user.player.legionId) {
                mg.uiManager.show(LegionList);
                return;
            }
            mg.uiManager.show(LegionMain);
        };
        MainBottomView.prototype.updateXpBackState = function () {
            if (mg.uiManager.hasDialog) {
                this.backXpGroup.addChild(this.imgBack);
                if (mg.uiManager.hasPopDialog) {
                    this.backXpGroup.addChild(this._backIconEffect);
                    this._backIconEffect.play();
                }
            }
            else {
                if (this._backIconEffect.parent) {
                    this._backIconEffect.stop();
                    this._backIconEffect.parent.removeChild(this._backIconEffect);
                }
                if (this.imgBack.parent) {
                    this.imgBack.parent.removeChild(this.imgBack);
                }
            }
        };
        MainBottomView.prototype.xpTouchHandler = function (e) {
            if (!mg.uiManager.hasDialog && GameModels.user.player.wuShuangId == 0) {
                return;
            }
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    egret.Tween.removeTweens(this.backXpGroup);
                    this.backXpGroup.scaleX = this.backXpGroup.scaleY = 1;
                    egret.Tween.get(this.backXpGroup).to({ scaleX: 0.9, scaleY: 0.9 }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.xpTouchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.removeTweens(this.backXpGroup);
                    egret.Tween.get(this.backXpGroup).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.cubicOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.xpTouchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    if (mg.uiManager.hasDialog) {
                        mg.uiManager.removeLastDialog();
                    }
                    break;
            }
        };
        MainBottomView.prototype.refreshBagCount = function (e) {
            this.tipBag.visible = GameModels.bag.isMax;
        };
        MainBottomView.prototype.expChange = function () {
            this.progressExp.labelDisplay.strokeColor = 0x0000000;
            this.progressExp.labelDisplay.stroke = 2;
            this.progressExp.maximum = GameModels.user.player.maxExp;
            this.progressExp.value = GameModels.user.player.exp;
        };
        MainBottomView.prototype.resizeHandler = function (w, h) {
            // this._xpFireProgress.width = w;
            // this._xpFireProgress.y = 115;
        };
        MainBottomView.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.tipBag:
                    mg.uiManager.switchUI(dialog.bag.BagDialog);
                    break;
                case this.btnWuJiang:
                    if (mg.uiManager.isOpen(dialog.bag.BagRecycleDialog)) {
                        mg.uiManager.remove(dialog.bag.BagRecycleDialog);
                    }
                    mg.uiManager.switchUI(dialog.role.RoleMainDialog);
                    break;
                case this.btnBeiBao:
                    mg.uiManager.switchUI(dialog.bag.BagDialog);
                    break;
                // case this.btnWenGuan:
                // 	mg.uiManager.switchUI(dialog.WenGuan.WenGuanDialog);
                // 	break;
                case this.btnTuJian:
                    mg.uiManager.switchUI(dialog.tujian.TuJianMainDialog);
                    break;
                case this.btnBaoWu:
                    mg.uiManager.switchUI(dialog.baowu.BaoWuMain);
                    break;
            }
        };
        return MainBottomView;
    }(ui.MainBottomSkin));
    main.MainBottomView = MainBottomView;
    __reflect(MainBottomView.prototype, "main.MainBottomView");
})(main || (main = {}));
