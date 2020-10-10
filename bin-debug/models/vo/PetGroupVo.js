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
    var PetGroupVo = (function (_super) {
        __extends(PetGroupVo, _super);
        function PetGroupVo() {
            return _super.call(this) || this;
        }
        PetGroupVo.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._id = 0;
            this._templates = null;
            this._status = 0;
            this._count = 0;
            this._country = 0;
            this._consumes = "";
            this._playerName = "";
            this._hashRedPoint = 0;
            this._doneCount = 0;
            this._playerId = "";
        };
        PetGroupVo.prototype.reset = function () {
            this._id = 0;
            this._templates = null;
            this._status = 0;
            this._count = 0;
            this._country = 0;
            this._consumes = "";
            this._playerName = "";
            this._hashRedPoint = 0;
            this._doneCount = 0;
            this._playerId = "";
        };
        PetGroupVo.prototype.decode = function (data) {
            data.autoRecover = false;
            this._id = data.GroupId;
            this._status = data.Status;
            this._doneCount = data.DoneCount;
            this._playerName = data.PlayerName;
            this._templates = Templates.getTemplateById(templates.Map.GENERALGROUP, this._id);
            this._count = this._templates.count;
            this._country = this._templates.country;
            this._consumes = this._templates.consume;
            this._playerId = data.PlayerId;
        };
        Object.defineProperty(PetGroupVo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "status", {
            /**组合状态，0：不能注册，1：可注册，2：已注册 */
            get: function () {
                return this._status;
            },
            set: function (v) {
                this._status = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "doneCount", {
            get: function () {
                return this._doneCount;
            },
            set: function (v) {
                this._doneCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "country", {
            get: function () {
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "group", {
            get: function () {
                return this._templates.group;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "consumes", {
            get: function () {
                return this._consumes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "properites", {
            get: function () {
                return this._templates.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            set: function (v) {
                this._playerName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupVo.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            set: function (v) {
                this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        return PetGroupVo;
    }(vo.VOBase));
    vo.PetGroupVo = PetGroupVo;
    __reflect(PetGroupVo.prototype, "vo.PetGroupVo");
})(vo || (vo = {}));
