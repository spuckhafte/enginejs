import './style.css';
import { GameObject, PVector, Scene } from '../../src/index';

const scene = new Scene({ fps: 1440 });

const planet = new GameObject();
planet.physics = {
    ...planet.physics,
    position: new PVector(1000, -2000),
    velocity: new PVector(0, 0),
    acceleration: new PVector(0, -0.0005),
    mass: 10000,
    restitution: 1,
    collision: 'circle'
}
planet.body = {
    ...planet.body,
    width: 100,
    height: 100,
    color: 'blue',
    radius: [100, '%']
}


const sun = new GameObject();
sun.physics = {
    ...sun.physics,
    position: new PVector(1000, -100),
    mass: 1,
    restitution: 1,
    collision: 'circle'
}
sun.body = {
    ...sun.body,
    width: 50,
    height: 50,
    color: 'orange',
    radius: [100, '%']
}

scene.pack([sun, planet]);
scene.start();