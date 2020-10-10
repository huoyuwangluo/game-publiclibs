var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResPath = (function () {
    function ResPath() {
    }
    /**根据星级获取品质框 */
    ResPath.getPetTuBiaoByStar = function (star) {
        if (star == 0)
            star = 3;
        if (star == 6 || star == 7 || star == 8 || star == 9) {
            star = 5;
        }
        if (star > 9)
            star = 6;
        return "tujian_json.img_quality" + star;
    };
    /**根据星级获取品质框 */
    ResPath.getPetQualityByStar = function (star, isHashFrouSkill) {
        if (star == 0)
            star = 3;
        if (star >= 10) {
            star = 7;
        }
        else if (star >= 5) {
            star = 6;
            if (isHashFrouSkill) {
                return "qualityBg_json.img_qlt_" + 60 + "_png";
            }
        }
        else {
            star = star + 1;
        }
        return "qualityBg_json.img_qlt_" + star + "_png";
    };
    /**根据星级获取菱形品质框 */
    ResPath.getLingXingQualityByStar = function (star, isHashFrouSkill) {
        if (star == 0)
            star = 3;
        if (star >= 10) {
            star = 7;
        }
        else if (star >= 5) {
            star = 6;
            if (isHashFrouSkill) {
                return "qualityBg_json.img_head_" + 60 + "_png";
            }
        }
        else {
            star = star + 1;
        }
        return "qualityBg_json.img_head_" + star + "_png";
    };
    /**获取品质框 */
    ResPath.getQuality = function (quality) {
        if (quality == 0)
            quality = 1;
        return "qualityBg_json.img_qlt_" + quality + "_png";
    };
    /**获取菱形品质框 */
    ResPath.getLingXingQuality = function (quality) {
        return "qualityBg_json.img_head_" + quality + "_png";
    };
    /**获取item对应的icon */
    ResPath.getItemIconKey = function (key) {
        return game.GameConfig.resource_path + "/icon/item/" + key + ".png";
    };
    /**获取排行前三名次 */
    ResPath.getRankingIconKey = function (ranking) {
        return "rankCommon_json.img_rank_" + ranking;
    };
    /**获取武将名字*/
    ResPath.getPetName = function (id) {
        if (id == 1001 || id == 2701 || id == 2702) {
            return "";
        }
        return "pet_name_json." + id;
    };
    /** 获得角色头像icon菱形*/
    ResPath.getPlayerIconSmall = function (job) {
        if (job == 0)
            return "qualityBg_json.img_head_png";
        if (job == 1)
            return "qualityBg_json.img_who_png";
        return "pet_head_json." + job;
    };
    /**获取武将头像icon菱形*/
    ResPath.getPetIconSmall = function (id) {
        if (id == 0)
            return "qualityBg_json.img_head_png";
        return "pet_head_json." + id;
    };
    /**获取boss头像icon方形*/
    ResPath.getBossIconBig = function (id) {
        return "boss_head_json." + id;
    };
    /**获取boss头像icon菱形*/
    ResPath.getBossIconSmall = function (id) {
        return "boss_head_json." + id;
    };
    /**根据星级获取图鉴品质框*/
    ResPath.getTujianQuaitlyRect = function (star) {
        if (star == 0)
            star = 3;
        if (star >= 10) {
            star = 7;
        }
        else if (star >= 5) {
            star = 6;
        }
        else {
            star = star + 1;
        }
        return "img_General_bg_" + star + "_png";
    };
    /**获取图鉴等级资源*/
    ResPath.getTujianQuaitlyLv = function (id) {
        return "tujian_json.img_General_lv_" + id;
    };
    /**获取六道Icon*/
    ResPath.getLiuDaoRect = function (pos, lv) {
        return "sixrealms_json.LD_" + pos + "_" + lv + "_png";
    };
    /**获取人物图片路径 */
    ResPath.getShowPlayerPath = function (showId) {
        return game.GameConfig.resource_path + "/show/player/" + showId + ".png";
    };
    /**获得战骑图片路径 */
    ResPath.getShowHoresPath = function (showId) {
        return game.GameConfig.resource_path + "/show/hores/" + showId + ".png";
    };
    /**获得战旗图片路径 */
    ResPath.getShowBannerPath = function (id) {
        return "flag_title_" + id + "_png";
    };
    /**获取武将图片路径 */
    ResPath.getShowPetPath = function (showId) {
        return game.GameConfig.resource_path + "/model/petBody/" + showId + ".png";
    };
    /**获取称号图片路径 */
    ResPath.getShowTitlePath = function (showId) {
        return game.GameConfig.resource_path + "/show/title/" + showId + ".png";
    };
    /**获取BOSS图片路径 */
    ResPath.getShowBossPath = function (showId) {
        return game.GameConfig.resource_path + "/model/bossBody/" + showId + ".png";
    };
    /**获取星辰装备图片路径 */
    ResPath.getShowStarEquipPath = function (showId) {
        return game.GameConfig.resource_path + "/show/starEquip/png_xingchen_" + showId + ".png";
    };
    /**获取图鉴新图片路径 */
    ResPath.getShowNewTuJianPath = function (showId) {
        return game.GameConfig.resource_path + "/show/tujian/img_" + showId + ".png";
    };
    /**获取玩家中号正方形头像路径 */
    ResPath.getPlayerHeadPath = function () {
        return game.GameConfig.resource_path + "/show/tujian/1001.png";
    };
    /**获取boss半身像图片路径 */
    ResPath.getShowBossHalfPath = function (showId) {
        return game.GameConfig.resource_path + "/show/bossHalfBody/img_" + showId + ".png";
    };
    return ResPath;
}());
__reflect(ResPath.prototype, "ResPath");
