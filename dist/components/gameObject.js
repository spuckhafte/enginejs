import Criya from "../helpers/criya";
import { PVector, Vector } from "./vectors";
export class GameObject extends Criya {
    constructor(init) {
        super(Object.assign({ type: "div", parent: "#app" }, init));
        this.physics = {
            position: new PVector(0, 0),
            velocity: new Vector(0, 0, 0, 0),
            acceleration: new Vector(0, 0, 0, 0),
        };
        this.body = {
            width: 10,
            height: 10,
            color: 'black',
            radius: [0, '%']
        };
        this.onready = null;
        this.onrefresh = null;
        this.onCollision = null;
        this.prop = Object.assign(Object.assign({}, this.prop), { css: {
                position: 'absolute',
                transform: "translate(-50%, -50%)",
            } });
        const This = this;
        function __refresh() {
            var _a;
            This.physics.velocity.x += This.physics.acceleration.x;
            This.physics.velocity.y += This.physics.acceleration.y;
            This.physics.position.x += This.physics.velocity.x;
            This.physics.position.y += This.physics.velocity.y;
            This.prop = Object.assign(Object.assign({}, This.prop), { css: Object.assign(Object.assign({}, (_a = This.prop) === null || _a === void 0 ? void 0 : _a.css), { left: This.physics.position.x + "px", top: -This.physics.position.y + "px", width: This.body.width + "px", height: This.body.height + "px", backgroundColor: This.body.color, borderRadius: This.body.radius[0] + This.body.radius[1] }) });
            This.render();
        }
        this.onSubscribed(() => {
            if (!this.effects.find(eff => eff.func.name == "__refresh")) {
                this.effect(__refresh, ['%delta%']);
            }
        });
    }
}
