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
    var StoryTalk = (function (_super) {
        __extends(StoryTalk, _super);
        function StoryTalk() {
            var _this = _super.call(this) || this;
            _this._isFinish = false;
            _this._talkStr = "";
            _this._talkLen = 0;
            _this._curLen = 0;
            _this._finishTag = _this.fromEffect('29001');
            _this._finishTag.x = 385;
            _this._finishTag.y = 70;
            _this._finishTag.frameRate = 6;
            _this._finishTag.stop();
            _this.addChild(_this._finishTag);
            return _this;
        }
        StoryTalk.prototype.clear = function () {
            this.nameLB.text = "";
            this.talkLB.text = "";
            this._talkStr = "";
            this._isFinish = false;
            this._finishTag.stop();
            this._finishTag.visible = false;
        };
        StoryTalk.prototype.setInfo = function (info) {
            if (info.BustId > 0) {
                var tpl = Templates.getTemplateById(templates.Map.DATAMODEL, info.BustId);
                /*if(tpl)
                {
                    this.setNameText(tpl.name);
                }
                else
                {
                    this.setNameText("");
                }*/
                this.setNameText(info.nameId);
                this.head.setGeneralHeadInfo(tpl.resId, 0, true);
                var petTpl = Templates.getTemplateByProperty(templates.Map.GENERAL, "model", tpl.resId);
                if (petTpl) {
                    this.head.setGeneralHeadInfo(parseInt(petTpl.model), 0, true, petTpl);
                }
            }
            else {
                this.setNameText(GameModels.user.player.name);
                this.head.setHeadInfo(GameModels.user.player.headIcon, 0, true);
            }
            if (info.direction == 0) {
                this.nameLB.textColor = 0xFFE431;
                this.nameLB.textAlign = "left";
                this.nameLB.left = 105;
                this.head.left = 0;
                this.talkLB.textAlign = "left";
                this.talkLB.left = 105;
                this.talkBG.left = 50;
                this.talkBG.scaleX = 1;
                this._finishTag.x = 385;
                //this.talkBG.scaleX = 1;
                //this.talkLB.textColor = 0xFFFFFF;
            }
            else {
                this.nameLB.textColor = 0x10FFCF;
                this.nameLB.textAlign = "right";
                this.nameLB.left = 395;
                this.head.left = 498;
                this.talkLB.textAlign = "left";
                this.talkLB.left = 235;
                this.talkBG.left = 150;
                this.talkBG.scaleX = -1;
                this._finishTag.x = 215;
                //this.talkBG.scaleX = -1;
                //this.talkLB.textColor = 0x00FFFF;
            }
            this.setTalkText(info.talk);
        };
        StoryTalk.prototype.setNameText = function (txt) {
            this.nameLB.text = txt;
        };
        StoryTalk.prototype.setTalkText = function (txt) {
            this._talkStr = txt;
            this._talkLen = txt.length;
            this._curLen = 0;
            //utils.timer.loop(30, this, this.refreshTalkText, true);
            this.onTalkFinish();
        };
        StoryTalk.prototype.refreshTalkText = function () {
            this._curLen += 1;
            if (this._curLen >= this._talkLen) {
                this.onTalkFinish();
            }
            else {
                this.talkLB.text = this._talkStr.substr(0, this._curLen);
            }
        };
        StoryTalk.prototype.onHideFinishTag = function () {
            this._finishTag.stop();
            this._finishTag.visible = false;
        };
        StoryTalk.prototype.onTalkFinish = function () {
            this.talkLB.text = this._talkStr;
            utils.timer.clear(this, this.refreshTalkText);
            this._isFinish = true;
            this._finishTag.visible = true;
            this._finishTag.play();
        };
        StoryTalk.prototype.getIsFinish = function () {
            return this._isFinish;
        };
        return StoryTalk;
    }(ui.StoryTalkSkin));
    main.StoryTalk = StoryTalk;
    __reflect(StoryTalk.prototype, "main.StoryTalk");
})(main || (main = {}));
