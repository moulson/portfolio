$(function(){
    $('#hi').css('opacity', 0).fadeTo("slow", 1);
    $('#asd').css('opacity', 0).delay(1000).fadeTo("slow",1);
});

function scroller(el){
<<<<<<< HEAD
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#skills').offset().top
    }, 200);
}
=======
    
}

$(function(){
    $('#skill-btn').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#skills').offset().top
        }, 200);
    });

    $('#packages-btn').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#packages').offset().top
        }, 200);
    });
});
>>>>>>> 4161a36e8bd123ab67e4906fb48615bfdbdd366e
