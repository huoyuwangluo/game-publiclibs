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
var tips;
(function (tips) {
    var BuZhenAlert = (function (_super) {
        __extends(BuZhenAlert, _super);
        function BuZhenAlert() {
            var _this = _super.call(this) || this;
            _this._skillIconArr = [_this.skillIcon1, _this.skillIcon2, _this.skillIcon3, _this.skillIcon4, _this.skillIcon5];
            _this._labNameArr = [_this.labName1, _this.labName2, _this.labName3, _this.labName4, _this.labName5];
            _this._labDesArr = [_this.labDes1, _this.labDes2, _this.labDes3, _this.labDes4, _this.labDes5];
            _this._labTextArr = [_this.labText1, _this.labText2, _this.labText3, _this.labText4, _this.labText5];
            _this._labTextArr1 = [_this.labText10, _this.labText20, _this.labText30, _this.labText40, _this.labText50];
            _this._labHideArr = [_this.labHide1, _this.labHide2, _this.labHide3, _this.labHide4, _this.labHide5];
            _this._labContentArr = [_this.labContent10, _this.labContent20, _this.labContent30, _this.labContent40, _this.labContent50];
            return _this;
        }
        Object.defineProperty(BuZhenAlert.prototype, "data", {
            /**data ={skillId:3,config:羁绊技配置}*/
            set: function (data) {
                this._currConfig = data.config ? data.config : GameModels.pet.getLegionSkillByGameType();
                if (data.skillId == 1 || data.skillId == 2) {
                    this.currentState = "2";
                    var temp = Templates.getTemplateById(templates.Map.CAMPJIBAN, data.skillId == 1 ? 101 : 201);
                    var sArr = temp.skill.split(";");
                    var skillNew = Templates.getTemplateById(templates.Map.SKILLNEW, data.skillId == 1 ? sArr[0] : sArr[sArr.length - 1]);
                    this.skillIcon1.source = "legionSkill_json.img_legionSkill_" + skillNew.id;
                    this.labName1.text = skillNew.name;
                    this.labDes1.text = skillNew.Desc;
                    this.labText1.textFlow = utils.htmlUtil.showProperty(temp.properties.split(";")[0]);
                    this.labText10.textFlow = utils.htmlUtil.showProperty(temp.properties.split(";")[1]);
                    this.skillIcon1.filters = utils.filterUtil.grayFilters;
                    this.labHide1.text = Language.C_JSTJ + ":";
                    this.labContent10.textColor = TypeColor.RED1;
                    this.labDes1.textColor = 0xd3d3d3;
                    this.labContent10.text = Language.C_SZ + Language.getExpression(Language.E_1M, temp.generalNum1) + (temp.needStar > 0 ? Language.getExpression(Language.E_1X, temp.needStar) : "") + Language.C_WJ1;
                    if (data.skillId == 1) {
                        if (this._currConfig && this._currConfig.id > 0) {
                            this.skillIcon1.filters = null;
                            this.labContent10.textColor = TypeColor.GREEN1;
                            this.labDes1.textColor = 0x00ff00;
                            this.labContent10.text = Language.J_YJS;
                        }
                    }
                    else {
                        if (this._currConfig && this._currConfig.type >= 2) {
                            this.skillIcon1.filters = null;
                            this.labContent10.textColor = TypeColor.GREEN1;
                            this.labDes1.textColor = 0x00ff00;
                            this.labContent10.text = Language.J_YJS;
                        }
                    }
                }
                else {
                    this.currentState = "1";
                    var sA = ["", Language.UNION_W, Language.UNION_S, Language.UNION_W1, Language.UNION_QX];
                    var temp1 = Templates.getTemplateById(templates.Map.CAMPJIBAN, 301);
                    var temp2 = Templates.getTemplateById(templates.Map.CAMPJIBAN, 302);
                    var temp3 = Templates.getTemplateById(templates.Map.CAMPJIBAN, 303);
                    var temp4 = Templates.getTemplateById(templates.Map.CAMPJIBAN, 304);
                    var temp5 = Templates.getTemplateById(templates.Map.CAMPJIBAN, 305);
                    var tempArr = [temp1, temp2, temp3, temp4, temp5];
                    for (var i = 0; i < tempArr.length; i++) {
                        if (this._currConfig && this._currConfig.camp == tempArr[i].camp && i != 0) {
                            tempArr[i] = this._currConfig;
                        }
                        var skillArr = tempArr[i].skill.split(";");
                        var skillNew = Templates.getTemplateById(templates.Map.SKILLNEW, skillArr[skillArr.length - 1]);
                        this._skillIconArr[i].source = "legionSkill_json.img_legionSkill_" + skillNew.id;
                        this._labNameArr[i].text = skillNew.name + (i > 0 ? "(" + sA[i] + ")" : "");
                        this._labDesArr[i].text = skillNew.Desc;
                        var propertiesArr = tempArr[i].properties.split(";");
                        this._labTextArr[i].textFlow = utils.htmlUtil.showProperty(propertiesArr[0]);
                        this._labTextArr1[i].textFlow = utils.htmlUtil.showProperty(propertiesArr[1]);
                        if (this._currConfig && this._currConfig.type >= 3 && this._currConfig.id == tempArr[i].id) {
                            this._skillIconArr[i].filters = null;
                            this._labDesArr[i].textColor = 0x00ff00;
                            this._labHideArr[i].text = Language.J_SJTJ + ":";
                            this._labContentArr[i].textColor = TypeColor.GREEN1;
                            if (i <= 0 || tempArr[i].needStar >= 10) {
                                this._labContentArr[i].text = Language.C_YMJ;
                            }
                            else {
                                var needStar = 0;
                                if (tempArr[i].needStar == 6)
                                    needStar = 8;
                                if (tempArr[i].needStar == 8)
                                    needStar = 10;
                                this._labContentArr[i].text = tempArr[i].needStar >= 10 ? Language.C_YMJ : Language.C_SZ + Language.getExpression(Language.E_1M, tempArr[i].generalNum1) + Language.getExpression(Language.E_1X, needStar) + Language.C_WJ1 + (i > 0 ? "(" + tempArr[i].generalNum2 + sA[i] + Language.C_J10 + ")" : "");
                            }
                        }
                        else {
                            this._labDesArr[i].textColor = 0xd3d3d3;
                            this._skillIconArr[i].filters = utils.filterUtil.grayFilters;
                            this._labHideArr[i].text = Language.C_JSTJ + ":";
                            this._labContentArr[i].textColor = TypeColor.RED1;
                            this._labContentArr[i].text = Language.C_SZ + Language.getExpression(Language.E_1M, tempArr[i].generalNum1) + (tempArr[i].needStar > 0 ? Language.getExpression(Language.E_1X, tempArr[i].needStar) : "") + Language.C_WJ1 + (i > 0 ? "(" + tempArr[i].generalNum2 + sA[i] + Language.C_J10 + ")" : "");
                        }
                    }
                }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                //this.x = mg.stageManager.stageWidth / 2 - this.width / 2;
                //this.y = mg.stageManager.stageHeight / 2 - this.height / 2;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        BuZhenAlert.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            this.x = mg.stageManager.stageWidth / 2 - this.width / 2;
            this.y = mg.stageManager.stageHeight / 2 - this.height / 2;
        };
        BuZhenAlert.prototype.onClose = function (e) {
            mg.TipUpManager.instance.removeBlack();
            this.removeSelf();
        };
        BuZhenAlert.prototype.removeSelf = function () {
            mg.TipManager.instance.setCurrent();
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return BuZhenAlert;
    }(ui.BuZhenAlertSkin));
    tips.BuZhenAlert = BuZhenAlert;
    __reflect(BuZhenAlert.prototype, "tips.BuZhenAlert", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));
