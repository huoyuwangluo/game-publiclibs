var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeFunOpen = (function () {
    function TypeFunOpen() {
    }
    TypeFunOpen.getClassNameAndTabIndexById = function (id, className, tabIndex) {
        if (!this._dataName) {
            this._dataName = {};
            /**1级 */
            this._dataName[TypeFunOpen.WUJIANG] = { mainFunName: s.UserfaceName.role, tabIndex: -1 };
            this._dataName[TypeFunOpen.BAOWU] = { mainFunName: s.UserfaceName.baowu, tabIndex: -1 };
            this._dataName[TypeFunOpen.GUANZHI] = { mainFunName: s.UserfaceName.guanzhi, tabIndex: -1 };
            this._dataName[TypeFunOpen.BEIBAO] = { mainFunName: s.UserfaceName.bag, tabIndex: -1 };
            this._dataName[TypeFunOpen.SHENGZHIMAIN] = { mainFunName: s.UserfaceName.shengZhiMain, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGLIEBIAO] = { mainFunName: s.UserfaceName.legionList, tabIndex: -1 };
            this._dataName[TypeFunOpen.PAIHANG] = { mainFunName: s.UserfaceName.rank, tabIndex: -1 };
            this._dataName[TypeFunOpen.VIP] = { mainFunName: s.UserfaceName.vipTeQuan, tabIndex: -1 };
            this._dataName[TypeFunOpen.BAOCANG] = { mainFunName: s.UserfaceName.treasure, tabIndex: -1 };
            this._dataName[TypeFunOpen.SHOP] = { mainFunName: s.UserfaceName.shop, tabIndex: -1 };
            this._dataName[TypeFunOpen.FULI] = { mainFunName: s.UserfaceName.welfare, tabIndex: -1 };
            this._dataName[TypeFunOpen.KAIFUHUODONG] = { mainFunName: s.UserfaceName.sgOpenServer, tabIndex: -1 };
            this._dataName[TypeFunOpen.MEIRIHUODONG] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: -1 };
            this._dataName[TypeFunOpen.SHOUCHONG] = { mainFunName: s.UserfaceName.firstRecharge, tabIndex: -1 };
            this._dataName[TypeFunOpen.HONGYANQIANGGOU] = { mainFunName: s.UserfaceName.oneYuanBuy, tabIndex: -1 };
            this._dataName[TypeFunOpen.YANWUCHANG] = { mainFunName: s.UserfaceName.sports, tabIndex: -1 };
            this._dataName[TypeFunOpen.LILIAN] = { mainFunName: s.UserfaceName.explorePetpagoda, tabIndex: -1 };
            this._dataName[TypeFunOpen.TAOFAI] = { mainFunName: s.UserfaceName.copyboss, tabIndex: -1 };
            this._dataName[TypeFunOpen.FUBEN] = { mainFunName: s.UserfaceName.material, tabIndex: -1 };
            this._dataName[TypeFunOpen.QIANGZHENG] = { mainFunName: s.UserfaceName.qiangzheng, tabIndex: -1 };
            this._dataName[TypeFunOpen.HAOYOU] = { mainFunName: s.UserfaceName.sociality, tabIndex: -1 };
            this._dataName[TypeFunOpen.TUJIAN] = { mainFunName: s.UserfaceName.tujian, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHANGBAN] = { mainFunName: s.UserfaceName.roleFashion, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGRENWU] = { mainFunName: s.UserfaceName.legionTask, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGZHANQI] = { mainFunName: s.UserfaceName.LegionZhenQi, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGBINGZHONG] = { mainFunName: s.UserfaceName.legioncorps, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGSHANGDIAN] = { mainFunName: s.UserfaceName.legionShop, tabIndex: -1 };
            this._dataName[TypeFunOpen.XIANSHIHUODONG] = { mainFunName: s.UserfaceName.exploreAtivities, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENYINGTEHUI] = { mainFunName: s.UserfaceName.legionBuy, tabIndex: -1 };
            this._dataName[TypeFunOpen.YUANZHENG] = { mainFunName: s.UserfaceName.yuanzheng, tabIndex: -1 };
            this._dataName[TypeFunOpen.BINGFENSANLU] = { mainFunName: s.UserfaceName.bingfensanlu, tabIndex: -1 };
            this._dataName[TypeFunOpen.GONGCHENG] = { mainFunName: s.UserfaceName.chapterBossMainView, tabIndex: -1 };
            this._dataName[TypeFunOpen.ZHENGSHOU] = { mainFunName: s.UserfaceName.zhengshou, tabIndex: -1 };
            this._dataName[TypeFunOpen.TUCAO] = { mainFunName: s.UserfaceName.strategy, tabIndex: -1 };
            this._dataName[TypeFunOpen.GONGMING] = { mainFunName: s.UserfaceName.gongming, tabIndex: -1 };
            this._dataName[TypeFunOpen.DAOZAO] = { mainFunName: s.UserfaceName.exploreSmithy, tabIndex: -1 };
            this._dataName[TypeFunOpen.WUJIANGHUISHOU] = { mainFunName: s.UserfaceName.petFenJie, tabIndex: -1 };
            this._dataName[TypeFunOpen.CHANGESHOP] = { mainFunName: s.UserfaceName.changeShop, tabIndex: -1 };
            this._dataName[TypeFunOpen.SANGUOZHENGBA] = { mainFunName: s.UserfaceName.campBattleMain, tabIndex: -1 };
            this._dataName[TypeFunOpen.WUSHUANGZHANCHANG] = { mainFunName: s.UserfaceName.battlefieldMain, tabIndex: -1 };
            this._dataName[TypeFunOpen.WANGZHIJIANGCHANG] = { mainFunName: s.UserfaceName.kingBattle, tabIndex: -1 };
            this._dataName[TypeFunOpen.DIANFENGSAI] = { mainFunName: s.UserfaceName.topBattle, tabIndex: -1 };
            this._dataName[TypeFunOpen.GUOZHAN] = { mainFunName: s.UserfaceName.kingwar, tabIndex: -1 };
            this._dataName[TypeFunOpen.YIZULAIXI] = { mainFunName: s.UserfaceName.monster, tabIndex: -1 };
            this._dataName[TypeFunOpen.SEVENDAY] = { mainFunName: s.UserfaceName.sevenDayTask, tabIndex: -1 };
            this._dataName[TypeFunOpen.ANIMAL] = { mainFunName: s.UserfaceName.animal, tabIndex: -1 };
            this._dataName[TypeFunOpen.LIMIT1] = { mainFunName: s.UserfaceName.activityLimit, tabIndex: -1 };
            this._dataName[TypeFunOpen.LIMIT2] = { mainFunName: s.UserfaceName.activityLimit1, tabIndex: -1 };
            this._dataName[TypeFunOpen.SHARE] = { mainFunName: s.UserfaceName.share, tabIndex: -1 };
            this._dataName[TypeFunOpen.SHARE_FRIEND] = { mainFunName: s.UserfaceName.shareFriend, tabIndex: -1 };
            /**2级 */
            this._dataName[TypeFunOpen.CHENGZHUANG] = { mainFunName: s.UserfaceName.exploreSmithy, tabIndex: 0 };
            this._dataName[TypeFunOpen.TIEJIANGPU] = { mainFunName: s.UserfaceName.exploreSmithy, tabIndex: 1 };
            this._dataName[TypeFunOpen.SHENZHIDUANZAO] = { mainFunName: s.UserfaceName.exploreSmithy, tabIndex: 2 };
            this._dataName[TypeFunOpen.TUJIAN] = { mainFunName: s.UserfaceName.tujian, tabIndex: 0 };
            this._dataName[TypeFunOpen.ALLPETLIST] = { mainFunName: s.UserfaceName.tujian, tabIndex: 1 };
            this._dataName[TypeFunOpen.KUAISUHECHENG] = { mainFunName: s.UserfaceName.tujian, tabIndex: 2 };
            this._dataName[TypeFunOpen.DENGJIZHONGSHENG] = { mainFunName: s.UserfaceName.tujian, tabIndex: 3 };
            this._dataName[TypeFunOpen.XINGJIZHONGSHENG] = { mainFunName: s.UserfaceName.tujian, tabIndex: 4 };
            this._dataName[TypeFunOpen.WUJIANG_0] = { mainFunName: s.UserfaceName.role, tabIndex: 0 };
            this._dataName[TypeFunOpen.WUJIANG_1] = { mainFunName: s.UserfaceName.role, tabIndex: 1 };
            this._dataName[TypeFunOpen.WUJIANG_2] = { mainFunName: s.UserfaceName.role, tabIndex: 2 };
            this._dataName[TypeFunOpen.WUJIANG_3] = { mainFunName: s.UserfaceName.role, tabIndex: 3 };
            this._dataName[TypeFunOpen.BAOWU_2] = { mainFunName: s.UserfaceName.baowu, tabIndex: 0 };
            this._dataName[TypeFunOpen.BAOWU_1] = { mainFunName: s.UserfaceName.baowu, tabIndex: 1 };
            this._dataName[TypeFunOpen.BAOWU_0] = { mainFunName: s.UserfaceName.baowu, tabIndex: 2 };
            this._dataName[TypeFunOpen.BAOWU_3] = { mainFunName: s.UserfaceName.baowu, tabIndex: 3 };
            this._dataName[TypeFunOpen.BEIBAO_0] = { mainFunName: s.UserfaceName.bag, tabIndex: 0 };
            this._dataName[TypeFunOpen.BEIBAO_1] = { mainFunName: s.UserfaceName.bag, tabIndex: 1 };
            this._dataName[TypeFunOpen.BEIBAO_2] = { mainFunName: s.UserfaceName.bag, tabIndex: 2 };
            this._dataName[TypeFunOpen.BEIBAO_3] = { mainFunName: s.UserfaceName.bag, tabIndex: 3 };
            this._dataName[TypeFunOpen.BEIBAO_4] = { mainFunName: s.UserfaceName.bag, tabIndex: 4 };
            this._dataName[TypeFunOpen.YANWUCHANG_0] = { mainFunName: s.UserfaceName.sports, tabIndex: 1 };
            this._dataName[TypeFunOpen.YANWUCHANG_1] = { mainFunName: s.UserfaceName.sports, tabIndex: 0 };
            this._dataName[TypeFunOpen.TAOFAI_0] = { mainFunName: s.UserfaceName.copyboss, tabIndex: 0 };
            this._dataName[TypeFunOpen.TAOFAI_1] = { mainFunName: s.UserfaceName.copyboss, tabIndex: 1 };
            this._dataName[TypeFunOpen.TAOFAI_2] = { mainFunName: s.UserfaceName.copyboss, tabIndex: 2 };
            this._dataName[TypeFunOpen.FUBEN_0] = { mainFunName: s.UserfaceName.material, tabIndex: 0 };
            this._dataName[TypeFunOpen.FUBEN_3] = { mainFunName: s.UserfaceName.material, tabIndex: 1 };
            this._dataName[TypeFunOpen.FUBEN_2] = { mainFunName: s.UserfaceName.material, tabIndex: 2 };
            this._dataName[TypeFunOpen.FUBEN_1] = { mainFunName: s.UserfaceName.material, tabIndex: 3 };
            this._dataName[TypeFunOpen.SHOP_0] = { mainFunName: s.UserfaceName.shop, tabIndex: 0 };
            this._dataName[TypeFunOpen.SHOP_1] = { mainFunName: s.UserfaceName.shop, tabIndex: 1 };
            this._dataName[TypeFunOpen.SHOP_2] = { mainFunName: s.UserfaceName.shop, tabIndex: 3 };
            this._dataName[TypeFunOpen.SHOP_3] = { mainFunName: s.UserfaceName.shop, tabIndex: 4 };
            this._dataName[TypeFunOpen.SHOP_4] = { mainFunName: s.UserfaceName.shop, tabIndex: 2 };
            this._dataName[TypeFunOpen.GUANZHI_0] = { mainFunName: s.UserfaceName.guanzhi, tabIndex: 0 };
            this._dataName[TypeFunOpen.GUANZHI_1] = { mainFunName: s.UserfaceName.guanzhi, tabIndex: 1 };
            this._dataName[TypeFunOpen.VIP_1] = { mainFunName: s.UserfaceName.vipTeQuan, tabIndex: 0 };
            this._dataName[TypeFunOpen.TEHUI_0] = { mainFunName: s.UserfaceName.legionBuy, tabIndex: 0 };
            this._dataName[TypeFunOpen.TEHUI_1] = { mainFunName: s.UserfaceName.legionBuy, tabIndex: 1 };
            this._dataName[TypeFunOpen.TUCAO_0] = { mainFunName: s.UserfaceName.strategy, tabIndex: 0 };
            this._dataName[TypeFunOpen.TUCAO_1] = { mainFunName: s.UserfaceName.strategy, tabIndex: 1 };
            this._dataName[TypeFunOpen.CHANGESHOP_0] = { mainFunName: s.UserfaceName.changeShop, tabIndex: 0 };
            this._dataName[TypeFunOpen.CHANGESHOP_1] = { mainFunName: s.UserfaceName.changeShop, tabIndex: 1 };
            this._dataName[TypeFunOpen.CHANGESHOP_2] = { mainFunName: s.UserfaceName.changeShop, tabIndex: 2 };
            this._dataName[TypeFunOpen.SHENGZHI] = { mainFunName: s.UserfaceName.shengZhiMain, tabIndex: 0 };
            this._dataName[TypeFunOpen.MINGJIANGRENWU] = { mainFunName: s.UserfaceName.shengZhiMain, tabIndex: 1 };
            this._dataName[TypeFunOpen.WANJIANGGUIXIN] = { mainFunName: s.UserfaceName.shengZhiMain, tabIndex: 2 };
            this._dataName[TypeFunOpen.ANIMAL_0] = { mainFunName: s.UserfaceName.animal, tabIndex: 0 };
            this._dataName[TypeFunOpen.ANIMAL_1] = { mainFunName: s.UserfaceName.animal, tabIndex: 1 };
            this._dataName[TypeFunOpen.ANIMAL_2] = { mainFunName: s.UserfaceName.animal, tabIndex: 2 };
            this._dataName[TypeFunOpen.ANIMAL_3] = { mainFunName: s.UserfaceName.animal, tabIndex: 3 };
            /**vip商城暂时屏蔽 */
            // this._dataName[TypeFunOpen.VIP_2] = { mainFunName: s.UserfaceName.vipTeQuan, tabIndex: 2 };
            /**vip特权暂时屏蔽 */
            // this._dataName[TypeFunOpen.VIP_3] = { mainFunName: s.UserfaceName.vipTeQuan, tabIndex: 1 };
            this._dataName[TypeFunOpen.VIP_4] = { mainFunName: s.UserfaceName.vipTeQuan, tabIndex: 1 };
            this._dataName[TypeFunOpen.BAOCANG_0] = { mainFunName: s.UserfaceName.treasure, tabIndex: 0 };
            this._dataName[TypeFunOpen.BAOCANG_1] = { mainFunName: s.UserfaceName.treasure, tabIndex: 1 };
            this._dataName[TypeFunOpen.BAOCANG_2] = { mainFunName: s.UserfaceName.treasure, tabIndex: 2 };
            this._dataName[TypeFunOpen.LILIAN_0] = { mainFunName: s.UserfaceName.explorePetpagoda, tabIndex: 0 };
            this._dataName[TypeFunOpen.LILIAN_1] = { mainFunName: s.UserfaceName.explorePetpagoda, tabIndex: 1 };
            this._dataName[TypeFunOpen.LILIAN_2] = { mainFunName: s.UserfaceName.explorePetpagoda, tabIndex: 2 };
            this._dataName[TypeFunOpen.ZHANGBAN_1] = { mainFunName: s.UserfaceName.roleFashion, tabIndex: 1 };
            this._dataName[TypeFunOpen.ZHANGBAN_2] = { mainFunName: s.UserfaceName.roleFashion, tabIndex: 2 };
            this._dataName[TypeFunOpen.ZHANGBAN_3] = { mainFunName: s.UserfaceName.roleFashion, tabIndex: 3 };
            this._dataName[TypeFunOpen.ZHANGBAN_4] = { mainFunName: s.UserfaceName.roleFashion, tabIndex: 0 };
            /**活动中临时按钮 */
            this._dataName[TypeFunOpen.mrlc] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.mrlc };
            this._dataName[TypeFunOpen.zk] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.zk };
            this._dataName[TypeFunOpen.mrcz] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.mrcz };
            this._dataName[TypeFunOpen.monthCard] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.monthCard };
            this._dataName[TypeFunOpen.lchl] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.lchl };
            this._dataName[TypeFunOpen.mzth] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.mzth };
            this._dataName[TypeFunOpen.myth] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.myth };
            this._dataName[TypeFunOpen.hhjc] = { mainFunName: s.UserfaceName.sgDaily, tabIndex: game.sgActivityType.haohuajiangchi };
            this._dataName[TypeFunOpen.zstq] = { mainFunName: s.UserfaceName.zhuanshuTeQuan, tabIndex: -1 };
            //this._dataName[TypeFunOpen.zrdj] = { mainFunName: s.UserfaceName.sgOpenServer, tabIndex: game.sgActivityType.zrdj };
            //this._dataName[TypeFunOpen.srdz] = { mainFunName: s.UserfaceName.sgOpenServer, tabIndex: game.sgActivityType.srdz };
            //this._dataName[TypeFunOpen.thlb] = { mainFunName: s.UserfaceName.sgOpenServer, tabIndex: game.sgActivityType.thlb };
            /**1个界面两个入口中的额外的入口 */
            this._dataName[TypeFunOpen.TEQUANLIBAO] = { mainFunName: s.UserfaceName.mainTeQuan, tabIndex: -1 };
            this._dataName[TypeFunOpen.GONGXUN] = { mainFunName: s.UserfaceName.mainGongxunShop, tabIndex: -1 };
        }
        if (id) {
            return this._dataName[id] ? this._dataName[id] : null;
        }
        else {
            for (var key in this._dataName) {
                if (this._dataName[key].mainFunName == className && this._dataName[key].tabIndex == tabIndex) {
                    return key;
                }
            }
            return null;
        }
    };
    TypeFunOpen.checkFuncOpenById = function (id) {
        logger.log("根据id进行功能跳转:", id);
        var openModel = !!game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS);
        if (openModel) {
            return true;
        }
        var funcVO = GameModels.funcs.getConfig(id);
        if (funcVO) {
            if (funcVO.openDay2) {
                if (GameModels.user.myConfigLevel >= funcVO.openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay >= funcVO.openDay2)) {
                    return true;
                }
                else {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JQKF2KFGN1, funcVO.openLv, funcVO.openDay2), 0xff0000);
                }
            }
            else {
                if (GameModels.user.myConfigLevel >= funcVO.openLv && (GameModels.serverTime && GameModels.serverTime.kaifuDay >= funcVO.openDay)) {
                    return true;
                }
                else {
                    if (funcVO.openDay) {
                        mg.alertManager.tip(Language.getExpression(Language.E_1JQKF2KFGN, funcVO.openLv, funcVO.openDay), 0xff0000);
                    }
                    else {
                        mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, funcVO.openLv), 0xff0000);
                    }
                }
            }
        }
        return false;
    };
    TypeFunOpen.checkFuncOpen = function (view, index, showTip) {
        if (index === void 0) { index = -1; }
        if (showTip === void 0) { showTip = false; }
        var openModel = !!game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS);
        if (openModel) {
            return true;
        }
        var name = (typeof view == "string") ? view : mg.uiManager.getStructerName(view);
        if (!this.isOpen(name, index)) {
            if (showTip) {
                var data = this.getClassNameAndTabIndexById(0, name, index);
                if (!data)
                    return true;
                var funcVO = GameModels.funcs.getConfig(data);
                var str = this.checkOpenType(funcVO);
                if (str) {
                    mg.alertManager.tip(str, 0xff0000);
                }
            }
            return false;
        }
        return true;
    };
    TypeFunOpen.checkOpenType = function (funcVO) {
        if (funcVO.openDay2) {
            if (GameModels.user.myConfigLevel < funcVO.openLv && (GameModels.serverTime && GameModels.serverTime.kaifuDay < funcVO.openDay2)) {
                return Language.getExpression(Language.E_1JQKF2KFGN1, funcVO.openLv, funcVO.openDay2);
            }
        }
        else {
            if (GameModels.user.myConfigLevel < funcVO.openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay < funcVO.openDay)) {
                if (funcVO.openDay) {
                    return Language.getExpression(Language.E_1JQKF2KFGN, funcVO.openLv, funcVO.openDay);
                }
                else {
                    return Language.getExpression(Language.E_1JKFGN, funcVO.openLv);
                }
            }
        }
        return "";
    };
    /**根据类名和页签判断是否开放 */
    TypeFunOpen.isOpen = function (className, tabIndex) {
        if (tabIndex === void 0) { tabIndex = -1; }
        var openModel = !!game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS);
        if (openModel) {
            return true;
        }
        var data = this.getClassNameAndTabIndexById(0, className, tabIndex);
        if (!data)
            return true;
        var funcVO = GameModels.funcs.getConfig(data);
        if (funcVO && data > 1000) {
            funcVO = GameModels.funcs.getConfig(funcVO.link);
        }
        if (!funcVO)
            return true;
        if (funcVO.openDay2) {
            if (GameModels.user.myConfigLevel >= funcVO.openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay >= funcVO.openDay2)) {
                return true;
            }
        }
        else {
            if (GameModels.user.myConfigLevel >= funcVO.openLv && (GameModels.serverTime && GameModels.serverTime.kaifuDay >= funcVO.openDay)) {
                return true;
            }
        }
        return false;
    };
    TypeFunOpen.checkIsOpenByFunId = function (id) {
        var openModel = !!game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS);
        if (openModel) {
            return true;
        }
        var funcVO = GameModels.funcs.getConfig(id);
        if (!vo)
            return true;
        if (funcVO.openDay2) {
            if (GameModels.user.myConfigLevel < funcVO.openLv && (GameModels.serverTime && GameModels.serverTime.kaifuDay < funcVO.openDay2)) {
                return false;
            }
        }
        else {
            if (GameModels.user.myConfigLevel < funcVO.openLv || (GameModels.serverTime && GameModels.serverTime.kaifuDay < funcVO.openDay)) {
                return false;
            }
        }
        return true;
    };
    /**1级 */
    TypeFunOpen.WUJIANG = 101; //武将 s.UserfaceName.role
    TypeFunOpen.BAOWU = 102; //宝物 s.UserfaceName.baowu
    TypeFunOpen.BEIBAO = 104; //背包 s.UserfaceName.bag
    TypeFunOpen.SHENGZHI = 105; //圣旨 s.UserfaceName.shengzhi
    TypeFunOpen.ZHENYINGLIEBIAO = 106; //阵营 s.UserfaceName.legionList
    TypeFunOpen.PAIHANG = 107; //排行榜 s.UserfaceName.rank
    TypeFunOpen.VIP = 108; //VIP  s.UserfaceName.vipTeQuan
    TypeFunOpen.BAOCANG = 109; //宝藏  s.UserfaceName.treasure
    TypeFunOpen.SHOP = 110; //功勋兑换  s.UserfaceName.shop
    TypeFunOpen.FULI = 111; //福利  s.UserfaceName.welfare
    TypeFunOpen.DAOZAO = 113; //打造  s.UserfaceName.exploreSmithy
    TypeFunOpen.KAIFUHUODONG = 114; //开服活动  s.UserfaceName.sgOpenServer
    TypeFunOpen.MEIRIHUODONG = 115; //每日活动  s.UserfaceName.sgDaily
    TypeFunOpen.SHOUCHONG = 116; //首充  s.UserfaceName.firstRecharge
    TypeFunOpen.HONGYANQIANGGOU = 117; //红颜抢购  s.UserfaceName.oneYuanBuy;
    TypeFunOpen.YANWUCHANG = 118; //演武场  s.UserfaceName.sports
    TypeFunOpen.LILIAN = 120; //历练  s.UserfaceName.explorePetpagoda
    TypeFunOpen.TAOFAI = 121; //讨伐  s.UserfaceName.copyboss
    TypeFunOpen.FUBEN = 122; //副本  s.UserfaceName.material
    TypeFunOpen.TIEJIANGPU = 123; //打造-铁匠铺  
    TypeFunOpen.WANGZHIJIANGCHANG = 124; //副本活动  副本活动-王之疆场 
    TypeFunOpen.QIANGZHENG = 125; //强征  s.UserfaceName.qiangzheng
    TypeFunOpen.HAOYOU = 126; //好友  s.UserfaceName.sociality
    TypeFunOpen.TUJIAN = 127; //图签  s.UserfaceName.tujian 
    TypeFunOpen.ZHANGBAN = 128; //装扮  s.UserfaceName.roleFashion
    TypeFunOpen.WUJIANGHUISHOU = 129; //武将分解  
    TypeFunOpen.CHENGZHUANG = 130; //打造-橙装
    TypeFunOpen.ZHENYINGRENWU = 131; //阵营任务  s.UserfaceName.legionTask  
    TypeFunOpen.ZHENYINGZHANQI = 133; //阵营战旗  s.UserfaceName.LegionZhenQi 
    TypeFunOpen.ZHENYINGBINGZHONG = 134; //阵营兵种  s.UserfaceName.legioncorps 
    TypeFunOpen.ZHENYINGSHANGDIAN = 136; //阵营商店  s.UserfaceName.legionShop 
    TypeFunOpen.WUSHUANGZHANCHANG = 137; //无双战场  s.UserfaceName.battlefieldMain 
    TypeFunOpen.SANGUOZHENGBA = 138; //三国争霸  s.UserfaceName.campBattleMain
    TypeFunOpen.GONGCHENG = 139; //攻城  s.UserfaceName.chapterBossMainView 
    TypeFunOpen.ZHENGSHOU = 140; //征收  s.UserfaceName.zhengshou 
    TypeFunOpen.GUANZHI = 142; //文官 s.UserfaceName.guanzhi
    TypeFunOpen.XINGJIZHONGSHENG = 143; //星级重生
    TypeFunOpen.KUAISUHECHENG = 144; //快速合成 
    TypeFunOpen.ZHENYINGTEHUI = 145; //阵营特惠  s.UserfaceName.legionBuy 
    TypeFunOpen.YUANZHENG = 146; //名将远征  s.UserfaceName.yuanzheng 
    TypeFunOpen.TUCAO = 147; //我要吐槽  s.UserfaceName.strategy 
    TypeFunOpen.GONGMING = 148; //聚义堂 s.UserfaceName.gongming 
    TypeFunOpen.BINGFENSANLU = 149; //聚义堂 s.UserfaceName.bingfensanlu 
    TypeFunOpen.ALLPETLIST = 150; //武将总览 s.UserfaceName.allPetList 
    TypeFunOpen.DENGJIZHONGSHENG = 151; //等级重生 
    TypeFunOpen.XIANSHIHUODONG = 152; //限时活动 s.UserfaceName.exploreAtivities
    TypeFunOpen.CHANGESHOP = 153; //兑换商店 s.UserfaceName.changeShop
    TypeFunOpen.SHENGZHIMAIN = 154; //兑换商店 s.UserfaceName.shengZhiMain
    TypeFunOpen.GUOZHAN = 157; //王者争霸 s.UserfaceName.kingwar
    TypeFunOpen.YIZULAIXI = 158; //异族来袭 s.UserfaceName.monster
    TypeFunOpen.SEVENDAY = 159; //七日目标 s.UserfaceName.sevenDayTask
    TypeFunOpen.SHENZHIDUANZAO = 160; //神之锻造
    TypeFunOpen.ANIMAL = 162; //宠物
    TypeFunOpen.LIMIT1 = 163; //宠物 s.UserfaceName.activityLimit
    TypeFunOpen.LIMIT2 = 164; //宠物 s.UserfaceName.activityLimit1
    TypeFunOpen.SHARE = 165; //分享 s.UserfaceName.sahre
    /**2级 */
    TypeFunOpen.WUJIANG_0 = 201; //武将-装备  
    TypeFunOpen.WUJIANG_1 = 202; //武将-升星 
    TypeFunOpen.WUJIANG_2 = 203; //武将-九星  
    TypeFunOpen.WUJIANG_3 = 204; //武将-六道 
    TypeFunOpen.BAOWU_0 = 205; //宝物-坐骑  
    TypeFunOpen.BAOWU_1 = 206; //宝物-翅膀 
    TypeFunOpen.BAOWU_2 = 207; //宝物-红颜  
    TypeFunOpen.BAOWU_3 = 208; //宝物-神兵   
    TypeFunOpen.BEIBAO_0 = 209; //背包-装备  
    TypeFunOpen.BEIBAO_1 = 210; //背包-道具
    TypeFunOpen.BEIBAO_2 = 211; //背包-武将碎片  
    TypeFunOpen.BEIBAO_3 = 212; //背包-兵法   
    TypeFunOpen.BEIBAO_4 = 213; //背包-合成
    TypeFunOpen.YANWUCHANG_0 = 214; //演武场-演武   
    TypeFunOpen.YANWUCHANG_1 = 215; //演武场-竞技
    TypeFunOpen.TAOFAI_0 = 216; //讨伐-武将讨伐  
    TypeFunOpen.TAOFAI_1 = 217; //讨伐-群雄逐鹿
    TypeFunOpen.TAOFAI_2 = 218; //讨伐-阵营征伐
    TypeFunOpen.FUBEN_0 = 219; //副本-经验副本 
    TypeFunOpen.FUBEN_1 = 220; //副本-战骑副本
    TypeFunOpen.FUBEN_2 = 221; //副本-兵法副本
    TypeFunOpen.FUBEN_3 = 222; //副本-羽毛副本
    TypeFunOpen.SHOP_0 = 224; //商城-元宝商城
    TypeFunOpen.SHOP_1 = 225; //商城-功勋商城
    TypeFunOpen.SHOP_2 = 240; //商城-观星商城
    TypeFunOpen.SHOP_3 = 241; //商城-名将商城
    TypeFunOpen.SHOP_4 = 243; //商城-神兵商城
    TypeFunOpen.CHANGESHOP_0 = 248; //兑换商城-讨伐商城
    TypeFunOpen.CHANGESHOP_1 = 249; //兑换商城-天梯商城
    TypeFunOpen.CHANGESHOP_2 = 250; //兑换商城-远征商城
    TypeFunOpen.WANJIANGGUIXIN = 155; //万将归心
    TypeFunOpen.DIANFENGSAI = 156; //巅峰赛
    TypeFunOpen.VIP_1 = 227; //VIP-VIP限购
    //public static VIP_2: number = 228;  //VIP-VIP商城
    // public static VIP_3: number = 229;  //VIP-VIP兑换
    TypeFunOpen.VIP_4 = 230; //VIP-特权礼包
    TypeFunOpen.BAOCANG_0 = 119; //宝藏——酒馆  
    TypeFunOpen.BAOCANG_1 = 239; //宝藏——将星起源 
    TypeFunOpen.BAOCANG_2 = 231; //宝藏——观星 
    TypeFunOpen.LILIAN_0 = 242; //历练——武魂塔
    TypeFunOpen.LILIAN_1 = 232; //历练——武神塔  
    TypeFunOpen.LILIAN_2 = 233; //历练——试练塔
    TypeFunOpen.ZHANGBAN_1 = 235; //历练——服装  
    TypeFunOpen.ZHANGBAN_2 = 236; //历练——光环 
    TypeFunOpen.ZHANGBAN_3 = 237; //历练——称号 
    TypeFunOpen.ZHANGBAN_4 = 238; //历练——武器
    TypeFunOpen.GUANZHI_0 = 103; //文官 
    TypeFunOpen.GUANZHI_1 = 132; //阵营武官
    TypeFunOpen.TEHUI_0 = 244; //阵营礼包
    TypeFunOpen.TEHUI_1 = 245; //领取福利
    TypeFunOpen.TUCAO_0 = 246; //我要吐槽
    TypeFunOpen.TUCAO_1 = 247; //秘典
    TypeFunOpen.WANJIANGXIANGOU = 251; //万将限购
    TypeFunOpen.MINGJIANGRENWU = 252; //名将任务
    TypeFunOpen.ANIMAL_0 = 254; //宠物
    TypeFunOpen.ANIMAL_1 = 255; //灵狐仙子
    TypeFunOpen.ANIMAL_2 = 256; //宠物森林
    TypeFunOpen.ANIMAL_3 = 257; //放生
    TypeFunOpen.CHONGWU_XIANGOU = 258; //宠物限购
    TypeFunOpen.SHARE_FRIEND = 259; //招募战友
    /**活动中按钮 */
    TypeFunOpen.mrlc = 901; //每日活动-每日累充 
    TypeFunOpen.zk = 902; //每日活动-周卡
    TypeFunOpen.mrcz = 903; //每日活动-每日充值
    TypeFunOpen.monthCard = 904; //每日活动-月卡
    // public static zrdj: number = 908;//开服活动-阵容大奖
    // public static srdz: number = 909;//开服活动-私人定制
    // public static thlb: number = 910;//开服活动-特惠礼包
    TypeFunOpen.lchl = 911; //连充豪礼
    TypeFunOpen.mzth = 912; //每周特惠
    TypeFunOpen.myth = 913; //每月特惠
    TypeFunOpen.zstq = 914; //专属特权
    TypeFunOpen.hhjc = 914; //豪华奖池
    /**1个界面两个入口中的额外的入口 */
    TypeFunOpen.TEQUANLIBAO = 1001; //特权礼包  s.UserfaceName.mainTeQuan
    TypeFunOpen.GONGXUN = 1002; //功勋商城  s.UserfaceName.gongxunShop
    return TypeFunOpen;
}());
__reflect(TypeFunOpen.prototype, "TypeFunOpen");
