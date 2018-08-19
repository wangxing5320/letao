$(function () {
  //已经入页面发送ajax请求，请求获取的数据通过模板引擎渲染页面
  var currenetPage = 1;
  var pageSize = 5;
  var currentId;//点击单签按钮的id 
  var isDelete;//想要修改的转态
  rand()//页面初始化渲染
  function rand() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currenetPage,
        pageSize: pageSize,
        dataType: "json"
      },
      dataType:"json",
      success: function (info) {
        var htmlStr = template("tpl", info);
        $(".lt-content tbody").html(htmlStr);
        console.log(info)

        //初始化分页插件
        $("#paginator").bootstrapPaginator({
          //当前bootstrap的版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //点击分页按钮时
          onPageClicked: function (a, b, c, page) {
            currenetPage = page;//显示当前点击的页数的页面内容
            rand();

          }

        })
      }
    })
  }

  //点击转态按钮，通过传参ajax请求改变按钮转态
  //因为是模板渲染所以要以委托事件的方式给按钮注册点击事件
  $(".lt-content tbody").on("click","button",function(){
    //模态框显示
    $("#userModal").modal("show");
    //获取当前按钮的id值与需要改变的状态
    currentId=$(this).parent().data("id");
    isDelete=$(this).hasClass("btn-danger")?0:1;
   
  })
  //点击模态框的确认按钮时发送ajax请求到服务器修改按钮的状态
  $("#submitBtn").on("click",function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      datatype:"json",
      success:function(info){
        if(info.success){
          //关闭模态框
          $("#userModal").modal("hide");
          //渲染页面
          rand();
        }
      }

    })
  })
})