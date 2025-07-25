const logout = document.getElementById("logout");
const token = JSON.parse(localStorage.getItem("token"));
const userDetails = document.getElementById("userDetails");
const editButton = document.getElementById("editButton");
const editProfile = document.getElementById("editProfile");

const body = document.querySelector("body");

window.onload = () => {
  const token = localStorage.getItem("token");

  if (token) {
    body.hidden = false; // Show content if token exists
  } else {
    window.location.href = "./login.html"; // Redirect if not logged in
  }
};

editProfile.addEventListener("click", () => {
  window.location.href = "/frontend/components/user/editProfile.html";
});

editButton.addEventListener("click", () => {
  window.location.href = "/frontend/components/user/editUser.html";
});

const donationHistory = document.getElementById("donationHistory");

donationHistory.addEventListener("click", () => {
  window.location.href = "/frontend/components/donation/donationHistory.html";
});

logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "/frontend/components/user/login.html";
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
  if (!token) {
    body.hidden = false;
    console.log("ddddddddddd");
  }

  try {
    const res = await axios.get("http://localhost:5000/user/userdetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    displayUser(res.data.user);

    console.log(res.data.user);
  } catch (error) {
    console.log(error);
  }
};

initialize();
