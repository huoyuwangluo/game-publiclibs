var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeSkillAndTalent = (function () {
    function TypeSkillAndTalent() {
    }
    TypeSkillAndTalent.DEFAULT_TYPE = 0; //默认是所有的天赋天赋类型
    TypeSkillAndTalent.JICHU_SKILL = 1; //基础技能
    TypeSkillAndTalent.TESHU_SKILL = 2; //特殊技能
    TypeSkillAndTalent.ZHONGJI_TALENT = 4; //中级天赋
    TypeSkillAndTalent.GAOJI_TALENT = 5; //高级天赋
    TypeSkillAndTalent.ZHIZUN_TALENT = 6; //至尊天赋
    return TypeSkillAndTalent;
}());
__reflect(TypeSkillAndTalent.prototype, "TypeSkillAndTalent");
