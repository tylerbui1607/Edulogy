document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("fk");
  var form = document.getElementById("form");
  var formData = new FormData(form);
  fetch("https://fathomless-castle-76283.herokuapp.com/api/tests", {
    method: "POST",
    body: formData,
  });
});
