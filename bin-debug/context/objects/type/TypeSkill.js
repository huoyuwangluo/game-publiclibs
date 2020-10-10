var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var TypeSkill = (function () {
        function TypeSkill() {
        }
        /**
         * 大招延迟时间
         */
        //public static TYPE_SKILL_NORMAL_DELAY = 400;
        //public static TYPE_SKILL_BIG_DELAY = 1200;
        //public static TYPE_SKILL_CAMP_DELAY = 1500;
        TypeSkill.getTypeSkillNormalDelay = function () {
            if (GameModels.user.player.battleSpeedRate == 2) {
                return 200;
            }
            return 400;
        };
        TypeSkill.getTypeSkillBigDelay = function () {
            if (GameModels.user.player.battleSpeedRate == 2) {
                return 600;
            }
            return 1200;
        };
        TypeSkill.getTypeSkillCampDelay = function () {
            if (GameModels.user.player.battleSpeedRate == 2) {
                return 800;
            }
            return 1500;
        };
        TypeSkill.isBigSkill = function (type) {
            return (type == TypeSkill.TYPE_SKILL_BIG);
        };
        TypeSkill.isCampSkill = function (type) {
            return (type == TypeSkill.TYPE_SKILL_CAMP);
        };
        TypeSkill.isNormalSkill = function (type) {
            return (type == TypeSkill.TYPE_SKILL_NORMAL);
        };
        TypeSkill.isTriggerSkill = function (type) {
            return (type == TypeSkill.TYPE_SKILL_TRIGGER);
        };
        TypeSkill.isLockEnemy = function (lockType) {
            return (lockType == TypeSkill.LOCK_ENEMY_NEAR || lockType == TypeSkill.LOCK_ENEMY_LEADER || lockType == TypeSkill.LOCK_ENEMY_HPLESS || lockType == TypeSkill.LOCK_ENEMY_HPMORE
                || lockType == TypeSkill.LOCK_ENEMY_FAR || lockType == TypeSkill.LOCK_ENEMY_ATTMORE || lockType == TypeSkill.LOCK_ENEMY_DEFLESS);
        };
        TypeSkill.isLockFriend = function (lockType) {
            return (lockType == TypeSkill.LOCK_FRIEND_NEAR || lockType == TypeSkill.LOCK_FRIEND_PLAYER || lockType == TypeSkill.LOCK_FRIEND_SELF || lockType == TypeSkill.LOCK_FRIEND_HPLESS);
        };
        TypeSkill.getClazz = function (effectType) {
            switch (effectType) {
                case TypeSkill.C_FeiXing: return s.CFeiXing;
                case TypeSkill.C_ShunFa: return s.CShunFa;
                case TypeSkill.C_ShunFaDirect: return s.CShunFaDirect;
                case TypeSkill.C_ShunFaResDirect: return s.CShunFaResDirect;
                case TypeSkill.C_ShunFaSelf: return s.CShunFaSelf;
                case TypeSkill.Z_XP1: return s.ZXP1;
                case TypeSkill.Z_XP2: return s.ZXP2;
                case TypeSkill.Z_XP3: return s.ZXP3;
                case TypeSkill.Z_XP4: return s.ZXP4;
                case TypeSkill.Z_XP5: return s.ZXP5;
                case TypeSkill.Z_ZJ: return s.ZZhongKan;
                case TypeSkill.Z_ZH: return s.ZChongFen;
                case TypeSkill.Z_FTLZ: return s.ZXuanFengZhan;
                case TypeSkill.Z_SLJS: return s.ZShenLongJiangShi;
            }
            return s.CShunFa;
        };
        TypeSkill.getData = function (type) {
            if (!this._data) {
                this._data = {};
                //武将技能
                this._data[TypeSkill.C_FeiXing] = {
                    action: TypeAction.ATTACK0,
                    cd: 500, rockbefore: 200, rockafter: 300, continue: 800, distanceTile: 6
                };
                this._data[TypeSkill.C_ShunFa] = {
                    action: TypeAction.ATTACK0,
                    cd: 500, rockbefore: 300, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.C_ShunFaSelf] = {
                    action: TypeAction.ATTACK0,
                    cd: 500, rockbefore: 300, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.C_ShunFaDirect] = {
                    action: TypeAction.ATTACK0,
                    cd: 500, rockbefore: 300, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.Z_XP1] = {
                    action: TypeAction.ATTACK6,
                    cd: 500, rockbefore: 300, rockafter: 200, continue: 1000, distanceTile: 3
                };
                this._data[TypeSkill.Z_XP2] = {
                    action: TypeAction.ATTACK6,
                    cd: 500, rockbefore: 200, rockafter: 200, continue: 1000, distanceTile: 3
                };
                this._data[TypeSkill.Z_XP3] = {
                    action: TypeAction.ATTACK6,
                    cd: 500, rockbefore: 200, rockafter: 200, continue: 1000, distanceTile: 3
                };
                this._data[TypeSkill.Z_XP4] = {
                    action: TypeAction.ATTACK10,
                    cd: 500, rockbefore: 200, rockafter: 200, continue: 1000, distanceTile: 3
                };
                this._data[TypeSkill.Z_XP5] = {
                    action: TypeAction.ATTACK6,
                    cd: 500, rockbefore: 200, rockafter: 200, continue: 1000, distanceTile: 3
                };
                this._data[TypeSkill.Z_ZJ] = {
                    action: TypeAction.ATTACK0,
                    cd: 500, rockbefore: 100, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.Z_FTLZ] = {
                    action: TypeAction.ATTACK10,
                    cd: 5000, rockbefore: 100, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.Z_ZH] = {
                    action: TypeAction.ATTACK1,
                    cd: 2000, rockbefore: 100, rockafter: 200, continue: 800, distanceTile: 2
                };
                this._data[TypeSkill.Z_SLJS] = {
                    action: TypeAction.ATTACK10,
                    cd: 1000, rockbefore: 200, rockafter: 200, continue: 800, distanceTile: 2
                };
            }
            if (this._data[type] == null)
                return this._data[TypeSkill.C_ShunFa];
            return this._data[type];
        };
        TypeSkill.getXpSoundName = function (job) {
            switch (job) {
                case TypeJob.ZHAN: return 'XP_jianqizhan_man';
                case TypeJob.FA: return 'XP_pilihuo_woman';
                case TypeJob.YI: return 'XP_huanwuxiangkong_woman';
            }
            return null;
        };
        /**通用-飞行**/
        TypeSkill.C_FeiXing = 1;
        /**通用-目标瞬发**/
        TypeSkill.C_ShunFa = 2;
        /**通用-目标瞬发带方向**/
        TypeSkill.C_ShunFaDirect = 3;
        /**通用-两方向技能特效(刀光);特效以自己为起点**/
        TypeSkill.C_ShunFaResDirect = 4;
        /**通用-目标瞬发;特效以自己为起点**/
        TypeSkill.C_ShunFaSelf = 5;
        //以下是主角技能，需要特殊处理
        /**无双-赤焰枪法**/
        TypeSkill.Z_XP1 = 101;
        /**无双-爆裂疾风**/
        TypeSkill.Z_XP2 = 102;
        /**无双-回天之术**/
        TypeSkill.Z_XP3 = 103;
        /**无双-岩盾逆袭**/
        TypeSkill.Z_XP4 = 104;
        /**无双-幻影惊雷**/
        TypeSkill.Z_XP5 = 105;
        /**斩击-普攻**/
        TypeSkill.Z_ZJ = 111;
        /**斩魂-冲锋**/
        TypeSkill.Z_ZH = 112;
        /**旋斩**/
        TypeSkill.Z_FTLZ = 113;
        /**坐骑-神龙降世特殊技能表现**/
        TypeSkill.Z_SLJS = 121;
        TypeSkill.CONMON_CD = 300;
        /**
         * 技能类型
         * skillType
         */
        TypeSkill.TYPE_SKILL_NORMAL = 0; //普通攻击
        TypeSkill.TYPE_SKILL_SMALL = 1; //小技能	
        TypeSkill.TYPE_SKILL_BIG = 2; //无双大技能	
        TypeSkill.TYPE_SKILL_TRIGGER = 3; //触发技能
        TypeSkill.TYPE_SKILL_SPECIAL = 4; //特色小技能
        TypeSkill.TYPE_SKILL_PERCENTPRO = 6; //比率属性	包含基础比例值和高级属性值
        TypeSkill.TYPE_SKILL_HALOPRO = 7; //光环属性	与比率一样定义
        TypeSkill.TYPE_SKILL_COMBO = 9; //9	技能组合	
        TypeSkill.TYPE_SKILL_CAMP = 10; //阵营大招技能	
        /**
         * 特殊技能的范围枚举
         */
        TypeSkill.RANGE_SELF_ALL = 10001; //已方全体范围
        TypeSkill.RANGE_FORWARD_ATTACK = 10002; //战士冲锋特殊使用
        TypeSkill.RANGE_SHIELD_DMG = 12222; //盾+伤害范围专用
        /**
         * 技能锁定方式
         */
        TypeSkill.LOCK_ENEMY_NEAR = 1; //锁定最近敌方
        TypeSkill.LOCK_FRIEND_NEAR = 2; //锁定最近已方
        TypeSkill.LOCK_FRIEND_PLAYER = 3; //锁定已方主角
        TypeSkill.LOCK_FRIEND_SELF = 4; //锁定自己
        TypeSkill.LOCK_FRIEND_HPLESS = 5; //锁定已方血最少
        TypeSkill.LOCK_ENEMY_LEADER = 6; //锁定敌方队长
        TypeSkill.LOCK_ENEMY_HPLESS = 7; //锁定敌方血最少
        TypeSkill.LOCK_ENEMY_HPMORE = 8; //锁定敌方血最多
        TypeSkill.LOCK_ENEMY_FAR = 9; //锁定最远敌方
        TypeSkill.LOCK_ENEMY_ATTMORE = 10; //敌方攻最高
        TypeSkill.LOCK_ENEMY_DEFLESS = 11; //敌方防最低
        return TypeSkill;
    }());
    s.TypeSkill = TypeSkill;
    __reflect(TypeSkill.prototype, "s.TypeSkill");
})(s || (s = {}));
