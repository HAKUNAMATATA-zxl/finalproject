class Element{
    constructor(x, y, img) {
        this.x = x
        this.y = y
        this.width = 150
        this.height = 150
        this.img = random(img)       
        this.isOK = img.indexOf(this.img) > 3 ? -1 : 1;
    }

    show(){
        image(this.img, this.x, this.y, 100, 100)
    }

    move(){
        
        this.y += 3;
        if(this.y > height + 300){
            this.y = 0
        }
    }
    update(){
        this.show()
        this.move()
    }

    isCatch(A){
        if (A.x >= this.x - this.width && A.x <= this.x + this.width &&
            A.y >= this.y - this.height && A.y <= this.y + this.height
          ) {
            return true;
          }
    }
}