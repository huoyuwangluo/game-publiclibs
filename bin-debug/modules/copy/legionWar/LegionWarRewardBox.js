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
var legionWar;
(function (legionWar) {
    var LegionWarRewardBox = (function (_super) {
        __extends(LegionWarRewardBox, _super);
        function LegionWarRewardBox() {
            return _super.call(this) || this;
        }
        LegionWarRewardBox.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        LegionWarRewardBox.prototype.show = function (pos, type) {
            if (type === void 0) { type = ""; }
            this.getVipBox.visible = false;
            this._id = pos;
            if (pos > 2) {
                this.imgIcon.source = "legionWar_json.img_legionwar_box2";
            }
            else {
                this.imgIcon.source = "legionWar_json.img_legionwar_box1";
            }
        };
        LegionWarRewardBox.prototype.hide = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        LegionWarRewardBox.prototype.setFilters = function (score, bol, type) {
            if (type === void 0) { type = ""; }
            this._type = type;
            this.getVipBox.visible = false;
            this.labScore.text = "" + score + Language.C_JF;
            if (bol) {
                this.imgIcon.filters = null;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            }
            else {
                this.imgIcon.filters = utils.filterUtil.grayFilters;
            }
            if (type == "KingBattlefield") {
                if (score > GameModels.sceneKingBattle.curMyScore) {
                    this.imgIcon.source = "exploreBox_json.img_silver_box_close";
                }
                if (score <= GameModels.sceneKingBattle.curMyScore) {
                    this.imgIcon.source = "exploreBox_json.img_silver_box_wait";
                }
                if (GameModels.sceneKingBattle.boxStatus[this._id].Status == 2) {
                    this.imgIcon.source = "exploreBox_json.img_silver_box_open";
                    this.getVipBox.visible = true;
                }
            }
        };
        LegionWarRewardBox.prototype.onTouchTap = function (e) {
            if (this._type == "KingBattlefield" && GameModels.sceneKingBattle.boxStatus[this._id].Status == 1) {
                var personScoreReward = GameModels.dataSet.getDataSettingArrByType(241);
                GameModels.sceneKingBattle.ReceiveScoreBox(personScoreReward[this._id].id, utils.Handler.create(this, this.openBox));
                return;
            }
            if (this._type != "KingBattlefield") {
                mg.alertManager.tip(Language.J_HDJSHTYFF);
            }
        };
        LegionWarRewardBox.prototype.openBox = function () {
            this.imgIcon.source = "exploreBox_json.img_silver_box_open";
            this.getVipBox.visible = true;
            var personScoreReward = GameModels.dataSet.getDataSettingArrByType(241);
            var arr = [];
            var str = personScoreReward[this._id].value.split("&")[1].split(";");
            arr.push(str[0].split("_")[0] + "_" + str[0].split("_")[1]);
            mg.alertManager.showAlert(UsePropGetGift, true, true, arr);
        };
        return LegionWarRewardBox;
    }(ui.LegionWarRewardBoxSkin));
    legionWar.LegionWarRewardBox = LegionWarRewardBox;
    __reflect(LegionWarRewardBox.prototype, "legionWar.LegionWarRewardBox");
})(legionWar || (legionWar = {}));
