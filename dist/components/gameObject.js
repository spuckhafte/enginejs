import Criya from "../helpers/criya";
import { PVector, Vector } from "./vectors";
/**
 * The `GameObject` class in Criya encapsulates the attributes and behavior of individual game objects, including their physical properties, appearance details, and customizable logic hooks (eg: `onrefresh` and `onready`).
 */
export class GameObject extends Criya {
    constructor(init) {
        var _a;
        super({
            type: "div",
            parent: "#app",
            id: init === null || init === void 0 ? void 0 : init.id,
            class: init === null || init === void 0 ? void 0 : init.class,
        });
        /**Physical properties of a game object, viz: position, velocity, etc. */
        this.physics = {
            position: new PVector(0, 0),
            velocity: new Vector(0, 0, 0, 0),
            acceleration: new Vector(0, 0, 0, 0),
        };
        /**Describe how the object will look like */
        this.body = {
            width: 10,
            height: 10,
            color: 'black',
            radius: [0, '%']
        };
        /**This function will be called when the game object is ready and is on the scene */
        this.onready = null;
        /**This function gets called whenever the screen refreshes */
        this.onrefresh = null;
        /**This function will get called whenver this object will collide with another `collidable` object */
        this.onCollision = null;
        /**Manage the controller interface (keyboard) */
        this.controller = undefined;
        this.prop = Object.assign(Object.assign({}, this.prop), { css: {
                position: 'absolute',
                transform: "translate(-50%, -50%)",
            } });
        this.controller = init === null || init === void 0 ? void 0 : init.controller;
        if ((_a = this === null || this === void 0 ? void 0 : this.controller) === null || _a === void 0 ? void 0 : _a.activate) {
            window.addEventListener('keydown', ({ key }) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                key = key.toLowerCase();
                if (!['w', 'a', 's', 'd'].includes(key))
                    return;
                if (!this.physics)
                    return;
                if (key == "w") {
                    if ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.w)
                        this.controller.w();
                    else {
                        if (this.physics.velocity.Y !== 0)
                            return;
                        this.physics.velocity = new Vector(0, Math.abs((_b = this.physics.velocity.value()) !== null && _b !== void 0 ? _b : 1), 0, 0);
                    }
                }
                if (key == "a") {
                    if ((_c = this.controller) === null || _c === void 0 ? void 0 : _c.a)
                        this.controller.a();
                    else {
                        if (this.physics.velocity.X !== 0)
                            return;
                        this.physics.velocity = new Vector(-Math.abs((_d = this.physics.velocity.value()) !== null && _d !== void 0 ? _d : 1), 0, 0, 0);
                    }
                }
                if (key == "s") {
                    if ((_e = this.controller) === null || _e === void 0 ? void 0 : _e.s)
                        this.controller.s();
                    else {
                        if (this.physics.velocity.Y !== 0)
                            return;
                        this.physics.velocity = new Vector(0, -Math.abs((_f = this.physics.velocity.value()) !== null && _f !== void 0 ? _f : 1), 0, 0);
                    }
                }
                if (key == "d") {
                    if ((_g = this.controller) === null || _g === void 0 ? void 0 : _g.d)
                        this.controller.d();
                    else {
                        if (this.physics.velocity.X !== 0)
                            return;
                        this.physics.velocity = new Vector(Math.abs((_h = this.physics.velocity.value()) !== null && _h !== void 0 ? _h : 1), 0, 0, 0);
                    }
                }
                this.render();
            });
        }
        // class' [this] is getting shadowed inside the function
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
