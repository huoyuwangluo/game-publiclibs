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
    var sociality;
    (function (sociality) {
        var friend;
        (function (friend) {
            var FriendsDialog = (function (_super) {
                __extends(FriendsDialog, _super);
                function FriendsDialog() {
                    return _super.call(this) || this;
                }
                FriendsDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._friendCell = [];
                    this._blackListCell = [];
                    this.friendTitelGroup.touchChildren = false;
                    this.backTitelGroup.touchChildren = false;
                    this._friendIsOpen = true;
                    this._blackIsOpen = true;
                    this.imgFRight.visible = !this._friendIsOpen;
                    this.imgFdown.visible = this._friendIsOpen;
                    this.labFTitel.text = Language.getExpression(Language.E_HY12, 0, 50);
                    this.imgBRight.visible = !this._blackIsOpen;
                    this.imgBdown.visible = this._blackIsOpen;
                    this.labBTitel.text = Language.getExpression(Language.E_HMD12, 0, 50);
                    this.clean();
                    GameModels.state.registerWarnTarget(GameRedState.SOCIALITY_FRIENDS_APPLY, this.btnApply);
                    GameModels.state.registerWarnTarget(GameRedState.SOCIALITY_PRIVATE_CHAT, this.btnPm);
                };
                FriendsDialog.prototype.enter = function (data) {
                    if (data === void 0) { data = null; }
                    this._friendIsOpen = true;
                    this._blackIsOpen = true;
                    this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnTui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnApply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnPm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.friendTitelGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.backTitelGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    GameModels.friends.addEventListener(mo.ModelFriend.FRIEND_LIST_CHANGE, this.showView, this);
                    GameModels.friends.getListInfo(utils.Handler.create(this, this.showView));
                };
                FriendsDialog.prototype.exit = function () {
                    this.clean();
                    this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnTui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnApply.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.btnPm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.friendTitelGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    this.backTitelGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                    GameModels.friends.removeEventListener(mo.ModelFriend.FRIEND_LIST_CHANGE, this.showView, this);
                };
                FriendsDialog.prototype.showView = function () {
                    this.clean();
                    this.imgFRight.visible = !this._friendIsOpen;
                    this.imgFdown.visible = this._friendIsOpen;
                    this.labFTitel.text = Language.getExpression(Language.E_HY12, GameModels.friends.friendList.length, 50);
                    var i;
                    if (this._friendIsOpen) {
                        for (i = 0; i < GameModels.friends.friendList.length; i++) {
                            var friendCell = new renderer.FriendListCell();
                            friendCell.data = GameModels.friends.friendList[i];
                            this._friendCell.push(friendCell);
                            this.friendListGroup.addChild(friendCell);
                            friendCell.x = 0;
                            friendCell.y = friendCell.height * i;
                        }
                    }
                    this.imgBRight.visible = !this._blackIsOpen;
                    this.imgBdown.visible = this._blackIsOpen;
                    this.labBTitel.text = Language.getExpression(Language.E_HMD12, GameModels.friends.blackList.length, 50);
                    if (this._blackIsOpen) {
                        for (i = 0; i < GameModels.friends.blackList.length; i++) {
                            var blackCell = new renderer.FriendListCell();
                            blackCell.data = GameModels.friends.blackList[i];
                            this._blackListCell.push(blackCell);
                            this.backListGroup.addChild(blackCell);
                            blackCell.x = 0;
                            blackCell.y = blackCell.height * i;
                        }
                    }
                    this.friendTitelGroup.y = 0;
                    this.friendListGroup.y = this.friendTitelGroup.y + this.friendTitelGroup.height;
                    this.backTitelGroup.y = this.friendListGroup.y + this.friendListGroup.height;
                    this.backListGroup.y = this.backTitelGroup.y + this.backTitelGroup.height;
                };
                FriendsDialog.prototype.clean = function () {
                    for (var _i = 0, _a = this._friendCell; _i < _a.length; _i++) {
                        var cell = _a[_i];
                        cell.data = null;
                    }
                    for (var _b = 0, _c = this._blackListCell; _b < _c.length; _b++) {
                        var cell = _c[_b];
                        cell.data = null;
                    }
                    while (this.friendListGroup.numChildren > 0) {
                        this.friendListGroup.removeChildAt(0);
                    }
                    while (this.backListGroup.numChildren > 0) {
                        this.backListGroup.removeChildAt(0);
                    }
                    this.friendTitelGroup.y = 0;
                    this.friendListGroup.y = this.friendTitelGroup.y + this.friendTitelGroup.height;
                    this.backTitelGroup.y = this.friendListGroup.y + this.friendListGroup.height;
                    this.backListGroup.y = this.backTitelGroup.y + this.backTitelGroup.height;
                };
                FriendsDialog.prototype.onTabClick = function (e) {
                    switch (e.target) {
                        case this.btnAdd:
                            mg.alertManager.showAlert(ApplyFriendAlert, false, true, null);
                            break;
                        case this.btnTui:
                            mg.alertManager.showAlert(dialog.sociality.friend.TuiJianFriendListDialog);
                            break;
                        case this.btnApply:
                            GameModels.friends.applyClickBol = false;
                            mg.alertManager.showAlert(dialog.sociality.friend.ApplyFriendListDialog);
                            break;
                        case this.btnPm:
                            mg.alertManager.showAlert(dialog.sociality.friend.PrivateChatDialog);
                            break;
                        case this.friendTitelGroup:
                            this._friendIsOpen = !this._friendIsOpen;
                            this.showView();
                            break;
                        case this.backTitelGroup:
                            this._blackIsOpen = !this._blackIsOpen;
                            this.showView();
                            break;
                    }
                };
                return FriendsDialog;
            }(ui.FriendsDialogSkin));
            friend.FriendsDialog = FriendsDialog;
            __reflect(FriendsDialog.prototype, "dialog.sociality.friend.FriendsDialog", ["IModuleView", "egret.DisplayObject"]);
        })(friend = sociality.friend || (sociality.friend = {}));
    })(sociality = dialog.sociality || (dialog.sociality = {}));
})(dialog || (dialog = {}));
