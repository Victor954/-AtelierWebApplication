$(document).ready(function() {
    var Min = 500;
    var Max = 100000;

    $('#edit-price').keydown(function(eventObject){
      var valueKey = String.fromCharCode(eventObject.which);
      var enter = eventObject.which == 13;
      var backspace = eventObject.which == 8;

      if(!/\d/.test(valueKey) && !enter && !backspace){
        return false;
      }

      if(enter && GetSearh($(this)) ){
        $(this).val($(this).val() + "-");
      }
    });

    $('#edit-price').on('keyup input', function(event) {
      var formCheck = $(this).val();
      var lengthNums , comInsert;

      (GetSearh($(this))) ? lengthNums = 0 : lengthNums = formCheck.search('-') + 1;
      (lengthNums != 0) ?  comInsert = $("#last") : comInsert = $("#first");

      setText(comInsert,formCheck ,lengthNums);
      EditData($("#first").text(),$("#last").text(),false);
    });
    function setText(span , formCheck , lengthNums) {
      span.text(Zero(formCheck ,lengthNums ,span));
      Last(span ,formCheck);
    }
    function Last(span ,formCheck) {
      if(span.attr('id') == 'last'){
        $("#first").text(Zero(formCheck,0,$("#first"),formCheck.search('-')));
      }
    }

    function GetSearh(input) {
      return input.val().search('-') == -1;
    }
    function SetDefault(span) {
      var textId = span.attr('id');
      var num;

      (textId == 'first') ? num = Min : num = Max;
      return num;
    }
    function Zero(formCheck ,lengthNums ,span ,Endlength = formCheck.length) {
      var Num = parseInt (formCheck.substring(lengthNums , Endlength) );

      if(String(Num) == "NaN"){
        Num = SetDefault(span);
      }
      return Num;
    }
});

//Fill html obj
function EditData(minVal , maxVal , all = true) {
  if(all){
    $( "#range" ).text(minVal + " - " + maxVal + "");
    $( "#min" ).text(minVal);
    $( "#max" ).text(maxVal);
  }
  else {
    $( "#range" ).text(minVal + "р - " + maxVal + "р");

      $( "#slider-range" ).slider( "values", [minVal,maxVal]);

  }
}

$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 500,
      max: 100000,
      step:100,
      values: [ 500, 100000 ],
      slide: function( event, ui ) {
        $( "#range" ).text(ui.values[ 0 ] + "р - " + ui.values[ 1 ] + "р" );
        $("#edit-price").val('');
      }
    });

    var minVal = $( "#slider-range" ).slider( "values", 0 ) + "р";
    var maxVal = $( "#slider-range" ).slider( "values", 1 ) + "р";

    EditData(minVal , maxVal);
  } );

  //check

  var i = 1;

  $("#defaultCheck1").change( function(){
    $(".form-check-label").toggleClass("form-check-label-active");
    $(".form-check-label").toggleClass("form-check-label-unactive");
  });

  var i = 0;
  var groupCount;
  if($(window).width() > 1200){
    //scroll
    var cur = 232;
    $("#scroll-materials").scroll(function() {
        var scrollPosition = $(this).scrollLeft();
        var scrollEl = $(".box-material");
        groupCount = scrollEl.length - 2;

        if(scrollEl.length - 2 != -1){
          setScroll(this,scrollEl , i);

        }
        else{
          i = -1;
        }


        if(getScrollCur(scrollPosition,groupCount,scrollEl)){
          cur = scrollPosition;
        }
        else{
          var del = getScrollVal(scrollEl,i);

          if (cur == del && scrollPosition > del + 125){
            if(i < groupCount){
              i++;
            }
          }



          if(cur == getScrollVal(scrollEl,groupCount) && scrollPosition > cur){
            $(this).scrollLeft(cur + 50);
          }

          if (cur == del && scrollPosition < del - 125){
            if(i != 0){
              i--;
            }

          if(i == 0 && cur == getScrollVal(scrollEl,0)){
             $(this).scrollLeft(0);
          }
          }
        }
    });
  }

  function getScrollCur(scrollPosition , groupCount,scrollEl) {
    var res = false;
    var i;

    for(i = 0; i <= groupCount + 1; i++){
      if(scrollPosition === scrollEl.eq(i).outerWidth(true) * ( i + 1 )){
        res = true;
        break;
      }
    }

    return res;
  }
  function getScrollVal(scrollEl , p) {
    return scrollEl.eq(p).outerWidth(true) * ( p + 1 );
  }

  function setScroll(el , scrollEl , p) {
    $(el).scrollLeft(scrollEl.eq(p).outerWidth(true) * ( p + 1 ));
  }
 $('body').on('click', '.round-btn', function() {
    var obj = $(this).parents(".material-basebox");

    obj.hide("slow",function() {
        obj.css({"display":"block"});
        obj.remove();
    });
  });


  $(".btn-done").click( function(){
    var obj = $(this).parents(".materials-2").clone().removeClass("material-active").addClass("material-basebox");
    obj.find(".btn-done").remove();

    if($(".box-material").length == 1){
      i = 0;
    }


     $(this).parents(".materials-2").before(obj);
  });

//AddClassFocus

$(".form-dt").focus(function() {
  $(this).prev().toggleClass("anim-form-un anim-form");
});
$(".form-dt").focusout(function() {
  $(this).prev().toggleClass("anim-form-un anim-form");
});

function ganFixed(f , d = 58) {
  if( $("#sidebar-click").is("#sidebar-click") ){
    var el = $("#sidebar-click");
    var stcikTop = el.offset().top - f;
    var stickHeight = el.outerHeight(true);

    var stop = false;

    $(window).scroll(function() {
      var limit = $("#box-sidebar-top").offset().top - stickHeight;
      var winTop = $(window).scrollTop();

      if(stcikTop < winTop && !stop){
        el.css({ 'top':Math.abs(winTop - d) });
      }

      if(limit < winTop - 50){
        var diff = limit;
        el.css({ 'top':diff });

        stop = true;
      }
      else{
        stop = false;
      }
    });
}
}

function insClass(el,delClass,insClass) {
  el.removeClass(delClass).addClass(insClass);
}

function margunLeftHistory(scrollTopOff,scrollTopOffTop) {
  if( $("#sidebar-click").is("#sidebar-click") ){
    var el = $("#sidebar-click");
    var offLeft = el.parent(".col-box-burger").width() - el.outerWidth();

    el.css({"margin-left":offLeft});

    var stcikTop = el.offset().top - scrollTopOff;//72 - margin-top #sidebar-click
    var stickHeight = el.outerHeight(true);

    var stop = false;

    $(window).scroll(function() {
      var limit = $("#box-sidebar-top").offset().top - stickHeight;
      var winTop = $(window).scrollTop();

      if(stcikTop < winTop){
        insClass(el,"static-top-btn" , "fixed-top-btn");
        el.css({"top":0});
      }
      else{
        insClass(el,"fixed-top-btn" , "static-top-btn");
      }

      if(limit < winTop - scrollTopOffTop){
        var diff = limit - winTop;

        insClass(el,"fixed-top-btn" , "static-top-btn");
        el.css({"top":Math.abs($("#box-sidebar-top").offset().top) - $("#box-sidebar-top").outerHeight(true) / 2 - 10});
      }
    });
  }
}
$(window).bind("load resize",function() {
    var scrollTopOff = 72;
    var scrollTopOffTop = 50;

    if($(this).width() < 991){
      var boxLeft = $(".base-box-form").offset().left-25;
      scrollTopOff = 95;
      scrollTopOffTop = 120;

      $(".navbar-nav").css({"margin-left":boxLeft});
      $(".navbar-nav").removeClass("mx-auto");
    }
    else{
      $(".navbar-nav").addClass("mx-auto");
    }

    margunLeftHistory(scrollTopOff,scrollTopOffTop);

    if($(this).width() < 1370){
      $(".search-form input").attr("placeholder","Введите наименование");
    }
    else{
      $(".search-form input").attr("placeholder","Введите номер или название");
    }

    if($(this).width() < 1200){
      $(".col-js-auto").removeClass("col-js-auto");
      $(".col-js").removeClass("col-js");
    }
    else{
      $(".base-box-form .col-xl-3").addClass("col-js-auto");
      $(".num-js .col-xl-3").addClass("col-js");
    }

    if($(this).width() < 576){
      $(".box-footer .col-xl-6").eq(1).attr("style","");
      $(".box-footer .col-xl-6").eq(0).attr("style","");
    }
    else{

      var p = 15;

      if($(".box-js").hasClass("row")){
        p = 16;
      }

      var right =  $(window).width() - ($(".box-js").offset().left + $(".box-js").outerWidth(true)) + p;

      $(".box-footer .col-xl-6").eq(1).css({"padding-right":right});
      $(".box-footer .col-xl-6").eq(0).css({"padding-left":right});
    }

});

/* validation */

$('form').validate({
  rules: {
    userEmail: {
      email: true,
      required: true
    }
  }
});
