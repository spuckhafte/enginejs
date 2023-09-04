import './style.css';
import { GameObject, PVector, Scene } from '../../src/index';

const scene = new Scene({ fps: 60 });

const object = new GameObject({ type: 'div', parent: "#app" });
object.physics = {
    ...object.physics,
    position: new PVector(200, -200),
    velocity: new PVector(0, 0),
    acceleration: new PVector(0, 0),
}
object.body = {
    ...object.body,
    width: 50,
    height: 50,
    color: 'red'
}
object.render();


const body = new GameObject({ type: 'div', parent: "#app" });
body.physics = {
    ...body.physics,
    position: new PVector(500, -200),
}
body.body = {
    ...object.body,
    color: 'black'
}
body.render();

scene.pack([object, body]);
scene.start();