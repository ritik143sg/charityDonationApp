const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const org = document.getElementById("org");
const user = document.getElementById("user");
const project = document.getElementById("project");

if (!admintoken) {
  window.location.href = "./adminLogin.html";
}

const admin = document.getElementById("admin");

const totalDonation = document.getElementById("money");

admin.addEventListener("click", () => {
  window.location.href = "./adminList.html";
});

org.addEventListener("click", () => {
  window.location.href = "./adminOrg.html";
});

user.addEventListener("click", () => {
  window.location.href = "./adminUser.html";
});

project.addEventListener("click", () => {
  window.location.href = "./adminProject.html";
});

const totalDonations = (lists) => {
  let money = 0;
  lists.map((list) => {
    money += list.money;
  });

  totalDonation.innerText = `₹${money}`;
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/getAllDonation", {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
    });

    console.log(res.data.donations);

    totalDonations(res.data.donations);
  } catch (error) {
    console.log(error);
  }
};

initialize();
