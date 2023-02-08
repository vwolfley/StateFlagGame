
function hideButton() {
    let element = document.getElementById("startGame");
    if (
      document.getElementById("correctScore").innerText == "0" &&
      document.getElementById("incorrectScore").innerText == "0"
    ) {
      element.style.visibility = "hidden";
    } else {
      element.style.visibility = "visible";
    }
  }

  export default hideButton;