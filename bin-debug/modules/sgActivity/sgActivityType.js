var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var sgActivityType = (function () {
        function sgActivityType() {
        }
        sgActivityType.getIcon = function (type) {
            switch (type) {
                case sgActivityType.ljdl:
                    return "welfareBtnIcon_json.welfare_btn_LJDL";
                case sgActivityType.cjjl:
                    return "welfareBtnIcon_json.welfare_btn_DJLB";
                case sgActivityType.viplb:
                    return "welfareBtnIcon_json.welfare_btn_LJDL";
                case sgActivityType.mrcz:
                    return "welfareBtnIcon_json.welfare_btn_MRCZ";
                case sgActivityType.yyqg:
                    return "welfareBtnIcon_json.welfare_btn_LJDL";
                case sgActivityType.season:
                    return "welfareBtnIcon_json.welfare_btn_Season";
                case sgActivityType.mrlc:
                    return "welfareBtnIcon_json.welfare_btn_MRLC";
                case sgActivityType.zk:
                    return "welfareBtnIcon_json.welfare_btn_ZK";
                case sgActivityType.srdz:
                    return "welfareBtnIcon_json.welfare_btn_SRDZ";
                case sgActivityType.monthCard:
                    return "welfareBtnIcon_json.welfare_btn_YK";
                case sgActivityType.haohuajiangchi:
                    return "welfareBtnIcon_json.welfare_btn_HHJC";
                case sgActivityType.mzth:
                    return "welfareBtnIcon_json.welfare_btn_MZTH";
                case sgActivityType.myth:
                    return "welfareBtnIcon_json.welfare_btn_MYTH";
                case sgActivityType.lchl:
                    return "welfareBtnIcon_json.welfare_btn_LCHL";
                case sgActivityType.activity_103:
                case sgActivityType.activity_303:
                    return "welfareBtnIcon_json.welfare_btn_ACT103";
                case sgActivityType.activity_104:
                case sgActivityType.activity_304:
                    return "welfareBtnIcon_json.welfare_btn_ACT104";
                case sgActivityType.activity_105:
                case sgActivityType.activity_305:
                    return "welfareBtnIcon_json.welfare_btn_ACT105";
                case sgActivityType.activity_106:
                case sgActivityType.activity_306:
                    return "welfareBtnIcon_json.welfare_btn_ACT106";
                case sgActivityType.act1:
                    return "sgActivityLimit_json.btn_limit_801";
                case sgActivityType.act2:
                    return "sgActivityLimit_json.btn_limit_802";
                case sgActivityType.act3:
                    return "sgActivityLimit_json.btn_limit_805";
                case sgActivityType.act4:
                    return "sgActivityLimit_json.btn_limit_851";
                case sgActivityType.act5:
                    return "sgActivityLimit_json.btn_limit_811";
                case sgActivityType.act6:
                case sgActivityType.act7:
                    return "sgActivityLimit_json.btn_limit_411";
            }
        };
        sgActivityType.getName = function (type) {
            switch (type) {
                case sgActivityType.ljdl:
                    return Language.C_LJDL;
                case sgActivityType.cjjl:
                    return Language.C_DJJL;
                case sgActivityType.viplb:
                    return Language.C_VIPG;
                case sgActivityType.mrcz:
                    return Language.C_MRCZ;
                case sgActivityType.yyqg:
                    return Language.C_YYQG;
                case sgActivityType.season:
                    return Language.C_SEASON;
                case sgActivityType.mrlc:
                    return Language.C_MRLC;
                case sgActivityType.zk:
                    return Language.C_ZHOUKA;
                case sgActivityType.srdz:
                    return Language.C_SRDZ;
                case sgActivityType.monthCard:
                    return Language.C_YK;
                case sgActivityType.haohuajiangchi:
                    return Language.C_HHJC;
                case sgActivityType.mzth:
                    return Language.C_MZTH;
                case sgActivityType.myth:
                    return Language.C_MYTH;
                case sgActivityType.lchl:
                    return Language.C_LCHL;
                case sgActivityType.activity_103:
                case sgActivityType.activity_303:
                    return Language.C_HDJJ2;
                case sgActivityType.activity_104:
                case sgActivityType.activity_304:
                    return Language.C_HDJJ4;
                case sgActivityType.activity_105:
                case sgActivityType.activity_305:
                    return Language.C_HDJJ3;
                case sgActivityType.activity_106:
                case sgActivityType.activity_306:
                    return Language.C_HDJJ1;
                case sgActivityType.act1:
                    return Language.J_LIMIT1;
                case sgActivityType.act2:
                    return Language.J_LIMIT2;
                case sgActivityType.act3:
                    return Language.J_LIMIT3;
                case sgActivityType.act4:
                    return Language.J_LIMIT4;
                case sgActivityType.act6:
                case sgActivityType.act7:
                    return Language.J_LIMIT5;
            }
        };
        //--------------------------------
        //三国活动
        //--------------------------------
        /**六十日登录 */
        sgActivityType.ljdl = 101;
        /**冲级奖励 */
        sgActivityType.cjjl = 102;
        /**vip礼包*/
        sgActivityType.viplb = 202;
        /**每日充值 */
        sgActivityType.mrcz = 402;
        /**一元抢购 */
        sgActivityType.yyqg = 403;
        /**每日累充 */
        sgActivityType.mrlc = 115;
        /**私人定制 */
        sgActivityType.srdz = 117;
        /**专属特权 68*/
        sgActivityType.zstq1 = 120;
        /**专属特权 198*/
        sgActivityType.zstq2 = 119;
        /**专属特权 488*/
        sgActivityType.zstq3 = 121;
        /**专属特权 648*/
        sgActivityType.zstq4 = 122;
        /**专属特权 648*/
        sgActivityType.zstq5 = 118;
        /**成长基金*/
        sgActivityType.czjj = 123;
        /**驯服灵兽累计登陆*/
        sgActivityType.xflslog = 124;
        /**驯服灵兽等级奖励*/
        sgActivityType.xflslv = 125;
        /**成长基金 人民币*/
        sgActivityType.czjjrmb = 404;
        /**阵营特惠 */
        sgActivityType.zyth = 441;
        sgActivityType.sc1 = 111;
        sgActivityType.sc2 = 112;
        sgActivityType.sc3 = 113;
        /**战令*/
        sgActivityType.zhanling = 901;
        /**连充豪礼*/
        sgActivityType.lchl = 902;
        /**豪华奖池 */
        sgActivityType.haohuajiangchi = 321;
        /**每周特惠 */
        sgActivityType.mzth = 431;
        /**每月特惠*/
        sgActivityType.myth = 432;
        /**九星特惠（元宝购）*/
        sgActivityType.jxyb = 203;
        /**九星特惠（人民币直购）*/
        sgActivityType.jxrmb = 451;
        /**万将归心（人民币直购）*/
        sgActivityType.wjgxrmb = 461;
        /**退星限购（人民币直购）*/
        sgActivityType.txrmb = 471;
        /**六道特惠（元宝购）*/
        sgActivityType.ldyb = 204;
        /**阵营特惠（元宝购）*/
        sgActivityType.zyyb = 205;
        /**万将归心（元宝购）*/
        sgActivityType.wjgxyb = 206;
        /**退星限购（元宝购）*/
        sgActivityType.txyb = 209;
        /**宠物特惠（元宝购）*/
        sgActivityType.cwyb = 210;
        /**六道特惠（人民币直购）*/
        sgActivityType.ldrmb = 452;
        /**神兵特惠（人民币直购）*/
        sgActivityType.sbrmb = 481;
        /**宠物特惠（人民币直购）*/
        sgActivityType.cwrmb = 491;
        /**周卡 （不属于开服活动，自定义特殊处理）*/
        sgActivityType.zk = 999999;
        /**四季（不属于开服活动，自定义特殊处理） */
        sgActivityType.season = 777777;
        /**月卡（不属于开服活动，自定义特殊处理） */
        sgActivityType.monthCard = 888888;
        /**强征掉落 */
        sgActivityType.qzdl = 903;
        /**强征兑换 */
        sgActivityType.qzdh = 904;
        //    强征竞技达标 103
        sgActivityType.activity_103 = 103;
        //    天梯竞技达标 104
        sgActivityType.activity_104 = 104;
        //    圣旨竞技达标 105
        sgActivityType.activity_105 = 105;
        //    副本竞技达标 106
        sgActivityType.activity_106 = 106;
        //    强征竞技达标排行 303
        sgActivityType.activity_303 = 303;
        //    天梯竞技达标排行 304
        sgActivityType.activity_304 = 304;
        //    圣旨竞技达标排行 305
        sgActivityType.activity_305 = 305;
        //    副本竞技达标排行 306
        sgActivityType.activity_306 = 306;
        /**每周特惠 0元购买 */
        sgActivityType.mzth_0 = 207;
        /**每月特惠 0元购买 */
        sgActivityType.myth_0 = 208;
        /**完成的活动 */
        sgActivityType.act1 = 801;
        /**参与的活动 */
        sgActivityType.act2 = 802;
        /**攒道具的活动 */
        sgActivityType.act3 = 805;
        /**兑换武将的活动 */
        sgActivityType.act4 = 851;
        /**达标的活动 */
        sgActivityType.act5 = 811;
        /**活动元宝购 */
        sgActivityType.act6 = 211;
        /**活动人民币购 */
        sgActivityType.act7 = 411;
        return sgActivityType;
    }());
    game.sgActivityType = sgActivityType;
    __reflect(sgActivityType.prototype, "game.sgActivityType");
})(game || (game = {}));
