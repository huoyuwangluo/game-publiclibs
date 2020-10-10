/**
 * 一些游戏逻辑相关的通用函数写在这个地方
 * 比如一些转换规则
 */
var convert;
(function (convert) {
    /**获取神转等级 */
    function getGodLevel(level) {
        return (level / 1000) >> 0;
    }
    convert.getGodLevel = getGodLevel;
    /**获取普通等级 */
    function getLevel(level) {
        return level - ((level / 1000) >> 0) * 1000;
    }
    convert.getLevel = getLevel;
    /**获得公式等级*/
    function getFormulaLevel(step, level) {
        return step * 1000 + level;
    }
    convert.getFormulaLevel = getFormulaLevel;
    /**获取等级名称 */
    function getLevelName(level) {
        // var godLevel: number = this.getGodLevel(level);
        // if (godLevel) {
        // 	return Language.getExpression(Language.E_S1,godLevel);
        // }
        // var level: number = this.getLevel(level);
        return "LV." + level;
    }
    convert.getLevelName = getLevelName;
    /** 格式化神转等级*/
    function getFormatGodLevel(level) {
        return Language.getExpression(Language.E_S1, level);
    }
    convert.getFormatGodLevel = getFormatGodLevel;
    /** 格式化等级*/
    function getFormatLevel(level) {
        return "LV." + level;
    }
    convert.getFormatLevel = getFormatLevel;
    /**解析固定字符串成物品配置*/
    function parseItemsInfo(string) {
        if (!string)
            return [];
        var result = [];
        var arr = string.split(';');
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var str = arr_1[_i];
            var index = str.indexOf('&');
            if (str.indexOf("&") != -1) {
                var equips = str.split("&");
                var job = GameModels.user.player.job;
                var equip = void 0;
                if (job == TypeJob.ZHAN) {
                    equip = equips[0];
                }
                else if (job == TypeJob.FA) {
                    equip = equips[1];
                }
                else if (job == TypeJob.YI) {
                    equip = equips[2];
                }
                index = str.indexOf('_');
                result.push({ id: parseInt(equip.substring(0, index)), count: parseInt(str.substring(index + 1, equip.length)) });
                continue;
            }
            index = str.indexOf('_');
            var id = parseInt(str.substring(0, index));
            var count = parseInt(str.substring(index + 1, str.length));
            result.push({ id: id, count: count });
        }
        return result;
    }
    convert.parseItemsInfo = parseItemsInfo;
    /**获得人物技能等级Id*/
    function getPLSkillLvId(skillId, level) {
        return 10000 + skillId * 1000 + level;
    }
    convert.getPLSkillLvId = getPLSkillLvId;
    /**获得武将技能等级Id*/
    function getPESkillLvId(skillId, level) {
        return skillId * 10 + level;
    }
    convert.getPESkillLvId = getPESkillLvId;
    /**获得阵营技能等级Id*/
    function getUnionskillLvId(skillId, level) {
        return skillId * 1000 + level;
    }
    convert.getUnionskillLvId = getUnionskillLvId;
    /**获得阵营图腾等级Id*/
    function getUnionTotemLvId(totemId, level) {
        return totemId * 10 + level;
    }
    convert.getUnionTotemLvId = getUnionTotemLvId;
    /**获得契约ICON INDEX 是契约位置索引从0~3*/
    function getContractIcon(index) {
        return "902" + (index + 1) + "01";
    }
    convert.getContractIcon = getContractIcon;
    /**根据转生和等级获得配置等级*/
    function getConfigLevel(step, level) {
        return step > 0 ? 80 + step * 1000 : Math.min(80, level);
    }
    convert.getConfigLevel = getConfigLevel;
    function getNumberHanzi(num) {
        switch (num) {
            case 0: return Language.Z_0;
            case 1: return Language.Z_1;
            case 2: return Language.Z_2;
            case 3: return Language.Z_3;
            case 4: return Language.Z_4;
            case 5: return Language.Z_5;
            case 6: return Language.Z_6;
            case 7: return Language.Z_7;
            case 8: return Language.Z_8;
            case 9: return Language.Z_9;
            case 10: return Language.Z_10;
        }
        return Language.Z_0;
    }
    convert.getNumberHanzi = getNumberHanzi;
    /**解析固定字符串成物品品质名称数量*/
    function parseItemsQualityAndName(string) {
        if (!string)
            return [];
        var result = [];
        var arr = string.split(';');
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var str = arr_2[_i];
            var itemName = "";
            var itemVO = null;
            var rewardData = str.split("_");
            var count = 0;
            if (rewardData.length > 1) {
                count = parseInt(rewardData[1]);
            }
            var type = Templates.getItemTemplateMainType(rewardData[0]);
            if (type == TypeItem.EQUIP) {
                itemVO = this._itemVO = vo.fromPool(vo.EquipVO, parseInt(rewardData[0]));
            }
            else {
                itemVO = this._itemVO = vo.fromPool(vo.ItemVO, parseInt(rewardData[0]));
            }
            if (itemVO.mainType == TypeItem.EQUIP) {
                itemName = convert.getLevelName(itemVO.lv);
            }
            else {
                itemName = itemVO.name;
            }
            result.push({ quality: itemVO.quality, name: itemName, count: count });
        }
        return result;
    }
    convert.parseItemsQualityAndName = parseItemsQualityAndName;
    function formatGold(value) {
        if (value >= 100000000) {
            return Math.floor(value / 100000000) + Language.Z_YI;
        }
        else if (value >= 10000) {
            return Math.floor(value / 10000) + Language.Z_WAN;
        }
        else {
            return value.toString();
        }
    }
    convert.formatGold = formatGold;
    function formatOnBookExpAndGold(value) {
        if (value >= 100000000) {
            return (value / 100000000).toFixed(1) + Language.Z_YI;
        }
        else if (value >= 10000) {
            return (value / 10000).toFixed(1) + Language.Z_WAN;
        }
        else {
            return value.toString();
        }
    }
    convert.formatOnBookExpAndGold = formatOnBookExpAndGold;
})(convert || (convert = {}));
