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
            var ApplyFriendListDialog = (function (_super) {
                __extends(ApplyFriendListDialog, _super);
                function ApplyFriendListDialog() {
                    return _super.call(this) || this;
                }
                ApplyFriendListDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this.listApply.itemRenderer = renderer.ApplyFriendListCell;
                    // Mediator.getMediator(this).onAdd(this, this.enter);
                    // Mediator.getMediator(this).onRemove(this, this.exit);
                };
                ApplyFriendListDialog.prototype.show = function (data) {
                    if (data === void 0) { data = null; }
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    GameModels.friends.addEventListener(mo.ModelFriend.APPLY_LIST_CHANGE, this.showView, this);
                    GameModels.friends.getApplyListInfo(utils.Handler.create(this, this.showView));
                };
                ApplyFriendListDialog.prototype.hide = function () {
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    GameModels.friends.removeEventListener(mo.ModelFriend.APPLY_LIST_CHANGE, this.showView, this);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                ApplyFriendListDialog.prototype.showView = function () {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(GameModels.friends.applyList);
                    }
                    else {
                        this._listData.source = GameModels.friends.applyList;
                    }
                    this.listApply.dataProvider = this._listData;
                };
                ApplyFriendListDialog.prototype.onClick = function (e) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                return ApplyFriendListDialog;
            }(ui.ApplyFriendListSkin));
            friend.ApplyFriendListDialog = ApplyFriendListDialog;
            __reflect(ApplyFriendListDialog.prototype, "dialog.sociality.friend.ApplyFriendListDialog", ["IAlert", "egret.DisplayObject"]);
        })(friend = sociality.friend || (sociality.friend = {}));
    })(sociality = dialog.sociality || (dialog.sociality = {}));
})(dialog || (dialog = {}));
