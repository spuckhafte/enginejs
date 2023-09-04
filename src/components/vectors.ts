export class Vector {
    x: number; x0: number;
    y: number; y0: number;

    constructor(x: number, y: number, x0: number, y0: number) {
        this.x = x; this.y = y;
        this.x0 = x0; this.y0 = y0;
    }

    /**Magnitude of vector */
    value() {
        return Math.sqrt(
            Math.pow(this.x - this.x0, 2) + 
            Math.pow(this.y - this.y0, 2)
        );
    }

    /**Dot product of "vec" vector with the OG vector */
    dot(vec: Vector) {
        return (
            (this.x - this.x0) * (vec.x - vec.x0)) + 
            ((this.y - this.y0) * (vec.y - vec.y0)
        );
    }

    /**Multiply a scalar to the OG vector */
    scale(scalar: number) {
        return new Vector(
            this.x0 + (scalar * (this.x - this.x0)), 
            this.y0 + (scalar * (this.y - this.y0)), 
            this.x0, 
            this.y0
        );
    }

    /**Get a unit vector along the OG vector */
    normalize() {
        return new Vector(
            (this.x - this.x0) / this.value(),
            (this.y - this.y0) / this.value(),
            this.x0,
            this.y0
        )
    }
}

/**Position Vector */
export class PVector extends Vector {
    constructor(x: number, y :number) {
        super(x, y, 0, 0);
    }
}