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
var JifenGiftAlert = (function (_super) {
    __extends(JifenGiftAlert, _super);
    function JifenGiftAlert() {
        return _super.call(this) || this;
    }
    JifenGiftAlert.prototype.show = function (id, isSucces) {
        this.labDes.visible = false;
        this.labDes0.visible = false;
        this.labName.visible = false;
        this.labName0.visible = false;
        this.labDes1.visible = false;
        var rewardImg = [this.reward0, this.reward1, this.reward2];
        var mailData = Templates.getTemplateById(templates.Map.GAMEMAIL, id);
        if (mailData) {
            var str = mailData.rewards.split(";");
            for (var i = 0; i < 3; i++) {
                if (str[i])
                    rewardImg[i].dataSource = str[i];
            }
        }
        if (id == 60208) {
            this.labName.visible = true;
        }
        else {
            this.labName0.visible = true;
        }
        if (isSucces == true) {
            this.labDes.visible = true;
        }
        else {
            if (id == 60208) {
                this.labDes0.visible = true;
            }
            else {
                this.labDes1.visible = true;
            }
            this.labName.visible = false;
            this.labName0.visible = false;
        }
    };
    JifenGiftAlert.prototype.hide = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return JifenGiftAlert;
}(ui.JifenGiftAlertSkin));
__reflect(JifenGiftAlert.prototype, "JifenGiftAlert", ["IAlert", "egret.DisplayObject"]);
