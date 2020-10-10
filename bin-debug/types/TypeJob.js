var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeJob = (function () {
    function TypeJob() {
    }
    TypeJob.getDefaultClothesAvatar = function (type, sex) {
        if (sex === void 0) { sex = 0; }
        // switch(type){
        // 	case TypeJob.ZHAN:
        // 		return "1100";
        // 	case TypeJob.FA:
        // 		return "1200";
        // 	case TypeJob.YI:
        // 		return "1350";
        // }
        return "1102";
    };
    TypeJob.getDefaultWeaponAvatar = function (type, sex) {
        if (sex === void 0) { sex = 0; }
        // switch(type){
        // 	case TypeJob.ZHAN:
        // 		return "11102";
        // 	case TypeJob.FA:
        // 		return "11202";
        // 	case TypeJob.YI:
        // 		return "11302";
        // }
        return "11102";
    };
    TypeJob.getDefaultSex = function (type) {
        switch (type) {
            case TypeJob.ZHAN: return true;
            case TypeJob.FA: return false;
            case TypeJob.YI: return false;
        }
    };
    TypeJob.getJobName = function (type) {
        switch (type) {
            case TypeJob.POJUN:
                return Language.JOB_POJUN;
            case TypeJob.MOUSHI:
                return Language.JOB_MOUSHI;
            case TypeJob.SHENYU:
                return Language.JOB_SHENYU;
            case TypeJob.FEIJIANG:
                return Language.JOB_FEIJIANG;
            case TypeJob.HUWEI:
                return Language.JOB_HUWEI;
            case TypeJob.YIZHE:
                return Language.JOB_YIZHE;
            case TypeJob.BOSS:
                return "BOSS";
            default:
                return Language.C_QT;
        }
    };
    /** 获得基础模型*/
    TypeJob.getDefaultModelByJobAndGener = function (job, gender) {
        switch (job) {
            case TypeJob.ZHAN: return gender == 1 ? ConfigData.DEFAULT_MODEL_ZHAN_NAN : ConfigData.DEFAULT_MODEL_ZHANSHI_NV;
            case TypeJob.FA: return gender == 1 ? ConfigData.DEFAULT_MODEL_FASHI_NAN : ConfigData.DEFAULT_MODEL_FASHI_NV;
            case TypeJob.YI: return gender == 1 ? ConfigData.DEFAULT_MODEL_YINENG_NAN : ConfigData.DEFAULT_MODEL_YINENG_NV;
            default: return null;
        }
    };
    TypeJob.getXpSkillIcon = function (type) {
        //return Templates.getTemplateById(templates.Map.SKILL,type).icon;
        switch (type) {
            case TypeJob.ZHAN:
                return "uiMain_json.main_xp_zhan";
            case TypeJob.FA:
                return "uiMain_json.main_xp_fa";
            case TypeJob.YI:
                return "uiMain_json.main_xp_yi";
        }
        return "";
    };
    TypeJob.NONE = 0;
    /**战*/
    TypeJob.ZHAN = 1;
    /**法*/
    TypeJob.FA = 2;
    /**异*/
    TypeJob.YI = 3;
    /**破军 */
    TypeJob.POJUN = 1;
    /**谋士 */
    TypeJob.MOUSHI = 2;
    /**神羽 */
    TypeJob.SHENYU = 3;
    /**飞将 */
    TypeJob.FEIJIANG = 4;
    /**虎卫 */
    TypeJob.HUWEI = 5;
    /**医者 */
    TypeJob.YIZHE = 6;
    /**武将*/
    TypeJob.PET = 4;
    /**BOSS*/
    TypeJob.BOSS = 5;
    return TypeJob;
}());
__reflect(TypeJob.prototype, "TypeJob");
