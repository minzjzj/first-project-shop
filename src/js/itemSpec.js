$(function () {


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

  let globalItem;
  let clickedCount = 1; //초기값
  const $quantity = $("#quantity");
  let quantity = $quantity.text();
  let chosenSize = "S";

  let cartItems; //장바구니
  let newCartId;

  //url parameter 가져오기 함수
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("itemId");
  const category = searchParams.get("category");

  //금액 포멧
  function formatKRW(n) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(n);
  }

  //상세 페이지
  function showItemSpec() {
    fetch(`/src/data/${category}.json`)
      .then((response) => response.json()) //json을 객체로 변환
      .then((responseObejct) => {
        //객체로 출력
        let { items } = responseObejct; //비구조화 할당
        const item = items.find((item) => item.id == itemId);
        globalItem = item;
        let { title, price, productImg, thumbnails, iteminfo } = item;
        $("#itemTitle").text(title);
        $("#itemPrice").text(formatKRW(price));
        $("#itemInfo").text(iteminfo);
        $("#mainImage").attr("src", productImg);
        $("#thumbnail1").attr("src", productImg);
        $("#thumbnail2").attr("src", thumbnails[0]);
        $("#thumbnail3").attr("src", thumbnails[1]);
        $("#thumbnail4").attr("src", thumbnails[2]);
        $("#specPage_totalPrice").text(formatKRW(price * parseInt(quantity)));
      });
  }
  showItemSpec();

  //수량 조정 함수
  $(".deduct").click(() => {
    clickedCount -= 1;
    if (clickedCount < 1) {
      clickedCount = 1;
    }
    $quantity.text(clickedCount);
    $("#specPage_totalPrice").text(
      formatKRW(globalItem.price * parseInt(clickedCount))
    );
  });
  $(".add").click(() => {
    clickedCount += 1;
    if (clickedCount > 10) {
      clickedCount = 10;
    }
    $quantity.text(clickedCount);
    $("#specPage_totalPrice").text(
      formatKRW(globalItem.price * parseInt(clickedCount))
    );
  });

  //썸네일 보는 함수
  $(".thumbnail").on("mouseover", (e) => {
    $("#mainImage").attr("src", $(e.target).attr("src"));
  });

  //사이즈 선택
  $(".sizeBtn").on("click", (e) => {
    $(".sizeBtn").removeClass("selectedButton");
    $(e.target).addClass("selectedButton");
    chosenSize = $(e.target).text();
    //console.log(chosenSize)
  });

  //1019추가 로그인 상태 확인한 후 장바구니 넣기
  $(".addToCart").on("click", () => {
    const authenticated = localStorage.getItem("auth");
    if (authenticated === "true") {
      if (!localStorage.getItem("cartItems")) {
        cartItems = []; //배열초기화
      } else {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      if (cartItems.length == 0) {
        //1020 수정
        newCartId = 1;
        //alert("true");
      } else {
        //1020 수정
        newCartId = Math.max(...cartItems.map((item) => item.id)) + 1;
        //alert("false");
      }
      console.log(cartItems.length, newCartId);

      let chosenItem = {
        id: newCartId,
        itemId: globalItem.id,
        title: $("#itemTitle").text(),
        productImg: $("#mainImage").attr("src"),
        price: globalItem.price,
        totalPrice: globalItem.price * clickedCount,
        quantity: $("#quantity").text(),
        size: chosenSize,
      };

      cartItems.push(chosenItem);

      let message = "";
      for (let cartItem of cartItems) {
        message += ` ${cartItem.title}  ${cartItem.quantity}개  담았습니다.
        `;
      }
      alert(message);
      saveToLocal(chosenItem);
    } else {
      $("#custom-login-btn").click();
    }
  });

  //1019추가 로그인 상태 먼저 확인한 후 장바구니 확인하기
  $(".viewCart").click(function () {
    const authenticated = localStorage.getItem("auth");
    if (authenticated === "true") {
      location.href = "cartList.html";
    } else {
      $("#custom-login-btn").click();
      alert("Please login first!");
    }
  });

  //1019 로그아웃 함수
  $("#custom-logout-btn").click(function () {
    localStorage.setItem("auth", "false");
    // alert("bye~!");
    location.reload();
  });

  //선택한 localStorage에 담기는 함수
  function saveToLocal(chosenItem) {
    if (!localStorage.getItem("cartItems")) {
      cartItems = []; //배열초기화
    } else {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems.push(chosenItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  //1024추가
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
});
