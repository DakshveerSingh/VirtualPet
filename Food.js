class Milk{
    constructor(x,y,width,height){
        this.FoodStock = 0;
        this.image = loadImage("images/Milk.png")
    }
    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,20,20);

        if(this.getFoodStock !== 0){
            for(var i = 0; i < this.FoodStock; i++){
                if(i%10 === 0){
                    x = 80; 
                    y = y + 80;
                }
                image(this.image,x,y,70,70);
                x = x + 30;
            }
        }
    }
}
