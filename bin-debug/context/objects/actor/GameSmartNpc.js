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
var s;
(function (s) {
    var GameSmartNpc = (function (_super) {
        __extends(GameSmartNpc, _super);
        function GameSmartNpc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameSmartNpc.prototype.initialize = function (npcVO) {
            _super.prototype.initialize.call(this, npcVO);
            npcVO.onNameChange(this, this.nameChangeHandler);
            if (npcVO.isSupportNPC) {
                //this._fixedMoveSpeed=4;
                this.bloodVisible = true;
                this.nameVisible = true;
                this.come(0, "15202"); //NPC援军带飞入特效	
                this.scaleX = this.scaleY = 1.0;
            }
            else {
                //this.come(0);
            }
        };
        GameSmartNpc.prototype.reset = function () {
            if (this._vo) {
                this._vo.offNameChange();
            }
            _super.prototype.reset.call(this);
        };
        GameSmartNpc.prototype.createTitle = function () {
            this._title = new s.TitleNpcObject();
        };
        GameSmartNpc.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            if (this._vo.isSupportNPC) {
                this.showFootEffect("1097");
                //this.showFootEffect("12703");
            }
        };
        Object.defineProperty(GameSmartNpc.prototype, "titleName", {
            get: function () {
                return this._vo.name;
            },
            set: function (value) {
                this._vo.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartNpc.prototype, "titleColor", {
            set: function (value) {
                this._title.color = value;
            },
            enumerable: true,
            configurable: true
        });
        GameSmartNpc.prototype.nameChangeHandler = function () {
            this._title.name = this._vo.name;
        };
        return GameSmartNpc;
    }(s.GameMonster));
    s.GameSmartNpc = GameSmartNpc;
    __reflect(GameSmartNpc.prototype, "s.GameSmartNpc");
})(s || (s = {}));
