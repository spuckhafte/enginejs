import Criya from "../helpers/criya";
export class Scene {
    constructor(init) {
        this.gameObjects = [];
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
            object.mount();
            if (object.onready)
                object.onready();
        }
        setInterval(() => {
            this.delta(prev => prev ? 0 : 1);
        }, 1 / this.fps * 1000);
    }
}
