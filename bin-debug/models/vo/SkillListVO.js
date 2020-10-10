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
    var SkillListVO = (function (_super) {
        __extends(SkillListVO, _super);
        function SkillListVO() {
            var _this = _super.call(this) || this;
            _this._skills = [];
            return _this;
        }
        SkillListVO.prototype.initialize = function () {
        };
        SkillListVO.prototype.reset = function () {
            for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                vo.toPool(skillVO);
            }
            this._skills.length = 0;
            if (this._addHandlers) {
                this._addHandlers.clear();
            }
            if (this._removeHandlers) {
                this._removeHandlers.clear();
            }
            if (this._updateHandlers) {
                this._updateHandlers.clear();
            }
        };
        /**添加技能 */
        SkillListVO.prototype.add = function (skillVO) {
            if (this.getVOById(skillVO.id))
                return;
            this._skills.push(skillVO);
            if (this._addHandlers)
                this._addHandlers.runWith(skillVO);
            this.sortHandler();
            return skillVO;
        };
        /**移除天赋 */
        SkillListVO.prototype.remove = function (skillVO) {
            var index = this._skills.indexOf(skillVO);
            if (index >= 0) {
                this._skills.splice(index, 1);
                if (this._removeHandlers)
                    this._removeHandlers.runWith(skillVO);
                this.sortHandler();
                return skillVO;
            }
            return null;
        };
        // /**更新技能*/
        // public updata(skillVO:vo.SkillVO):void{
        //     if(skillVO){
        //        if(this._updateHandlers) this._updateHandlers.runWith(skillVO);
        //     }
        // }
        SkillListVO.prototype.sortHandler = function () {
            this._skills.sort(function (a, b) {
                return a.cd > b.cd ? -1 : 1;
            });
        };
        /**监听天赋列表增加 */
        SkillListVO.prototype.onAdd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._addHandlers) {
                this._addHandlers = new utils.Handlers(false);
            }
            this._addHandlers.add(caller, method, args);
        };
        SkillListVO.prototype.offAdd = function (caller, method) {
            if (this._addHandlers) {
                this._addHandlers.remove(caller, method);
            }
        };
        SkillListVO.prototype.onRemove = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._removeHandlers) {
                this._removeHandlers = new utils.Handlers(false);
            }
            this._removeHandlers.add(caller, method, args);
        };
        SkillListVO.prototype.offRemove = function (caller, method) {
            if (this._removeHandlers) {
                this._removeHandlers.remove(caller, method);
            }
        };
        /**监听某个技能变化 */
        SkillListVO.prototype.onUpdate = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._updateHandlers) {
                this._updateHandlers = new utils.Handlers(false);
            }
            this._updateHandlers.add(caller, method, args);
        };
        SkillListVO.prototype.offUpdate = function (caller, method) {
            if (this._updateHandlers) {
                this._updateHandlers.remove(caller, method);
            }
        };
        /**更新位置 */
        SkillListVO.prototype.updatePos = function (pos, template) {
            var skillVO = this.getVOByPos(pos);
            if (skillVO) {
                skillVO.initialize(template, pos);
                if (this._updateHandlers) {
                    this._updateHandlers.runWith(skillVO);
                }
                return skillVO;
            }
            return null;
        };
        Object.defineProperty(SkillListVO.prototype, "list", {
            /** 获得已激活技能列表*/
            get: function () {
                this._skills.sort(function (a, b) {
                    return a.pos - b.pos;
                });
                return this._skills;
            },
            enumerable: true,
            configurable: true
        });
        SkillListVO.prototype.forEach = function (func, caller) {
            for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                func.call(caller, skillVO);
            }
        };
        /** 获得技能*/
        SkillListVO.prototype.getVO = function (type) {
            for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.type == type)
                    return skillVO;
            }
            return null;
        };
        /** 获得技能*/
        SkillListVO.prototype.getVOByPos = function (pos) {
            for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.pos == pos)
                    return skillVO;
            }
            return null;
        };
        /** 获得技能*/
        SkillListVO.prototype.getVOById = function (id) {
            for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.id == id)
                    return skillVO;
            }
            return null;
        };
        return SkillListVO;
    }(vo.VOBase));
    vo.SkillListVO = SkillListVO;
    __reflect(SkillListVO.prototype, "vo.SkillListVO");
})(vo || (vo = {}));
