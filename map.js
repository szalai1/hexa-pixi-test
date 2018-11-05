console.log("map js load")

class Tile {
    constructor(p,q) {
        this.p = p;
        this.q = q; 
        this.ships = [];
        this.container = new Container();
        this.container.addChild(new Sprite(tileTexture));
        this.filter = new PIXI.filters.ColorMatrixFilter();
        let matrix = this.filter.matrix;
        matrix[3] = 30;

        this.container.interactive = true;
        this.container.mousedown = this.getMouseDown();
        //this.container.mouseup = this.mouseupi();
        this.clicked = 0;
    }
    
    addShip(s) {
        console.log("tile add ship", s.container);
        this.ships.push(s)
        let x = this.container.width / 2 - s.container.width/2;
        let y = this.container.height /2 - s.container.height/2;
        s.container.position.set(x,y);
        let scale = this.container.width / s.container.width; 
        s.container.scale.set(0.3*scale);
        this.container.addChild(s.container);
        //app.stage.addChild(s.container);
        console.log(s.container);
    }

    getMouseDown() {
        return () => {
            console.log("down", this.p, this.q, this.clicked);
            this.clicked+=1;
            if( this.clicked % 2 == 1) {
                this.container.filters = [this.filter];
            } else {
                this.container.filters = [];
            }
        }
    }

    mouseup() {
        return () => {
            console.log("up", this.p, this.q);
            this.container.filters = [];
        }
 
    }
}

class Map {
    constructor() {
        this.tiles = [];
        this.tileIndex = {};
        this.ships = [];
        this.dragging = false;
        this.container = new Container();
        this.container.on('mousedown', this.getOnDragStart());
        this.container.on('mouseup', this.getOnDragEnd());
        this.container.on('mousemove', this.getOnDragMove());
        this.container.interactive = true;
    }
    
    addShip(ship) {
        console.log("map add ship");
        if (!this.tileExists(ship.p, ship.q) ) {
            return 
        }
        this.ships.push(ship);
        let tile = this.tileIndex[ship.p][ship.q]
        tile.addShip(ship);   
        this.container.addChild(tile.container);
    }
    
    tileExists(p,q) {
        if ( typeof this.tileIndex[p] === "undefined") {
            return false;
        }
        if ( typeof this.tileIndex[p][q] === "undefined") {
            return false;
        }
        return true;
    }

    addTile(tile) {
        let y = tileH * tile.p * 3 / 4;
        let x = tileW * (0.5*tile.p + tile.q);
        tile.container.position.set(x,y);
        this.tiles.push(tile);
        if ( typeof this.tileIndex[tile.p] === "undefined") {
            this.tileIndex[tile.p] = {};
        }
        this.tileIndex[tile.p][tile.q] = tile;
        this.container.addChild(tile.container);
    }

    getOnDragStart() {
        return (event) => {
               console.log("drag start") 
                this.container.data = event.data;
                this.container.start_data = {x: event.data.originalEvent.screenX, y: event.data.originalEvent.screenY};
                this.container.dragPos = this.container.data.getLocalPosition(this.container.parent);

                this.container.oldPosition = new PIXI.Point();
                this.container.oldPosition.copy(this.container.position);
                this.dragging = true;
            }
        }
    getOnDragEnd() {
        return (event) => {
            var ev_data = event.data.originalEvent;
                //if real dragend
                if (this.container.start_data) {
                    if (Math.abs(this.container.start_data.x - ev_data.screenX) > 2 || Math.abs(this.container.start_data.y - ev_data.screenY) > 2)
                        event.stopPropagation();
                }
                this.dragging = false;
                // set the interaction data to null
                this.container.data = null;
            }
    }

    getOnDragMove() {
        return () => {
                if (this.dragging) {
                    console.log("dragging!!");
                    var newPosition = this.container.data.getLocalPosition(this.container.parent);
                    var pv = this.container.position, pv2 = this.container.oldPosition;
                    pv.x = pv2.x + (newPosition.x - this.container.dragPos.x);
                    pv.y = pv2.y + (newPosition.y - this.container.dragPos.y);
                }
           }
    }
}


function mapFoo() {
    console.log("map fooo");
        console.log("ondragstart");
        console.log("ondragstart");
        console.log("ondragstart");
}
