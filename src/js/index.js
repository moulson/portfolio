$(function(){
    $('#hi').css('opacity', 0).fadeTo("slow", 1);
    $('#asd').css('opacity', 0).delay(1000).fadeTo("slow",1);
});

function scroller(el){
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#skills').offset().top
    }, 200);
}
