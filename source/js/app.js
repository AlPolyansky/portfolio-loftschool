'use strict'
var startModule = (function(){
    // Переменные

    var base = new BaseModule;

    var $menu = $(".nav");
    var $sWorks = $(".s-works");
    var $sandwich = $(".sandwich");
    var $submit = $("[type = submit]");








    // Функции модуля

    var createPopUpWindow = function(text){
        $("<div class='popUpWindow hide'><div class='popUpWindow__container'><span class='popUpWindow__close'></span><p class='popUpWindow__text'>"+ text +"</p></div></div>"
            ).prependTo($("body"));

        var $popUpWindow = $(".popUpWindow");
        var position = $(window).scrollTop();
        $popUpWindow.removeClass("hide");
        $("body").toggleClass("no-scroll");
        $popUpWindow.css({"top":position});



       
        $(".popUpWindow__close").on("click",function(){
            $(this).closest($popUpWindow).addClass("hide");
            $("body").toggleClass("no-scroll");
            var $this = $(this);
            setTimeout(function(){
                $this.closest($($popUpWindow)).remove();
            },400);
            //$(this).closest($(".popUpWindow")).remove() 

        });
    }




    var validForm = function(thisElem){
        var pattern = /^([0-9a-zA-Z_-]+\.)*[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+)*\.[a-z]{2,6}$/;
        var form = thisElem.closest("form");
        var items = form.find(".input-wrap");
        var inputText = items.filter(".input-text");
        var checkbox = items.find('[name = "checkbox"]');
        var radio = items.find('[name = "radio"]');
        var error = {
                number : 0,
                text : ""
        };
        inputText.each(function(){
            var $this = $(this);
            if($this.children("input").val() === ""){
                error.number = 1;
                error.text = "Заполнены не все поля";
            }
            
            /*if($this.attr("name") == "name"){
                
            }*/
            
        })
        if(!error.number){
            if(!checkbox.prop("checked")){
                error.number = 2;
                error.text = "Вы не человек!";
            }else{
                if(!radio.prop("checked")){
                    error.number = 3;
                    error.text = "Вы точно не человек!";
                }
                else{
                    error.text = "Прошел";
                }
            }
           

            return createPopUpWindow(error.text);
            //pass.hide();
            //console.log(items.hide());
            //items.hide()
            /*if(pattern.test(email.val())){
                log("Продолжаем путь")
            }else{
                error.number = 2;
                error.text = "Email не правильный";
                return createPopUpWindow(error.text);
            };*/
        }else{
            return createPopUpWindow(error.text);
        }
      /*  if(error.number){
            
        }else{
            return createPopUpWindow(error.text);
        }*/
        

    }





    // FIXED//
    $(document).mouseup(function (e) {
        var container = $(".sidebar");
        if (container.has(e.target).length === 0){
            container.removeClass("sidebar--open");
        }
    });
    // FIXED//



    var getPage = function(){
        if(location.href.match(/blog/)) {
            //alert(12)
        }

    }

    // Прослушка

    var _setUpListner = function(){
       
        /*if(location.href.match(/blog/)) {
            $(document).on("scroll",function(){
                console.log(12);
            })
        }*/
        //console.log(getPage("blog"));
        /*$("[type = submit]").on("click",function(e){
            e.preventDefault();
            var $this = $(this);
            //console.log($this.closest("form").find(".form__item"));
            validForm($(this));
            //createPopUpWindow("Привет я попап окно!");
        });*/
    }


    

    return {
        init: function(){
            // происходит сразу
            //_addPopUpMenu();
            //_setUpListner();
            //test();
            
            
        }
    };

})();




$( document ).ready(function() {
    commonModule.init();
    menuModule.init();
    sidebarModule.init();
    formModule.init();
})

















$( document ).ready(function() {

	// TEST
	var $entery = $(".entry");


	$entery.on("click",function(){
		$(this).addClass("hide");
		$(".home-page .cover").addClass("flip");
	})

	$(".cover__back a").on("click",function(){
		$entery.removeClass("hide");
		$(".home-page .cover").removeClass("flip");
	})

// skill

function skillPercent(){
    var $skill = $(".skill");
    $skill.each(function(){
        var $this = $(this);
        var percent = $this.data("percent");
        var circle = $this.find(".skill__circle");
        circle.css({"stroke-dasharray": percent + " 100"});
    })
}
setTimeout(function(){
    skillPercent();
},2000)











})

// google map
/*
function initMap() {
        // Create a map object and specify the DOM element for display.
        var position = {lat: 60.00863023, lng: 30.24842441};
        var markerPosition =  {lat: 60.017391, lng: 30.273618};
        var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        scrollwheel: false,
        zoom: 14,
        disableDefaultUI: true
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
        }*/