const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const adminEmail = JSON.parse(localStorage.getItem("adminEmail"));
const ul = document.querySelector("ul");

const displayUsers = (lists) => {
  ul.innerHTML = "";
  lists.map((list) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = "Delete";
    button.id = "delete";

    const editbutton = document.createElement("button");

    editbutton.innerText = "Profile";
    editbutton.id = "edit";

    editbutton.addEventListener("click", async () => {
      window.location.href = "./adminProfile.html";
    });

    button.addEventListener("click", async () => {
      try {
        const res = await axios.delete(
          `http://localhost:5000/admin/admin/${list.id}`,
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

    li.innerText = `${list.username}`;

    if (adminEmail != list.email) {
      li.appendChild(button);
    } else {
      li.appendChild(editbutton);
    }

    ul.appendChild(li);
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/admin/getAllAdmin", {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
    });

    console.log(res.data);
    displayUsers(res.data.admins);
  } catch (error) {
    console.log(error);
  }
};

initialize();
