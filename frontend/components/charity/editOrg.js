const btn = document.querySelector("button");
const id = JSON.parse(localStorage.getItem("orgId"));

const office = document.getElementById("office");
const goal = document.getElementById("goal");
const mission = document.getElementById("mission");
const phoneNo = document.getElementById("phoneNo");

window.addEventListener("DOMContentLoaded", () => {
  initialize();
});

const initialize = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/charity/charityinfo/${id}`
    );

    console.log(res.data);
    const org = res.data.charity;

    mission.value = org.mission;
    goal.value = org.goals;
    office.value = org.office;
    phoneNo.value = org.phone;
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", async () => {
  const data = {
    mission: mission.value,
    goals: goal.value,
    office: office.value,
    phone: phoneNo.value,
  };
  console.log(data);

  try {
    const res = await axios.patch(
      `http://localhost:5000/charity/editOrg/${id}`,
      data
    );
    console.log(res.data);
    window.location.href = "./orgPage.html";
  } catch (error) {
    console.log(error);
  }
});

initialize();
