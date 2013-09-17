$(document).ready(function(){
  
  $("rect").mousemove(function(event){

    $('.popover').css({'margin-left':event.pageX,
                      'margin-top':event.pageY - 50                      
                    }).show();       

    $(".popover-title").html($(this).attr("title"));
    $(".popover-content").html($(this).attr("popover-content"));

    $(this).css({'opacity':0.4});

  });

  $("rect").mouseout(function(){
      $('.popover').hide();
      $(this).css({'opacity':1});
  });

  $(".cross_filter").on('click',function(){    
    alert();

  });


});
