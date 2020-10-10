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
    var FriendListCell = (function (_super) {
        __extends(FriendListCell, _super);
        function FriendListCell() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        FriendListCell.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                this.imgHead1.source = ResPath.getPlayerIconSmall(data.headIcon);
                this.labplayerName.text = this.data.PlayerName;
                this.lablv.text = "lv." + this.data.Level;
                this.lablegion.text = this.data.UnionName;
                this.labFight.text = this.data.FightValue;
                if (this.data.Time > 0) {
                    this.labOnline.text = this.getTimeLab(this.data.Time);
                    this.labOnline.textColor = 0x868686;
                }
                else {
                    this.labOnline.text = Language.C_ZX;
                    this.labOnline.textColor = 0x34E22C;
                }
                if (data.VipLevel > 0) {
                    this.imgVip.visible = true;
                    this.imgVip.source = "common_json.img_vip_png";
                    if (data.VipLevel > 10) {
                        this.labVipRanking.visible = false;
                        this.imgVip.source = "rankings_json.img_rang_vip" + data.VipLevel;
                    }
                    else {
                        this.labVipRanking.visible = true;
                        this.labVipRanking.text = data.VipLevel.toString();
                    }
                }
                else {
                    this.imgVip.visible = false;
                    this.labVipRanking.visible = false;
                }
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
        };
        FriendListCell.prototype.onClick = function (e) {
            GameModels.friends.getPromptInfo(this.data.PlayerId, utils.Handler.create(this, function (info, count) {
                mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
            }));
        };
        FriendListCell.prototype.getTimeLab = function (time) {
            var timeNum = Math.ceil(time / 60);
            if (timeNum > 60) {
                timeNum = Math.ceil(timeNum / 60);
                if (timeNum > 24) {
                    // timeNum = Math.ceil(timeNum / 24);
                    // return Language.getExpression(Language.E_LX1T, timeNum);
                    return Language.J_LX1TYS;
                }
                else {
                    return Language.getExpression(Language.E_LX1XS, timeNum);
                }
            }
            else {
                return Language.getExpression(Language.E_LX1FZ, timeNum);
            }
        };
        return FriendListCell;
    }(ui.FriendListCellSkin));
    renderer.FriendListCell = FriendListCell;
    __reflect(FriendListCell.prototype, "renderer.FriendListCell");
})(renderer || (renderer = {}));
