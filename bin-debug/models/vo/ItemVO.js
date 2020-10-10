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
    var ItemVO = (function (_super) {
        __extends(ItemVO, _super);
        function ItemVO() {
            var _this = _super.call(this) || this;
            _this._inBag = false;
            _this._isIsLock = 0;
            return _this;
        }
        ItemVO.prototype.initialize = function (data) {
            this._bingFaSkillList = [];
            this._baseBingFaProp = [];
            this._specialBingFaProp = [];
            this._inBag = false;
            if (data instanceof n.ProtoBagItem) {
                this.decodeProtoBagItem(data);
                return this;
            }
            if (data instanceof n.ProtoDropItems) {
                this.decodeProtoDropItem(data);
                return this;
            }
            if (data instanceof templates.item) {
                this.decodeTemplate(data);
                return this;
            }
            if (typeof data == "number") {
                this.decodeTemplate(Templates.getItemTemplateById(data));
                return this;
            }
            if (typeof data == "string") {
                this.decodeTemplateStr(data);
                return this;
            }
            return this;
        };
        ItemVO.prototype.reset = function () {
            this._template = null;
            this._index = -1;
            this._count = 0;
            this._dropType = -1;
            this._isIsLock = 0;
        };
        Object.defineProperty(ItemVO.prototype, "inBag", {
            get: function () {
                return this._inBag;
            },
            set: function (v) {
                this._inBag = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "baseBingFaProp", {
            /**兵法基础属性 */
            get: function () {
                return this._baseBingFaProp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "specialBingFaProp", {
            /**兵法特殊属性 */
            get: function () {
                return this._specialBingFaProp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "bingFaSkillList", {
            /**兵法技能列表 */
            get: function () {
                return this._bingFaSkillList;
            },
            enumerable: true,
            configurable: true
        });
        ItemVO.prototype.decodeProtoBagItem = function (data) {
            for (var i = 0; i < data.BingFaProp.length; i++) {
                var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.BingFaProp[i]);
                if (TypeProperty.baseProperties.indexOf(listVo.key) != -1) {
                    this._baseBingFaProp.push(listVo);
                }
                else {
                    this._specialBingFaProp.push(listVo);
                }
            }
            for (var i = 0; i < data.BingFaSkillList.length; i++) {
                if (data.BingFaSkillList[i]) {
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, data.BingFaSkillList[i]), 0);
                    this._bingFaSkillList.push(skillVO);
                }
            }
            this._index = data.Index;
            this._count = data.Count;
            this._template = Templates.getItemTemplateById(data.Id);
            this._level = data.Level;
            this._isIsLock = data.IsLock;
            return this;
        };
        ItemVO.prototype.decodeProtoDropItem = function (data) {
            this._index = -1;
            this._count = data.Count;
            this._template = Templates.getItemTemplateById(data.Id);
            return this;
        };
        ItemVO.prototype.decodeTemplate = function (data) {
            this._index = -1;
            this._count = 1;
            this._template = data;
            this._level = data.lv;
            return this;
        };
        ItemVO.prototype.decodeTemplateStr = function (data) {
            this._index = -1;
            this._count = parseInt(data.split("_")[1]);
            this._template = Templates.getItemTemplateById(data.split("_")[0]);
            this._level = 1;
            return this;
        };
        Object.defineProperty(ItemVO.prototype, "dropType", {
            /**
             * 掉落类型
             * 	0:小怪
             * 	1:精英怪
             * 	2:Boss
             */
            get: function () {
                return this._dropType;
            },
            set: function (v) {
                this._dropType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "hasTemplate", {
            get: function () {
                return this._template != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "isLock", {
            get: function () {
                return this._isIsLock;
            },
            set: function (value) {
                this._isIsLock = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "count", {
            get: function () {
                return this._count;
            },
            set: function (value) {
                this._count = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "icon", {
            get: function () {
                return this._template.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "quality", {
            get: function () {
                return this._template.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "step", {
            get: function () {
                return this._template.step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "nextId", {
            get: function () {
                return this._template.nextId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "mainType", {
            get: function () {
                return this._template.mainType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "type", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "templateProp", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "effect", {
            get: function () {
                return this._template.effect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "lv", {
            get: function () {
                return this._template.lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "splitType", {
            get: function () {
                if (!this._template.split)
                    return 0;
                var strArr = this._template.split.split(";");
                for (var i = 0; i < strArr.length; i++) {
                    var s = strArr[i].split("|");
                    return parseInt(s[0]);
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemVO.prototype, "splitItem", {
            get: function () {
                if (!this._template || !this._template.split)
                    return null;
                var strArr = this._template.split.split(";");
                for (var i = 0; i < strArr.length; i++) {
                    var s = strArr[i].split("|");
                    return s[1];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ItemVO.prototype.getSplitItemByType = function (type) {
            var strArr = this._template.split.split(";");
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i].split("|");
                if (parseInt(s[0]) == type) {
                    return s[1];
                }
            }
            return null;
        };
        ItemVO.prototype.clone = function () {
            var cloneVO = vo.fromPool(ItemVO);
            cloneVO._template = this._template;
            cloneVO._index = this._index;
            cloneVO._count = this._count;
            cloneVO._dropType = this._dropType;
            return cloneVO;
        };
        return ItemVO;
    }(vo.VOBase));
    vo.ItemVO = ItemVO;
    __reflect(ItemVO.prototype, "vo.ItemVO");
})(vo || (vo = {}));
