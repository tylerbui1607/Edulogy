function showScore(s) {
  document.getElementById("modal").classList.add("show_flex");
  document.getElementById("scorePopup").classList.add("show_flex");
  document.getElementById("scoreDisplay").innerHTML = s;
}
function showStatus(status, message) {
  let modal = document.getElementById("modal");
  let msgDisplay = document.getElementById("statusMsg");
  let statusPopup = document.getElementById("statusPopup");
  modal.classList.add("show_flex");
  statusPopup.classList.add("show_flex");
  msgDisplay.innerHTML = message;
  if (status === "loading") {
    msgDisplay.innerHTML =
      '<img src="https://i.ibb.co/Z64YB8h/ajax-loader.gif" alt="">';
    return;
  }
  if (status === "success") {
    document.getElementById("closeStatusBtn").onclick = () => {
      document.location.reload();
    };
    return;
  }
  document.getElementById("closeStatusBtn").onclick = () => {
    statusPopup.classList.remove("show");
    modal.classList.remove("show_flex");
  };
}
function showSidebar() {
  document.getElementById("modal").classList.add("show");
  document.getElementById("menuSidebar").style.width = "300px";
  document
    .getElementById("menuSidebar")
    .addEventListener("transitionend", () => {
      document.body.style.overflow = "hidden";
    });
}
function closeSidebar() {
  const sidebar = document.getElementById("menuSidebar");
  sidebar.style.width = "0";
  sidebar.addEventListener("transitionend", () => {
    if (!sidebar.offsetWidth) {
      document.body.style.overflow = "auto";
      document.getElementById("modal").classList.remove("show");
    }
  });
}

function toggleSubitem() {
  const subitem = document.getElementById("sidebarSubitem");
  if (subitem.offsetHeight === 0) subitem.style.height = "9em";
  else subitem.style.height = "0";
}

export { showScore, showSidebar, closeSidebar, toggleSubitem, showStatus };
