// declaring global variables
var station,center,marker;
var tap;
// request for JSON of foursquare data
var clientID,clientSecret;
// to get map ocation for our requriment
function goglmap() {
    var Hyderabad  = {
        lat: 17.3850,
        lng: 78.4867
    };
    station = new google.maps.Map(document.getElementById('googlemap'), {
        zoom: 13,
        center: Hyderabad,
        mapTypeControl: false
    });
    tap = new google.maps.InfoWindow();
    center = new google.maps.LatLngBounds();   
    ko.applyBindings(new moreattract());
}
//set the Bounce function for marker
function bouncepoint(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
          marker.setAnimation(null);
      }, 1400);
    }
  }

  