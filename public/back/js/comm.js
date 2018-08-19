$(function(){
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

  console.log(333333333)
// ajaxStart 在第一个 ajax 发送时, 调用
$(document).ajaxStart(function() {
  console.log(111111111)
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
  console.log(222222222222222)
  

});

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


    
  })