var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var HtmlUtil = (function () {
        function HtmlUtil() {
            this._100Base = ["HIT", "EVD", "WRE", "WDR", "CRI", "ANTICRI", "CRIDMG", "ANTICRIDMG", "CRIBOSS", "DMGINCRBOSS", "DMGREDUBOSS", "CRIDMGBOSS"];
            this.initAttName();
        }
        /** 获得下划线文本*/
        HtmlUtil.prototype.getUnderlineFormat = function (content) {
            return utils.TextFlowMaker.htmlParser("<font><u>" + content + "</u></font>");
        };
        /**武将技能描述 */
        HtmlUtil.prototype.getpetSkillDesc = function (desc, damage) {
            var arr = desc.split("{0}");
            // desc.replace("{0}", damage.toString());
            return utils.TextFlowMaker.htmlParser(arr[0] + '<font color="0x0053eb">' + damage + '</font>' + arr[1]);
        };
        HtmlUtil.prototype.getBaseAttElement = function (data) {
            var arys = [];
            if (data.HP >= 0) {
                arys.push({ text: "" + Language.P_SM + " : " + data.HP + "\n" });
            }
            if (data.ATT >= 0) {
                arys.push({ text: "" + Language.P_GJ + " : " + data.ATT + "\n" });
            }
            if (data.DEF >= 0) {
                arys.push({ text: "" + Language.P_FY + " : " + data.DEF + "\n" });
            }
            if (data.CROSS >= 0) {
                arys.push({ text: "" + Language.P_CT + " : " + data.CROSS + "\n" });
            }
            if (data.MPINIT >= 0) {
                arys.push({ text: "" + Language.P_CSNQZ + " : " + data.MPINIT + "\n" });
            }
            if (data.DMGINCRBOSS >= 0) {
                arys.push({ text: "" + Language.P_DBZS + " : " + (data.DMGINCRBOSS * .01).toFixed(2) + " %\n" });
            }
            if (data.HIT >= 0) {
                arys.push({ text: "" + Language.P_MZ + " : " + (data.HIT * .01).toFixed(2) + " %\n" });
            }
            if (data.EVD >= 0) {
                arys.push({ text: "" + Language.P_SB + " : " + (data.EVD * .01).toFixed(2) + " %\n" });
            }
            if (data.CRI >= 0) {
                arys.push({ text: "" + Language.P_BJ + " : " + (data.CRI * .01).toFixed(2) + " %\n" });
            }
            if (data.ANTICRI >= 0) {
                arys.push({ text: "" + Language.P_KB + " : " + (data.ANTICRI * .01).toFixed(2) + " %\n" });
            }
            if (data.CRIDMG >= 0) {
                arys.push({ text: "" + Language.P_BS + " : " + (data.CRIDMG * .01).toFixed(2) + " %\n" });
            }
            if (data.ANTICRIDMG >= 0) {
                arys.push({ text: "" + Language.P_RX + " : " + (data.ANTICRIDMG * .01).toFixed(2) + " %\n" });
            }
            if (data.CRIBOSS >= 0) {
                arys.push({ text: "" + Language.P_DBBJ + " : " + (data.CRIBOSS * .01).toFixed(2) + " %\n" });
            }
            if (data.DMGREDUBOSS >= 0) {
                arys.push({ text: "" + Language.P_SBJS + " : " + (data.DMGREDUBOSS * .01).toFixed(2) + " %\n" });
            }
            if (data.EXATT >= 0) {
                arys.push({ text: "" + Language.P_GJJC + " : " + (data.EXATT * .01).toFixed(2) + " %\n" });
            }
            if (data.EXHP >= 0) {
                arys.push({ text: "" + Language.P_SMJC + " : " + (data.EXHP * .01).toFixed(2) + " %\n" });
            }
            if (data.EXDEF >= 0) {
                arys.push({ text: "" + Language.P_FYJC + " : " + (data.EXDEF * .01).toFixed(2) + " %\n" });
            }
            if (data.EXCROSS >= 0) {
                arys.push({ text: "" + Language.P_CTJC + " : " + (data.EXCROSS * .01).toFixed(2) + " %\n" });
            }
            if (data.CTRL >= 0) {
                arys.push({ text: "" + Language.P_KZ + " : " + (data.WRE * .01).toFixed(2) + " %\n" });
            }
            if (data.IGNORECTRL >= 0) {
                arys.push({ text: "" + Language.P_KK + " : " + (data.WDR * .01).toFixed(2) + " %\n" });
            }
            if (data.HEAL >= 0) {
                arys.push({ text: "" + Language.P_ZL1 + " : " + (data.WRE * .01).toFixed(2) + " %\n" });
            }
            if (data.BEHEAL >= 0) {
                arys.push({ text: "" + Language.P_SL + " : " + (data.WDR * .01).toFixed(2) + " %\n" });
            }
            if (data.WQPCT > 0) {
                arys.push(Language.P_WQPCT + "_" + (data.WQPCT * .01).toFixed(2) + "%");
            }
            if (data.TKPCT > 0) {
                arys.push(Language.P_TKPCT + "_" + (data.TKPCT * .01).toFixed(2) + "%");
            }
            if (data.YFPCT > 0) {
                arys.push(Language.P_YFPCT + "_" + (data.YFPCT * .01).toFixed(2) + "%");
            }
            if (data.XLPCT > 0) {
                arys.push(Language.P_XLPCT + "_" + (data.XLPCT * .01).toFixed(2) + "%");
            }
            if (data.STPCT > 0) {
                arys.push(Language.P_STPCT + "_" + (data.STPCT * .01).toFixed(2) + "%");
            }
            if (data.SZPCT > 0) {
                arys.push(Language.P_SZPCT + "_" + (data.SZPCT * .01).toFixed(2) + "%");
            }
            if (data.YDPCT > 0) {
                arys.push(Language.P_YDPCT + "_" + (data.YDPCT * .01).toFixed(2) + "%");
            }
            if (data.XZPCT > 0) {
                arys.push(Language.P_XZPCT + "_" + (data.XZPCT * .01).toFixed(2) + "%");
            }
            if (data.RECOVERYMP > 0) {
                arys.push(Language.P_NQHFJC + "_" + (data.RECOVERYMP * .01).toFixed(2) + "%");
            }
            return arys;
        };
        /** 基础属性*/
        HtmlUtil.prototype.getBashProperty = function (data) {
            var arys = [];
            if (data.HP > 0) {
                arys.push({ text: "" + Language.P_SM + " : " + data.HP + "\n" });
            }
            if (data.ATT > 0) {
                arys.push({ text: "" + Language.P_GJ + " : " + data.ATT + "\n" });
            }
            if (data.DEF > 0) {
                arys.push({ text: "" + Language.P_FY + " : " + data.DEF + "\n" });
            }
            if (data.CROSS > 0) {
                arys.push({ text: "" + Language.P_CT + " : " + data.CROSS + "\n" });
            }
            return arys;
        };
        Object.defineProperty(HtmlUtil.prototype, "fixKey", {
            get: function () {
                return this._fixKey;
            },
            enumerable: true,
            configurable: true
        });
        HtmlUtil.prototype.initAttName = function () {
            this._fixKey = ["HP", "MP", "ATT", "DEF", "CROSS", "MPINIT"];
            this._attNameHash = {};
            this._attNameHash["HP"] = Language.P_SM; //生命
            this._attNameHash["MP"] = Language.P_MF;
            this._attNameHash["ATT"] = Language.P_GJ; //攻击
            this._attNameHash["DEF"] = Language.P_FY; //防御
            this._attNameHash["CROSS"] = Language.P_CT; //穿透
            this._attNameHash["HIT"] = Language.P_MZ; //命中
            this._attNameHash["EVD"] = Language.P_SB; //闪避
            this._attNameHash["CRI"] = Language.P_BJ; //暴击
            this._attNameHash["ANTICRI"] = Language.P_KB; //抗暴
            this._attNameHash["CRIDMG"] = Language.P_BS; //暴伤
            this._attNameHash["ANTICRIDMG"] = Language.P_RX; //韧性
            this._attNameHash["DMGINCR"] = Language.P_SHJS; //伤害加深
            this._attNameHash["DMGREDU"] = Language.P_SHJM; //伤害减免
            this._attNameHash["DMGINCRBOSS"] = Language.P_DBZS; //
            this._attNameHash["DMGREDUBOSS"] = Language.P_SBJS;
            this._attNameHash["CRIBOSS"] = Language.P_DBBJ;
            this._attNameHash["CRIDMGBOSS"] = Language.P_DBBS;
            this._attNameHash["EXATT"] = Language.P_GJJC; //攻击加成
            this._attNameHash["EXHP"] = Language.P_SMJC; //生命加成
            this._attNameHash["EXDEF"] = Language.P_FYJC; //防御加成
            this._attNameHash["EXCROSS"] = Language.P_CTJC; //穿透加成
            this._attNameHash["XPAngerPer"] = Language.P_XPNQHFSL;
            this._attNameHash["XPTimePer"] = Language.P_XPJNCXSJ;
            this._attNameHash["XPHurtPer"] = Language.P_XPDGWSH;
            this._attNameHash["XPHurtRolePer"] = Language.P_XPDRWSH;
            this._attNameHash["XPExtraHurt"] = Language.P_XPEWSH;
            this._attNameHash["CTRL"] = Language.P_KZ; //控制
            this._attNameHash["IGNORECTRL"] = Language.P_KK; //抗控
            this._attNameHash["HEAL"] = Language.P_ZL1; //治疗
            this._attNameHash["BEHEAL"] = Language.P_SL; //受疗
            this._attNameHash["WQPCT"] = Language.P_WQPCT;
            this._attNameHash["TKPCT"] = Language.P_TKPCT;
            this._attNameHash["YFPCT"] = Language.P_YFPCT;
            this._attNameHash["XLPCT"] = Language.P_XLPCT;
            this._attNameHash["STPCT"] = Language.P_STPCT;
            this._attNameHash["SZPCT"] = Language.P_SZPCT;
            this._attNameHash["YDPCT"] = Language.P_YDPCT;
            this._attNameHash["XZPCT"] = Language.P_XZPCT;
            this._attNameHash["RECOVERYMP"] = Language.P_NQHFJC;
            this._attNameHash["MPINIT"] = Language.P_CSNQZ;
        };
        HtmlUtil.prototype.getTemplateToAtts = function (tmp) {
            var atts = [];
            if (tmp == null)
                return atts;
            if (tmp.HP > 0) {
                atts.push(Language.P_SM + "_" + tmp.HP);
            }
            if (tmp.MP > 0) {
                atts.push(Language.P_MF + "_" + tmp.MP);
            }
            if (tmp.ATT > 0) {
                atts.push(Language.P_GJ + "_" + tmp.ATT);
            }
            if (tmp.DEF > 0) {
                atts.push(Language.P_FY + "_" + tmp.DEF);
            }
            if (tmp.CROSS > 0) {
                atts.push(Language.P_CT + "_" + tmp.CROSS);
            }
            if (tmp.MPINIT > 0) {
                atts.push(Language.P_CSNQZ + "_" + tmp.MPINIT);
            }
            if (tmp.CTRL > 0) {
                atts.push(Language.P_KZ + "_" + (tmp.WDR * .01).toFixed(2) + "%");
            }
            if (tmp.IGNORECTRL > 0) {
                atts.push(Language.P_KK + "_" + (tmp.WRE * .01).toFixed(2) + "%");
            }
            if (tmp.HEAL > 0) {
                atts.push(Language.P_ZL1 + "_" + (tmp.WDR * .01).toFixed(2) + "%");
            }
            if (tmp.BEHEAL > 0) {
                atts.push(Language.P_SL + "_" + (tmp.WRE * .01).toFixed(2) + "%");
            }
            if (tmp.HIT > 0) {
                atts.push(Language.P_MZ + "_" + (tmp.HIT * .01).toFixed(2) + "%");
            }
            if (tmp.EVD > 0) {
                atts.push(Language.P_SB + "_" + (tmp.EVD * .01).toFixed(2) + "%");
            }
            if (tmp.CRI > 0) {
                atts.push(Language.P_BJ + "_" + (tmp.CRI * .01).toFixed(2) + "%");
            }
            if (tmp.ANTICRI > 0) {
                atts.push(Language.P_KB + "_" + (tmp.ANTICRI * .01).toFixed(2) + "%");
            }
            if (tmp.CRIDMG > 0) {
                atts.push(Language.P_BS + "_" + (tmp.CRIDMG * .01).toFixed(2) + "%");
            }
            if (tmp.ANTICRIDMG > 0) {
                atts.push(Language.P_RX + "_" + (tmp.ANTICRIDMG * .01).toFixed(2) + "%");
            }
            if (tmp.DMGINCR > 0) {
                atts.push(Language.P_SHJS + "_" + (tmp.DMGINCR * .01).toFixed(2) + "%");
            }
            if (tmp.DMGREDU > 0) {
                atts.push(Language.P_SHJM + "_" + (tmp.DMGREDU * .01).toFixed(2) + "%");
            }
            if (tmp.DMGINCRBOSS > 0) {
                atts.push(Language.P_DBZS + "_" + (tmp.DMGINCRBOSS * .01).toFixed(2) + "%");
            }
            if (tmp.DMGREDUBOSS > 0) {
                atts.push(Language.P_SBJS + "_" + (tmp.DMGREDUBOSS * .01).toFixed(2) + "%");
            }
            if (tmp.CRIBOSS > 0) {
                atts.push(Language.P_DBBJ + "_" + (tmp.CRIBOSS * .01).toFixed(2) + "%");
            }
            if (tmp.CRIDMGBOSS > 0) {
                atts.push(Language.P_DBBS + "_" + (tmp.CRIDMGBOSS * .01).toFixed(2) + "%");
            }
            if (tmp.EXATT > 0) {
                atts.push(Language.P_GJJC + "_" + (tmp.EXATT * .01).toFixed(2) + "%");
            }
            if (tmp.EXHP > 0) {
                atts.push(Language.P_SMJC + "_" + (tmp.EXHP * .01).toFixed(2) + "%");
            }
            if (tmp.EXDEF > 0) {
                atts.push(Language.P_FYJC + "_" + (tmp.EXDEF * .01).toFixed(2) + "%");
            }
            if (tmp.EXCROSS > 0) {
                atts.push(Language.P_CTJC + "_" + (tmp.EXCROSS * .01).toFixed(2) + "%");
            }
            if (tmp.XPAngerPer > 0) {
                atts.push(Language.P_XPNQHFSL + "_" + (tmp.XPAngerPer * .01).toFixed(2) + "%");
            }
            if (tmp.XPTimePer > 0) {
                atts.push(Language.P_XPJNCXSJ + "_" + (tmp.XPTimePer * .01).toFixed(2) + "%");
            }
            if (tmp.XPHurtPer > 0) {
                atts.push(Language.P_XPDGWSH + "_" + (tmp.XPHurtPer * .01).toFixed(2) + "%");
            }
            if (tmp.XPHurtRolePer > 0) {
                atts.push(Language.P_XPDRWSH + "_" + (tmp.XPHurtRolePer * .01).toFixed(2) + "%");
            }
            if (tmp.XPExtraHurt > 0) {
                atts.push(Language.P_XPEWSH + "_" + tmp.XPExtraHurt);
            }
            if (tmp.WQPCT > 0) {
                atts.push(Language.P_WQPCT + "_" + (tmp.WQPCT * .01).toFixed(2) + "%");
            }
            if (tmp.TKPCT > 0) {
                atts.push(Language.P_TKPCT + "_" + (tmp.TKPCT * .01).toFixed(2) + "%");
            }
            if (tmp.YFPCT > 0) {
                atts.push(Language.P_YFPCT + "_" + (tmp.YFPCT * .01).toFixed(2) + "%");
            }
            if (tmp.XLPCT > 0) {
                atts.push(Language.P_XLPCT + "_" + (tmp.XLPCT * .01).toFixed(2) + "%");
            }
            if (tmp.STPCT > 0) {
                atts.push(Language.P_STPCT + "_" + (tmp.STPCT * .01).toFixed(2) + "%");
            }
            if (tmp.SZPCT > 0) {
                atts.push(Language.P_SZPCT + "_" + (tmp.SZPCT * .01).toFixed(2) + "%");
            }
            if (tmp.YDPCT > 0) {
                atts.push(Language.P_YDPCT + "_" + (tmp.YDPCT * .01).toFixed(2) + "%");
            }
            if (tmp.XZPCT > 0) {
                atts.push(Language.P_XZPCT + "_" + (tmp.XZPCT * .01).toFixed(2) + "%");
            }
            if (tmp.RECOVERYMP > 0) {
                atts.push(Language.P_NQHFJC + "_" + (tmp.RECOVERYMP * .01).toFixed(2) + "%");
            }
            if (typeof tmp == "string") {
                atts = tmp.split(";");
            }
            return atts;
        };
        HtmlUtil.prototype.getAttributeName = function (key) {
            return this._attNameHash[key] || key;
        };
        /**解析属性为  生命:+300 */
        HtmlUtil.prototype.showProperty = function (att, type) {
            if (type === void 0) { type = 1; }
            if (att) {
                var p = att.split("_");
                if (utils.htmlUtil.fixKey.indexOf(p[0]) == -1) {
                    p[1] = (parseInt(p[1]) * .01).toFixed(2) + "%";
                }
                if (type == 1) {
                    return utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_1SHUXING2, utils.htmlUtil.getAttributeName(p[0]), p[1]));
                }
                else {
                    return utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_1SHUXING21, utils.htmlUtil.getAttributeName(p[0]), p[1]));
                }
            }
            return [];
        };
        /** linefeed 是否换行*/
        HtmlUtil.prototype.getAttributes = function (config, linefeed) {
            if (linefeed === void 0) { linefeed = true; }
            var elements = [];
            if (!config)
                return elements;
            var atts = config.split(";");
            for (var i = 0; i < atts.length; i++) {
                if (linefeed) {
                    elements.push({ text: utils.htmlUtil.getAttributeFormat(atts[i], true) + "\n" });
                }
                else {
                    elements.push({ text: utils.htmlUtil.getAttributeFormat(atts[i]) + "   " });
                }
            }
            return elements;
        };
        HtmlUtil.prototype.getAttributeFormat = function (att, isAdd) {
            if (isAdd === void 0) { isAdd = false; }
            if (att) {
                var currStr = "";
                var p = att.split("_");
                if (utils.htmlUtil.fixKey.indexOf(p[0]) == -1) {
                    p[1] = (parseInt(p[1]) * .01).toFixed(2) + "%";
                }
                if (isAdd) {
                    currStr = utils.htmlUtil.getAttributeName(p[0]) + ":+" + p[1];
                }
                else {
                    currStr = utils.htmlUtil.getAttributeName(p[0]) + ":" + p[1];
                }
                return currStr;
            }
            return "";
        };
        HtmlUtil.prototype.getGrade = function (grade) {
            var gold = grade / 1000 >> 0;
            var grad = grade % 1000;
            if (gold > 0) {
                return Language.getExpression(Language.E_S12J, gold, grad);
            }
            return Language.getExpression(Language.E_1J, grad);
        };
        HtmlUtil.prototype.getTemplateAndNameToValue = function (strTemplate, strName) {
            var strArr = strTemplate.split(";");
            for (var i = 0; i < strArr.length; i++) {
                var tempStr = strArr[i].split("_");
                if (tempStr && tempStr[0] == strName) {
                    return tempStr[1] ? parseInt(tempStr[1]) : 0;
                }
            }
            return 0;
        };
        HtmlUtil.prototype.computeModelTatolFighting = function (str) {
            var strArr = str.split(";");
            var tatol = 0;
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i].split("_");
                if (this._100Base.indexOf(s[0]) != -1) {
                    tatol = tatol + parseInt(s[1]) * 100;
                }
                else {
                    if (s[0] == "HP") {
                        tatol = tatol + parseInt(s[1]) * 0.2;
                    }
                    else if (s[0] == "ATT") {
                        tatol = tatol + parseInt(s[1]) * 5;
                    }
                    else if (s[0] == "DEF") {
                        tatol = tatol + parseInt(s[1]) * 5;
                    }
                    else if (s[0] == "CROSS") {
                        tatol = tatol + parseInt(s[1]) * 5;
                    }
                    else if (s[0] == "DMGINCR") {
                        tatol = tatol + parseInt(s[1]) * 200;
                    }
                    else if (s[0] == "DMGREDU") {
                        tatol = tatol + parseInt(s[1]) * 200;
                    }
                    else if (s[0] == "HPRECOVERY") {
                        tatol = tatol + parseInt(s[1]) * 5;
                    }
                }
            }
            return Math.floor(tatol);
        };
        HtmlUtil.prototype.computeAttribute = function (str) {
            if (!str)
                return null;
            var obj = {};
            str.split(";").map(function (v, index) {
                var _a = v.split("_"), key = _a[0], value = _a[1];
                if (!obj[key])
                    obj[key] = [];
                obj[key].push(parseInt(value));
            });
            var result = [];
            for (var key in obj) {
                var total = 0;
                obj[key].map(function (v) { total += v; });
                obj[key] = Math.floor(total);
                result.push(key + "_" + total);
            }
            return result.join(';');
        };
        /**属性排序，生命->攻击->防御->穿透 */
        /**属性排序，命中->闪避->暴击->暴伤 */
        /**属性排序，抗暴->韧性->伤害加深->伤害减免 */
        /**属性排序，治疗->受疗->控制->抗控 */
        /**属性排序，生命加成->攻击加成->防御加成->穿透加成 */
        HtmlUtil.prototype.comAttributessorting = function (str) {
            var strArr = str.split(";");
            var tatol = [];
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i].split("_");
                if (s[0] == "HP") {
                    tatol[0] = strArr[i];
                }
                else if (s[0] == "ATT") {
                    tatol[1] = strArr[i];
                }
                else if (s[0] == "DEF") {
                    tatol[2] = strArr[i];
                }
                else if (s[0] == "CROSS") {
                    tatol[3] = strArr[i];
                }
                else if (s[0] == "HIT") {
                    tatol[4] = strArr[i];
                }
                else if (s[0] == "EVD") {
                    tatol[5] = strArr[i];
                }
                else if (s[0] == "CRI") {
                    tatol[6] = strArr[i];
                }
                else if (s[0] == "CRIDMG") {
                    tatol[7] = strArr[i];
                }
                else if (s[0] == "ANTICRI") {
                    tatol[8] = strArr[i];
                }
                else if (s[0] == "ANTICRIDMG") {
                    tatol[9] = strArr[i];
                }
                else if (s[0] == "DMGINCR") {
                    tatol[10] = strArr[i];
                }
                else if (s[0] == "DMGREDU") {
                    tatol[11] = strArr[i];
                }
                else if (s[0] == "HEAL") {
                    tatol[12] = strArr[i];
                }
                else if (s[0] == "BEHEAL") {
                    tatol[13] = strArr[i];
                }
                else if (s[0] == "CTRL") {
                    tatol[14] = strArr[i];
                }
                else if (s[0] == "IGNORECTRL") {
                    tatol[15] = strArr[i];
                }
                else if (s[0] == "EXHP") {
                    tatol[16] = strArr[i];
                }
                else if (s[0] == "EXATT") {
                    tatol[17] = strArr[i];
                }
                else if (s[0] == "EXDEF") {
                    tatol[18] = strArr[i];
                }
                else if (s[0] == "EXCROSS") {
                    tatol[19] = strArr[i];
                }
                else if (s[0] == "RECOVERYMP") {
                    tatol[19] = strArr[i];
                }
            }
            var strArrs = "";
            for (var j = 0; j < tatol.length; j++) {
                if (tatol[j]) {
                    if (strArrs) {
                        strArrs = strArrs + ";" + tatol[j];
                    }
                    else {
                        strArrs = strArrs + tatol[j];
                    }
                }
            }
            return strArrs;
        };
        return HtmlUtil;
    }());
    utils.HtmlUtil = HtmlUtil;
    __reflect(HtmlUtil.prototype, "utils.HtmlUtil");
    utils.htmlUtil = new HtmlUtil();
})(utils || (utils = {}));
