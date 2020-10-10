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
var renderer;
(function (renderer) {
    var PrivateChatCell = (function (_super) {
        __extends(PrivateChatCell, _super);
        function PrivateChatCell() {
            var _this = _super.call(this) || this;
            _this._offsetX = 0;
            _this._offsetY = 0;
            _this._h = 16;
            _this._pool = {};
            return _this;
        }
        PrivateChatCell.prototype.dataChanged = function () {
            this._pointArr = [];
            if (this.emojiBitmaps) {
                for (var _i = 0, _a = this.emojiBitmaps; _i < _a.length; _i++) {
                    var emoji = _a[_i];
                    this.toEmoji(emoji.key, emoji.bit);
                }
            }
            if (this.data) {
                this.imgOther.visible = false;
                this.otherChat.visible = false;
                this.imgMyself.visible = false;
                this.myselfChat.visible = false;
                this.myTime.visible = false;
                this.otherTime.visible = false;
                if (this.data.Type == 1) {
                    this.imgMyself.visible = true;
                    this.myselfChat.visible = true;
                    this.myselfChat.text = this.replaceEmoji(this.data.Message);
                    this.myTime.visible = true;
                    this.myTime.text = utils.DateUtil.formatDateFromSeconds(this.data.ChatTime);
                    this.myselfChat.validateNow();
                    this._tf = this.myselfChat;
                    if (this._pointArr.length > 0) {
                        this.emojiBitmaps = [];
                        this.addEmoji(this._pointArr);
                    }
                }
                else if (this.data.Type == 2) {
                    this.imgOther.visible = true;
                    this.otherChat.visible = true;
                    this.otherChat.text = this.replaceEmoji(this.data.Message);
                    this.otherTime.visible = true;
                    this.otherTime.text = utils.DateUtil.formatDateFromSeconds(this.data.ChatTime);
                    this.otherChat.validateNow();
                    this._tf = this.otherChat;
                    if (this._pointArr.length > 0) {
                        this.emojiBitmaps = [];
                        this.addEmoji(this._pointArr);
                    }
                }
            }
        };
        PrivateChatCell.prototype.addEmoji = function (emojiArr) {
            this._tf.validateNow();
            for (var _i = 0, emojiArr_1 = emojiArr; _i < emojiArr_1.length; _i++) {
                var emoji = emojiArr_1[_i];
                var bitmap = this.fromEmoji(emoji.key, emoji.res);
                bitmap.width = 24;
                bitmap.height = 24;
                if (this._tf.height != this._h && (this._tf.height - (bitmap.width - this._tf.size)) != this._h) {
                    this._offsetY = this._h + this._tf.top;
                }
                else {
                    this._offsetY = this._tf.top;
                }
                var withtext = this.data.Message.substring(0, emoji.index);
                var index = egret.sys.measureText(withtext, this._tf.fontFamily, 16, false, false);
                bitmap.x = index > this._tf.width - 24 ? (index - this._tf.width) + this._tf.left : index + this._tf.left;
                bitmap.y = this._offsetY;
                this._tf.parent.addChild(bitmap);
                this.emojiBitmaps.push({ key: emoji.key, bit: bitmap });
            }
        };
        PrivateChatCell.prototype.fromEmoji = function (key, res) {
            if (this._pool[key] && this._pool[key].length) {
                return this._pool[key].pop();
            }
            return new egret.Bitmap(RES.getRes(res));
        };
        PrivateChatCell.prototype.toEmoji = function (key, emoji) {
            if (!this._pool[key]) {
                this._pool[key] = [];
            }
            if (emoji.parent) {
                emoji.parent.removeChild(emoji);
            }
            this._pool[key].push(emoji);
        };
        PrivateChatCell.prototype.replaceEmoji = function (text) {
            var resultChar = "   ";
            while (true) {
                var index = text.search(/\[\w\]/g);
                if (index == -1) {
                    break;
                }
                var key = text.substring(index, text.indexOf(']', index) + 1);
                var res = TypeChatEmoji.getEmojiNameOfKey(key);
                if (res == "") {
                    break;
                }
                text = text.replace(key, resultChar);
                this._pointArr.push({
                    key: key,
                    index: index,
                    res: res
                });
            }
            return text;
        };
        return PrivateChatCell;
    }(ui.PrivateChatCellSkin));
    renderer.PrivateChatCell = PrivateChatCell;
    __reflect(PrivateChatCell.prototype, "renderer.PrivateChatCell");
})(renderer || (renderer = {}));
