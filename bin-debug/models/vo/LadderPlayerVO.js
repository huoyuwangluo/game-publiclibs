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
    var LadderPlayerVO = (function (_super) {
        __extends(LadderPlayerVO, _super);
        function LadderPlayerVO() {
            var _this = _super.call(this) || this;
            _this._totalScore = 0;
            return _this;
        }
        LadderPlayerVO.prototype.initialize = function (data, ranking) {
            if (ranking) {
                this._ladderRanking = ranking;
            }
            if (data instanceof n.ProtoLadderPlayer || data instanceof n.ProtoLadder2Player) {
                this.setPlayerData(data);
            }
            else if (data instanceof n.G2C_Ladder_Info || data instanceof n.G2C_Ladder2_Info) {
                this.setRoleData(data);
            }
            else if (data instanceof n.ProtoLadderRankPlayer || data instanceof n.ProtoLadder2RankPlayer) {
                this.setRankPlayerData(data);
            }
            return this;
        };
        LadderPlayerVO.prototype.updataProtoLadder2RankPlayer = function (data) {
            this.setRankPlayerData(data);
        };
        LadderPlayerVO.prototype.reset = function () {
            this._name = "";
            this._lv = 0;
            this._step = 0;
            this._myOrAddScore = 0;
            this._totalScore = 0;
            this._myOrAddMedal = 0;
            this._ladderRanking = 0;
            this._fightPower = 0;
            this._playerId = "";
            this._playerHeadIcon = 0;
            this._monsterDate = null;
        };
        LadderPlayerVO.prototype.setPlayerData = function (data) {
            data.autoRecover = false;
            this._monsterDate = null;
            this._playerId = data.PlayerId;
            this._name = data.PlayerName;
            this._myOrAddScore = (data instanceof n.ProtoLadderPlayer) ? data.WinScore : 0;
            this._myOrAddMedal = data.WinMedal;
            this._profession = (data instanceof n.ProtoLadderPlayer) ? data.Profession : 0;
            this._totalScore = (data instanceof n.ProtoLadderPlayer) ? data.Score : data.Rank;
            this._fightPower = (data instanceof n.ProtoLadderPlayer) ? data.FightForce : 0;
            this._playerHeadIcon = data.HeadIcon;
            this._yuanBao = (data instanceof n.ProtoLadderPlayer) ? data.YuanBao : 0;
            this.setStep((data instanceof n.ProtoLadderPlayer) ? data.Score : 0);
            this._monsterDate = data.FormationInfo;
        };
        LadderPlayerVO.prototype.setRoleData = function (data) {
            this._yuanBao = 0;
            this._name = GameModels.user.player.name;
            this._fightPower = GameModels.user.player.totalFightValue;
            this._profession = GameModels.user.player.job;
            this._myOrAddMedal = data.CurMedal;
            this._myOrAddScore = (data instanceof n.G2C_Ladder_Info) ? data.MyScore : 0;
            this._ladderRanking = data.MyRank;
            this._playerHeadIcon = GameModels.user.player.headIcon;
            this.setStep((data instanceof n.G2C_Ladder_Info) ? data.MyScore : 0);
        };
        LadderPlayerVO.prototype.setRankPlayerData = function (data) {
            this._playerId = data.PlayerId;
            this._name = data.PlayerName;
            this._profession = (data instanceof n.ProtoLadderRankPlayer) ? data.Profession : 0;
            this._myOrAddScore = (data instanceof n.ProtoLadderRankPlayer) ? data.Score : data.Rank;
            this._level = data.Level;
            this._playerHeadIcon = data.HeadIcon;
            this._yuanBao = 0;
            this.setStep((data instanceof n.ProtoLadderRankPlayer) ? data.Score : data.Rank);
        };
        Object.defineProperty(LadderPlayerVO.prototype, "totalScore", {
            get: function () {
                return this._totalScore;
            },
            enumerable: true,
            configurable: true
        });
        LadderPlayerVO.prototype.setStep = function (score) {
            var temps = Templates.getList(templates.Map.LADDER);
            for (var i = 0; i < temps.length; i++) {
                if (score < temps[i].credit) {
                    this._template = temps[i];
                    break;
                }
            }
            if (this._template) {
                this._lv = this._template.lvShow;
                this._step = this._template.ladderStep;
            }
        };
        Object.defineProperty(LadderPlayerVO.prototype, "playerHeadIcon", {
            get: function () {
                return this._playerHeadIcon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "myOrAddMedal", {
            get: function () {
                return this._myOrAddMedal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "myOrAddScore", {
            get: function () {
                return this._myOrAddScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "yuanBao", {
            get: function () {
                return this._yuanBao;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "fightPower", {
            get: function () {
                return this._fightPower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "lv", {
            get: function () {
                return this._lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "step", {
            get: function () {
                return this._step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "ladderRanking", {
            get: function () {
                if (this._ladderRanking && this._ladderRanking != 0) {
                    return this._ladderRanking;
                }
                return Language.C_WSB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "profession", {
            get: function () {
                return this._profession;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "playerId", {
            get: function () {
                if (this._playerId) {
                    return this._playerId;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderPlayerVO.prototype, "monsterDate", {
            get: function () {
                return this._monsterDate;
            },
            enumerable: true,
            configurable: true
        });
        return LadderPlayerVO;
    }(vo.VOBase));
    vo.LadderPlayerVO = LadderPlayerVO;
    __reflect(LadderPlayerVO.prototype, "vo.LadderPlayerVO");
})(vo || (vo = {}));
