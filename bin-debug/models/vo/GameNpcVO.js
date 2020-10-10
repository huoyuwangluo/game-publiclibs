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
    var GameNpcVO = (function (_super) {
        __extends(GameNpcVO, _super);
        function GameNpcVO() {
            return _super.call(this, TypeActor.NPC) || this;
        }
        GameNpcVO.prototype.initialize = function (template) {
            this._template = template;
            this._name = template.name;
            _super.prototype.initialize.call(this, template);
        };
        GameNpcVO.prototype.reset = function () {
        };
        Object.defineProperty(GameNpcVO.prototype, "resId", {
            get: function () {
                if (this._template instanceof templates.taskNpc)
                    return this._template.resId;
                if (this._template instanceof templates.cityNpc)
                    return this._template.npcRes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpcVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpcVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpcVO.prototype, "name", {
            get: function () {
                return this._name ? this._name : this.template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpcVO.prototype, "hpMax", {
            get: function () {
                return this._hpMax;
            },
            set: function (v) {
                this._hpMax = v;
            },
            enumerable: true,
            configurable: true
        });
        return GameNpcVO;
    }(vo.GameSmartVO));
    vo.GameNpcVO = GameNpcVO;
    __reflect(GameNpcVO.prototype, "vo.GameNpcVO");
})(vo || (vo = {}));
