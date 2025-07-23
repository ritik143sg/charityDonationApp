const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const pending = document.getElementById("pending");

const approve = document.getElementById("approve");

const displayOrgs = (lists) => {
  const ul = document.querySelectorAll("ul");
  ul[0].innerHTML = "";
  ul[1].innerHTML = "";
  ul[2].innerHTML = "";

  lists.map((list) => {
    const li = document.createElement("li");
    li.innerText = `${list.username}`;

    if (list.status == "Pending") {
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");

      // li.innerText = `${list.orgName}`;
      button1.innerText = "Approve";
      //.innerText = "Reject";

      const data = {
        id: list.id,
      };

      button1.addEventListener("click", async () => {
        try {
          const res = await axios.post(
            `http://localhost:5000/admin/orgstatus/${1}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${admintoken}`,
              },
            }
          );
          console.log(res.data);
          initialize();
        } catch (error) {
          console.log(error);
        }
      });

      button2.addEventListener("click", async () => {
        try {
          const res = await axios.post(
            `http://localhost:5000/admin/orgstatus/${0}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${admintoken}`,
              },
            }
          );
          console.log(res.data);
          initialize();
        } catch (error) {
          console.log(error);
        }
      });

      // li.innerText = `${list.orgName}`;
      // button1.innerText = "Approve";
      button2.innerText = "Reject";

      li.appendChild(button1);
      li.appendChild(button2);
      ul[0].appendChild(li);
    } else if (list.status == "Accepted") {
      ul[1].appendChild(li);
    } else {
      ul[2].appendChild(li);
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

    displayOrgs(res.data.Orgs);
  } catch (error) {
    console.log(error);
  }
};

initialize();
