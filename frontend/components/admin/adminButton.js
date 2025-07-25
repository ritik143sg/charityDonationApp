const app = document.getElementById("app");

app.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/index.html";
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "./adminLogin.html";
});
