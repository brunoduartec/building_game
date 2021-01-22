
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
var items = getLevelInfoDocs("frentes");


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
    
    console.log("*****************************VAI COLOCAR", itemsConfig)
    
    items.forEach(item => {

        console.log("-------ITEM-------", item)
        let itemConfig = itemsConfig[item.type]
        console.log("=================",itemConfig)
        let config = {
            image: itemConfig.image,
            polygon: itemConfig.polygon,
            position: item.position,
            url: item.url
        }

        let it = addItem(parent, item.alias, add, config, debugMode )
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

    for (let index = 0; index < items.length; index++) {
        let itemInfo = items[index]

        console.log("------A--------", itemInfo.type.trim())
        console.log(itemInfo)
        console.log(itemsConfig)
        console.log( typeof itemsConfig)
        console.log(itemsConfig[itemInfo.type.trim()])



            let itemConfig = itemsConfig[itemInfo.type.trim()]

            let x = r * Math.sin(teta) + center.x;
            let y = r * Math.cos(teta) + center.y;
            teta+=deltaTeta;

            let config = {
                image: itemConfig.image,
                polygon: itemConfig.polygon,
                position: {
                    x:x,
                    y:y
                },
                url: itemInfo.url
            }
            let it = addItem(parent, itemInfo.alias, add, config, debugMode )
    }
}



function create ()
{
    placeCardsAlongCircle(this, this.add, false)    
}