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
            var PrivateChatDialog = (function (_super) {
                __extends(PrivateChatDialog, _super);
                function PrivateChatDialog() {
                    var _this = _super.call(this) || this;
                    _this._isShowEmoji = false;
                    return _this;
                }
                // protected initialize() {
                // 	super.initialize();
                // 	// Mediator.getMediator(this).onAdd(this, this.enter);
                // 	// Mediator.getMediator(this).onRemove(this, this.exit);
                // }
                PrivateChatDialog.prototype.show = function (data) {
                    if (data === void 0) { data = null; }
                    this.labDelete.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_SC);
                    this.emojiView.init();
                    this._isShowEmoji = false;
                    this.emojiView.showView(this._isShowEmoji);
                    this.emojiView.onSelectChangeHandler(this, this.onSelectChange);
                    this._selectIndex = 0;
                    if (data) {
                        GameModels.friends.setChatPlayer(data);
                        this._selectIndex = GameModels.friends.getIndeOfPlayerList(data);
                    }
                    this.labPlayerName.text = "";
                    this.labDelete.visible = false;
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.labDelete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.inputTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
                    this.listHead.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnHeadClick, this);
                    GameModels.friends.addEventListener(mo.ModelFriend.FRIEND_CHAT_CHANGE, this.showChatView, this);
                    GameModels.friends.addEventListener(mo.ModelFriend.FRIEND_CHAT_LIST_CHANGE, this.showDeleteView, this);
                    this.btnEmoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    GameModels.friends.getPrivateChatInfo(utils.Handler.create(this, this.showView));
                };
                PrivateChatDialog.prototype.hide = function () {
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.labDelete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.btnEmoji.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.inputTxt.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
                    this.listHead.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnHeadClick, this);
                    GameModels.friends.removeEventListener(mo.ModelFriend.FRIEND_CHAT_CHANGE, this.showChatView, this);
                    GameModels.friends.removeEventListener(mo.ModelFriend.FRIEND_CHAT_LIST_CHANGE, this.showDeleteView, this);
                    this.clearList(this.listHead);
                    this._listPlayerData = null;
                    this._listChatData = null;
                    this.clearList(this.listChat);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                PrivateChatDialog.prototype.onSelectChange = function (data) {
                    this._isShowEmoji = false;
                    this.btnEmoji.source = this._isShowEmoji ? "uiMain_json.main_chat_btn_face2" : "uiMain_json.main_chat_btn_face";
                    var chatStr = this.inputTxt.text;
                    this.inputTxt.text = chatStr + data;
                };
                PrivateChatDialog.prototype.btnHeadClick = function (e) {
                    this.selectItem(e.itemIndex);
                };
                PrivateChatDialog.prototype.selectItem = function (vaule) {
                    this._selectIndex = vaule;
                    this.listHead.selectedIndex = vaule;
                    this._selectData = GameModels.friends.playerList[vaule]; //this.listHead.selectedItem;
                    if (this._selectData) {
                        this.showRightView(this._selectData.PlayerId);
                        GameModels.friends.friendPrivateChatRead(this._selectData.PlayerId, utils.Handler.create(this, this.playerListView));
                    }
                };
                PrivateChatDialog.prototype.playerListView = function () {
                    if (!this._listPlayerData) {
                        this._listPlayerData = new eui.ArrayCollection(GameModels.friends.playerList);
                        this.listHead.dataProvider = this._listPlayerData;
                    }
                    else {
                        if (GameModels.friends.playerList.length > 0) {
                            this._listPlayerData.replaceAll(GameModels.friends.playerList);
                        }
                        else {
                            this._listPlayerData.source = GameModels.friends.playerList;
                        }
                    }
                };
                PrivateChatDialog.prototype.showView = function () {
                    this.playerListView();
                    this.selectItem(this._selectIndex);
                    this.labNoPlayer.visible = false;
                    if (GameModels.friends.playerList.length <= 0) {
                        this.labPlayerName.text = "";
                        this.labDelete.visible = false;
                        this.labNoPlayer.visible = true;
                        if (this._listChatData)
                            this._listChatData.source = null;
                    }
                };
                PrivateChatDialog.prototype.showChatView = function () {
                    this.showView();
                };
                PrivateChatDialog.prototype.showDeleteView = function () {
                    this._selectIndex = 0;
                    this.showView();
                };
                PrivateChatDialog.prototype.showRightView = function (playerId) {
                    var list = [];
                    var friendVo = GameModels.friends.getChatFriendVo(playerId);
                    if (friendVo) {
                        list = friendVo.ChatData;
                    }
                    if (!this._listChatData) {
                        this._listChatData = new eui.ArrayCollection(list);
                        this.listChat.dataProvider = this._listChatData;
                    }
                    else {
                        this._listChatData.source = list;
                    }
                    this.labPlayerName.text = this._selectData.PlayerName;
                    this.labDelete.visible = true;
                    this.scrollBottom();
                };
                PrivateChatDialog.prototype.onClick = function (e) {
                    switch (e.target) {
                        case this.btnEmoji:
                            this._isShowEmoji = !this._isShowEmoji;
                            this.btnEmoji.source = this._isShowEmoji ? "uiMain_json.main_chat_btn_face2" : "uiMain_json.main_chat_btn_face";
                            this.emojiView.showView(this._isShowEmoji);
                            break;
                        case this.btnClose:
                            //	mg.uiManager.remove(this);
                            this.dispatchEventWith(egret.Event.CLOSE);
                            break;
                        case this.btnSend:
                            this.sendMessage();
                            break;
                        case this.labDelete:
                            GameModels.friends.deleteFriendChatMessage(this._selectData.PlayerId, utils.Handler.create(this, this.deleteFun));
                            break;
                    }
                };
                PrivateChatDialog.prototype.deleteFun = function () {
                    GameModels.friends.deletePlayerList(this._selectData.PlayerId);
                };
                PrivateChatDialog.prototype.onCharactorFocusIn = function (event) {
                    this.inputTxt.text = "";
                };
                PrivateChatDialog.prototype.sendMessage = function () {
                    if (!this._selectData) {
                        mg.alertManager.tip(Language.J_QXZHYJXSL);
                        return;
                    }
                    if (this.inputTxt.text == "") {
                        mg.alertManager.tip(Language.J_SRNRBNWK);
                        return;
                    }
                    if (this.inputTxt.text.length > 30) {
                        mg.alertManager.tip(Language.J_ZDXGZ);
                        return;
                    }
                    GameModels.friends.sendChatMessage(this._selectData.PlayerId, this.inputTxt.text);
                    this.inputTxt.text = "";
                };
                /**滚动到底部 */
                PrivateChatDialog.prototype.scrollBottom = function () {
                    if (this.scrollerChat.verticalScrollBar)
                        this.scrollerChat.verticalScrollBar.visible = false;
                    this.scrollerChat.viewport = this.listChat;
                    this.scrollerChat.validateNow();
                    var v = this.listChat.contentHeight - this.listChat.height;
                    if (v < 0)
                        v = 0;
                    this.scrollerChat.viewport.scrollV = v;
                };
                return PrivateChatDialog;
            }(ui.PrivateChatSkin));
            friend.PrivateChatDialog = PrivateChatDialog;
            __reflect(PrivateChatDialog.prototype, "dialog.sociality.friend.PrivateChatDialog", ["IAlert", "egret.DisplayObject"]);
        })(friend = sociality.friend || (sociality.friend = {}));
    })(sociality = dialog.sociality || (dialog.sociality = {}));
})(dialog || (dialog = {}));
