const ul = document.querySelector("ul");

const addProject = document.getElementById("addProject");

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
  onclick="localStorage.setItem('projectId', JSON.stringify(${org.id})); window.location.href='./editReport.html';"
  id="report"
  style="
    padding: 10px;
    border: none;
    background-color: rgb(255, 132, 204);
    color: white;
    border-radius: 10px;
    font-weight: bold;
  "
>
  Edit
</button>

        `;

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
