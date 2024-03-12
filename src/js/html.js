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
  
    // $("ul#mainMenu").toggleClass("show")
  

  //1019추가 로그인 상태 페이지 이동
  function renderHeader() {
    const authenticated = localStorage.getItem("auth");
    //console.log(authenticated, typeof authenticated);
    $(".login-btn").parent().hide();
    if (authenticated === "true") {
      $("#custom-logout-btn").parent().show();
    } else {
      $("#custom-login-btn").parent().show();
    }
  }
  renderHeader();

  //1023추가 장바구니이나 로그인 버튼 클릭할 때 해당 값을 가져오기
  let text;

  //1023추가 로그인 버튼 클릭할 때 해당 값을 가져오기
  $("#custom-login-btn").click(function (event) {
    event.preventDefault();
    $(event.target).attr("rel", "modal:open");
    $(event.target).attr("href", "#ex1");
    text = $(event.target).text();
    console.log(text);
  });

  //1019추가 로그인 상태 확인한 후 이동 함수
  $("#toCart").click(function (e) {
    const authenticated = localStorage.getItem("auth");
    //2번 눌어야 됨
    if (authenticated === "true") {
      //alert("okay");
      $(e.target).attr("href", "./cartList.html");
    } else {
      e.preventDefault();
      //$("#custom-login-btn").click();
      //1023추가
      $(e.target).attr("rel", "modal:open");
      $(e.target).attr("href", "#ex1");
      text = $(e.target).text();
      console.log(text);
      alert("Please login first!");
    }
  });

  //1023추가 장바구니 버튼 누르고 로그인 하면 바로 장바구니 이동 함수 수정
  function login(e) {
    e.preventDefault();
    const member1_id = "robot"; //member1 회원의 아이디
    const member1_pw = 1234; //member1 회원의 비밀번호

    var userid = $("#userId").val();
    var userpw = $("#userPw").val();
    if (text == "장바구니") {
      if (userid == member1_id && userpw == member1_pw) {
        //로그인 화면 숨김처리한다
        alert("로그인 되었습니다.");

        $(location).attr("href", "./cartList.html");
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
    } else {
      if (userid == member1_id && userpw == member1_pw) {
        //로그인 화면 숨김처리한다
        alert("로그인 되었습니다.");

        $(location).attr("href", "./index.html");
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
  }

  $("#loginArea").on("submit", login);

  //1019 로그아웃 함수
  $("#custom-logout-btn").click(function () {
    localStorage.setItem("auth", "false");
    alert("bye~!");

    //location.reload();
  });

  var mHtml = $("html");
  var page = 1;
  mHtml.animate({ scrollTop: 0 }, 10);

  var mHtml = $("html");
  var page = 1;
  mHtml.animate({ scrollTop: 0 }, 10);

  $(window).on("wheel", function (e) {
    if (mHtml.is(":animated")) return;
    if (e.originalEvent.deltaY > 0) {
      if (page == 4) return;
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page == 1) return;
      page--;
    }
    var posTop = (page - 1) * $(window).height();
    mHtml.animate({ scrollTop: posTop }, 1000, function () {
      if (page == 1) {
        $("ul#infoMenu li a").css("color", "black");
        $("header h1 g").attr("fill", "black");
        $("header h1 ").css("display", "none");
        $("header h1 ").fadeIn(1000);
        $(".Men a").css("color", "black");
        $(".Women a").css("color", "black");
        $(".Kids a").css("color", "black");
        $(".Codi a").css("color", "black");
      } else if (page == 2) {
        $("ul#infoMenu li a").css("color", "black");
        $("header h1 g").attr("fill", "black");
        $("header h1 ").css("display", "none");
        $("header h1 ").fadeIn(1000);
        $(".Men a").css("color", "black");
        $(".Women a").css("color", "black");
        $(".Kids a").css("color", "black");
        $(".Codi a").css("color", "black");
      } else if (page == 3) {
        $("ul#infoMenu li a").css("color", "black");
        $("header h1 g").attr("fill", "black");
        $("header h1 ").css("display", "none");
        $("header h1 ").fadeIn(1000);
        $(".Men a").css("color", "black");
        $(".Women a").css("color", "black");
        $(".Kids a").css("color", "black");
        $(".Codi a").css("color", "black");
      } else if (page == 4) {
        $("ul#infoMenu li a").css("color", "black");
        $("header h1 g").attr("fill", "black");
        $("header h1 ").css("display", "none");
        $("header h1 ").fadeIn(1000);
        $(".Men a").css("color", "black");
        $(".Women a").css("color", "black");
        $(".Kids a").css("color", "black");
        $(".Codi a").css("color", "black");
      }
    });
  });
});
