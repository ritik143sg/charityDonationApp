login.addEventListener("click", () => {
  console.log(login.innerText);
  if (login.innerText == "login") {
    window.location.href = "/frontend/components/user/login.html";
  } else {
    window.location.href = "/frontend/components/user/profile.html";
  }
});
