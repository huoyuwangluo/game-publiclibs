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
var FightLoading = (function (_super) {
    __extends(FightLoading, _super);
    function FightLoading() {
        var _this = _super.call(this) || this;
        _this._numArr = [1, 2, 3, 4, 6, 7, 8, 9];
        _this.resArr = [];
        return _this;
    }
    FightLoading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.markDestoryImage(this.imgBg);
        this._progressWidth = this.progress.width;
        this._progressMainWidth = this.progressMain.width;
    };
    Object.defineProperty(FightLoading, "instance", {
        get: function () {
            if (!FightLoading._instance) {
                FightLoading._instance = new FightLoading();
            }
            return FightLoading._instance;
        },
        enumerable: true,
        configurable: true
    });
    FightLoading.prototype.destory = function () {
        RES.destroyRes('img_loding_png', true);
        RES.destroyRes('loading_json', true);
    };
    FightLoading.prototype.add = function (call, handler) {
        if (call === void 0) { call = null; }
        if (handler === void 0) { handler = null; }
        if (this.parent)
            return;
        this.unloadFirstBattleRes();
        this._call = call;
        this._handler = handler;
        this._progress = 0;
        this._progressMain = 0;
        egret.Tween.removeTweens(this.black);
        mg.layerManager.loading.addChild(this);
        this.updateProgressMain(0);
        this.updateProgress(0);
        this.black.visible = true;
        var num1 = Math.floor(Math.random() * (this._numArr.length - 1));
        this.imgHongYan.source = "img_stepGril_" + this._numArr[num1] + "_png";
        if (GameModels.platform.isPay) {
            var tips = "";
            var tempList = Templates.getList(templates.Map.LOADINGHELP);
            for (var i = tempList.length - 1; i >= 0; i--) {
                if (GameModels.user.player.level <= tempList[i].maxLv && GameModels.user.player.level >= tempList[i].minLv) {
                    tips = tempList[i].helpContents;
                    break;
                }
            }
            var strArr = tips.split(";");
            var num = Math.floor(Math.random() * (strArr.length - 1));
            this.labTip.text = strArr[num];
        }
        else {
            var tipContents = [Language.J_LOADING_TEXT1, Language.J_LOADING_TEXT2, Language.J_LOADING_TEXT3, Language.J_LOADING_TEXT4, Language.J_LOADING_TEXT5];
            var tipContentsNum = Math.floor(Math.random() * (tipContents.length - 1));
            this.labTip.text = tipContents[tipContentsNum];
        }
        this.labTipRefesh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refeshHandler, this);
        mg.stageManager.onResize(this, this.resizeHandler, true);
        utils.timer.once(8000, this, this.callFun, false);
        this.loadFirstBattleRes();
    };
    FightLoading.prototype.remove = function () {
        if (!this.parent)
            return;
        this._call = this._handler = null;
        utils.timer.clear(this, this.callFun);
        //this.unloadFirstBattleRes();
        utils.timer.once(500, this, this.removeHandler);
    };
    FightLoading.prototype.callFun = function () {
        this.updateProgressMain(1);
        this.updateProgress(1);
        if (this._call && this._handler) {
            this._handler.call(this._call);
            this.remove();
        }
    };
    FightLoading.prototype.removeHandler = function () {
        this.remveEff();
        this.black.visible = false;
        this.imgHongYan.source = null;
        this.labTipRefesh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refeshHandler, this);
        mg.stageManager.offResize(this, this.resizeHandler);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    FightLoading.prototype.loadFirstBattleRes = function () {
        this.resArr = [];
        this._count = 0;
        var countSelf = 0;
        var selfPetIds = [];
        var otherPetIds = [];
        this._totalCount = 0;
        var isHashRole = false;
        for (var i = 0; i < GameModels.scene.selfPetId.length; i++) {
            if (GameModels.scene.selfPetId[i] == 13000) {
                isHashRole = true;
                continue;
            }
            var temp = Templates.getTemplateById(templates.Map.GENERAL, GameModels.scene.selfPetId[i]);
            if (selfPetIds.indexOf(temp.model)) {
                selfPetIds.push(temp.model);
                this.loadBattleOneModel(temp.model, 1);
            }
        }
        for (var i = 0; i < GameModels.scene.otherPetId.length; i++) {
            if (GameModels.scene.otherPetId[i] == 13000)
                continue;
            var temp = Templates.getTemplateById(templates.Map.GENERAL, GameModels.scene.otherPetId[i]);
            if (otherPetIds.indexOf(temp.model)) {
                otherPetIds.push(temp.model);
                this.loadBattleOneModel(temp.model, 3);
            }
        }
        var corps = [1859, 1869, 1880, 1867, 1929];
        for (var i = 0; i < corps.length; i++) {
            this.loadBattleOneModel(corps[i] + "", 1);
            this.loadBattleOneModel(corps[i] + "", 3);
        }
        if (isHashRole) {
            this.loadPlayerBattleRes();
        }
    };
    FightLoading.prototype.unloadFirstBattleRes = function () {
        for (var i = 0; i < this.resArr.length; i++) {
            this.resArr[i].offReference(this, this.onLoadBattleOneRes);
            this.resArr[i] = null;
        }
        this.resArr = [];
    };
    FightLoading.prototype.loadPlayerBattleRes = function () {
        var cloth = "";
        var weapon = "";
        var wing = "";
        var playerVO = GameModels.user.player;
        if (playerVO != null) {
            var fashionCloth = playerVO.getProperty(TypeProperty.FASHION_CLOTH);
            if (fashionCloth) {
                var templateCloth = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionCloth);
                if (templateCloth) {
                    cloth = templateCloth.modelId;
                    this.loadBattleOneModel(templateCloth.modelId, 1);
                }
            }
            else {
                cloth = GameModels.user.player.clothResId;
                this.loadBattleOneModel(GameModels.user.player.clothResId, 1);
            }
            var fashionWeapon = playerVO.getProperty(TypeProperty.FASHION_WEAPON);
            if (fashionWeapon) {
                var templateWeapon = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionWeapon);
                if (templateWeapon) {
                    weapon = templateWeapon.modelId;
                    this.loadBattleOneModel(templateWeapon.modelId, 1);
                }
            }
            else {
                weapon = GameModels.user.player.weaponResId;
                this.loadBattleOneModel(GameModels.user.player.weaponResId, 1);
            }
            var fashionWing = playerVO.getProperty(TypeProperty.WING_MODLEID);
            if (fashionWing > 0) {
                wing = "" + fashionWing;
                this.loadWingModel("" + fashionWing, 1);
            }
            var fashionHose = playerVO.getProperty(TypeProperty.FASHION_HORSE);
            if (fashionHose) {
                var tempfashio = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionHose);
                if (tempfashio) {
                    var temp = Templates.getTemplateByProperty(templates.Map.ZHANQI, "model", tempfashio.modelId);
                    if (temp) {
                        this.loadHoseModel(temp.model, 1, cloth, weapon, wing);
                    }
                }
            }
        }
    };
    FightLoading.prototype.loadHoseModel = function (resId, direct, cloth, weapon, wing) {
        this.loadBattleOneRes(resId + "_0000_" + direct);
        this.loadBattleOneRes(resId + "_0200_" + direct);
        this._totalCount += 2;
        if (cloth) {
            this.loadBattleOneRes(cloth + "_1200_" + direct);
            this._totalCount++;
        }
        if (weapon) {
            this.loadBattleOneRes(weapon + "_1200_" + direct);
            this._totalCount++;
        }
        if (wing) {
            this.loadBattleOneRes(wing + "_1200_" + direct);
            this._totalCount++;
        }
    };
    FightLoading.prototype.loadWingModel = function (resId, direct) {
        this.loadBattleOneRes(resId + "_0000_" + direct);
        this.loadBattleOneRes(resId + "_0200_" + direct);
        this._totalCount += 2;
    };
    FightLoading.prototype.loadBattleOneModel = function (resId, direct) {
        this.loadBattleOneRes(resId + "_0000_" + direct);
        this.loadBattleOneRes(resId + "_0200_" + direct);
        this.loadBattleOneRes(resId + "_0300_" + direct);
        this._totalCount += 3;
    };
    FightLoading.prototype.loadBattleOneRes = function (name) {
        var resData = mg.assetsManager.reciveAnimationData(game.TypeAnimaAsset.ACTOR_DIRECT_5, name);
        resData.holdReference(this, this.onLoadBattleOneRes);
        this.resArr.push(resData);
    };
    FightLoading.prototype.onLoadBattleOneRes = function (data) {
        this._count++;
        if (this._count >= this._totalCount) {
            this._count = this._totalCount;
            if (this._call && this._handler) {
                this._handler.call(this._call);
                this.remove();
            }
            this.updateProgressMain(1);
            this.updateProgress(1);
            return;
        }
        this.updateProgressMain(this._count / this._totalCount);
        this.updateProgress(this._count / this._totalCount);
    };
    FightLoading.prototype.refeshHandler = function () {
        window.location.reload();
    };
    FightLoading.prototype.updateProgressMain = function (value) {
        this._progressMain = value;
        if (this._progressMain > 1)
            this._progressMain = 1;
        this.addEff();
        this.updateMain();
    };
    FightLoading.prototype.updateProgress = function (value) {
        this._progress = value;
        if (this._progress > 1)
            this._progress = 1;
        this.update();
    };
    FightLoading.prototype.updateMain = function () {
        this.progressMain.width = (this._progressMain * this._progressMainWidth) >> 0;
        this._effect.x = this.progressMain.x + this.progressMain.width;
        this._effect.y = this.progressMain.y;
        this.labValueMain.text = ((this._progressMain * 100) >> 0) <= 100 ? ((this._progressMain * 100) >> 0) + "%" : "100%";
        this.validateNow();
    };
    FightLoading.prototype.update = function () {
        this.progress.width = (this._progress * this._progressWidth) >> 0;
    };
    FightLoading.prototype.resizeHandler = function (w, h) {
        this.black.width = w;
        this.black.height = h;
        this.width = w;
        this.height = h;
        this.bar.x = w / 2 - this.bar.width / 2;
        this.progress.x = w / 2 - this._progressWidth / 2;
        this.barMain.x = w / 2 - this.barMain.width / 2;
        this.progressMain.x = w / 2 - this._progressMainWidth / 2;
        this.labValueMain.x = this.bar.x + this.bar.width - this.labValueMain.width;
    };
    FightLoading.prototype.addEff = function () {
        if (!this._effect) {
            this._effect = this.fromEffect("202003");
            this._effect.play();
            this.addChild(this._effect);
        }
    };
    FightLoading.prototype.remveEff = function () {
        if (this._effect) {
            if (this._effect.parent) {
                this._effect.parent.removeChild(this._effect);
            }
            this._effect.stop();
            utils.ObjectPool.to(this._effect, true);
            this._effect = null;
        }
    };
    return FightLoading;
}(ui.FightLoadingSkin));
__reflect(FightLoading.prototype, "FightLoading");
