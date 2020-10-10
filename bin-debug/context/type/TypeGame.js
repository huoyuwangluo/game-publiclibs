var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeGame = (function () {
    function TypeGame() {
    }
    /**是否需要直接A*寻路 */
    TypeGame.isNeedAStarFind = function (gameType) {
        switch (gameType) {
            case TypeGame.MATERIAL:
            case TypeGame.DOOR_BOSS:
            case TypeGame.HONGYAN_BOSS:
            case TypeGame.MATERIAL_PHAMTOM:
            case TypeGame.TEAM_COPY_FIGHT:
            //case TypeGame.EVERYONE_BOSS:
            //case TypeGame.EVERYONE_BOSS_GUIDE:
            //case TypeGame.LOSE_BOSS:
            //case TypeGame.DEMON_INTRUSION:
            //case TypeGame.HOLIDAY_BOSS:
            //case TypeGame.FAMILY_BOSS:
            //case TypeGame.GOD_DOMAIN:
            //case TypeGame.COPY_BOSS_FANTASY:
            //case TypeGame.GOD_DIE:
            //case TypeGame.WOORS_BOSS:
            //case TypeGame.DEATH_BOSS:
            case TypeGame.LEGION_WAR:
            case TypeGame.KING_BATTLE_GROUD:
            case TypeGame.JUE_DI_QIU_SHENG:
                return true;
        }
        return false;
    };
    TypeGame.getName = function (gameType) {
        switch (gameType) {
            case TypeGame.BEGIN: return '新手玩法';
            case TypeGame.ATKCITY: return '关卡玩法';
            case TypeGame.CHAPTER_BOSS: return '攻城掠地';
            case TypeGame.DOOR_BOSS: return '攻城掠地';
            case TypeGame.CITY: return '主城玩法';
            case TypeGame.PERSONAL_BOSS: return '武将讨伐';
            case TypeGame.EVERYONE_BOSS: return '群雄逐鹿';
            case TypeGame.GOD_DOMAIN: return '阵营征伐';
            case TypeGame.MATERIAL: return '材料副本';
            case TypeGame.PAGODA_LOCK: return '试炼塔';
            case TypeGame.PAGODA_PET: return '武神塔';
            case TypeGame.PAGODA_WUHUN: return '武魂塔';
            case TypeGame.LADDER_FIGHT: return '天梯';
            case TypeGame.LADDER_FIGHT1: return '演武';
            case TypeGame.LEGION_WAR: return '阵营战';
            case TypeGame.KING_BATTLE_GROUD: return '王之疆场';
            case TypeGame.GOD_DIE: return '异族来袭';
            case TypeGame.WUGUAN_FIGHT: return '武官';
            case TypeGame.EXPEDITION: return '名将远征';
            case TypeGame.EXPEDITION_SUPPORT: return '名将远征';
            case TypeGame.SHILITA_1: return '兵分三路';
            case TypeGame.SHILITA_2: return '兵分三路';
            case TypeGame.SHILITA_3: return '兵分三路';
            case TypeGame.FRIEND_DISCUSS_WAR: return '好友切磋';
            case TypeGame.KING_WAR: return '王者争霸';
        }
        return "";
    };
    /**获取玩法对应的场景数据模型 */
    TypeGame.getModelScene = function (gameType) {
        switch (gameType) {
            case TypeGame.BEGIN:
            case TypeGame.ATKCITY: return GameModels.chapter;
            case TypeGame.LOSE_BOSS:
            case TypeGame.DEMON_INTRUSION:
            case TypeGame.HOLIDAY_BOSS:
            case TypeGame.FAMILY_BOSS:
            case TypeGame.GOD_DOMAIN:
            case TypeGame.COPY_BOSS_FANTASY:
            case TypeGame.EVERYONE_BOSS: return GameModels.sceneEveryBoss;
            case TypeGame.EVERYONE_BOSS_GUIDE: return GameModels.sceneEveryBoss; //GameModels.sceneEveryBossGuide;
            case TypeGame.LEGION_WAR: return GameModels.sceneLegin;
            case TypeGame.KING_BATTLE_GROUD: return GameModels.sceneKingBattle;
            //case TypeGame.JUE_DI_QIU_SHENG: return GameModels.scenePubg;
            default:
                return GameModels.scene;
        }
    };
    /**获取玩法对应的视图 */
    TypeGame.getView = function (gameType) {
        switch (gameType) {
            case TypeGame.ATKCITY: return s.ViewCity;
            case TypeGame.CITY: return s.ViewMainCity;
            default:
                return s.ViewScene;
        }
    };
    /**是否为对冲阵型玩法 */
    TypeGame.isFormationGame = function (checkTrue) {
        if (checkTrue === void 0) { checkTrue = false; }
        switch (TypeGame.CURRENT_GAME_TYPE) {
            case TypeGame.CHAPTER_BOSS:
            case TypeGame.LADDER_FIGHT:
            case TypeGame.LADDER_FIGHT1:
            case TypeGame.PAGODA_LOCK:
            case TypeGame.PAGODA_PET:
            case TypeGame.PAGODA_WUHUN:
            case TypeGame.MATERIAL:
            case TypeGame.WUGUAN_FIGHT:
            case TypeGame.FRIEND_DISCUSS_WAR:
            case TypeGame.DOOR_BOSS:
            case TypeGame.EXPEDITION:
            case TypeGame.EXPEDITION_SUPPORT:
            case TypeGame.SHILITA_1:
            case TypeGame.SHILITA_2:
            case TypeGame.SHILITA_3:
            case TypeGame.KING_WAR:
                return true;
            case TypeGame.CAMP_BATTLE_WAR:
                if (checkTrue == false)
                    return true;
                break;
            case TypeGame.TOP_BATTLE_ROOM:
                if (checkTrue == false)
                    return true;
                break;
        }
        return false;
    };
    TypeGame.noHaveLegionSkill = function () {
        switch (TypeGame.CURRENT_GAME_TYPE) {
            case TypeGame.DOOR_BOSS:
            case TypeGame.EXPEDITION_SUPPORT:
                return true;
        }
        return false;
    };
    /**是否为主玩法 */
    TypeGame.isMainGame = function (gameType) {
        switch (gameType) {
            case TypeGame.BEGIN:
            case TypeGame.ATKCITY:
            case TypeGame.CITY:
                return true;
        }
        return false;
    };
    /**是否为挂机和主城 */
    TypeGame.isMainOrCityGame = function (gameType) {
        switch (gameType) {
            case TypeGame.ATKCITY:
            case TypeGame.CITY:
                return true;
        }
        return false;
    };
    /**是否骑坐骑 */
    TypeGame.isHorseGame = function (gameType) {
        /*switch (gameType) {
            case TypeGame.BEGIN:
            case TypeGame.ATKCITY:
            case TypeGame.CITY:
            case TypeGame.CHAPTER_BOSS:
            //case TypeGame.CHAPTER_UNION:
            case TypeGame.LEGION_WAR:
                return true;
        }
        return false;
        */
        return true;
    };
    TypeGame.getCopyLimitTime = function (sceneType) {
        var ret = 90;
        switch (sceneType) {
            case TypeGame.PAGODA_PET:
                ret = 30;
                break;
            case TypeGame.PAGODA_LOCK:
                ret = 30;
                break;
            case TypeGame.PAGODA_WUHUN:
                ret = 120;
                break;
        }
        return ret;
    };
    /**是否为副本 */
    TypeGame.isCopy = function (gameType) {
        var ret = !this.isMainGame(gameType);
        return ret;
        /*switch (gameType) {
            case TypeGame.PERSONAL_BOSS:
            case TypeGame.EVERYONE_BOSS:
            case TypeGame.EVERYONE_BOSS_GUIDE:
            case TypeGame.MATERIAL:
            case TypeGame.PAGODA_LOCK:
            case TypeGame.PAGODA_PET:
            case TypeGame.NOEND_FIGHT:
            case TypeGame.LADDER_FIGHT:
            case TypeGame.PEAKS_FIGHT:
            case TypeGame.PET_FIGHT:
            case TypeGame.CROSS_PET_FIGHT:
            case TypeGame.WILDER_FIGHT:
            case TypeGame.DEMON_INTRUSION:
            case TypeGame.LEGION_WAR:
            case TypeGame.GOD_RUINS:
            case TypeGame.FAMILY_BOSS:
            case TypeGame.KING_BATTLE_GROUD:
            case TypeGame.LOSE_BOSS:
            case TypeGame.GOD_DOMAIN:
            case TypeGame.COPY_BOSS_FANTASY:
            case TypeGame.MATERIAL_PHAMTOM:
            case TypeGame.MATERIAL_MAIGU:
            case TypeGame.JUE_DI_QIU_SHENG:
            case TypeGame.GOD_RUINS_FIGHT:
            case TypeGame.GOD_DIE:
            case TypeGame.TEAM_COPY_FIGHT:
            case TypeGame.WUGUAN_FIGHT:
            case TypeGame.WOORS_BOSS:
            case TypeGame.HONGYAN_BOSS:
            case TypeGame.DEATH_BOSS:
                return true;
        }
        return false;
        */
    };
    /**是否为全民Boss副本 */
    TypeGame.isMutilBossCopy = function (gameType) {
        switch (gameType) {
            case TypeGame.EVERYONE_BOSS:
            case TypeGame.EVERYONE_BOSS_GUIDE:
            case TypeGame.LOSE_BOSS:
            case TypeGame.DEMON_INTRUSION:
            case TypeGame.HOLIDAY_BOSS:
            case TypeGame.FAMILY_BOSS:
            case TypeGame.GOD_DOMAIN:
            case TypeGame.COPY_BOSS_FANTASY:
                return true;
        }
        return false;
    };
    /**是否为多人战场副本 */
    TypeGame.isMutilBattleCopy = function (gameType) {
        switch (gameType) {
            case TypeGame.LEGION_WAR:
            case TypeGame.KING_BATTLE_GROUD:
            case TypeGame.JUE_DI_QIU_SHENG:
                return true;
        }
        return false;
    };
    // /**是否需要计时(3\2\1)开始游戏 */
    // public static hasStartCountdown(gameType: number): boolean {
    //     switch (gameType) {
    //         case TypeGame.PERSONAL_BOSS:
    //         case TypeGame.MATERIAL:
    //         case TypeGame.MATERIAL_MAIGU:
    //         case TypeGame.PAGODA_LOCK:
    //         case TypeGame.PAGODA_PET:
    //         case TypeGame.NOEND_FIGHT:
    //         case TypeGame.LADDER_FIGHT:
    //         case TypeGame.KING_UNIONWAR_WAR:
    //         case TypeGame.PET_FIGHT:
    //         case TypeGame.CROSS_PET_FIGHT:
    //         case TypeGame.GOD_RUINS:
    //         case TypeGame.WILDER_FIGHT:
    //         case TypeGame.GOD_RUINS_FIGHT:
    //             return true;
    //     }
    //     return false;
    // }
    /**该玩法是否隐藏聊天 */
    TypeGame.isHideChat = function (gameType) {
        switch (gameType) {
            // case TypeGame.LEGION_WAR:
            // case TypeGame.KING_BATTLE_GROUD:
            //     return true;
            case TypeGame.ATKCITY:
                return true;
            default:
                return false;
        }
    };
    /**该玩法是否隐有结束倒计时 */
    TypeGame.hasEndCoundDown = function (gameType) {
        switch (gameType) {
            case TypeGame.LEGION_WAR:
            case TypeGame.KING_BATTLE_GROUD:
            case TypeGame.PAGODA_LOCK:
            case TypeGame.PAGODA_PET:
            case TypeGame.MATERIAL:
            case TypeGame.MATERIAL_PHAMTOM:
            case TypeGame.MATERIAL_MAIGU:
            // case TypeGame.EVERYONE_BOSS:
            // case TypeGame.EVERYONE_BOSS_GUIDE:
            //case TypeGame.PERSONAL_BOSS:
            case TypeGame.PAGODA_WUHUN:
            case TypeGame.LADDER_FIGHT:
            case TypeGame.LADDER_FIGHT1:
            case TypeGame.PEAKS_FIGHT:
            case TypeGame.EXPEDITION:
            case TypeGame.EXPEDITION_SUPPORT:
            case TypeGame.CROSS_PET_FIGHT:
            case TypeGame.JUE_DI_QIU_SHENG:
            case TypeGame.GOD_RUINS_FIGHT:
            case TypeGame.TEAM_COPY_FIGHT:
            case TypeGame.HONGYAN_BOSS:
            case TypeGame.SHILITA_1:
            case TypeGame.SHILITA_2:
            case TypeGame.SHILITA_3:
            case TypeGame.KING_WAR:
                return true;
            default:
                return false;
        }
    };
    /**是否为客户端挂机或新手类玩法，纯客户端表现和计算 */
    TypeGame.isClientGame = function () {
        if (app.gameContext.typeGame == TypeGame.ATKCITY || app.gameContext.typeGame == TypeGame.BEGIN) {
            //|| app.gameContext.typeGame == TypeGame.EVERYONE_BOSS_GUIDE) {
            return true;
        }
        return false;
    };
    TypeGame.isRedViewEffect = function () {
        if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS || app.gameContext.typeGame == TypeGame.PAGODA_LOCK || app.gameContext.typeGame == TypeGame.PAGODA_PET) {
            return true;
        }
        return false;
    };
    TypeGame.CURRENT_GAME_TYPE = 0;
    /**新手引导玩法 */
    TypeGame.BEGIN = 1;
    /**关卡玩法 */
    TypeGame.ATKCITY = 2;
    /**关卡BOSS玩法 */
    TypeGame.CHAPTER_BOSS = 3;
    /**关卡攻城玩法 */
    TypeGame.DOOR_BOSS = 4;
    /**个人boss玩法 */
    TypeGame.PERSONAL_BOSS = 5;
    /**材料副本玩法 */
    TypeGame.MATERIAL = 6;
    /**锁妖塔玩法 */
    TypeGame.PAGODA_LOCK = 7;
    /**武将塔玩法 */
    TypeGame.PAGODA_PET = 8;
    /**武魂塔玩法 */
    TypeGame.PAGODA_WUHUN = 9;
    /**天梯玩法 */
    TypeGame.LADDER_FIGHT = 10;
    /**远征玩法 */
    TypeGame.EXPEDITION = 11;
    /**远征协助玩法 */
    TypeGame.EXPEDITION_SUPPORT = 12;
    /**演武玩法 */
    TypeGame.LADDER_FIGHT1 = 13;
    /**（经脉副本）原幻界迷城 */
    TypeGame.MATERIAL_PHAMTOM = 14;
    //王者争霸(国战)
    TypeGame.KING_WAR = 15;
    /**好友切磋 */
    TypeGame.FRIEND_DISCUSS_WAR = 16;
    /**诸神城池抢夺玩法 */
    TypeGame.GOD_RUINS_FIGHT = 17;
    /**埋骨禁地玩法 */
    TypeGame.MATERIAL_MAIGU = 18;
    /**跨服武将玩法 */
    TypeGame.CROSS_PET_FIGHT = 19;
    /**武官玩法 */
    TypeGame.WUGUAN_FIGHT = 20;
    /**全民boss体验玩法 */
    TypeGame.EVERYONE_BOSS_GUIDE = 31;
    /**主城玩法 */
    TypeGame.CITY = 33;
    /**全民boss玩法 */
    TypeGame.EVERYONE_BOSS = 102;
    /**失落魔域玩法 */
    TypeGame.LOSE_BOSS = 103;
    /**魔界入侵玩法 */
    TypeGame.DEMON_INTRUSION = 104;
    /**boss之家玩法 */
    TypeGame.FAMILY_BOSS = 105;
    /**神域BOOS玩法 */
    TypeGame.GOD_DOMAIN = 106;
    /**王之疆场玩法 */
    TypeGame.KING_BATTLE_GROUD = 107;
    /**阵营战玩法 */
    TypeGame.LEGION_WAR = 108;
    /**幻界禁地 */
    TypeGame.COPY_BOSS_FANTASY = 109;
    /**全民boss体验玩法 */
    //public static EVERYONE_BOSS_GUIDE: number = 99;
    /**绝地求生 */
    TypeGame.JUE_DI_QIU_SHENG = 111;
    /**神陨 */
    TypeGame.GOD_DIE = 112;
    /**活动boss */
    TypeGame.HOLIDAY_BOSS = 114;
    /**跨服BOSS */
    TypeGame.CROSS_BOSS = 301;
    /**跨服秘境BOSS */
    TypeGame.SECRET_BOSS = 302;
    /**跨服主城 */
    TypeGame.CROSS_CITY = 303;
    /**组队副本 */
    TypeGame.TEAM_COPY_FIGHT = 201;
    /**巅峰之战 */
    TypeGame.PEAKS_FIGHT = 202;
    /**跨服巅峰之战 */
    TypeGame.CROSS_PEAKS_FIGHT = 203;
    /**九曲之都BOSS */
    TypeGame.WOORS_BOSS = 115;
    /**红颜之怒 */
    TypeGame.HONGYAN_BOSS = 66;
    /**盘古仙境（原灭世荒漠） */
    TypeGame.DEATH_BOSS = 116;
    /**国战车轮战 */
    TypeGame.CAMP_BATTLE_WAR = 117;
    /**势力塔魏 */
    TypeGame.SHILITA_1 = 41;
    /**势力塔蜀 */
    TypeGame.SHILITA_2 = 42;
    /**势力塔吴 */
    TypeGame.SHILITA_3 = 43;
    //巅峰之战-观看
    TypeGame.TOP_BATTLE_ROOM = 402;
    return TypeGame;
}());
__reflect(TypeGame.prototype, "TypeGame");
