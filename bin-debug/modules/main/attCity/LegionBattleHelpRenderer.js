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
    var LegionBattleHelpRenderer = (function (_super) {
        __extends(LegionBattleHelpRenderer, _super);
        function LegionBattleHelpRenderer() {
            var _this = _super.call(this) || this;
            _this._headArr = [_this.head1, _this.head2, _this.head3, _this.head4];
            return _this;
        }
        LegionBattleHelpRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data instanceof n.ProtoPlayerViewInfo) {
                    var vo = this.data;
                    var pet = this.getPetByUid(vo.PetRoomList[0].CurPetId);
                    this.labName.text = vo.PlayerName;
                    this.labLevel.text = "lv." + pet.Level;
                    this.labFight.text = "" + vo.PlayerFightPower;
                    this.imgHead.source = ResPath.getPlayerIconSmall(vo.HeadIcon);
                    this.imgQuality.source = ResPath.getLingXingQualityByStar(pet.Star, GameModels.pet.isHashFourSkill(pet.PetRefId));
                    this.imgStar.source = "tujian_json.img_star" + pet.Star;
                    for (var i = 0; i < this._headArr.length; i++) {
                        var pet = this.getPetByUid(vo.PetRoomList[i + 1].CurPetId);
                        if (pet) {
                            var temp = Templates.getTemplateById(templates.Map.GENERAL, pet.PetRefId);
                            this._headArr[i].visible = true;
                            this._headArr[i].imgQuality.source = ResPath.getPetQualityByStar(pet.Star, GameModels.pet.isHashFourSkill(pet.PetRefId));
                            this._headArr[i].imgStar.source = "tujian_json.img_star" + pet.Star;
                            this._headArr[i].imgHead.source = ResPath.getItemIconKey(pet.PetRefId);
                            this._headArr[i].labName.text = temp.name;
                            this._headArr[i].labName.textColor = TypeQuality.getStarColor(pet.Star);
                            this._headArr[i].labLv.text = "lv." + pet.Level;
                            this._headArr[i].imgDeal.visible = false;
                            this._headArr[i].expProgress.visible = false;
                        }
                        else {
                            this._headArr[i].visible = false;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this._headArr.length; i++) {
                    this._headArr[i].data = null;
                }
            }
        };
        LegionBattleHelpRenderer.prototype.getPetByUid = function (uid) {
            var vo = this.data;
            var petList = vo.PetList;
            for (var i = 0; i < petList.length; i++) {
                if (petList[i].PetId == uid) {
                    return petList[i];
                }
            }
            return null;
        };
        return LegionBattleHelpRenderer;
    }(ui.LegionBattleHelpRendererSkin));
    renderer.LegionBattleHelpRenderer = LegionBattleHelpRenderer;
    __reflect(LegionBattleHelpRenderer.prototype, "renderer.LegionBattleHelpRenderer");
})(renderer || (renderer = {}));
