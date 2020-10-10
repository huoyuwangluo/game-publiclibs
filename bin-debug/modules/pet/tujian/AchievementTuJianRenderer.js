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
var achievement;
(function (achievement) {
    var AchievementTuJianRenderer = (function (_super) {
        __extends(AchievementTuJianRenderer, _super);
        function AchievementTuJianRenderer() {
            var _this = _super.call(this) || this;
            _this.register();
            return _this;
        }
        AchievementTuJianRenderer.prototype.register = function () {
        };
        AchievementTuJianRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.imgRedPoint.visible = false;
            this.imgNewPet.visible = false;
            this.imgCountry.visible = false;
            this.imgXiYouPet.visible = false;
            if (this.data instanceof vo.HandBookIndexVO) {
                var handbookData = this.data;
                this.labName.text = "";
                if (handbookData) {
                    var temp = Templates.getTemplateById(templates.Map.HANDBOOK, handbookData.handbookId);
                    var itemdata = Templates.getTemplateById(templates.Map.GENERAL, temp.general);
                    this.imgBg.source = ResPath.getTujianQuaitlyRect(itemdata.star);
                    this.labName.text = itemdata.name;
                    this.labName.textColor = TypeQuality.getStarColor(itemdata.star);
                    this.imgIcon.source = ResPath.getShowNewTuJianPath(itemdata.model);
                    this.star.source = "tujian_json.img_star" + itemdata.star;
                    var skillArr = itemdata.skill.split(";");
                    if (skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1") {
                        this.imgXiYouPet.visible = true;
                        this.imgXiYouPet.source = itemdata.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                    }
                    if (handbookData.status < 1) {
                        this.imgIcon.filters = utils.filterUtil.grayFilters;
                        this.imgBg.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.imgIcon.filters = null;
                        this.imgBg.filters = null;
                    }
                }
            }
            else {
                if (this.data) {
                    this.imgIcon.filters = null;
                    this.imgBg.filters = null;
                    this.imgCountry.visible = true;
                    var type = parseInt(this.data.split("_")[2]);
                    if (type == 1) {
                        this.imgNewPet.visible = true;
                    }
                    var tempPet = Templates.getTemplateById(templates.Map.GENERAL, this.data.split("_")[0]);
                    if (tempPet) {
                        var skillArr = tempPet.skill.split(";");
                        if (skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1") {
                            this.imgXiYouPet.visible = true;
                            this.imgXiYouPet.source = tempPet.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                        }
                        this.imgBg.source = ResPath.getTujianQuaitlyRect(tempPet.star);
                        this.labName.text = tempPet.name;
                        this.labName.textColor = TypeQuality.getStarColor(tempPet.star);
                        this.imgIcon.source = ResPath.getShowNewTuJianPath(tempPet.model);
                        this.star.source = "tujian_json.img_star" + tempPet.star;
                        this.imgCountry.source = "smokePet_json.img_smokePet_icon_" + tempPet.country;
                    }
                }
            }
        };
        AchievementTuJianRenderer.prototype.getdata = function () {
            return this.data;
        };
        return AchievementTuJianRenderer;
    }(ui.AchievementTuJianRendererSkin));
    achievement.AchievementTuJianRenderer = AchievementTuJianRenderer;
    __reflect(AchievementTuJianRenderer.prototype, "achievement.AchievementTuJianRenderer");
})(achievement || (achievement = {}));
