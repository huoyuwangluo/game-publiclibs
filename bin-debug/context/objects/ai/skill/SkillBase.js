var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SkillBase = (function () {
        function SkillBase(type) {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._created = false;
            this._type = type;
        }
        SkillBase.prototype.initialize = function (config, template, body, targetTile, skillTarget) {
            var that = this;
            that._body = body;
            that._scene = body.scene;
            that._template = template;
            that._config = config;
            that._target = skillTarget;
            that._targetTile = targetTile;
            this.createEffect();
        };
        SkillBase.prototype.createEffect = function () {
        };
        SkillBase.prototype.reset = function () {
            this.offComplete();
            this.autoRecover = true;
        };
        SkillBase.prototype.destory = function () {
            var that = this;
            that._body = null;
            that._scene = null;
            that._template = null;
            that._config = null;
            that._target = null;
            that._targetTile = null;
        };
        Object.defineProperty(SkillBase.prototype, "focusMode", {
            /**专注模式 */
            get: function () {
                return this._focusMode;
            },
            set: function (value) {
                this._focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        SkillBase.prototype.start = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        SkillBase.prototype.rockAfter = function () { };
        SkillBase.prototype.end = function () {
            if (this._complete)
                this._complete.runWith(this);
        };
        SkillBase.prototype.onComplete = function (caller, method, args) {
            if (args === void 0) { args = null; }
            this.offComplete();
            this._complete = utils.Handler.create(caller, method, args, false);
        };
        SkillBase.prototype.offComplete = function () {
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
        };
        Object.defineProperty(SkillBase.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        /**验证是否开启了专注模式且当前单位为专注的目标 */
        SkillBase.prototype.verifyFcousTarget = function (object) {
            if (!this._focusMode)
                return false;
            if (object != this._target)
                return true;
            return false;
        };
        /**通过技能范围，找到攻击目标;用格子计算 */
        SkillBase.prototype.getTargetList = function () {
            var targetList = [];
            /*var skillRange:number = this.getSkillRange();
            var lockTarget:number = this.getLockTarget();
        
            if(skillRange == TypeSkill.RANGE_SELF_ALL) //已方全体
            {
                targetList = this._scene.getAllFriendList(this._body);
            }
            else
            {
                var dataRef:templates.skillRange = Templates.getTemplateById(templates.Map.SKILLRANGE, skillRange);
                if(dataRef != null)
                {
                    var ownerX:number = this._body.tileX;
                    var ownerY:number = this._body.tileY;
                    var targetX:number = this._targetTile ? this._targetTile.x : -1;
                    var targetY:number = this._targetTile ? this._targetTile.y : -1;
                    //取技能范围字符串
                    var rangeStr:string = dataRef.center;
                    if(!rangeStr || rangeStr == "0")
                    {
                        switch(this._body.direct)
                        {
                            case TypeDirection.UP:
                                rangeStr = dataRef.up;
                                break;
                            case TypeDirection.RIGHT_UP:
                                rangeStr = dataRef.rightUp;
                                break;
                            case TypeDirection.RIGHT:
                                rangeStr = dataRef.right;
                                break;
                            case TypeDirection.RIGHT_DOWN:
                                rangeStr = dataRef.rightDown;
                                break;
                            case TypeDirection.DOWN:
                                rangeStr = dataRef.down;
                                break;
                            case TypeDirection.LEFT_DOWN:
                                rangeStr = dataRef.leftDown;
                                break;
                            case TypeDirection.LEFT:
                                rangeStr = dataRef.left;
                                break;
                            case TypeDirection.LEFT_UP:
                                rangeStr = dataRef.leftUp;
                                break;
                        }
                    }
                    var startX:number = 0;
                    var startY:number = 0;
                    if(skillRange < 1000) //以技能选中目标为起点的范围
                    {
                        startX = targetX;
                        startY = targetY;
                    }
                    else //以自身为起点的范围
                    {
                        startX = ownerX;
                        startY = ownerY;
                    }
                    var posList:egret.Point[] = this.getPosListByStr(rangeStr);
                    for(var pos of posList)
                    {
                        var posX = startX + pos.x;
                        var posY = startY + pos.y;
                        var list: s.SmartObject[];
                        //if(lockTarget == TypeSkill.LOCK_ENEMY_NEAR || skillRange == TypeSkill.RANGE_SHIELD_DMG)
                        if(TypeSkill.isLockEnemy(lockTarget))
                        {
                            list = this._scene.getEnemyListByPosition(this._body, posX, posY);
                        }
                        else
                        {
                            list = this._scene.getFriendListByPosition(this._body, posX, posY);
                        }
                        targetList = targetList.concat(list);
                    }
                }
            }

            var isContainTarget:boolean = false;
            for(var obj of targetList)
            {
                if(obj == this._target)
                {
                    isContainTarget = true;
                    break;
                }
            }

            //如果不是范围技能或者范围内没找到相应的目标，判断攻击目标是否正确
            if(!isContainTarget)
            {
                //伤害技能或者护盾的目标为非敌方
                //if(lockTarget == TypeSkill.LOCK_ENEMY_NEAR || skillRange == TypeSkill.RANGE_SHIELD_DMG)
                if(TypeSkill.isLockEnemy(lockTarget))
                {
                    if(this._scene.isEnemyObject(this._body, this._target))
                    {
                        targetList.push(this._target);
                    }
                }
                else
                {
                    if(this._scene.isFriendObject(this._body, this._target))
                    {
                        targetList.push(this._target);
                    }
                }
            }
            */
            return targetList;
        };
        SkillBase.prototype.getLockTarget = function () {
            return this._template.lockTarget;
        };
        SkillBase.prototype.getSkillRange = function () {
            if (this._config.skillRange) {
                return this._config.skillRange;
            }
            return this._template.skillRange;
        };
        SkillBase.prototype.getPosListByStr = function (str) {
            var list = [];
            if (str && str != "0") {
                var strs = str.split(";");
                for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
                    var pStr = strs_1[_i];
                    if (!pStr || pStr == "0")
                        continue;
                    var pStrs = pStr.split(",");
                    if (pStrs.length != 2)
                        continue;
                    var p = new egret.Point(Number(pStrs[0]), Number(pStrs[1]));
                    list.push(p);
                }
            }
            return list;
        };
        return SkillBase;
    }());
    s.SkillBase = SkillBase;
    __reflect(SkillBase.prototype, "s.SkillBase", ["utils.IPool"]);
})(s || (s = {}));
