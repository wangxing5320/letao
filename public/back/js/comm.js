$(function(){

// ajaxStart 在第一个 ajax 发送时, 调用
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});

// ajaxStop 在所有的ajax完成时, 调用
$(document).ajaxStop(function() {

  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 10000);
  

});


  //登入拦截
  if(location.href.indexOf("login.html")==-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        
        if(info.success){
          console.log("用户已登入");
        }

        if(info.error===400){
         location.href="login.html";
      }
        
      }
      

    })
  }



  //点击侧边栏的按钮高亮像是
 
$(".lt-aside .nav ul li").each(function(i,v){
 $(this).on("click",function(){
   $(this).children("a").addClass("current");
   $(this).siblings().children("a").removeClass("current");
 })
})


 




  $(".lt-aside .nav ul>li>a.manage").on("click",function(){
    $(".lt-aside .category").stop().slideToggle();
  })

  $(".lt-right .h-left").on("click",function(){
    $(".lt-aside").toggleClass("hidemenue");
    $(".it-index ").toggleClass("hidemenue");
    $(".lt-right .it-head ").toggleClass("hidemenue");
  })


  $(".lt-right .h-right").on("click",function(){
    $('#myModal').modal("show");
  })


 //点击页面的退出按钮，将页面退回到登入页
 $(".modal-footer button:last-child").on("click",function(){
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    dataType:"json",
    success:function(info){
   if(info.success){
     location.href="login.html";
   }
    }
  })
})
 
  })