// =========== Sidebar module ===========

var sidebarModule = (function() {

    var base = new BaseModule();
    var $sidebar = $(".sidebar");
    var $sidebarList = $sidebar.find(".sidebar__list");
    var $sidebarItem = $sidebarList.find(".sidebar__item");
    var $sidebarButton = $(".sidebar__button");
    var $article = $("article");
    var $articleTitle = $article.find(".article__title");
    var $blog = $(".blog-page");
    var $html = $("html");
    var $sandwich = $(".sandwich");
    var startActive = 350;
    var scrollSpeed = 700;
    if(base.getPage() == "blog"){
      var $sidebarPos = base.getPositionTotal($sidebar)[0].top;
    }
    

    //console.log($sidebar.offset().top);
    


    var open = "sidebar--open";
    var fixed = "sidebar--fixed";
    var contentPush = 'content-push';
    var noScroll = 'no-scroll';
    var hide = "hide";
    
    
    



    var sidebarAddClass = function(className){
      $sidebar.addClass(className);
    };

    var sidebarRemoveClass = function(className){
    	$sidebar.removeClass(className);
    };

    var createItems = function(){
	   for(var i = 0; i < $article.length;i++){
	   		$("<div class='sidebar__item'><a href='#' data-id='"+ (i + 1) +"' class='sidebar__link'>"+ $articleTitle.eq(i).text() +"</a></div>")
	   		.appendTo($sidebarList);
	   		$article.eq(i).attr("data-id",(i + 1));
	    }
  	};

    var clearClasess = function(){
      $sidebar.removeClass(open);
      $blog.removeClass(contentPush);
      $html.removeClass(noScroll);
      $sandwich.removeClass(hide);
    }


  	var sibebarScrollTo = function(gutter,speed){
  		$(".sidebar__link").on('click',function(e){
  			e.preventDefault();
        $this = $(this);
        if($this.closest($sidebar).hasClass(open)){
          clearClasess();
        }
  			var attr = $this.data("id");
  			$thisArticle = $("article[data-id="+ $(this).data("id") +"]");
  			$('body,html').animate({scrollTop: $thisArticle.offset().top - gutter}, speed);
  			if($sidebar.hasClass(fixed)){
  				$(".wrapper").removeClass(open);
  			}
  		})
  	};

  

  	var viewElement = function(elem,gutter){
      var scroll = base.getPositionTotal("scroll");
      $.each(elem,function(i){
          
        $thisPosition = base.getPositionTotal(elem);
        
        var last = elem.length - 1;
        var margin = $thisPosition[1].top - $thisPosition[0].bottom;
        
        if(scroll.top < $thisPosition[0].top){
          
          $(".sidebar__item").eq(0).addClass("sidebar__item_active")
        }

        if(scroll.top + gutter > $thisPosition[last].top){
          $(".sidebar__item").eq(last).addClass("sidebar__item_active")
        }

       if((scroll.top + gutter >= $thisPosition[i].top) && ($thisPosition[i].bottom + margin>= scroll.top + gutter)){

            $(".sidebar__item").eq(i).addClass("sidebar__item_active")
            $(".sidebar__item").eq(i).siblings().removeClass("sidebar__item_active")
        }
      })
  	 };

    var _removeClassesOnResize = function(){
      $(window).on("resize",function(){
        if($sidebar.hasClass(open)){
          clearClasess();
        }
      })
    }



    var _addSidebar= function(){
    	createItems();
    	sibebarScrollTo(20,scrollSpeed);

    };


    var _openSidebar = function(){
    	$sidebarButton.on("click",function(e){
            e.preventDefault();
            $blog.toggleClass(contentPush);
            $sidebar.toggleClass(open);
            $sandwich.toggleClass(hide);
            $html.toggleClass(noScroll);
            
        });
    };

    var stickSidebar = function(elem){
  			if($(document).scrollTop() >= $sidebarPos){
    			$sidebar.addClass(fixed);

    		}else{
          $sidebar.removeClass(fixed);
    		}

    };

    var _outClick = function(){
      $(document).mouseup(function (e) {

        var container = $sidebar;
        if (container.has(e.target).length === 0){
           clearClasess();

        }
      });
    }

    var _setUpListner = function () {
    		_addSidebar();
    		_openSidebar();
        _removeClassesOnResize();
        _outClick();
        	
    	
      $(window).on("scroll load",function(){
        viewElement($(".article__item"),startActive);
        stickSidebar($sidebar);
      })
    };


    return {
        init: function () {
            _setUpListner();
        }
    };


})();
