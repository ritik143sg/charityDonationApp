const token = JSON.parse(localStorage.getItem("token"));
const donationList = document.getElementById("donation");

const download = document.getElementById("download");

download.addEventListener("click", async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/download", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    window.location.href = `${res.data.fileUrl}`;
  } catch (error) {
    console.log(error);
  }
});

const displayDonations = (donations) => {
  donations.forEach(async (donation) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/charity/projectinfo/${donation.ProjectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const projectName = res.data.project.projectName;

      const li = document.createElement("li");
      //li.innerText = `<p> Donation</p> ₹${donation.money} -Status ${donation.status} -Project ${projectName}`;

      li.innerHTML = `
      <h3>DonationId : ${donation.id}</h3>
      <p><strong>Donation:</strong> ${donation.money}</p>
      <p><strong>Status:</strong> ${donation.status}</p>
      <p><strong>Project:</strong> ${projectName}</p>
    `;

      li.classList.add(donation.status.toLowerCase()); // "success", "failed", etc.
      donationList.appendChild(li);
    } catch (error) {
      console.log(error);
    }
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/donationhistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data.donations);

    displayDonations(res.data.donations);
  } catch (error) {
    console.log(error);
  }
};

initialize();
