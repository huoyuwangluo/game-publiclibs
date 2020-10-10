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
    var BossStateHeadCell = (function (_super) {
        __extends(BossStateHeadCell, _super);
        function BossStateHeadCell() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        BossStateHeadCell.prototype.dataChanged = function () {
            var copyVO = this.data;
            this.imgIcon.source = ResPath.getPetIconSmall(copyVO.templateBoss.petId);
            this.imgLock.visible = copyVO.stateLock;
            this.labOpen.visible = copyVO.stateLock;
            this.imgLockBg.visible = copyVO.stateLock;
            this.labLv.text = "Lv." + copyVO.template.openLv;
            if (copyVO.template.openLv == 0) {
                this.labLevel.horizontalCenter = 0;
            }
            else {
                this.labLevel.horizontalCenter = null;
            }
            var generalTmp = Templates.getTemplateByProperty(templates.Map.GENERAL, "model", copyVO.templateBoss.petId);
            this.imgPetJob.source = "common_json.img_pet_job" + generalTmp.corps + "_png";
            this.img_newBoss.visible = false;
            if (copyVO.type == mo.ModelGameBoss.COPY_CITY) {
                this.labOpen.text = copyVO.template.openLv + Language.C_JKQ;
                if (copyVO.curAngry >= copyVO.maxAngry && Number(copyVO.bossHP) > 0) {
                    this.labState.text = Language.C_YSX;
                }
                else {
                    this.labState.text = "";
                }
                this.labLevel.text = copyVO.bossName;
                if (copyVO.step == 99) {
                    this.labLevel.text = Language.C_ZJ;
                }
                return;
            }
            this.labLv.text = "";
            this.labState.text = "";
            this.labLevel.text = copyVO.bossName;
            var tempCity = Templates.getTemplateById(templates.Map.MAINCITY, copyVO.cityId);
            this.labOpen.text = tempCity ? tempCity.name + Language.C_KQ : "";
            if (!copyVO.stateLock && copyVO.type == mo.ModelGameBoss.COPY_PERSONAL) {
                if (!copyVO.dropPet)
                    return;
                this.img_newBoss.visible = copyVO.personDoneKilled == 0;
            }
        };
        return BossStateHeadCell;
    }(ui.BossStateCellSkin));
    renderer.BossStateHeadCell = BossStateHeadCell;
    __reflect(BossStateHeadCell.prototype, "renderer.BossStateHeadCell");
})(renderer || (renderer = {}));
