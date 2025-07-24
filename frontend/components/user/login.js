const result = document.getElementById("result");

const handleSubmit = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  const password = event.target.password.value;

  console.log(email, password);

  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/user/authentication",
      data
    );

    console.log(response);

    const token = response.data.token;

    localStorage.setItem("token", JSON.stringify(token));

    window.location.href = "/frontend/index.html";

    event.target.reset();
  } catch (error) {
    result.innerHTML = `${error.response.data.msg}`;
    result.style.color = "red";
    console.error("Registration failed:", error.response.data);
  }
};
