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
var vo;
(function (vo) {
    var LocalVO = (function (_super) {
        __extends(LocalVO, _super);
        function LocalVO() {
            return _super.call(this) || this;
        }
        LocalVO.prototype.initialize = function (data, table) {
            this._template = GameModels.dataSet.getDataSettingById(data);
            this._value = this._template.value;
        };
        LocalVO.prototype.reset = function () {
        };
        // this._allPrizeIcon = [];
        // let strArr1:Array<string> = allPrize.value.split(";");
        // for(let i:number = 0;i<strArr1.length;i++){
        // 	this._allPrizeIcon.push({icon:null});
        // 	this._allPrizeIcon[i]["icon"] = (Templates.getTemplateById(templates.Map.ITEM,strArr1[i]).icon);
        // }
        LocalVO.prototype.getValue = function () {
            return this._value;
        };
        LocalVO.prototype.getTemplate = function () {
            return this._template;
        };
        LocalVO.prototype.getAllPrize = function () {
            // return this._allPrizeIcon;
        };
        return LocalVO;
    }(vo.VOBase));
    vo.LocalVO = LocalVO;
    __reflect(LocalVO.prototype, "vo.LocalVO");
})(vo || (vo = {}));
