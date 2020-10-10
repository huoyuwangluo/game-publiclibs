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
var LegionTaskRenderer = (function (_super) {
    __extends(LegionTaskRenderer, _super);
    function LegionTaskRenderer() {
        return _super.call(this) || this;
    }
    LegionTaskRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveClick, this);
    };
    LegionTaskRenderer.prototype.receiveClick = function (e) {
        var _this = this;
        if (utils.CheckUtil.checkBagSmelting())
            return;
        if (this.data.state == 2) {
            if (this.data.achievetemplate instanceof templates.taskDay) {
                GameModels.achievement.requestQstReceive(this.data.achievetemplate.type, utils.Handler.create(this, function (data) {
                    var view = mg.uiManager.getView(dialog.legion.LegionTaskMain);
                    view.legionTask.receiveCall(true);
                    var endPos = view.legionTask.getTaskProgressPos();
                    var startPos = _this.labJindu.localToGlobal(20);
                    if (endPos && startPos) {
                        _this.playProgressValueAni(startPos, endPos);
                    }
                }));
            }
        }
        else {
            mg.uiManager.showByName(this.data.achievetemplate.functionId, this.data.achievetemplate.functionParams);
        }
    };
    LegionTaskRenderer.prototype.playProgressValueAni = function (startPosition, endPos) {
        mg.effectManager.flyEffects("6199", 10, startPosition, endPos, mg.layerManager.top);
    };
    LegionTaskRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            mg.effectManager.unbindEffect(this.btnReceive);
            if (this.data.state == 3) {
                this.btnReceive.visible = false;
                this.imgfinsh.visible = true;
            }
            else if (this.data.state == 2) {
                this.imgfinsh.visible = false;
                this.btnReceive.skinName = "skins.SnapSmallButton5Skin";
                this.btnReceive.visible = true;
                this.btnReceive.label = Language.C_LQ;
                mg.effectManager.bindEffect(this.btnReceive, TypeEffectId.BUTTON_EFF_SAMLL1);
            }
            else if (this.data.state == 1) {
                this.imgfinsh.visible = false;
                this.btnReceive.skinName = "skins.SnapSmallButton4Skin";
                this.btnReceive.visible = true;
                this.btnReceive.label = Language.C_QW;
            }
            if (this.data.achievetemplate instanceof templates.taskDay) {
                this.labHuoyue.text = Language.C_HY + ":" + this.data.achievetemplate.value.toString();
                this.labName.text = this.data.itemsVO[0].name + ":" + this.data.itemsVO[0].count.toString();
                this.labName0.text = ""; //(this.data as vo.AchievenmentVO).itemsVO[1].name + ":" + (this.data as vo.AchievenmentVO).itemsVO[1].count.toString();
                this.taskIcon.source = "taskicon_json." + this.data.achievetemplate.icon;
                this.labJinduName.text = this.data.achievetemplate.name + ":";
                this.labJindu.x = this.labJinduName.x + this.labJinduName.width + 5;
                this.labJindu.text = this.data.progressNum + "/" + this.data.achievetemplate.needTimes;
                this.labJindu.textColor = this.data.progressNum >= this.data.achievetemplate.needTimes ? TypeColor.GREEN : TypeColor.RED;
            }
        }
        else {
            if (this.btnReceive)
                mg.effectManager.unbindEffect(this.btnReceive);
        }
    };
    LegionTaskRenderer.prototype.shenjiStr = function (grade) {
        var gold = grade / 1000 >> 0;
        if (gold > 0) {
            return Language.getExpression(Language.E_S1, gold);
        }
        return grade.toString();
    };
    return LegionTaskRenderer;
}(ui.LegionTaskRendererSkin));
__reflect(LegionTaskRenderer.prototype, "LegionTaskRenderer");
