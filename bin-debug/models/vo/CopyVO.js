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
    var CopyVO = (function (_super) {
        __extends(CopyVO, _super);
        function CopyVO() {
            var _this = _super.call(this) || this;
            _this._lock = undefined;
            /**是否死亡之后刷新过 */
            _this._isRefResh = false;
            return _this;
        }
        CopyVO.prototype.initialize = function (template, star) {
            this._isRemind = false;
            this._isBossKilled = false;
            this._killedEven = false;
            this._openCityId = 0;
            this._star = star;
            this._template = template;
            this._personDoneKilled = 0;
            this._everyDoneKilled = 0;
            this._enterCount = 0;
            this._monsterArr = [];
            if (template.boss) {
                this._bossTemplate = Templates.getTemplateById(templates.Map.OTHERMONSTER, template.boss.split(";")[0]);
                this._bossShowId = this._bossTemplate.resId;
                this._bossHP = utils.htmlUtil.getTemplateAndNameToValue(this._bossTemplate.properties, "HP");
            }
            if (template.petList) {
                var monsterstr = template.petList.split(";");
                for (var i = 0; i < monsterstr.length; i++) {
                    if (monsterstr[i]) {
                        var str1 = monsterstr[i] + "_" + this._bossTemplate.lv;
                        this._monsterArr.push(str1);
                    }
                }
            }
            if (this._template.dropShow) {
                this._drops = [];
                var array = this._template.dropShow.split(';');
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var id = array_1[_i];
                    this._drops.push(id);
                }
            }
            if (this._template.parm1.indexOf('_') > 0) {
                this._starStatistics = {};
                var list = this._template.parm1.split(';');
                for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
                    var str = list_1[_a];
                    var params = str.split('_');
                    this._starStatistics[parseInt(params[0])] = (this._template.limitTime - parseInt(params[1]));
                }
            }
            return this;
        };
        CopyVO.prototype.reset = function () {
            this._lock = undefined;
        };
        Object.defineProperty(CopyVO.prototype, "star", {
            get: function () {
                return this._star;
            },
            set: function (value) {
                this._star = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossName", {
            get: function () {
                return this._bossTemplate.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossIcon", {
            get: function () {
                return this._bossTemplate.resId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "type", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "step", {
            get: function () {
                return this._template.step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "templateBoss", {
            get: function () {
                return this._bossTemplate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "dropGold", {
            get: function () {
                // if (this._bossTemplate) {
                //     // var s: string[] = this._bossTemplate.baseDrop.split(";");
                //     // for (var i = 0; i < s.length; i++) {
                //     //     var s1: string[] = s[i].split("_");
                //     //     if (s1[0] == "101") {
                //     //         return s[i];
                //     //     }
                //     // }
                // }
                // return null;
                return "210302_1";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "dropPet", {
            get: function () {
                if (this._bossTemplate) {
                    var s = this._bossTemplate.baseDrop.split(";");
                    var s1 = s[0].split("_");
                    return s1[0];
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "monsterArr", {
            get: function () {
                return this._monsterArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossShowId", {
            get: function () {
                return this._bossShowId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "openLevel", {
            get: function () {
                return this._template.openLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "endLevel", {
            get: function () {
                return this._template.endLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "drops", {
            /**掉落物配置表 */
            get: function () {
                return this._drops;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "isBossKilled", {
            get: function () {
                return this._isBossKilled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "stateLock", {
            get: function () {
                if (this.type == mo.ModelGameBoss.COPY_PERSONAL && GameModels.chapter.data) {
                    return parseInt(this.template.parm1) > GameModels.chapter.data.Id;
                }
                if (this.type == mo.ModelGameBoss.COPY_DEATH && GameModels.common) {
                    return this.template.needCE > GameModels.common.mieShiHuangMoFigh;
                }
                if (this._lock != undefined)
                    return this._lock;
                return this.openLevel > GameModels.user.myConfigLevel;
            },
            set: function (v) {
                this._lock = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "cityId", {
            get: function () {
                return this._openCityId;
            },
            enumerable: true,
            configurable: true
        });
        CopyVO.prototype.updateSelfBossState = function (data) {
            // this._isBossKilled = data.LeftCount == 0;
            // this.killedEven = Boolean(data.KilledEven);
            this._openCityId = data.CityId;
            this._personDoneKilled = data.DoneKilled;
        };
        /** 刷新全民BOSS信息*/
        CopyVO.prototype.updateEveryBossState = function (data) {
            this._bossCd = data.RefreshTime;
            this._bossHP = parseInt(data.HP);
            this._isRemind = Boolean(data.Remind);
            this._isBossKilled = parseInt(data.HP) == 0;
            this._autoFight = data.AutoChallenge == 1;
            this._everyDoneKilled = data.DoneKilled;
            //策划要求:优先级为可挑战BOSS>可挑战已死亡BOSS>不可挑战BOSS>取消BOSS提醒的BOSS
            //理解为:提醒> 可挑战 >活着 
            this._seqIndex = Number(this._isRemind) * 100000 + Number(!this.stateLock) * 10000 + Number(!this._isBossKilled) * 1000 + this.step;
        };
        Object.defineProperty(CopyVO.prototype, "personDoneKilled", {
            get: function () {
                return this._personDoneKilled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "everyDoneKilled", {
            get: function () {
                return this._everyDoneKilled;
            },
            enumerable: true,
            configurable: true
        });
        // public updateCityBossState(data: n.ProtoMainCityBoss): void {
        //     this._bossHP = parseInt(data.HP);
        //     this._curAngry = data.CurAngry;
        //     this._maxAngry = data.MaxAngry;
        // }
        // public setcurAngry() {
        //     this._curAngry = this._maxAngry;
        // }
        // public updateHolidayBossState(data: n.ProtoHolidayMainCityBoss): void {
        //     this._bossHP = parseInt(data.HP);
        // }
        // public updateLoseBossState(data: n.ProtoTimedBoss): void {
        //     this._bossHP = parseInt(data.HP);
        //     this._refreshTime = data.RefreshTime;
        //     this._isOpened = data.IsOpened;
        // }
        // public updatePetWoodsBossState(data: n.ProtoPetWoodsBoss): void {
        //     this._bossHP = parseInt(data.HP);
        //     this._refreshTime = data.RefreshTime;
        //     this._bossCd = data.RefreshTime;
        //     this._isBossKilled = parseInt(data.HP) == 0;
        // }
        CopyVO.prototype.updatePetDeathBossState = function (data) {
            this._bossHP = parseInt(data.HP);
            this._refreshTime = data.RefreshTime;
            this._bossCd = data.RefreshTime;
            this._isBossKilled = parseInt(data.HP) == 0;
        };
        //神域boss信息
        CopyVO.prototype.updateDomainBossState = function (data) {
            this._bossCd = data.RefreshTime;
            this._bossHP = parseInt(data.HP);
            this._isRemind = Boolean(data.Remind);
            this._isBossKilled = parseInt(data.HP) == 0;
            //策划要求:优先级为可挑战BOSS>可挑战已死亡BOSS>不可挑战BOSS>取消BOSS提醒的BOSS
            //理解为:提醒> 可挑战 >活着 
            this._seqIndex = Number(this._isRemind) * 100000 + Number(!this.stateLock) * 10000 + Number(!this._isBossKilled) * 1000 + this.step;
        };
        // public updateFantasyBossState(data: n.ProtoMagicWorldBoss): void {
        //     this._bossCd = data.RefreshTime;
        //     this._bossHP = parseInt(data.HP);
        //     this._isRemind = Boolean(data.Remind);
        //     this._isBossKilled = parseInt(data.HP) == 0;
        // }
        CopyVO.prototype.updateAutoFightState = function (bool) {
            this._autoFight = bool;
        };
        /**Boss死亡 */
        CopyVO.prototype.bossDead = function () {
            this._isBossKilled = true;
            this._bossHP = 0;
        };
        /**设置BOSS重生*/
        CopyVO.prototype.bossReborn = function (hp) {
            this._bossHP = hp;
            this._bossCd = 0;
            this._isBossKilled = false;
        };
        Object.defineProperty(CopyVO.prototype, "seqIndex", {
            get: function () {
                return this._seqIndex || this.step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossCd", {
            get: function () {
                return this._bossCd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossHP", {
            get: function () {
                return this._bossHP;
            },
            set: function (value) {
                this._bossHP = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "bossHPMax", {
            get: function () {
                return utils.htmlUtil.getTemplateAndNameToValue(this._bossTemplate.properties, "HP");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "isRemind", {
            get: function () {
                return this._isRemind;
            },
            set: function (value) {
                this._isRemind = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "curAngry", {
            get: function () {
                return this._curAngry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "maxAngry", {
            get: function () {
                return this._maxAngry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "refreshTime", {
            get: function () {
                return this._refreshTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "isOpened", {
            get: function () {
                return this._isOpened == 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "openTime", {
            get: function () {
                return this.template.parm1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "firstReward", {
            get: function () {
                return this.template.parm2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "autoEnter", {
            /**自动进入 */
            get: function () {
                return this._autoFight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "isRefResh", {
            get: function () {
                return this._isRefResh;
            },
            set: function (v) {
                this._isRefResh = v;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 星级评分
         * @param time 已消耗时间
         */
        CopyVO.prototype.scoreStar = function (time) {
            var lastTime = time;
            if (lastTime < 0)
                lastTime = 0;
            var star = 3;
            while (star > 1) {
                if (this._starStatistics) {
                    var statistics = this._starStatistics[star];
                    if (statistics) {
                        if (lastTime <= statistics)
                            return star;
                    }
                    star--;
                }
                else {
                    break;
                }
            }
            return 1;
        };
        /**获取该星级所需时间 */
        CopyVO.prototype.getStarTime = function (star) {
            if (this._starStatistics && this._starStatistics[star])
                return this._starStatistics[star];
            return this._template.limitTime;
        };
        CopyVO.prototype.getPassBarrier = function () {
            var time = "40";
            return time;
        };
        Object.defineProperty(CopyVO.prototype, "killedEven", {
            get: function () {
                return this._killedEven;
            },
            set: function (bool) {
                this._killedEven = bool;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyVO.prototype, "personSort", {
            /**个人boss满足特殊boos排序 */
            get: function () {
                if (this._template.step == 901) {
                    if (GameModels.user.myConfigLevel >= 80) {
                        return 1;
                    }
                    else {
                        return 100000;
                    }
                }
                if (this._template.step == 902) {
                    if (GameModels.user.myConfigLevel >= 80) {
                        return 2;
                    }
                    else {
                        return 100001;
                    }
                }
                return this.openLevel;
            },
            enumerable: true,
            configurable: true
        });
        return CopyVO;
    }(vo.VOBase));
    vo.CopyVO = CopyVO;
    __reflect(CopyVO.prototype, "vo.CopyVO");
})(vo || (vo = {}));
