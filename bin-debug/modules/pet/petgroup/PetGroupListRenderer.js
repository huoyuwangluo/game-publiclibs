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
    var PetGroupListRenderer = (function (_super) {
        __extends(PetGroupListRenderer, _super);
        function PetGroupListRenderer() {
            var _this = _super.call(this) || this;
            _this._iconArr = [_this.imgIcon, _this.imgIcon0, _this.imgIcon1];
            _this._qualityArr = [_this.imgQuila, _this.imgQuila0, _this.imgQuila1];
            _this._labNameArr = [_this.labName, _this.labName0, _this.labName1];
            _this._starArr = [_this.imgStar, _this.imgStar0, _this.imgStar1];
            _this._xiYouArr = [_this.imgXiYouPet, _this.imgXiYouPet0, _this.imgXiYouPet1];
            _this._proitesLabArr = [_this.lab0, _this.lab1];
            _this._groupArr = [_this.group1, _this.group2, _this.group3];
            return _this;
        }
        PetGroupListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var groupVo = this.data.petGroup;
                var type = this.data.type;
                this.currentState = type == 1 ? "state1" : "state2";
                this.needGroup.visible = false;
                this.btnUp.visible = false;
                this.btnUp.label = Language.C_SC2;
                this.labHash.visible = false;
                this.labPlayerName.visible = false;
                this.btnUp.isWarn = false;
                var petArr = groupVo.group.split(";");
                for (var i = 0; i < petArr.length; i++) {
                    if (petArr[i]) {
                        var petTmp = Templates.getTemplateById(templates.Map.GENERAL, petArr[i]);
                        var item = Templates.getTemplateById(templates.Map.ITEM, petTmp.id);
                        var skillArr = petTmp.skill.split(";");
                        var hashFourSkill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
                        this._iconArr[i].source = item.icon;
                        this._qualityArr[i].source = ResPath.getPetQualityByStar(petTmp.star, hashFourSkill);
                        this._labNameArr[i].text = petTmp.name;
                        this._labNameArr[i].textColor = TypeQuality.getStarColor(petTmp.star);
                        this._starArr[i].source = "tujian_json.img_star" + petTmp.star;
                        this._xiYouArr[i].visible = hashFourSkill;
                        this._xiYouArr[i].source = petTmp.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                        var isAct = GameModels.handBook.getActiviteGeneralBuyId(parseInt(petArr[i]));
                        this._groupArr[i].filters = isAct ? null : utils.filterUtil.grayFilters;
                    }
                    else {
                        this._iconArr[i].source = null;
                        this._qualityArr[i].source = null;
                        this._labNameArr[i].text = "";
                        this._starArr[i].source = null;
                        this._xiYouArr[i].visible = false;
                        this._groupArr[i].filters = null;
                    }
                }
                var proitesArr = groupVo.properites.split(";");
                for (var i = 0; i < this._proitesLabArr.length; i++) {
                    if (proitesArr[i]) {
                        var str = utils.htmlUtil.getAttributeFormat(proitesArr[i]).split(":");
                        var elements = [];
                        elements.push({ text: str[0] + ":", style: { textColor: 0xD3D3D3 } });
                        elements.push({ text: str[1], style: { textColor: 0x44c305 } });
                        this._proitesLabArr[i].textFlow = elements;
                    }
                    else {
                        this._proitesLabArr[i].text = "";
                    }
                }
                this.labDoneCount.text = Language.getExpression(Language.E_SY, (groupVo.count - groupVo.doneCount));
                this.imgHelp.visible = groupVo.country != 0;
                switch (groupVo.country) {
                    case 0:
                        this.labType.text = Language.ZYZS;
                        break;
                    case 1:
                        this.labType.text = Language.UNION_WEIG;
                        break;
                    case 2:
                        this.labType.text = Language.UNION_SHUG;
                        break;
                    case 3:
                        this.labType.text = Language.UNION_WUG;
                        break;
                    case 4:
                        this.labType.text = Language.UNION_QUNXIONG;
                        break;
                }
                if (groupVo.playerName) {
                    if (groupVo.playerName == GameModels.user.player.name) {
                        this.btnUp.visible = true;
                        this.btnUp.label = Language.C_QXSC;
                    }
                    else {
                        this.btnUp.visible = false;
                        this.labHash.visible = true;
                        this.labPlayerName.visible = true;
                        this.labPlayerName.textFlow = utils.htmlUtil.getUnderlineFormat(groupVo.playerName);
                    }
                }
                else {
                    this.btnUp.visible = true;
                    this.needGroup.visible = groupVo.status != 2;
                    var counmes = groupVo.consumes.split("_");
                    var needItem = Templates.getTemplateById(templates.Map.ITEM, counmes[0]);
                    var needCount = parseInt(counmes[1]);
                    var bagCount = GameModels.bag.getItemCountById(counmes[0]);
                    this.labNeed.text = needItem.name + ":";
                    this.imgNeedIcon.source = needItem.icon;
                    this.labCount.text = bagCount + "/" + needCount;
                    this.labCount.textColor = bagCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.btnUp.label = groupVo.status == 2 ? Language.C_YSC2 : Language.C_SC2;
                    if (groupVo.status == 1) {
                        if (groupVo.country == 0) {
                            var count = GameModels.petGroup.getMyRegisterZYPetGroupCount();
                            this.btnUp.isWarn = bagCount >= needCount && count < 5;
                        }
                        else {
                            this.btnUp.isWarn = bagCount >= needCount;
                        }
                    }
                }
                this.imgHelp.y = 162;
                if (type == 1) {
                    var hashAnimal = false;
                    var animal = GameModels.animal.getAnimalBuyType(18);
                    if (animal.isAct) {
                        this.labDoneCount.text = "";
                        this.imgHelp.y = 148;
                    }
                }
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
                }
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankClick, this);
                this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
                this.labPlayerName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerClick, this);
            }
        };
        PetGroupListRenderer.prototype.showTips = function (e) {
            if (this.data) {
                var index = this._iconArr.indexOf(e.currentTarget);
                var vo = this.data.petGroup;
                var petArr = vo.group.split(";");
                var isAct = GameModels.handBook.getActiviteGeneralBuyId(parseInt(petArr[index]));
                if (isAct) {
                    var pettmp = Templates.getTemplateById(templates.Map.GENERAL, petArr[index]);
                    if (pettmp)
                        mg.TipManager.instance.showTip(tips.GeneralInfoTip, pettmp);
                }
                else {
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, petArr[index]);
                }
            }
        };
        PetGroupListRenderer.prototype.onRankClick = function (e) {
            if (this.data.petGroup)
                mg.alertManager.showAlert(pet.PetGroupRegisterPlayerList, true, true, this.data.petGroup);
        };
        PetGroupListRenderer.prototype.onItemClick = function (e) {
            var counmes = this.data.petGroup.consumes.split("_");
            if (counmes[0])
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, counmes[0]);
        };
        PetGroupListRenderer.prototype.onPlayerClick = function (e) {
            var vo = this.data.petGroup;
            GameModels.friends.getPromptInfo(vo.playerId, utils.Handler.create(this, function (info, count) {
                mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
            }));
        };
        return PetGroupListRenderer;
    }(ui.PetGroupListRendererSkin));
    renderer.PetGroupListRenderer = PetGroupListRenderer;
    __reflect(PetGroupListRenderer.prototype, "renderer.PetGroupListRenderer");
})(renderer || (renderer = {}));
