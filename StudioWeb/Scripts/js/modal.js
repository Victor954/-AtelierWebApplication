function addActiveMat(obj) {
  $(".mat-basebox-active").toggleClass("mat-basebox-active mat-basebox-state");

  $(obj).toggleClass("mat-basebox-active mat-basebox-state");
}

function selectFirst() {
  addActiveMat($(".mat-basebox ").eq(1));
}

$("body").on("click", ".mat-basebox", function () {
    if (!$(this).hasClass("mat-basebox-main")) {
        addActiveMat(this);
    }

});

//Элементы управления

$("body").on("click", "#mat-delet", function () {
    var id = $(".mat-basebox-active").find(".id-material").val();

    if (typeof id != "undefined") {
        $.ajax({
            url: "/Home/DeleteMaterialsDb",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Id: id
            }),

            success: function () {
                var obj = $(".mat-basebox-active");

                obj.hide(200, function () {
                    obj.css({ "display": "block" });
                    obj.remove();
                    selectFirst();
                });
            }
        });
    }

});

//Создание оъекта 

var x = 50;
var c;

function gg(error) {
    c = error;
}

function addCartMaterials(id) {
    var obj = $(".mat-basebox-main").clone().removeClass("mat-basebox-main").attr("id", "box-get-" + id);
    obj.find(".id-material").val(id);

    $(".mat-basebox-main").after(obj);
    selectFirst();
}

$("#material-active").validate({
    NameMaterialCr: {
        Empty: true
    },
    CoutMaterialCr: {
        Number: true
    },
    PriceMaterialCr: {
        Number: true
    }
}, "#mat-add", function (error) {
    if (error) {
        gg(true);
    }
    else {
        gg(false);
    }

    if (c) {

        var id = $("#ProductId").attr('placeholder').substring(1, $("#ProductId").attr('placeholder').length);

        $.ajax({
            url: "/Home/AddMaterialsDb",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                NameMaterial: $("#material-active").find("#nameMaterial").val(),
                CountMaterial: $("#material-active").find("#count").val(),
                PriceMaterial: $("#material-active").find("#price").val(),
                Coment: $("#material-active").find("#coment").val(),
                ProductId: id
            }),

            success: function (data) {
                addCartMaterials(data)
                GetCountPrice();
            }
        });
    }
    });

//Сохраниение оъекта 

$("body").on("click", "#mat-save", function () {
    var err;

    $(".mat-basebox-active").validateDynamic({
        NameMaterialCr: {
            Empty: true
        },
        CoutMaterialCr: {
            Number: true
        },
        PriceMaterialCr: {
            NumberFloat: true
        }
    }, function (error) {
        err = error;
    });

    if (err) {
        $.ajax({
            url: "/Home/SaveMaterialsDb",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                NameMaterial: $(".mat-basebox-active").find("#nameMaterial").val(),
                CountMaterial: $(".mat-basebox-active").find("#count").val(),
                PriceMaterial: $(".mat-basebox-active").find("#price").val(),
                Coment: $(".mat-basebox-active").find("#coment").val(),
                MaterialId: $(".mat-basebox-active").find(".id-material").val()
            }),

            success: function () {
                $(".mat-basebox-active").stop().animate({ opacity: 0.6 }, 400).animate({ opacity: 1 }, 400);
            }
        });
    }
});

/*
*Подсчет шекелей
*/
$(document).on("change", "input[name = PriceWorkInner]", function () {
    GetCountPrice();
});
$(document).on("change", "input[name = PriceCustomer]", function () {
    GetCountPrice();
});
$(document).on("change", "input[name = PriceWorkOuter]", function () {
    GetCountPrice();
});
$(document).on("click", "#mat-save", function () {
    GetCountPrice();
});
$(document).on("click", "#mat-delet", function () {
    GetCountPriceMin();
});

var total = 0;

function SetTotal() {
    var len = $(".mat-basebox").length;

    for (var i = 1; i < len; i++) {
        var obj = $(".mat-basebox").eq(i);

        var count = getNumber(obj.find('#count').val());
        var price = getNumber(obj.find('#price').val());

        total += count * price;
    }
}




function GetCountPrice() {
    SetTotal();
    $("input[name = PriceMaterial]").val(NumberSql(total));

    GetAllPrice();
    GetProfite();
}

function GetCountPriceMin() {

    SetTotal();

    var obj = $(".mat-basebox-active");

    var count = getNumber(obj.find('#count').val());
    var price = getNumber(obj.find('#price').val());

    total -= count * price;

    $("input[name = PriceMaterial]").val(NumberSql(total));

    GetAllPrice();
    GetProfite();
}

function GetAllPrice() {
    $("input[name = PriceCount]").val(NumberSql(
        getNumber($("input[name = PriceMaterial]").val()) +
        getNumber($("input[name = PriceWorkInner]").val()) +
        getNumber($("input[name = PriceWorkOuter]").val())));

    total = 0;
}

function GetProfite() {

    $("input[name = Profit]").val(NumberSql(getNumber($("input[name = PriceCustomer]").val()) - getNumber($("input[name = PriceCount]").val())));
    total = 0;
}


//css//

$(document).on('focus', '.box-date-work .form-control', function () {
    $(this).siblings(".left-text-tag").stop().animate({ "border-bottom-color":"#db534d" },200);
});
$(document).on('focusout', '.box-date-work .form-control', function () {
    if (!$(this).siblings(".left-text-tag").hasClass("left-text-tag-act")) {
        $(this).siblings(".left-text-tag").stop().animate({ "border-bottom-color": "#acabab" }, 200, function () {
            $(this).attr('style', '');
        });
    }
    else {
        $(this).attr('style', '');
    }

});

//New modal
function ShowMsg() {
    $("#msg .dark").css({ "display": "block" }).stop().animate({ "opacity": 1 }, 200);
    $("#msg .context").stop().animate({ "top": "3rem" ,"opacity":1}, 400);
}

function HideMsg() {
    $("#msg .dark").stop().animate({ "opacity": 0 }, 200, function () {
        $("#msg .dark").css({ "display": "none" })
    });
    $("#msg .context").stop().animate({ "top": "-13rem" ,"opacity":0}, 400);
}

$(document).on('click', '.dark', function () {
    HideMsg();
});
$(document).on('click', '.dark', function () {
    HideDel();
});


function ShowDel() {
    $("#delete .dark").css({ "display": "block" }).stop().animate({ "opacity": 1 }, 200);
    $("#delete .context").stop().animate({ "top": "3rem", "opacity": 1 }, 400);
}

function HideDel() {
    $("#delete .dark").stop().animate({ "opacity": 0 }, 200, function () {
        $("#delete .dark").css({ "display": "none" })
    });
    $("#delete .context").stop().animate({ "top": "-13rem", "opacity": 0 }, 400);
}