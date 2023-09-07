import Criya from "../helpers/criya";
import { PVector } from "./vectors";
export class Scene {
    constructor(init) {
        this.requestFrame = null;
        this.gameObjects = [];
        this.G = 0.01;
        this.massyObjects = [];
        this.collidables = [];
        this.element = new Criya({ type: 'span', parent: "#app" });
        this.fps = init.fps;
        this.delta = this.element.state('delta', 0)[1];
    }
    pack(items) {
        this.gameObjects = [...this.gameObjects, ...items];
    }
    newBind(object) {
        Criya.subscribe(object, this.element, ['delta']);
        object.make();
        if (object.physics.mass) {
            this.massyObjects.push(object);
        }
        if (object.physics.collision) {
            this.collidables.push(object);
        }
        if (object.onready)
            object.onready();
        if (object.onrefresh)
            object.effect(object.onrefresh, ['%delta%']);
        this.gameObjects.push(object);
    }
    start() {
        for (let object of this.gameObjects) {
            Criya.subscribe(object, this.element, ['delta']);
            object.make();
            if (object.physics.mass) {
                this.massyObjects.push(object);
            }
            if (object.physics.collision) {
                this.collidables.push(object);
            }
            if (object.onready)
                object.onready();
            if (object.onrefresh)
                object.effect(object.onrefresh, ['%delta%']);
        }
        this.element.effect(() => {
            this.gravitySimulator();
            this.collisonDetector();
            if (this.requestFrame)
                this.requestFrame();
        }, ['$delta$']);
        setInterval(() => {
            this.delta(prev => prev ? 0 : 1);
        }, 1 / this.fps * 1000);
    }
    gravitySimulator() {
        const doneWith = [];
        for (let objectIndex = 0; objectIndex < this.massyObjects.length; objectIndex += 1) {
            const object = this.massyObjects[objectIndex];
            if (!object.physics.mass)
                continue;
            for (let otherIndex = 0; otherIndex < this.massyObjects.length; otherIndex += 1) {
                if (doneWith.length == this.massyObjects.length - 1)
                    break;
                if (otherIndex == objectIndex || doneWith.includes(otherIndex))
                    continue;
                const other = this.massyObjects[otherIndex];
                if (!other.physics.mass)
                    continue;
                const directionVector = object.physics.position.vectorTo(other.physics.position);
                const forceMaginitude = this.G * ((object.physics.mass * other.physics.mass) / directionVector.value());
                const accelerationForObject = new PVector(forceMaginitude * Math.cos(directionVector.dirn()) / object.physics.mass, forceMaginitude * Math.sin(directionVector.dirn()) / object.physics.mass);
                const directionVector2 = other.physics.position.vectorTo(object.physics.position);
                const accelerationForOther = new PVector(forceMaginitude * Math.cos(directionVector2.dirn()) / other.physics.mass, forceMaginitude * Math.sin(directionVector2.dirn()) / other.physics.mass);
                object.physics.acceleration = new PVector(accelerationForObject.x + (doneWith.length == 0 ? 0 : object.physics.acceleration.x), accelerationForObject.y + (doneWith.length == 0 ? 0 : object.physics.acceleration.y));
                other.physics.acceleration = new PVector(accelerationForOther.x + (doneWith.length == 0 ? 0 : other.physics.acceleration.x), accelerationForOther.y + (doneWith.length == 0 ? 0 : other.physics.acceleration.y));
            }
            doneWith.push(objectIndex);
        }
    }
    collisonDetector() {
        const doneWith = [];
        for (let objectIndex = 0; objectIndex < this.collidables.length; objectIndex += 1) {
            const object = this.collidables[objectIndex];
            for (let otherIndex = 0; otherIndex < this.collidables.length; otherIndex += 1) {
                if (otherIndex == objectIndex || doneWith.includes(otherIndex))
                    continue;
                const other = this.collidables[otherIndex];
                const displacement = object.physics.position.vectorTo(other.physics.position);
                if (object.physics.collision == 'rectangle') {
                    if (other.physics.collision == 'circle') {
                    }
                    if (other.physics.collision == 'rectangle') {
                        const xColliding = Math.abs(displacement.X) <=
                            ((object.body.width / 2) + (other.body.width / 2));
                        const yColliding = Math.abs(displacement.Y) <=
                            ((object.body.height / 2) + (other.body.height / 2));
                        if (xColliding && yColliding) {
                            if (typeof object.physics.restitution == 'number' &&
                                typeof other.physics.restitution == 'number')
                                this.afterCollision(object, other);
                            if (object.onCollision)
                                object.onCollision(other);
                            if (other.onCollision)
                                other.onCollision(object);
                        }
                    }
                }
                if (object.physics.collision == 'circle') {
                    if (other.physics.collision == 'rectangle') {
                    }
                    if (other.physics.collision == 'circle') {
                        const circlesColliding = displacement.value() <= (object.body.width / 2 + other.body.width / 2);
                        if (circlesColliding) {
                            if (typeof object.physics.restitution == 'number' &&
                                typeof other.physics.restitution == 'number')
                                this.afterCollision(object, other);
                            if (object.onCollision)
                                object.onCollision(other);
                            if (other.onCollision)
                                other.onCollision(object);
                        }
                    }
                }
            }
            doneWith.push(objectIndex);
        }
    }
    afterCollision(object1, object2) {
        const displacement1 = object1.physics.position.vectorTo(object2.physics.position);
        const displacement2 = object2.physics.position.vectorTo(object1.physics.position);
        const u1LOI = displacement1.normalize().shiftToPVector().scale(object1.physics.velocity.dot(displacement1.normalize())).shiftToPVector();
        const u2LOI = displacement2.normalize().scale(object2.physics.velocity.dot(displacement2.normalize())).shiftToPVector();
        const freeVector1 = u1LOI.vectorTo(object1.physics.velocity.shiftToPVector()).shiftToPVector();
        const freeVector2 = u2LOI.vectorTo(object2.physics.velocity.shiftToPVector());
        const dir1 = displacement1.dirn() < 0 ? -1 : 1;
        const dir2 = displacement1.dirn() < 0 ? -1 : 1;
        const m1 = object1.physics.mass, m2 = object2.physics.mass, u1 = u1LOI.value() * dir1, u2 = u2LOI.value() * dir2, e = object1.physics.restitution
            + object2.physics.restitution / 2;
        const v1 = ((m1 * u1) + (m2 * u2) - (m2 * e * (u1 - u2))) / (m1 + m2), v2 = (e * (u1 - u2)) + v1;
        const flip1 = (Math.sign(v1) == Math.sign(u1) ? false : true);
        const flip2 = (Math.sign(v2) == Math.sign(u2) ? false : true);
        const v1LOI = (flip1 ? u1LOI.flip() : u1LOI).normalize().scale(Math.abs(v1));
        const v2LOI = (flip2 ? u2LOI.flip() : u2LOI).normalize().scale(Math.abs(v2));
        object1.physics.velocity = freeVector1.shiftToPVector().resultant(v1LOI.shiftToPVector());
        object2.physics.velocity = freeVector2.shiftToPVector().resultant(v2LOI.shiftToPVector());
    }
}
