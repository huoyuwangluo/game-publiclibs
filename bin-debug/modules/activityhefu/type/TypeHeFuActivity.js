var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TypeHeFuActivity = (function () {
        function TypeHeFuActivity() {
        }
        //--------------------------------
        /**
         * 合服boss
         * 合服登录
         * 合服兑换
         * 合服翻倍
         * 合服阵营
         * 合服累充
         * 合服连充豪礼
         * 合服vip礼包
         * 合服全民boss
         * 合服特惠
         * 合服消耗返利
         * 合服消耗排行
         * 合服寻宝
         * 合服转盘
         */
        //--------------------------------
        /**合服登录 */
        TypeHeFuActivity.HEFU_DENGLU = 101;
        /**合服累充 */
        TypeHeFuActivity.HEFU_LEICHONG = 102;
        /**合服特惠 */
        TypeHeFuActivity.HEFU_TEHUI = 201;
        /**合服礼包 */
        TypeHeFuActivity.HEFU_LIBAO = 202;
        /**合服翻倍 */
        TypeHeFuActivity.HEFU_FANBEI = 901;
        /**阵营战 */
        TypeHeFuActivity.HEFU_JUNTUAN = 302;
        /**元宝装盘 */
        TypeHeFuActivity.HEFU_MOSHI = 903;
        /**合服boss */
        TypeHeFuActivity.HEFU_BOSS = 904;
        /**合服全民boss */
        TypeHeFuActivity.HEFU_QM_BOSS = 906;
        /**消费返利 */
        TypeHeFuActivity.HEFU_XIAOHAO_FANLI = 103;
        /**消费排行 */
        TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG = 301;
        /**连充豪礼 */
        TypeHeFuActivity.HEFU_LIANCHONG_FANLI = 104;
        /**合服兑换 */
        TypeHeFuActivity.HEFU_DUIHUAN = 907;
        return TypeHeFuActivity;
    }());
    game.TypeHeFuActivity = TypeHeFuActivity;
    __reflect(TypeHeFuActivity.prototype, "game.TypeHeFuActivity");
})(game || (game = {}));
