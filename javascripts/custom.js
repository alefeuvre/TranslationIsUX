var slideshowHasBeenBuilt = false,
slideshowStep = "disabled",

buildSlideshow = function() {
  
  // Hide on phones, portrait tablet and IE
  if ($("#garcon-a-slideshow-please").css("display") != "none") {

    // Content
    var windowHeight = $(window).height();     
    $(".content").css({
      "height": windowHeight,
      "display": "table-cell"
    });
    
    // Header and footer
    if (slideshowStep == "disabled") {
      $("header").css("position", "fixed");      
      footer = $("footer");        
      footer.css("position", "fixed");         
      footer.find(".credits").hide();        
      footer.find(".top").hide(); 
      footer.find(".next").hide(); 
      footer.find(".down").show(); 
      footer.find(".slideshare").show(); 
      footer.find(".start").show();
      slideshowStep = "tobestarted"; 
    }
    
    // Menu
    if (!slideshowHasBeenBuilt) {      
      $("#menu").onePageNav(); 
          
      $("#menu a, footer .top").click(function(event){		
        event.preventDefault();          
        scrollTo($($(this).attr("href")));            
      });		
          
      $("footer .down").click(function(event){      
        event.preventDefault();          
        articleId = "#article";
        currentArticle = $("#menu .current").find("a").attr("href").substr(articleId.length,1);
        nextArticle = parseInt(currentArticle) + 1;
        scrollTo($($(articleId + nextArticle)));       
      });		
    }
    
    slideshowHasBeenBuilt = true;
    
  // Un-slideshow  
  } else if (slideshowHasBeenBuilt && slideshowStep != "disabled") {
    $("header").css("position", "relative");       
    
    $(".content").css({
      "height": "auto",
      "display": "block"
    });
    
    footer = $("footer");        
    footer.css("position", "relative").removeClass("hideable");          
    footer.find(".columns").hide();
    footer.find(".credits").show();
    slideshowStep = "disabled";
  }
},

updateSlideshowBar = function(position) {
  
  if (slideshowStep != "disabled") {
    switch(position) {
      case "article1":
        if (slideshowStep != "tobestarted") { 
          footer = $("footer");        
          footer.find(".credits").hide(); 
          footer.find(".top").hide(); 
          footer.find(".next").hide(); 
          footer.find(".down").show(); 
          footer.find(".slideshare").show();         
          footer.find(".start").show();
          footer.removeClass("hideable");
          slideshowStep = "tobestarted";
        }
      break;
      
      case "article7":   
        if (slideshowStep != "ended") {   
          footer = $("footer");
          footer.find(".down").hide(); 
          footer.find(".slideshare").hide();
          footer.find(".credits").show();
          footer.find(".top").show(); 
          footer.removeClass("hideable");
          slideshowStep = "ended";
        }
      break;    
      
      default:
        if (slideshowStep != "started") {  
          footer = $("footer");
          footer.find(".credits").hide(); 
          footer.find(".slideshare").hide();         
          footer.find(".start").hide();
          footer.find(".down").show(); 
          footer.find(".top").show(); 
          footer.find(".next").show(); 
          footer.addClass("hideable");
          slideshowStep = "started";  
        }
      break;
    }
  }
}

scrollTo = function(destination) {
  $('html,body').animate({scrollTop:destination.offset().top}, 800);        
};

jQuery(document).ready(function($) {
  buildSlideshow();
});

jQuery(window).resize(function($) {
  buildSlideshow();
});