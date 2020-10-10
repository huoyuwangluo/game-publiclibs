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
var SmithyTalentAlert = (function (_super) {
    __extends(SmithyTalentAlert, _super);
    function SmithyTalentAlert() {
        return _super.call(this) || this;
    }
    SmithyTalentAlert.prototype.show = function (tem) {
        this._id = tem.id;
        this.labName.text = tem.name;
        this.labDes.text = tem.des;
        this.imgIcon.source = "exploreShenBing_json.img_exploreShenBingTalent" + tem.pos;
        this.labCount.text = GameModels.smithy.talentPoint + "/" + tem.needNum;
        if (GameModels.smithy.talentPoint >= tem.needNum) {
            this.labCount.textColor = 0x00ff00;
        }
        else {
            this.labCount.textColor = 0xff0000;
        }
        if (GameModels.smithy.hashTalentById(tem.id)) {
            this.btnJiHuo.label = Language.C_YJH;
            this.btnJiHuo.touchEnabled = false;
            this.btnJiHuo.filters = utils.filterUtil.grayFilters;
            if (tem.type == 1 && GameModels.smithy.getShenBinIdByTalent(tem.id) > 0) {
                var temitem = Templates.getTemplateById(templates.Map.ITEM, GameModels.smithy.getShenBinIdByTalent(tem.id));
                var str = Language.getExpression(Language.E_SBDZ, temitem.name, Language.C_DZMB);
                this.labDes.textFlow = (new egret.HtmlTextParser).parser(str);
            }
        }
        else {
            this.btnJiHuo.label = Language.C_JH;
            this.btnJiHuo.touchEnabled = true;
            this.btnJiHuo.filters = null;
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnJiHuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    SmithyTalentAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnJiHuo:
                GameModels.smithy.requestSmithyActiveTalent(this._id, utils.Handler.create(this, this.endView));
                break;
        }
    };
    SmithyTalentAlert.prototype.endView = function () {
        mg.alertManager.tip(Language.C_YJCG);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    SmithyTalentAlert.prototype.hide = function () {
        this._id = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnJiHuo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SmithyTalentAlert;
}(ui.SmithyTalentAlertSkin));
__reflect(SmithyTalentAlert.prototype, "SmithyTalentAlert", ["IAlert", "egret.DisplayObject"]);
