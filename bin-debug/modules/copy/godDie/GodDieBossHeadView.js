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
var renderer;
(function (renderer) {
    var GodDieBossHeadView = (function (_super) {
        __extends(GodDieBossHeadView, _super);
        function GodDieBossHeadView() {
            var _this = _super.call(this) || this;
            _this._time = 0;
            return _this;
        }
        GodDieBossHeadView.prototype.initialize = function () {
        };
        GodDieBossHeadView.prototype.initializeData = function (data) {
            this.reset();
            this._gameMonsterVO = null;
            this._isPlayering = false;
            this.imgRed.visible = false;
            egret.Tween.removeTweens(this.imgRed);
            if (data) {
                this._bossVo = data;
                this.legionWuDi.visible = false;
                this.imgSelected.visible = false;
                this.wudiGroup.visible = false;
                this.imgWuDi.visible = false;
                this.labWuDiTime.visible = false;
                if (data instanceof n.ProtoShenYunZhiDiBoss) {
                    var bossData = GameModels.sceneGodDie.getMonsterData(data.MonsterId);
                    this.head.source = ResPath.getBossIconSmall(bossData.resId);
                    this.labName.text = "Lv." + bossData.lv;
                    this._time = data.RefreshTime;
                    this.labVP.text = bossData.parm2.split("_")[1];
                    this.updateTime();
                    utils.timer.loop(1000, this, this.updateTime);
                }
                else {
                    var bossData1 = Templates.getTemplateById(templates.Map.OTHERMONSTER, this._bossVo);
                    this.head.source = ResPath.getBossIconSmall(bossData1.resId);
                    this.labName.text = bossData1.name;
                    var sightMonsters = GameModels.sceneLegin.getAllBosses();
                    var useBossList = GameModels.sceneLegin.useBossList;
                    var bossList = GameModels.sceneLegin.bossList;
                    var leftTimeArr = GameModels.sceneLegin.bossListleftWuDiCnt;
                    var isUse = false;
                    var isIng = false;
                    var index = 0;
                    var leftTime = 0;
                    for (var i = 0; i < sightMonsters.length; i++) {
                        if (sightMonsters[i].configId == bossData1.id && sightMonsters[i].hp > 0) {
                            this._gameMonsterVO = sightMonsters[i];
                            isUse = useBossList.indexOf(this._gameMonsterVO.sceneObjectId) != -1;
                            isIng = bossList.indexOf(this._gameMonsterVO.sceneObjectId) != -1;
                            if (isIng) {
                                index = bossList.indexOf(this._gameMonsterVO.sceneObjectId);
                                leftTime = leftTimeArr[index];
                            }
                        }
                    }
                    if (this._gameMonsterVO) {
                        this.imgSelected.visible = isUse;
                        this.wudiGroup.visible = isIng;
                        if (isIng && leftTime > 0) {
                            this.imgWuDi.visible = true;
                            this.labWuDiTime.visible = true;
                            this._time = leftTime;
                            this.updateTime();
                            utils.timer.loop(1000, this, this.updateTime);
                        }
                        this.hp.value = (this._gameMonsterVO.hp / this._gameMonsterVO.battleHpMax) * 100;
                        this.filters = this._gameMonsterVO.hp > 0 ? null : utils.filterUtil.grayFilters;
                        this._gameMonsterVO.onPropertyChange(TypeProperty.Hp, this, this.updateHp);
                    }
                    else {
                        this._time = 0;
                        this.hp.value = 0;
                        this.filters = utils.filterUtil.grayFilters;
                    }
                }
            }
        };
        GodDieBossHeadView.prototype.playTween = function (playIng) {
            this.imgRed.visible = true;
            egret.Tween.get(this.imgRed).to({ alpha: playIng ? 0 : 1 }, 500, utils.Ease.circOut).call(this.playTween, this, [!playIng]);
        };
        GodDieBossHeadView.prototype.stopTween = function () {
            this.imgRed.visible = false;
            this._isPlayering = false;
            egret.Tween.removeTweens(this.imgRed);
        };
        GodDieBossHeadView.prototype.updateHp = function () {
            if (this._gameMonsterVO) {
                this.hp.value = (this._gameMonsterVO.hp / this._gameMonsterVO.battleHpMax) * 100;
                if (this._gameMonsterVO.hp <= 0) {
                    this.imgRed.visible = false;
                    this._isPlayering = false;
                    egret.Tween.removeTweens(this.imgRed);
                    utils.timer.clear(this, this.stopTween);
                    this.filters = utils.filterUtil.grayFilters;
                }
                else {
                    if (!this._isPlayering) {
                        this._isPlayering = true;
                        this.playTween(true);
                    }
                    utils.timer.clear(this, this.stopTween);
                    utils.timer.once(3000, this, this.stopTween, true);
                }
            }
        };
        GodDieBossHeadView.prototype.updateTime = function () {
            if (this._time > 0) {
                this._time--;
            }
            if (this._time > 0) {
                this.labWuDiTime.text = utils.DateUtil.formatTimeLeft(this._time);
                this.labTime.text = utils.DateUtil.formatTimeLeft(this._time);
            }
            else {
                this.labTime.text = "";
                this.labWuDiTime.text = "";
                this.imgWuDi.visible = false;
            }
        };
        GodDieBossHeadView.prototype.disableHandler = function () {
            utils.timer.clearAll(this);
            egret.Tween.removeTweens(this.imgRed);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        GodDieBossHeadView.prototype.enableHandler = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        GodDieBossHeadView.prototype.initBtn = function () {
            if (this.legionWuDi.visible) {
                this.legionWuDi.visible = false;
            }
        };
        GodDieBossHeadView.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            if (e.target instanceof components.IconButton) {
                GameModels.sceneLegin.requestWarWuDi(this._gameMonsterVO.sceneObjectId);
            }
            else {
                switch (e.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        this.scaleX = this.scaleY = 1;
                        egret.Tween.get(this).to({
                            scaleX: 0.7,
                            scaleY: 0.7,
                        }, 300, utils.Ease.cubicOut);
                        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                        if (this._bossVo) {
                            if (this._bossVo instanceof n.ProtoShenYunZhiDiBoss) {
                                var sights = GameModels.sceneGodDie.getAllBosses();
                                var bossData = GameModels.sceneGodDie.getMonsterData(this._bossVo.MonsterId);
                                for (var i = 0; i < sights.length; i++) {
                                    if (sights[i].name == bossData.name) {
                                        var monsterVO = sights[i];
                                        break;
                                    }
                                }
                                if (!monsterVO) {
                                    mg.alertManager.tip(Language.getExpression(Language.E_GBOOSLXSSYSJ, utils.DateUtil.formatTimeLeft(this._time)), 0xFF0000);
                                    return;
                                }
                                var gameGodDie = app.gameContext.manager.getGameGodDie();
                                gameGodDie.startAttack(monsterVO);
                            }
                            else {
                                var useBossList = GameModels.sceneLegin.useBossList;
                                var bossList = GameModels.sceneLegin.bossList;
                                var sightMonsters = GameModels.sceneLegin.getAllBosses();
                                var bossData1 = Templates.getTemplateById(templates.Map.OTHERMONSTER, this._bossVo);
                                for (var i = 0; i < sightMonsters.length; i++) {
                                    if (sightMonsters[i].configId == bossData1.id) {
                                        var monsterVO1 = sightMonsters[i];
                                        copy.GameLegionWarUI.instance.updataSelected(sightMonsters[i].configId);
                                        if (GameModels.user.player.wuguanLevel <= 3) {
                                            if (monsterVO1 && monsterVO1.hp > 0) {
                                                var str = bossData1.id.toString();
                                                var s = str.substr(str.length - 1, 1);
                                                if (s == "1") {
                                                    mg.alertManager.tip(Language.J_SJBKWD);
                                                }
                                                else {
                                                    if (useBossList.indexOf(sightMonsters[i].sceneObjectId) == -1) {
                                                        if (bossList.indexOf(sightMonsters[i].sceneObjectId) == -1) {
                                                            this.wudiGroup.visible = true;
                                                            this.legionWuDi.visible = true;
                                                        }
                                                        else {
                                                            mg.alertManager.tip(Language.J_GTZCZWDZT);
                                                        }
                                                    }
                                                    else {
                                                        mg.alertManager.tip(Language.J_NYSYCTWD);
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                                if (!monsterVO1 || monsterVO1.hp <= 0) {
                                    var str = bossData1.id.toString();
                                    var s = str.substr(str.length - 1, 1);
                                    if (s == "1") {
                                        mg.alertManager.tip(Language.J_SJYBJS);
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_SJYBCH);
                                    }
                                    return;
                                }
                                copy.GameLegionWarUI.instance.updataClickTargetChange();
                                var gameLegionWar = app.gameContext.manager.getGameLegionFight();
                                gameLegionWar.startMove(monsterVO1.tileX, monsterVO1.tileY);
                            }
                        }
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                        if (this.stage)
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                        break;
                }
            }
        };
        return GodDieBossHeadView;
    }(ui.GodDieBossHead));
    renderer.GodDieBossHeadView = GodDieBossHeadView;
    __reflect(GodDieBossHeadView.prototype, "renderer.GodDieBossHeadView");
})(renderer || (renderer = {}));
