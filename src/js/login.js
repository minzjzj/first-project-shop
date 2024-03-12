$(function () {

   //1024추가 모바일 토클 메뉴
   let header_width = $("header").width();
   if(header_width <= 540){
     $(document).ready(function () {
       $("#toggleBtn").click(function (e) {
         e.stopPropagation();
         $("#test").slideToggle("slow");
       });
      
       $(document).on("click", function(e) {
         if (e.target.id != "test") {
           $("#test").hide();
         }
       })
     });
   }
  //1019 로그인창 보여주기 함수
  $("#custom-login-btn").click(function () {
    $(this).attr("rel", "modal:open");
  });
  //1019 로그인창 보여주기 함수
  $("#custom-logout-btn").click(function () {
    localStorage.setItem("auth", "false");
    alert("bye~!");
    location.reload();
  });


  function renderHeader() {
    const authenticated = localStorage.getItem("auth");
    console.log(authenticated, typeof authenticated);
    $(".login-btn").parent().hide();
    if (authenticated === "true") {
      $("#custom-logout-btn").parent().show();
    } else {
      $("#custom-login-btn").parent().show();
    }
  }
  //renderHeader();



  function login(e) {
    e.preventDefault();

    const member1_id = "robot"; //member1 회원의 아이디
    const member1_pw = 1234; //member1 회원의 비밀번호

    var userid = $("#userId").val();
    var userpw = $("#userPw").val();

    if (userid == member1_id && userpw == member1_pw) {
      //로그인 화면 숨김처리한다
      alert("로그인 되었습니다.");
      $("#close-login").click();
     
      localStorage.setItem("userId", userid);
      localStorage.setItem("auth", true);
      renderHeader();
    } else if (userid == member1_id && userpw != member1_pw) {
      //아이디정보는 일치하지만 비밀번호정보가 다를경우
      alert("비밀번호가 일치하지 않습니다");
    } else {
      //위에서 사용한 조건에 해당하지 않는 경우에 실행
      alert("아이디또는 비밀번호가 일치하지 않습니다");
    }
  }
  $("#loginArea").on("submit", login);
});
