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
    var AnimalVo = (function (_super) {
        __extends(AnimalVo, _super);
        function AnimalVo() {
            return _super.call(this) || this;
        }
        AnimalVo.prototype.initialize = function (data) {
            this._templates = data;
            this.level = 1;
            this._isAct = false;
        };
        AnimalVo.prototype.reset = function () {
            this._isAct = false;
            this._templates = null;
            this._level = 0;
            this._step = 0;
            this._templateLvs = null;
        };
        Object.defineProperty(AnimalVo.prototype, "id", {
            get: function () {
                return this._templates.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "step", {
            get: function () {
                return this._step;
            },
            set: function (v) {
                this._step = v;
                this._templates = Templates.getTemplateByTwoProperty(templates.Map.ANIMAL, "type", this.type, "step", this._step);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (v) {
                this._level = v;
                this._templateLvs = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", this._level);
                if (this._isAct) {
                    if (this.nextId != -1) {
                        this._templateNextLvs = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", this.nextId);
                    }
                    else {
                        this._templateNextLvs = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", this._level);
                    }
                }
                else {
                    this._templateNextLvs = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", this._level);
                }
                var step = this._templateLvs.step;
                this.step = step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "isAct", {
            get: function () {
                return this._isAct;
            },
            set: function (v) {
                this._isAct = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "templateLvs", {
            get: function () {
                return this._templateLvs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "templateNextLvs", {
            get: function () {
                return this._templateNextLvs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "name", {
            get: function () {
                var baseTemp = Templates.getTemplateByTwoProperty(templates.Map.ANIMAL, "type", this.type, "step", 1);
                return baseTemp.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "icon", {
            get: function () {
                return this._templates.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "type", {
            get: function () {
                return this._templates.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "des", {
            get: function () {
                return this._templates.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "quality", {
            get: function () {
                return this._templates.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "skillIcon", {
            get: function () {
                return this._templates.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "model", {
            get: function () {
                return this._templates.model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "selfConsume", {
            get: function () {
                return this._templateNextLvs.selfConsume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "otherConsume", {
            get: function () {
                return this._templateNextLvs.consume1_Item;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "otherConsumeCount", {
            get: function () {
                return this._templateNextLvs.consume1_Count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "proites", {
            get: function () {
                return this._templateLvs.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "fight", {
            get: function () {
                return this._templateLvs.score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "nextId", {
            get: function () {
                return this._templateLvs.nextId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "nextProites", {
            get: function () {
                var tempLv = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", this._level + 1);
                if (tempLv)
                    return tempLv.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "getNoActProites", {
            get: function () {
                var strArr = "";
                var tempLv = Templates.getTemplateByTwoProperty(templates.Map.ANIMALLEVEL, "type", this.type, "level", 1);
                var strArr1 = tempLv.properties.split(";");
                for (var i = 0; i < strArr1.length; i++) {
                    if (strArr) {
                        strArr = strArr + ";" + strArr1[i].split("_")[0] + "_0";
                    }
                    else {
                        strArr = strArr + strArr1[i].split("_")[0] + "_0";
                    }
                }
                return strArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalVo.prototype, "hashRedPoint", {
            get: function () {
                var isOpen8Day = GameModels.animal.hashOpen8day;
                if (isOpen8Day) {
                    if (this.nextId == -1)
                        return false;
                    if (this.selfConsume) {
                        var strArr = this.templateNextLvs.selfConsume.split("_");
                        var needCount = parseInt(strArr[1]);
                        var bagCount = GameModels.bag.getItemCountById(strArr[0]);
                        if (bagCount >= needCount)
                            return true;
                    }
                    else {
                        var needCount = this.otherConsumeCount;
                        var strArr = this.templateNextLvs.consume1_Item.split(";");
                        var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                        var voArr = GameModels.bag.getItemsByTypeAndQuality(TypeItem.ANIMAL_ONE, item.quality);
                        for (var _i = 0, voArr_1 = voArr; _i < voArr_1.length; _i++) {
                            var itemVo = voArr_1[_i];
                            if (itemVo.count >= needCount)
                                return true;
                        }
                    }
                }
                else {
                    if (this._isAct)
                        return false;
                    var strArr = this._templateLvs.selfConsume.split("_");
                    var needCount = parseInt(strArr[1]);
                    var bagCount = GameModels.bag.getItemCountById(strArr[0]);
                    if (bagCount >= needCount)
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return AnimalVo;
    }(vo.VOBase));
    vo.AnimalVo = AnimalVo;
    __reflect(AnimalVo.prototype, "vo.AnimalVo");
})(vo || (vo = {}));
