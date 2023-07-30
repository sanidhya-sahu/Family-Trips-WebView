var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
// console.log(img)
function zoom(btnID) {
    modal.style.display = "block";
    modalImg.innerHTML=`
    <img class="modal-content" src="./Data/${btnID}">
    `
    captionText.innerHTML = this.alt;
}
span.onclick = function () {
    modal.style.display = "none";
}
