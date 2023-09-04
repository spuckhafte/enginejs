import Criya from "../helpers/criya";
import { PVector } from "./vectors";
export class GameObject extends Criya {
    constructor(init) {
        super(init);
        this.physics = {
            position: new PVector(0, 0),
            velocity: new PVector(0, 0),
            acceleration: new PVector(0, 0)
        };
        this.body = {
            width: 10,
            height: 10,
            color: 'black'
        };
        this.onready = null;
        const _this = this;
        function __renderEffect() {
            var _a;
            _this.physics.velocity.x += _this.physics.acceleration.x;
            _this.physics.velocity.y += _this.physics.acceleration.y;
            _this.physics.position.x += _this.physics.velocity.x;
            _this.physics.position.y += _this.physics.velocity.y;
            _this.prop = Object.assign(Object.assign({}, _this.prop), { css: Object.assign(Object.assign({}, (_a = _this.prop) === null || _a === void 0 ? void 0 : _a.css), { position: 'absolute', left: _this.physics.position.x + "px", top: -_this.physics.position.y + "px", width: _this.body.width + "px", height: _this.body.height + "px", backgroundColor: _this.body.color }) });
            _this.render();
        }
        this.onSubscribed(() => {
            if (!this.effects.find(eff => eff.func.name == "__renderEffect")) {
                this.effect(__renderEffect, ['%delta%']);
            }
        });
    }
}
