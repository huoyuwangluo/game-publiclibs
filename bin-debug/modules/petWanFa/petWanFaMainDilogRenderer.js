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
    var petWanFaMainDilogRenderer = (function (_super) {
        __extends(petWanFaMainDilogRenderer, _super);
        function petWanFaMainDilogRenderer() {
            var _this = _super.call(this) || this;
            _this._redPointArr = [GameRedState.PETWANFA_YUANZHENG, GameRedState.PETWANFA_BINGFENSANLU];
            return _this;
        }
        petWanFaMainDilogRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            utils.timer.clear(this, this.timerHandler);
            this.imgJoin.visible = false;
            if (this.data) {
                GameModels.state.registerWarnTarget(this._redPointArr[this.itemIndex], this.imgRedPoint);
                var temArr = this.data;
                this.imgBg.source = "img_explore_model_" + temArr.id + "_png";
                this.reward0.dataSource = temArr.showItem.split(";")[0];
                this.reward1.dataSource = temArr.showItem.split(";")[1];
                this.reward2.dataSource = temArr.showItem.split(";")[2];
                this.btnRank.visible = temArr.id == 2;
                this.btnDuiHuan.visible = temArr.id == 1;
                this.labDes.visible = this.labNanDu.visible = this.labTime.visible = temArr.id == 1;
                if (GameModels.legion.curSelectMode == 1) {
                    this.labNanDu.text = Language.J_YBMS;
                    this.showTime();
                }
                else if (GameModels.legion.curSelectMode == 2) {
                    this.labNanDu.text = Language.J_JYMS;
                    this.showTime();
                }
                else if (GameModels.legion.curSelectMode == 3) {
                    this.labNanDu.text = Language.J_EMMS;
                    this.showTime();
                }
                else {
                    this.labNanDu.text = Language.C_ZW;
                    this.labTime.text = "";
                }
                if (temArr.id == 1) {
                    if (GameModels.scene.getjoinSceneListByType(TypeGame.EXPEDITION) || GameModels.scene.getjoinSceneListByType(TypeGame.EXPEDITION_SUPPORT)) {
                        this.imgJoin.visible = true;
                    }
                }
                else if (temArr.id == 2) {
                    if (GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_1) || GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_2) ||
                        GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_3)) {
                        this.imgJoin.visible = true;
                    }
                }
            }
            else {
                GameModels.state.unRegisterWarnTarget(this._redPointArr[this.itemIndex]);
            }
        };
        petWanFaMainDilogRenderer.prototype.showTime = function () {
            this._leftTime = GameModels.legion.leftTime;
            utils.timer.clear(this, this.timerHandler);
            this.labTime.text = Language.C_SYSJ + ":" + utils.DateUtil.formatTimeLeft(this._leftTime);
            utils.timer.loop(1000, this, this.timerHandler);
        };
        petWanFaMainDilogRenderer.prototype.timerHandler = function () {
            this._leftTime--;
            if (this._leftTime <= 0) {
                this._leftTime = 0;
                this.labNanDu.text = Language.C_ZW;
                this.labTime.text = "";
                return;
            }
            this.labTime.text = Language.C_SYSJ + ":" + utils.DateUtil.formatTimeLeft(this._leftTime);
        };
        return petWanFaMainDilogRenderer;
    }(ui.petWanFaMainDilogRendererSkin));
    renderer.petWanFaMainDilogRenderer = petWanFaMainDilogRenderer;
    __reflect(petWanFaMainDilogRenderer.prototype, "renderer.petWanFaMainDilogRenderer");
})(renderer || (renderer = {}));
