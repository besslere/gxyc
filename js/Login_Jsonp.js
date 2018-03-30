function ChackAll() {
    var username = $.trim($("#UserName").val());
    var name = base64encode($.trim($("#UserName").val()));//修改用户名传输 为非明文的
    var pwd = base64encode($.trim($("#PassWord").val()));//修改密码传输 为非明文的
    var valitxt = $.trim($("#Validate").val());
    Login_ID(name, pwd, valitxt);
}

function Login_ID(userName, pwd, vailtext) {
    var nametest = $.trim($("#UserName").val());
    var userName = base64encode($.trim($("#UserName").val()));//修改用户名传输 为非明文的
    var pwd = base64encode($.trim($("#PassWord").val()));//修改密码传输 为非明文的
    var valitxt = $.trim($("#Validate").val());
    if (userName == "") {
        $("#message").html("用户名不能为空").show();
        return false;
    }
    if (pwd == "") {
        $("#message").html("密码不能为空").show();
        return false;
    }
    var ltyle = "";
    var reg = /^[0-9]*$/; //数字
    if (!reg.test(nametest)) {
        ltyle = "1";//name
    } else {
        ltyle = "2";//name or code
    }
    if (valitxt == "") {
        change();
        $("#message").html("请输入验证码").show();
    }
    var urls = "http://demo2.gffexp.com/CnWeb/Ashx/Login_Jsonp.ashx";
    $.ajax(
        {
            type: "get",
            async: false,
            url: urls,
            data: { "loginsname": userName, "loginspwd": pwd, Codeyxm: valitxt, "ltyle": ltyle },
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            //callback: "flightHandler", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            success: function (json) {
                if (json.rest == "1") {
                    $("#message").html("账户名与密码不匹配，请重新输入").show();
                    return false;
                }
                if (json.rest == "2") {
                    $("#message").html("验证码不正确,请重新确认").show();
                    return false
                }
                if (json.rest == "3") {
                    $("#message").html("用户已连续登录失败4次,该账号将锁定半小时").show();
                    return false
                }
                if(json.rest == "5"){
                    $("#message").html("请求参数不完善，请确认").show();
                    return false
                }
                if (json.rest == "0") {
                    location.href = "http://demo2.gffexp.com/CnWeb/MagCenter.aspx";
                }

            },
            error: function () {
                $("#massage").html("页面异常，请刷新后重新提交").show();
                return false;
            }
        });
}




function change() {
    var imgNode = document.getElementById("vimg");
    imgNode.src = "http://demo2.gffexp.com/CnWeb/Ashx/WaterMark.ashx?t=" + (new Date()).valueOf();  // 这里加个时间的参数是为了防止浏览器缓存的问题
}


//base64加密
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}