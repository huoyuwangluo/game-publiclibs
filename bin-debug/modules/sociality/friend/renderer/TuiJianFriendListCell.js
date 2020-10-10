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
    var TuiJianFriendListCell = (function (_super) {
        __extends(TuiJianFriendListCell, _super);
        function TuiJianFriendListCell() {
            return _super.call(this) || this;
        }
        TuiJianFriendListCell.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                this.imgHead1.source = ResPath.getPlayerIconSmall(data.headIcon);
                this.labplayerName.text = this.data.PlayerName;
                this.lablv.text = "lv." + this.data.Level;
                this.lablegion.text = this.data.UnionName;
                this.labFight.text = this.data.FightValue;
                this.labHatred.text = "" + data.Hatred;
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
                this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            else {
                this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
        };
        TuiJianFriendListCell.prototype.onClick = function (e) {
            switch (e.target) {
                case this.btnAdd:
                    GameModels.friends.sendAddFriend(this.data.PlayerName, utils.Handler.create(this, this.addBack));
                    break;
            }
        };
        TuiJianFriendListCell.prototype.addBack = function (data) {
            if (data.Result == 1) {
                mg.alertManager.tip(Language.J_SQCG);
            }
            else if (data.Result == 2) {
                mg.alertManager.tip(Language.J_TJCG);
            }
            GameModels.friends.deleteRecommendationList(data.PlayerId);
        };
        TuiJianFriendListCell.prototype.getTimeLab = function (time) {
            var timeNum = Math.ceil(time / 60);
            if (timeNum > 60) {
                timeNum = Math.ceil(timeNum / 60);
                if (timeNum > 24) {
                    timeNum = Math.ceil(timeNum / 24);
                    return Language.getExpression(Language.E_LX1T, timeNum);
                }
                else {
                    return Language.getExpression(Language.E_LX1XS, timeNum);
                }
            }
            else {
                return Language.getExpression(Language.E_LX1FZ, timeNum);
            }
        };
        return TuiJianFriendListCell;
    }(ui.TuiJianFriendListCellSkin));
    renderer.TuiJianFriendListCell = TuiJianFriendListCell;
    __reflect(TuiJianFriendListCell.prototype, "renderer.TuiJianFriendListCell");
})(renderer || (renderer = {}));
