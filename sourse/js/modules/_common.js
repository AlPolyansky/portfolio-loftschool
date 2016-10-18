// =========== Common module ===========

var commonModule = (function() {

    var base = new BaseModule();

    var $downClick = $(".down-click__ico");
    var $upClick = $(".up-click__ico");
    var $content = $(".page-content");
    var scrollSpeed = 700;
    var $entery = $(".entry");




    

    




    var _setUpListner = function () {
        $downClick.on("click",function(){base.scrollTo($content,scrollSpeed)});
        $upClick.on("click",function(){base.scrollTo($("body"),scrollSpeed)});

        $entery.on("click",function(e){
            e.preventDefault();
            $(this).addClass("hide");
            $(".home-page .cover").addClass("flip");
        })

        $(".cover__back a").on("click",function(e){
            e.preventDefault();
            $entery.removeClass("hide");
            $(".home-page .cover").removeClass("flip");
        })

    };
    return {
        init: function () {
            _setUpListner();
        }
    }
})();