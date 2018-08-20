$(function(){
  //一进入页面通过ajax和模板引擎喧嚷页面
  var currentPage=1;//当前页
  var pageSize=5;//每页显示的内容
  rand();
  function rand(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        var htmlStr=template("tpl01",info);
        $(".lt-content tbody").html(htmlStr);

        //分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            rand();
            
          }
        })

      }
    })
  }

  //点击添加分类按钮显示模态框
  $(".cateAdd").on("click",function(){
    $("#secondtModal").modal("show");
    //发送ajax请求获取一级分类的信息通过模本引擎动态渲染到下拉框
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100,
      },
      dataType:"json",
      success:function(info){
        var htmlStr=template("tpl02",info);
        $("#cate").html(htmlStr);
        console.log(info);

        //给分类信息通过事件委托注册点击事件
        $("#cate").on("click","a",function(){
        $("#dropdownMenu1").text($(this).text());  
        })
      }
    })
  })
//点击上传图片的按钮时，图片实时显示
$("#pic").on('click',function(){
  $("#pic1").fileupload({
    dataType:"json",
    done:function(e,data){
     $("#im").attr("src",data.result.picAddr) ;
      console.log(data);
    }
  })
})

})