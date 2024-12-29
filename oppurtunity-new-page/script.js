
document
  .getElementById("opportunityForm")
  .addEventListener("submit", function (e) {
    e.preventDefault()
    const opportunityForm = document.getElementById("opportunityForm");
    const gotData = JSON.parse(localStorage.getItem("opportunitiesData"));
    const opportunityData = {
      id: gotData.length,
      opportunityName: opportunityForm.opportunityName.value,
      accountName: opportunityForm.accountName.value,
      type: opportunityForm.type.value,
      leadSource: opportunityForm.leadSource.value,
      amount: opportunityForm.amount.value,
      closeDate: opportunityForm.closeDate.value,
      stage: opportunityForm.stage.value,
      probability: `${opportunityForm.probability.value}%`,
    };

    const existingData =
      JSON.parse(localStorage.getItem("opportunitiesData")) || [];
    existingData.push(opportunityData);

    localStorage.setItem("opportunitiesData", JSON.stringify(existingData));


    window.location.href = "../oppurtunity-home-page/index.html";
  });

  function goBack() {
    window.location.href = "../oppurtunity-home-page/index.html";
  }