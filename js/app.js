//Essa função Debounce do Lodash corrige acoes desnecessárias melhorando a performance do site.
debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

(function() {
    var $target = $('.anime'),
        animationClass = 'anime-start',
        offset = $(window).height() * 3 / 4

    function animeScroll() {
        var documentTop = $(document).scrollTop();

        $target.each(function() {
            var itemTop = $(this).offset().top;
            if (documentTop > itemTop - offset) {
                $(this).addClass(animationClass);
            } else {
                $(this).removeClass(animationClass);
            }
        })
    }

    animeScroll();

    $(document).scroll(debounce(function() {
        animeScroll();
    }, 200));
}());


$(document).ready(function() {
    $("ul.nav li a[href^='#']").click(function() {
        $("html, body").stop().animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 400);
    });
});