const ul = document.querySelector("ul");
const token = JSON.parse(localStorage.getItem("orgtoken"));

const addProject = document.getElementById("addProject");

const app = document.getElementById("app");

app.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/index.html";
});

const logoutOrg = document.getElementById("logoutOrg");

logoutOrg.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "./orgLogin.html";
});

addProject.addEventListener("click", () => {
  window.location.href = "./createproject.html";
});

const displayOrgDetails = (orgs) => {
  orgs.map((org) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${org.projectName}</h3>
      <p><strong>Location:</strong> ${org.location}</p>
      <p><strong>Target:</strong> ₹${org.targetMoney}</p>
      <p><strong>Current:</strong> ₹${org.currentMoney}</p>
      <p><strong>Description:</strong> ${org.desc}</p>
      <p><strong>Impact Report:</strong> ${org.ImpactReport}</p>
      <p><strong>Category:</strong> ${org.category}</p>
    
      <button 
        class="edit-btn"
        data-id="${org.id}"
        style="
          padding: 10px;
          border: none;
          background-color: rgb(255, 132, 204);
          color: white;
          border-radius: 10px;
          font-weight: bold;
          margin-right: 10px;
        "
      >
        Edit
      </button>
    
      <button 
        class="delete-btn"
        data-id="${org.id}"
        style="
          padding: 10px;
          border: none;
          background-color: rgb(216, 80, 80);
          color: white;
          border-radius: 10px;
          font-weight: bold;
        "
      >
        Delete
      </button>
    `;

    // Add event listeners
    li.querySelector(".edit-btn").addEventListener("click", () => {
      localStorage.setItem("projectId", JSON.stringify(org.id));
      window.location.href = "./editReport.html";
    });

    li.querySelector(".delete-btn").addEventListener("click", async () => {
      const admintoken = localStorage.getItem("admintoken");
      try {
        const res = await axios.delete(
          `http://localhost:5000/charity/project/${org.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // alert("Project deleted successfully");
        li.remove();
      } catch (err) {
        console.error(err);
        //alert("Error deleting project");
      }
    });

    ul.appendChild(li);
  });
};

const initialize = async () => {
  const orgId = JSON.parse(localStorage.getItem("orgId"));

  try {
    const res = await axios.get(
      `http://localhost:5000/charity/getAllProjects/${orgId}`
    );

    console.log(res.data);

    displayOrgDetails(res.data.Project);
  } catch (error) {
    console.log(error);
  }
};

initialize();
