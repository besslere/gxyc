/*异步加载页头和页尾*/
$("#header").load("php/header.php");
$("#footer").load("php/footer.php");
$("#country-time").load("php/country-time.php");

/*在线客服*/
$(function(){
    $('#close_im').bind('click',function(){
        $('#kefu>#main-im').css("height","0");
        $('#im_main').hide();
        $('#open_im').show();
    });
    $('#open_im').bind('click',function(e){
        $('#main-im').css("height","272");
        $('#im_main').show();
        $(this).hide();
    });
    $(".wxCtn").bind('mouseenter',function(){
        $('.weixing-show').show();
    }).bind('mouseleave',function(){
        $('.weixing-show').hide();
    });
    $('.go-top').bind('click',function(){
        $(window).scrollTop(0);
    });
});

/*轮播图*/
$(function () {
    $("#slider").responsiveSlides({
        auto: true,
        nav: true,
        speed: 500,
        timeout:4000,
        pager: true,
        pauseControls: true,
        namespace: "callbacks"
    });
});

//合作伙伴和友情链接处选项卡
function setTab(name,cursel,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        menu.className=i==cursel?"hover":"";
        con.style.display=i==cursel?"block":"none";
    }
}

/*选项卡*/
$(document).ready(function(e) {
    $(".comIntro li").click(function(){
        $(".comIntro li").eq($(this).index()).addClass("current").siblings().removeClass("current");
    });
});

/*推荐产品*/
$(".proIntro .proInfo .fix li").hover(function(){
    $(this).children(".blur_shade").animate({top:0,opacity:1},440,function(){
        $(this).parent().find("img").addClass("blur");
    });
},function(){
    $(this).children(".blur_shade").animate({top:-600,opacity:0},300,function(){
        $(this).parent().find("img").removeClass("blur");
    });
});

/*各国时间*/
(function(win, $) {
    var tzone = function(os, ds) {
        this.datetime = new Date(); // datetime
        this.offset = os; // GMT offset
        this.getDateTime=function(){
            var datetime=new Date(this.datetime.getTime() + this.offset * 3600 * 1000);
            return datetime;
        };
        this.toString = function() {
            var datetime=this.getDateTime()
            var hour = datetime.getUTCHours();
            var minute = datetime.getUTCMinutes();
            var second = datetime.getUTCSeconds();
            return hour + ':' + minute + ':' + second;
        }
    };

    var updateClocks = function() {
        $('[data-tzone]').each(function(key,el){
            var $el=$(el);
            var _tzone=parseInt($el.data('tzone'));

            var ots=$el.data('offset-date');
            var offset=parseInt($el.data('offset'));
            if(ots && offset){
                for (var key in ots) {
                    var item=ots[key];
                    var of=_tzone * 3600 * 1000;
                    var time=(new Date()).getTime() + of;
                    var start=(new Date(item[0])).getTime() + of;
                    var end=(new Date(item[1])).getTime() + of;
                    if(time>start && time<end && offset){
                        _tzone=_tzone+offset;
                    }
                }
            }

            var t=new tzone(_tzone,1);
            $el.html(t.toString());
        });
        window.setTimeout(function() {
            updateClocks();
        }, 1001);
    };
    $(function() {
        updateClocks();
    });
})(window, jQuery);

/*banner栏选项卡*/
$(document).ready(function() {
 var widget = $('.tabs-vertical');
 var tabs = widget.find('ul a'),
 content = widget.find('.tabs-content-placeholder > div');
 tabs.on('click', function (e) {
     e.preventDefault();
     var index = $(this).data('index');
     tabs.removeClass('tab-active');
     content.removeClass('tab-content-active');
     $(this).addClass('tab-active');
     content.eq(index).addClass('tab-content-active');
     });
 });
