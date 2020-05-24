/* --------------------------------
 * ハンバーガーメニュー
 * -------------------------------- */
$(".menu-toggler").click(function(){

    var topVal = 0;
    if($(this).hasClass("active")) {
        topVal = -700;
        $(this).removeClass("active");
    } else {
        $(this).addClass("active");
    }

    $("#menu").stop().animate({
        top: topVal
    }, 200);
});