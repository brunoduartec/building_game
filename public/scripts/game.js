
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var itemsConfig = getLevelConfig();
var items = getLevelInfo();
var worldConfig = getWorldConfig();


function update (time, delta)
{
    this.controls.update(delta);
}

function preload ()
{
    this.load.image('room1', '../assets/room1.png');
    this.load.image('room2', '../assets/room2.png');
    this.load.image('floor', '../assets/floor.png');
}

function createRoom(parent,alias, add, px, py,url,  debugMode=false){
    let itemConfig = getLevelConfig()[alias];

    room = add.image(px, py, itemConfig["image"]);
    room.alias = alias

    let polygonCoordinates = itemConfig.polygon

    var shape = new Phaser.Geom.Polygon(polygonCoordinates);

    room.setInteractive(shape, Phaser.Geom.Polygon.Contains);

    room.on('pointerup', ()=>{
        openExternalLink(url)
    }, parent);

    if(debugMode){

        //  Draw the polygon
        var graphics = add.graphics({ x: room.x - room.displayOriginX, y: room.y - room.displayOriginY });

        graphics.lineStyle(2, 0x00aa00);

        graphics.beginPath();

        graphics.moveTo(shape.points[0].x, shape.points[0].y);

        for (var i = 1; i < shape.points.length; i++)
        {
            graphics.lineTo(shape.points[i].x, shape.points[i].y);
        }

        graphics.closePath();
        graphics.strokePath();
    }
    return room
}

function placeRooms(parent, add, debugMode){
    currentFloor = 0;
    floorHeight = 150;
    roomWidth = 200;
    deltaX = 150

    for (let index = 0; index < items.length; index++) {
        let itemInfo = items[index]
        let i = index%worldConfig.maxRoomsByFloor
        let j = parseInt(index / worldConfig.maxRoomsByFloor)

        let r1 =  createRoom(parent,itemInfo["type"], add, i*roomWidth +deltaX, -j * floorHeight, itemInfo["url"] , debugMode)
        add.image(r1.x, r1.y + 75, "floor");
        console.log(r1.x,r1.y)
    }

}


function create ()
{
    
    console.log(items.length,worldConfig.maxRoomsByFloor, items.length /worldConfig.maxRoomsByFloor )
    //  Set the camera bounds to be the size of the image
    this.cameras.main.setBounds(0,-1200-200, 800, 1200 + 300 );

    //  Camera controls
    const cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


    placeRooms(this, this.add, false)    

}

function openExternalLink (url)
{
    var s = window.open(url, '_blank');

    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
}