function getLevelConfig(){
    var itemsConfig ={
        // "room1":{
        //     "image": "room2",
        //     "polygon":[
        //         0,0,
        //         200,0,
        //         200,100,
        //         0,100
        //     ]
        // },
        "room":{
            "image": "room",
            "polygon":[
                0,0,
                64,0,
                64,64,
                0,64
            ]
        },
        "forum":{
            "image": "forum",
            "polygon":[
                0,0,
                250,0,
                250,250,
                0,250
                
            ]
        },
        "teouvir":{
            "image": "teouvir",
            "polygon":[
                0,0,
                250,0,
                250,250,
                0,250
                
            ]
        },
        "atividade":{
            "image": "atividade",
            "polygon":[
                0,0,
                250,0,
                250,250,
                0,250
                
            ]
        },
        "plenaria":{
            "image": "plenaria",
            "polygon":[
                0,0,
                250,0,
                250,250,
                0,250
                
            ]
        },
        "ajuda":{
            "image": "ajuda",
            "polygon":[
                0,0,
                250,0,
                250,250,
                0,250
                
            ]
        },
        "back":{
            "image": "back",
            "polygon": [
                0,0,
                100,0,
                100,100,
                0,100
            ]
        }
    }
    
    return itemsConfig;
}

function getWorldConfig(){
    return {
        "maxRoomsByFloor": 6
    }
}

function getCardsInfo(){
    return [
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "forum",
            "type": "forum",
            "position":{
                "x": 400,
                "y": 500
            }
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "teouvir",
            "type": "teouvir",
            "position":{
                "x": 300,
                "y": 100
            }
        },
        {
            "url": "/class",
            "alias": "atividade",
            "type": "atividade",
            "position":{
                "x": 500,
                "y": 100
            }
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "plenaria",
            "type": "plenaria",
            "position":{
                "x": 100,
                "y": 400
            }
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "ajuda",
            "type": "ajuda",
            "position":{
                "x": 100,
                "y": 400
            }
        }
    ]
}


function getLevelInfo(){
    return [
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "1",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "2",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "3",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "4",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "5",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "6",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "7",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "8",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "9",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "10",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "11",
            "type": "room"
        },
        {
            "url": "https://www.youtube.com/watch?v=Oy_5LsOM4pg",
            "alias": "12",
            "type": "room"
        },
       

    ]
}
