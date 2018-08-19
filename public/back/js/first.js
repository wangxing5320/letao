$(function () {
  //一进入页面通过ajax请求以及模板引擎喧嚷页面
  var currentPage = 1;//当前页
  var pageSize = 5;//每夜的条数
  rand();
  function rand() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("tpl01", info);
        $(".lt-content tbody").html(htmlStr);

        //分页插件初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          //点击分页按钮时显示对应按钮的内容
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            console.log(page);
            rand();
          }
        })


      }
    })
  }

  //点击按钮显示模态框
  $(".catebtn").on("click", function () {
    $("#firstModal").modal("show");
  })



  //验证报表单信息
  //初始化表单验证插件
  $("#form").bootstrapValidator({
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "分类信息不能为空",
          }
        }
      }
    }
  })
  //若果验证成功将触发下面的事件
  $("#form").on("success.form.bv", function (e) {
    //阻止页面默认跳转
    e.preventDefault();
    //发送ajax请阿牛
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          //关闭模态框
          $("#firstModal").modal("hide");
          currentPage=1;//添加完数据后页面跳到第一页渲染
          //渲染页面
          rand();
          //重置表单
          $("#form").data("bootstrapValidator").resetForm(true)
        }
      }
    })
  })


   

})