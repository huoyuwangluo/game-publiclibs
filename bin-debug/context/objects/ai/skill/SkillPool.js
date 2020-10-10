var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SkillPool = (function () {
        function SkillPool() {
        }
        SkillPool.fromPool = function (type) {
            var list = SkillPool._pool[type];
            if (list && list.length) {
                var skill = list.shift();
                skill.toPoolTime = 0;
                return skill;
            }
            var skillClass = s.TypeSkill.getClazz(type);
            if (!skillClass)
                return null;
            return new skillClass();
        };
        SkillPool.toPool = function (skill) {
            if (!SkillPool._pool[skill.type]) {
                SkillPool._pool[skill.type] = [];
            }
            var list = SkillPool._pool[skill.type];
            if (list) {
                skill.reset();
                skill.toPoolTime = egret.getTimer();
                list.push(skill);
            }
        };
        SkillPool.destroyExpiredObjects = function (interval) {
            var invailTime = interval - 1000;
            var now = egret.getTimer();
            for (var type in SkillPool._pool) {
                var list = SkillPool._pool[type];
                for (var i = 0; i < list.length; i++) {
                    var skill = list[i];
                    if (skill.toPoolTime > 0 && (now - skill.toPoolTime) > invailTime) {
                        list.splice(i, 1);
                        i--;
                        skill.destory();
                    }
                }
                if (!list.length) {
                    SkillPool._pool[type] = null;
                    delete SkillPool._pool[type];
                }
            }
        };
        SkillPool._pool = {};
        return SkillPool;
    }());
    s.SkillPool = SkillPool;
    __reflect(SkillPool.prototype, "s.SkillPool");
})(s || (s = {}));
