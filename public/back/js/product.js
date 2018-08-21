$(function () {
  var currentPage = 1;//当前页
  var pageSize = 5;//每页显示的数量
  var adrr = [];//是用来存储图片地址与名称的数组
  //意见如页面就发送ajax请求获取数据通过模板引擎渲染页面
  rand();
  function rand() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("tpl01", info);
        $(".lt-content tbody").html(htmlStr);

        //初始化分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          itemTexts: function (type,  page,  current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          tooltipTitles: function (type,  page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return '前往第' + page + '页';
            }
          },
          useBootstrapTooltip: true,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            rand();
          }

        })
      }
    })
  }

  //点击添加按钮时显示天页面的模态框
  $(".addbtn").on("click", function () {
    $("#my").modal("show");
    //下拉框发送ajax请求获取二级分类的数据通过模板渲染到下拉框中
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("tpl02", info);
        $(".dropdown-menu").html(htmlStr)
      }
    })
  })

  //点击二级分类的a标签将二级分类的名称赋值到按钮框中（通过事件委托的方式注册点击事件）
  $(".dropdown-menu").on("click", "a", function () {
    $("#dLabel").text($(this).text());

    $("#brandId").val($(this).data("id"));//将当前二级分类的id值赋值给该input
  $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  })

  //文件上传插件初始化
  $("#im").fileupload({
    dataType: "json",
    done: function (e, info) {
      var objImg=info.result;
      var mgurl = info.result.picAddr;
      adrr.unshift(objImg);
      $(".imgBox").prepend('<img src=' + mgurl + '  width="100">');
      if (adrr.length > 3) {
        $(".imgBox img:last-of-type").remove();
        adrr.pop();

      }
      if(adrr.length===3)
      $("#form").data("bootstrapValidator").updateStatus("pic","VALID")
    }
  })

  //初始化表单验证插件
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品的名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品的描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
          
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '品尺码格式, xx-xx的数字格式'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      pic: {
        validators: {
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      }
    }
  })              
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    // &picAddr1=xx&picName1=xx
    // &picAddr2=xx&picName2=xx
    // &picAddr3=xx&picName3=xx
    var str=$("#form").serialize();
    str+='&picAddr1='+adrr[0].picName+'&picName1='+adrr[0].picAddr;
    str+='&picAddr1='+adrr[1].picName+'&picName1='+adrr[1].picAddr;
    str+='&picAddr1='+adrr[2].picName+'&picName1='+adrr[2].picAddr;
    console.log(str);
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:str,
      success:function(info){
        if(info.success){
          //关闭模态框
          $("#my").modal("hide");
          //重现渲染页面并跳到首页
          currentPage = 1;
          rand();
        }
        console.log(info);
      }
    })
  })
   
  
})