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
    var AchievenmentVO = (function (_super) {
        __extends(AchievenmentVO, _super);
        function AchievenmentVO() {
            var _this = _super.call(this) || this;
            _this._rewards = [];
            return _this;
        }
        AchievenmentVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        AchievenmentVO.prototype.reset = function () {
            this._achieveTemplate = null;
            this._flowDes = [];
            if (this._itemVO)
                vo.toPoolList(this._itemVO);
            this._itemVO = null;
            this._rewards = [];
        };
        AchievenmentVO.prototype.decode = function (type, data) {
            if (type == "everyDay") {
                this._achieveTemplate = Templates.getTemplateById(templates.Map.TASKDAY, data.TaskId);
            }
            else {
                //this._achieveTemplate = Templates.getTemplateById(templates.Map.TASKACHIEVE, data.TaskId);
            }
            if (this._achieveTemplate) {
                if (this._achieveTemplate.needTimes < data.FinishNumber) {
                    this._progressNum = this._achieveTemplate.needTimes;
                }
                else {
                    this._progressNum = data.FinishNumber;
                    this._progress = data.FinishNumber / this._achieveTemplate.needTimes;
                }
                this._state = data.TaskState;
                this._flowDes = utils.TextFlowMaker.generateTextFlow(this._achieveTemplate.des);
                this.setPriority();
                this.setreward(this._achieveTemplate.rewards);
                this.setItems();
            }
        };
        AchievenmentVO.prototype.setPriority = function () {
            if (this._state == 1) {
                this._priority = 2;
            }
            else if (this._state == 2) {
                this._priority = 1;
            }
            else {
                this._priority = this._state;
            }
        };
        AchievenmentVO.prototype.setItems = function () {
            if (!this._itemVO)
                this._itemVO = [];
            vo.toPoolList(this._itemVO);
            this._itemVO.length = 0;
            for (var i = 0; i < this._rewards.length; i++) {
                var id = this._rewards[i].id;
                this._itemVO[i] = vo.fromPool(vo.ItemVO, parseInt(id));
                this._itemVO[i].count = this._rewards[0].count;
            }
        };
        AchievenmentVO.prototype.setreward = function (item) {
            this._rewards = [];
            var strArr = item.split(";");
            for (var i = 0; i < strArr.length; i++) {
                if (!strArr[i])
                    continue;
                var strArr1 = strArr[i].split("_");
                this._rewards.push({ id: strArr1[0], count: strArr1[1] });
            }
        };
        AchievenmentVO.prototype.getOneCountreward = function (item) {
            var results = [];
            var strArr = item.split(";");
            for (var i = 0; i < strArr.length; i++) {
                if (!strArr[i])
                    continue;
                var strArr1 = strArr[i].split("_");
                results.push({ id: strArr1[0], count: strArr1[1] });
            }
            return results;
        };
        AchievenmentVO.prototype.itemTemplates = function (index) {
            var itemTemplates = Templates.getTemplateById(templates.Map.ITEM, index);
            return itemTemplates;
        };
        Object.defineProperty(AchievenmentVO.prototype, "achievetemplate", {
            /**成就表**/
            get: function () {
                return this._achieveTemplate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "flowDes", {
            get: function () {
                return this._flowDes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "reward", {
            get: function () {
                return this._rewards;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "progressNum", {
            get: function () {
                return this._progressNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "priority", {
            get: function () {
                return this._priority;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "rewards", {
            get: function () {
                return this._rewards;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "progress", {
            get: function () {
                return this._progress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "itemsVO", {
            get: function () {
                return this._itemVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievenmentVO.prototype, "isOpen", {
            get: function () {
                if (this._achieveTemplate) {
                    if (GameModels.user.player.level >= this._achieveTemplate.needLv && GameModels.serverTime.kaifuDay >= this._achieveTemplate.openDay) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return AchievenmentVO;
    }(vo.VOBase));
    vo.AchievenmentVO = AchievenmentVO;
    __reflect(AchievenmentVO.prototype, "vo.AchievenmentVO");
})(vo || (vo = {}));
