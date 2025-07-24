const app = document.getElementById("app");
const logout = document.getElementById("logout");

app.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/index.html";
});
logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "./adminLogin.html";
});
