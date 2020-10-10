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
var copy;
(function (copy) {
    var GameCrossPetFightUI = (function (_super) {
        __extends(GameCrossPetFightUI, _super);
        function GameCrossPetFightUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(GameCrossPetFightUI, "instance", {
            get: function () {
                if (!GameCrossPetFightUI._instance) {
                    GameCrossPetFightUI._instance = new GameCrossPetFightUI();
                }
                return GameCrossPetFightUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameCrossPetFightUI.prototype.enter = function (battleScene) {
            this.ui.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._countDonwLastTime = 180;
            utils.timer.loop(1000, this, this.updateTime);
            this._myPets = [this.ui.petfight0, this.ui.petfight1, this.ui.petfight2];
            this._enemyPets = [this.ui.petfight3, this.ui.petfight4, this.ui.petfight5];
            this._myPetsHP = [this.ui.hp0, this.ui.hp1, this.ui.hp2];
            this._enemyPetsHP = [this.ui.hp3, this.ui.hp4, this.ui.hp5];
            this._myPetsThumb = [this.ui.thumb0, this.ui.thumb1, this.ui.thumb2];
            this._enemyPetsThumb = [this.ui.thumb3, this.ui.thumb4, this.ui.thumb5];
            this._myPetList = [];
            this._enemyList = [];
        };
        GameCrossPetFightUI.prototype.exit = function () {
            this.ui.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            utils.timer.clear(this, this.updateTime);
            for (var i = 0; i < 3; i++) {
                if (this._myPetList[i]) {
                    this._myPets[i].reset();
                }
            }
            for (var i = 0; i < 3; i++) {
                if (this._enemyList[i]) {
                    this._enemyPets[i].reset();
                }
            }
            for (var i = 0; i < this._myPetList.length; i++) {
                if (this._myPetList[i]) {
                    this._myPetList[i].offPropertyChange(TypeProperty.Hp, this, this.hpChange);
                    this._myPetList[i].offPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                }
            }
            for (var i = 0; i < this._enemyList.length; i++) {
                if (this._enemyList[i]) {
                    this._enemyList[i].offPropertyChange(TypeProperty.Hp, this, this.hpChange);
                    this._enemyList[i].offPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                }
            }
            this._myPets = [];
            this._enemyPets = [];
        };
        GameCrossPetFightUI.prototype.initMyPets = function (arr) {
            this._myPetList = arr;
            for (var i = 0; i < this._myPetList.length; i++) {
                this._myPetList[i].onPropertyChange(TypeProperty.Hp, this, this.hpChange);
                this._myPetList[i].onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            }
            this.hpChange();
            this.updateMyPets();
        };
        GameCrossPetFightUI.prototype.initEnemyPets = function (arr) {
            this._enemyList = arr;
            for (var i = 0; i < this._enemyList.length; i++) {
                this._enemyList[i].onPropertyChange(TypeProperty.Hp, this, this.hpChange);
                this._enemyList[i].onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            }
            this.updateEnemyPets();
        };
        GameCrossPetFightUI.prototype.updateMyPets = function () {
            for (var i = 0; i < 3; i++) {
                if (this._myPetList[i]) {
                    this._myPets[i].initializeData(this._myPetList[i], i);
                    this._myPets[i].visible = true;
                }
                else {
                    this._myPets[i].visible = false;
                }
            }
        };
        GameCrossPetFightUI.prototype.updateEnemyPets = function () {
            for (var i = 0; i < 3; i++) {
                if (this._enemyList[i]) {
                    this._enemyPets[i].initializeData(this._enemyList[i], i);
                    this._enemyPets[i].visible = true;
                }
                else {
                    this._enemyPets[i].visible = false;
                }
            }
        };
        GameCrossPetFightUI.prototype.hpChange = function () {
            for (var i = 0; i < 3; i++) {
                if (this._myPetList[i]) {
                    this._myPetsHP[i].visible = true;
                    this._myPetsThumb[i].width = (this._myPetList[i].hp / this._myPetList[i].hpMax) * 246;
                }
                else {
                    this._myPetsThumb[i].width = 0;
                }
                if (this._enemyList[i]) {
                    this._enemyPetsHP[i].visible = true;
                    this._enemyPetsThumb[i].width = (this._enemyList[i].hp / this._enemyList[i].hpMax) * 246;
                }
                else {
                    this._enemyPetsThumb[i].width = 0;
                }
            }
        };
        GameCrossPetFightUI.prototype.onBack = function (e) {
            var tip;
            tip = Language.J_TCHSKF;
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
        /**
         * ok特效
         *
         */
        GameCrossPetFightUI.prototype.showKO = function () {
            var effect = utils.ObjectPool.from(s.AnimationSprite);
            effect.resId = "6399";
            effect.x = mg.stageManager.stageWidth / 2;
            effect.y = mg.stageManager.stageHeight / 2;
            this.ui.addChild(effect);
            effect.frameRate = 6;
            effect.playOnce();
            effect.onCompleteOnce(this, function () {
                effect.stop();
                effect.reset();
                effect.parent.removeChild(effect);
            });
        };
        GameCrossPetFightUI.prototype.updateTime = function () {
            if (this._countDonwLastTime > 0) {
                this._countDonwLastTime--;
                var str = utils.DateUtil.formatTimeLeft(this._countDonwLastTime);
                str = str.substring(3, str.length);
                this.ui.labTime.text = str;
            }
            else {
                utils.timer.clear(this, this.updateTime);
            }
        };
        return GameCrossPetFightUI;
    }(copy.GameUIBase));
    copy.GameCrossPetFightUI = GameCrossPetFightUI;
    __reflect(GameCrossPetFightUI.prototype, "copy.GameCrossPetFightUI");
})(copy || (copy = {}));
