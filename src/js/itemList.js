import { spinner, hideSpinner } from "./loading.js";
$(function () {

  //금액 포멧
  function formatKRW(n) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(n);
  }
  //1019추가 로그인 상태 페이지 이동
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
  renderHeader();

  //url parameter 가져오기 함수 참조:https://velog.io/@nnakki/Javascript-URL-Query-String-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
  const navCategory = new URLSearchParams(location.search).get("navCategory");
  const category = new URLSearchParams(location.search).get("category");

  //헤더 메인메뉴 보여주기
  function showMainMenu() {
    $(".nav-Menu").removeClass("selected");
    $("." + navCategory)
      .find("a")
      .addClass("selected");
    //console.log(navCategory)
  }
  showMainMenu();

  //서브메뉴 보여주기
  function showButtonList() {
    console.log(category);
    $(".submenu").removeClass("active");
    $("#" + category)
      .parent()
      .parent()
      .addClass("active");
    console.log($("#" + category).parent(".submenu"));
  }
  showButtonList();

  //상품리스트 가져오기
  function showItemList() {
    $(".category-button").removeClass("selected");
    $("#" + category).addClass("selected");

    fetch(`/src/data/${category}.json`)
      .then((response) => response.json()) //json을 객체로 변환
      .then((responseObejct) => {
        //객체로 출력
        let { items } = responseObejct; //비구조화 할당
        let itemElems = "";

        for (let item of items) {
          let { id, title, price, productImg, thumbnails } = item;
          $("#subMenuImage").attr("src", productImg);
          itemElems += `
          <div class="item">
            <i class="fa fa-heart"></i>
            <a href="itemSpec.html?category=${category}&itemId=${item.id}">
              <div class="itemImage">
                <img src="${productImg}" alt="" class="listPage_Image" id="${item.id}">
              </div>
              <div class="listPage_detail">
                <div class="listPage_title">${title}</div>
                <div class="listPage_Price">${formatKRW(price)}</div>
              </div> 
           </a>
          </div>
        `;
        }
        $("#itemListArea").html(itemElems);
      });
  }
  //showItemList();
  //1018 로그인창 보여주기 함수
  $("#custom-login-btn").click(function () {
    $(this).attr("rel", "modal:open");
  });
  //1019 로그아웃 함수
  $("#custom-logout-btn").click(function () {
    localStorage.setItem("auth", "false");
    alert("bye~!");
    location.reload();
  });

  //1019 로그인 상태 돼야 장바구니로 이동 함수

  $("#toCart").click(function (e) {
    const authenticated = localStorage.getItem("auth");
    //2번 눌어야 됨
    if (authenticated === "true") {
      //alert("okay");
      //e.preventDefault();
      $(e.target).attr("href", "./cartList.html");
    } else {
      e.preventDefault();
      $("#custom-login-btn").click();
      alert("Please login first!");
    }
  });

  // 1024추가 로딩화면
  spinner();
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(showItemList());
    }, 1500);
  }).finally(hideSpinner);

  //1025추가 찜하기
  //찜한 상품 핑크 하트 추가 및 sidebar에서 찜한 상품 사진 보여주기
  $(document).on("click", ".fa-heart", function (e) {
    $(e.target).toggleClass("red");
    let likeImg = $(e.target).siblings("a").find(".itemImage").find("img").attr("src");
    let likeItemId = $(e.target).siblings("a").find(".itemImage").find("img").attr("id");
    let colorVal = $(e.target).css("Color");
    console.log(colorVal, likeItemId)
    if (colorVal == "rgb(255, 105, 180)") {
      //alert("heart")
      $(".wishListArea").prepend(`<img src="${likeImg}" class="likeBtn-img" id="${likeItemId}" /> <br/>`)
    } else {
      $(".wishListArea").find("#" + likeItemId).remove();
    }
  });
  //sidebar 토클클래스 사용
  $("#likeBtn").click(function (e) {
    $(".wishListArea").toggleClass("likeToggle")
    $(e.target).toggleClass("darkgray");
  })
});
