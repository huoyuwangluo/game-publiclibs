var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeEffectId = (function () {
    function TypeEffectId() {
    }
    TypeEffectId.getEffIdByQuality = function (quality) {
        switch (quality) {
            case TypeQuality.GREEN:
                return TypeEffectId.GREEN_EFF;
            case TypeQuality.BLUE:
                return TypeEffectId.BULE_EFF;
            case TypeQuality.PURPLE:
                return TypeEffectId.PURPLE_EFF;
            case TypeQuality.ORANGE:
                return TypeEffectId.ORANGE_EFF;
            case TypeQuality.RED:
                return TypeEffectId.RED_EFF;
            case TypeQuality.GOLDEN:
                return TypeEffectId.GOLDEN_EFF;
        }
        return TypeEffectId.GREEN_EFF;
    };
    TypeEffectId.HECHENG_EFF = "30005"; //合成成功
    TypeEffectId.JIHUO_EFF = "31016"; //激活成功
    TypeEffectId.JINJIE_EFF = "31005"; //进阶成功
    TypeEffectId.JINJIESHIBAI_EFF = "31006"; //进阶失败
    TypeEffectId.LINGQU_EFF = "31007"; //领取成功
    TypeEffectId.SHANGZHEN_EFF = "31008"; //上阵成功
    TypeEffectId.SHENGJI_EFF = "31009"; //升级成功
    TypeEffectId.SHENGJISHIBAI_EFF = "31010"; //升级失败
    TypeEffectId.JINLIAN_EFF = "6070"; //精炼成功
    TypeEffectId.DUANZUO_EFF = "31011"; //锻造火焰
    TypeEffectId.BOOSHEAD_EFF = "31012"; //BOSS头像护盾特效
    TypeEffectId.JINGLIAN_EFF = "6339"; //精炼幸运暴击特效
    TypeEffectId.JIANGXING_EFF = "30007"; //将星特效
    TypeEffectId.PETHECHENG_EFF = "31017"; //武将合成特效
    TypeEffectId.PETUPFIGHT_EFF = "31018"; //武将上阵特效
    TypeEffectId.JIANGXINGJIHUO_EFF = "31022"; //将星可激活特效
    TypeEffectId.JIANGXINGSHENGJI_EFF = "31021"; //将星可升级特效
    TypeEffectId.GREEN_EFF = "31101"; //绿色品质框
    TypeEffectId.BULE_EFF = "31102"; //蓝色品质框
    TypeEffectId.PURPLE_EFF = "31103"; //紫色品质框
    TypeEffectId.ORANGE_EFF = "31104"; //橙色品质框
    TypeEffectId.RED_EFF = "31105"; //红色品质框
    TypeEffectId.GOLDEN_EFF = "31106"; //金色品质框
    TypeEffectId.CHUSHENG_EFF = "32001"; //六道畜生道
    TypeEffectId.TIANDAO_EFF = "32002"; //六道天道
    TypeEffectId.DIYU_EFF = "32003"; //六道地狱道
    TypeEffectId.XIULUO_EFF = "32004"; //六道修罗
    TypeEffectId.EGUI_EFF = "32005"; //六道饿鬼
    TypeEffectId.RENJIAN_EFF = "32006"; //六道人间
    TypeEffectId.BUTTON_EFF_BIG_RED = "31013";
    TypeEffectId.BUTTON_EFF_BIG_YELLO = "31014";
    TypeEffectId.BUTTON_EFF_SAMLL = "31015";
    TypeEffectId.BUTTON_EFF_SAMLL1 = "31023";
    TypeEffectId.BUTTON_EFF_SAMLL2 = "31034";
    TypeEffectId.GONGCHENG_EFF = "6604";
    return TypeEffectId;
}());
__reflect(TypeEffectId.prototype, "TypeEffectId");
