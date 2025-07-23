const handelSubmit = async (event) => {
  event.preventDefault();

  const oldPassword = event.target.oldPassword.value;
  const newPassword = event.target.newPassword.value;
  const reNewPassword = event.target.reNewPassword.value;

  if (newPassword != reNewPassword) {
    console.log("Password Miss Match");
  } else {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.patch(
        "http://localhost:5000/user/updatePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "./login.html";
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
};
