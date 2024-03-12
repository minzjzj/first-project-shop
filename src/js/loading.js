export function spinner() {
  //alert("spinner");
  // 로딩이미지 만들어서 보여질 곳에 넣기
  let loadingZone = document.getElementById("loadingZone");
  let loadingImage = document.createElement("img"); //로딩이미지 생성
  loadingImage.src = "./src/images/spinner.gif";

  loadingZone.append(loadingImage);
}
//1024추가
export function hideSpinner() {
  document.getElementById("loadingZone").remove();
}
