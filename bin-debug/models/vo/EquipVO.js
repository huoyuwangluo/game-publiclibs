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
    var EquipVO = (function (_super) {
        __extends(EquipVO, _super);
        function EquipVO() {
            var _this = _super.call(this) || this;
            _this.isBest = false;
            return _this;
        }
        EquipVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoNewEquipInfo) {
                this.decodeNewEquip(data);
                return this;
            }
            if (data instanceof n.ProtoBagItem) {
                this.decodeProtoBagItem(data);
                return this;
            }
            if (data instanceof n.ProtoDropItems) {
                this.decodeDropItem(data);
                return this;
            }
            if (data instanceof templates.equip) {
                this.decodeTemplate(data);
                return this;
            }
            if (typeof data == "number") {
                this.decodeTemplate(Templates.getItemTemplateById(data));
                return this;
            }
            return this;
        };
        EquipVO.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._pick = false;
            this._score = 0;
            this.isBest = false;
            this._template = null;
            this._rolePos = -1;
            this._pos = 0;
        };
        Object.defineProperty(EquipVO.prototype, "refId", {
            get: function () {
                return this._refId;
            },
            set: function (v) {
                this._refId = v;
                this._template = Templates.getTemplateById(templates.Map.EQUIP, this._refId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipVO.prototype, "rolePos", {
            get: function () {
                return this._rolePos;
            },
            enumerable: true,
            configurable: true
        });
        EquipVO.prototype.decodeNewEquip = function (data) {
            this._refId = data.RefId;
            this._rolePos = data.RoomPos;
            this._template = Templates.getTemplateById(templates.Map.EQUIP, data.RefId);
            this._pos = data.Position;
            this._count = 1;
            return this;
        };
        EquipVO.prototype.create = function (id, pos) {
            this._template = Templates.getTemplateById(templates.Map.EQUIP, id);
            this._pos = this._index = pos;
            this._count = 1;
        };
        EquipVO.prototype.decodeProtoBagItem = function (data) {
            this._template = Templates.getTemplateById(templates.Map.EQUIP, data.Id);
            this._index = data.Index;
            this._count = 1;
            this._isIsLock = data.IsLock;
            return this;
        };
        EquipVO.prototype.decodeDropItem = function (data) {
            this._template = Templates.getTemplateById(templates.Map.EQUIP, data.Id);
            this._index = -1;
            this._count = data.Count;
            return this;
        };
        Object.defineProperty(EquipVO.prototype, "score", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipVO.prototype, "pick", {
            get: function () {
                return this._pick;
            },
            set: function (value) {
                this._pick = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipVO.prototype, "templateEquip", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipVO.prototype, "templateProp", {
            get: function () {
                throw new Error("error!");
            },
            enumerable: true,
            configurable: true
        });
        EquipVO.getStepName = function (lv) {
            return convert.getLevelName(lv);
            ;
        };
        Object.defineProperty(EquipVO.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipVO.prototype, "modelId", {
            get: function () {
                return this._template.model;
            },
            enumerable: true,
            configurable: true
        });
        EquipVO.prototype.clone = function () {
            var cloneVO = vo.fromPool(EquipVO);
            cloneVO._template = this._template;
            cloneVO._index = this._index;
            cloneVO._count = this._count;
            cloneVO._pick = this._pick;
            cloneVO._score = this._score;
            cloneVO.isBest = this.isBest;
            return cloneVO;
        };
        return EquipVO;
    }(vo.ItemVO));
    vo.EquipVO = EquipVO;
    __reflect(EquipVO.prototype, "vo.EquipVO");
})(vo || (vo = {}));
