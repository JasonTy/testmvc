/**
 * Created by Jason on 2015/6/15.
 */
$(function(){
    //点击返回（新增）
    $("#back").click(function(){
        $("#addproduct").hide();
        $("#editshow").hide();
    });
    //新增
    $("#add").click(function(){
        $("#addproduct").show();
        $("#editshow").hide();
    });
    //点击编辑
    $(".edit").click(function(){
        var id=  $(this).attr("data-id");
        var content=$(this).attr("data-content");
        var price=$(this).attr("data-price");
        var name=$(this).attr("data-name");
        $("#show").hide();
        $("#editshow").show();
        $("#addproduct").hide();
        $("#add").hide();
        $("input[name='shuoming']").val(content);
        $("input[name='names']").val(name);
//            $("input[name='prices']").val(price);
        $("input[name='id']").val(id);
    });
    //点击保存(编辑)
    $("#btnSave").click(function(){
        var id= $.trim( $("input[name='id']").val());
        var content= $.trim( $("input[name='shuoming']").val());
        var name= $.trim( $("input[name='names']").val());
//            var price= $.trim( $("input[name='prices']").val());

        $.ajax({
            url:'/product/update',
            type:'POST',
            data:{id:id,content:content,name:name},//,price:price
            dataType:"json",
            success:function(result)
            {
                if(result.isSuccess)
                {
                    alert("编辑成功");
                    location.reload();
                }
            }
        });
    });
    //点击返回
    $("#btnBack").click(function(){
        $("#show").show();
        $("#add").show();
        $("#editshow").hide();
    });
    //点击删除
    $(".delete").click(function(){
        if(confirm("确定要删除数据吗？"))
        {
            var id=  $(this).attr("data-id");
            $.ajax({
                url:'/product/delete',
                type:'POST',
                data:{id:id},
                dataType:"json",
                success:function(result)
                {
                    if(result.isSuccess)
                    {
                        alert("删除成功");
                        location.reload();
                    }
                }
            });

        }

    });
});