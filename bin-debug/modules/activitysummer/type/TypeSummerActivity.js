var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TypeSummerActivity = (function () {
        function TypeSummerActivity() {
        }
        TypeSummerActivity.getName = function (id) {
            switch (id) {
                case TypeSummerActivity.LJDL:
                    return "LJDL";
                case TypeSummerActivity.XYLP:
                    return "XYLP";
                case TypeSummerActivity.MRLC:
                    return "MRLC";
                case TypeSummerActivity.JFSC:
                    return "JFSC";
                case TypeSummerActivity.XGLB:
                    return "XGLB";
                case TypeSummerActivity.HHZP:
                    return "HHZP";
                case TypeSummerActivity.JFPH:
                    return "JFPH";
                case TypeSummerActivity.BOSS:
                    return "BOSS";
                case TypeSummerActivity.SPFL:
                    return "SPFL";
                case TypeSummerActivity.DJZP:
                    return "DJZP";
                case TypeSummerActivity.TASK:
                    return "TASK";
                case TypeSummerActivity.XHPH:
                    return "XHPH";
                case TypeSummerActivity.KFXHPH:
                    return "KFXHPH";
                case TypeSummerActivity.MSZP:
                    return "MSZP";
                case TypeSummerActivity.GQJZ:
                    return "GQJZ";
                case TypeSummerActivity.DJDH:
                    return "DJDH";
                case TypeSummerActivity.SBZZ:
                    return "SBZZ";
                case TypeSummerActivity.LCSL:
                    return "LCSL";
                case TypeSummerActivity.JLSC:
                    return "JLSC";
                case TypeSummerActivity.XYDB:
                    return "XYDB";
                case TypeSummerActivity.SDSBOSS:
                    return "SDSBOSS";
                case TypeSummerActivity.KNLB:
                    return "KNLB";
                case TypeSummerActivity.YDSZ:
                    return "YDSZ";
                case TypeSummerActivity.RYCZ:
                    return "RYCZ";
                case TypeSummerActivity.TJHB:
                    return "TJHB";
            }
        };
        //--------------------------------
        //夏日盛典
        //--------------------------------
        /**累计登录 */
        TypeSummerActivity.LJDL = 101;
        /**幸运伦盘 */
        TypeSummerActivity.XYLP = 901;
        /**夏日累冲 */
        TypeSummerActivity.MRLC = 102;
        /**积分商店 */
        TypeSummerActivity.JFSC = 501;
        /**限购礼包 */
        TypeSummerActivity.XGLB = 201;
        /**豪华转盘*/
        TypeSummerActivity.HHZP = 903;
        /**积分排名*/
        TypeSummerActivity.JFPH = 301;
        /**boos狂欢*/
        TypeSummerActivity.BOSS = 905;
        /**双培返利*/
        TypeSummerActivity.SPFL = 904;
        /**道具转盘*/
        TypeSummerActivity.DJZP = 907;
        /**活动任务*/
        TypeSummerActivity.TASK = 401;
        /**消费排行*/
        TypeSummerActivity.XHPH = 302;
        /**跨服消费排行*/
        TypeSummerActivity.KFXHPH = 303;
        /**元宝转盘*/
        TypeSummerActivity.MSZP = 908;
        /**国庆集字*/
        TypeSummerActivity.GQJZ = 909;
        /**道具兑换*/
        TypeSummerActivity.DJDH = 910;
        /**首冲重置*/
        TypeSummerActivity.SBZZ = 911;
        /**连充送礼*/
        TypeSummerActivity.LCSL = 103;
        /**锦鲤商城*/
        TypeSummerActivity.JLSC = 912;
        /**幸运夺宝*/
        TypeSummerActivity.XYDB = 914;
        /**圣诞树*/
        TypeSummerActivity.SDSBOSS = 991;
        /**跨年礼包*/
        TypeSummerActivity.KNLB = 105;
        /**元旦时装*/
        TypeSummerActivity.YDSZ = 104;
        /**任意充值*/
        TypeSummerActivity.RYCZ = 106;
        /**在线红包*/
        TypeSummerActivity.TJHB = 916;
        return TypeSummerActivity;
    }());
    game.TypeSummerActivity = TypeSummerActivity;
    __reflect(TypeSummerActivity.prototype, "game.TypeSummerActivity");
})(game || (game = {}));
