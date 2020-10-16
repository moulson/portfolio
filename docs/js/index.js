/*! jmpr-site v1.0.0 | (c) 2020  | ISC License | git+https://github.com/moulson/jmpr-site.git */
$((function(){
    $('#hi').css('opacity', 0).fadeTo("slow", 1);
    $('#asd').css('opacity', 0).delay(1000).fadeTo("slow",1);
}));

function scroller(el){
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#skills').offset().top
    }, 200);
}