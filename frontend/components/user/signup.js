const handleSubmit = async (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  const password = event.target.password.value;
  // const file = event.target.file.files[0];

  console.log(username, email, phone, password);

  const data = {
    username: username,
    email: email,
    password: password,
    phoneNumber: phone,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/user/register",
      data
    );

    console.log(response);

    event.target.reset();
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
