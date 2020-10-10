// module login {
// 	export class CreateActorView extends base.View {
// 		public back: eui.Image;
// 		public btnEnter: components.SnapButton;
// 		public btnRandom: components.SnapButton;
// 		public input: eui.TextInput;
// 		// public jobGroup: eui.Group;
// 		public title: eui.Group;
// 		public text1: eui.Label;
// 		public text2: eui.Label;
// 		public text3: eui.Label;
// 		public text4: eui.Label;
// 		private _particles: particle.GravityParticleSystem[];
// 		public constructor() {
// 			super();
// 			this.skinName = `<?xml version="1.0" encoding="utf-8"?>
// <e:Skin class="CreatePlayerSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:components="components.*" width="600" height="1080">
// 	<e:Image id="back" horizontalCenter="0" source="create_back_jpg" anchorOffsetX="0" anchorOffsetY="0" y="0" width="600" height="1080"/>
// 	<components:SnapButton id="btnEnter" label="" horizontalCenter="1" anchorOffsetX="122" anchorOffsetY="33" bottom="80">
// 		<components:skinName>
// 		<e:Skin states="up,down,disabled">
// 			<e:Image width="100%" height="100%" source="create_json.btn_create_enter"/>
// 			<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>
// 		</e:Skin>
// 		</components:skinName>
// 	</components:SnapButton>
// 	<components:SnapButton id="btnRandom" label="" anchorOffsetX="32" anchorOffsetY="32" horizontalCenter="183" bottom="199">
// 		<components:skinName>
// 			<e:Skin states="up,down,disabled">
// 			<e:Image width="100%" height="100%" source="create_json.btn_create_sieve"/>
// 			<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>
// 			</e:Skin>
// 		</components:skinName>
// 	</components:SnapButton>
// 	<e:TextInput id="input" anchorOffsetX="0" anchorOffsetY="0" horizontalCenter="0" bottom="205">
// 		<e:skinName>
// 			<e:Skin minHeight="40" minWidth="300" states="normal,disabled,normalWithPrompt,disabledWithPrompt">
// 			<e:Image x="0" y="0" anchorOffsetX="0" width="300" scale9Grid="12,11,16,27" source="create_json.btn_create_text_back1"/>
// 			<e:Rect height="49" width="100%" fillColor="0x000000" fillAlpha="0" anchorOffsetY="0" y="4"/>
// 			<e:EditableText id="textDisplay" textColor.disabled="0xff0000" width="280" height="24" size="24" horizontalCenter="0" verticalAlign="middle" textAlign="center" text="去问驱蚊器我" verticalCenter="2" textColor="0x909295"/>
// 			<e:Label id="promptDisplay" textColor="0xa9a9a9" width="280" height="24" size="20" touchEnabled="false" includeIn="normalWithPrompt,disabledWithPrompt" verticalAlign="middle" textAlign="center" horizontalCenter="0" verticalCenter="2"/>
// 			</e:Skin>
// 		</e:skinName>
// 	</e:TextInput>
// 	<e:Group id="title" y="0" horizontalCenter="0">
// 		<e:Label id="text1" text="玩家XXX正在进入游戏" size="20" textColor="0xc6b59e" y="3" textAlign="center" width="330" horizontalCenter="0"/>
// 		<e:Label id="text2" text="玩家XXX正在进入游戏" size="20" textColor="0xc6b59e" y="31" width="330" textAlign="center" horizontalCenter="0"/>
// 		<e:Label id="text3" text="玩家XXX正在进入游戏" size="20" textColor="0xc6b59e" y="59" width="330" textAlign="center" horizontalCenter="0"/>
// 		<e:Label id="text4" text="玩家XXX正在进入游戏" size="20" textColor="0xc6b59e" y="87" width="330" textAlign="center" horizontalCenter="0"/>
// 	</e:Group>
// 	<e:Label text="角色名字不能超过6个字，不能包含空格和敏感字" horizontalCenter="0" verticalAlign="middle" textAlign="center" size="24" bottom="166" textColor="0xf08c5b"/>
// 	<e:Image source="create_back1_png" y="275.83" horizontalCenter="-44"/>
// 	<e:Image source="create_player_png" verticalCenter="-65" horizontalCenter="-7.5"/>
// </e:Skin>`
// 		}
// 		private _sex: boolean = true;
// 		private _job: number = 0;
// 		private _name: string = "";
// 		private _data: any;
// 		private _texts: eui.Label[];
// 		private _tipData: string[];
// 		private _lastJob: number = 0;
// 		private _timeId: number;
// 		protected initialize() {
// 			this._texts = [this.text1, this.text2, this.text3, this.text4];
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 		}
// 		public async enter() {
// 			this._job = 1;
// 			this._name = GameModels.login.randomName(this._sex);
// 			this.updateName();
// 			this._tipData = [];
// 			var total: number = 4;
// 			while (total--) {
// 				this._tipData.push(GameModels.login.randomName(this._sex));
// 			}
// 			this.startTip();
// 			this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
// 			this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
// 			this.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
// 			this.resizeHandler();
// 			GameModels.platform.uploadCreateRoleEnter();
// 			//await mg.assetsManager.loadGroupSync('particle_fire');
// 			//	this._particles = [new particle.GravityParticleSystem(RES.getRes('fire_json.fire1_png'), RES.getRes('fire_particle_json')),
// 			// new particle.GravityParticleSystem(RES.getRes('fire_json.fire2_png'), RES.getRes('fire_particle_json')),
// 			// 	new particle.GravityParticleSystem(RES.getRes('fire_json.fire3_png'), RES.getRes('fire_particle_json')),
// 			// 	new particle.GravityParticleSystem(RES.getRes('fire_json.fire4_png'), RES.getRes('fire_particle_json'))];
// 			// for (var p of this._particles) {
// 			// 	this.addChild(p);
// 			// 	p.blendMode = egret.BlendMode.ADD;
// 			// 	p.x = this.width / 2 - 20;
// 			// 	p.y = this.height;
// 			// 	p.start();
// 			// }
// 		}
// 		public exit() {
// 			this._data = null;
// 			this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
// 			this.btnRandom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
// 			this.stopTip();
// 			this.stage.removeEventListener(egret.Event.RESIZE, this.resizeHandler, this);
// 			// if (this._particles) {
// 			// 	for (var p of this._particles) {
// 			// 		p.stop();
// 			// 		if (p.parent) {
// 			// 			p.parent.removeChild(p);
// 			// 		}
// 			// 	}
// 			// 	this._particles = null;
// 			// 	RES.destroyRes('fire_json')
// 			// 	RES.destroyRes('fire_particle_json'); 
// 			// }
// 			// RES.destroyRes('create_back_jpg');
// 			// RES.destroyRes('create_back1_png');
// 			RES.destroyRes('create_json');
// 		}
// 		private resizeHandler() {
// 			this.width = this.stage.stageWidth;
// 			this.height = this.stage.stageHeight;
// 			// this.jobGroup.y = this.stage.stageHeight - 380;
// 			// this.jobGroup.x = this.stage.stageWidth / 2;
// 		}
// 		private startTip() {
// 			for (var i: number = 0; i < 4; i++) {
// 				this._texts[i].textFlow = <Array<egret.ITextElement>>[
// 					{ text: Language.C_WJ, style: { "textColor": 0xFFFFFF } },
// 					{ text: this._tipData[i], style: { "textColor": 0x009933 } },
// 					{ text: Language.J_ZZJRYX, style: { "textColor": 0xFFFFFF } }
// 				];
// 			}
// 			this._tipData.shift();
// 			this._tipData.push(GameModels.login.randomName(this._sex));
// 			this._timeId = egret.setTimeout(this.startTip, this, Math.random() * 1000 + 500)
// 		}
// 		private stopTip() {
// 			if (this._timeId) {
// 				egret.clearTimeout(this._timeId);
// 				this._timeId = 0;
// 			}
// 		}
// 		private updateName() {
// 			this.input.text = this._name;
// 		}
// 		private cllickHandler(e: eui.ItemTapEvent): void {
// 			switch (e.currentTarget) {
// 				case this.btnEnter: {
// 					GameModels.platform.uploadCreateRoleClick();
// 					var name: string = this.input.text.replace(/ /g, "");
// 					if (!name) {
// 						mg.alertManager.tip(Language.J_QSRYHM, 0xff0000);
// 						return;
// 					}
// 					if (GameModels.login.hasSensitives(name)) {
// 						mg.alertManager.tip(Language.J_MCHYFFZF, 0xff0000);
// 						return;
// 					}
// 					logger.log('创建角色....', name);
// 					this.btnEnter.enabled = false;
// 					// GameModels.login.createCharActor(this._sex, this._job, name, utils.Handler.create(this, function (data: n.G2C_CharacterCreate) {
// 					// 	GameModels.platform.uploadCreateRole(data.CharId, name);
// 					// 	logger.log('登录角色....', data.CharId);
// 					// 	GameModels.login.charActorLogin(data.CharId, utils.Handler.create(this, function () {
// 					// 		mg.uiManager.remove(CreateActorView);
// 					// 	}));
// 					// }));
// 					// n.net.onError(n.MessageMap.C2G_CHARACTERCREATE, utils.Handler.create(this, (data: n.ResultEvent) => {
// 					// 	mg.alertManager.tip(data.CodeMsg);
// 					// 	this.btnEnter.enabled = true;
// 					// }));
// 					//原创建角色特殊处理改为修改角色名
// 					GameModels.bag.requestChangeName(this.input.text, 3, utils.Handler.create(this, function () {
// 						mg.uiManager.remove(CreateActorView);
// 						app.gameContext.exitToMainGame();
// 					}))
// 				} break;
// 				case this.btnRandom: {
// 					this._name = GameModels.login.randomName(this._sex);
// 					this.updateName();
// 				} break;
// 			}
// 		}
// 	}
// } 
