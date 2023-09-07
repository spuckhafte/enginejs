export class Vector {
    constructor(x, y, x0, y0) {
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }
    value() {
        return Math.sqrt(Math.pow(this.X, 2) +
            Math.pow(this.Y, 2));
    }
    dirn() {
        return Math.atan2(this.Y, this.X);
    }
    dot(vec) {
        return ((this.X * vec.X) + (this.Y * vec.Y));
    }
    scale(scalar) {
        return new Vector(this.x0 + (scalar * this.X), this.y0 + (scalar * this.Y), this.x0, this.y0);
    }
    normalize() {
        return new Vector(this.X / this.value(), this.Y / this.value(), 0, 0);
    }
    flip() {
        return new Vector(-this.x, -this.y, this.x0, this.y0);
    }
    shiftToPVector() {
        return new PVector(this.X, this.Y);
    }
    get X() {
        return this.x - this.x0;
    }
    get Y() {
        return this.y - this.y0;
    }
}
export class PVector extends Vector {
    constructor(x, y) {
        super(x, y, 0, 0);
    }
    vectorTo(vec) {
        return new Vector(vec.x, vec.y, this.x, this.y);
    }
    resultant(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y, 0, 0);
    }
}
