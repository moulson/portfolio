/*! danmoulson.com v1.0.0 | (c) 2021  | ISC License | git+https://github.com/moulson/portfolio.git */
$((function(){
    $('#hi').css('opacity', 0).fadeTo("slow", 1);
    $('#asd').css('opacity', 0).delay(1000).fadeTo("slow",1);
}));

function scroller(el){
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#skills').offset().top
    }, 200);
}

$((function(){
    $('#skill-btn').click((function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#skills').offset().top
        }, 200);
    }));

    $('#packages-btn').click((function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#packages').offset().top
        }, 200);
    }));
}));
