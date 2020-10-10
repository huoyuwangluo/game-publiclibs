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
    var FriendVO = (function (_super) {
        __extends(FriendVO, _super);
        function FriendVO() {
            return _super.call(this) || this;
        }
        FriendVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._chatData) {
                this._chatData = [];
            }
            this._isNew = false;
        };
        FriendVO.prototype.reset = function () {
            this._playerId = null;
            this._professionId = 0;
            this._playerName = null;
            this._level = 0;
            this._unionName = null;
            this._fightValue = 0;
            this._time = 0;
            this._vipLevel = 0;
            this._friendliness = 0;
            this._hatred = 0;
            this._chatData = [];
            this._isNew = false;
            this._headIcon = 0;
        };
        FriendVO.prototype.decode = function (data) {
            this._playerId = data.PlayerId;
            this._professionId = data.ProfessionId;
            this._playerName = data.PlayerName;
            this._level = data.Level;
            this._unionName = data.UnionName;
            this._fightValue = data.FightValue;
            this._time = data.Time;
            this._vipLevel = data.VipLevel;
            this._friendliness = data.Friendliness;
            this._hatred = data.Fatred;
            this._headIcon = data.HeadIcon;
        };
        Object.defineProperty(FriendVO.prototype, "PlayerId", {
            get: function () {
                return this._playerId;
            },
            set: function (value) {
                this._playerId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "ProfessionId", {
            get: function () {
                return this._professionId;
            },
            set: function (value) {
                this._professionId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "headIcon", {
            get: function () {
                return this._headIcon;
            },
            set: function (value) {
                this._headIcon = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "PlayerName", {
            get: function () {
                return this._playerName;
            },
            set: function (value) {
                this._playerName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "Level", {
            get: function () {
                return this._level;
            },
            set: function (value) {
                this._level = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "UnionName", {
            get: function () {
                return this._unionName;
            },
            set: function (value) {
                this._unionName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "FightValue", {
            get: function () {
                return this._fightValue;
            },
            set: function (value) {
                this._fightValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "Time", {
            get: function () {
                return this._time;
            },
            set: function (value) {
                this._time = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "VipLevel", {
            get: function () {
                return this._vipLevel;
            },
            set: function (value) {
                this._vipLevel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "Friendliness", {
            get: function () {
                return this._friendliness;
            },
            set: function (value) {
                this._friendliness = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "Hatred", {
            get: function () {
                return this._hatred;
            },
            set: function (value) {
                this._hatred = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "isNew", {
            get: function () {
                return this._isNew;
            },
            set: function (value) {
                this._isNew = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendVO.prototype, "ChatData", {
            get: function () {
                return this._chatData;
            },
            set: function (value) {
                var list = [];
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var item = value_1[_i];
                    var obj = {};
                    obj.Type = item.Type;
                    obj.Message = item.Message;
                    obj.ChatTime = item.ChatTime;
                    list.push(obj);
                }
                this._chatData = list;
            },
            enumerable: true,
            configurable: true
        });
        FriendVO.prototype.updateChatData = function (data) {
            var obj = {};
            obj.Type = data.Type;
            obj.Message = data.Message;
            obj.ChatTime = data.ChatTime;
            this._chatData.push(obj);
        };
        return FriendVO;
    }(vo.VOBase));
    vo.FriendVO = FriendVO;
    __reflect(FriendVO.prototype, "vo.FriendVO");
})(vo || (vo = {}));
