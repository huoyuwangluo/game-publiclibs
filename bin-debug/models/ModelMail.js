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
    var ModelMail = (function (_super) {
        __extends(ModelMail, _super);
        function ModelMail() {
            var _this = _super.call(this) || this;
            _this._hasNewMail = 0;
            return _this;
        }
        ModelMail.prototype.initAndtoPool = function () {
            if (!this._mailDataVO)
                this._mailDataVO = [];
            vo.toPoolList(this._mailDataVO);
            this._mailDataVO.length = 0;
        };
        ModelMail.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._mailDataVO = [];
            this.onRoute(n.MessageMap.G2C_MAIL_HASNEWMAIL, utils.Handler.create(this, function (data) {
                _this._hasNewMail = data.HasNewMain;
                GameModels.state.updateState(GameRedState.MAIL_ONEGET);
                GameModels.state.updateState(GameRedState.MAIN_MAIL);
            }));
        };
        ModelMail.prototype.initMailRet = function (hasNewMail) {
            this._hasNewMail = hasNewMail;
            var cmd = n.MessagePool.from(n.C2G_GeneralTask_OnLogin);
            this.notify(n.MessageMap.C2G_GENERALTASK_ONLOGIN, cmd);
        };
        ModelMail.prototype.allEncosureItemData = function (data) {
            this.initAndtoPool();
            for (var i = 0; i < data.length; i++) {
                var mailVO = vo.fromPool(vo.MailVO);
                mailVO.decode(data[i].Item);
                this._mailDataVO.push(mailVO);
            }
        };
        ModelMail.prototype.checkMailRed = function () {
            return this._hasNewMail == 0 ? false : true;
        };
        ModelMail.prototype.mailEncosureItemData = function (data) {
            this._oneMailDataVO ? vo.toPool(this._oneMailDataVO) : null;
            var mailVO = vo.fromPool(vo.MailVO);
            mailVO.decode(data.Item);
            this._oneMailDataVO = mailVO;
            return this._oneMailDataVO;
        };
        ModelMail.prototype.getMails = function () {
            return this._mailDataVO;
        };
        ModelMail.prototype.getMail = function () {
            return this._oneMailDataVO;
        };
        ModelMail.prototype.getMailList = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_MAIL_LIST, n.MessagePool.from(n.C2G_Mail_List), utils.Handler.create(this, function (data) {
                data.autoRecover = false;
                _this.allEncosureItemData(data.Mails);
                GameModels.state.updateState(GameRedState.MAIL_ONEGET);
                GameModels.state.updateState(GameRedState.MAIN_MAIL);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        ModelMail.prototype.regsterMailRead = function (mailId, handler) {
            var msg = n.MessagePool.from(n.C2G_Mail_Read);
            msg.MailId = mailId;
            this.request(n.MessageMap.C2G_MAIL_READ, msg, handler);
        };
        ModelMail.prototype.regsterMailDelete = function (mailId, handler) {
            var msg = n.MessagePool.from(n.C2G_Mail_Delect);
            msg.MailId = mailId;
            this.request(n.MessageMap.C2G_MAIL_DELECT, msg, handler);
        };
        ModelMail.prototype.regsterMailReceive = function (mailId, handler) {
            var msg = n.MessagePool.from(n.C2G_Mail_Receive);
            msg.MailId = mailId;
            this.request(n.MessageMap.C2G_MAIL_RECEIVE, msg, handler);
        };
        return ModelMail;
    }(mo.ModelBase));
    mo.ModelMail = ModelMail;
    __reflect(ModelMail.prototype, "mo.ModelMail");
})(mo || (mo = {}));
