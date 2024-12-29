const opportunitiesData = [
  {
    id: 1,
    opportunityName: "Acme - 150 Widgets (Sample)",
    accountName: "Acme (Sample)",
    stage: "Closed Won",
    closeDate: "2022-03-14",
    probability: "10%",
    leadSource: "Employee Referral",
  },
  {
    id: 2,
    opportunityName: "Acme - 1250 Widgets (Sample)",
    accountName: "Acme (Sample)",
    stage: "Negotiation",
    closeDate: "2022-02-28",
    probability: "10%",
    leadSource: "Website",
  },
  {
    id: 3,
    opportunityName: "Global Media - 1750 Widgets (Sample)",
    accountName: "Global Media (Sample)",
    stage: "Closed Won",
    closeDate: "2022-03-04",
    probability: "10%",
    leadSource: "Advertisement",
  },
  {
    id: 4,
    opportunityName: "Acme - 200 Widgets (Sample)",
    accountName: "Acme (Sample)",
    stage: "Closed Lost",
    closeDate: "2022-04-13",
    probability: "10%",
    leadSource: "Webinar",
  },
  {
    id: 5,
    opportunityName: "salesforce.com - 320 Widgets (Sample)",
    accountName: "salesforce.com (Sample)",
    stage: "Needs Analysis",
    closeDate: "2022-03-16",
    probability: "35%",
    leadSource: "Google AdWords",
  },
];

if (!localStorage.getItem("opportunitiesData")) {
  localStorage.setItem("opportunitiesData", JSON.stringify(opportunitiesData));
}

const table = document.getElementById("opportunity-table");

let obj = {
  category: "all",
};

function populateTable() {
  const data = JSON.parse(localStorage.getItem("opportunitiesData"));
  let filteredData = data;
  if (obj.category === "Closed Won") {
    filteredData = data.filter((item) => item.stage === "Closed Won");
  } else if (obj.category === "Closed Lost") {
    filteredData = data.filter((item) => item.stage === "Closed Lost");
  }
  table.innerHTML = "";
  filteredData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.opportunityName}</td>
        <td>${item.accountName}</td>
        <td>
          <select class="status-dropdown" data-column="stage" data-id="${
            item.id
          }">
          <option value="Qualification" ${
              item.stage === "Qualification" ? "selected" : ""
            }>Qualification</option>
            <option value="Closed Won" ${
              item.stage === "Closed Won" ? "selected" : ""
            }>Closed Won</option>
            <option value="Closed Lost" ${
              item.stage === "Closed Lost" ? "selected" : ""
            }>Closed Lost</option>
            <option value="Negotiation" ${
              item.stage === "Negotiation" ? "selected" : ""
            }>Negotiation</option>
            <option value="Needs Analysis" ${
              item.stage === "Needs Analysis" ? "selected" : ""
            }>Needs Analysis</option>
          </select>
        </td>
        <td>${item.closeDate}</td>
        <td>${item.probability}</td>
        <td><select class="status-dropdown" data-column="source" data-id="${
          item.id
        }">
            <option value="Advertisement" ${
              item.leadSource === "Advertisement" ? "selected" : ""
            }>Advertisement</option>
            <option value="Customer Event" ${
              item.leadSource === "Customer Event" ? "selected" : ""
            }>Customer Event</option>
            <option value="Employee Referral" ${
              item.leadSource === "Employee Referral" ? "selected" : ""
            }>Employee Referral</option>
            <option value="Other" ${
              item.leadSource === "Other" ? "selected" : ""
            }>Other</option>
          </select>
        </td>
      `;
    table.appendChild(row);
  });
  document.querySelectorAll(".status-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("change", updateStatus);
  });
}
function updateStatus(event) {
  const oppId = parseInt(event.target.getAttribute("data-id"));
  const columnType = event.target.getAttribute("data-column");
  console.log(columnType);
  const newValue = event.target.value;

  const oppData = JSON.parse(localStorage.getItem("opportunitiesData"));
  const updatedOppData = oppData.map((opp) => {
    if (opp.id === oppId) {
      if (columnType === "stage") {
        return { ...opp, stage: newValue };
      } else {
        return { ...opp, leadSource: newValue };
      }
    }
    return opp;
  });

  localStorage.setItem("opportunitiesData", JSON.stringify(updatedOppData));
}

populateTable();

function filtering(a) {
  obj.category = a;
  populateTable();
}

function createNew(){
  window.location.href = "../oppurtunity-new-page/index.html"
}