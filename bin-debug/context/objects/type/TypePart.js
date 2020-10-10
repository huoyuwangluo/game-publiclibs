var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypePart = (function () {
    function TypePart() {
    }
    TypePart.getParts = function () {
        return [TypePart.SHADOW, TypePart.BODY, TypePart.WING, TypePart.WEAPON, TypePart.HORSE, TypePart.EFFECT, TypePart.FLYEFFECT];
    };
    TypePart.getSortIndex = function (part, direct, action, isHorseState) {
        switch (direct) {
            case TypeDirection.UP:
            case TypeDirection.LEFT_UP:
            case TypeDirection.RIGHT_UP:
                {
                    switch (part) {
                        case TypePart.SHADOW: return 0;
                        case TypePart.HORSE: return 1;
                        case TypePart.WEAPON: return 3;
                        case TypePart.BODY: return 2;
                        case TypePart.EFFECT: return 4;
                        case TypePart.WING: return 5;
                        case TypePart.FLYEFFECT: return 6;
                    }
                }
            case TypeDirection.LEFT:
            case TypeDirection.RIGHT:
                {
                    switch (part) {
                        case TypePart.SHADOW: return 0;
                        case TypePart.HORSE: return 1;
                        case TypePart.WING: return 2;
                        case TypePart.BODY: return 3;
                        case TypePart.WEAPON: return 4;
                        case TypePart.EFFECT: return 5;
                        case TypePart.FLYEFFECT: return 6;
                    }
                }
            case TypeDirection.LEFT_DOWN: //跑步跟待机不一样
            case TypeDirection.RIGHT_DOWN://跑步跟待机不一样
                {
                    if (action == TypeAction.IDLE && isHorseState == false) {
                        switch (part) {
                            case TypePart.SHADOW: return 0;
                            case TypePart.HORSE: return 1;
                            case TypePart.WING: return 2;
                            case TypePart.WEAPON: return 3;
                            case TypePart.BODY: return 4;
                            case TypePart.EFFECT: return 5;
                            case TypePart.FLYEFFECT: return 6;
                        }
                    }
                    else {
                        switch (part) {
                            case TypePart.SHADOW: return 0;
                            case TypePart.HORSE: return 1;
                            case TypePart.WING: return 2;
                            case TypePart.BODY: return 3;
                            case TypePart.WEAPON: return 4;
                            case TypePart.EFFECT: return 5;
                            case TypePart.FLYEFFECT: return 6;
                        }
                    }
                }
            case TypeDirection.DOWN:
                {
                    if (isHorseState == false) {
                        switch (part) {
                            case TypePart.SHADOW: return 0;
                            case TypePart.HORSE: return 1;
                            case TypePart.WING: return 2;
                            case TypePart.WEAPON: return 3;
                            case TypePart.BODY: return 4;
                            case TypePart.EFFECT: return 5;
                            case TypePart.FLYEFFECT: return 6;
                        }
                    }
                    else {
                        switch (part) {
                            case TypePart.SHADOW: return 0;
                            case TypePart.HORSE: return 1;
                            case TypePart.WING: return 2;
                            case TypePart.BODY: return 3;
                            case TypePart.WEAPON: return 4;
                            case TypePart.EFFECT: return 5;
                            case TypePart.FLYEFFECT: return 6;
                        }
                    }
                }
        }
        return part;
    };
    TypePart.SHADOW = 0;
    TypePart.BODY = 1;
    TypePart.WING = 2;
    TypePart.WEAPON = 3;
    TypePart.HORSE = 4;
    //跟刀特效
    TypePart.EFFECT = 5;
    //小飞龙特效
    TypePart.FLYEFFECT = 6;
    return TypePart;
}());
__reflect(TypePart.prototype, "TypePart");
