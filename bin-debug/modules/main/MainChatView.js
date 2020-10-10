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
var main;
(function (main) {
    var MainChatView = (function (_super) {
        __extends(MainChatView, _super);
        function MainChatView() {
            var _this = _super.call(this) || this;
            _this._isShowEmoji = false;
            _this._isQuicklanguage = false;
            return _this;
        }
        MainChatView.prototype.init = function () {
            this._parent = this.parent;
            //this.currentState = "minstate"
            this.scrolleropen.viewport.scrollV = 0;
            this.scrolleropen.viewport.scrollH = 0;
            this.scrollerclose.viewport.scrollV = 0;
            this.scrollerclose.viewport.scrollH = 0;
            this.scrollerclose.touchEnabled = this.scrollerclose.touchChildren = false;
            GameModels.state.registerWarnTarget(GameRedState.MAIL, this.btnYouJian);
            GameModels.state.registerWarnTarget(GameRedState.SOCIALITY, this.btnChat);
            GameModels.chat.onMessageRecive(this, this.reciveChatMesageHandler);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSendClick, this);
            this.btnYouJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMailClick, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChatClick, this);
            this.btnZongHe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            this.btnShiJie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            this.btnJunTuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            this.btnXiTong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClickHandler, this);
            this.listopen.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.listMoveHandler, this);
            this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
            this.btnEmoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            this.btnQuicklanguage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChannelClick, this);
            GameModels.chat.addEventListener(mo.ModelChat.CHANGE_QUICKLAN, this.onQuickLanSelectChange, this);
            this._autoBottomEnabled = true;
            this.closeHandler();
            this.emojiView.init();
            this.shortcutView.init();
            this.btnChat.visible = GameModels.platform.isPay;
        };
        MainChatView.prototype.add = function (isShow) {
            // if (app.gameContext.typeGameLast && app.gameContext.typeGame) {
            // 	if ((app.gameContext.typeGameLast == TypeGame.CITY && app.gameContext.typeGame == TypeGame.ATKCITY)
            // 		|| (app.gameContext.typeGameLast == TypeGame.ATKCITY && app.gameContext.typeGame == TypeGame.CITY)) {
            // 		this.closeHandler();
            // 	}
            // }
            if (isShow === void 0) { isShow = false; }
            this._autoBottomEnabled = true;
            this._isShowEmoji = false;
            this._isQuicklanguage = false;
            this.shortcutView.showView(this._isQuicklanguage);
            this.emojiView.showView(this._isShowEmoji);
            this.emojiView.onSelectChangeHandler(this, this.onSelectChange);
            GameModels.chat.isHashChatView = true;
            if (!isShow && GameModels.user.player.level < 50 && (app.gameContext.manager.gameCurrent.type == TypeGame.ATKCITY || app.gameContext.manager.gameCurrent.type == TypeGame.CITY)) {
                if (app.gameContext.manager.gameCurrent.type == TypeGame.ATKCITY) {
                    this.remove();
                }
                else {
                    this.closeHandler();
                    if (!this.parent)
                        this._parent.addChild(this);
                }
            }
            else {
                if (GameModels.chat.isOpened) {
                    this.openHandler();
                    if (!this.parent)
                        this._parent.addChild(this);
                }
                else {
                    if (!isShow && app.gameContext.manager.gameCurrent.type == TypeGame.ATKCITY) {
                        this.remove();
                        GameModels.chat.isOpened = false;
                    }
                    else {
                        this.closeHandler();
                        if (!this.parent)
                            this._parent.addChild(this);
                    }
                }
            }
        };
        Object.defineProperty(MainChatView.prototype, "isQuicklanguage", {
            get: function () {
                return this._isQuicklanguage;
            },
            enumerable: true,
            configurable: true
        });
        MainChatView.prototype.onSelectChange = function (data) {
            this._isShowEmoji = false;
            this.btnEmoji.source = this._isShowEmoji ? "uiMain_json.main_chat_btn_face2" : "uiMain_json.main_chat_btn_face";
            var chatStr = this.input.text;
            this.input.text = chatStr + data;
        };
        MainChatView.prototype.onQuickLanSelectChange = function () {
            this._isQuicklanguage = false;
        };
        MainChatView.prototype.remove = function () {
            this.emojiView.offSelectChangeHandler();
            GameModels.chat.isHashChatView = false;
            if (this.parent) {
                this.parent.removeChild(this);
                //this._parent.touchEnabled=this._parent.touchChildren=false;
            }
        };
        Object.defineProperty(MainChatView.prototype, "chatChannel", {
            set: function (text) {
                if (this.btnShiJie) {
                    this.btnShiJie.label = text;
                    this.listopen.dataProvider = null;
                    this.listclose.dataProvider = null;
                    this.closeHandler();
                }
            },
            enumerable: true,
            configurable: true
        });
        MainChatView.prototype.reciveChatMesageHandler = function () {
            this.scrollBottom();
        };
        MainChatView.prototype.onCharactorFocusIn = function (event) {
            // this.input.text = "";
            this._autoBottomEnabled = true;
        };
        MainChatView.prototype.onChannelClick = function (e) {
            switch (e.currentTarget) {
                case this.btnZongHe:
                    this.updateChanalDisplay(TypeChatChannel.COLLIGATE);
                    break;
                case this.btnShiJie:
                    this.updateChanalDisplay(TypeChatChannel.WORLD);
                    break;
                case this.btnJunTuan:
                    this.updateChanalDisplay(TypeChatChannel.LEGION);
                    break;
                case this.btnXiTong:
                    this.updateChanalDisplay(TypeChatChannel.SYS);
                    break;
                case this.btnEmoji:
                    this._isQuicklanguage = false;
                    this.shortcutView.hide();
                    this._isShowEmoji = !this._isShowEmoji;
                    this.btnEmoji.source = this._isShowEmoji ? "uiMain_json.main_chat_btn_face2" : "uiMain_json.main_chat_btn_face";
                    this.emojiView.showView(this._isShowEmoji);
                    break;
                case this.btnQuicklanguage:
                    this._isShowEmoji = false;
                    this.emojiView.hide();
                    this._isQuicklanguage = !this._isQuicklanguage;
                    this.shortcutView.showView(this._isQuicklanguage);
                    GameModels.chat.chatTaskUpdata();
                    break;
            }
        };
        MainChatView.prototype.btnCloseClickHandler = function (e) {
            var gameType = app.gameContext.manager.gameCurrent.type;
            if (gameType == TypeGame.ATKCITY) {
                this.remove();
                GameModels.chat.isOpened = false;
            }
            else {
                this.closeHandler();
            }
        };
        MainChatView.prototype.btnSendClick = function (e) {
            if (this.input.text == "") {
                mg.alertManager.tip(Language.J_SRNRBNWK);
                return;
            }
            if (this.input.text.length > 30) {
                mg.alertManager.tip(Language.J_ZDXGZ);
                return;
            }
            GameModels.chat.sendChatMessage(this.input.text);
            this.input.text = "";
            this._autoBottomEnabled = true;
            this.scrollBottom();
        };
        MainChatView.prototype.btnMailClick = function (e) {
            mg.uiManager.show(MailSceneDialog);
        };
        MainChatView.prototype.btnChatClick = function (e) {
            mg.uiManager.show(dialog.sociality.SocialityDialog);
            // mg.uiManager.show(dialog.sociality.friend.PrivateChatDialog);
        };
        MainChatView.prototype.listClickHandler = function (e) {
            this.openHandler();
        };
        MainChatView.prototype.listMoveHandler = function (e) {
            this._autoBottomEnabled = false;
        };
        MainChatView.prototype.stageClickHandler = function (e) {
            if (this.currentState != "maxstate")
                return;
            if (e.target != app.gameContext.scene)
                return;
            if (e.stageX < this._parent.x || e.stageX > (this._parent.x + this.width) || e.stageY < this._parent.y || e.stageY > (this._parent.y + this.height)) {
                this.closeHandler();
            }
        };
        /**更新当前频道显示 */
        MainChatView.prototype.updateChanalDisplay = function (type) {
            switch (type) {
                case TypeChatChannel.COLLIGATE:
                    this.input.prompt = Language.J_FSNRBDCGXGZ;
                    break;
                case TypeChatChannel.WORLD:
                    this.input.prompt = Language.J_FSNRBDCGXGZ;
                    break;
                case TypeChatChannel.LEGION:
                    if (!GameModels.user.player.legionId) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_SFJRJT, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                            mg.uiManager.show(LegionList);
                        }));
                        // mg.uiManager.show(LegionList);
                        this.btnJunTuan.selected = false;
                        return;
                    }
                    this.input.prompt = Language.J_FSNRBDCGXGZ;
                    break;
                case TypeChatChannel.SYS:
                    this.input.prompt = Language.J_XTPDYJFY;
                    break;
                case TypeChatChannel.CROSSREALM:
                    this.input.prompt = Language.J_XTPDYJFY;
                    break;
            }
            GameModels.chat.channelType = type;
            this.input.enabled = GameModels.chat.channelType != TypeChatChannel.SYS;
            this.btnZongHe.selected = GameModels.chat.channelType == TypeChatChannel.COLLIGATE;
            this.btnShiJie.selected = GameModels.chat.channelType == TypeChatChannel.WORLD;
            this.btnJunTuan.selected = GameModels.chat.channelType == TypeChatChannel.LEGION;
            this.btnXiTong.selected = GameModels.chat.channelType == TypeChatChannel.SYS;
            this.scrolleropen.stopAnimation();
            this.listopen.dataProvider = GameModels.chat.currentCollection;
            this._autoBottomEnabled = true;
            this.scrollBottom();
        };
        /**打开面板 */
        MainChatView.prototype.openHandler = function () {
            this.currentState = "maxstate";
            this.validateNow();
            GameModels.chat.isOpened = true;
            this.listclose.dataProvider = null;
            mg.stageManager.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClickHandler, this);
            this.back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClickHandler, this);
            this.updateChanalDisplay(GameModels.chat.channelType ? GameModels.chat.channelType : TypeChatChannel.COLLIGATE);
            GameModels.chat.chatTaskUpdata();
        };
        /**收起面板 */
        MainChatView.prototype.closeHandler = function () {
            this.currentState = "minstate";
            this.validateNow();
            GameModels.chat.isOpened = false;
            GameModels.chat.channelType = GameModels.chat.channelType ? GameModels.chat.channelType : TypeChatChannel.COLLIGATE;
            this.listopen.dataProvider = null;
            this._autoBottomEnabled = true;
            mg.stageManager.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClickHandler, this);
            this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClickHandler, this);
            this.listclose.dataProvider = GameModels.chat.currentCollection;
            this.scrollBottom();
            GameModels.chat.chatTaskUpdata();
        };
        /**滚动到底部 */
        MainChatView.prototype.scrollBottom = function () {
            // if (GameModels.chat.isOpened) {
            // 	if (!this._autoBottomEnabled) return;
            // 	if (this.scrolleropen.verticalScrollBar) this.scrolleropen.verticalScrollBar.visible = false;
            // 	this.listopen.validateNow();
            // 	this.scrolleropen.viewport = this.listopen;
            // 	this.scrolleropen.validateNow();
            // 	var scollVMax: number = this.listopen.contentHeight - this.listopen.height;
            // 	if (scollVMax < 0) scollVMax = 0;
            // 	this.scrolleropen.viewport.scrollV = scollVMax;
            // } else {
            // 	if (this.scrollerclose.verticalScrollBar) this.scrollerclose.verticalScrollBar.visible = false;
            // 	this.listclose.validateNow();
            // 	this.scrollerclose.viewport = this.listclose;
            // 	this.scrollerclose.validateNow();
            // 	var scollVMax: number = this.listclose.contentHeight - this.listclose.height;
            // 	if (scollVMax < 0) scollVMax = 0;
            // 	this.scrollerclose.viewport.scrollV = scollVMax;
            // }
            this.invalidateProperties();
        };
        MainChatView.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            // this.scrollBottom();
            if (GameModels.chat.isOpened) {
                if (!this._autoBottomEnabled)
                    return;
                if (this.scrolleropen.verticalScrollBar)
                    this.scrolleropen.verticalScrollBar.visible = false;
                this.listopen.validateNow();
                this.scrolleropen.viewport = this.listopen;
                this.scrolleropen.validateNow();
                var scollVMax = this.listopen.contentHeight - this.listopen.height;
                if (scollVMax < 0)
                    scollVMax = 0;
                this.scrolleropen.viewport.scrollV = scollVMax;
                this.validateNow();
            }
            else {
                if (this.scrollerclose.verticalScrollBar)
                    this.scrollerclose.verticalScrollBar.visible = false;
                this.listclose.validateNow();
                this.scrollerclose.viewport = this.listclose;
                this.scrollerclose.validateNow();
                var scollVMax = this.listclose.contentHeight - this.listclose.height;
                if (scollVMax < 0)
                    scollVMax = 0;
                this.scrollerclose.viewport.scrollV = scollVMax;
                this.validateNow();
            }
        };
        return MainChatView;
    }(ui.ChatSkin));
    main.MainChatView = MainChatView;
    __reflect(MainChatView.prototype, "main.MainChatView");
})(main || (main = {}));
