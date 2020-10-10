var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Templates = (function () {
    function Templates() {
    }
    Templates.initialize = function (objects) {
        var t = egret.getTimer();
        templates.Map.initialize();
        var names = templates.Map.getNames();
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var data = objects[name];
            if (!this._data[name])
                this.initializeTemplate(name, data);
        }
        logger.log("配置初始化完成：" + (egret.getTimer() - t));
    };
    Templates.initializeTemplate = function (name, data) {
        this.registerParser();
        var clazz = templates.Map.getTemplateClass(name);
        var list = [];
        var hash = {};
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var object = new clazz();
            object.decode(item);
            if (object['id']) {
                hash[object['id']] = object;
            }
            list.push(object);
        }
        this._data[name] = { list: list, hash: hash };
    };
    Templates.registerParser = function () {
        //templates.Map.registerParser();
    };
    /**
     * 通过Id获取本地数据模板
     */
    Templates.getTemplateById = function (name, id) {
        if (this._data[name]) {
            return this._data[name].hash[id];
        }
        return null;
    };
    /**
     * 通过subType获取本地数据模板,目前神魂在用
     */
    Templates.getTemplateBysubType = function (name, subtype, subtypes) {
        var nItems = [];
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                if (item[subtype] && item[subtype] == subtypes) {
                    nItems.push(item);
                }
            }
        }
        return nItems;
    };
    /**
     * 获取本地数据模板集合
     */
    Templates.getList = function (name) {
        return this._data[name].list;
    };
    /**
     * 通过一个任意属性获取本地数据模板
     */
    Templates.getTemplateByProperty = function (name, property, value) {
        if (this._data[name]) {
            for (var _i = 0, _a = this._data[name].list; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item[property] == value) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
     * 通过两个任意属性获取本地数据模板
      */
    Templates.getTemplateByTwoProperty = function (name, property, value, property1, value1) {
        if (this._data[name]) {
            for (var _i = 0, _a = this._data[name].list; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item[property] != "undefined" && item[property] == value && item[property1] != "undefined" && item[property1] == value1) {
                    return item;
                }
            }
        }
        return null;
    };
    Templates.getTemplatesByProperty = function (name, property, value) {
        var nItems = [];
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var item = list_2[_i];
                if (item[property] && item[property] == value) {
                    nItems.push(item);
                }
            }
        }
        return nItems;
    };
    Templates.getItemTemplateById = function (id) {
        var itemTemplate = Templates.getTemplateById(templates.Map.ITEM, id);
        if (itemTemplate)
            return itemTemplate;
        var equipTemplate = Templates.getTemplateById(templates.Map.EQUIP, id);
        return equipTemplate;
    };
    Templates.getItemTemplateMainType = function (id) {
        var template = Templates.getItemTemplateById(id);
        if (template) {
            if (template.mainType == 2 && (template.type == TypeItem.PET_SUI || template.type == TypeItem.PET_SUIJI_TYPE)) {
                return TypeItem.PET;
            }
            if (template.mainType == 2 && (template.type == TypeItem.ANIMAL_SUI || template.type == TypeItem.ANIMAL_SUIJI_TYPE)) {
                return TypeItem.ANIMAL;
            }
            return template.mainType;
        }
        return -1;
    };
    /**
   * 通过petId获取本地数据模板,武将专用
   */
    Templates.getPetLvTemplateByPetLv = function (name, property, petlv) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var item = list_3[_i];
                if (item[property] != "undefined" && item[property] == petlv) {
                    return item;
                }
            }
        }
        return null;
    };
    Templates.getPetEvolveTemplateByPetLv = function (name, property, step) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var item = list_4[_i];
                if (item[property] != "undefined" && item[property] == step) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
    * 通过lv获取本地数据模板,图鉴专用
    */
    Templates.getHandBookTemplateByLv = function (name, property, lv) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                var item = list_5[_i];
                if (item[property] != "undefined" && item[property] == lv) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
    * 通过类型 等级找失败配置
    */
    Templates.getTemplateByLvAndType = function (name, property, minLV, property1, type) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                var item = list_6[_i];
                if (item[property] != "undefined" && item[property] == minLV && item[property1] != "undefined" && item[property1] == type) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
     * 通过奖池 类型 找幸运夺宝的数据
     */
    Templates.getTemplatesByPoolAndType = function (name, pool, poolValue, type, typeValue) {
        var nItems = [];
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
                var item = list_7[_i];
                if (item[pool] && item[pool] == poolValue && item[type] && item[type] == typeValue) {
                    nItems.push(item);
                }
            }
        }
        return nItems;
    };
    /**
     * 通过玩家性别获取hreo数据模板
     */
    Templates.getHeroTemplateBySex = function (sex) {
        if (this._data["hero"]) {
            var list = this._data["hero"].list;
            for (var _i = 0, list_8 = list; _i < list_8.length; _i++) {
                var item = list_8[_i];
                if (item["sex"] != "undefined" && item["sex"] == sex) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
* 通过星级 阶级或者坐骑等级模板
*/
    Templates.getskillLverlBySkillIdAndSkillLever = function (name, property, lv, property1, skillId) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_9 = list; _i < list_9.length; _i++) {
                var item = list_9[_i];
                if (item[property] != "undefined" && item[property] == lv && item[property1] != "undefined" && item[property1] == skillId) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
    * 通过技能等级获取本地数据模板
    */
    Templates.getSkillidTemplateByXpSkill = function (name, property, id) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_10 = list; _i < list_10.length; _i++) {
                var item = list_10[_i];
                if (item[property] != "undefined" && item[property] == id) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
    * 通过位置,类型,阶级获取本地星辰装备数据模板
    */
    Templates.getStarEquipsTempByPosAndTypeAndStep = function (name, types, poss, steps, type, pos, step) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_11 = list; _i < list_11.length; _i++) {
                var item = list_11[_i];
                if (item[types] == type && item[poss] == pos && item[steps] == step) {
                    return item;
                }
            }
        }
        return null;
    };
    Templates.getFuMoTempByPosAndLevel = function (name, poss, levels, pos, level) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_12 = list; _i < list_12.length; _i++) {
                var item = list_12[_i];
                if (item[poss] == pos && item[levels] == level) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
      * 通过类型,group，groupCount获取本地屠魔圣装数据模板
      */
    Templates.getTuMoEquipsTempBySubTypeAndGroupAndGroupCount = function (name, subtype, group, groupCount, subtypes, groups, groupCounts) {
        var nItems = [];
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_13 = list; _i < list_13.length; _i++) {
                var item = list_13[_i];
                if (item[subtype] == subtypes && item[group] == groups && item[groupCount] == groupCounts) {
                    nItems.push(item);
                }
            }
        }
        return nItems;
    };
    /**
      * 通过类型,groupCount获取本地屠魔圣装数据模板,查找九曲六道套装
     */
    Templates.getTuMoEquipsTempBySubTypeAndGroupCount = function (name, subtype, groupCount, subtypes, groupCounts) {
        if (this._data[name]) {
            var list = this._data[name].list;
            for (var _i = 0, list_14 = list; _i < list_14.length; _i++) {
                var item = list_14[_i];
                if (item[subtype] == subtypes && item[groupCount] == groupCounts) {
                    return item;
                }
            }
        }
        return null;
    };
    Templates._data = {};
    return Templates;
}());
__reflect(Templates.prototype, "Templates");
