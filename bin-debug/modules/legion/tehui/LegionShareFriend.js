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
var dialog;
(function (dialog) {
    var legion;
    (function (legion) {
        var LegionShareFriend = (function (_super) {
            __extends(LegionShareFriend, _super);
            function LegionShareFriend() {
                return _super.call(this) || this;
            }
            LegionShareFriend.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._itemArr = [this.item0, this.item1, this.item2, this.item3, this.item4];
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            LegionShareFriend.prototype.enter = function (data) {
                GameModels.share.requestGetShareFirendInfo();
                this.labShare.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_LJZM);
                this.showView();
                this.labShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                GameModels.share.addEventListener(mo.ModelShare.LOGINREWARD_UPDATA, this.showView, this);
            };
            LegionShareFriend.prototype.exit = function () {
                this._listData = null;
                this.clearList(this.list);
                this.labShare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                GameModels.share.removeEventListener(mo.ModelShare.LOGINREWARD_UPDATA, this.showView, this);
            };
            LegionShareFriend.prototype.showView = function () {
                this.showPlayer();
                this.showList();
            };
            LegionShareFriend.prototype.showPlayer = function () {
                this.imgBuyFinsh.visible = false;
                this.btnEnter.visible = false;
                var playerArr = GameModels.share.firendList;
                for (var i = 0; i < 5; i++) {
                    this._itemArr[i].setPlayerInfo(playerArr[i]);
                }
                for (var j = 0; j < this._rwards.length; j++) {
                    this._rwards[j].dataSource = null;
                }
                var rewards = GameModels.dataSet.getDataSettingValueById(920001).split(";");
                for (var k = 0; k < 4; k++) {
                    var iconBox = this._rwards[k];
                    iconBox.labName.stroke = 1;
                    if (k < rewards.length) {
                        iconBox.dataSource = rewards[k];
                        iconBox.labName.stroke = 2;
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                var status = GameModels.share.loginStatus;
                if (status == 0) {
                    this.btnEnter.visible = true;
                    this.btnEnter.label = Language.C_LQ;
                    this.btnEnter.skinName = "skins.SnapBigButton3Skin";
                }
                else {
                    this.imgBuyFinsh.visible = true;
                }
            };
            LegionShareFriend.prototype.showList = function () {
                var tempArr = GameModels.share.firendRewardList;
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(tempArr);
                }
                else {
                    this._listData.source = tempArr;
                }
                this.list.dataProvider = this._listData;
            };
            LegionShareFriend.prototype.onListClick = function (e) {
                var item = this.list.selectedItem;
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (item.value == 0) {
                        mg.alertManager.tip(Language.C_TJWDC);
                    }
                    else if (item.value == 1) {
                        var temp = Templates.getTemplateById(templates.Map.SHAREFRIENDREWARD, item.key);
                        GameModels.share.requestGetTargetReward(item.key, utils.Handler.create(this, function () {
                            if (temp) {
                                var str = temp.rewards.split(";");
                                mg.alertManager.showAlert(UsePropGetGift, true, true, str);
                            }
                        }));
                    }
                }
            };
            LegionShareFriend.prototype.onBtnClick = function (e) {
                if (e.currentTarget == this.labShare) {
                    GameModels.platform.shareAppMessage(2);
                }
                else {
                    GameModels.share.requestGetLoginReward();
                }
            };
            return LegionShareFriend;
        }(ui.LegionShareFriendSkin));
        legion.LegionShareFriend = LegionShareFriend;
        __reflect(LegionShareFriend.prototype, "dialog.legion.LegionShareFriend");
    })(legion = dialog.legion || (dialog.legion = {}));
})(dialog || (dialog = {}));
