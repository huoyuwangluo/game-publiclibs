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
var vo;
(function (vo) {
    var ChatVO = (function (_super) {
        __extends(ChatVO, _super);
        function ChatVO() {
            return _super.call(this) || this;
        }
        ChatVO.prototype.initialize = function () {
        };
        ChatVO.prototype.initializeProto = function (data) {
            if (!data)
                return;
            var playerName = "";
            this._serverId = "";
            this._copyId = null;
            this._country = 0;
            if (data instanceof n.G2C_Chat_Notify_Msg || data instanceof n.ProtoChatMsg) {
                this._serverId = data.ServerId;
                this._type = data.Type;
                this._id = data.PlayerInfo.PlayerId;
                this._name = data.PlayerInfo.PlayerName;
                this._country = data.PlayerInfo.Country;
                this._isHorstLamp = data.IsPaoMaDeng ? true : false;
                this._vip = data.PlayerInfo.PlayerVIP;
                if (this._id == GameModels.user.player.uid) {
                    playerName = Language.Z_WO;
                }
                else {
                    playerName = this._name;
                }
                switch (this._type) {
                    case TypeChatChannel.WORLD:
                        this._prefix = Language.C_SJ;
                        if (playerName != "" && data.IsSystemNotice != 1) {
                            this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + playerName + ": |C:" + this.changLabColor + "&T:" + data.Msg;
                        }
                        else {
                            this._msg = "C:" + this.changLabColor + "&T:" + data.Msg;
                        }
                        break;
                    case TypeChatChannel.LEGION:
                        this._prefix = Language.C_JT;
                        if (data.Msg.match(/(\S*){/) && data.Msg.match(/}(\S*)/)) {
                            this._copyId = data.Msg.match(/{(\S*)}/)[1];
                            var s1 = data.Msg.match(/(\S*){/)[1];
                            var s2 = data.Msg.match(/}(\S*)/)[1];
                            data.Msg = s1 + s2;
                            var copyVO1 = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_FAMILY, parseInt(this._copyId));
                            if (copyVO1) {
                                data.Msg = s1 + copyVO1.templateBoss.name + s2;
                            }
                            var copyVO2 = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_DOMAIN, parseInt(this._copyId));
                            if (copyVO2) {
                                data.Msg = s1 + copyVO2.templateBoss.name + s2;
                            }
                            var copyVO3 = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_DEATH, parseInt(this._copyId));
                            if (copyVO3) {
                                data.Msg = s1 + copyVO3.templateBoss.name + s2;
                            }
                        }
                        if (playerName != "" && data.IsSystemNotice != 1) {
                            if (this._serverId != "") {
                                var strName = playerName == Language.Z_WO ? playerName : "s" + this._serverId + "." + playerName;
                                this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + strName + ": |C:" + this.changLabColor + "&T:" + data.Msg;
                            }
                            else {
                                this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + playerName + ": |C:" + this.changLabColor + "&T:" + data.Msg;
                            }
                        }
                        else {
                            this._msg = "C:" + this.changLabColor + "&T:" + data.Msg;
                        }
                        break;
                    case TypeChatChannel.SYS:
                        this._prefix = Language.C_XT;
                        this._msg = data.Msg;
                        break;
                    case TypeChatChannel.CROSSREALM:
                        this._prefix = Language.C_KF;
                        if (playerName != "" && data.IsSystemNotice != 1) {
                            var strName = playerName == Language.Z_WO ? playerName : "s" + this._serverId + "." + playerName;
                            this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + strName + ": |C:" + this.changLabColor + "&T:" + data.Msg;
                        }
                        else {
                            this._msg = "C:" + this.changLabColor + "&T:" + data.Msg;
                        }
                        break;
                }
                this._sex = data.PlayerInfo.PlayerSex;
                this._job = data.PlayerInfo.PlayerProfession;
            }
            else {
                this._name = data.name;
                this._type = data.type;
                this._vip = GameModels.user.player.vip;
                this._id = data.id;
                if (this._id == GameModels.user.player.uid) {
                    playerName = Language.Z_WO;
                }
                else {
                    playerName = this._name;
                }
                switch (this._type) {
                    case TypeChatChannel.WORLD:
                        this._prefix = Language.C_SJ;
                        this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + playerName + ": |C:" + this.changLabColor + "&T:" + data.content;
                        break;
                    case TypeChatChannel.LEGION:
                        this._prefix = Language.C_JT;
                        if (playerName != "") {
                            this._msg = "C:" + this.getMyLabColor(playerName) + "&U:&H:" + ChatVO.LINK_TYPE_OPENPLAYER + "_" + this._id + "&T:" + playerName + ": |C:" + this.changLabColor + "&T:" + data.content;
                        }
                        else {
                            this._msg = "C:" + this.changLabColor + "&T:" + data.content;
                        }
                        break;
                }
            }
            this._content = utils.TextFlowMaker.generateTextFlow(this._msg);
        };
        Object.defineProperty(ChatVO.prototype, "changLabColor", {
            get: function () {
                if (this.vip >= 3 && this.vip <= 5) {
                    return 0xE37ADA;
                }
                else if (this.vip >= 6 && this.vip <= 10) {
                    return 0XFFDA80;
                }
                else {
                    return 0xD5D5D3;
                }
            },
            enumerable: true,
            configurable: true
        });
        ChatVO.prototype.getMyLabColor = function (name) {
            return name == Language.Z_WO ? 0x64C064 : 0xD1A765;
        };
        Object.defineProperty(ChatVO.prototype, "copyId", {
            get: function () {
                return this._copyId;
            },
            enumerable: true,
            configurable: true
        });
        ChatVO.prototype.reset = function () {
            this._sex = this._name = this._id = null;
            this._type = this._vip = this._job = 0;
            if (this._content) {
                this._content.length = 0;
            }
            this._content = null;
        };
        Object.defineProperty(ChatVO.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "content", {
            get: function () {
                return this._content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "prefix", {
            get: function () {
                return this._prefix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "sex", {
            get: function () {
                return this._sex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "job", {
            get: function () {
                return this._job;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "vip", {
            get: function () {
                return this._vip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "isHorstLamp", {
            get: function () {
                return this._isHorstLamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "msg", {
            get: function () {
                return this._msg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChatVO.prototype, "country", {
            get: function () {
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        ChatVO.prototype.clone = function () {
            var cloneVO = vo.fromPool(vo.ChatVO);
            cloneVO._id = this._id;
            cloneVO._content = this._content;
            cloneVO._name = this._name;
            cloneVO._type = this._type;
            cloneVO._sex = this._sex;
            cloneVO._job = this._job;
            cloneVO._vip = this._vip;
            cloneVO._isHorstLamp = this._isHorstLamp;
            cloneVO._country = this._country;
            return cloneVO;
        };
        ChatVO.LINK_TYPE_OPENUI = 'UI';
        ChatVO.LINK_TYPE_OPENPLAYER = 'PNAME';
        ChatVO.LINK_TYPE_OPENGENERAL = 'GNAME';
        ChatVO.LINK_TYPE_SENDMSG = 'SEND';
        return ChatVO;
    }(vo.VOBase));
    vo.ChatVO = ChatVO;
    __reflect(ChatVO.prototype, "vo.ChatVO");
})(vo || (vo = {}));
