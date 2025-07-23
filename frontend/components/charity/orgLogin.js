const handleSubmit = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  const password = event.target.password.value;

  const data = {
    email: email,
    orgPassword: password,
  };

  console.log(data);

  try {
    const response = await axios.post(
      "http://localhost:5000/charity/authentication",
      data
    );

    console.log(response);

    localStorage.setItem("orgId", JSON.stringify(response.data.orgId));

    // const token = response.data.token;

    // localStorage.setItem("orgtoken", JSON.stringify(token));

    window.location.href = "./orgPage.html";

    event.target.reset();
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
