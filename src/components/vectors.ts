/**
 * 
The `Vector` class is a versatile utility for performing essential two-dimensional vector operations. It encompasses functions for calculating vector magnitude, angle with the x-axis, dot product with other vectors, scaling, and normalization.
*/
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

    /**Angle with the x-axis */
    dirn() {
        return Math.atan2((this.y - this.y0), (this.x - this.x0));
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

/**
 * The `PVector` class is a specialized version of the `Vector` class, designed for representing position vectors. It simplifies the creation of position vectors with default origin values and provides a method for calculating vectors pointing from the current position to a specified destination.
 */
export class PVector extends Vector {
    constructor(x: number, y :number) {
        super(x, y, 0, 0);
    }

    vectorTo(vec: Vector) {
        return new Vector(
            vec.x, vec.y,
            this.x, this.y
        );
    }
}