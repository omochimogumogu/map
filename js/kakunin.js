
var w = 1000;
var h = 1000;

var svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

var projection = d3.geo.mercator()
        		.center([136.884430,35.173453]) //地図の中心を交通ビルに指定
        		.translate([w/2, h/2])
        		.scale(30000000);
// 緯度経度⇒パスデータ変換設定
var path = d3.geo.path()
	.projection(projection);

var func_list = [];

var color = ["yellow","pink","green","white"];




/**************日本地図**************/

d3.json("../map/json/polbnda_jpn.topojson", function(json) {
    var japan = topojson.object(json, json.objects.polbnda_jpn).geometries;
    console.log(japan);

    // パスデータとして日本地図描画
    svg.selectAll("path")
    .data(japan)
    .enter()
    .append("path")
    .attr("d", path);
});

d3.json("../map/json/riverl_jpn.topojson", function(json) {
    var japan = topojson.object(json, json.objects.riverl_jpn).geometries;
    console.log(japan);

    // パスデータとして日本地図描画
    svg.selectAll("path")
    .data(japan)
    .enter()
    .append("path")
    .attr("d", path);
});

d3.json("../map/json/roadl_jpn.topojson", function(json) {
    var japan = topojson.object(json, json.objects.roadl_jpn).geometries;
    console.log(japan);
    // パスデータとして日本地図描画
    svg.selectAll("path")
    .data(japan)
    .enter()
    .append("path")
    .attr("d", path);
});




/**************共有中ユーザ軌跡**************/

d3.csv("../map/u_locations.csv", function(error,data){
    //ユーザID(UID)をキーにネストする
    var dataSet = d3.nest()
              .key(function (d) { return d.UID; })
              .entries(data);

    var array = [];

    var translatedArray = [];

    d3.select("body")
  	.append("svg")

    for(var i=0; i<dataSet.length; i++){

      for(var j=0; j<dataSet[i].values.length; j++){

      	var latitude = dataSet[i].values[j].LAT;
      	var longitude = dataSet[i].values[j].LON;

      	if(latitude!=0||longitude!=0) //経度緯度のいずれかが0の場合は描画しない
      	{
        	var a = projection([latitude , longitude]);
        	array.push(a);
          $("body").text(dataSet);
      }

      }

      console.log(array);

      // d3.select("svg")
      //     .append("polyline")
      //     .attr("points", array)
      //     .attr("stroke", color[i] )
      //     .attr("stroke-opacity", 1 )
      //     .attr("fill", "none")
      //     .attr("stroke-width", 1)

      }

});
