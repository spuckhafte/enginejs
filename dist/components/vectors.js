/**
 * The `Vector` class is a versatile utility for performing essential two-dimensional vector operations. It encompasses functions for calculating vector magnitude, angle with the x-axis, dot product with other vectors, scaling, and normalization.
*/
export class Vector {
    constructor(x, y, x0, y0) {
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }
    /**Magnitude of vector. */
    value() {
        return Math.sqrt(Math.pow(this.X, 2) +
            Math.pow(this.Y, 2));
    }
    /**Angle with the x-axis. */
    dirn() {
        return Math.atan2(this.Y, this.X);
    }
    /**Dot product of "vec" vector with the OG vector. */
    dot(vec) {
        return ((this.X * vec.X) + (this.Y * vec.Y));
    }
    /**Multiply a scalar to the OG vector. */
    scale(scalar) {
        return new Vector(this.x0 + (scalar * this.X), this.y0 + (scalar * this.Y), this.x0, this.y0);
    }
    /**Get a unit vector along the OG vector. */
    normalize() {
        return new Vector(this.X / this.value(), this.Y / this.value(), 0, 0);
    }
    /**Flips the sign of each component and returns a new vector. */
    flip() {
        return new Vector(-this.x, -this.y, this.x0, this.y0);
    }
    /**Parallel transforms a vector to origin */
    shiftToPVector() {
        return new PVector(this.X, this.Y);
    }
    /**Net component in X-direction. */
    get X() {
        return this.x - this.x0;
    }
    /**Net component in Y-direction. */
    get Y() {
        return this.y - this.y0;
    }
}
/**
 * The `PVector` class is a specialized version of the `Vector` class, designed for representing position vectors. It simplifies the creation of position vectors with default origin values and provides a method for calculating vectors pointing from the current position to a specified destination.
 */
export class PVector extends Vector {
    constructor(x, y) {
        super(x, y, 0, 0);
    }
    /**Calculate vector going from one to another */
    vectorTo(vec) {
        return new Vector(vec.x, vec.y, this.x, this.y);
    }
    /**Calculate resultant vector */
    resultant(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y, 0, 0);
    }
}
