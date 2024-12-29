function goBack() {
  window.location.href = "../leads-page/index.html";
}

document
  .getElementById("new-lead-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const title = document.getElementById("title").value.trim();
    const leadStatus = document.getElementById("lead-status").value;

    let gotData = JSON.parse(localStorage.getItem("leadsData"));
    let lastId = gotData[gotData.length - 1];

    const lead = {
      id: gotData.length + 1,
      name: `${firstName} ${lastName}`,
      phone,
      mobile,
      email,
      company,
      title,
      status: leadStatus,
    };

    const existingLeads = JSON.parse(localStorage.getItem("leadsData")) || [];
    existingLeads.push(lead);
    localStorage.setItem("leadsData", JSON.stringify(existingLeads));
    window.location.href = "../leads-page/index.html";
  });

function goBack() {
  window.history.back();
}
