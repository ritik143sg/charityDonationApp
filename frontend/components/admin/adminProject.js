const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const projectList = document.getElementById("projectList");

const displayProject2 = (lists, div) => {
  const ul = document.createElement("ul");

  lists.map((list) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    ul.appendChild(li);

    button.innerText = "Delete";

    button.addEventListener("click", async () => {
      try {
        const res = await axios.delete(
          `http://localhost:5000/admin/project/${list.id}`,
          {
            headers: {
              Authorization: `Bearer ${admintoken}`,
            },
          }
        );

        console.log(res);
        initialize();
      } catch (error) {
        console.log(error);
      }
    });

    li.innerText = `${list.projectName}`;
    li.appendChild(button);

    ul.appendChild(li);
  });

  div.appendChild(ul);
};

const displayProject = (lists) => {
  projectList.innerHTML = "";

  lists.map(async (list) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = `${list.username}`;
    div.appendChild(h1);
    try {
      const res = await axios.get(
        `http://localhost:5000/charity/getAllProjects/${list.id}`,
        {
          headers: {
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      console.log(res.data);
      displayProject2(res.data.Project, div);
      projectList.appendChild(div);
    } catch (error) {
      console.log(error);
    }
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/charity/getAllOrgs", {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
    });

    console.log(res.data.Orgs);
    displayProject(res.data.Orgs);
  } catch (error) {
    console.log(error);
  }
};

initialize();
