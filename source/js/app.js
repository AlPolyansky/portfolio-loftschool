$( document ).ready(function() {
    
	// TEST
	var $entery = $(".entry");


	$entery.on("click",function(){
		$(this).toggleClass("hide");
		$(".home-page .cover").toggleClass("flip");
	})

	$(".cover__content__form a").on("click",function(){
		$entery.toggleClass("hide");
		$(".home-page .cover").toggleClass("flip");
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

});