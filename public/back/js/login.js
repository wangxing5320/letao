$(function(){
  //表单验证
  //使用表单校验插件
$("#form").bootstrapValidator({
  

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 2,
          max: 6,
          message: '用户名长度必须在2到6之间'
        },
        callback:{
          message:"请输入的用户名不存在，请重新输入！"
        }
        
      }
    },
   password: {
     //校验
      validators: {
        //不能为空
        notEmpty: {
          message: '密码不能为空'
        },
        //长度校验
        stringLength: {
          min: 6,
          max: 12,
          message: '用户名长度必须在6到12之间'
        },
        callback:{
          message:"您输入的密码错误，请重新输入！"
        }
        
      }
    },

  }

});

//点击重置按钮时，重置表单的内容与状态
$("[type='reset']").on("click",function(){
  $("#form").data("bootstrapValidator").resetForm();
})

//点击登入按钮表单在前端校验成功时:1/阻止表单默认的跳转行为，
//2、通过ajax请求后台验证输入的信息是否正确，并提示信息
$("[type='submit']").on("click",function(){
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    //console.log("提交表单后阻止了流浪器的默认跳转的行为");
    //发生ajax请求到后台
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      success:function(info){
        if(info.success){
          location.href="index.html";
        }
        if(info.error===1000){
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error=1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
      }
    })

  })
})
})