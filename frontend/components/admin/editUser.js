const result = document.getElementById("result");

const handelSubmit = async (event) => {
  event.preventDefault();

  const oldPassword = event.target.oldPassword.value;
  const newPassword = event.target.newPassword.value;
  const reNewPassword = event.target.reNewPassword.value;

  if (newPassword != reNewPassword) {
    console.log("Password Miss Match");
    result.innerHTML = "";
    result.innerText = `${"Password Miss Match"}`;
    result.style.color = "red";
  } else {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const token = JSON.parse(localStorage.getItem("admintoken"));

      const res = await axios.patch(
        "http://localhost:5000/admin/updatePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "./adminLogin.html";
      console.log(res.data);
    } catch (error) {
      result.innerHTML = "";
      result.innerText = `${error.response.data.msg}`;
      result.style.color = "red";
      console.log(error);
    }
  }
};
