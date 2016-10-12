'use strict'
var startModule = (function(){
    // Переменные

    var base = new BaseModule;

    return {
        init: function(){

            
            
        }
    };

})();






$( document ).ready(function() {

    var base = new BaseModule;

    var createObjectPostion = function(elem){
        var elements = {
            elem : [],
            top : [],
            bottom : []
        };

        $.each(elem,function(idx,data){
            var $this = $(this);
            elements.elem.push($this);
            elements.top.push(base.getPositionTotal($this).top);
            elements.bottom.push(base.getPositionTotal($this).bottom);
            
        })



        //arrayPosition.elem[i].top


        /*$(window).on("scroll",function(){
            var scroll = base.getPositionTotal("scroll").top;
            var elem = base.getPositionTotal(element.eq(0));
            if(scroll >= elem.top && scroll <= elem.bottom){
                element.eq(0).css("background","red");
            }
            else{
                element.eq(0).removeAttr("style");
            }
            console.log(   base.getPositionTotal("scroll").top        );
      })*/

      return elements;
    }


    


    commonModule.init();
    menuModule.init();
    sidebarModule.init();
    formModule.init();
    sliderModule.init();
    preloaderModule.init();
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

