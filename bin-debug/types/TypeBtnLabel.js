var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeBtnLabel = (function () {
    function TypeBtnLabel() {
    }
    TypeBtnLabel.getLabel = function (type) {
        switch (type) {
            case TypeBtnLabel.GOTO: return { ok: Language.C_QW, cancel: Language.C_QX };
            case TypeBtnLabel.OK: return { ok: Language.C_QD, cancel: Language.C_QX };
            case TypeBtnLabel.BUY: return { ok: Language.C_GM, cancel: Language.C_QX };
            case TypeBtnLabel.VIEW: return { ok: Language.C_LJCK, cancel: Language.C_QX };
            case TypeBtnLabel.RECHARGE: return { ok: Language.C_CZ, cancel: Language.C_QX };
            case TypeBtnLabel.GOTO_MELT: return { ok: Language.C_QWRL, cancel: Language.C_QX };
            case TypeBtnLabel.OK_SIGIN: return { ok: Language.C_QD, cancel: "" };
            case TypeBtnLabel.GO: return { ok: Language.C_LJCK, cancel: "" };
            case TypeBtnLabel.BAOLIIU: return { ok: Language.C_BL, cancel: Language.C_BBL };
            case TypeBtnLabel.GOTO_MELT1: return { ok: Language.C_KSRL, cancel: Language.C_QX };
            case TypeBtnLabel.GOTO_HUISHOU: return { ok: Language.C_QWTH, cancel: Language.C_JXRL };
            case TypeBtnLabel.GOTO_SHENGZHI: return { ok: Language.C_QWSZ, cancel: Language.C_JXZS };
            case TypeBtnLabel.GOTO_QIANGZHENG: return { ok: Language.C_QWSZ, cancel: Language.C_JXQZ };
            case TypeBtnLabel.I_KNOW: return { ok: Language.J_ZZDL, cancel: "" };
        }
        return null;
    };
    /**取消 前往（2个按钮）*/
    TypeBtnLabel.GOTO = 1;
    /**取消 确定（2个按钮）*/
    TypeBtnLabel.OK = 2;
    /**取消 购买（2个按钮）*/
    TypeBtnLabel.BUY = 3;
    /**取消 立即查看（2个按钮）*/
    TypeBtnLabel.VIEW = 4;
    /**取消 充值（2个按钮）*/
    TypeBtnLabel.RECHARGE = 5;
    /**取消 前往熔炼（2个按钮）*/
    TypeBtnLabel.GOTO_MELT = 6;
    /**确定（1个按钮）*/
    TypeBtnLabel.OK_SIGIN = 7;
    /**立即查看 （1个按钮） */
    TypeBtnLabel.GO = 8;
    /**不保留 保留（2个按钮）*/
    TypeBtnLabel.BAOLIIU = 9;
    /**取消 快速熔炼（2个按钮）*/
    TypeBtnLabel.GOTO_MELT1 = 10;
    /**继续回收 前往替换（2个按钮）*/
    TypeBtnLabel.GOTO_HUISHOU = 11;
    /**继续征收 前往圣旨（2个按钮）*/
    TypeBtnLabel.GOTO_SHENGZHI = 12;
    /**继续强征 前往圣旨（2个按钮）*/
    TypeBtnLabel.GOTO_QIANGZHENG = 13;
    /**朕知道了（1个按钮）*/
    TypeBtnLabel.I_KNOW = 14;
    return TypeBtnLabel;
}());
__reflect(TypeBtnLabel.prototype, "TypeBtnLabel");
