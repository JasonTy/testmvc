$(function () {
    var load = null;
    ////禁止右键
    //$(document).bind("contextmenu", function (e) {
    //    return false;
    //});

    $.ajaxSetup({
        data: { _ajax: "true" }
    });

    //时间插件的使用
    $('.date-picker').datetimepicker(
    {
        autoclose: true,
        language: 'zh-CN',
        weekStart: 1
    });

    //【表格】选中效果
    $("#PagerGird table").delegate("tr", "click", function () {
        var isMulti = $(".table").attr("data-multi");
        var index = $(this).index();
        var isSelect = $(this).data("isSelect");
        if (isSelect) {
            if (index % 2 == 0)
                $(this).children("td").css({ "background-color": "#f9f9f9" });
            else
                $(this).children("td").css({ "background-color": "#fff" });
            if (!isMulti) {
                $(".table").data("selectIndex", -1);
            }
            $(this).data("isSelect", false);
            $(this).find(":checkbox").removeAttr("checked");
        } else {
            if (!isMulti) {
                var selectIndex = $(".table").data("selectIndex");
                if (selectIndex > -1) {
                    if (selectIndex % 2 == 0)
                        $(".table tbody tr").eq(selectIndex).children("td").css({ "background-color": "#f9f9f9" });
                    else
                        $(".table tbody tr").eq(selectIndex).children("td").css({ "background-color": "#fff" });

                    $(".table tbody tr").eq(selectIndex).data("isSelect", false);
                }
            }
            $(this).data("isSelect", true);
            $(".table").data("selectIndex", index);
            $(this).children("td").css({ "background-color": "#FDEB85" });
            $(this).find(":checkbox").attr("checked", "checked");
        }
    });
    //【表格】鼠标移入移出效果
    $("#PagerGird table").delegate("tr", "mouseover", function () {
        var isSelect = $(this).data("isSelect");
        if (!isSelect) {
            $(this).children("td").css({ "background-color": "#BFDFFF" });
        }
    }).delegate("tr", "mouseout", function () {
        var index = $(this).index();
        var isSelect = $(this).data("isSelect");
        if (!isSelect) {
            if (index % 2 == 0)
                $(this).children("td").css({ "background-color": "#f9f9f9" });
            else
                $(this).children("td").css({ "background-color": "#fff" });
        }
    });
    //数字输入框只能输入数字
    $("input[type='number']").keydown(function (e) {
        // 屏蔽组合键
        if (e.ctrlKey === true || e.shiftKey === true) {
            return false;
        }
        var keyCode = e.keyCode;
        if ((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            (keyCode >= 33 && keyCode <= 40) ||
            (keyCode >= 8 && keyCode <= 9) ||
            (keyCode == 46) ||
            (keyCode == 13) || keyCode == 190 || keyCode == 110) {
            return;
        }
        return false;
    });
});

jQuery.extend({
    //分页api请求
    pagerApi: function (options) {
        var defaults =
        {
            method: "",
            page: 1,
            pageSize: 15,
            beforeSend: true,
            success: false
        };
        var opts = $.extend(defaults, options);
        //Api 参数
        var apiParams = {};
        //加载参数
        $("#divParams li input").each(function (index, item) {
            var name = $(item).attr("name");
            var val = $(item).val();
            if ($.trim(val) != "") {
                apiParams[name] = $(item).val();//encodeURIComponent($(item).val());
            }
        });
        $("#divParams li select").each(function (index, item) {
            var name = $(item).attr("name");
            var val = $(item).val();
            var type = $(item).attr("data-type");
            if ($.trim(val) != "") {
                if (type == "bool") {
                    apiParams[name] = val == "1" ? true : false;
                } else
                    apiParams[name] = encodeURIComponent(val);
            }
        });
        apiParams["pageIndex"] = opts.page;
        apiParams["pageSize"] = opts.pageSize;
        if (typeof opts.beforeSend == "function") {
            opts.beforeSend();
        }
        ////仿跨站点攻击
        //var requestVerificationToken = $(":hidden[name='__RequestVerificationToken']").val();
        //$.extend(apiParams, { "__RequestVerificationToken": requestVerificationToken });
        $.ajax({
            url: "/Api/" + opts.method,
            data: apiParams,
            cache: false,
            dataType: "json",
            type: "GET",
            success: function (result) {
                if (typeof opts.success == "function") {
                    opts.success(result);
                }
            }
        });
    },
    //异步请求api数据
    api: function (options) {
        var defaults =
        {
            method: "",
            data: {},
            type: "POST",
            async: true,
            beforeSend: false,
            success: false,
            complete: false,
        };
        var opts = $.extend(defaults, options);
        //Api 参数
        var apiParams = {};
        if (typeof opts.beforeSend == "function") {
            var beforeSendResult = opts.beforeSend();
            if (typeof beforeSend != "undefined" && !beforeSendResult) {
                return false;
            }
        }
        $.extend(apiParams, opts.data);
        ////仿跨站点攻击
        //var requestVerificationToken = $(":hidden[name='__RequestVerificationToken']").val();
        //$.extend(apiParams, { "__RequestVerificationToken": requestVerificationToken });
        $.ajax({
            url: "/Api/" + opts.method,
            data: apiParams,
            cache: false,
            dataType: "json",
            async: opts.async,
            type: opts.type,
            success: function (result) {
                if (result.isSuccess) {
                    if (typeof opts.success == "function") {
                        opts.success(result.data);
                    }
                } else {
                    $.error(result.errMsg);
                    return false;
                }
            },
            complete: opts.complete,
        });
    },
    //显示列表中的图片
    showImg: function (src) {
        src = $.imgHost + src;
        return "<img src='" + src + "' width='50px' height='50px' />";
    },
    //显示手机号码
    //参数：
    //  mobile：要拨打的手机号码
    //  telephone：渠道座机
    showMobile: function (mobile, telephone) {
        if (mobile)
            return '<a class="green" href="javascript:callMobile(' + mobile + ',' + telephone + ')" data-rel="tooltip" data-original-title="打电话"><i data-operate="mobile" class="icon-headphones bigger-130"></i>' + mobile + '</a>';
        else
            return '无';
    },
    //显示布尔的值
    showBool: function (bool) {
        if (bool) {
            return "<i class=\"fa fa-check green\"></i>";
        }
        return "<i class=\"fa fa-times red\"></i>";;
    },
    showDate: function (date) {
        if (!date)
            return "";
        if (date == "0001-01-01 00:00:00" || date == "1900-01-01 00:00:00") {
            return "";
        }
        date = date.toString();
        if (date.indexOf(" ") >= 0)
            return date.substr(0, date.indexOf(" "));
        return date;
    },
    showUrl: function (url, text) {
        return "<a href='" + encodeURI(url) + "'>" + text + "</a>";
    },
    showUrls: function (url, text) {
        return "<a href='" + url + "'>" + text + "</a>";
    },
    showUrlss: function (url, text) {
        return "<a href='" + url + "' target='blank'>" + text + "</a>";
    },
    //alert
    alert: function (msg, callback) {
        var dlgIndex = top.layer.alert(msg, 1, callback);
        top.arrDlg.push(dlgIndex);
        return dlgIndex;
    },
    //warn
    warn: function (msg) {
        var dlgIndex = parent.layer.msg(msg);
        return dlgIndex;
    },
    //error
    error: function (msg) {
        var dlgIndex = parent.layer.msg(msg);
        return dlgIndex;
    },
    //confirm 确认
    confirm: function (msg, callback) {
        var dlgIndex = parent.$.layer({
            area: ['auto', 'auto'],
            dialog: {
                msg: msg,
                btns: 2,
                type: 4,
                btn: ['确定', '取消'],
                yes: function () {
                    if (typeof callback == "function")
                        callback();
                },
                no: function () {
                }
            }
        });
        return dlgIndex;
    },
    //打开窗体
    open: function (options) {
        var defaults =
        {
            title: "系统提示",
            url: "",
            data: {},
            width: 450,
            height: 200,
            callback: false
        };
        var opts = $.extend(defaults, options);
        var params = $.param(opts.data);
        if ($.trim(params) != "") params = "?" + params + "&pageStatus=" + opts.pageStatus;
        var dlgIndex = top.$.layer({
            type: 2,
            shadeClose: false,
            fix: false,
            title: opts.title,
            maxmin: true,
            iframe: { src: opts.url + params },
            area: [opts.width + 'px', opts.height + 'px'],
            end: function () {
                if (typeof opts.callback == "function")
                    opts.callback();
            }
        });
        top.arrDlg.push(dlgIndex);
        return dlgIndex;
    },
    //打开当前层
    openDiv: function (selecter, area) {
        var dlgIndex = $.layer({
            type: 1,
            shade: [0.5, '#000', true],
            area: area,
            title: false,
            border: [0],
            page: { dom: selecter }
        });
        return dlgIndex;
    },
    //关闭窗体
    //length：一次关闭几个窗口，默认为1
    closeDlg: function (length) {
        if (!length) length = 1;
        if (top.arrDlg.length > 0) {
            for (var i = 1; i <= length; i++) {
                var index = top.arrDlg[top.arrDlg.length - 1];
                top.arrDlg = top.arrDlg.remove(top.arrDlg.length - 1);
                top.layer.close(index);
            }
        }
    },
    //关闭全部窗体
    closeAllDlg: function () {
        top.layer.closeAll();
    },
    //正在加载
    loading: function () {
        load = top.layer.load('正在努力加载...', 2);
    },
    //关闭正在加载层
    closeLoading: function () {
        top.layer.close(load);
    },
    //根据打开窗口时候传递的pagestatus控制页面状态
    loadPageStatus: function () {
        var pageStatus = $.getParam("pageStatus");
        if (pageStatus == $.Enum.pageStatus.browse) {
            $("input[ddata-oper='eidt']").attr("readonly", true);
            $("button[ddata-oper='eidt']").hide();
            $("input[ddata-oper='eidt'][type='file']").hide();
        } else if (pageStatus == $.Enum.pageStatus.edit) {
            $("input[ddata-oper='eidt']").attr("readonly", false);
            $("button[ddata-oper='eidt']").show();
            $("input[ddata-oper='eidt'][type='file']").show();
        }
    },
    //获取表格的编号id
    //param:
    //  hasArr: true,无论是否选中一条，都返回数组。
    getSelectId: function (hasArr) {
        var id = "";
        var arr = [];
        $(".table tr").each(function (index, item) {
            if ($(item).data("isSelect") == true) {
                id = $(item).attr("data-id");
                arr.push(id);
            }
        });
        if (arr.length > 1) {
            return arr;
        } else {
            if (hasArr)
                return arr;
        }
        return id;
    },
    //获取表格的编号id
    //param:
    //  hasArr: true,无论是否选中一条，都返回数组。(产品状态id)
    getSelectStatusId: function () {
        var sid = "";
        $(".table tr").each(function (index, item) {
            if ($(item).data("isSelect") == true) {
                sid = $(item).attr("data-stauid");
            }
        });
        return sid;
    },
    //根据路径获取文件名
    getFileName: function (path) {
        if (path) {
            return path.substr(path.lastIndexOf("/") + 1);
        }
        else {
            return "";
        }
    },
    //根据路径获取文件类型
    getFileType: function (path) {
        if (path) {
            return path.substr(path.lastIndexOf(".") + 1);
        }
        else {
            return "";
        }
    }
});

jQuery.fn.extend({
    //上传
    upload: function (options) {
        var defaults =
       {
           url: "/Upload/Index",
           data: {},
           success: false
       };
        var opts = $.extend(defaults, options);
        //上传图片
        return this.fileupload({
            autoUpload: true, //是否自动上传
            url: opts.url, //上传地址
            formData: opts.data, //上传参数
            dataType: 'json',
            done: opts.success,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
    },
});

//当前内容iframe区域的内容
$.currentFrame = top.$("#container").contents();
//当前内容iframe区域的内容父级
$.currentFrameParent = window.parent;
//图片服务器
$.imgHost = "http://img.1caifu.com/";

//打电话
function callMobile(mobile, telephone) {
    if (!mobile) {
        $.error("您没有要拨打的电话号码！");
        return;
    }
    if (!telephone || telephone == "0000") {
        $.error("您没有设置分机号不能拨打电话！");
        return;
    }
    var json = {
        action: "SendDial",
        companyid: 10,
        auth: "1a49a3788fd811e4a1bbb083febfd349",
        exten: telephone,
        staffid: "88",
        phonenum: mobile
    };
    $.ajax({
        async: false,
        url: "http://192.168.1.5:9500/interface.php",
        type: "POST",
        cache: false,
        data: json,
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                $.alert("已拨打电话，请查看分机！");
            } else if (data == 0) {
                $.alert("拨打电话失败，请联系管理员！");
            }
        },
        error: function (request, textStatus, errorThrown) {
            $.error(request.statusText);
        }
    });
}
