var map;

function initMap() {
	x=navigator.geolocation;
	//alert (x);
	x.getCurrentPosition(success, failure);
	
	//var coords = new google.maps.LatLng(myLat, myLong);
	//var mapOptions = {
	//		zoom:15,
	//		center:coords,
	//		mapTypeId:google.maps.MapTypeId.ROADMAP
	//}
	//var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	//var marker = new google.maps.Marker({map:map, position:coords});
  //map = new google.maps.Map(document.getElementById('map'), {
  //  center: {
  //    lat: myLat,
  //    lng: myLong
  //  },
  //  zoom: 15
  //});
}

function success(position) 
{ 
	var myLat = position.coords.latitude;
	var myLong = position.coords.longitude;
	alert (myLat);
	alert (myLong);
}
function failure() {}