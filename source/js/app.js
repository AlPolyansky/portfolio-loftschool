$( document ).ready(function() {
    
	// TEST



	$(".entry").on("click",function(){
		$(this).hide();
		$(".cover__content").toggle();
	})

	$(".cover__content__form a").on("click",function(){
		$(".entry").show();
		$(".cover__content").toggle();
	})


	/*var $skill = $('.skill'),
   percent = parseInt($skill.data('percent')),
   deg = 360*percent/100;
	  if (percent > 50) {
	    $skill.addClass('gt-50');
	  }
  $('.skill__circle__mask').css('transform','rotate('+ deg +'deg)');*/

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