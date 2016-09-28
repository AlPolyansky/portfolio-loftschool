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

});