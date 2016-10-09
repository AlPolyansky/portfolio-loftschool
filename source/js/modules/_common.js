// =========== Common module ===========

var commonModule = (function() {

    var base = new BaseModule();

    var $downClick = $(".down-click__ico");
    var $upClick = $(".up-click__ico");
    var $content = $(".page-content");
    var scrollSpeed = 700;


    var _setUpListner = function () {
        $downClick.on("click",function(){base.scrollTo($content,scrollSpeed)});
        $upClick.on("click",function(){base.scrollTo($("body"),scrollSpeed)});

    };
    return {
        init: function () {
            _setUpListner();
        }
    }
})();