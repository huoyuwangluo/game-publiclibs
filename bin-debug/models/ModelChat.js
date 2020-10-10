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
var mo;
(function (mo) {
    var ModelChat = (function (_super) {
        __extends(ModelChat, _super);
        function ModelChat() {
            var _this = _super.call(this) || this;
            _this.CHAT_MAX_COUNT = 50;
            _this._isOpened = false;
            _this._isHashChatView = false;
            return _this;
        }
        ModelChat.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._unreadCount = 0;
            this._curChannelType = -1;
            this._channels = [];
            this._channels[TypeChatChannel.WORLD] = new eui.ArrayCollection();
            this._channels[TypeChatChannel.LEGION] = new eui.ArrayCollection();
            this._channels[TypeChatChannel.SYS] = new eui.ArrayCollection();
            this._channels[TypeChatChannel.COLLIGATE] = new eui.ArrayCollection();
            this._channels[TypeChatChannel.CROSSREALM] = new eui.ArrayCollection();
            this.channelType = TypeChatChannel.COLLIGATE;
            this.requestChat();
            this.onRoute(n.MessageMap.G2C_CHAT_NOTIFY_MSG, utils.Handler.create(this, this.receiveMessageHandler, null, false));
        };
        Object.defineProperty(ModelChat.prototype, "unreadCount", {
            get: function () {
                return this._unreadCount;
            },
            set: function (v) {
                this._unreadCount = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelChat.prototype.chatTaskUpdata = function () {
            this.dispatchEventWith(mo.ModelChat.CHAT_TASK_UPDATA);
        };
        ModelChat.prototype.requestChat = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Chat_GetHistoryChat);
            this.request(n.MessageMap.C2G_CHAT_GETHISTORYCHAT, msg, utils.Handler.create(this, function (data) {
                _this.receiveMultiMessageHandler(data);
            }));
        };
        //添加消息
        ModelChat.prototype.pushMessage = function (chatVO) {
            if (chatVO.type != TypeChatChannel.SYS && GameModels.friends.isBlackList(chatVO.id))
                return;
            var arrayCollection = this._channels[chatVO.type];
            arrayCollection.addItem(chatVO);
            if (arrayCollection.length > this.CHAT_MAX_COUNT) {
                //频道溢出回收
                vo.toPool(arrayCollection.removeItemAt(0));
            }
            var colligateCollection = this._channels[TypeChatChannel.COLLIGATE];
            colligateCollection.addItem(chatVO);
            if (colligateCollection.length > this.CHAT_MAX_COUNT) {
                //综合不需要回收,因为chatVO会在各个频道溢出后自动回收
                colligateCollection.removeItemAt(0);
            }
            if (chatVO.isHorstLamp) {
                if (this._horseLampHandler) {
                    this._horseLampHandler.runWith(chatVO.clone());
                }
            }
            return chatVO;
        };
        //监听消息
        ModelChat.prototype.receiveMessageHandler = function (data) {
            var _vo = vo.fromPool(vo.ChatVO);
            _vo.initializeProto(data);
            var chatVO = this.pushMessage(_vo);
            if (chatVO.type != TypeChatChannel.SYS && data.PlayerInfo.PlayerId != GameModels.user.player.uid) {
                this.unreadCount = this.unreadCount + 1;
            }
            if (data.PlayerInfo.PlayerId == GameModels.user.player.uid && data.Type != TypeChatChannel.SYS && data.IsSystemNotice == 0) {
                GameModels.platform.uploadChat(data.Msg, data.Type.toString());
            }
            //this.receiveMessage(chatVO);
            if (this._messageReciveHandler) {
                this._messageReciveHandler.run();
            }
            if (this._messageReciveHandler1) {
                this._messageReciveHandler1.run();
            }
        };
        //增加系统公告缓存
        ModelChat.prototype.receiveMultiMessageHandler = function (data) {
            data.autoRecover = false;
            for (var _i = 0, _a = data.Msgs; _i < _a.length; _i++) {
                var msg = _a[_i];
                var _vo = vo.fromPool(vo.ChatVO);
                _vo.initializeProto(msg);
                this.pushMessage(_vo);
            }
            if (this._messageReciveHandler) {
                this._messageReciveHandler.run();
            }
            if (this._messageReciveHandler1) {
                this._messageReciveHandler1.run();
            }
        };
        Object.defineProperty(ModelChat.prototype, "channelType", {
            /**当前频道类型 */
            get: function () {
                return this._curChannelType;
            },
            set: function (type) {
                if (this._curChannelType != type) {
                    this._curChannelType = type;
                    this._currentCollection = this._channels[type];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelChat.prototype, "isOpened", {
            /**面板是否处于打开状态 */
            get: function () {
                return this._isOpened;
            },
            set: function (value) {
                if (this._isOpened != value) {
                    this._isOpened = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelChat.prototype, "isHashChatView", {
            get: function () {
                return this._isHashChatView;
            },
            set: function (value) {
                if (this._isHashChatView != value) {
                    this._isHashChatView = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelChat.prototype, "currentCollection", {
            /**当前消息集结构 */
            get: function () {
                return this._currentCollection;
            },
            enumerable: true,
            configurable: true
        });
        /**显示测试消息 */
        ModelChat.prototype.sendDebugMessage = function (content) {
            this.pushMessage(vo.fromPool(vo.ChatVO, { name: GameModels.user.player.name, id: GameModels.user.player.uid, content: content, type: TypeChatChannel.WORLD }));
            if (this._messageReciveHandler) {
                this._messageReciveHandler.run();
            }
            if (this._messageReciveHandler1) {
                this._messageReciveHandler1.run();
            }
        };
        /**发送消息 */
        ModelChat.prototype.sendChatMessage = function (content) {
            content = GameModels.login.replaceSensitives(content);
            if (this._curChannelType == TypeChatChannel.WORLD || this._curChannelType == TypeChatChannel.COLLIGATE) {
                if ((GameModels.user.player.level >= 20 || GameModels.user.player.vip >= 1)) {
                    if (content == this._lastContent) {
                        //this.pushMessage(vo.fromPool(vo.ChatVO, { name: GameModels.user.player.name, id: GameModels.user.player.uid, content: content, type: TypeChatChannel.WORLD }) as vo.ChatVO)
                        return;
                    }
                    this.sendHandler(this._curChannelType, content);
                }
                else {
                    mg.alertManager.tip(Language.J_VIPFY, 0xFF0000);
                }
            }
            else if (this._curChannelType == TypeChatChannel.LEGION) {
                if ((GameModels.user.player.level >= 20 || GameModels.user.player.vip >= 1)) {
                    if (content == this._lastContent) {
                        //this.pushMessage(vo.fromPool(vo.ChatVO, { name: GameModels.user.player.name, id: GameModels.user.player.uid, content: content, type: TypeChatChannel.LEGION }) as vo.ChatVO)
                        return;
                    }
                    this.sendHandler(this._curChannelType, content);
                }
                else {
                    mg.alertManager.tip(Language.J_VIPFY, 0xFF0000);
                }
            }
            else if (this._curChannelType == TypeChatChannel.CROSSREALM) {
                if ((GameModels.user.player.level >= 100 || GameModels.user.player.vip >= 3)) {
                    this.sendHandler(this._curChannelType, content);
                }
                else {
                    mg.alertManager.tip(Language.J_VIP2FY, 0xFF0000);
                }
            }
        };
        ModelChat.prototype.sendHandler = function (type, content) {
            if (type == TypeChatChannel.COLLIGATE)
                type = TypeChatChannel.WORLD;
            var cmd = n.MessagePool.from(n.C2G_Chat_Send);
            cmd.Type = type;
            cmd.Msg = content;
            this.notify(n.MessageMap.C2G_CHAT_SEND, cmd);
            this._lastContent = content;
        };
        /**监听消息变更 */
        ModelChat.prototype.onMessageRecive = function (caller, method) {
            this.offMessageRecive();
            this._messageReciveHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelChat.prototype.offMessageRecive = function () {
            if (this._messageReciveHandler) {
                this._messageReciveHandler.recover();
                this._messageReciveHandler = null;
            }
        };
        /**监听消息变更 */
        ModelChat.prototype.onMessageRecive1 = function (caller, method) {
            this.offMessageRecive1();
            this._messageReciveHandler1 = utils.Handler.create(caller, method, null, false);
        };
        ModelChat.prototype.offMessageRecive1 = function () {
            if (this._messageReciveHandler1) {
                this._messageReciveHandler1.recover();
                this._messageReciveHandler1 = null;
            }
        };
        /**监听跑马灯消息 */
        ModelChat.prototype.onHorseLamp = function (caller, method) {
            this.offHorseLamp();
            this._horseLampHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelChat.prototype.offHorseLamp = function () {
            if (this._horseLampHandler) {
                this._horseLampHandler.recover();
                this._horseLampHandler = null;
            }
        };
        ModelChat.prototype.clearChannels = function () {
            for (var key in this._channels) {
                this._channels[key].removeAll();
            }
        };
        ModelChat.prototype.changeQuickLan = function () {
            this.dispatchEventWith(ModelChat.CHANGE_QUICKLAN);
        };
        //----吐槽----//
        ModelChat.prototype.requestSendSuggestMsg = function (msgs, complete) {
            var msg = n.MessagePool.from(n.C2G_Suggest_SendMsg);
            msg.Msg = msgs;
            this.notify(n.MessageMap.C2G_SUGGEST_SENDMSG, msg);
        };
        ModelChat.CHANGE_QUICKLAN = "CHANGE_QUICKLAN";
        ModelChat.CHAT_TASK_UPDATA = "CHAT_TASK_UPDATA";
        return ModelChat;
    }(mo.ModelBase));
    mo.ModelChat = ModelChat;
    __reflect(ModelChat.prototype, "mo.ModelChat");
})(mo || (mo = {}));
