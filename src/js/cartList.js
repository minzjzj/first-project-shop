$(function () {
  let totalSum = 0;
  let cartItems = []; //장바구니
  let shippingFee; //배송비

  //1024추가 모바일 토클 메뉴


  //1024추가 주문 결제 버튼 클릭시 주문이 안료됐다는 화면 노출
  $(".purchase-btn").click(function () {
    //주문완료
    $("#cartArea").css("display", "none");
    $("#orderDone").css("display", "block");
  });

  function formatKRW(n) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(n);
  }

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

//1025추가 cartList.html 바로 서버에 띄울 때 안 보이는 함수
  function checkLoginStatus() {
    const authenticated1 = localStorage.getItem("auth");
    if (authenticated1 === "false" && $(location).attr("href") == "http://127.0.0.1:5500/cartList.html") {
      $(location).attr("href", "http://127.0.0.1:5500/index.html")
    }
  }
  
  checkLoginStatus();

  //localStorage 저장 된 상품 가져오기
  getLocal();

  function getLocal() {
    if (!localStorage.getItem("cartItems")) {
      cartItems = []; //배열초기화
    } else {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      $(".go-purchase-txt-area").hide();
    }
    console.log(cartItems);
    // $(".shoppingCart_tbody").html(' ');
    cartItems.forEach((item, idx) => {
      $(".shoppingCart_tbody").append(` 
      <tr> 
      <td><img src="${item.productImg}"></td>
      <td class='nameSize'>
        <p class='title'><span class='columns'>상품명 : </span>${item.title}</p>
        <p class='size'><span class='columns'>사이즈 : </span>${item.size}</p>
      </td>
      <td>
        <span class="cartPage_itemPrice"><span class='columns'>가격 : </span>${formatKRW(
        item.price
      )}</span>
      </td>
      <td class="priceTd" style="display:none;">
        <span class="cartPage_itemPrice">${item.price}</span>
      </td>
    <input class="input-price" value="${item.price}" type="hidden" />
    <input class="input-index" value="${idx}" type="hidden" />
     <td>
      <button class="deduct cartAreaBtn"> - </button>
     </td>
     <td class="quantityTd">
      <span class="cartPage_quantity">${item.quantity}</span>
     </td>
     <td>
      <button class="add cartAreaBtn"> + </button>
     </td>
     <td class="totalPriceTd">
      <span class="cartPage_totalPrice"> ${formatKRW(
        item.price * item.quantity
      )}</span>
     </td>
     <td class="deleteItemTd">
      <button cart="${item.id}" class="deleteItem">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    
      `);
    });
  }
  // 수량 조정 함수
  $(".deduct").on("click", function (e) {
    let clickedCount = Number(
      $(e.target).parent("td").siblings(".quantityTd").find("span").text()
    );
    let productPrice = $(e.target).parent("td").siblings(".input-price").val();
    // console.log(productPrice);
    //console.log(clickedCount);
    clickedCount -= 1;
    if (clickedCount < 1) {
      clickedCount = 1;
    }
    $(e.target)
      .parent("td")
      .siblings(".quantityTd")
      .find("span")
      .text(clickedCount);

    $(e.target)
      .parent("td")
      .siblings(".totalPriceTd")
      .find("span")
      .text(formatKRW(clickedCount * productPrice));

    //1019추가 수량 조정 후 localstoraged에 저장
    let itemId = $(e.target)
      .parent("td")
      .siblings(".deleteItemTd")
      .find("button")
      .attr("cart");

    let itemCurrentIndex = $(e.target)
      .parent("td")
      .siblings(".input-index")
      .val();
    // console.log(
    //   "itemID",
    //   itemId,
    //   "index",
    //   itemCurrentIndex,
    //   "clickedCount",
    //   clickedCount
    // );

    cartItems[itemCurrentIndex].quantity = clickedCount;
    cartItems[itemCurrentIndex].totalPrice = clickedCount * productPrice;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    totalSum = 0;
    getTotalAmount();
  });

  $(".add").on("click", function (e) {
    let clickedCount = Number(
      $(e.target).parent("td").siblings(".quantityTd").find("span").text()
    );
    let productPrice = $(e.target).parent("td").siblings(".input-price").val();

    clickedCount += 1;
    if (clickedCount > 10) {
      clickedCount = 10;
    }
    $(e.target)
      .parent("td")
      .siblings(".quantityTd")
      .find("span")
      .text(clickedCount);
    $(e.target)
      .parent("td")
      .siblings(".totalPriceTd")
      .find("span")
      .text(formatKRW(clickedCount * productPrice));
    //1019추가 수량 조정 후 localstoraged에 저장
    let itemId = $(e.target)
      .parent("td")
      .siblings(".deleteItemTd")
      .find("button")
      .attr("cart");

    let itemCurrentIndex = $(e.target)
      .parent("td")
      .siblings(".input-index")
      .val();
    console.log(
      "itemID",
      itemId,
      "index",
      itemCurrentIndex,
      "clickedCount",
      clickedCount
    );
    cartItems[itemCurrentIndex].quantity = clickedCount;
    cartItems[itemCurrentIndex].totalPrice = clickedCount * productPrice;
    console.log(clickedCount * productPrice);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    totalSum = 0;
    getTotalAmount();
  });
  // 수량 조정 함수 종료

  //삭제함수
  $(".delCart").click(function () {
    //alert("장바구니 길이:" + cartItems.length);
    if (cartItems.length >= 1) {
      let deletePopUp = confirm("모두 상품 삭제하시겠습니까?");
      if (deletePopUp == 1) {
        $(".shoppingCart_tbody").text("");
        cartItems = []; //배열 초기화/ 바구니 비운다
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        hideCartArea();
      } else {
        alert("취소했습니다.");
      }
    } else {
      //담아놓은 상품 없을 경우
      alert("담아놓은 상품이 없습니다.");
    }
  });

  //개별 상품 삭제 함수
  $(".deleteItem").on("click", function (e) {
    console.log(e.currentTarget);

    const newCartItems = cartItems.filter(
      (c) => c.id != $(e.currentTarget).attr("cart")
    );
    console.log("newCartItems", newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    location.reload();
  });
  //1019추가 장바구니 비어 있을 때 안 보이게
  function hideCartArea() {
    if (!cartItems.length) {
      $("#cartArea").hide();
      $(".go-purchase-txt-area").show();
    }
  }
  hideCartArea();

  //1020추가 합계 보여주는 함수
  function getTotalAmount() {
    if (!localStorage.getItem("cartItems")) {
      cartItems = []; //배열초기화
    } else {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    var priceArray = cartItems.map((item) => item.totalPrice);
    console.log(priceArray);
    priceArray.forEach(function (item, index) {
      totalSum += item;
    });
    console.log("모두 상품 합계", totalSum);
    if (totalSum < 150000) {
      shippingFee = 5000;
      let totalPurchaseAmount = totalSum + shippingFee;
      $(".itemAmount").text(formatKRW(totalSum));
      $(".shipping-fee").text(formatKRW(shippingFee));
      $(".totalAmount").text(formatKRW(totalPurchaseAmount));
    } else {
      shippingFee = 0;
      let totalPurchaseAmount = totalSum + shippingFee;
      $(".itemAmount").text(formatKRW(totalSum));
      $(".shipping-fee").text(formatKRW(shippingFee));
      $(".totalAmount").text(formatKRW(totalPurchaseAmount));
    }
  }
  getTotalAmount();

  //1024추가 현재 날짜
  var currentdate = new Date();
  var datetime =
    "주문일자:" +
    currentdate.getFullYear() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  var orderNumber =
    currentdate.getFullYear() +
    "" +
    (currentdate.getMonth() + 1) +
    "" +
    currentdate.getDate();

  $(".orderDate").text(datetime);
  $("#orderNumber").text(orderNumber);

  //1025추가 로그아웃 함수
  $("#custom-logout-btn").click(function () {
    localStorage.setItem("auth", "false");
    alert("bye~!");
    renderHeader();
  });
});
