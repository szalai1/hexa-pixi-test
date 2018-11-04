console.log("map js load")

class Tile {
    constructor(p,q) {
        this.p = p;
        this.q = q; 
        this.ships = [];
        this.container = new Sprite(tileTexture);
        this.container.interactive = true;
        this.container.mousedown = this.getMouseDown();
        //this.container.mouseup = this.mouseupi();
        this.clicked = false;
    }
    
    addShip(s) {
        console.log("tile add ship");
        this.ships.push(s)
        this.container.addChild(s.container);
        app.stage.addChild(s.container);
    }

    getMouseDown() {
        return () => {
           this.container.tint = 0x00ff00;

        }
    }

    mouseup() {
    }
}

class Map {
    constructor() {
        this.tiles = [];
        this.tileIndex = {};
        this.ships = [];
        this.container = new Container();
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
}


function mapFoo() {
    console.log("map fooo");
}
