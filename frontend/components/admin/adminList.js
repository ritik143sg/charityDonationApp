const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const ul = document.querySelector("ul");

const displayUsers = (lists) => {
  ul.innerHTML = "";
  lists.map((list) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = "Delete";

    button.addEventListener("click", async () => {
      try {
        const res = await axios.delete(
          `http://localhost:5000/admin/user/${list.id}`,
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
    li.appendChild(button);

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
