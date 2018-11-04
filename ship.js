
class Ship {
    constructor(p, q) {
       this.p = p;
       this.q = q;
       this.container = new Container();
       let circle = new Graphics();
       circle.beginFill(0xFF0210);
       circle.drawCircle(0,0, 5);  
       circle.endFill();
       this.container.addChild(circle);
    }

}
