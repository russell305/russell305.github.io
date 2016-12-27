var main = function() {
  var slideNumber = 1;
  
  function pictureShow(slideNumber){
    switch (slideNumber) {
        case 1:
          $('#page1').show();
          $('#page2').hide();
          $('#page3').hide();
          $('#page4').hide();
          break;
        case 2:
          $('#page1').hide();
          $('#page2').show();
          $('#page3').hide();
          $('#page4').hide();
          break;
        case 3:
          $('#page1').hide();
          $('#page2').hide();
          $('#page3').show();
          $('#page4').hide();
          break;
        case 4:
          $('#page1').hide();
          $('#page2').hide();
          $('#page3').hide();
          $('#page4').show();
          break;
      }
  }
  
  pictureShow(slideNumber);
  
$('.arrow-next').click(function(){
    slideNumber ++;
  if (slideNumber == 5){
    slideNumber = 1;
  }
  pictureShow(slideNumber);
    var currentSlide=$('.active-slide');
    var nextSlide=currentSlide.next();
    
     if (nextSlide.length==0){
        nextSlide=$('.slide').first();
    }
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');
    
    var currentDot=$('.active-dot');
    var nextDot=currentDot.next();
    
     if (nextDot.length==0){
        nextDot=$('.dot').first();
    }
    
    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
    });
    
$('.arrow-prev').click(function(){
   slideNumber --;
  if (slideNumber == 0){
    slideNumber = 4;
  }
   pictureShow(slideNumber);
    var currentSlide=$('.active-slide');
    var prevSlide=currentSlide.prev();
    
    if (prevSlide.length==0){
        prevSlide=$('.slide').last();
    }
    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');
    
    var currentDot=$('.active-dot');
    var prevDot=currentDot.prev();
    
     if (prevDot.length==0){
        prevDot=$('.dot').last();
    }
    
    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
    });
    
    
};

$(document).ready(main);