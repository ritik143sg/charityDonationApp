const handleSubmit = async (event) => {
  event.preventDefault();

  const orgname = event.target.orgname.value;
  const orgemail = event.target.orgemail.value;
  const password = event.target.password.value;
  const phone = event.target.phone.value;
  const mission = event.target.mission.value;

  const goals = event.target.goals.value;
  const office = event.target.office.value;

  console.log(orgname, orgemail, password, phone, mission, goals, office);

  const data = {
    username: orgname,
    email: orgemail,
    orgPassword: password,
    //  phone: phone,
    mission: mission,
    goals: goals,
    office: office,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/charity/register",
      data
    );

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
