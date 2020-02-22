function addActiveMat(obj) {
  $(".mat-basebox-active").toggleClass("mat-basebox-active mat-basebox-state");

  $(obj).toggleClass("mat-basebox-active mat-basebox-state");
}

function selectFirst() {
  addActiveMat($(".mat-basebox ").eq(0));
}

$("body").on("click",".mat-basebox",function() {
  addActiveMat(this);
});

$("body").on("click","#mat-delet",function() {
  var obj = $(".mat-basebox-active");

  obj.hide(200,function() {
      obj.css({"display":"block"});
      obj.remove();
      selectFirst();
  });
});


$("body").on("click","#mat-add",function() {
  var obj = $(".mat-basebox-active").clone().removeClass("mat-basebox-active").addClass("mat-basebox-state");

  $(".mat-basebox ").eq(0).before(obj);
  selectFirst();
});


$(window).bind("load resize",function() {

});
