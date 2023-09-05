export class Vector {
    constructor(x, y, x0, y0) {
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }
    value() {
        return Math.sqrt(Math.pow(this.x - this.x0, 2) +
            Math.pow(this.y - this.y0, 2));
    }
    dirn() {
        return Math.atan2((this.y - this.y0), (this.x - this.x0));
    }
    dot(vec) {
        return ((this.x - this.x0) * (vec.x - vec.x0)) +
            ((this.y - this.y0) * (vec.y - vec.y0));
    }
    scale(scalar) {
        return new Vector(this.x0 + (scalar * (this.x - this.x0)), this.y0 + (scalar * (this.y - this.y0)), this.x0, this.y0);
    }
    normalize() {
        return new Vector((this.x - this.x0) / this.value(), (this.y - this.y0) / this.value(), this.x0, this.y0);
    }
}
export class PVector extends Vector {
    constructor(x, y) {
        super(x, y, 0, 0);
    }
    vectorTo(vec) {
        return new Vector(vec.x, vec.y, this.x, this.y);
    }
}
