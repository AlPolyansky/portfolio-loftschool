'use strict'
var startModule = (function(){
    // Переменные

    var base = new BaseModule;

    // FIXED//
    $(document).mouseup(function (e) {
        var container = $(".sidebar");
        if (container.has(e.target).length === 0){
            container.removeClass("sidebar--open");
        }
    });
    // FIXED//



    // Прослушка




    

    return {
        init: function(){

            
            
        }
    };

})();




$( document ).ready(function() {
    commonModule.init();
    menuModule.init();
    sidebarModule.init();
    formModule.init();
    sliderModule.init();
})

















$( document ).ready(function() {

	// TEST


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

