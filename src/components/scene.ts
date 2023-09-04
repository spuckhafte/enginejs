import { Scene_Init } from "../../types";
import Criya, { criya_Func } from "../helpers/criya";
import { GameObject } from "./gameObject";

export class Scene {
    fps: number;
    delta: (newVal: number | criya_Func<number, number>) => void;
    gameObjects: GameObject[] = [];
    element: Criya;

    constructor(init: Scene_Init) {
        this.element = new Criya({ type: 'span', parent: "#app" });

        this.fps = init.fps;
        this.delta = this.element.state('delta', 0)[1];
    }

    pack(items: GameObject[]) {
        this.gameObjects = [...this.gameObjects, ...items];
    }

    start() {
        for (let object of this.gameObjects) {
            Criya.subscribe(object, this.element, ['delta']);
            object.mount();
            if (object.onready) object.onready();
        }

        setInterval(() => {
            this.delta(prev => prev ? 0 : 1);
        }, 1 / this.fps * 1000);
    }
}