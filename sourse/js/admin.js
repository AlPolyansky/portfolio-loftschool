'use strict'
var adminModule = (function(){
    // Переменные

    var _tabsInit = function(){
        
        var $tabs = $('.tabs__list');
        var $tabsItem = $tabs.find('.tabs__item');
        var $tabsActive = $tabsItem.filter('.active');

        console.log($(".tabs__list"));

        $tabsItem.on('click', function(){
            alert(12)
        })
        
    }


    return {
        init: function(){

            _tabsInit();
            
        }
    };

})();






$( document ).ready(function() {

    adminModule.init();
    
})
