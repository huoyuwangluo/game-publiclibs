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
var PetUpStarSucceed = (function (_super) {
    __extends(PetUpStarSucceed, _super);
    function PetUpStarSucceed() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        return _this;
    }
    PetUpStarSucceed.prototype.show = function (petData, star) {
        this._data = petData;
        this.skill0.visible = false;
        this.skill1.visible = false;
        this.labSkillName1.visible = false;
        this.labSkillName2.visible = false;
        this.imgArrow.visible = false;
        this.skillGroup1.visible = false;
        this.skillGroup2.visible = false;
        this.imgAllSkill.visible = false;
        this.group.y = 280;
        var leftBreakTemp = Templates.getTemplateByTwoProperty(templates.Map.GENERALBREAK, "quality", this._data.quality, "star", star);
        this.labProperty.text = leftBreakTemp.growPro / 100 + "%";
        this.labProperty1.text = leftBreakTemp.levelOpen.toString();
        var rightBreakTemp = this._data.generalBraekTmp;
        this.labAdd.text = rightBreakTemp.growPro / 100 + "%";
        this.labAdd1.text = rightBreakTemp.levelOpen.toString();
        var leftSkillArr = leftBreakTemp.skillLv.split(";");
        var rightSkillArr = rightBreakTemp.skillLv.split(";");
        var skillList = this._data.skillList.list;
        if (rightSkillArr.length > leftSkillArr.length) {
            if (!skillList[rightSkillArr.length - 1].isLock) {
                this.showSkill(rightSkillArr.length, false);
            }
            else {
                this.group.y = 170;
            }
        }
        else {
            var count = 0;
            var index = 0;
            for (var i = 0; i < leftSkillArr.length; i++) {
                if (parseInt(rightSkillArr[i]) > parseInt(leftSkillArr[i]) && !skillList[i].isLock) {
                    count++;
                    index = i + 1;
                }
            }
            if (count == leftSkillArr.length) {
                this.imgAllSkill.visible = true;
                this.skillGroup1.visible = true;
                this.skillGroup2.visible = true;
                this.imgArrow.visible = true;
                this.labLvLeft.text = "Lv:" + leftSkillArr[0];
                this.labLvRight.text = "Lv:" + rightSkillArr[0];
            }
            else {
                if (index > 0) {
                    if (!skillList[index - 1].isLock) {
                        this.showSkill(index, true);
                    }
                    else {
                        this.group.y = 170;
                    }
                }
                else {
                    this.group.y = 170;
                }
            }
        }
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
    };
    PetUpStarSucceed.prototype.showSkill = function (count, istrue) {
        if (count <= 0)
            count = 1;
        var skillList = this._data.skillList.list;
        this.skill0.visible = true;
        this.skill0.filters = null;
        this.skill1.visible = true;
        this.labSkillName1.visible = true;
        this.labSkillName2.visible = true;
        this.imgArrow.visible = true;
        this.skill1.dataSource = skillList[count - 1];
        this.labSkillName2.text = skillList[count - 1].name;
        if (istrue) {
            var id = skillList[count - 1].id - 1;
            var skillVO = vo.fromPool(vo.SkillVO);
            skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, id), 0);
            this.skill0.dataSource = skillVO;
            this.labSkillName1.text = skillVO.name;
        }
        else {
            this.skill0.dataSource = skillList[count - 1];
            this.labSkillName1.text = skillList[count - 1].name;
            this.skill0.filters = utils.filterUtil.grayFilters;
        }
    };
    PetUpStarSucceed.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    PetUpStarSucceed.prototype.storyHongYanEndCallFun = function () {
        GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType40000, 0);
    };
    PetUpStarSucceed.prototype.hide = function () {
        this._data = null;
        egret.Tween.removeTweens(this.img_ratoion);
        if (GameModels.pet.hashformatUpVOList6Star && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_6) <= 0) {
            mg.StoryManager.instance.startBigStory(116, this, this.storyHongYanEndCallFun);
            GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_6);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PetUpStarSucceed;
}(ui.PetUpStarSucceedSkin));
__reflect(PetUpStarSucceed.prototype, "PetUpStarSucceed", ["IAlert", "egret.DisplayObject"]);
