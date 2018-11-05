let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

let app = new Application({ 
        width: 1200, 
        height: 1000,                       
        antialiasing: true, 
        transparent: true, 
        resolution: 1
      }
    );
tileImagePath = "images/tile.svg";
loader.add(tileImagePath).load(setup);

let tileTexture, tileW, tileH;

function setup() {
    tileTexture = resources[tileImagePath].texture;
    tileW = tileTexture.width;
    tileH = tileTexture.height;
    map = setUpMap(); 
    map.container.scale.set(1);
    ship = new Ship(2,2);    
    map.addShip(ship);
    app.stage.addChild(map.container);
}


function setUpMap() {
    map = new Map();
    for( i = 0; i < 10; i++) {
        for( j = -5; j < 10; j++) {
            map.addTile(new Tile(i, j));
        }
    }
    return map;

}

document.body.appendChild(app.view);

