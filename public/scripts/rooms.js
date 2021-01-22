
var config = {
    type: Phaser.AUTO,
    scale: {
        parent: "gameContainer",
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var itemsConfig = getLevelConfig();
var items = getLevelInfoDocs("atividades");
var worldConfig = getWorldConfig();


function update (time, delta)
{
    this.controls.update(delta);
}


function preload ()
{
    this.background = new Phaser.Display.Color(255, 255, 255);
    this.cameras.main.setBackgroundColor(this.background);

    let itemsArrayValue = Object.values(itemsConfig)
    itemsArrayValue.forEach(config => {
        this.load.image(config.image,`../assets/${config.image}.png`);
    });
}

function placeRooms(parent, add, debugMode){
    roomHeight = 100;
    roomWidth = 100;
    offsetX = 256
    offsetY = 350
    deltaY = 10* (parseInt(items.length/ worldConfig.maxRoomsByFloor) -1 )
    textDeltaX = 10
    textOffsetX = 18
    textDeltaY = 22

    for (let index = 0; index < items.length; index++) {
        console.log(index)
        let itemInfo = items[index]
        let itemConfig = itemsConfig[itemInfo.type]

        let i = index%worldConfig.maxRoomsByFloor
        let j = parseInt(index / worldConfig.maxRoomsByFloor)

        let x =  i*roomWidth +offsetX
        let y =  j * roomHeight - (offsetY + deltaY)

        let config = {
            image: itemConfig.image,
            polygon: itemConfig.polygon,
            position: {
                x:x,
                y:y
            },
            url: itemInfo.url
        }

        let it = addItem(parent, itemInfo.alias, add, config, debugMode)

        size = parseInt(itemInfo.alias)/10

        let text1 = add.text(it.x - (textOffsetX + size * textDeltaX), it.y - textDeltaY, itemInfo.alias, { font: "45px Arial Black" });
    }

}


function placeBackButton(parent, add, debugMode){
    let itemConfig = itemsConfig["back"]

    let x = 100;
    let y = - window.innerHeight/2;

    let config = {
        image: itemConfig.image,
        polygon: itemConfig.polygon,
        position: {
            x:x,
            y:y
        },
        url: "/"
    }
    let it = addItem(parent, "back", add, config, debugMode)
}

function create ()
{

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

    let t= this.add.text(window.innerWidth/2 - 400, -window.innerHeight/2 - 300,"Salas", { font: "200px Arial Black" , fill: "#0F0" });

    placeRooms(this, this.add, false);
    placeBackButton(this, this.add, false);
}