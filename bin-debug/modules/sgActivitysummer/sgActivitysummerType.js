var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var sgActivitysummerType = (function () {
        function sgActivitysummerType() {
        }
        sgActivitysummerType.getIcon = function (type) {
            switch (type) {
                case sgActivitysummerType.ljdl:
                    return "btn_sgSummer_qitianle";
                case sgActivitysummerType.xglb:
                    return "btn_sgSummer_xinniantehui";
                case sgActivitysummerType.zglb:
                    return "btn_sgSummer_xinniantehui";
                case sgActivitysummerType.szkh:
                    return "btn_sgSummer_butongtongqing";
            }
        };
        sgActivitysummerType.getName = function (type) {
            switch (type) {
                case sgActivitysummerType.ljdl:
                    return Language.C_QTDL;
                case sgActivitysummerType.xglb:
                    return Language.C_XGLB1;
                case sgActivitysummerType.zglb:
                    return Language.C_XGLB1;
                case sgActivitysummerType.szkh:
                    return Language.C_LDZGR;
            }
        };
        //--------------------------------
        //三国节日活动
        //--------------------------------
        /**限购礼包 */
        sgActivitysummerType.xglb = 201;
        /**累计登录 */
        sgActivitysummerType.ljdl = 101;
        /**圣旨狂欢 */
        sgActivitysummerType.szkh = 905;
        /**直购礼包 */
        sgActivitysummerType.zglb = 601;
        return sgActivitysummerType;
    }());
    game.sgActivitysummerType = sgActivitysummerType;
    __reflect(sgActivitysummerType.prototype, "game.sgActivitysummerType");
})(game || (game = {}));
