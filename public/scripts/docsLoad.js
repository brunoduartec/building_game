function getLevelInfoDocs() {
  var url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRw8rGfqJ3smIBOptyO8lHbderKcMkQuLEXLsA3oFtMsqbXWeJZ0JAA7J_SraYIRqol3RbOakndByyP/pub?output=csv";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send(null);

  let levelInfo = [];

  if (xmlhttp.status === 200) {
      let item = xmlhttp.responseText.split("\n");

      for (let index = 1; index < item.length; index++) {
        const element = item[index];
        let itemParams = element.split(",");

        itemConfig = {
          "alias": itemParams[0],
          "url":itemParams[1],
          "type": "room"
        }
  
        levelInfo.push(itemConfig);
      }

      return levelInfo;
  }
}