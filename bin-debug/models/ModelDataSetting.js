var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var mo;
(function (mo) {
    var ModelDataSetting = (function (_super) {
        __extends(ModelDataSetting, _super);
        function ModelDataSetting() {
            return _super.call(this) || this;
        }
        ModelDataSetting.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._petZiZhi = [];
            for (var i = 280001; i <= 280039; i++) {
                this._petZiZhi.push(Templates.getTemplateById(templates.Map.DATASETTING, i));
            }
        };
        /**
         * 通过id得到dataSetting的配置
         */
        ModelDataSetting.prototype.getDataSettingById = function (id) {
            var data = Templates.getTemplateById(templates.Map.DATASETTING, id);
            if (!data)
                logger.log("id..找不到datasetting配置,及时找胖子查看===", id);
            return data ? data : null;
        };
        /**
         * 通过type得到dataSetting的配置
         */
        ModelDataSetting.prototype.getDataSettingByType = function (type) {
            var data = Templates.getTemplateByProperty(templates.Map.DATASETTING, "type", type);
            if (!data)
                logger.log("type..找不到datasetting配置,及时找胖子查看===", type);
            return data ? data : null;
        };
        /**
         * 通过type得到dataSetting的配置集合
         */
        ModelDataSetting.prototype.getDataSettingArrByType = function (type) {
            var data = Templates.getTemplatesByProperty(templates.Map.DATASETTING, "type", type);
            if (!data)
                logger.log("types..找不到datasetting配置,及时找胖子查看===", type);
            return data ? data : [];
        };
        /**
         * 通过id得到dataSetting的value
         */
        ModelDataSetting.prototype.getDataSettingValueById = function (id) {
            var data = Templates.getTemplateById(templates.Map.DATASETTING, id);
            if (!data)
                logger.log("id value..找不到datasetting配置,及时找胖子查看===", id);
            return data ? data.value : "";
        };
        /**
         * 通过id得到dataSetting的des
         */
        ModelDataSetting.prototype.getDataSettingDesById = function (id) {
            var data = Templates.getTemplateById(templates.Map.DATASETTING, id);
            if (!data)
                logger.log("id value..找不到datasetting配置,及时找胖子查看===", id);
            return data ? data.des : "";
        };
        /**加入军团奖励 order:3高2中1低*/
        ModelDataSetting.prototype.getUnionReward = function (order) {
            if (order === void 0) { order = 1; }
            return this.getDataSettingValueById(144000 + order);
        };
        /**购买次数需要的价格 */
        ModelDataSetting.prototype.getBuyCountNeedPrice = function (id, times) {
            var dataValue = this.getDataSettingValueById(id);
            if (!dataValue)
                logger.log("Price..找不到datasetting配置,及时找胖子查看===", id);
            if (!dataValue)
                return 0;
            var dataValueArr = dataValue.split(";");
            for (var i = 0; i < dataValueArr.length; i++) {
                var s = dataValueArr[i].split("_");
                if (parseInt(s[0]) <= times && times <= parseInt(s[1])) {
                    return parseInt(s[2]);
                }
            }
            return 0;
        };
        /**红颜交心秒cd */
        ModelDataSetting.prototype.getHongYanMaskLoveSpeedTime = function () {
            return parseInt(GameModels.dataSet.getDataSettingValueById(110001));
        };
        /**红颜交心结束 */
        ModelDataSetting.prototype.getHongYanMaskLoveFinsh = function (id) {
            return GameModels.dataSet.getDataSettingValueById(id);
        };
        /**红颜交心中 */
        ModelDataSetting.prototype.getHongYanMaskLoveIng = function () {
            var dataSet = GameModels.dataSet.getDataSettingValueById(111001).split(";");
            return dataSet;
        };
        /**征收时间范围 time秒*/
        ModelDataSetting.prototype.getFoodTime = function (time) {
            var str = GameModels.dataSet.getDataSettingValueById(640001).split(";");
            for (var i = 0; i < str.length; i++) {
                var str1 = str[i].split("&");
                var str2 = str1[0].split("_");
                if (time <= parseInt(str2[1]) && time > parseInt(str2[0])) {
                    return parseInt(str1[1]);
                }
            }
            return 0;
        };
        /**豪华奖池取瓜分奖池 */
        ModelDataSetting.prototype.haohuaJiangchi = function (rank) {
            var sArr = this.getDataSettingValueById(9001001).split(";");
            for (var i = 0; i < sArr.length; i++) {
                var ss = sArr[i].split("_");
                if (rank == parseInt(ss[0])) {
                    return parseInt(ss[1]) / 10000;
                }
            }
            return 0;
        };
        /**偶遇仙人d道具 */
        ModelDataSetting.prototype.ouYuXianRenProp = function (index) {
            /**1神兵组 2武将组 3元宝组 4升级组 5红颜组 */
            return this.getDataSettingValueById(720000 + index);
        };
        return ModelDataSetting;
    }(mo.ModelBase));
    mo.ModelDataSetting = ModelDataSetting;
    __reflect(ModelDataSetting.prototype, "mo.ModelDataSetting");
})(mo || (mo = {}));
