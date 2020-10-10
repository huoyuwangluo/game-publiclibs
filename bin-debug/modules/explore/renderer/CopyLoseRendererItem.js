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
    var CopyLoseRendererItem = (function (_super) {
        __extends(CopyLoseRendererItem, _super);
        function CopyLoseRendererItem() {
            return _super.call(this) || this;
        }
        CopyLoseRendererItem.prototype.initializeData = function (vo) {
            if (this._copyVO) {
                this._copyVO = vo;
                this.updateData();
                return;
            }
            this._copyVO = vo;
            this.labBossName.text = this._copyVO.bossName;
            this.labLv.text = this._copyVO.template.openLv + "";
            var award = this._copyVO.template.dropShow.split(";");
            this.reward1.dataSource = award[0];
            this.reward2.dataSource = award[1];
            this.bossHead.source = ResPath.getShowBossHalfPath(this._copyVO.templateBoss.resId);
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
            this._time1 = GameModels.copyBoss.getOpenTimeRemind(this._copyVO);
            this._time2 = this._copyVO.refreshTime;
            this._isOpened = this._copyVO.isOpened;
            utils.timer.loop(1000, this, this.updateData);
            this.updateData();
        };
        CopyLoseRendererItem.prototype.updateData = function () {
            this.btnEnter.filters = utils.filterUtil.grayFilters;
            this.btnEnter.touchEnabled = false;
            if (this._time1 == 0) {
                this.RecoverTime.text = Language.J_HDWKQ;
                this.RecoverTime.textColor = 0xB6281A;
                this._Preparation = false;
            }
            else {
                this.RecoverTime.text = Language.getExpression(Language.E_1HKQ, utils.DateUtil.formatTimeLeft(this._time1));
                this.RecoverTime.textColor = 0x34E22C;
                this._Preparation = true;
            }
            if (this._isOpened) {
                if (this._time2 > 0) {
                    this.RecoverTime.text = Language.getExpression(Language.E_1HFH, utils.DateUtil.formatTimeLeft(this._time2));
                    this.RecoverTime.textColor = 0xB6281A;
                    this.bossHead.filters = utils.filterUtil.grayFilters;
                    this._Preparation = true;
                }
                else {
                    this.RecoverTime.text = Language.C_CH;
                    this.RecoverTime.textColor = 0x34E22C;
                    if (GameModels.user.myConfigLevel >= this._copyVO.openLevel) {
                        this.btnEnter.filters = null;
                        this.btnEnter.touchEnabled = true;
                    }
                    this.bossHead.filters = null;
                    this._Preparation = false;
                }
            }
            else {
                this.bossHead.filters = utils.filterUtil.grayFilters;
            }
            if (this._time1 > 0) {
                this._time1--;
                if (this._time1 == 0) {
                    this.updateOpen();
                }
            }
            if (this._time2 > 0) {
                this._time2--;
                if (this._time2 == 0) {
                    this.updateOpen();
                }
            }
            if (GameModels.user.myConfigLevel >= this._copyVO.openLevel) {
                this.btnEnter.label = Language.C_TZ;
            }
            else {
                this.btnEnter.label = Language.getExpression(Language.E_1KTZ, convert.getLevelName(this._copyVO.openLevel));
            }
        };
        CopyLoseRendererItem.prototype.onEnterClick = function (e) {
            if (GameModels.copyBoss.zhuLuZhongYuanBossCount <= 0) {
                mg.alertManager.tip(Language.J_JRTZCS);
                return;
            }
            if (GameModels.user.myConfigLevel < this._copyVO.openLevel) {
                mg.alertManager.tip(Language.getExpression(Language.E_XYDJ1TZ, convert.getLevelName(this._copyVO.openLevel)));
                return;
            }
            //app.gameContext.enterLoseBoss(this._copyVO);
        };
        CopyLoseRendererItem.prototype.updateOpen = function () {
            if (this._Preparation) {
                this._isOpened = true;
            }
        };
        CopyLoseRendererItem.prototype.clear = function () {
            if (this._copyVO) {
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                utils.timer.clearAll(this);
                this.reward1.dataSource = null;
                this.reward2.dataSource = null;
                this.bossHead.filters = null;
                this._copyVO = null;
            }
        };
        return CopyLoseRendererItem;
    }(ui.CopyLoseRendererSkin));
    renderer.CopyLoseRendererItem = CopyLoseRendererItem;
    __reflect(CopyLoseRendererItem.prototype, "renderer.CopyLoseRendererItem");
})(renderer || (renderer = {}));
