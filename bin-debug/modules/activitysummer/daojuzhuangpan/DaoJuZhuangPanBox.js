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
    var DaoJuZhuangPanBox = (function (_super) {
        __extends(DaoJuZhuangPanBox, _super);
        function DaoJuZhuangPanBox() {
            return _super.call(this) || this;
        }
        DaoJuZhuangPanBox.prototype.dataChanged = function () {
            if (this.data) {
                this.notAttain.visible = false;
                this.getVipBox.visible = false;
                if (this.data instanceof vo.ActivitySummerVO) {
                    var temp = this.data;
                    var str = temp.template.rewards.split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this.imgIcon.source = item.icon;
                    this.labCount.text = "" + str[1];
                    if (temp.holidayType == game.TypeSummerActivity.TASK) {
                        this.labJifen.text = temp.template.value + Language.C_JF;
                    }
                    else {
                        this.labJifen.text = temp.template.value + Language.Z_CI;
                    }
                    if (temp.holidayRewardState == 1) {
                        this.imgRedPoint.visible = true;
                    }
                    else if (temp.holidayRewardState == 2) {
                        this.imgRedPoint.visible = false;
                        // this.notAttain.visible = true;
                    }
                    else {
                        this.imgRedPoint.visible = false;
                        this.getVipBox.visible = true;
                    }
                }
                else {
                    var tempTemp = this.data;
                    this.labJifen.text = Language.C_TX + tempTemp.value + Language.Z_CI;
                    var str = tempTemp.rewards.split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this.imgIcon.source = item.icon;
                    this.labCount.text = "" + str[1];
                    if (tempTemp.target == "2") {
                        if (GameModels.jiangxing.getRawardInfo.indexOf(tempTemp.id) != -1) {
                            this.imgRedPoint.visible = false;
                            this.getVipBox.visible = true;
                        }
                        else {
                            if (GameModels.jiangxing.totalCount >= tempTemp.value) {
                                this.imgRedPoint.visible = true;
                            }
                            else {
                                this.imgRedPoint.visible = false;
                                //this.notAttain.visible = true;
                            }
                        }
                    }
                    else {
                        if (GameModels.tavern.getRawardInfo.indexOf(tempTemp.id) != -1) {
                            this.imgRedPoint.visible = false;
                            this.getVipBox.visible = true;
                        }
                        else {
                            if (GameModels.tavern.totalCount >= tempTemp.value) {
                                this.imgRedPoint.visible = true;
                            }
                            else {
                                this.imgRedPoint.visible = false;
                                //this.notAttain.visible = true;
                            }
                        }
                    }
                }
            }
        };
        return DaoJuZhuangPanBox;
    }(ui.DaoJuZhuangPanBoxSkin));
    renderer.DaoJuZhuangPanBox = DaoJuZhuangPanBox;
    __reflect(DaoJuZhuangPanBox.prototype, "renderer.DaoJuZhuangPanBox");
})(renderer || (renderer = {}));
