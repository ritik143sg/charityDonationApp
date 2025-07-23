const token = JSON.parse(localStorage.getItem("token"));
const List = document.getElementById("projectList");
const login = document.getElementById("login");
const orgs = document.getElementById("Orgs");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

orgs.addEventListener("click", () => {
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

console.log(token);

const displayProjectList = (lists) => {
  List.innerHTML = "";
  lists.map((list) => {
    const box = document.createElement("div");
    box.classList.add("project-box"); // Add a CSS class

    box.innerHTML = `
      <h3>${list.projectName}</h3>
      <p><strong>Location:</strong> ${list.location}</p>
      <p><strong>Target:</strong> ₹${list.targetMoney}</p>
      <p><strong>Current:</strong> ₹${list.currentMoney}</p>
      <p><strong>Description:</strong> ${list.desc}</p>
      <p><strong>Impact Report:</strong> ${list.ImpactReport}</p>
      <p><strong>Category:</strong> ${list.category}</p>
    `;

    box.addEventListener("click", () => {
      localStorage.setItem("projectId", JSON.stringify(list.id));

      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        window.location.href = "../payment/payment.html";
      } else {
        window.location.href = "../user/login.html";
      }
    });

    List.appendChild(box);
  });
};

const initialize = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const orgId = JSON.parse(localStorage.getItem("orgId"));

  const searchProjects = JSON.parse(localStorage.getItem("searchProjects"));

  if (searchProjects) {
    if (token) {
      login.innerText = `Profile`;
    } else {
      login.innerText = `login`;
    }
    displayProjectList(searchProjects);
    localStorage.removeItem("searchProjects");
  } else {
    console.log(login);
    if (token) {
      login.innerText = `Profile`;
    } else {
      login.innerText = `login`;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/charity/getAllProjects/${orgId}`
      );

      console.log(res.data.Project);

      displayProjectList(res.data.Project);
    } catch (error) {
      console.log(error);
    }
  }
};

initialize();
