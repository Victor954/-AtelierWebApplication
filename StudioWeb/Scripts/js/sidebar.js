function insertClass(className , el) {
  el.removeClass();
  el.toggleClass(className);
}

//History
$("#sidebar-click").click(function() {
  insertClass("context-sidebar-active" , $(".context-sidebar"));
});

$("#close").click(function() {
  insertClass("context-sidebar-close" , $(".context-sidebar-active"));

  setTimeout(function() {
    insertClass("context-sidebar" , $(".context-sidebar-close"));
  }, 1500);
});

//Sidebar main
$("#edit-btn").click(function() {
  var formFilter = $("#form-edit");

  if(formFilter.css('height') != '2px'){
    formFilter.stop().animate({height:"0px"},500);
    $("#edit-btn .icon-ed").removeClass("rotate-360").addClass("rotate-360-minus");
  }
  else{
    formFilter.stop().animate({height:$(".all-filter-box").css('height')},500);
    $("#edit-btn .icon-ed").removeClass("rotate-360-minus").addClass("rotate-360");
  }

});

$(".mouse-hide").mouseleave(function(event) {

var left = String($(this).offset().left);
var hide = String(event.pageX).substring(0,1) != left.substring(0,1);

 if($("#form-edit").css('height') != '2px' && hide){
   $("#form-edit").stop().animate({height:"0px"},500);
   $("#edit-btn .icon-ed").removeClass("rotate-360").addClass("rotate-360-minus");
 }
});

//scroll
if( $("#box-fixed").is("#box-fixed") ){
  var el = $("#box-fixed");
  var stcikTop = el.offset().top;
  var stickHeight = el.outerHeight() + 5;

  $(window).scroll(function() {
    var limit = $("#box-stop").offset().top - stickHeight - 20;

    var winTop = $(window).scrollTop();

    if(stcikTop < winTop){
      insertClass("box-fixed",el)
      el.css({ 'top':0 });
    }
    else{
      insertClass("box-none",el);
    }

    if(limit < winTop){
      var diff = limit - winTop;
      el.css({ 'top':diff });
    }
  });
}

$("#sidebar-click").click(function () {
    if ($('.his-mouse-hide', '#hide-add').length == 0) {
        setTimeout(function () {
            $('#hide-add').append('<div class="his-mouse-hide"></div>');
            $('.his-mouse-hide').width($('.group-side-context').width() * 1.4);
        }, 1300);
    };
});

$('#hide-add').on('mouseenter', '.his-mouse-hide', function () {
    $('#hide-add').one('mouseleave click', '.his-mouse-hide', function () {
        $(".group-side-context").parent().removeClass("context-sidebar-active").addClass("context-sidebar");
        if ($('.his-mouse-hide', '#hide-add').length > 0) {
            $('.his-mouse-hide').remove();
        }
    });
});