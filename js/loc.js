// to get stations of my interest
var  stations = [
    {
        heading: 'Golkonda',
        location: 
        {
          lat: 17.3833,
          lng: 78.4011
        }
      },  
      {
        heading: 'Charminar ',
        location: 
        {
          lat: 17.3616,
          lng: 78.4747
        }
      },
       {
        heading: 'Hussain Sagar',
        location: 
        {
          lat: 17.4239,
          lng:78.4738 
        }
      }, 
      {
        heading: 'Salar Jung Museum',
        location: 
        {
          lat: 17.3713,
          lng: 78.4804
        }
      }, 
      {
        heading: 'chowmahalla palace',
        location: 
        {
          lat: 17.3578,
          lng: 78.4717    
        }
      }, 
      {
        heading: 'nehru zoological park',
        location: 
        {
          lat: 17.3506,
          lng: 78.4519
        }
      },
      {
        heading: 'ramoji film city ',
        location: 
        {
          lat: 17.2543,
          lng: 78.6808
        }
      }
    ];
//this function is used to show the location
var exactloc = function(content) {
    var self = this;
    this.heading = content.heading;
    this.position = content.location;
    this.street = '',
    this.city = '',
    this.phone = '';
    this.visible = ko.observable(true);
    clientID = 'MJT5ENETQAGNLNGETKHBQHJ4HVTM503QWCFDNKV5CPUQWKD5';
    clientSecret = 'UPUJNPWQVO13T2XWRDS0KATXKLEU4JHFJYDLKVJMJD1CWYPU';
    // storing the position variable with location 
    var link = 'https://api.foursquare.com/v2/venues/search?ll=' + this.position.lat + ',' + this.position.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + this.heading;
    $.getJSON(link).done(function(content) {
		var output = content.response.venues[0];
        self.street = output.location.formattedAddress[0] ? output.location.formattedAddress[0]: 'No street found';
        self.city = output.location.formattedAddress[1] ? output.location.formattedAddress[1]: 'No City found';
        self.phone = output.contact.formattedPhone ? output.contact.formattedPhone : 'No phone found';
    }).fail(function() {
        alert('Oops!! some wrong with API foursquare');
    });
    this.marker = new google.maps.Marker({
        position: this.position,
        heading: this.heading,
        animation: google.maps.Animation.DROP,
        icon: marker
    });    
    self.remove = ko.computed(function () {
        if(self.visible() === true) {
            self.marker.setMap(station);
            center.extend(self.marker.position);
            station.fitBounds(center);
        } else {
            self.marker.setMap(null);
        }
    });    
    this.marker.addListener('click', function() {
        locdata(this, self.street, self.city, self.phone, tap);
        bouncepoint(this);
        station.panTo(this.getPosition());
    });
    // show station selected from list
    this.show = function(location) {
        google.maps.event.trigger(self.marker, 'click');
    };
    // show bounce effect when list is selected
    this.fall = function(station) {
		google.maps.event.trigger(self.marker, 'click');
	};
};
/* main design function*/
var moreattract = function() {
    var self = this;
    this.findstation = ko.observable('');
    this.some = ko.observableArray([]);
    // adding location for the selected
    stations.forEach(function(location) {
        self.some.push( new exactloc(location) );
    });
    // stations identified on map
    this.stationlist = ko.computed(function() {
        var findfilter = self.findstation().toLowerCase();
        if (findfilter) {
            return ko.utils.arrayFilter(self.some(), function(location) {
                var str = location.heading.toLowerCase();
                var sink = str.includes(findfilter);
                location.visible(sink);
				return sink;
			});
        }
        self.some().forEach(function(location) {
            location.visible(true);
        });
        return self.some();
    }, self);
};
//this function make the tap when it is clicked
function locdata(marker, street, city, phone, tap) {
    if (tap.marker != marker) {
        tap.setContent('');
        tap.marker = marker;
        tap.addListener('closeclick', function() {
            tap.marker = null;
        });
        var streetview = new google.maps.StreetViewService();
        var radius = 50;
        var windowdata = '<h5>' + marker.heading + '</h5>' + 
            '<p>' + street + "</br>" + city + '</br>' + phone + "</p>";
        var getview = function (content, site) {
            if (site == google.maps.StreetViewStatus.OK) {
                var viewlocation = content.location.latLng;
                tap.setContent(windowdata);
            }
            else {
                tap.setContent(windowdata + '<div style="color: darkorchid">No Street View Found</div>');
            }
        };
        streetview.getPanoramaByLocation(marker.position, radius, getview);
        tap.open(station, marker);
    }
}
  //function to map error
function errorinMap() {
    alert('Oops!An error.');
}
