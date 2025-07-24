const result = document.getElementById("result");

const handleSubmit = async (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  const password = event.target.password.value;

  console.log(username, email, phone, password);

  const data = {
    username: username,
    email: email,
    password: password,
    phoneNumber: phone,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/admin/register",
      data
    );

    // console.log(response.data.msg);
    result.innerText = `${response.data.msg}`;

    result.style.color = "green";

    event.target.reset();
  } catch (error) {
    result.innerText = `${error.response.data.msg}`;
    result.style.color = "red";
    console.error("Registration failed:", error);
  }
};
