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
    var GameBoss = (function (_super) {
        __extends(GameBoss, _super);
        function GameBoss() {
            return _super.call(this, TypeActor.BOSS) || this;
        }
        GameBoss.prototype.initialize = function (vo) {
            _super.prototype.initialize.call(this, vo);
            if (TypeGame.isFormationGame(true)) {
                this.bloodVisible = true;
                this.nameVisible = false;
                this.levelVisible = true;
                this._title.name = this._vo.name;
                this._title.level = this._vo.level;
                this.titleColor = TypeColor.WHITE; //TypeQuality.getStarColor(petVO.star);
            }
            else {
                this.bloodVisible = false;
                this.nameVisible = true;
                this.levelVisible = false;
            }
            //this._title.name = (this._vo as vo.GameMonsterVO).name + "(" + (this._vo as vo.GameMonsterVO).level + ")";
            this.title.soldierType = vo.soldierType;
        };
        GameBoss.prototype.createTitle = function () {
            this._title = new s.TitlePetObject();
        };
        Object.defineProperty(GameBoss.prototype, "title", {
            get: function () {
                return this._title;
            },
            enumerable: true,
            configurable: true
        });
        GameBoss.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            if (TypeGame.isFormationGame(true)) {
                if (this._vo.isSupportNPC) {
                    this.come(0); //援军带飞入特效
                }
            }
            else {
                this.showFootEffect('6101');
            }
        };
        GameBoss.prototype.updateMpDisplay = function () {
            _super.prototype.updateMpDisplay.call(this);
        };
        return GameBoss;
    }(s.GameMonster));
    s.GameBoss = GameBoss;
    __reflect(GameBoss.prototype, "s.GameBoss");
})(s || (s = {}));
