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
    var ProtoPairIntIntVO = (function (_super) {
        __extends(ProtoPairIntIntVO, _super);
        function ProtoPairIntIntVO() {
            return _super.call(this) || this;
        }
        ProtoPairIntIntVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoProperty) {
                this._key = data.Type;
                this._value = data.Value;
            }
            else if (data instanceof n.ProtoLianChongRewardData) {
                if (data.RewardCfgId > 0 && data.RewardCfgId < 8) {
                    this._type = 0;
                }
                else if (data.RewardCfgId > 7 && data.RewardCfgId < 15) {
                    this._type = 1;
                }
                else {
                    this._type = 2;
                }
                this._key = data.RewardCfgId;
                this._value = data.Statues;
                this._templLianChongHaoLi = Templates.getTemplateById(templates.Map.LIANCHONGHAOLI, this._key);
            }
            else if (data instanceof n.ProtoGeneralTaskRecord) {
                this._finshTime = data.FinishTime;
                this._playerId = data.PlayerId;
                this._playerName = data.PlayerName;
            }
            else if (data instanceof n.ProtoShareFriendRewardInfo) {
                this._key = data.RewardId;
                this._value = data.Status;
                if (this._value == 1) {
                    this._older = 0;
                }
                else if (this._value == 0) {
                    this._older = 1;
                }
                else {
                    this._older = 2;
                }
            }
            else {
                if (data instanceof n.ProtoPairStringInt) {
                    this._keyStr = data.Key;
                }
                else {
                    this._key = data.Key;
                }
                this._selecdData = null;
                this._templactExchange = Templates.getTemplateById(templates.Map.ACTEXCHANGE, this._key);
                this._value = data.Value;
                if (Math.floor(Number(this._key) / 100000) == 1) {
                    var equipTemp = Templates.getTemplateById(templates.Map.EQUIP, this._key);
                    if (equipTemp)
                        this._older = 1;
                }
                else {
                    var itemTemp = Templates.getTemplateById(templates.Map.ITEM, this._key);
                    if (itemTemp && itemTemp.type == 2) {
                        this._older = 3;
                    }
                    else if (itemTemp && itemTemp.type == 2200) {
                        this._older = 2;
                    }
                    else {
                        this._older = 1;
                    }
                }
            }
        };
        ProtoPairIntIntVO.prototype.reset = function () {
            this._finshTime = 0;
            this._key = 0;
            this._keyStr = this._playerId = this._playerName = "";
            this._value = null;
            this._older = 0;
            this._templactExchange = this._templLianChongHaoLi = null;
            this._type = 0;
            this._selecdData = null;
        };
        Object.defineProperty(ProtoPairIntIntVO.prototype, "selecdID", {
            get: function () {
                if (!this._selecdData)
                    return null;
                return (this._selecdData instanceof vo.GamePetVO) ? this._selecdData.uid : this._selecdData.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "selecdData", {
            get: function () {
                return this._selecdData;
            },
            set: function (v) {
                this._selecdData = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "templactExchange", {
            get: function () {
                return this._templactExchange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "templLianChongHaoLi", {
            get: function () {
                return this._templLianChongHaoLi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "finshTime", {
            get: function () {
                return this._finshTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "keyStr", {
            get: function () {
                return this._keyStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "key", {
            get: function () {
                return this._key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "type", {
            /**0-8元，1-38元，2-88元 */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "value", {
            /**
             *  n.ProtoLianChongRewardData 状态，1：未达成，0：未领取，2：已领取
             * */
            get: function () {
                return this._value;
            },
            set: function (v) {
                this._value = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "strText", {
            get: function () {
                return this._key + "_" + this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "older", {
            get: function () {
                return this._older;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoPairIntIntVO.prototype, "quality", {
            get: function () {
                if (Math.floor(Number(this._key) / 100000) == 1) {
                    return Templates.getTemplateById(templates.Map.EQUIP, this._key).quality;
                }
                else {
                    return Templates.getTemplateById(templates.Map.ITEM, this._key).quality;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ProtoPairIntIntVO;
    }(vo.VOBase));
    vo.ProtoPairIntIntVO = ProtoPairIntIntVO;
    __reflect(ProtoPairIntIntVO.prototype, "vo.ProtoPairIntIntVO");
})(vo || (vo = {}));
