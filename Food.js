class Milk{
    constructor(x,y,width,height){
        var milk = createSprite(x,y,width,height);
        var foodStock;
        var lastFed;
        this.getFoodStock;
        this.image = loadImage("images/Milk.png");
        this.updateFoodStock; 
        this.deductFood;
    }
    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,20,20);

        if(this.getFoodStock !== 0){
            for(var i = 0; i < this.getFoodStock; i++){
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
