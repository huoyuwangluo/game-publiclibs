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
    var WelfareActivityYuLanRendererAlert = (function (_super) {
        __extends(WelfareActivityYuLanRendererAlert, _super);
        function WelfareActivityYuLanRendererAlert() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        WelfareActivityYuLanRendererAlert.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (data) {
                var temp = this.data;
                if (temp.rankMax == temp.rankMin) {
                    this.labRank.text = "";
                    this.imgRanking.visible = true;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + temp.rankMax;
                }
                else {
                    this.imgRanking.visible = false;
                    if (temp.rankMin > 20) {
                        this.labRank.text = Language.C_20YH;
                    }
                    else {
                        this.labRank.text = temp.rankMin + "-" + temp.rankMax + Language.Z_M1;
                    }
                }
                var rewards = temp.rewards.split(";");
                var index = 0;
                for (var i = 0; i < 3; i++) {
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
            }
        };
        return WelfareActivityYuLanRendererAlert;
    }(ui.WelfareActivityYuLanRendererAlertSkin));
    renderer.WelfareActivityYuLanRendererAlert = WelfareActivityYuLanRendererAlert;
    __reflect(WelfareActivityYuLanRendererAlert.prototype, "renderer.WelfareActivityYuLanRendererAlert");
})(renderer || (renderer = {}));
