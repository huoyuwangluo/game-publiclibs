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
    var GameMonster = (function (_super) {
        __extends(GameMonster, _super);
        //protected _modleData:templates.dataModel;
        function GameMonster(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeActor.MONSTER) || this;
            _this._fixedMoveSpeed = 2.5;
            return _this;
        }
        GameMonster.prototype.createAnimation = function () {
            this._animation = new s.DirectAnimationBitmap();
            //this._animation.initialize(this._type==TypeActor.BOSS?game.TypeAnimaAsset.ACTOR_DIRECT_2:game.TypeAnimaAsset.ACTOR_DIRECT_5);
            this._animation.initialize(game.TypeAnimaAsset.ACTOR_DIRECT_5);
            this.addChild(this.animation);
            this.titleHeight = 100;
            this.titleColor = 0xFFFFFF;
        };
        GameMonster.prototype.createTitle = function () {
            this._title = new s.TitleMonsterObject();
        };
        GameMonster.prototype.initialize = function (vo) {
            this._type = vo.type;
            if (this._type == TypeActor.BOSS) {
                if (TypeGame.isFormationGame()) {
                    this._scale = 1.5;
                    this._title.bloodMergeVisible = true;
                }
                else if (TypeGame.CURRENT_GAME_TYPE == TypeGame.LEGION_WAR) {
                    this._scale = 1.0;
                    this._title.bloodMergeVisible = false;
                }
                else {
                    this._scale = 1.5;
                    this._title.bloodMergeVisible = false;
                }
            }
            else {
                if (TypeGame.isFormationGame()) {
                    this._scale = 2.5;
                }
                else {
                    this._scale = 1.0;
                }
                this._title.bloodMergeVisible = false;
            }
            _super.prototype.initialize.call(this, vo);
            this.resId = vo.resId;
            this.nameVisible = false;
            this.bloodVisible = false;
        };
        GameMonster.prototype.reset = function () {
            this.animation.reset();
            _super.prototype.reset.call(this);
        };
        GameMonster.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            if (app.gameContext.typeGame == TypeGame.LEGION_WAR) {
                if (this.vo) {
                    var configId = this.vo.configId;
                    var tpl = Templates.getTemplateByProperty(templates.Map.OTHERMONSTER, "id", configId);
                    if (tpl) {
                        this.showFootEffect(tpl.parm1);
                    }
                }
            }
        };
        Object.defineProperty(GameMonster.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonster.prototype, "resId", {
            set: function (v) {
                if (this._resId == v)
                    return;
                this._resId = v;
                if (this._resId) {
                    this._modleData = Templates.getTemplateById(templates.Map.DATAMODEL, parseInt(this._resId));
                    if (this._modleData) {
                        this.titleHeight = this._modleData.HPHight;
                    }
                    if (this._hitRect) {
                        this._hitRect.height = this.titleHeight;
                        this._hitRect.x = -(this._hitRect.width / 2);
                        this._hitRect.y = -this._hitRect.height;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**播放完后回到待机动作 */
        GameMonster.prototype.actionOnce = function (v, direction, frameRate) {
            if (direction === void 0) { direction = -1; }
            if (frameRate === void 0) { frameRate = 0; }
            if (_super.prototype.actionOnce.call(this, v, direction, frameRate)) {
                return true;
            }
            return false;
        };
        GameMonster.prototype.hpHurted = function (value, target) {
            if (target === void 0) { target = null; }
            var v = _super.prototype.hpHurted.call(this, value, target);
            return v;
        };
        GameMonster.prototype.deadHandler = function (killer) {
            _super.prototype.deadHandler.call(this, killer);
        };
        GameMonster.prototype.updateAvatarDisplay = function (isShow) {
            if (_super.prototype.updateAvatarDisplay.call(this, isShow)) {
                this.updateAnimation();
                return true;
            }
            return false;
        };
        GameMonster.prototype.updateAnimation = function () {
            if (!this._skinEnabled) {
                return;
            }
            if (!this._resId || !this._action || this._direct == -1) {
                return;
            }
            var curResId = this._resId;
            if (this.getBuffResId() > 0) {
                curResId = "" + this.getBuffResId();
            }
            if (this._action == TypeAction.DEAD) {
                this.animation.setResId(this._avatarEnabled ? (curResId + "_" + TypeAction.IDLE) : null);
            }
            else {
                this.animation.setResId(this._avatarEnabled ? (curResId + "_" + this._action) : null);
            }
            /*if(this._modleData && this._modleData.reversal == 0)
            {
                this.animation.direct = TypeDirection.DOWN;
            }
            else
            {
                this.animation.direct = this._direct;
            }*/
            this.animation.direct = this._direct;
            _super.prototype.updateAnimation.call(this);
        };
        GameMonster.prototype.updateHpDisplay = function () {
            _super.prototype.updateHpDisplay.call(this);
            if (TypeGame.isFormationGame() == false) {
                this.bloodVisible = true;
                if (TypeGame.CURRENT_GAME_TYPE == TypeGame.LEGION_WAR) {
                    this.nameVisible = false;
                }
                else {
                    this.nameVisible = true;
                }
            }
        };
        return GameMonster;
    }(s.SmartObject));
    s.GameMonster = GameMonster;
    __reflect(GameMonster.prototype, "s.GameMonster");
})(s || (s = {}));
