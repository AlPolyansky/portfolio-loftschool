$( document ).ready(function() {
    
	// TEST
	var $entery = $(".entry");


	$entery.on("click",function(){
		$(this).addClass("hide");
		$(".home-page .cover").addClass("flip");
	})

	$(".cover__content__form a").on("click",function(){
		$entery.removeClass("hide");
		$(".home-page .cover").removeClass("flip");
	})



var $skill = $('.skill');
  $skill.on("mouseenter",function(){
  	
   var percent = parseInt($skill.data('percent'));
   var deg = 360*percent/100;
	  if (percent > 50) {
	  	setTimeout(function(){
	  		$skill.addClass('gt-50');
	  	},520);
	    
	  }
  	$('.skill__circle__mask').css('transform','rotate('+ deg +'deg)');
  })

// google map






});

function initMap() {
        // Create a map object and specify the DOM element for display.
        var position = {lat: 60.00863023, lng: 30.24842441};
        var markerPosition =  {lat: 60.017391, lng: 30.273618};
        var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        scrollwheel: false,
        zoom: 14
        });
        var image = {
			  url: "./assets/img/map-marker.png",
			  size: new google.maps.Size(71, 71),
			  //origin: new google.maps.Point(0, 0),
			  anchor: new google.maps.Point(17, 40),
			  scaledSize: new google.maps.Size(40, 56)
			};
        var marker = new google.maps.Marker({
		    position: markerPosition,
		    map: map,
		    title: 'Hello World!',
		    icon: image,
  			});
        var styles = [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#86a77a"
            }
        ]
    }
]
        map.setOptions({styles: styles});
        }