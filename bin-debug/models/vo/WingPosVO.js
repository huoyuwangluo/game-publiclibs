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
    var WingPosVO = (function (_super) {
        __extends(WingPosVO, _super);
        function WingPosVO() {
            return _super.call(this) || this;
        }
        WingPosVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoWingPositionInfo) {
                this.decode(data);
            }
            else if (data instanceof templates.heroWing) {
                this._template = data;
            }
        };
        WingPosVO.prototype.reset = function () {
            var that = this;
            if (that._pos)
                that._pos = 0;
            if (that._step)
                that._step = 0;
            if (that._star)
                that._star = 0;
            if (that._exp)
                that._exp = 0;
            if (that._template)
                that._template = null;
            if (that._wingGodMasterLevel)
                this._wingGodMasterLevel = 0;
            if (that._templateDataSetting)
                that._templateDataSetting = null;
        };
        WingPosVO.prototype.decode = function (data) {
            var that = this;
            that.reset();
            that._pos = data.Position;
            that._step = data.Step;
            that._star = data.Star;
            that._exp = data.Exp;
            var id;
            if (that._step == 0 && that._star == 0) {
                id = 100000 + (that._step + 1) * 100 + that._star;
            }
            else {
                id = 100000 + that._step * 100 + that._star;
            }
            that._template = Templates.getTemplateById(templates.Map.HEROWING, id);
            that._wingGodVOs = [];
            for (var _i = 0, _a = data.EquipInfo; _i < _a.length; _i++) {
                var wingGod = _a[_i];
                that._wingGodVOs.push(vo.fromPool(vo.WingGodVO, wingGod));
            }
            that._wingGodVOs.sort(function (a, b) {
                if (a.type < b.type)
                    return -1;
                if (a.type > b.type)
                    return 1;
                return 0;
            });
            that.setWingGodMaster();
        };
        WingPosVO.prototype.setStepStar = function (step, star, exp) {
            this._step = step;
            this._star = star;
            this._exp = exp;
            var _id = 100000 + this._step * 100 + this._star;
            this._template = Templates.getTemplateById(templates.Map.HEROWING, _id);
        };
        Object.defineProperty(WingPosVO.prototype, "wingGodVOs", {
            get: function () {
                return this._wingGodVOs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "exp", {
            get: function () {
                return this._exp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "id", {
            //翅膀id
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "step", {
            //阶级:0级时要默认为1阶来显示
            get: function () {
                return this._template.step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "lv", {
            //等级
            get: function () {
                return this._template.lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "consumeItemId", {
            //消耗的物品id
            get: function () {
                return this._template.consume.split("_")[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "consumeItemNum", {
            //消耗的物品数量
            get: function () {
                var count = 0;
                count = parseInt(this._template.consume.split("_")[1]);
                var tianFenganimal = GameModels.animal.getAnimalBuyType(19); //天凤
                if (tianFenganimal.isAct && tianFenganimal.step >= 4) {
                    count = count > 1 ? Math.floor(parseInt(this._template.consume.split("_")[1]) / 2) : count;
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "nextId", {
            //下一级id
            get: function () {
                return this._template.nextId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "nextExp", {
            //下一级需要的经验
            get: function () {
                return this._template.needExp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "score", {
            //战力
            get: function () {
                return utils.htmlUtil.computeModelTatolFighting(this._template.properties);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "properties", {
            //属性集合
            get: function () {
                return this._template.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "HP", {
            get: function () {
                return parseInt(this._template.properties.split(";")[0].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "ATT", {
            get: function () {
                return parseInt(this._template.properties.split(";")[1].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "DEF", {
            get: function () {
                return parseInt(this._template.properties.split(";")[2].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "CROSS", {
            get: function () {
                return parseInt(this._template.properties.split(";")[3].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        //神羽大师
        WingPosVO.prototype.setWingGodMaster = function () {
            this._wingGodMasterLevel = this.getWingGodMasterLevel();
            var setId;
            if (this._wingGodMasterLevel == 0) {
                setId = 230000 + 1;
            }
            else {
                setId = 230000 + this._wingGodMasterLevel;
            }
            this._templateDataSetting = GameModels.dataSet.getDataSettingById(setId);
        };
        Object.defineProperty(WingPosVO.prototype, "wingGodMasterPropAdd", {
            get: function () {
                if (!this._templateDataSetting)
                    return 0;
                var value = parseInt(this._templateDataSetting.value);
                var propAdd = value / 100;
                return propAdd;
            },
            enumerable: true,
            configurable: true
        });
        //神羽大师等级计算
        WingPosVO.prototype.getWingGodMasterLevel = function () {
            var level = 100;
            for (var _i = 0, _a = this._wingGodVOs; _i < _a.length; _i++) {
                var wingGod = _a[_i];
                if (!wingGod.isPutOn) {
                    return 0;
                }
                if (wingGod.template.step < level) {
                    level = wingGod.template.step;
                }
            }
            return level;
        };
        Object.defineProperty(WingPosVO.prototype, "wingGodMasterLevel", {
            get: function () {
                return this._wingGodMasterLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingPosVO.prototype, "templateDataSetting", {
            get: function () {
                return this._templateDataSetting;
            },
            enumerable: true,
            configurable: true
        });
        return WingPosVO;
    }(vo.VOBase));
    vo.WingPosVO = WingPosVO;
    __reflect(WingPosVO.prototype, "vo.WingPosVO");
})(vo || (vo = {}));
