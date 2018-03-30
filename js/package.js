/**
 * Created by Administrator on 2017/2/23.
 */
/*详情的展开和隐藏*/
$('.set').click(function(){
    if($('.mcLogis').is(':hidden')){
        $('.mcLogis').fadeIn(2000);
    }else{
        $('.mcLogis').fadeOut(2000);
    }
});