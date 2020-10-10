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
    var KingWarArmyVO = (function (_super) {
        __extends(KingWarArmyVO, _super);
        function KingWarArmyVO() {
            var _this = _super.call(this) || this;
            _this._kingWarPetUidVOArr = [];
            return _this;
        }
        KingWarArmyVO.prototype.initialize = function (tmp) {
            this._armyId = tmp.ArmyId;
            this._playerId = tmp.PlayerId;
            this._playerName = tmp.PlayerName;
            this._formationType = tmp.FormationType;
            this._teamId = tmp.TeamId;
            this._tameBingLi = tmp.TameBingLi;
            this._isFight = tmp.IsFight;
            this._defendCityId = tmp.DefendCityId;
            this._kingWarPetVOArr = [];
            for (var i = 0; i < tmp.PetList.length; i++) {
                var tempVo = vo.fromPool(vo.KingWarPetVO, tmp.PetList[i]);
                this._kingWarPetVOArr.push(tempVo);
                this._kingWarPetUidVOArr.push(tempVo.petId);
            }
        };
        KingWarArmyVO.prototype.reset = function () {
            this._armyId = "";
            this._playerId = "";
            this._playerName = "";
            this._formationType = 0;
            this._teamId = 0;
            this._tameBingLi = 0;
            this._isFight = 0;
            this._defendCityId = 0;
            this._kingWarPetVOArr.length = 0;
            this._kingWarPetUidVOArr.length = 0;
        };
        Object.defineProperty(KingWarArmyVO.prototype, "armyId", {
            get: function () {
                return this._armyId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "formationType", {
            get: function () {
                return this._formationType;
            },
            set: function (v) {
                this._formationType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "teamId", {
            /**NPC部队的teamId */
            get: function () {
                return this._teamId;
            },
            set: function (v) {
                this._teamId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "tameBingLi", {
            /**NPC队伍兵力 */
            get: function () {
                return this._tameBingLi;
            },
            set: function (v) {
                this._tameBingLi = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "isFight", {
            /**部队是否处于战斗中 */
            get: function () {
                return this._isFight;
            },
            set: function (v) {
                this._isFight = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "defendCityId", {
            /**部队驻守城池ID */
            get: function () {
                return this._defendCityId;
            },
            /**部队驻守城池ID */
            set: function (v) {
                this._defendCityId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "kingWarPetVOArr", {
            get: function () {
                return this._kingWarPetVOArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "kingWarPetUidVOArr", {
            get: function () {
                return this._kingWarPetUidVOArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO.prototype, "hashPet", {
            get: function () {
                for (var i = 0; i < this._kingWarPetUidVOArr.length; i++) {
                    if (this._kingWarPetUidVOArr[i]) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        KingWarArmyVO.prototype.setKingWarPetVOArr1 = function (petList) {
            this._kingWarPetVOArr = [];
            this._kingWarPetUidVOArr = [];
            for (var i = 0; i < petList.length; i++) {
                var tempVo = vo.fromPool(vo.KingWarPetVO, petList[i]);
                this._kingWarPetVOArr.push(tempVo);
                this._kingWarPetUidVOArr.push(tempVo.petId);
            }
        };
        return KingWarArmyVO;
    }(vo.VOBase));
    vo.KingWarArmyVO = KingWarArmyVO;
    __reflect(KingWarArmyVO.prototype, "vo.KingWarArmyVO");
})(vo || (vo = {}));
(function (vo) {
    var KingWarArmyVO1 = (function (_super) {
        __extends(KingWarArmyVO1, _super);
        function KingWarArmyVO1() {
            return _super.call(this) || this;
        }
        KingWarArmyVO1.prototype.initialize = function (tmp) {
            this._playerName = tmp.ArmyName;
            this._count = tmp.ArmyCount;
            this._totalLevel = tmp.TotalBingLi;
        };
        KingWarArmyVO1.prototype.reset = function () {
            this._playerName = "";
            this._count = 0;
            this._totalLevel = 0;
        };
        Object.defineProperty(KingWarArmyVO1.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO1.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarArmyVO1.prototype, "totalLevel", {
            get: function () {
                return this._totalLevel;
            },
            enumerable: true,
            configurable: true
        });
        return KingWarArmyVO1;
    }(vo.VOBase));
    vo.KingWarArmyVO1 = KingWarArmyVO1;
    __reflect(KingWarArmyVO1.prototype, "vo.KingWarArmyVO1");
})(vo || (vo = {}));
