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
    var DaoJuDuiHuanRenderer = (function (_super) {
        __extends(DaoJuDuiHuanRenderer, _super);
        function DaoJuDuiHuanRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        DaoJuDuiHuanRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var vo = this.data;
                var rewards = vo.shoptemplate.reward.split(";");
                var index = 0;
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                if (vo.buyTotalCount == 0) {
                    this.labConut.text = "";
                }
                else {
                    var str = vo.buyCount + "/" + vo.buyTotalCount;
                    this.labConut.text = Language.C_XG + str;
                }
                if (vo.buyCount != 0) {
                    this.labConut.textColor = 0x00FF00;
                }
                else {
                    this.labConut.textColor = 0xFF0000;
                }
                if (this.itemIndex == 0) {
                    this.labDes.text = Language.J_MYXYGQ;
                }
                // if (this.itemIndex == 1) {
                // 	this.labDes.text = Language.J_MYXY;
                // }
                if (this.itemIndex == 1) {
                    this.labDes.text = Language.J_MY;
                }
                if (this.itemIndex == 2) {
                    this.labDes.text = Language.J_XY;
                }
                if (this.itemIndex == 3) {
                    this.labDes.text = Language.J_GQ;
                }
            }
        };
        return DaoJuDuiHuanRenderer;
    }(ui.DaoJuDuiHuanRendererSkin));
    renderer.DaoJuDuiHuanRenderer = DaoJuDuiHuanRenderer;
    __reflect(DaoJuDuiHuanRenderer.prototype, "renderer.DaoJuDuiHuanRenderer");
})(renderer || (renderer = {}));
