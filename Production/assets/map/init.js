




var markerPositions = [
	{
		lat: -33.8784226,
		lng: 151.1956816, 
		title: "Mehmet Ozalp",
		videoId: "JsThE8GKb5I",
		image: "mehmetozalpsitepic.png"
	},
	{
		lat: -33.9627721,
		lng: 151.08323, 
		title: "Mahsheed Ansari",
		videoId: "M-svDJYQWqw",
		image: "mahsheedansarisitepic.png"
	},
	{
		lat: -33.962826,
		lng: 151.1324472, 
		title: "Tala",
		videoId: "3d04YYFL0MM",
		image: "talasitepic.png"
	},
	{
		lat: -33.920286,
		lng: 151.0186004, 
		title: "Rahaf Ahmed",
		videoId: "JqR7Qzv06gc",
		image: "rahafahmedsitepic.png"
	},
	{
		lat: -33.8571165,
		lng: 151.0188128, 
		title: "Jabran Chaudhry",
		videoId: "AR53nteYq6M",
		image: "jabranchaudhrysitepic.png"
	},
	{
		lat: -33.8536437,
		lng: 151.0236031, 
		title: "Mahummad Naufal",
		videoId: "rylYNEPn23w",
		image: "muhammadnaufalsitepic.png"
	}
];


for(var i = 0; i < markerPositions.length; i++) {

	$('#slider').append('<div class="sliderBox" boxid="' + i + '" id="' + 'box' + i + '"><span id="childElement"></span><div class="sliderBoxImg"><img src="images/' + markerPositions[i].image + '"/></div><div class="sliderBoxTitle">' + markerPositions[i].title + '</div></div>');

}



