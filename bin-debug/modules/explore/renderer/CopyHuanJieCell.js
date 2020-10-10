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
    var CopyHuanJieCell = (function (_super) {
        __extends(CopyHuanJieCell, _super);
        function CopyHuanJieCell() {
            var _this = _super.call(this) || this;
            // this.touchChildren = false;
            _this._starArr = [_this.star0, _this.star1, _this.star2];
            _this._rwards = [_this.drop0, _this.drop1];
            _this.img_fight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gameEnter, _this);
            return _this;
        }
        CopyHuanJieCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var vo = this.data;
            this.imgLingqu.visible = false;
            if (vo) {
                this._dataVo = vo;
                var item = vo.template.dropShow.split(";");
                for (var i = 0; i < 2; i++) {
                    this._rwards[i].labName.stroke = 1;
                    this._rwards[i].dataSource = item[i];
                }
                this.blabCell.text = "" + vo.step;
                for (var i = 0; i < 3; i++) {
                    this._starArr[i].visible = false;
                }
                if (GameModels.copyMaterial.huanjieData.CurrStep - 1 == 30) {
                    this.imgLingqu.visible = true;
                    this._starArr[0].visible = true;
                    return;
                }
                if (vo.step == GameModels.copyMaterial.huanjieData.CurrStep) {
                    if (GameModels.copyMaterial.huanjieData.star == 1) {
                        this._starArr[2].visible = true;
                    }
                    else if (GameModels.copyMaterial.huanjieData.star == 2) {
                        this._starArr[1].visible = true;
                    }
                    else if (GameModels.copyMaterial.huanjieData.star == 3) {
                        this.imgLingqu.visible = true;
                        this._starArr[0].visible = true;
                    }
                }
                else {
                    this.imgLingqu.visible = true;
                    this._starArr[0].visible = true;
                }
            }
        };
        CopyHuanJieCell.prototype.gameEnter = function (evt) {
            //app.gameContext.enterMaterialPhamtom(this._dataVo, null);
        };
        return CopyHuanJieCell;
    }(ui.CopyHuanJieCellSkin));
    renderer.CopyHuanJieCell = CopyHuanJieCell;
    __reflect(CopyHuanJieCell.prototype, "renderer.CopyHuanJieCell");
})(renderer || (renderer = {}));
