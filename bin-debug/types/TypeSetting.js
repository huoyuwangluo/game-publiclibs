var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeSetting = (function () {
    function TypeSetting() {
    }
    /**声音开关*/
    TypeSetting.SOUND_ENABLED = "soundEnabled";
    // /**屏蔽其他武将*/
    // public static SHIELD_PET: string = "shieldPet";
    /**高频渲染*/
    TypeSetting.HIGHT_RENDER = "hightRender";
    // /**走动释放Xp*/
    // public static AUTO_XP:string="autoXp";
    /**是否已点击XP开关*/
    TypeSetting.CLICK_AUTO_XP = "clickAutoXp";
    /**是否已点击自动合体开关*/
    TypeSetting.CLICK_AUTO_MERGE = "clickautoMerge";
    /**是否已点击自动援军开关*/
    TypeSetting.CLICK_AUTO_YUANJUN = "clickautoYuanJun";
    /**是否点击过福利里面的Vip贵宾按钮*/
    TypeSetting.IS_CLICK_VIP = "clickVip";
    /**开启充值*/
    TypeSetting.OPEN_RECHAGE = "openRechange";
    /**开启所有功能*/
    TypeSetting.OPEN_MODELS = "openModels";
    /**红颜第一个升级战力达到1000是否打开一元抢购*/
    TypeSetting.ONEYUANQIANGGOU = "JIANGXINGBANG";
    /**第一次进入无双战场*/
    TypeSetting.ENTER_LEGION_WAR = "ENTER_LEGION_WAR";
    /**酒馆招募的当前势力 */
    TypeSetting.SMOKEPET_ID = "SMOKEPET_ID";
    /**阵型技能 1为手动 2为自动*/
    TypeSetting.AUTO_PLAY_SKILL = "AUTO_PLAY_SKILL";
    /**阵型技能 点击过自动*/
    TypeSetting.CLICK_AUTO_SKILL = "CLICK_AUTO_SKILL";
    /**第一次领取vip福利  */
    TypeSetting.VIP_FULI = "VIP_FULI";
    /**没有首冲6元过的玩家首次强征弹出首冲界面 */
    TypeSetting.SHOWVIEW_1 = "SHOWVIEW_1";
    /**首冲6元过但是没有首冲100元的玩家首次高级10连抽弹出首冲界面 */
    TypeSetting.SHOWVIEW_2 = "SHOWVIEW_2";
    /**vip1的玩家，首次强征弹出每日充值界面  */
    TypeSetting.SHOWVIEW_3 = "SHOWVIEW_3";
    return TypeSetting;
}());
__reflect(TypeSetting.prototype, "TypeSetting");
