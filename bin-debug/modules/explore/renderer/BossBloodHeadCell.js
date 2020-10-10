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
    var BossBloodHeadCell = (function (_super) {
        __extends(BossBloodHeadCell, _super);
        function BossBloodHeadCell() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        BossBloodHeadCell.prototype.reset = function () {
            utils.timer.clear(this, this.refreshLastTime);
        };
        BossBloodHeadCell.prototype.dataChanged = function () {
            this.reset();
            var copyVO = this.data;
            this.labLevel.text = copyVO.bossName;
            this.imgIcon.source = ResPath.getPetIconSmall(copyVO.templateBoss.petId);
            var generalTmp = Templates.getTemplateByProperty(templates.Map.GENERAL, "model", copyVO.templateBoss.petId);
            this.imgPetJob.source = "common_json.img_pet_job" + generalTmp.corps + "_png";
            this._lastTime = copyVO.bossCd - (GameModels.timer.getTimer() * .001) >> 0;
            this.labOpen.visible = copyVO.stateLock;
            this.imgLock.visible = copyVO.stateLock;
            this.imgLockBg.visible = copyVO.stateLock;
            this.labLv.text = "Lv." + copyVO.template.openLv;
            if (copyVO.type == mo.ModelGameBoss.COPY_EVERYONE && copyVO.template.openLv == 20) {
                this.labOpen.text = Language.J_ZXRWKQ;
            }
            else {
                if (GameModels.user.player.level < copyVO.template.openLv) {
                    this.labOpen.text = copyVO.template.openLv + Language.C_JKQ;
                }
                else {
                    this.labOpen.text = "";
                }
            }
            if (this._lastTime <= 0) {
                this.labtime.text = "";
                if (copyVO.isRefResh) {
                    copyVO.isRefResh = false;
                    GameModels.copyBoss.updataTime(copyVO);
                }
            }
            else {
                if (copyVO.stateLock == false) {
                    copyVO.isRefResh = true;
                    utils.timer.loop(1000, this, this.refreshLastTime);
                }
                else {
                    this.labtime.text = "";
                }
            }
            // if (copyVO.type == mo.ModelGameBoss.COPY_EVERYONE || copyVO.type == mo.ModelGameBoss.COPY_DOMAIN) {
            //     if (!copyVO.stateLock && this._lastTime <= 0) {
            //         if (!copyVO.dropPet) return;
            //         var petItem: templates.item = Templates.getTemplateById(templates.Map.ITEM, copyVO.dropPet);
            //         var pet: templates.item = Templates.getTemplateById(templates.Map.ITEM, petItem.nextId);
            //         var needCount: number = parseInt(pet.extraParam);
            //         var count: number = GameModels.bag.getPetSuiCountById(copyVO.dropPet);
            //         var str: string = count + "/" + needCount;
            //         this.labOpen.visible = true;
            //         if (count >= needCount) {
            //             this.labOpen.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_WJSP2, str));
            //         } else {
            //             this.labOpen.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_WJSP1, str));
            //         }
            //     }
            // }
            this.invalidateProperties();
        };
        BossBloodHeadCell.prototype.refreshLastTime = function () {
            if (this._lastTime <= 0) {
                utils.timer.clear(this, this.refreshLastTime);
                this.labtime.text = "";
                if (this.data.type == mo.ModelGameBoss.COPY_EVERYONE) {
                }
                return;
            }
            this.labtime.text = utils.DateUtil.formatTimeLeft(this._lastTime) + Language.J_HCX;
            this._lastTime--;
        };
        BossBloodHeadCell.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            var copyVO = this.data;
            if (copyVO.stateLock == false) {
                if (copyVO.type == mo.ModelGameBoss.COPY_EVERYONE) {
                }
                if (this._lastTime > 0) {
                    this.labtime.text = utils.DateUtil.formatTimeLeft(this._lastTime) + Language.J_HCX;
                }
            }
            else {
                this.labtime.text = "";
            }
        };
        return BossBloodHeadCell;
    }(ui.BossBloodCellSkin));
    renderer.BossBloodHeadCell = BossBloodHeadCell;
    __reflect(BossBloodHeadCell.prototype, "renderer.BossBloodHeadCell");
})(renderer || (renderer = {}));
