const handleSubmit = async (event) => {
  event.preventDefault();

  const projectname = event.target.projectname.value;
  const location = event.target.location.value;
  const target = event.target.target.value;
  const current = 0;
  const desc = event.target.desc.value;
  const report = "";
  const category = event.target.category.value;

  console.log(projectname, location, target, current, desc, report, category);

  const data = {
    projectName: projectname,
    location: location,
    targetMoney: target,
    category: category,
    currentMoney: current,
    desc: desc,
    ImpactReport: report,
  };

  try {
    const orgId = JSON.parse(localStorage.getItem("orgId"));

    const res = await axios.post(
      `http://localhost:5000/charity/createproject/${orgId}`,
      data
    );

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
