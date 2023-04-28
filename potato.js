class Potato {
    constructor(x, y, img) {
        this.x = x
        this.y = y
        this.img = img
        this.isHappy = true;
    }

    show() {
        
        if (this.isHappy) {
            image(this.img[1], this.x, this.y, 300, 250)
        } else {
            image(this.img[0], this.x, this.y, 300, 250)
        }
    }

    update() {
        this.show()
    }

}