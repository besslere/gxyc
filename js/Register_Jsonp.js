//-------------验证用户名 唯一性-------------
function checkUser() {
    var _Uname = $.trim($("#txtusername").val());
    if (_Uname == "") {
        $('#msg').html('请输入用户名').show();
        return false;
    }
    //输入用户名长度控制为最大20
    if (_Uname.length > 300) {
        $('#msg').html('用户名-6~18个字符，可使用字母、数字').show();
        return false;
    }
    if (_Uname.length < 6) {
        $('#msg').html('用户名-6~18个字符，可使用字母、数字').show();
        return false;
    }
    //check 用户名是否已经存在
    //var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    var urls1 = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    
    $.ajax({
        type: "GET",
        async: false,
        url: urls1,
        data: { Username: _Uname, Flag: "checkonlyusername" },
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        success: function (result) {
            if (result.rest != "False") {
                $('#msg').html('用户名已被使用').show();
                return false
            }
            else {
                return true;
            }
        },
        error: function () {
            raiseMessage('页面异常，请刷新后重新提交').show();
            return  false
        }
    });
}
function checkPwd() {
    var now = $("#txtuserpwd").val();
    var re = new RegExp("[a-zA-Z]");
    var len = re.test(now);
    re = new RegExp("[0-9]");
    len = re.test(now);
    re = new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])");
    len = re.test(now);
    if (len) {
        return true;
    }
    return false;
}
//-------------注册验证-------------
function ChacksAll() {
    if (checkUser() == false) {
        return false;
    }
    var txtusername = $.trim($("#txtusername").val());//用户名
    var txtuserpwd = $.trim($("#txtuserpwd").val());//密码
    var txtuserpwd1 = $.trim($("#txtuserpwd1").val());//确认密码
    var txtmobile = $.trim($("#txtmobile").val());//手机
    var Email = $.trim($("#Email").val());//邮箱

    var txtphone = $.trim($("#txtphone").val());//电话
    var txtqq = $.trim($("#txtqq").val());//qq
    var txtAddress1 = $.trim($("#txtAddress1").val());//地址1
    var txtAddress2 = $.trim($("#txtAddress2").val());//地址2
    var txtSalesman = $.trim($("#txtSalesman").val());//客户经理
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);//非字母与数字错误
    var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
    if (!regex.test(txtuserpwd)) {//非字母与数字错误
        $('#msg').html('密码必须包含数字与字母,长度为6-18个字符').show();
        return false;
    }

    if (txtuserpwd != txtuserpwd1) {
        $('#msg').html('密码不一致').show();
        return false;
    }
    if (checkonlyemail("Email") == false) {
        return false;
    }
    /*if (checkPhone("txtphone") == false) {
        return false;
    }*/
    if (checkMobile("txtmobile") == false) {
        return false;
    }
    //var DDlCountry = $.trim($("#s_countryName").val());
    //if (DDlCountry == "" || DDlCountry == "选择国家") {
    //    raiseMessage('请选择国家');
    //    return false;
    //}
    //var DDlCountryID = $.trim($("#s_countryId").val());
    //var DDlProvince = $.trim($("#s_provinceName").val());
    //if (DDlProvince == "" || DDlProvince == "选择省份") {
    //    raiseMessage('请选择省份');
    //    return false;
    //}
    //var DDlProvinceID = $.trim($("#s_provinceId").val());
    //var DDlCity = $.trim($("#s_cityName").val());
    //if (DDlCity == "" || DDlCity == "选择城市") {
    //    raiseMessage('请选择城市');
    //    return false;
    //}
    //var DDlCityID = $.trim($("#s_cityId").val());
    //if (txtAddress1 == "") {
    //    raiseMessage('请填写详细地址');
    //    return false;
    //}

    //勾选同意服务条款
    /*if (document.getElementById("CheckBox").checked == false) {
        $('#msg').html('请先接受服务条款').show();
        return false;
    }*/
    //var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    $.ajax({
        type: "get",
        async: false,
        url: urls,
        data: {
            "txtusername": txtusername, "txtuserpwd": txtuserpwd, "txtphone": txtphone, "txtmobile": txtmobile, "Email": Email,
            "txtqq": txtqq, "DDlCountry": "", "DDlProvince": "", "DDlCity": "",
            "DDlCountryID": "", "DDlProvinceID": "", "DDlCityID": "",
            "txtAddress1": "", "txtAddress2": "",
            "txtSalesman": txtSalesman, Flag: "addRegister"
        },
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        success: function (data) {
            if (data.rest == "False") {
                $('#msg').html('注册失败，请联系管理员').show();
                return false;
            }
            else {
                location.href = "http://demo2.gffexp.com/CnWeb/MagCenter.aspx";
                return true;
            }
        },
        error: function () {
            $('#msg').html('页面异常，赶快联系管理员吧').show();
            return false;
        }
    });
}

function checkonlyemail(email) {
    var id = email;
    var _UEmail = $.trim($("#" + id).val());
    var Regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (Regex.test(_UEmail) == false) {
        $('#msg').html('邮箱格式不正确').show();
        return false;
    }
    //var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    $.ajax({
        type: "GET",
        async: false,
        url: urls,
        data: { "email": _UEmail, Flag: "checkonlyemail" },
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        success: function (result) {
            if (result.rest != "False") {
                $('#msg').html('此邮箱已被注册').show();
                return false;
            }
            return true;
        },
        error: function () {
            $('#msg').html('页面异常，请刷新后重新提交').show();
            return  false
        }
    });
}

function checkMobile(mobile) {
    var id = mobile;
    var _UMobile = $.trim($("#" + id).val());
    var Regex = /^1(3|4|5|7|8)\d{9}$/;
    if (Regex.test(_UMobile) == false) {
        $('#msg').html('手机号码格式不正确').show();
        return false;
    }
    //var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Register_Jsonp.ashx";
    $.ajax({
        type: "GET",
        async: false,
        url: urls,
        data: { "mobile": _UMobile, Flag: "checkMobile" },
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        success: function (result) {
            if (result.rest != "False") {
                $('#msg').html('此手机号码已被注册').show();
                return false;
            }
            return true;
        },
        error: function () {
            $('#msg').html('页面异常，请刷新后重新提交').show();
            return  false
        }
    });
}
/*
//-------------错误提示-------------
function raiseMessage(errorname) {
    $(".gritter-success").hide();
    $(".gritter-error").hide();
    $(".gritter-warning").hide();
    $.gritter.add({
        class_name: 'gritter-error',
        title: "错误提示",
        text: errorname,
        time: 5000,
        sticky: false
    })
}
//-------------成功提示-------------
function raiseMessagesuccess(errorname) {
    $(".gritter-success").hide();
    $(".gritter-error").hide();
    $(".gritter-warning").hide();
    $.gritter.add({
        class_name: 'gritter-success',
        title: "提示信息",
        text: errorname,
        time: 2000,
        sticky: false
    })
}

//-------------验证手机号码-------------
function checkMobile(mobile) {
    var txtmobile = $.trim($("#" + mobile).val());
    var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
    if (txtmobile == "") {
        $('#a5').html('请填写联系号码').show();
        return false;
    }
    //if (!reg.test(txtmobile)) {
    //    raiseMessage('请填写正确的手机号码');
    //    return false;
    //}
}
//-------------验证电话-------------
function checkPhone(Phone) {
    var txtphone = $.trim($("#" + Phone).val());
    var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{5,10})(-(\d{3,}))?$/; //数字
    if (txtphone == "") {
        raiseMessage('请填写电话号码');
        return false;
    }
    //if (!reg.test(txtphone)) {
    //    raiseMessage('请填写正确的电话号码');
    //    return false;
    //}
}*/
