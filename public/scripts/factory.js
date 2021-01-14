function getItem(parent,alias, add, itemConfig,  debugMode=false){
    item = add.image(itemConfig.position.x, itemConfig.position.y, itemConfig.image);
  
    item.alias = alias

    let polygonCoordinates = itemConfig.polygon

    var shape = new Phaser.Geom.Polygon(polygonCoordinates);

    item.setInteractive(shape, Phaser.Geom.Polygon.Contains);

    item.on('pointerup', ()=>{
        openExternalLink(itemConfig.url)
    }, parent);

    if(debugMode){

        //  Draw the polygon
        var graphics = add.graphics({ x: item.x - item.displayOriginX, y: item.y - item.displayOriginY });

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
    return item
}