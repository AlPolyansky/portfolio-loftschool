// =========== Skills module ===========

var skillsModule = (function() {

    var base = new BaseModule();
    var $skill = $(".skill");
    var $content = $(".page-content");

    var skillPercent = function(){
        
        $skill.each(function(){
            var $this = $(this);
            var percent = $this.data("percent");
            var circle = $this.find(".skill__circle");
            circle.css({"stroke-dasharray": percent + " 100"});
        })
    }

    var skillsInit = function(){
        if(base.getPositionTotal("scroll").top >= $content.offset().top - 100){
            skillPercent();
        }
    }


    return {
        init: function () {
            $(window).on("scroll",function(){
                skillsInit();
            })
            
        }
    }
})();