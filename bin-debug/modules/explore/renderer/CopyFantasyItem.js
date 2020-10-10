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
    var CopyFantasyItem = (function (_super) {
        __extends(CopyFantasyItem, _super);
        function CopyFantasyItem() {
            return _super.call(this) || this;
        }
        CopyFantasyItem.prototype.onRemoveStage = function (e) {
            if (this._intervalID) {
                egret.clearInterval(this._intervalID);
                this._intervalID = 0;
            }
        };
        CopyFantasyItem.prototype.dataChanged = function () {
            var copyVO = this.data;
            if (this.data) {
                this.imgWarn.visible = false;
                this.labBossName.text = copyVO.template.name;
                this.labBossLv.text = "lv." + copyVO.template.openLv;
                var level = GameModels.user.player.level;
                if (level >= copyVO.openLevel && level <= copyVO.endLevel) {
                    this.labtime0.text = "";
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
                        this.labtime0.text = utils.DateUtil.formatTimeLeft(this._lastTime);
                        this._intervalID = egret.setInterval(function () {
                            this.refreshLastTime();
                        }, this, 1000);
                    }
                    if (copyVO.bossHP > 0 && GameModels.copyBoss.dongWuZhengBaBossCount > 0) {
                        this.imgWarn.visible = true;
                    }
                }
                else {
                    this.gpTime.visible = false;
                    this.progressFantasyBoss.visible = false;
                }
            }
            else {
                this.imgWarn.visible = false;
                this.labBossName.text = "";
                this.onRemoveStage(null);
            }
        };
        CopyFantasyItem.prototype.refreshLastTime = function () {
            if (this._lastTime <= 0) {
                this.onRemoveStage(null);
                this.gpTime.visible = false;
                this.progressFantasyBoss.visible = true;
                this.labtime0.text = "";
                this.progressFantasyBoss.maximum = this.data.templateBoss.HP;
                this.progressFantasyBoss.value = this.data.bossHP;
                return;
            }
            this.labtime0.text = utils.DateUtil.formatTimeLeft(this._lastTime);
            this._lastTime--;
        };
        return CopyFantasyItem;
    }(ui.CopyFantasyItemSkin));
    renderer.CopyFantasyItem = CopyFantasyItem;
    __reflect(CopyFantasyItem.prototype, "renderer.CopyFantasyItem");
})(renderer || (renderer = {}));
