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
    var MailVO = (function (_super) {
        __extends(MailVO, _super);
        function MailVO() {
            var _this = _super.call(this) || this;
            _this._mailsEncosures = [];
            _this._mailTemplates = [];
            return _this;
        }
        MailVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        MailVO.prototype.decode = function (data) {
            if (!data)
                return;
            var strArr = data.split(";");
            for (var i = 0; i < strArr.length; i++) {
                var strArr1 = strArr[i].split("_");
                this._mailsEncosures.push({ id: Number(strArr1[0]), count: Number(strArr1[1]) });
                this._mailTemplates.push(this.getTemplate(this._mailsEncosures[i].id));
            }
        };
        MailVO.prototype.getTemplate = function (id) {
            var template;
            if (Math.floor(id / 100000) == 1) {
                template = Templates.getTemplateById(templates.Map.EQUIP, id);
            }
            else {
                template = Templates.getTemplateById(templates.Map.ITEM, id);
            }
            return template;
        };
        MailVO.prototype.getMailsEncosures = function () {
            return this._mailsEncosures;
        };
        MailVO.prototype.getMailTemplates = function () {
            return this._mailTemplates;
        };
        MailVO.prototype.getCount = function (index) {
            return this._mailsEncosures[index].count;
        };
        MailVO.prototype.reset = function () {
            this._mailTemplates = [];
            this._mailsEncosures = [];
        };
        return MailVO;
    }(vo.VOBase));
    vo.MailVO = MailVO;
    __reflect(MailVO.prototype, "vo.MailVO");
})(vo || (vo = {}));
