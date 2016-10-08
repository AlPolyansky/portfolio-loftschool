// =========== Base module ===========

var BaseModule = function(){
    this.log = function(elem){
        return console.log(elem)
    };

    this.getPosition = function(elem,position){
        if(position == "left"){
            return $(elem).offset().left;
        }
        else if(position == "top"){
            return $(elem).offset().top;
        }

    };

    this.scrollTo = function(elem, speed){
        return $('body,html').animate({scrollTop: this.getPosition(elem,"top")}, speed);
    };

    this.cloneInsert = function(parent,element){
        return element.clone(true).prependTo(parent);
    };

    this.getUrl = function(){
        return document.location.href;
    };
    this.getPage = function(){
        return document.location.pathname.match(/([a-zA-Z]+)/)[0];
    };
    this.scrollPos = function(){
        return window.pageYOffset;
    }
    this.inWindow = function(elem){
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var currentEls = elem;
        var result = [];
        currentEls.each(function(){
        var el = $(this);
        var offset = el.offset();
        if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
          result.push(this);
    });
    return $(result);
    }
};


