
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
var items = getCardsInfo();

function update (time, delta)
{
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

function placeCards(parent, add, debugMode){
    items.forEach(item => {
        let itemConfig = itemsConfig[item.type]
        let config = {
            image: itemConfig.image,
            polygon: itemConfig.polygon,
            position: item.position,
            url: item.url
        }

        let it = getItem(parent, item.alias, add, config, debugMode )
    });
}


function placeCardsAlongCircle(parent, add, debugMode){
    let teta = 0;
    let deltaTeta = (2*Math.PI) / items.length;
    let center = {
        x: window.innerWidth/2,
        y: 380
    }
    let r = 250;
    items.forEach(item => {
        let itemConfig = itemsConfig[item.type]

        console.log(teta, Math.cos(teta))

        let x = r * Math.sin(teta) + center.x;
        let y = r * Math.cos(teta) + center.y;
        teta+=deltaTeta;


        // console.log(x,y)

        let config = {
            image: itemConfig.image,
            polygon: itemConfig.polygon,
            position: {
                x:x,
                y:y
            },
            url: item.url
        }


        let it = getItem(parent, item.alias, add, config, debugMode )
    });
}



function create ()
{
    placeCardsAlongCircle(this, this.add, false)    
}