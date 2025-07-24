const btn = document.querySelector("button");
const id = JSON.parse(localStorage.getItem("projectId"));

const projectLocation = document.getElementById("location");
const target = document.getElementById("target");
const desc = document.getElementById("desc");
const reportInput = document.getElementById("reportInput");

const initialize = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/charity/projectinfo/${id}`
    );
    console.log(res.data.project);
    const project = res.data.project;

    projectLocation.value = project.location;
    target.value = project.targetMoney;
    desc.value = project.desc;
    reportInput.value = project.ImpactReport;

    // window.location.href = "./orgProject.html";
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", async () => {
  const data = {
    location: projectLocation.value,
    targetMoney: target.value,
    desc: desc.value,
    ImpactReport: reportInput.value,
  };
  console.log(data);

  try {
    const res = await axios.patch(
      `http://localhost:5000/charity/editReport/${id}`,
      data
    );
    console.log(res.data);
    window.location.href = "./orgProject.html";
  } catch (error) {
    console.log(error);
  }
});

initialize();
