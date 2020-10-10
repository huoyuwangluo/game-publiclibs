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
var dialog;
(function (dialog) {
    var WelcomeDialog = (function (_super) {
        __extends(WelcomeDialog, _super);
        function WelcomeDialog() {
            var _this = _super.call(this) || this;
            //加载第一场战斗部分资源
            _this.resArr = [];
            _this.btnStart.visible = false;
            return _this;
        }
        WelcomeDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
            this._imgText = [this.imgText1, this.imgText2, this.imgText3, this.imgText4, this.imgText5];
            this._imgMask = [this.imgMask1, this.imgMask2, this.imgMask3, this.imgMask4, this.imgMask5];
        };
        WelcomeDialog.prototype.enter = function (data) {
            var _this = this;
            this.imgLine1.visible = this.imgLine2.visible = this.imgLine3.visible = this.imgLine4.visible = false;
            this.imgText1.visible = this.imgText2.visible = this.imgText3.visible = this.imgText4.visible = this.imgText5.visible = false;
            mg.soundManager.clearBackGround();
            RES.getResByUrl(game.GameConfig.resource_path + "/ui/welcome/bg/welcomebg.jpg", function (t) {
                _this.imgBg.texture = t;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(game.GameConfig.resource_path + "/ui/welcome/btn_start.png", function (t) {
                _this.btnStart.texture = t;
                _this.loadFirstBattleRes();
            }, this, RES.ResourceItem.TYPE_IMAGE);
            this._currIndex = 0;
            mg.soundManager.playSound("Story_7", 1, true, true);
            this._startEff = utils.ObjectPool.from(s.AnimationSprite);
            this._startEff.resId = "6090";
            this._startEff.y = this._imgText[this._currIndex].y;
            this._startEff.x = this._imgText[this._currIndex].x + 30;
            this._startEff.scale(0.5);
            this._startEff.play();
            this._startEff.frameRate = 24;
            this.addChild(this._startEff);
            this._moveEff = utils.ObjectPool.from(s.AnimationSprite);
            this._moveEff.resId = "6090";
            this._moveEff.y = this._imgText[this._currIndex].y;
            this._moveEff.x = this._imgText[this._currIndex].x + 33;
            this._moveEff.scale(0.5);
            this._moveEff.play();
            this._moveEff.frameRate = 24;
            this.addChild(this._moveEff);
            this.playTalk(this._currIndex);
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        WelcomeDialog.prototype.playTalk = function (index) {
            var imgMask = this._imgMask[this._currIndex];
            var imgTag = this._imgText[this._currIndex];
            if (this._currIndex == 5) {
                utils.timer.once(5000, this, this.timeEnd);
                return;
            }
            if (this._currIndex == 1) {
                this.btnStart.visible = true;
                this.imgLine1.visible = true;
            }
            else if (this._currIndex == 2) {
                this.imgLine2.visible = true;
            }
            else if (this._currIndex == 3) {
                this.imgLine3.visible = true;
            }
            else if (this._currIndex == 4) {
                this.imgLine4.visible = true;
            }
            else {
            }
            this._moveEff.x = imgTag.x + 33;
            this._moveEff.y = imgTag.y;
            imgTag.mask = imgMask;
            imgMask.y = imgTag.y - imgTag.height;
            imgTag.visible = true;
            // var time: number = 3000;
            egret.Tween.get(imgMask).to({ y: imgTag.y }, 3000).call(this.playTalk, this, [this._currIndex++]);
            egret.Tween.get(this._moveEff).to({ y: imgTag.y + imgTag.height }, 3000);
        };
        WelcomeDialog.prototype.loadFirstBattleRes = function () {
            this.loadBattleOneModel("1101", 1);
            this.loadBattleOneModel("2059", 1);
            this.loadBattleOneModel("2092", 1);
            this.loadBattleOneModel("2088", 1);
            this.loadBattleOneModel("2127", 1);
            this.loadBattleOneModel("2003", 3);
            this.loadBattleOneModel("2004", 3);
            this.loadBattleOneModel("2063", 3);
            this.loadBattleOneModel("1954", 3);
            this.loadBattleOneModel("1866", 3);
        };
        WelcomeDialog.prototype.unloadFirstBattleRes = function () {
            for (var i = 0; i < this.resArr.length; i++) {
                this.resArr[i].offReference(this, this.onLoadBattleOneRes);
                this.resArr[i] = null;
            }
            this.resArr = null;
        };
        WelcomeDialog.prototype.loadBattleOneModel = function (resId, direct) {
            //this.loadBattleOneRes(resId + "_0000_" + direct);
            this.loadBattleOneRes(resId + "_0200_" + direct);
            this.loadBattleOneRes(resId + "_0300_" + direct);
        };
        WelcomeDialog.prototype.loadBattleOneRes = function (name) {
            var resData = mg.assetsManager.reciveAnimationData(game.TypeAnimaAsset.ACTOR_DIRECT_5, name);
            resData.holdReference(this, this.onLoadBattleOneRes);
            this.resArr.push(resData);
        };
        WelcomeDialog.prototype.onLoadBattleOneRes = function (data) {
        };
        WelcomeDialog.prototype.timeEnd = function () {
            mg.uiManager.remove(this);
        };
        WelcomeDialog.prototype.exit = function () {
            mg.soundManager.playBackGround("bgm_bingyuan");
            utils.timer.clearAll(this);
            this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            for (var i = 0; i < this._imgMask.length; i++) {
                egret.Tween.removeTweens(this._imgMask[i]);
            }
            if (this._startEff) {
                if (this._startEff.parent) {
                    this._startEff.parent.removeChild(this._startEff);
                }
                this._startEff.stop();
                utils.ObjectPool.to(this._startEff, true);
                this._startEff = null;
            }
            if (this._moveEff) {
                egret.Tween.removeTweens(this._moveEff);
                if (this._moveEff.parent) {
                    this._moveEff.parent.removeChild(this._moveEff);
                }
                this._moveEff.stop();
                utils.ObjectPool.to(this._moveEff, true);
                this._moveEff = null;
            }
            GameModels.chapter.resetState(this, function () {
                app.gameContext.enterChapterBoss("", true);
            });
        };
        WelcomeDialog.prototype.onClick = function (e) {
            mg.uiManager.remove(this);
        };
        return WelcomeDialog;
    }(ui.WelcomeDialogSkin));
    dialog.WelcomeDialog = WelcomeDialog;
    __reflect(WelcomeDialog.prototype, "dialog.WelcomeDialog");
})(dialog || (dialog = {}));
