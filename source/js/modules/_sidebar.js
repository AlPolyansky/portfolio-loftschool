// =========== Sidebar module ===========

var sidebarModule = (function() {

    var base = new BaseModule();
    var $sidebar = $(".sidebar");
    var $sidebarList = $sidebar.find(".sidebar__list")
    var $sidebarButton = $(".sidebar__button");
    var $article = $("article");
    var $articleTitle = $article.find(".article__title");
    var open = "sidebar--open";
    var fixed = "sidebar--fixed";
    
    
    



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
  	}


  	var sibebarScroll = function(gutter,speed){
  		$(".sidebar__link").on('click',function(e){
  			e.preventDefault()
  			var attr = $(this).data("id");
  			$thisArticle = $("article[data-id="+ $(this).data("id") +"]");
  			$('body,html').animate({scrollTop: $thisArticle.offset().top - gutter}, speed);

  		})
  	}

  	var addActiveClass = function(){
  		$(window).on("scroll",function(){
  			var viewArtcile = base.inWindow($article).data("id");
  			var $sidebarItem = $sidebarList.find(".sidebar__item");
  			var active = $sidebarItem.find(".sidebar__link[data-id="+ viewArtcile +"]");
  			$sidebarItem.removeClass("sidebar__item_active");
  			active.parent().addClass("sidebar__item_active");
  		})
  		
  	}



    var _addSidebar= function(){
    	
    	createItems();
    	sibebarScroll(20,400);
    	addActiveClass();

    };


    var _openSidebar = function(){
    	$sidebarButton.on("click",function(e){
            e.preventDefault();
            $sidebar.toggleClass(open);
            
        });
    };

    var _stickSidebar = function(){
    	$(window).on("scroll",function(){
				if(base.scrollPos() >= base.getPosition($article[0],"top")){
    			sidebarAddClass(fixed);
    		}else{
    			sidebarRemoveClass(fixed);
    		}

    	})
    };

    var _setUpListner = function () {
    	if(base.getPage() == "blog"){
    		_addSidebar();
    		_stickSidebar();
    		_openSidebar();
    		
    	}
    };


    return {
        init: function () {
            _setUpListner();
        }
    };


})();
