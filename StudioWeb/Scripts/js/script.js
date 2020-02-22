$(document).ready(function () {
    var Min = 500;
    var Max = 100000;

    $('#edit-price').keydown(function (eventObject) {
        var valueKey = String.fromCharCode(eventObject.which);
        var enter = eventObject.which == 13;
        var backspace = eventObject.which == 8;

        if (!/\d/.test(valueKey) && !enter && !backspace) {
            return false;
        }

        if (enter && GetSearh($(this))) {
            $(this).val($(this).val() + "-");
        }
    });

    $('#edit-price').on('keyup input', function (event) {
        var formCheck = $(this).val();
        var lengthNums, comInsert;

        (GetSearh($(this))) ? lengthNums = 0 : lengthNums = formCheck.search('-') + 1;
        (lengthNums != 0) ? comInsert = $("#last") : comInsert = $("#first");

        setText(comInsert, formCheck, lengthNums);
        EditData($("#first").text(), $("#last").text(), false);
    });
    function setText(span, formCheck, lengthNums) {
        span.text(Zero(formCheck, lengthNums, span));
        Last(span, formCheck);
    }
    function Last(span, formCheck) {
        if (span.attr('id') == 'last') {
            $("#first").text(Zero(formCheck, 0, $("#first"), formCheck.search('-')));
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
    function Zero(formCheck, lengthNums, span, Endlength = formCheck.length) {
        var Num = parseInt(formCheck.substring(lengthNums, Endlength));

        if (String(Num) == "NaN") {
            Num = SetDefault(span);
        }
        return Num;
    }
});

//Fill html obj
function EditData(minVal, maxVal, all = true) {
    if (all) {
        $("#range").text(minVal + " - " + maxVal + "");
        $("#min").text(minVal);
        $("#max").text(maxVal);
    }
    else {
        $("#range").text(minVal + "р - " + maxVal + "р");

        $("#slider-range").slider("values", [minVal, maxVal]);

    }
}

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 500,
        max: 900000,
        step: 100,
        values: [500, 900000],
        slide: function (event, ui) {
            $("#range").text(ui.values[0] + "р - " + ui.values[1] + "р");
            $("#edit-price").val('');
        }
    });

    var minVal = $("#slider-range").slider("values", 0) + "р";
    var maxVal = $("#slider-range").slider("values", 1) + "р";

    EditData(minVal, maxVal);
});

//check

var ch = false;
var i = 0;

$(document).on('click', '.list-box', function () {
    i = 0;

    if ($(".form-check-label").hasClass("form-check-label-unactive")) {
        ch = true
    }
    else {
        ch = false;
    }
});

var test;
var i = 0;
var elemPos;

function getLengthPos(c) {
    if (i == $(".box-material").length) {
        return 5000000;
    }
    else {
        return ($(".box-material").eq(0).position().left - 5) * -1 + $(".box-material").eq(c).position().left - 5;
    }

}

if ($(window).width() > 1200) {
    document.addEventListener('scroll', function (event) {

        if ($(".box-material").eq(0).attr('class') != undefined) {
            var thisObj = $('#scroll-materials');
            var Ofset = $(".box-material").eq(0).outerWidth(true);

            var pid = ($(".box-material").eq(0).position().left - 5) * -1 + $(".box-material").eq($(".box-material").length - 1).position().left - 5;

            elemPos = getLengthPos(i);

            if (elemPos == 5000000) {
                if (thisObj.scrollLeft() < pid) {
                    i = $(".box-material").length - 1;
                }
            }

            if (thisObj.scrollLeft() > Math.floor(elemPos) - 2 && thisObj.scrollLeft() < Math.floor(elemPos) + 2) {
                if (test > Math.floor(elemPos)) {
                    if (i != Math.floor(test / Ofset)) {
                        i = i + 1;
                    }
                }

                else if (test < Math.floor(elemPos) - 200) {

                    if (i != Math.floor(test / Ofset)) {
                        i = i - 1;
                    }

                }

                if (test > getLengthPos($(".box-material").length - 1) + 20) {
                    i = i + 1;
                }
            }

            else {
                test = thisObj.scrollLeft();
            }

            if ($(".box-material").length - 1 != 0) {
                thisObj.scrollLeft(elemPos);
            }
        }
    }, true);
}
//AddClassFocus

$(document).on('focus', '.form-dt', function () {
    $(this).prev().toggleClass("anim-form-un anim-form");
});

$(document).on('focusout', '.form-dt', function () {
    $(this).prev().toggleClass("anim-form-un anim-form");
});

function ganFixed(f, d = 58) {
    if ($("#sidebar-click").is("#sidebar-click")) {
        var el = $("#sidebar-click");
        var stcikTop = el.offset().top - f;
        var stickHeight = el.outerHeight(true);

        var stop = false;

        $(window).scroll(function () {
            var limit = $("#box-sidebar-top").offset().top - stickHeight;
            var winTop = $(window).scrollTop();

            if (stcikTop < winTop && !stop) {
                el.css({ 'top': Math.abs(winTop - d) });
            }

            if (limit < winTop - 50) {
                var diff = limit;
                el.css({ 'top': diff });

                stop = true;
            }
            else {
                stop = false;
            }
        });
    }
}

function insClass(el, delClass, insClass) {
    el.removeClass(delClass).addClass(insClass);
}

function margunLeftHistory(scrollTopOff, scrollTopOffTop) {
    if ($("#sidebar-click").is("#sidebar-click")) {
        var el = $("#sidebar-click");
        var offLeft = el.parent(".col-box-burger").width() - el.outerWidth();

        el.css({ "margin-left": offLeft });

        var stcikTop = el.offset().top - scrollTopOff;//72 - margin-top #sidebar-click
        var stickHeight = el.outerHeight(true);

        var stop = false;

        $(window).scroll(function () {
            var limit = $("#box-sidebar-top").offset().top - stickHeight;
            var winTop = $(window).scrollTop();

            if (stcikTop < winTop) {
                insClass(el, "static-top-btn", "fixed-top-btn");
                el.css({ "top": 0 });
            }
            else {
                insClass(el, "fixed-top-btn", "static-top-btn");
            }

            if (limit < winTop - scrollTopOffTop) {
                var diff = limit - winTop;

                insClass(el, "fixed-top-btn", "static-top-btn");
                el.css({ "top": Math.abs($("#box-sidebar-top").offset().top) - $("#box-sidebar-top").outerHeight(true) / 2 - 10 });
            }
        });
    }
}
$(window).bind("load resize", function () {
    var scrollTopOff = 72;
    var scrollTopOffTop = 50;

    if ($(this).width() < 991) {
        var boxLeft = $(".base-box-form").offset().left - 25;
        scrollTopOff = 95;
        scrollTopOffTop = 120;

        $(".navbar-nav").css({ "margin-left": boxLeft });
        $(".navbar-nav").removeClass("mx-auto");
    }
    else {
        $(".navbar-nav").addClass("mx-auto");
    }

    margunLeftHistory(scrollTopOff, scrollTopOffTop);

    if ($(this).width() < 1370) {
        $(".search-form input").attr("placeholder", "Введите наименование");
    }
    else {
        $(".search-form input").attr("placeholder", "Введите номер или название");
    }

    if ($(this).width() < 1200) {
        $(".col-js-auto").removeClass("col-js-auto");
        $(".col-js").removeClass("col-js");
    }
    else {
        $(".base-box-form .col-xl-3").addClass("col-js-auto");
        $(".num-js .col-xl-3").addClass("col-js");
    }

    if ($(this).width() < 576) {
        $(".box-footer .col-xl-6").eq(1).attr("style", "");
        $(".box-footer .col-xl-6").eq(0).attr("style", "");
    }
    else {

        var p = 15;

        if ($(".box-js").hasClass("row")) {
            p = 16;
        }

        var right = $(window).width() - ($(".box-js").offset().left + $(".box-js").outerWidth(true)) + p;

        $(".box-footer .col-xl-6").eq(1).css({ "padding-right": right });
        $(".box-footer .col-xl-6").eq(0).css({ "padding-left": right });
    }

});

/* Материалы CRUD */

//Add Material cart
var obj = $(".material-active").children();

function addCart(ss, newId) {
    var obj = $(ss).parents(".materials-2").clone().removeClass("material-active").addClass("material-basebox");
    obj.find(".btn-done").remove();
    obj.attr("id", "");
    obj.find(".btn-def").addClass("dtn-saveCh");
    obj.find(".round-btn").addClass("dtn-remove");

    if ($(".box-material").length == 1) {
        i = 0;
    }

    $(ss).parents(".materials-2").before(obj);
    var len = $(".material-basebox").length;

    $(".material-basebox").eq(len - 1).children().children(".id-material").val(newId);
    $(".material-basebox").eq(len - 1).attr("id", "box-get-" + newId);
}

function addMaterialCart(ss) {

    var o = $(".material-active").children();
    var arr = BaseInput(o);
    $.ajax({
        url: "/Home/AddMaterialsDb",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            NameMaterial: arr[0].val(),
            CountMaterial: arr[1].val(),
            PriceMaterial: arr[2].val(),
            Coment: arr[3].val()
        }),

        success: function (data) {
            addCart(ss, data);
            i = $(".box-material").length - 2;
            $("#scroll-materials").scrollLeft(($(".box-material").eq(0).position().left - 5) * -1 + $(".box-material").eq($(".box-material").length - 2).position().left - 5);
        }
    });

}

function addMaterialCartMain(ss) {
    var id = $("#ProductId").attr('placeholder').substring(1, $("#ProductId").attr('placeholder').length);

    var o = $(".material-active").children();
    var arr = BaseInput(o);

    $.ajax({
        url: "/Home/AddMaterialsDb",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            NameMaterial: arr[0].val(),
            CountMaterial: arr[1].val(),
            PriceMaterial: NumberSql(arr[2].val()),
            Coment: arr[3].val(),
            ProductId: id
        }),

        success: function (data) {
            addCart(ss, data);
            i = $(".box-material").length - 2;
            $("#scroll-materials").scrollLeft(($(".box-material").eq(0).position().left - 5) * -1 + $(".box-material").eq($(".box-material").length - 2).position().left - 5);
        }
    });
}

function GetId(obj) {
    return $(obj).parent().siblings(".id-material").val();
}

//Edit Material cart

$(document).on('click', '.dtn-saveCh', function () {
    var box = $(this).parent().parent();
    var err;

    box.parent().validateDynamic({
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
        box.stop().animate({ opacity: 0.6 }, 400).animate({ opacity: 1 }, 400);
        GetCountPrice();

        var arr = BaseInput($(this).parent().parent());

        BaseAjaxPost("/Home/SaveMaterialsDb", JSON.stringify({
            NameMaterial: arr[0].val(),
            CountMaterial: arr[1].val(),
            PriceMaterial: NumberSql(arr[2].val()),
            Coment: arr[3].val(),
            MaterialId: GetId(this)
        }));
    }

});



function NumberSql(str) {
    return String(str).replace(/\./g, ",");
}

function NumberJs(str) {
    return String(str).replace(/\,/g, ".");
}

//Remove Material cart

$(document).on('click', '.dtn-remove', function () {
    var obj = $(this).parents(".material-basebox");

    obj.hide("slow", function () {
        obj.css({ "display": "block" });
        obj.remove();
    });

    var arr = BaseInput($(this).parent().parent());

    BaseAjaxPost("/Home/DeleteMaterialsDb", JSON.stringify({
        Id: GetId(this)
    }));
});

/* validation */

$("#form0").ClearForm({
    ProductName: {},
    FIO: {},
    PhoneNumber: {},
    Email: {
    },
    DateStart: {},
    DateEnd: {},
    PriceWorkInner: {},
    PriceWorkOuter: {},
    PriceCustomer: {}
}, "#btn-clear");

$("#material-active").ClearForm({
    NameMaterialCr: {},
    CoutMaterialCr: {},
    PriceMaterialCr: {},
    ComentMaterialCr: {}
}, "#clear-material");

$("#form0").validate({
    ProductName: {
        Empty: true
    },
    FIO: {
        Empty: true
    },
    Email: {
        Email: true
    },
    PhoneNumber: {
        Phone: true
    },
    DateStart: {
        Date: true
    },
    DateEnd: {
        Date: true
    },
    DateRegister: {
        Date: true
    },
    PriceWorkInner: {
        NumberFloat: true
    },
    PriceWorkOuter: {
        NumberFloat: true
    },
    PriceCustomer: {
        NumberFloat: true
    }
});

$("#material-active").validate({
    NameMaterialCr: {
        Empty: true
    },
    CoutMaterialCr: {
        Number: true
    },
    PriceMaterialCr: {
        NumberFloat: true
    }
}, "#btn-done", function (error) {
    if (error) {
        addMaterialCart("#btn-done");
        GetCountPrice();
    }
});

$("#material-active").validate({
    NameMaterialCr: {
        Empty: true
    },
    CoutMaterialCr: {
        Number: true
    },
    PriceMaterialCr: {
        NumberFloat: true
    }
}, "#btn-done-main", function (error) {
    if (error) {
        addMaterialCartMain("#btn-done-main");
        GetCountPrice();
    }
});
/*
*Подсчет шекелей
*/
$(document).on("change", "#PriceWorkInner", function () {
    GetCountPrice();
});
$(document).on("change", "#PriceCustomer", function () {
    GetCountPrice();
});
$(document).on("change", "#PriceWorkOuter", function () {
    GetCountPrice();
});
$(document).on("click", ".dtn-remove", function () {
    GetCountPriceMin($(this).parent().parent().parent());
});
$(document).ready(function () {
    GetCountPrice();
});

function getNumber(num) {

    var n = NumberJs(num);

    if (isNaN((Number(n)))) {
        return 0;
    }
    else {
        return Number(n);
    }
}

var total = 0;

function SetTotal() {
    var len = $(".material-basebox").length;

    for (var i = 0; i < len; i++) {
        var obj = $(".material-basebox").eq(i - 1).children().children(".group-form");

        var count = getNumber(obj.children('#count').val());
        var price = getNumber(obj.children('#price').val());

        total += count * price;
    }
}

function GetCountPrice() {

    SetTotal();

    $("#PriceMaterial").val(NumberSql(total));

    GetAllPrice();
    GetProfite();
}

function GetCountPriceMin(objF) {

    SetTotal();

    var obj = objF.children().children(".group-form");

    var count = getNumber(obj.children('#count').val());
    var price = getNumber(obj.children('#price').val());

    total -= count * price;

    $("#PriceMaterial").val(NumberSql(total));

    GetAllPrice();
    GetProfite();
}

function GetAllPrice() {
    $("#PriceCount").val(NumberSql(
        getNumber($("#PriceMaterial").val()) +
        getNumber($("#PriceWorkInner").val()) +
        getNumber($("#PriceWorkOuter").val())));

    total = 0;
}

function GetProfite() {

    $("#Profit").val(NumberSql(getNumber($("#PriceCustomer").val()) - getNumber($("#PriceCount").val())));
    total = 0;
}

// Элементы управления
//Checkbox
$(document).on('click', ".form-check-label-active", function () {
    $("input[name = CheckPay]").val("Fasle");
});
$(document).on('click', ".form-check-label-unactive", function () {
    $("input[name = CheckPay]").val("True");
});
$(document).on('change', "#defaultCheck1", function () {
    $(".form-check-label").toggleClass("form-check-label-active form-check-label-unactive");
});
//Listbox hover 
$(document).on('mouseenter', '.list-box', function () {
    var ckObgPrev = $(this).prev().hasClass("active-list-box");
    var ckObgAfter = $(this).next().hasClass("active-list-box");

    if (ckObgPrev) {
        $(this).css({ "border-top-color": "transparent" });
    }
    else if (ckObgAfter) {
        $(this).css({ "border-bottom-color": "transparent" });
    }
});
$(document).on('mouseleave', '.list-box', function () {
    $(this).attr('style', "");
});
$(document).on('click', '.list-box', function () {
    $(this).attr('style', "");
});

//Msg

$(document).on('click', "#ok", function () {
    $("#custom-modal").modal('hide');
});

$(document).on('click', "#delete", function () {
    $("#myModal").modal('show');
});

$(document).on('click', "#no", function () {
    $("#myModal").modal('hide');
});

function getMsg(msg) {

    var val = $("#ProductId").attr('placeholder').substring(1, $("#ProductId").attr('placeholder').length);

    $("#context-msg").text(msg);
    $("#num-prod").text(val);
    $("#custom-modal").modal('show');
}

function getMsgErr(msg) {

    var val = $("#ProductId").attr('placeholder').substring(1, $("#ProductId").attr('placeholder').length);

    $("#context-msg").html("<span class='error'>" + msg + "</span>");
    $("#num-prod").text(val);
    $("#custom-modal").modal('show');
}