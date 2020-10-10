var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RollNumChuange = (function () {
    function RollNumChuange() {
        this._path = "";
        this._width = 24;
        this._height = 34;
    }
    RollNumChuange.prototype.ctor = function (path, width, height) {
        if (path) {
            this._path = path;
        }
        if (width) {
            this._width = width;
        }
        if (height) {
            this._height = height;
        }
        this._numtab = [];
        this._lastnum = 0;
        this._index = null;
        this._timeriD = null;
        this._Atlas = null;
    };
    RollNumChuange.prototype.SetAtlas = function (atlas) {
        this._Atlas = null;
        this._Atlas = atlas;
    };
    RollNumChuange.prototype.InitRollNumBer = function (curr) {
        if (this._Atlas) {
            this._Atlas.text = curr.toString();
        }
    };
    RollNumChuange.prototype.OnFightChange = function (curr, last) {
        this._numtab = [];
        this._lastnum = 0;
        if (curr && last) {
            this._lastnum = last;
            var newtab = this.DecomposNumber(curr);
            var lasttab = this.DecomposNumber(last);
            var index = lasttab.length;
            var pos = 1;
            for (var i = 0; i < index; i++) {
                var posnum = 0;
                for (var j = 1; j <= index; j++) {
                    if (j <= pos)
                        posnum = posnum + newtab[j - 1] * Math.pow(10, j - 1);
                    else
                        posnum = posnum + lasttab[j - 1] * Math.pow(10, j - 1);
                }
                this._numtab.push(posnum);
                pos = pos + 1;
            }
            var starnum = index + 1;
            for (var i = starnum; i <= newtab.length; i++) {
                var nowcurr = 0;
                for (var j = 0; j < starnum; j++) {
                    nowcurr = nowcurr + newtab[j] * Math.pow(10, j);
                }
                this._numtab.push(nowcurr);
                starnum = starnum + 1;
            }
        }
        this._index = 0;
        this.ControlFight();
    };
    RollNumChuange.prototype.ControlFight = function () {
        if (this._Atlas && this._numtab[this._index]) {
            var nownum = this._numtab[this._index];
            this.FightChangeString(nownum);
        }
        else {
            this.UnscheduleAll();
        }
    };
    RollNumChuange.prototype.FightChangeString = function (endnum) {
        var _this = this;
        var Rolling = false;
        this.UnscheduleAll();
        var nownum = this._lastnum;
        var NumArray = this.DecomposNumber(nownum);
        var maxcurr = this.CalculationAndMax(NumArray, this._index);
        var mincurr = this.CalculationAndMin(NumArray, this._index);
        var minarray = this.DecomposNumber(mincurr);
        var minindex = minarray.length;
        var UpdateNumber = function () {
            if (Rolling && nownum == endnum) {
                Rolling = false;
                _this._lastnum = endnum;
                _this._Atlas.text = endnum.toString();
                _this._index = _this._index + 1;
                _this.ControlFight();
            }
            else {
                if (nownum == endnum) {
                    _this._Atlas.text = nownum.toString();
                    Rolling = true;
                }
                else {
                    if (nownum < endnum) {
                        _this._Atlas.text = nownum.toString();
                        nownum = nownum + 1 * Math.pow(10, _this._index);
                        if (nownum == endnum) {
                            Rolling = true;
                        }
                    }
                    else {
                        if (nownum <= maxcurr) {
                            _this._Atlas.text = nownum.toString();
                            nownum = nownum + 1 * Math.pow(10, _this._index);
                            if (nownum > maxcurr) {
                                nownum = mincurr;
                            }
                            if (nownum == endnum) {
                                Rolling = true;
                            }
                        }
                        else {
                            var numstr = "";
                            if (minindex <= _this._index) {
                                for (var i = 1; i <= _this._index; i++) {
                                    numstr = "0" + numstr.toString();
                                }
                            }
                            numstr = numstr + mincurr.toString();
                            _this._Atlas.text = numstr.toString();
                            nownum = mincurr + 1 * Math.pow(10, _this._index);
                            if (nownum == endnum) {
                                Rolling = true;
                            }
                        }
                    }
                }
            }
        };
        this._timeriD = egret.setInterval(UpdateNumber, this, 15);
        UpdateNumber();
    };
    RollNumChuange.prototype.UnscheduleAll = function () {
        if (this._timeriD) {
            egret.clearInterval(this._timeriD);
            this._timeriD = 0;
        }
    };
    RollNumChuange.prototype.CalculationAndMin = function (NumArray, index) {
        var mincurr = 0;
        NumArray = NumArray && NumArray || [];
        for (var i = 0; i < NumArray.length; i++) {
            if (i == index) {
                mincurr = mincurr;
            }
            else {
                mincurr = mincurr + NumArray[i] * Math.pow(10, i);
            }
        }
        return mincurr;
    };
    RollNumChuange.prototype.CalculationAndMax = function (NumArray, index) {
        var maxcurr = 0;
        NumArray = NumArray && NumArray || [];
        for (var i = 0; i < NumArray.length; i++) {
            if (i == index) {
                maxcurr = maxcurr + 9 * Math.pow(10, i);
            }
            else {
                maxcurr = maxcurr + NumArray[i] * Math.pow(10, i);
            }
        }
        return maxcurr;
    };
    RollNumChuange.prototype.DecomposNumber = function (num) {
        var numarray = [];
        var lastnum = num;
        var newnum = 0;
        while (lastnum > 0) {
            newnum = lastnum % 10;
            numarray.push(newnum);
            lastnum = Math.floor(lastnum / 10);
        }
        return numarray;
    };
    RollNumChuange.prototype.reverse = function (str) {
        if (str.length == 0)
            return null;
        var i = str.length;
        var dstr = "";
        while (--i >= 0) {
            dstr += str.charAt(i);
        }
        return dstr;
    };
    return RollNumChuange;
}());
__reflect(RollNumChuange.prototype, "RollNumChuange");
