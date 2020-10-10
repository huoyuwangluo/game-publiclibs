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
    var TaskVO = (function (_super) {
        __extends(TaskVO, _super);
        function TaskVO() {
            return _super.call(this) || this;
        }
        TaskVO.prototype.initialize = function (data) {
            this._clientTaskType = false;
            this._template = data;
            this._total = this._template.needTimes;
            this._current = 0;
            var list = convert.parseItemsInfo(this._template.rewards);
            if (!this._items)
                this._items = [];
            for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
                var itemVO = _a[_i];
                vo.toPool(itemVO);
            }
            this._items.length = 0;
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var itemData = list_1[_b];
                var itemVO;
                if (Templates.getItemTemplateMainType(itemData.id) == TypeItem.EQUIP) {
                    itemVO = vo.fromPool(vo.EquipVO, itemData.id);
                }
                else {
                    itemVO = vo.fromPool(vo.ItemVO, itemData.id);
                }
                itemVO.count = itemData.count;
                this._items.push(itemVO);
            }
        };
        TaskVO.prototype.reset = function () {
            for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
                var itemVO = _a[_i];
                vo.toPool(itemVO);
            }
            this._items.length = 0;
            this._template = null;
        };
        TaskVO.prototype.updateCurrent = function (value) {
            this._current = value;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        Object.defineProperty(TaskVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "type", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "target", {
            get: function () {
                return this._template.target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "total", {
            get: function () {
                if (this.type == 101 || this.type == 109 || this.type == 2 || this.type == 135) {
                    return 1;
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "current", {
            get: function () {
                return this._current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "clientTaskType", {
            get: function () {
                return this._clientTaskType;
            },
            set: function (v) {
                this._clientTaskType = v;
                this.dispatchEventWith(egret.Event.CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "canSubmit", {
            get: function () {
                if (this.type == TypeTask.WARE || this.type == TypeTask.CHAT) {
                    return this._clientTaskType;
                }
                if (this.type == 101 || this.type == 109 || this.type == 2 || this.type == 135) {
                    return this._current == 0 ? false : true;
                }
                return !this._total || this._current >= this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "firstItem", {
            get: function () {
                return (this._items && this._items.length) ? this._items[0] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "hasFunc", {
            get: function () {
                return !!this._template.functionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "funcId", {
            get: function () {
                return this._template.functionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "funcParams", {
            get: function () {
                return this._template.functionParams;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "isBegin", {
            /**是否是新手跑图阶段 */
            get: function () {
                return !this._template.tittle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        TaskVO.prototype.onChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offChange();
            this._changeHandler = utils.Handler.create(caller, method, args, false);
        };
        TaskVO.prototype.offChange = function () {
            if (this._changeHandler) {
                this._changeHandler.recover();
                this._changeHandler = null;
            }
        };
        return TaskVO;
    }(vo.VOBase));
    vo.TaskVO = TaskVO;
    __reflect(TaskVO.prototype, "vo.TaskVO");
})(vo || (vo = {}));
