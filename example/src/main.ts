import './style.css';
import { GameObject, PVector, Scene } from '../../src/index';

const scene = new Scene({ fps: 60 });


const sun = new GameObject();
sun.physics = {
    ...sun.physics,
    position: new PVector(700, -300),
}
sun.body = {
    ...sun.body,
    width: 200,
    height: 200,
    color: 'orange'
}


const planet = new GameObject();
planet.physics = {
    ...planet.physics,
    position: new PVector(400, -310),
    mass: 0
}
planet.body = {
    ...planet.body,
    width: 50,
    height: 50,
    color: 'blue'
}


scene.pack([sun, planet]);
scene.start();