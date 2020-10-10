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
    var WingGodVO = (function (_super) {
        __extends(WingGodVO, _super);
        function WingGodVO() {
            return _super.call(this) || this;
        }
        WingGodVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoWingEquipInfo) {
                this.decode(data);
            }
            else if (data instanceof templates.heroWingEquip) {
                this._template = data;
                this._type = this._template.type;
                this._step = this._template.step;
                this.setTemplate();
            }
        };
        WingGodVO.prototype.reset = function () {
            var that = this;
            that._template = null;
            that._step = 0;
            that._type = 0;
            that._isPutOn = false;
        };
        WingGodVO.prototype.decode = function (data) {
            var that = this;
            that.reset();
            that._type = data.Type;
            that._step = data.Step;
            that.setTemplate();
        };
        WingGodVO.prototype.setTemplate = function () {
            var step;
            if (this._step == 0) {
                this._isPutOn = false;
                step = 1;
            }
            else {
                this._isPutOn = true;
                step = this._step;
            }
            var id = this._type * 100 + step + 213000;
            this._template = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, id);
            this._templateProp = Templates.getTemplateById(templates.Map.ITEM, this._template.resId);
        };
        Object.defineProperty(WingGodVO.prototype, "step", {
            get: function () {
                return this._step;
            },
            set: function (value) {
                this._step = value;
                this.setTemplate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "isPutOn", {
            get: function () {
                return this._isPutOn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "templateProp", {
            get: function () {
                return this._templateProp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "changeItemId", {
            //转换消耗物品id
            get: function () {
                return this._template.changeValue.split("_")[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "changeItemNum", {
            //转换消耗物品数量
            get: function () {
                if (!this._template)
                    return 0;
                return parseInt(this._template.changeValue.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "consumeItemId", {
            //消耗物品id
            get: function () {
                return this._templateProp.combine.split("_")[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingGodVO.prototype, "consumeItemNum", {
            //消耗物品数量
            get: function () {
                return parseInt(this._templateProp.combine.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        WingGodVO.prototype.getPropertiesBuyTypeAndStep = function (type, step) {
            var properties = "";
            if (step < 1)
                step = 1;
            if (step > 6)
                step = 6;
            var godWing = Templates.getTemplateByLvAndType(templates.Map.HEROWINGEQUIP, "type", type, "step", step);
            if (godWing) {
                properties = godWing.properties;
            }
            return properties;
        };
        return WingGodVO;
    }(vo.VOBase));
    vo.WingGodVO = WingGodVO;
    __reflect(WingGodVO.prototype, "vo.WingGodVO");
})(vo || (vo = {}));
