const logout = document.getElementById("logout");
const token = JSON.parse(localStorage.getItem("admintoken"));
const userDetails = document.getElementById("userDetails");
const editButton = document.getElementById("editButton");
const editProfile = document.getElementById("editProfile");

// editProfile.addEventListener("click", () => {
//   window.location.href = "/frontend/components/user/editProfile.html";
// });

// editButton.addEventListener("click", () => {
//   window.location.href = "/frontend/components/user/editUser.html";
// });

logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "/frontend/components/admin/adminLogin.html";
});

const displayUser = (user) => {
  const h1 = document.createElement("h1");

  h1.innerText = `${user.id} ${user.username} ${user.email} ${user.phoneNumber} `;

  h1.innerHTML = `
  <h3>UserName: </strong>${user.username}</h3>
  <p><strong>Email: </strong> ${user.email}</p>
  <p><strong>PhoneNo: </strong> ${user.phoneNumber}</p>
`;

  userDetails.appendChild(h1);
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/admin/adminDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data.admin);

    displayUser(res.data.admin);
  } catch (error) {
    console.log(error);
  }
};

initialize();
