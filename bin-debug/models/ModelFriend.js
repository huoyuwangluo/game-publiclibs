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
    var ModelFriend = (function (_super) {
        __extends(ModelFriend, _super);
        function ModelFriend() {
            var _this = _super.call(this) || this;
            _this._applyClickBol = true;
            _this._isNewApply = false;
            return _this;
        }
        ModelFriend.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._friendList = [];
            this._blackList = [];
            this._applylist = [];
            this._recommendationlist = [];
            this._playerList = [];
            this.onRoute(n.MessageMap.G2C_NOTIFYFRIENDADD, utils.Handler.create(this, this.NotifyFiendadd, null, false));
            this.onRoute(n.MessageMap.G2C_NOTIFYFRIENDDELETE, utils.Handler.create(this, this.NotifyFiendDelete, null, false));
            this.onRoute(n.MessageMap.G2C_NOTIFYFRIENDPRIVATECHAT, utils.Handler.create(this, this.NotifyFriendPrivateChat, null, false));
            this.onRoute(n.MessageMap.G2C_NOTIFYFRIENDAPPLY, utils.Handler.create(this, this.NotifyFriendApply, null, false));
            this.getListInfo();
            this.getApplyListInfo();
            this.getPrivateChatInfo();
        };
        ModelFriend.prototype.getPromptInfo = function (playerId, callback) {
            if (playerId == "")
                return;
            // if (playerId == GameModels.user.player.uid) {
            //     mg.uiManager.show(dialog.playerInfo.PlayerInfo, playerId);
            //     return;
            // }
            var msg = n.MessagePool.from(n.C2G_Friend_Prompt);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_FRIEND_PROMPT, msg, utils.Handler.create(this, function (data) {
                data.autoRecover = false;
                if (callback) {
                    callback.runWith(data.info, data.FriendChallengeTime);
                }
            }));
        };
        ModelFriend.prototype.getListInfo = function (callback) {
            var _this = this;
            this.request(n.MessageMap.C2G_FRIEND_INFO, n.MessagePool.from(n.C2G_Friend_Info), utils.Handler.create(this, function (data) {
                _this._friendList = [];
                for (var i = 0; i < data.FriendsInfos.length; i++) {
                    var friendVO = vo.fromPool(vo.FriendVO);
                    friendVO.decode(data.FriendsInfos[i]);
                    _this._friendList.push(friendVO);
                }
                _this._blackList = [];
                for (var i = 0; i < data.BlackListInfos.length; i++) {
                    var blackVO = vo.fromPool(vo.FriendVO);
                    blackVO.decode(data.BlackListInfos[i]);
                    _this._blackList.push(blackVO);
                }
                if (callback) {
                    callback.run();
                }
            }));
        };
        //申请添加好友
        ModelFriend.prototype.sendAddFriend = function (playerName, callback) {
            var msg = n.MessagePool.from(n.C2G_Friend_ApplyAdd);
            msg.PlayerName = playerName;
            this.request(n.MessageMap.C2G_FRIEND_APPLYADD, msg, utils.Handler.create(this, function (data) {
                if (callback) {
                    callback.runWith(data);
                }
            }));
        };
        //申请列表
        ModelFriend.prototype.getApplyListInfo = function (callback) {
            var _this = this;
            this.request(n.MessageMap.C2G_FRIEND_APPLYADDINFO, n.MessagePool.from(n.C2G_Friend_ApplyAddInfo), utils.Handler.create(this, function (data) {
                _this._applylist = [];
                for (var i = 0; i < data.Infos.length; i++) {
                    var friendVO = vo.fromPool(vo.FriendVO);
                    friendVO.decode(data.Infos[i]);
                    _this._applylist.push(friendVO);
                }
                if (callback) {
                    callback.run();
                }
                GameModels.state.updateState(GameRedState.SOCIALITY_FRIENDS_APPLY);
                GameModels.state.updateState(GameRedState.MAIN_SOCIALITY);
            }));
        };
        //申请列表操作//(1,同意; 2,拒绝)
        ModelFriend.prototype.sendApplyAddType = function (playerId, type) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Friend_AddType);
            msg.PlayerId = playerId;
            msg.Type = type;
            this.request(n.MessageMap.C2G_FRIEND_ADDTYPE, msg, utils.Handler.create(this, function (data) {
                _this._applylist = [];
                for (var i = 0; i < data.Infos.length; i++) {
                    var friendVO = vo.fromPool(vo.FriendVO);
                    friendVO.decode(data.Infos[i]);
                    _this._applylist.push(friendVO);
                }
                _this.dispatchEventWith(ModelFriend.APPLY_LIST_CHANGE);
            }));
        };
        //删除好友
        ModelFriend.prototype.sendDeleteFriend = function (playerId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Friend_Delete);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_FRIEND_DELETE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    _this.deleteFriend(data.PlayerId);
                }
            }));
        };
        ModelFriend.prototype.deleteFriend = function (playerId) {
            for (var i = 0; i < this._friendList.length; i++) {
                if (playerId == this._friendList[i].PlayerId) {
                    this._friendList.splice(i, 1);
                }
            }
            this.dispatchEventWith(ModelFriend.FRIEND_LIST_CHANGE);
        };
        //通知好友添加
        ModelFriend.prototype.NotifyFiendadd = function (data) {
            var friendVO = vo.fromPool(vo.FriendVO);
            friendVO.decode(data.Info);
            this._friendList.push(friendVO);
            this.dispatchEventWith(ModelFriend.FRIEND_LIST_CHANGE);
        };
        //通知删除好友
        ModelFriend.prototype.NotifyFiendDelete = function (data) {
            this.deleteFriend(data.PlayerId);
        };
        //加黑名单
        ModelFriend.prototype.sendAddBlackList = function (playerId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Blacklist_Add);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_BLACKLIST_ADD, msg, utils.Handler.create(this, function (data) {
                var friendVO = vo.fromPool(vo.FriendVO);
                friendVO.decode(data.Info);
                _this._blackList.push(friendVO);
                _this.dispatchEventWith(ModelFriend.FRIEND_LIST_CHANGE);
            }));
        };
        //删黑名单
        ModelFriend.prototype.sendDeleteBlackList = function (playerId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Blacklist_Delete);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_BLACKLIST_DELETE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    _this.deleteBlackList(data.PlayerId);
                }
            }));
        };
        ModelFriend.prototype.deleteBlackList = function (playerId) {
            for (var i = 0; i < this._blackList.length; i++) {
                if (playerId == this._blackList[i].PlayerId) {
                    this._blackList.splice(i, 1);
                }
            }
            this.dispatchEventWith(ModelFriend.FRIEND_LIST_CHANGE);
        };
        //推荐列表
        ModelFriend.prototype.getRecommendationListInfo = function (callback) {
            var _this = this;
            this.request(n.MessageMap.C2G_FRIEND_RECOMMENDATION, n.MessagePool.from(n.C2G_Friend_Recommendation), utils.Handler.create(this, function (data) {
                _this._recommendationlist = [];
                for (var i = 0; i < data.Infos.length; i++) {
                    var friendVO = vo.fromPool(vo.FriendVO);
                    friendVO.decode(data.Infos[i]);
                    _this._recommendationlist.push(friendVO);
                }
                if (callback) {
                    callback.run();
                }
            }));
        };
        ModelFriend.prototype.deleteRecommendationList = function (playerId) {
            for (var i = 0; i < this._recommendationlist.length; i++) {
                if (playerId == this._recommendationlist[i].PlayerId) {
                    this._recommendationlist.splice(i, 1);
                }
            }
            this.dispatchEventWith(ModelFriend.RECOMMEND_LIST_CHANGE);
        };
        //私聊
        ModelFriend.prototype.getPrivateChatInfo = function (callback) {
            var _this = this;
            this.request(n.MessageMap.C2G_FRIEND_PRIVATECHATINFO, n.MessagePool.from(n.C2G_Friend_PrivateChatInfo), utils.Handler.create(this, function (data) {
                for (var _i = 0, _a = data.Infos; _i < _a.length; _i++) {
                    var chatItem = _a[_i];
                    var haveFriendVO = _this.isHave(chatItem.PlayerId);
                    if (!haveFriendVO) {
                        var friendVO = vo.fromPool(vo.FriendVO);
                        friendVO.PlayerId = chatItem.PlayerId;
                        friendVO.ProfessionId = chatItem.ProfessionId;
                        friendVO.PlayerName = chatItem.PlayerName;
                        friendVO.headIcon = chatItem.HeadIcon;
                        _this._playerList.push(friendVO);
                        haveFriendVO = friendVO;
                    }
                    haveFriendVO.isNew = (chatItem.RedState == 1 ? true : false);
                    haveFriendVO.Time = chatItem.Time;
                    haveFriendVO.ChatData = chatItem.Infos;
                }
                if (callback) {
                    callback.run();
                }
                GameModels.state.updateState(GameRedState.SOCIALITY_PRIVATE_CHAT);
            }));
        };
        /**发送消息 */
        ModelFriend.prototype.sendChatMessage = function (playerId, content) {
            content = GameModels.login.replaceSensitives(content);
            var msg = n.MessagePool.from(n.C2G_Friend_PrivateChat);
            msg.PlayerId = playerId;
            msg.Message = content;
            GameModels.platform.uploadChat(content, "5"); //私聊上报
            this.request(n.MessageMap.C2G_FRIEND_PRIVATECHAT, msg, utils.Handler.create(this, function (data) { }));
        };
        //通知聊天
        ModelFriend.prototype.NotifyFriendPrivateChat = function (data) {
            var haveFriendVO = this.isHave(data.PlayerId);
            if (!haveFriendVO) {
                var friendVO = vo.fromPool(vo.FriendVO);
                friendVO.PlayerId = data.PlayerId;
                friendVO.ProfessionId = data.ProfessionId;
                friendVO.PlayerName = data.PlayerName;
                this._playerList.push(friendVO);
                haveFriendVO = friendVO;
            }
            if (data.Info.Type != 1) {
                haveFriendVO.isNew = true;
                GameModels.state.updateState(GameRedState.SOCIALITY_PRIVATE_CHAT);
            }
            haveFriendVO.Time = data.Time;
            haveFriendVO.updateChatData(data.Info);
            this.dispatchEventWith(ModelFriend.FRIEND_CHAT_CHANGE);
        };
        /**删除某个好友的聊天记录 */
        ModelFriend.prototype.deleteFriendChatMessage = function (playerId, callback) {
            var msg = n.MessagePool.from(n.C2G_Friend_PrivateChatDelete);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_FRIEND_PRIVATECHATDELETE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (callback) {
                        callback.run();
                    }
                }
            }));
        };
        ModelFriend.prototype.deletePlayerList = function (playerId) {
            for (var i = 0; i < this._playerList.length; i++) {
                if (playerId == this._playerList[i].PlayerId) {
                    this._playerList.splice(i, 1);
                }
            }
            this.dispatchEventWith(ModelFriend.FRIEND_CHAT_LIST_CHANGE);
        };
        //通知有新的好友申请
        ModelFriend.prototype.NotifyFriendApply = function (data) {
            if (data.RedState == 1) {
                this.applyClickBol = true;
                this._isNewApply = true;
                GameModels.state.updateState(GameRedState.SOCIALITY_FRIENDS_APPLY);
                GameModels.state.updateState(GameRedState.MAIN_SOCIALITY);
            }
        };
        /**读取私聊 */
        ModelFriend.prototype.friendPrivateChatRead = function (playerId, callback) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Friend_PrivateChatRead);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_FRIEND_PRIVATECHATREAD, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    var haveFriendVO = _this.isHave(playerId);
                    if (!haveFriendVO) {
                        var friendVO = vo.fromPool(vo.FriendVO);
                        friendVO.PlayerId = playerId;
                        _this._playerList.push(friendVO);
                        haveFriendVO = friendVO;
                    }
                    haveFriendVO.isNew = false;
                    if (callback) {
                        callback.run();
                    }
                    GameModels.state.updateState(GameRedState.SOCIALITY_PRIVATE_CHAT);
                }
            }));
        };
        Object.defineProperty(ModelFriend.prototype, "friendList", {
            get: function () {
                return this._friendList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFriend.prototype, "blackList", {
            get: function () {
                return this._blackList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFriend.prototype, "applyList", {
            get: function () {
                return this._applylist;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFriend.prototype, "recommendationlist", {
            get: function () {
                return this._recommendationlist;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFriend.prototype, "playerList", {
            get: function () {
                return this._playerList;
            },
            enumerable: true,
            configurable: true
        });
        ModelFriend.prototype.getChatFriendVo = function (playerId) {
            for (var _i = 0, _a = this._playerList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.PlayerId == playerId) {
                    return obj;
                }
            }
            return null;
        };
        ModelFriend.prototype.setChatPlayer = function (data) {
            var haveFriendVO = this.isHave(data.PlayerId);
            if (!haveFriendVO) {
                var friendVO = vo.fromPool(vo.FriendVO);
                friendVO.decode(data);
                this._playerList.unshift(friendVO);
            }
        };
        ModelFriend.prototype.isHave = function (playerId) {
            for (var _i = 0, _a = this._playerList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.PlayerId == playerId) {
                    return obj;
                }
            }
            return null;
        };
        ModelFriend.prototype.getIndeOfPlayerList = function (data) {
            var count = 0;
            for (var _i = 0, _a = this._playerList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.PlayerId == data.PlayerId) {
                    return count;
                }
                count++;
            }
            return 0;
        };
        ModelFriend.prototype.isFriend = function (id) {
            for (var _i = 0, _a = this._friendList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.PlayerId == id) {
                    return true;
                }
            }
            return false;
        };
        ModelFriend.prototype.isBlackList = function (id) {
            for (var _i = 0, _a = this._blackList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.PlayerId == id) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(ModelFriend.prototype, "applyClickBol", {
            get: function () {
                return this._applyClickBol;
            },
            set: function (value) {
                this._isNewApply = false;
                if (this._applyClickBol != value) {
                    this._applyClickBol = value;
                    GameModels.state.updateState(GameRedState.SOCIALITY_FRIENDS_APPLY);
                    GameModels.state.updateState(GameRedState.MAIN_SOCIALITY);
                }
            },
            enumerable: true,
            configurable: true
        });
        ModelFriend.prototype.checkApplyList = function () {
            if ((this.applyList.length > 0 || this._isNewApply) && this._applyClickBol) {
                return true;
            }
            return false;
        };
        ModelFriend.prototype.checkPrivateChatRed = function () {
            for (var _i = 0, _a = this.playerList; _i < _a.length; _i++) {
                var friendVO = _a[_i];
                if (friendVO.isNew) {
                    return true;
                }
            }
            return false;
        };
        ModelFriend.prototype.mainPrivateChatRedPoint = function () {
            var view = mg.uiManager.getView(s.UserfaceName.main);
            if (view && view.chat && view.chat.btnChat.isWarn) {
                return true;
            }
            return false;
        };
        ModelFriend.FRIEND_LIST_CHANGE = "friend_list_change";
        ModelFriend.APPLY_LIST_CHANGE = "apply_list_change";
        ModelFriend.RECOMMEND_LIST_CHANGE = "recommendation_list_change";
        ModelFriend.FRIEND_CHAT_LIST_CHANGE = "friend_chat_list_change";
        ModelFriend.FRIEND_CHAT_CHANGE = "friend_chat_change";
        return ModelFriend;
    }(mo.ModelBase));
    mo.ModelFriend = ModelFriend;
    __reflect(ModelFriend.prototype, "mo.ModelFriend");
})(mo || (mo = {}));
