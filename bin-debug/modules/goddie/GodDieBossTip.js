// class GodDieBossTip extends ui.GodDieBossInfoSkin implements IAlert {
// 	private _imagExhibitor: components.FlipExhibitor;
// 	private _rewards: components.RewardItemBox[];
// 	private _pointX: number = 200;
// 	private _pointY: number = 327;
// 	public constructor() {
// 		super();
// 	}
// 	public show(data: any/*n.ProtoShenYunZhiDiBoss*/): void {
// 		if (data) {
// 			this._rewards = [this.reward0, this.reward1, this.reward2, this.reward3];
// 			var bossData = GameModels.sceneGodDie.getMonsterData(data.MonsterId);
// 			var copyData = GameModels.sceneGodDie.getCopyData(data.CopyId);
// 			this.imgModel.source = ResPath.getShowBossPath(bossData.resId);
// 			var point: any = GameModels.copyBoss.getShowPoint(bossData.resId);
// 			this.imgModel.x = this._pointX + (point.x - 600) * 0.6;
// 			this.imgModel.y = this._pointY + (point.y - 600) * 0.6;
// 			this.labVP.text = bossData.parm2;
// 			this.nameLab.text = bossData.name;
// 			var list: any[] = bossData.parm1.split(";");
// 			for (var i = 0; i < this._rewards.length; i++) {
// 				if (list[i]) {
// 					this._rewards[i].dataSource = (list[i] + "_" + 0);
// 					this._rewards[i].visible = true;
// 				} else {
// 					this._rewards[i].visible = false;
// 				}
// 			}
// 			var tmp: templates.dataSetting = GameModels.dataSet.getDataSettingById(1201001);
// 			this.labRefresh.text = utils.DateUtil.formatTimeLeft(parseInt(tmp.value));
// 		}
// 		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
// 	}
// 	private btnUpSureClick(e: egret.TouchEvent): void {
// 		this.dispatchEventWith(egret.Event.CLOSE);
// 	}
// 	public hide(): void {
// 		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
// 		if (this.parent) {
// 			this.parent.removeChild(this);
// 		}
// 	}
// }                          
