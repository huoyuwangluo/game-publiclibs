var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeChatEmoji = (function () {
    function TypeChatEmoji() {
    }
    TypeChatEmoji.getEmojiNameOfKey = function (key) {
        for (var _i = 0, _a = this.emojis; _i < _a.length; _i++) {
            var emoji = _a[_i];
            if (key == emoji.key) {
                return this.getResOfId(emoji.id);
            }
        }
        return "";
    };
    TypeChatEmoji.getEmojiKeyOfName = function (res) {
        for (var _i = 0, _a = this.emojis; _i < _a.length; _i++) {
            var emoji = _a[_i];
            if (res == this.getResOfId(emoji.id)) {
                return emoji.key;
            }
        }
        return "";
    };
    TypeChatEmoji.getResOfId = function (id) {
        return "chatEmoji_json.icon" + id;
    };
    TypeChatEmoji.getEmojiIdOfKey = function (key) {
        for (var _i = 0, _a = this.emojis; _i < _a.length; _i++) {
            var emoji = _a[_i];
            if (key == emoji.key) {
                return emoji.id;
            }
        }
        return 1;
    };
    TypeChatEmoji.emojis = [
        {
            id: 1,
            key: "[a]"
        },
        {
            id: 2,
            key: "[b]"
        },
        {
            id: 3,
            key: "[c]"
        },
        {
            id: 4,
            key: "[d]"
        },
        {
            id: 5,
            key: "[e]"
        },
        {
            id: 6,
            key: "[f]"
        },
        {
            id: 7,
            key: "[g]"
        }, {
            id: 8,
            key: "[h]"
        }, {
            id: 9,
            key: "[j]"
        }, {
            id: 10,
            key: "[k]"
        }, {
            id: 11,
            key: "[l]"
        }, {
            id: 12,
            key: "[m]"
        }, {
            id: 13,
            key: "[n]"
        }, {
            id: 14,
            key: "[o]"
        }, {
            id: 15,
            key: "[p]"
        }, {
            id: 16,
            key: "[q]"
        }, {
            id: 17,
            key: "[r]"
        }, {
            id: 18,
            key: "[s]"
        }
    ];
    TypeChatEmoji.emoji_static = new egret.EmojiPlugin(new egret.EmojiConfig([
        { key: 'a', res: 'chatEmoji_json.icon1' },
        { key: 'b', res: 'chatEmoji_json.icon2' },
        { key: 'c', res: 'chatEmoji_json.icon3' },
        { key: 'd', res: 'chatEmoji_json.icon4' },
        { key: 'e', res: 'chatEmoji_json.icon5' },
        { key: 'f', res: 'chatEmoji_json.icon6' },
        { key: 'g', res: 'chatEmoji_json.icon7' },
        { key: 'h', res: 'chatEmoji_json.icon8' },
        { key: 'j', res: 'chatEmoji_json.icon9' },
        { key: 'k', res: 'chatEmoji_json.icon10' },
        { key: 'l', res: 'chatEmoji_json.icon11' },
        { key: 'm', res: 'chatEmoji_json.icon12' },
        { key: 'n', res: 'chatEmoji_json.icon13' },
        { key: 'o', res: 'chatEmoji_json.icon14' },
        { key: 'p', res: 'chatEmoji_json.icon15' },
        { key: 'q', res: 'chatEmoji_json.icon16' },
        { key: 'r', res: 'chatEmoji_json.icon17' },
        { key: 's', res: 'chatEmoji_json.icon18' },
    ], 6, -1), 2);
    return TypeChatEmoji;
}());
__reflect(TypeChatEmoji.prototype, "TypeChatEmoji");
