import { Scene_Init } from "../../types";
import Criya, { criya_Func } from "../helpers/criya";
import { GameObject } from "./gameObject";
import { PVector } from "./vectors";

/**
 * The `Scene` class is the core component in Criya applications, serving as a container for game objects and orchestrating their interactions. It allows developers to define the FPS for animations, pack multiple game objects within the scene, and manage gravitational simulations.
*/
export class Scene {
    fps: number;
    private delta: (newVal: number | criya_Func<number, number>) => void;

    /**All the GameObjects packed in this scene */
    gameObjects: GameObject[] = [];

    /**Criya element, parent of all the packed gameObjects in this scene */
    element: Criya;

    /**Gravitational constant */
    G = 0.01;

    private massyObjects: GameObject[] = [];

    constructor(init: Scene_Init) {
        this.element = new Criya({ type: 'span', parent: "#app" });

        this.fps = init.fps;
        this.delta = this.element.state('delta', 0)[1];
    }

    /**Bind different GameObjects in this scene */
    pack(items: GameObject[]) {
        this.gameObjects = [...this.gameObjects, ...items];
    }

    start() {
        for (let object of this.gameObjects) {
            Criya.subscribe(object, this.element, ['delta']);
            object.make();

            if (object.physics.mass) {
                this.massyObjects.push(object);
            }

            if (object.onready) 
                object.onready();
            if (object.onrefresh)
                object.effect(object.onrefresh, ['%delta%']);
        }

        this.element.effect(() => {
            this.gravitySimulator();
        }, ['$delta$']);

        setInterval(() => {
            this.delta(prev => prev ? 0 : 1);
        }, 1 / this.fps * 1000);
    }

    /**Calculate and apply gravitational effects on every "massy" object due to every "massy" object */
    private gravitySimulator() {
        const doneWith: number[] = [];

        for (let objectIndex = 0; objectIndex < this.massyObjects.length; objectIndex += 1) {
            const object = this.massyObjects[objectIndex];
            if (!object.physics.mass) continue;

            for (let otherIndex = 0; otherIndex < this.massyObjects.length; otherIndex += 1) {
                if (doneWith.length == this.massyObjects.length - 1) break;
                if (otherIndex == objectIndex || doneWith.includes(otherIndex)) continue;

                const other = this.massyObjects[otherIndex];
                if (!other.physics.mass) continue;

                const directionVector = object.physics.position.vectorTo(other.physics.position);
                const forceMaginitude = 
                    this.G * ((object.physics.mass * other.physics.mass) / directionVector.value());

                const accelerationForObject = new PVector(
                    forceMaginitude * Math.cos(directionVector.dirn()) / object.physics.mass,
                    forceMaginitude * Math.sin(directionVector.dirn()) / object.physics.mass,
                );

                const directionVector2 = other.physics.position.vectorTo(object.physics.position);

                const accelerationForOther = new PVector(
                    forceMaginitude * Math.cos(directionVector2.dirn()) / other.physics.mass,
                    forceMaginitude * Math.sin(directionVector2.dirn()) / other.physics.mass
                );

                object.physics.acceleration = new PVector(
                    accelerationForObject.x + (doneWith.length == 0 ? 0 : object.physics.acceleration.x),
                    accelerationForObject.y + (doneWith.length == 0 ? 0 : object.physics.acceleration.y),
                );

                other.physics.acceleration = new PVector(
                    accelerationForOther.x + (doneWith.length == 0 ? 0 : other.physics.acceleration.x),
                    accelerationForOther.y + (doneWith.length == 0 ? 0 : other.physics.acceleration.y),
                );
            }

            doneWith.push(objectIndex)
        }
    }
}