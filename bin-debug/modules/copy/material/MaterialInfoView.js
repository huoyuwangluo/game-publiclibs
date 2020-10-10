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
var copy;
(function (copy) {
    var MaterialInfoView = (function (_super) {
        __extends(MaterialInfoView, _super);
        function MaterialInfoView() {
            return _super.call(this) || this;
        }
        MaterialInfoView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        MaterialInfoView.prototype.enter = function (isHuanJie) {
            this._isHuanJie = isHuanJie;
            this.currentState = this._isHuanJie ? "state2" : "state1";
            GameModels.copyMaterial.onTimeChange(this, this.timerHandler);
            GameModels.copyMaterial.onProgressChange(this, this.progressHandler);
            this.timerHandler();
        };
        MaterialInfoView.prototype.exit = function () {
            GameModels.copyMaterial.offTimeChange(this, this.timerHandler);
            GameModels.copyMaterial.offProgressChange(this, this.progressHandler);
        };
        MaterialInfoView.prototype.timerHandler = function () {
            this.labProgress1.visible = false;
            this.labProgress2.visible = false;
            this.labName1.visible = false;
            this.labName2.visible = false;
            this.labCost.text = GameModels.copyMaterial.timeCost + Language.Z_MIAO;
            this.labTime.text = GameModels.copyMaterial.scoreStarTime + Language.Z_MIAO;
            if (this._isHuanJie) {
                this.stargroup.visible = true;
                this.imgStar1.visible = (GameModels.copyMaterial.scoreStar >= 1);
                this.imgStar2.visible = (GameModels.copyMaterial.scoreStar >= 2);
                this.imgStar3.visible = (GameModels.copyMaterial.scoreStar >= 3);
                this.labStar.text = Language.getExpression(Language.E_1XPJ, convert.getNumberHanzi(GameModels.copyMaterial.scoreStar));
                this.huanjieView();
            }
            else {
                this.stargroup.visible = false;
                this.labDes.visible = true;
                this.labProgress1.visible = true;
                this.labName1.visible = true;
                this.labStar.text = Language.C_JL;
                this.labProgress1.text = (GameModels.copyMaterial.indexWave + 1) + "/" + (GameModels.copyMaterial.totalWave + 1);
            }
        };
        MaterialInfoView.prototype.progressHandler = function () {
            this.labProgress1.text = (GameModels.copyMaterial.indexWave + 1) + "/" + (GameModels.copyMaterial.totalWave + 1);
        };
        MaterialInfoView.prototype.huanjieView = function () {
            this.labProgress2.visible = true;
            this.labName2.visible = true;
            this.labDes.visible = false;
            var vo = GameModels.copyMaterial.currCopyVo;
            var fixDropArr = vo.templateBoss.baseDrop.split(";");
            if (GameModels.copyMaterial.scoreStar == 3) {
                if (fixDropArr[0] && fixDropArr[0].split("_").length == 2) {
                    var str = fixDropArr[0].split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this.labProgress2.text = item.name + "x" + str[1];
                }
            }
            else if (GameModels.copyMaterial.scoreStar == 2) {
                if (fixDropArr[1] && fixDropArr[1].split("_").length == 2) {
                    var str = fixDropArr[1].split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this.labProgress2.text = item.name + "x" + str[1];
                }
            }
            else {
                if (fixDropArr[2] && fixDropArr[2].split("_").length == 2) {
                    var str = fixDropArr[2].split("_");
                    var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this.labProgress2.text = item.name + "x" + str[1];
                }
            }
        };
        return MaterialInfoView;
    }(ui.MaterialInfoSkin));
    copy.MaterialInfoView = MaterialInfoView;
    __reflect(MaterialInfoView.prototype, "copy.MaterialInfoView");
})(copy || (copy = {}));
