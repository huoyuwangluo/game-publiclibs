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
    var KuaFuXiaoFeiPaiHangRankRenderer = (function (_super) {
        __extends(KuaFuXiaoFeiPaiHangRankRenderer, _super);
        function KuaFuXiaoFeiPaiHangRankRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1];
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.KFXHPH);
            if (temp) {
                _this._rewadTmps = Templates.getTemplatesByProperty(templates.Map.HOLIDAYRANK, "type", temp.id);
            }
            return _this;
        }
        KuaFuXiaoFeiPaiHangRankRenderer.prototype.dataChanged = function () {
            if (this.data) {
                if (this.data.role == null) {
                    this.labName.text = Language.C_XWYD;
                    this.headIcon.source = "army_6020101_png";
                    this.labCount.text = "0";
                }
                else {
                    this.labName.text = "s" + this.data.role.sid + "." + this.data.role.roleName;
                    this.headIcon.source = "qualityBg_json.img_head_png";
                    this.labCount.text = "" + this.data.role.totalCost;
                }
                if (this.data.rank <= 3) {
                    this.imgRanking.visible = true;
                    this.labRanking.visible = false;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + (this.data.rank);
                }
                else {
                    this.imgRanking.visible = false;
                    this.labRanking.visible = true;
                    this.labRanking.text = this.data.rank;
                }
                for (var i = 0; i < this._rewadTmps.length; i++) {
                    var rankMax = this._rewadTmps[i].rankMax;
                    if (this.data.rank <= rankMax) {
                        var str = this._rewadTmps[i].rewards.split(";");
                        for (var j = 0; j < 2; j++) {
                            var iconBox = this._rwards[j];
                            iconBox.labName.stroke = 1;
                            if (j < str.length) {
                                iconBox.dataSource = str[j];
                                this.boxGroup.addChild(iconBox);
                            }
                            else {
                                if (iconBox.parent) {
                                    iconBox.parent.removeChild(iconBox);
                                }
                            }
                        }
                        break;
                    }
                }
            }
            else {
                this.reward1.dataSource = null;
                this.reward0.dataSource = null;
            }
        };
        return KuaFuXiaoFeiPaiHangRankRenderer;
    }(ui.KuaFuXiaoFeiPaiHangRankRendererSkin));
    renderer.KuaFuXiaoFeiPaiHangRankRenderer = KuaFuXiaoFeiPaiHangRankRenderer;
    __reflect(KuaFuXiaoFeiPaiHangRankRenderer.prototype, "renderer.KuaFuXiaoFeiPaiHangRankRenderer");
})(renderer || (renderer = {}));
