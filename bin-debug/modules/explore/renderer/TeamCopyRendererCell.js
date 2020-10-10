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
    var TeamCopyRendererCell = (function (_super) {
        __extends(TeamCopyRendererCell, _super);
        function TeamCopyRendererCell() {
            var _this = _super.call(this) || this;
            _this.labLook.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_CKGL);
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        TeamCopyRendererCell.prototype.dataChanged = function () {
            if (this.data && this.data instanceof vo.CopyVO) {
                var vo_1 = this.data;
                var rewards = vo_1.template.dropShow.split(";");
                var index = 0;
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                var tmp = Templates.getTemplateById(templates.Map.OTHERMONSTER, vo_1.template.boss);
                this.bossHead.source = ResPath.getBossIconSmall(tmp.resId);
                this.labName.text = vo_1.template.name;
                this.labDes.text = vo_1.template.parm1;
                this.labTips.visible = false;
                var currStep = GameModels.copyMaterial.currStep();
                if (currStep > vo_1.step) {
                    this.btnAtt.label = Language.C_YTG;
                    this.btnAtt.touchEnabled = false;
                    this.btnAtt.filters = utils.filterUtil.grayFilters;
                }
                else {
                    if (currStep == vo_1.step) {
                        this.btnAtt.label = Language.C_TZ;
                        this.btnAtt.touchEnabled = true;
                        this.btnAtt.filters = null;
                        this.labTips.visible = true;
                        this.labTips.text = Language.getExpression(Language.E_XYDJ, tmp.lv);
                        this.labTips.textColor = GameModels.user.player.level >= tmp.lv ? TypeColor.GREEN1 : TypeColor.RED1;
                    }
                    else {
                        this.btnAtt.label = Language.C_TZ;
                        this.btnAtt.touchEnabled = false;
                        this.btnAtt.filters = utils.filterUtil.grayFilters;
                        if ((currStep + 1) == vo_1.step) {
                            this.labTips.visible = true;
                            this.labTips.text = Language.J_TGSYGKQ;
                            this.labTips.textColor = 0xFF8F16;
                        }
                    }
                }
                this.btnAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                // this.labLook.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
                this.bossHead.source = null;
                this.btnAtt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                // this.labLook.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
            }
        };
        TeamCopyRendererCell.prototype.enterHandler = function (e) {
            switch (e.currentTarget) {
                case this.btnAtt:
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    GameModels.copyMaterial.sendTeamCreateRoom(this.data.id);
                    break;
            }
        };
        return TeamCopyRendererCell;
    }(ui.TeamCopyRendererSkin));
    renderer.TeamCopyRendererCell = TeamCopyRendererCell;
    __reflect(TeamCopyRendererCell.prototype, "renderer.TeamCopyRendererCell");
})(renderer || (renderer = {}));
