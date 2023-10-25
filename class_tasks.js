//class task is done

const PI = 3.14159

class AreaCalculator {

    constructor(figure = []) {
        this.figure = figure;
    }

    sum() {
        const sum = this.figure.reduce((sum, item) => {
            return sum += item.square()
        }, 0);
        return sum
    }
}

class Square {

    constructor(side) {
        this.side = side;
    }

    square() {
        return this.side ** 2;
    }

}

class Circle {

    constructor(radius) {
        this.radius = radius;
    }

    square() {
        return this.radius ** 2 * PI;
    }
}

const area = new AreaCalculator([new Square(10), new Circle(5), new Circle(10)]);
console.log(area.sum());