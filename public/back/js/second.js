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
        //将点击的 一级分类 的id赋值给input的value值将来好提交到后台
        $("[name='categoryId']").val($(this).data("id"));
        
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID"); 
        })
      }
    })
  })
  
//初始化图片上传插件，图片实时显示

  $("#pic1").fileupload({
    dataType:"json",
    done:function(e,data){
     $("#im").attr("src",data.result.picAddr);
     $("[name='brandLogo']").val(data.result.picAddr);
                                      
     $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
       
    }
  })


//提交表但时验证表单
//初始化表单插件
 
$("#form").bootstrapValidator({
           
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded:[],
   // 配置校验图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',    // 校验成功
    invalid: 'glyphicon glyphicon-remove',  // 校验失败
    validating: 'glyphicon glyphicon-refresh' // 校验中
  },
 
  fields:{
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类",
        }
      }
    },
   
    brandName:{
      validators:{
        notEmpty:{
          message:"请输入二级分类"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请上传图片"
        }
      }
    }

  }
})
//验证成功后
$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:"/category/addSecondCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      if(info.success){
        //关闭模态框
        $("#secondtModal").modal("hide");
        currentPage=1;//页面跳转到首页(好观察添加的信息);
        //重新渲染页面
        rand();
        //重置表单
        $("#form").data("bootstrapValidator").resetForm(true);
        //重置按钮文本
        $("#dropdownMenu1").text("请选择一级分类");
        //重置图片
        $("#im").attr("src","./images/none.png");

      }
      console.log(info)
    }
  })
})


})