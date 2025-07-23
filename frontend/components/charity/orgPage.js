const ul = document.querySelector("ul");

const app = document.getElementById("app");

app.addEventListener("click", () => {
  window.location.href = "/frontend/index.html";
});

const displayOrgDetails = (org) => {
  const li = document.createElement("li");

  li.addEventListener("click", () => {
    window.location.href = "./orgProject.html";
  });

  li.innerHTML = `
    <h3>${org.username}</h3>
    <p><strong>mission:</strong> ${org.mission}</p>
    <p><strong>office:</strong> ${org.office}</p>
    <p><strong>orgMail:</strong> ${org.email}</p>
    <p><strong>goals:</strong> ${org.goals}</p>
  `;

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
