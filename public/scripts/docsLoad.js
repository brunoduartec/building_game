
let docLinkByType={
  "frentes": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRw8rGfqJ3smIBOptyO8lHbderKcMkQuLEXLsA3oFtMsqbXWeJZ0JAA7J_SraYIRqol3RbOakndByyP/pub?gid=1693918998&single=true&output=csv",
  "atividades": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRw8rGfqJ3smIBOptyO8lHbderKcMkQuLEXLsA3oFtMsqbXWeJZ0JAA7J_SraYIRqol3RbOakndByyP/pub?gid=0&single=true&output=csv"
}


function getLevelInfoDocs(loadType) {
  var url = docLinkByType[loadType];
  
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send(null);

  let levelInfo = [];

  if (xmlhttp.status === 200) {
      let item = xmlhttp.responseText.split("\n");
      console.log(item)

      for (let index = 1; index < item.length; index++) {
        const element = item[index];
        let itemParams = element.split(",");

        let itemType = (itemParams[2] && itemParams[2].length > 0) ? itemParams[2] : "room"

        let isVisible = itemParams[3].trim() == "sim"? true: false;

        console.log("-----",itemParams[3].trim(), itemParams[3].trim() == "sim",  isVisible)

        if(isVisible){
          itemConfig = {
            "alias": itemParams[0],
            "url":itemParams[1],
            "type": itemType.trim()
          }
    
          levelInfo.push(itemConfig);

        }
      }

      return levelInfo;
  }
}