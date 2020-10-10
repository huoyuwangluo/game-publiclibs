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
var main;
(function (main) {
    //////////////公告===========================================
    var MainPublicNotice = (function (_super) {
        __extends(MainPublicNotice, _super);
        function MainPublicNotice() {
            var _this = _super.call(this) || this;
            _this._speed = 1;
            return _this;
        }
        MainPublicNotice.prototype.initializeLayer = function (layer) {
            this._layer = layer;
            this.mask = new egret.Rectangle(0, 0, this.width, this.height);
            this._notifyList = [];
            this._isRuning = false;
            GameModels.chat.onHorseLamp(this, this.onSysChat);
            this.lab.addEventListener(egret.TextEvent.LINK, this.onLinkHandler, this);
        };
        MainPublicNotice.prototype.onSysChat = function (data) {
            this._notifyList.push(data);
            this.runQueue();
        };
        MainPublicNotice.prototype.runQueue = function () {
            if (this._isRuning)
                return;
            if (!this.parent) {
                this._layer.addChild(this);
                mg.stageManager.onResize(this, this.resize, true);
            }
            this._isRuning = true;
            this._data = this._notifyList.shift();
            this.lab.textFlow = this._data.content;
            this.start();
        };
        MainPublicNotice.prototype.start = function () {
            this.lab.x = 455;
            this._endX = -this.lab.width - 100;
            mg.stageManager.addTick(this, this.updateRender, 60);
        };
        MainPublicNotice.prototype.resize = function () {
            this.x = (mg.stageManager.stageWidth - this.width) / 2;
            this.y = 102;
        };
        MainPublicNotice.prototype.updateRender = function () {
            this.lab.x -= this._speed;
            if (this.lab.x < this._endX) {
                this.end();
            }
        };
        MainPublicNotice.prototype.end = function () {
            mg.stageManager.removeTick(this, this.updateRender);
            if (this._notifyList.length) {
                this._isRuning = false;
                this.runQueue();
                return;
            }
            this._isRuning = false;
            if (this.parent) {
                this.parent.removeChild(this);
                mg.stageManager.offResize(this, this.resize);
            }
        };
        MainPublicNotice.prototype.onLinkHandler = function (evt) {
            var chatData = this._data;
            var arr = evt.text.split('_');
            var type = arr[0];
            switch (type) {
                case vo.ChatVO.LINK_TYPE_OPENUI:
                    mg.uiManager.showByName(parseInt(arr[1]));
                    break;
                case vo.ChatVO.LINK_TYPE_OPENPLAYER:
                    GameModels.friends.getPromptInfo(chatData.id, utils.Handler.create(this, function (info, count) {
                        mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                    }));
                    break;
                case vo.ChatVO.LINK_TYPE_SENDMSG:
                    if (TypeGame.isCopy(app.gameContext.gameCurrent.type)) {
                        mg.alertManager.tip(Language.J_FBZWFQH);
                        return;
                    }
                    if ((app.gameContext.gameCurrent && app.gameContext.gameCurrent.type == TypeGame.CHAPTER_BOSS)) {
                        mg.alertManager.tip(Language.J_GKZWFQH);
                        return;
                    }
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    GameModels.copyMaterial.sendTeamJoin(chatData.id);
                    break;
            }
        };
        return MainPublicNotice;
    }(ui.MainPublicNoticeSkin));
    main.MainPublicNotice = MainPublicNotice;
    __reflect(MainPublicNotice.prototype, "main.MainPublicNotice");
})(main || (main = {}));
