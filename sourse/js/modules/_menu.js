// =========== Menu module ===========

var menuModule = (function() {

    var base = new BaseModule();
    var $menu = $(".nav");
    var $sandwich = $(".sandwich");


    var _addPopUpMenu = function () {
        return base.cloneInsert($("body"), $menu).wrapAll('<div class="popUpMenu"></div>').addClass("popUpMenu__inner");
    };

    var _setUpListner = function () {
        $sandwich.on("click",function(){
            $(this).toggleClass("sandwich_on");
            $("body").toggleClass("no-scroll");
            $(".popUpMenu").toggleClass("popUpMenu_show");
        })
    };
    return {
        init: function () {
            _addPopUpMenu();
            _setUpListner();
        }
    }
})();