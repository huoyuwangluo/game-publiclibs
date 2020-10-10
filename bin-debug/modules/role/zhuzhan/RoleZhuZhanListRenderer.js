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
    var RoleZhuZhanListRenderer = (function (_super) {
        __extends(RoleZhuZhanListRenderer, _super);
        function RoleZhuZhanListRenderer() {
            var _this = _super.call(this) || this;
            _this._petBoxs = [_this.pet0, _this.pet1, _this.pet2, _this.pet3];
            return _this;
        }
        RoleZhuZhanListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                for (var z = this.petGroup.numChildren; z >= 0; z--) {
                    var btns = this.petGroup.getChildAt(z);
                    if (btns) {
                        this.petGroup.removeChildAt(z);
                    }
                }
                var temp = this.data;
                var hashActTemp = GameModels.pet.getTempIdOfZhuZhanTempList(temp.id);
                var petArr = temp.setting.split(";");
                for (var i = 0; i < 4; i++) {
                    var petBox = this._petBoxs[i];
                    petBox.touchChildren = false;
                    var img = new eui.Image;
                    petBox.labName.stroke = 1;
                    if (i < petArr.length) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, petArr[i]);
                        var hashAct = pet.id == 13000 ? true : GameModels.handBook.getActiviteGeneralBuyId(pet.id);
                        var hashPut = GameModels.pet.getPetOfZhuZhan(pet.id);
                        petBox.dataSource = petArr[i];
                        petBox.imgStar.visible = true;
                        petBox.imgStar.source = "tujian_json.img_star" + pet.star;
                        petBox.filters = hashAct && hashPut ? null : utils.filterUtil.grayFilters;
                        mg.TipManager.instance.unBind(petBox);
                        this.petGroup.addChild(petBox);
                        if (!hashAct) {
                            img.source = "zhuzhan_json.img_noHash";
                            img.scaleX = img.scaleY = 0.9;
                            img.x = petBox.x + 5;
                            img.y = petBox.y + 25;
                            img.touchEnabled = false;
                            this.petGroup.addChild(img);
                        }
                    }
                    else {
                        if (petBox.parent) {
                            petBox.parent.removeChild(petBox);
                        }
                    }
                }
                this.labProites.textColor = hashActTemp ? TypeColor.GREEN1 : 0xd3d3d3;
                this.labProites.textFlow = utils.htmlUtil.getAttributes(temp.properties);
                this.imgActBg.visible = hashActTemp;
                this.labAct.visible = !hashActTemp;
                // for (var i = 0; i < this._petBoxs.length; i++) {
                // 	this._petBoxs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxClick, this);
                // }
            }
            else {
                for (var i = 0; i < this._petBoxs.length; i++) {
                    this._petBoxs[i].dataSource = null;
                    this._petBoxs[i].filters = null;
                }
            }
        };
        RoleZhuZhanListRenderer.prototype.onBoxClick = function (e) {
            var temp = this.data;
            var index = this._petBoxs.indexOf(e.currentTarget);
            var petArr = temp.setting.split(";");
            var pet = Templates.getTemplateById(templates.Map.GENERAL, petArr[index]);
            if (pet)
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, pet);
        };
        return RoleZhuZhanListRenderer;
    }(ui.RoleZhuZhanListRendererSkin));
    renderer.RoleZhuZhanListRenderer = RoleZhuZhanListRenderer;
    __reflect(RoleZhuZhanListRenderer.prototype, "renderer.RoleZhuZhanListRenderer");
})(renderer || (renderer = {}));
