const ul = document.querySelector("ul");

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

const displayOrgDetails = (org) => {
  const li = document.createElement("li");

  li.innerHTML = `
    <h3>${org.username}</h3>
    <p><strong>mission:</strong> ${org.mission}</p>
    <p><strong>office:</strong> ${org.office}</p>
    <p><strong>orgMail:</strong> ${org.email}</p>
     <p><strong>phone:</strong> ${org.phone}</p>
    <p><strong>goals:</strong> ${org.goals}</p>
   
  `;
  li.addEventListener("click", () => {
    window.location.href = "./orgProject.html";
  });

  ul.appendChild(li);
};

const initialize = async () => {
  const orgId = JSON.parse(localStorage.getItem("orgId"));

  try {
    const res = await axios.get(
      `http://localhost:5000/charity/charityinfo/${orgId}`
    );

    console.log(res.data);

    displayOrgDetails(res.data.charity);
  } catch (error) {
    console.log(error);
  }
};

initialize();
