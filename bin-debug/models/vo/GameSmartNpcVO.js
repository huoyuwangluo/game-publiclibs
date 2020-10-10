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
    var GameSmartNpcVO = (function (_super) {
        __extends(GameSmartNpcVO, _super);
        function GameSmartNpcVO() {
            return _super.call(this, TypeActor.NPC) || this;
        }
        GameSmartNpcVO.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.offNameChange();
        };
        GameSmartNpcVO.prototype.updateName = function (n) {
            this._name = n;
        };
        Object.defineProperty(GameSmartNpcVO.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                if (this._name != v) {
                    this._name = v;
                    if (this._nameChangeHandler) {
                        this._nameChangeHandler.run();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GameSmartNpcVO.prototype.onNameChange = function (caller, method) {
            this.offNameChange();
            this._nameChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        GameSmartNpcVO.prototype.offNameChange = function () {
            if (this._nameChangeHandler) {
                this._nameChangeHandler.recover();
                this._nameChangeHandler = null;
            }
        };
        return GameSmartNpcVO;
    }(vo.GameMonsterVO));
    vo.GameSmartNpcVO = GameSmartNpcVO;
    __reflect(GameSmartNpcVO.prototype, "vo.GameSmartNpcVO");
})(vo || (vo = {}));
