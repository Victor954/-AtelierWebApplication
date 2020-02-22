//
//Filter
//
var DateFrom, DateTo, DateReg, FioCustomer;

function GetAllVal(obj) {
    var shForm

    shForm = $("#search-form").val();

    if (($(obj).attr("id") == "date-from")){
        DateFrom = $(obj).val();
    }
    else if (($(obj).attr("id") == "date-to")) {
        DateTo = $(obj).val();
    }
    else if (($(obj).attr("id") == "date-register")) {
        DateReg = $(obj).val();
    }
    else if (($(obj).attr("id") == "fio-customer")) {
        FioCustomer = $(obj).val();
    }

    var Min = $("#slider-range").slider("values", 0);
    var Max = $("#slider-range").slider("values", 1);

    if (!isNumber(shForm)) {
        HightRequest("FilterString", shForm, Min,Max,"0");
    }
    else{
        HightRequest("FilterNum", "NaN", Min, Max, shForm);
    }


}

function HightRequest(nameControl, shForm, Min, Max,Num) {
    ajaxReqData("/Sidebar/" + nameControl, '#sidebar-filter-result', JSON.stringify({
        nameProduct: shForm,
        DateFrom: DateFrom,
        DateTo: DateTo,
        DateRegister: DateReg,
        CustomerFio: FioCustomer,
        min: Min,
        max: Max,
        number: Num
    }));
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

function ajaxReq(url, type, selector) {
    $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',

        success: function (data) {
            $(selector).html(data);
        }
    });
}

function ajaxReqData(url, selector, data) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: data,

        success: function (data) {
            $(selector).html(data);
        }
    });
}

function BaseInput(obj) {
    return new Array(
        obj.children("#nameMaterial"),
        obj.children(".group-form").children("#count"),
        obj.children(".group-form").children("#price"),
        obj.children("#coment"))
}

function BaseAjax(url, obj, id = 0) {
    var arr = BaseInput(obj);

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ NameMaterial: arr[0], CountMaterial: arr[1], PriceMaterial: arr[2], Coment: arr[3], MaterialId: id }),
    });
}

function BaseAjaxPost(url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: data
    });
}