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
            var TuiJianFriendListDialog = (function (_super) {
                __extends(TuiJianFriendListDialog, _super);
                function TuiJianFriendListDialog() {
                    return _super.call(this) || this;
                }
                TuiJianFriendListDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this.listRecommendation.itemRenderer = renderer.TuiJianFriendListCell;
                    this.labNoPlayer.visible = false;
                    // Mediator.getMediator(this).onAdd(this, this.enter);
                    // Mediator.getMediator(this).onRemove(this, this.exit);
                };
                TuiJianFriendListDialog.prototype.show = function (data) {
                    if (data === void 0) { data = null; }
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    GameModels.friends.addEventListener(mo.ModelFriend.RECOMMEND_LIST_CHANGE, this.showView, this);
                    GameModels.friends.getRecommendationListInfo(utils.Handler.create(this, this.showView));
                };
                TuiJianFriendListDialog.prototype.hide = function () {
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    GameModels.friends.removeEventListener(mo.ModelFriend.RECOMMEND_LIST_CHANGE, this.showView, this);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                TuiJianFriendListDialog.prototype.showView = function () {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(GameModels.friends.recommendationlist);
                    }
                    else {
                        this._listData.source = GameModels.friends.recommendationlist;
                    }
                    this.listRecommendation.dataProvider = this._listData;
                    this.labNoPlayer.visible = true;
                    if (GameModels.friends.recommendationlist.length > 0) {
                        this.labNoPlayer.visible = false;
                    }
                };
                TuiJianFriendListDialog.prototype.onClick = function (e) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                return TuiJianFriendListDialog;
            }(ui.TuiJianFriendListSkin));
            friend.TuiJianFriendListDialog = TuiJianFriendListDialog;
            __reflect(TuiJianFriendListDialog.prototype, "dialog.sociality.friend.TuiJianFriendListDialog", ["IAlert", "egret.DisplayObject"]);
        })(friend = sociality.friend || (sociality.friend = {}));
    })(sociality = dialog.sociality || (dialog.sociality = {}));
})(dialog || (dialog = {}));
