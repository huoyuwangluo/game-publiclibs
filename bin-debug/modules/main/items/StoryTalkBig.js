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
    var StoryTalkBig = (function (_super) {
        __extends(StoryTalkBig, _super);
        function StoryTalkBig() {
            var _this = _super.call(this) || this;
            _this._isFinish = false;
            _this._talkStr = "";
            _this._talkLen = 0;
            _this._curLen = 0;
            return _this;
        }
        StoryTalkBig.prototype.clear = function () {
            this.labNameLeft.text = "";
            this.labNameRight.text = "";
            this.talkLB.text = "";
            this.headLeft.reset();
            this.headRight.reset();
            this.headLeft.visible = false;
            this.headRight.visible = false;
            this._isFinish = false;
            if (this._finishTag) {
                if (this._finishTag.parent) {
                    this._finishTag.parent.removeChild(this._finishTag);
                }
                this._finishTag.stop();
                utils.ObjectPool.to(this._finishTag, true);
                this._finishTag = null;
            }
        };
        StoryTalkBig.prototype.setInfo = function (info) {
            this.clear();
            if (info) {
                this.setTalkText(info.talk);
                if (info.playSound)
                    mg.soundManager.playSoundStopLast(info.playSound);
                if (info.direction == 0) {
                    //左
                    this.imgBg.scaleX = -1;
                    this.headLeft.visible = true;
                    if (info.nameId) {
                        this.labNameLeft.text = info.nameId;
                        this.headLeft.setPetBody(info.BustId.toString(), true, false);
                    }
                    else {
                        if (info.teamId == 117 || info.teamId == 119) {
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, GameModels.guide.clinetPetId);
                            this.labNameLeft.text = pet ? pet.name : "";
                            this.headLeft.setPetBody(pet ? pet.model : "1101", true, false);
                        }
                        else {
                            this.labNameLeft.text = info.nameId;
                            this.headLeft.setPetBody(info.BustId.toString(), true, false);
                        }
                    }
                }
                else {
                    //右
                    this.imgBg.scaleX = 1;
                    this.headRight.visible = true;
                    if (info.nameId) {
                        this.labNameRight.text = info.nameId;
                        this.headRight.setPetBody(info.BustId.toString(), true, false);
                    }
                    else {
                        if (info.teamId == 117 || info.teamId == 119) {
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, GameModels.guide.clinetPetId);
                            this.labNameRight.text = pet ? pet.name : "";
                            this.headRight.setPetBody(pet ? pet.model : "1101", true, false);
                        }
                        else {
                            this.labNameRight.text = info.nameId;
                            this.headRight.setPetBody(info.BustId.toString(), true, false);
                        }
                    }
                }
            }
        };
        StoryTalkBig.prototype.setTalkText = function (txt) {
            this._talkStr = txt;
            this._talkLen = txt.length;
            this._curLen = 0;
            utils.timer.loop(30, this, this.refreshTalkText, true);
        };
        StoryTalkBig.prototype.refreshTalkText = function () {
            this._curLen += 1;
            if (this._curLen >= this._talkLen) {
                this.onTalkFinish();
            }
            else {
                this.talkLB.text = this._talkStr.substr(0, this._curLen);
            }
        };
        StoryTalkBig.prototype.onTalkFinish = function () {
            this.talkLB.text = this._talkStr;
            utils.timer.clear(this, this.refreshTalkText);
            this._isFinish = true;
            if (!this._finishTag) {
                this._finishTag = this.fromEffect('6100');
                this._finishTag.x = 550;
                this._finishTag.y = 550;
                this._finishTag.play();
                this.addChild(this._finishTag);
            }
        };
        Object.defineProperty(StoryTalkBig.prototype, "isFinish", {
            get: function () {
                return this._isFinish;
            },
            enumerable: true,
            configurable: true
        });
        return StoryTalkBig;
    }(ui.StoryTalkBigSkin));
    main.StoryTalkBig = StoryTalkBig;
    __reflect(StoryTalkBig.prototype, "main.StoryTalkBig");
})(main || (main = {}));
