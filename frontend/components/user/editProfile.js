const btn = document.querySelector("button");
const id = JSON.parse(localStorage.getItem("userId"));
const token = JSON.parse(localStorage.getItem("token"));
const p = document.querySelector("p");

const username = document.getElementById("username");
const phoneNo = document.getElementById("phoneNo");

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/userdetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    username.value = res.data.user.username;
    phoneNo.value = res.data.user.phoneNumber;
  } catch (error) {
    console.log(error);
  }
};

const handelSubmit = async (event) => {
  event.preventDefault();

  const data = {
    username: username.value,
    phoneNumber: phoneNo.value,
  };
  console.log(data);

  try {
    const res = await axios.patch(
      `http://localhost:5000/user/updateProfile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    p.innerText = `${res.data.msg}`;

    console.log(res.data);
    window.location.href = "./profile.html";
  } catch (error) {
    p.innerText = `${error.response.data.msg}`;
    console.log(error);
  }
};

initialize();
