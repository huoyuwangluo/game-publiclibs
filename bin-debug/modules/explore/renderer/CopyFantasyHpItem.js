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
    var CopyFantasyHpItem = (function (_super) {
        __extends(CopyFantasyHpItem, _super);
        function CopyFantasyHpItem() {
            var _this = _super.call(this) || this;
            _this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onRemoveStage, _this);
            return _this;
        }
        CopyFantasyHpItem.prototype.onRemoveStage = function (e) {
            if (this._intervalID) {
                egret.clearInterval(this._intervalID);
                this._intervalID = 0;
            }
        };
        CopyFantasyHpItem.prototype.dataChanged = function () {
            var copyVO = this.data;
            if (this.data) {
                this.imgWarn.visible = false;
                this.labBossName.text = "" + copyVO.template.name;
                this.labBossLv.text = "lv." + copyVO.template.openLv + "-" + "Lv." + copyVO.template.endLv;
                var level = GameModels.user.player.level;
                if (level >= copyVO.openLevel && level <= copyVO.endLevel) {
                    this.imgTip.source = "img_fantasy_fight_png";
                    this.labtime.text = "";
                    this.progressFantasyBoss.maximum = utils.htmlUtil.getTemplateAndNameToValue(copyVO.templateBoss.properties, "HP");
                    this.progressFantasyBoss.value = copyVO.bossHP;
                    this._lastTime = copyVO.bossCd - (GameModels.timer.getTimer() * .001) >> 0;
                    if (this._lastTime <= 0) {
                        this.gpTime.visible = false;
                        this.progressFantasyBoss.visible = true;
                    }
                    else {
                        this.onRemoveStage(null);
                        this.gpTime.visible = true;
                        this.progressFantasyBoss.visible = false;
                        this.labtime.text = utils.DateUtil.formatTimeLeft(this._lastTime);
                        this._intervalID = egret.setInterval(function () {
                            this.refreshLastTime();
                        }, this, 1000);
                    }
                    if (copyVO.bossHP > 0 && GameModels.copyBoss.dongWuZhengBaBossCount > 0) {
                        this.imgWarn.visible = true;
                    }
                }
                else {
                    if (level > copyVO.endLevel) {
                        this.imgTip.source = "img_fantasy_miss_png";
                    }
                    else {
                        this.imgTip.source = "img_fantasy_lock_png";
                    }
                    this.gpTime.visible = false;
                    this.progressFantasyBoss.visible = false;
                }
            }
            else {
                this.labBossName.text = "";
                this.onRemoveStage(null);
            }
        };
        CopyFantasyHpItem.prototype.refreshLastTime = function () {
            if (this._lastTime <= 0) {
                this.onRemoveStage(null);
                this.gpTime.visible = false;
                this.progressFantasyBoss.visible = true;
                this.labtime.text = "";
                this.progressFantasyBoss.maximum = this.data.templateBoss.HP;
                this.progressFantasyBoss.value = this.data.bossHP;
                return;
            }
            this.labtime.text = utils.DateUtil.formatTimeLeft(this._lastTime);
            this._lastTime--;
        };
        return CopyFantasyHpItem;
    }(ui.CopyFantasyHpItemSkin));
    renderer.CopyFantasyHpItem = CopyFantasyHpItem;
    __reflect(CopyFantasyHpItem.prototype, "renderer.CopyFantasyHpItem");
})(renderer || (renderer = {}));
