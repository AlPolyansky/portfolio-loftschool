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
    commonModule.init();
    menuModule.init();
    
    formModule.init();
    sliderModule.init();
    preloaderModule.init();
    skillsModule.init();
    if(base.getPage() == "blog"){
        sidebarModule.init();
    }
    
})
