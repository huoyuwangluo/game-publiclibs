var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeAction = (function () {
    function TypeAction() {
    }
    TypeAction.getFrameRate = function (typeActor, action) {
        switch (typeActor) {
            case TypeActor.ROBOT:
            case TypeActor.PLAYER: {
                switch (action) {
                    case TypeAction.IDLE: return 6;
                    case TypeAction.ATTACK0: return 12;
                    case TypeAction.ATTACK1: return 12;
                    case TypeAction.ATTACK6: return 12;
                    case TypeAction.ATTACK10: return 12;
                    case TypeAction.RUN: return 12;
                    case TypeAction.PICK: return 12;
                }
            }
            case TypeActor.PET: {
                switch (action) {
                    case TypeAction.IDLE: return 6;
                    case TypeAction.ATTACK0: return 12;
                    case TypeAction.RUN: return 12;
                }
            }
            case TypeActor.MONSTER: {
                switch (action) {
                    case TypeAction.IDLE: return 6;
                    case TypeAction.ATTACK0:
                    case TypeAction.ATTACK1:
                    case TypeAction.ATTACK6:
                        return 12;
                    case TypeAction.RUN:
                        return 12;
                }
            }
            case TypeActor.BOSS: {
                switch (action) {
                    case TypeAction.IDLE: return 6;
                    case TypeAction.ATTACK0:
                    case TypeAction.ATTACK1:
                    case TypeAction.ATTACK6: return 10;
                    case TypeAction.RUN: return 12;
                }
            }
        }
        return 6;
    };
    TypeAction.getTotalFrame = function (typeActor, job, action) {
        switch (typeActor) {
            case TypeActor.ROBOT:
            case TypeActor.PLAYER:
                {
                    switch (job) {
                        case TypeJob.ZHAN: {
                            switch (action) {
                                case TypeAction.IDLE: return 6;
                                case TypeAction.RUN: return 8;
                                case TypeAction.ATTACK0: return 7;
                                case TypeAction.ATTACK1: return 7;
                                case TypeAction.ATTACK6: return 10;
                                case TypeAction.ATTACK10: return 8;
                                case TypeAction.PICK: return 6;
                                case TypeAction.DEAD: return 1;
                            }
                        }
                    }
                }
                break;
            case TypeActor.PET:
                {
                    switch (action) {
                        case TypeAction.IDLE: return 4;
                        case TypeAction.ATTACK0: return 5;
                        case TypeAction.RUN: return 4;
                    }
                }
                break;
            case TypeActor.BOSS:
                break;
            case TypeActor.MONSTER:
                break;
        }
        return 1;
    };
    TypeAction.IDLE = "0000";
    TypeAction.RUN = "0200";
    TypeAction.ATTACK0 = "0300";
    TypeAction.ATTACK1 = "0301";
    TypeAction.ATTACK6 = "0306";
    TypeAction.ATTACK10 = "0310";
    TypeAction.PICK = "0350";
    TypeAction.DEAD = "0800";
    TypeAction.IDLE_NAME = "idel";
    TypeAction.RUN_NAME = "run";
    TypeAction.ATTACK_NAME = "attack";
    TypeAction.PICK_NAME = "pick";
    TypeAction.DEAD_NAME = "dead";
    TypeAction.FLASH_NAME = "flash";
    TypeAction.BACK_NAME = "back";
    return TypeAction;
}());
__reflect(TypeAction.prototype, "TypeAction");
