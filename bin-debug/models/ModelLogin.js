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
    var ModelLogin = (function (_super) {
        __extends(ModelLogin, _super);
        function ModelLogin(data) {
            var _this = _super.call(this) || this;
            _this._isStopConnect = false;
            _this._maxTryReconnectTimes = 3; //最大尝试重连次数
            _this._curTryReconnectTimes = 0; //当前尝试重连次数
            if (data) {
                _this._account = data._account;
                _this._serverList = data.serverList;
                _this._authData = data.authData;
            }
            _this._gameHost = { ip: null, port: null };
            _this._crossHost = { ip: null, port: null };
            return _this;
        }
        ModelLogin.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.onRoute(n.MessageMap.G2C_NOTIFYADDICTIONINFO, utils.Handler.create(this, this.notifyAddictionInfo));
            this.onRoute(n.MessageMap.G2C_OTHERPLAYERLOGIN, utils.Handler.create(this, this.notifyOtherPlayerLogin));
            this.onRoute(n.MessageMap.G2C_SERVERCLOSE, utils.Handler.create(this, this.notifyServerClose));
        };
        ModelLogin.prototype.getClientType = function () {
            if (game.GameConfig.isAndroid)
                return 1;
            if (game.GameConfig.isPC)
                return 2;
            if (game.GameConfig.isIOS)
                return 3;
            return 0;
        };
        Object.defineProperty(ModelLogin.prototype, "serverList", {
            get: function () {
                return this._serverList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLogin.prototype, "isConnected", {
            get: function () {
                return n.net.connected;
            },
            enumerable: true,
            configurable: true
        });
        /**开始连接socket并询问服务器角色信息 */
        ModelLogin.prototype.enter = function (loginSucessHandler, createHandler) {
            var _this = this;
            n.net.onError(n.MessageMap.C2G_AUTHEVENT, utils.Handler.create(this, function () {
                logger.error("验证错误....");
                alert('server auth error!');
            }));
            utils.timer.once(10000, this, this.firstEnterTimeOutHandler);
            logger.log('开始连接socket...', this.serverList.selected.ip, this.serverList.selected.port);
            n.net.initialize(mg.alertManager);
            this._gameHost.ip = this.serverList.selected.ip;
            this._gameHost.port = parseInt(this.serverList.selected.port);
            this._curHost = this._gameHost;
            this._overTime = false;
            n.net.onSocketConnect(this, function () {
                mg.stageManager.onActivate(_this, _this.activeHandler);
                mg.stageManager.onDeactivate(_this, _this.deActiveHandler);
                _this._isActive = true;
                _this.auth(utils.Handler.create(_this, function () {
                    utils.timer.clear(_this, _this.firstEnterTimeOutHandler);
                    mg.alertManager.closeALert();
                    logger.log('开始获取角色列表....');
                    _this.getCharActorList(utils.Handler.create(_this, function (data) {
                        logger.log('获取角色列表成功....', data.CharList.length);
                        if (data.CharList && data.CharList.length) {
                            logger.log('登录角色....', data.CharList[0].Id);
                            _this.charActorLogin(data.CharList[0].Id, loginSucessHandler);
                        }
                        else {
                            logger.log('打开创角界面....');
                            createHandler.run();
                        }
                    }));
                }));
            });
            n.net.onSocketClose(this, this.socketCloseHandler);
            n.net.onSocketError(this, this.socketErrorHandler);
            n.net.connect(this._curHost.ip, this._curHost.port);
        };
        /**页面激活 */
        ModelLogin.prototype.activeHandler = function () {
            this._isActive = true;
            if (this._curTryReconnectTimes > 0) {
                this._curTryReconnectTimes--;
            }
            if (!n.net.connected)
                this.reconnect();
        };
        /**页面失去焦点 */
        ModelLogin.prototype.deActiveHandler = function () {
            this._isActive = false;
            utils.timer.clear(this, this.connectOutTimeHandler);
        };
        ModelLogin.prototype.onConnectGameError = function (caller, method) {
            this.offConnectGameError();
            this._connectGameErrorHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelLogin.prototype.offConnectGameError = function () {
            if (this._connectGameErrorHandler) {
                this._connectGameErrorHandler.recover();
                this._connectGameErrorHandler = null;
            }
        };
        ModelLogin.prototype.isFirstConnect = function () {
            if (!GameModels.user || !GameModels.user.player || !game.GameConfig.isEnterGame || app.gameContext.typeGame == TypeGame.BEGIN) {
                return true;
            }
            return false;
        };
        ModelLogin.prototype.firstEnterTimeOutHandler = function () {
            utils.timer.clear(this, this.firstEnterTimeOutHandler);
            mg.alertManager.showAlert(ConnectAlert, false, true, this, function () {
                window.location.reload();
            }, 'connectfail');
        };
        ModelLogin.prototype.socketCloseHandler = function () {
            GameModels.timer.stop();
            //Socket连接断开后 如果当前页面为激活状态 则开始断线重连
            if (!n.net.connected && this._isActive) {
                this.reconnect();
            }
        };
        ModelLogin.prototype.socketErrorHandler = function () {
            if (this._connectGameErrorHandler) {
                this._connectGameErrorHandler.run();
            }
            n.net.offSocketAll();
            if (this.isFirstConnect()) {
                this.firstEnterTimeOutHandler();
            }
            //this.closeAndShowAlert(false);
        };
        /**断开连接 */
        ModelLogin.prototype.closeConnect = function () {
            n.net.close(true);
        };
        /**重连 */
        ModelLogin.prototype.reconnect = function () {
            if (this._isStopConnect)
                return;
            if (!this._isActive)
                return;
            if (this.isFirstConnect()) {
                this.firstEnterTimeOutHandler();
                return;
            }
            //if (!GameModels.user || !GameModels.user.player || this._overTime || !game.GameConfig.isEnterGame || app.gameContext.typeGame == TypeGame.BEGIN) {
            //	this.closeAndShowAlert(false);
            //	return;
            //}
            /*
            mg.alertManager.showAlert(ConnectAlert, false, true, this, () => {
                this.connectGameHandler(this, () => {
                    mg.alertManager.tip(Language.J_YJCGCL);
                });
            }, null, 'warn');
            */
            this.connectGameHandler();
        };
        /**重连操作 */
        ModelLogin.prototype.connectGameHandler = function (caller, method) {
            var _this = this;
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (this._curTryReconnectTimes > this._maxTryReconnectTimes) {
                this.closeAndShowAlert(true);
                return;
            }
            this._curTryReconnectTimes++;
            this.closeConnect();
            logger.log('开始连接游戏服...');
            utils.timer.clear(this, this.connectOutTimeHandler);
            n.net.onSocketConnect(this, function () {
                //解除超时计时
                utils.timer.clear(_this, _this.connectOutTimeHandler);
                _this._overTime = false;
                //连接后，开始发送验证消息
                var data = _this._authData;
                var msg = n.MessagePool.from(n.C2G_Reconnect);
                msg.CharId = GameModels.user.player.uid;
                msg.IdentityId = data.identityId;
                msg.IdentityName = data.identityName;
                msg.Sign = data.sign;
                msg.TimeStamp = data.tstamp;
                msg.Uuid = data.userId;
                msg.QdCode1 = msg.QdCode2 = 0;
                msg.ClientType = _this.getClientType();
                logger.log('开始游戏服验证...' + JSON.stringify(msg));
                _this.request(n.MessageMap.C2G_RECONNECT, msg, utils.Handler.create(_this, function (data) {
                    if (data.Code != 0) {
                        logger.log('游戏服验证失败...');
                        _this.socketErrorHandler();
                        return;
                    }
                    //服务器断线重连验证成功
                    //if (this._overTime) return;
                    mg.alertManager.closeALert();
                    mg.alertManager.tip(Language.J_YJCGCL);
                    logger.log('游戏服验证通过,连接成功!');
                    _this._curTryReconnectTimes = 0;
                    if (method)
                        method.call(caller);
                    if (_this._reconnectHandler)
                        _this._reconnectHandler.run();
                    GameModels.timer.start();
                }), true);
            });
            //n.net.onSocketClose(this, this.socketCloseHandler);
            //n.net.onSocketError(this, this.socketErrorHandler);
            n.net.connect(this._curHost.ip, this._curHost.port);
            //超时计时
            utils.timer.once(5000, this, this.connectOutTimeHandler, true, true);
        };
        ModelLogin.prototype.connectOutTimeHandler = function (state) {
            this._overTime = true;
            if (this._connectGameErrorHandler) {
                this._connectGameErrorHandler.run();
            }
            this.reconnect();
            //this.closeAndShowAlert(state);
        };
        ModelLogin.prototype.closeAndShowAlert = function (state) {
            this._isStopConnect = true;
            logger.log(state ? '游戏服连接超时...' : '游戏服连接错误...');
            utils.timer.clear(this, this.closeAndShowAlert);
            mg.alertManager.closeALert();
            //GameModels.timer.stop();
            //app.stop();
            this.closeConnect();
            mg.alertManager.showAlert(ConnectAlert, false, true, this, function () {
                window.location.reload();
            }, "netError");
        };
        ModelLogin.prototype.notifyOtherPlayerLogin = function (data) {
            this._isStopConnect = true;
            mg.alertManager.showAlert(ConnectAlert, false, true, this, function () {
                window.location.reload();
            }, "otherPlayerLogin");
        };
        ModelLogin.prototype.notifyServerClose = function (data) {
            this._isStopConnect = true;
            mg.alertManager.showAlert(ConnectAlert, false, true, this, function () {
                window.location.reload();
            }, "serverClose");
        };
        /**防沉迷**/
        ModelLogin.prototype.addictionPlayerInfo = function (playerName, idCard, phone, complete) {
            if (complete === void 0) { complete = null; }
            var msg = n.MessagePool.from(n.C2G_Addiction_PlayerInfo);
            msg.PlayerName = playerName;
            msg.IdCard = idCard;
            msg.Phone = phone;
            this.request(n.MessageMap.C2G_ADDICTION_PLAYERINFO, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (complete)
                        complete.run();
                }
            }));
        };
        ModelLogin.prototype.notifyAddictionInfo = function (data) {
            mg.alertManager.showAlert(PromptAlert, false, true, data.Message, TypeBtnLabel.OK_SIGIN);
        };
        /**验证用户**/
        ModelLogin.prototype.auth = function (complete) {
            var data = this._authData;
            var msg = n.MessagePool.from(n.C2G_AuthEvent);
            msg.IdentityId = data.identityId;
            msg.IdentityName = data.identityName;
            msg.Sign = data.sign;
            msg.TimeStamp = data.tstamp;
            msg.Uuid = data.userId;
            msg.QdCode1 = msg.QdCode2 = 0;
            msg.ClientType = this.getClientType();
            this.request(n.MessageMap.C2G_AUTHEVENT, msg, complete);
        };
        ModelLogin.prototype.getCharActorList = function (complete) {
            var msg = n.MessagePool.from(n.C2G_CharacterGet);
            msg.ServerId = this.serverList.selected.sid;
            this.request(n.MessageMap.C2G_CHARACTERGET, msg, complete);
        };
        ModelLogin.prototype.createCharActor = function (sex, job, name, complete) {
            var msg = n.MessagePool.from(n.C2G_CharacterCreate);
            msg.Gender = sex ? 1 : 0;
            msg.Profession = job;
            msg.CharacterName = name;
            msg.ClientType = this.getClientType();
            msg.DeviceInfo = window.config.os ? window.config.os : '';
            msg.ServerId = this.serverList.selected.sid;
            this.request(n.MessageMap.C2G_CHARACTERCREATE, msg, complete);
        };
        ModelLogin.prototype.charActorLogin = function (charId, complete) {
            var _this = this;
            if (complete === void 0) { complete = null; }
            var msg = n.MessagePool.from(n.C2G_CharacterLogin);
            msg.CharId = charId;
            msg.ClientType = this.getClientType();
            this.request(n.MessageMap.C2G_CHARACTERLOGIN, msg, utils.Handler.create(this, function (data) {
                if (complete)
                    complete.run();
                if (_this._loginSuccessHandler) {
                    _this._loginSuccessHandler.runWith(data);
                }
            }));
        };
        ModelLogin.prototype.onLoginSuccess = function (caller, method) {
            this.offLoginSuccess();
            this._loginSuccessHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelLogin.prototype.offLoginSuccess = function () {
            if (this._loginSuccessHandler) {
                this._loginSuccessHandler.recover();
                this._loginSuccessHandler = null;
            }
        };
        ModelLogin.prototype.onReconnect = function (caller, method) {
            this.offReconnect();
            this._reconnectHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelLogin.prototype.offReconnect = function () {
            if (this._reconnectHandler) {
                this._reconnectHandler.recover();
                this._reconnectHandler = null;
            }
        };
        Object.defineProperty(ModelLogin.prototype, "authData", {
            get: function () {
                return this._authData;
            },
            enumerable: true,
            configurable: true
        });
        ModelLogin.prototype.parseNameonfig = function (names) {
            this._nameLib = names;
        };
        ModelLogin.prototype.parseSensitiveConfig = function (sensitive) {
            this._sensitives = sensitive.split('、');
            this._sensitives.push('%', '#', '$', '@', '￥', '*', '!', '`', '\\', '/', '^', '&', '~');
        };
        Object.defineProperty(ModelLogin.prototype, "nameMans", {
            get: function () {
                return this._nameLib.man;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLogin.prototype, "nameWomens", {
            get: function () {
                return this._nameLib.women;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLogin.prototype, "namePrefixs", {
            get: function () {
                return this._nameLib.prefix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLogin.prototype, "nameSuffixs", {
            get: function () {
                return this._nameLib.suffix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLogin.prototype, "sensitives", {
            get: function () {
                return this._sensitives;
            },
            enumerable: true,
            configurable: true
        });
        ModelLogin.prototype.hasSensitivesHandler = function (name) {
            for (var i = 0; i < name.length; i++) {
                var front = name.substr(0, i + 1);
                var back = name.substring(name.length - i - 1, name.length);
                if (this.sensitives.indexOf(front) != -1) {
                    return true;
                }
                if (this.sensitives.indexOf(back) != -1) {
                    return true;
                }
            }
            return false;
        };
        ModelLogin.prototype.hasSensitives = function (name) {
            if (name.indexOf(' ') >= 0)
                return true;
            for (var _i = 0, _a = this.sensitives; _i < _a.length; _i++) {
                var s = _a[_i];
                if (name.indexOf(s) != -1) {
                    return true;
                }
            }
            return false;
            // name=name.toLocaleUpperCase();
            // name=name.replace(/[ \r\n&\|\\\*^%$#@~<>.,:;'"`!\-0123456789]/g,"");
            // var result:boolean=false;
            // var chinese=name.replace(/[QWERTYUIOPASDFGHJKLZXCVBNM]/g,"");
            // result=this.hasSensitivesHandler(chinese);
            // if(!result){
            //     var english=name.replace(/([^\u0000-\u00FF])/g,"");
            // 		result=this.hasSensitivesHandler(english);
            //     if(!result){
            //         english=english.toLocaleLowerCase();
            // 		result=this.hasSensitivesHandler(english);
            //     }
            // }
            // return result;
        };
        ModelLogin.prototype.replaceUncommons = function (str) {
            var conent = str;
            if (!this._uncommonTxt) {
                this._uncommonTxt = RES.getRes('uncommons_txt');
                this._uncommons = this._uncommonTxt.split(" ");
            }
            for (var _i = 0, conent_1 = conent; _i < conent_1.length; _i++) {
                var s = conent_1[_i];
                while (this._uncommons.indexOf(s) == -1) {
                    str = str.replace(s, "*");
                    break;
                }
            }
            return str;
        };
        ModelLogin.prototype.replaceSensitives = function (str) {
            for (var _i = 0, _a = this.sensitives; _i < _a.length; _i++) {
                var s = _a[_i];
                while (str.indexOf(s) != -1) {
                    str = str.replace(s, "	");
                    continue;
                }
            }
            return str.replace(/	/g, "*");
        };
        ModelLogin.prototype.randomName = function (sex) {
            var name = "";
            while (!name) {
                if (sex) {
                    name = this.nameMans[(Math.random() * this.nameMans.length) >> 0];
                }
                else {
                    name = this.nameWomens[(Math.random() * this.nameWomens.length) >> 0];
                }
                name = this.namePrefixs[(Math.random() * this.namePrefixs.length) >> 0] + name;
                // if (Math.random() > .5) {
                // 	name = this.namePrefixs[(Math.random() * this.namePrefixs.length) >> 0] + name;
                // } else {
                // 	name = name + this.nameSuffixs[(Math.random() * this.nameSuffixs.length) >> 0];
                // }
            }
            return name;
        };
        Object.defineProperty(ModelLogin.prototype, "accountName", {
            get: function () {
                return this._account;
            },
            enumerable: true,
            configurable: true
        });
        return ModelLogin;
    }(mo.ModelBase));
    mo.ModelLogin = ModelLogin;
    __reflect(ModelLogin.prototype, "mo.ModelLogin");
    var ServerList = (function () {
        function ServerList() {
        }
        Object.defineProperty(ServerList.prototype, "names", {
            get: function () {
                var names = [];
                if (this._serverGroupList) {
                    for (var _i = 0, _a = this._serverGroupList; _i < _a.length; _i++) {
                        var group = _a[_i];
                        names.push(group.name);
                    }
                }
                return names;
            },
            enumerable: true,
            configurable: true
        });
        ServerList.prototype.addGroup = function (group) {
            if (!this._serverGroupList)
                this._serverGroupList = [];
            this._serverGroupList.push(group);
        };
        ServerList.prototype.getGroup = function (index) {
            return this._serverGroupList[index];
        };
        Object.defineProperty(ServerList.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (v) {
                if (this._selected != v) {
                    this._selected = v;
                    if (this._selectedChangeMethod) {
                        this._selectedChangeMethod.call(this._selectedChangeCaller, this._selected);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ServerList.prototype.onSelectedChange = function (caller, method) {
            this.offSelectedChange();
            this._selectedChangeCaller = caller;
            this._selectedChangeMethod = method;
        };
        ServerList.prototype.offSelectedChange = function () {
            this._selectedChangeMethod = this._selectedChangeCaller = null;
        };
        ServerList.prototype.destory = function () {
            this.offSelectedChange();
            this._selected = null;
            for (var _i = 0, _a = this._serverGroupList; _i < _a.length; _i++) {
                var group = _a[_i];
                group.destory();
            }
            this._serverGroupList.length = 0;
            this._serverGroupList = null;
        };
        ServerList.prototype.getLoginDataById = function (sid) {
            if (this._selected && this._selected.sid == sid)
                return this._selected;
            for (var _i = 0, _a = this._serverGroupList; _i < _a.length; _i++) {
                var group = _a[_i];
                if (!group.list)
                    continue;
                for (var _b = 0, _c = group.list; _b < _c.length; _b++) {
                    var data = _c[_b];
                    if (data.sid == sid) {
                        return data;
                    }
                }
            }
            return null;
        };
        return ServerList;
    }());
    mo.ServerList = ServerList;
    __reflect(ServerList.prototype, "mo.ServerList");
    var ServerGroup = (function () {
        function ServerGroup(start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = 0; }
            this._name = Language.getExpression(Language.E_1_2F, start, end);
            this._start = start;
            this._end = end;
        }
        ServerGroup.prototype.requestList = function (caller, method) {
            n.http.request((window.config.ssl ? 'https' : 'http') + "://" + window.config.ip + "/" + window.config.platform + "/getServerPage.php?start_index=" + this._start + "&end_index=" + this._end, utils.Handler.create(this, function (data) {
                this._list = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var serverData = data_1[_i];
                    var item = new ServerItem(serverData);
                    this._list.push(item);
                }
                this._list.reverse();
                method.call(caller);
            }), egret.URLRequestMethod.GET);
        };
        Object.defineProperty(ServerGroup.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                this._name = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerGroup.prototype, "list", {
            get: function () {
                return this._list;
            },
            set: function (value) {
                this._list = value;
            },
            enumerable: true,
            configurable: true
        });
        ServerGroup.prototype.getDataById = function (sid) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.sid == sid) {
                    return data;
                }
            }
            return null;
        };
        ServerGroup.prototype.destory = function () {
            if (this._list) {
                this._list.length = 0;
                this._list = null;
            }
            this._name = null;
        };
        return ServerGroup;
    }());
    mo.ServerGroup = ServerGroup;
    __reflect(ServerGroup.prototype, "mo.ServerGroup");
    var ServerItem = (function () {
        function ServerItem(data) {
            this._data = data;
            this._openDate = new Date(data.openTime);
            if (data.lastLoginTime)
                this._lastDate = new Date(data.lastLoginTime);
            if (data.loginDays)
                this._loginDays = parseInt(data.loginDays);
        }
        Object.defineProperty(ServerItem.prototype, "name", {
            /**服务器名称 */
            get: function () {
                return this._data.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "openDate", {
            /**开服日期 */
            get: function () {
                return this._openDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "cdn_url", {
            get: function () {
                return this._data.cdn_url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "http_port", {
            get: function () {
                return this._data.http_port;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "sid", {
            get: function () {
                return this._data.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "ip", {
            get: function () {
                return this._data.ip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "port", {
            get: function () {
                return this._data.port;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "status", {
            get: function () {
                return this._data.status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "version", {
            get: function () {
                return this._data.version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "lastDate", {
            /**最后一次登录的日期 */
            get: function () {
                return this._lastDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "loginDays", {
            /**累计登录的天数 */
            get: function () {
                return this._loginDays;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerItem.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        /**关闭 */
        ServerItem.CLOSE = 0;
        /**开启 */
        ServerItem.OPEN = 1;
        /**维护中 */
        ServerItem.MAINTEN = 2;
        /**待开 */
        ServerItem.STAYOPEN = 3;
        return ServerItem;
    }());
    mo.ServerItem = ServerItem;
    __reflect(ServerItem.prototype, "mo.ServerItem");
})(mo || (mo = {}));
