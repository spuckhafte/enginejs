import './style.css';
import { GameObject, PVector, Scene } from '../../src/index';

const scene = new Scene({ fps: 1440 });

const pin = new GameObject();
pin.body = {
    ...pin.body,
    width: 20,
    height: 20,
    radius: [100, "%"],
    color: "red",
}
pin.physics = {
    ...pin.physics,
    mass: 1,
    position: new PVector(500, -50),
    velocity: new PVector(0, -1),
    collision: "circle",
    restitution: 1,
}

const bob = new GameObject();
bob.body = {
    ...bob.body,
    width: 50,
    height: 50,
    radius: [100, "%"],
    color: "red",
}
bob.physics = {
    ...bob.physics,
    mass: 200,
    position: new PVector(500, -500),
    collision: "circle",
    restitution: 1,
}

window.onclick = () => location.reload()

scene.pack([pin, bob]);
scene.start();
