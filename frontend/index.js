const token = JSON.parse(localStorage.getItem("token"));
const List = document.getElementById("projectList");
const login = document.getElementById("login");
const orgs = document.getElementById("Orgs");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

const admin = document.getElementById("admin");

admin.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/components/admin/adminLogin.html";
});

orgs.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/components/charity/orgLogin.html";
});

searchButton.addEventListener("click", async () => {
  const input = search.value;
  try {
    const res = await axios.get(
      `http://localhost:5000/user/search?input=${input}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const project = res.data;

    localStorage.setItem("searchProjects", JSON.stringify(res.data.project));
    window.location.href = "/frontend/components/charity/project.html";
    console.log(project);
  } catch (error) {
    console.log(error);
  }

  search.value = "";
});

login.style.padding = "10px";
login.style.marginLeft = "10px";
login.style.borderRadius = "10px";
login.style.border = "none";
login.style.backgroundColor = "#4c77af";
login.style.color = "white";

login.addEventListener("click", () => {
  if (login.innerText == "login") {
    window.location.href = "../frontend/components/user/login.html";
  } else {
    window.location.href = "../frontend/components/user/login.html";
  }
});

const displayOrgsList = (lists) => {
  lists.forEach((list) => {
    const box = document.createElement("div");
    box.classList.add("project-box");

    box.innerHTML = `
    <h3>${list.username}</h3>
    <p><strong>OrgMail:</strong> ${list.email}</p>
    <p><strong>Mission:</strong> ${list.mission}</p>
    <p><strong>Goals:</strong> ${list.goals}</p>
    <p><strong>Office:</strong> ${list.office}</p>
    
  `;

    box.addEventListener("click", () => {
      localStorage.setItem("orgId", JSON.stringify(list.id));
      window.location.href = "./components/charity/project.html";
    });
    console.log(list);
    if (list.status == "Accepted") {
      List.appendChild(box);
    }
  });
};

const initialize = async () => {
  if (token) {
    login.innerText = "Profile";
  } else {
    login.innerText = "login";
  }

  try {
    const res = await axios.get("http://localhost:5000/charity/getAllOrgs");
    displayOrgsList(res.data.Orgs);
  } catch (error) {
    console.log(error);
  }
};

initialize();
