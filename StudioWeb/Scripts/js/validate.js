function returnElemError(msg, obj) {
    obj.siblings(".left-text-tag").addClass("left-text-tag-act");
    obj.addClass("error");
    return '<label class = "error">' + msg + '</label>'
}

function validatorVoid(obj, regExp, msg, flag = true) {
    var val = obj.val();

    var isVoid = /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm.test(val);

    if (isVoid) {
        obj.after(returnElemError("Пустая строка",obj));
        return true;
    }
    else if (!regExp.test(val) && flag) {
        obj.after(returnElemError(msg,obj));
        return true;
    }

    return false;
}

function validatorNums(obj, msg, flag = true) {
    var val = obj.val();

    var isVoid = /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm.test(val);

    if (isVoid) {
        obj.after(returnElemError("Пустая строка", obj));
        return true;
    }

    else if (isNaN(Number(val.replace(/\,/g, "."))) && flag) {
        obj.after(returnElemError(msg, obj));
        return true;
    }

    return false;
}

function setValid(obj, rulers) {
    switch (rulers) {
        case "Email":
            return validatorVoid(obj, /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, "Не верный Email");
            break;
        case "Number":
            return validatorVoid(obj, /^[0-9]+$/gm, "Только цифры");
            break;
        case "Date":
            return validatorVoid(obj, /^(\b([0-3]{1}?[0-9]{1})(\.|-)([0-1]{1}?[0-9]{1})(\.|-)([1-2]{1}[0-9]{3}))$/gmi, "Не верный формат даты");
            break;
        case "Phone":
            return validatorVoid(obj, /^(\d{11})$/, "Не верный формат телефона");
            break;
        case "Empty":
            return validatorVoid(obj, /^(\d{11})$/, "",false);
            break;
        case "NumberFloat":
            return validatorVoid(obj, /^[+-]?([0-9]+([,][0-9]*)?|[,][0-9]+)$/g, "Только числа вида 3,14");
    }

    return false;
}

function comeBack(objInput) {
    objInput.siblings("input").siblings(".left-text-tag").removeClass("left-text-tag-act");
    objInput.siblings("input").removeClass("error");
    objInput.siblings("textarea").removeClass("error");
    objInput.remove();
}
/////////////////////////////////////////////////////////////////////////////////////

$.fn.validate = function (parmArr, elemClick = "input[type = submit]", fun = function () { }) {
    var i;
    var ObjStr2 = "#" + this.attr("id");

    function setUnsub2(isError) {
        if (isError && i) {
            i = false;
        }
    }

    function setObjs(parmArr, chName, all = false, ObjStr) {
        var obj;

        for (var key in parmArr) {
            var request = (!all) ? chName == key : true;
            if (request) {

                obj = $(ObjStr+" [name = " + key + "]");

                for (var keyCh in parmArr[key]) {
                    setUnsub2(setValid(obj, keyCh));
                }
            }
        }
    }

    function change(type) {
        $(document).on('change', ObjStr2 + " " + type, function () {
            comeBack($(this).siblings(ObjStr2 + " label[class = error]"));
            setObjs(parmArr, $(this).attr("name"), false, ObjStr2);
        });
    }

    change("input");
    change("textarea");
    //$(document).on("click", ObjStr2 + ' ' + elemClick, function (parm) {

    $(document).on("click", elemClick, function (parm) {
        i = true;

        comeBack($(ObjStr2 + " label[class = error]"));
        setObjs(parmArr, $(this).attr("name"), true, ObjStr2);

        fun(i);

        return i;
    });
};

$.fn.validateDynamic = function (parmArr, fun = function () { }) {
    var i;
    var ObjStr2 = "#" + this.attr("id");

    function setUnsub2(isError) {
        if (isError && i) {
            i = false;
        }
    }

    function setObjs(parmArr, chName, all = false, ObjStr) {
        var obj;

        for (var key in parmArr) {
            var request = (!all) ? chName == key : true;
            if (request) {

                obj = $(ObjStr).find("[name = " + key + "]");
                for (var keyCh in parmArr[key]) {
                    setUnsub2(setValid(obj, keyCh));
                }
            }
        }
    }


     i = true;

     comeBack($(ObjStr2 + " label[class = error]"));
     setObjs(parmArr, $(this).attr("name"), true, ObjStr2);

     fun(i);

    return i;
};

$.fn.ClearForm = function (parmArr, elemClick = "input[type = submit]") {
    var ObjStr2 = "#" + this.attr("id");

    function setObjs(parmArr, ObjStr) {
        for (var key in parmArr) {
            obj = $(ObjStr).find("[name = " + key + "]");
            obj.val("");       
        }
    }

    $(document).on('click', ObjStr2 + " " + elemClick, function () {
        comeBack($(this).siblings(ObjStr2 + " label[class = error]"));
        setObjs(parmArr, ObjStr2);
    });

};