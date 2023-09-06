import Criya from "../helpers/criya";
import { PVector } from "./vectors";
export class Scene {
    constructor(init) {
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
                                this.afterCollison(object, other);
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
                                this.afterCollison(object, other);
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
    afterCollison(object1, object2) {
    }
}
