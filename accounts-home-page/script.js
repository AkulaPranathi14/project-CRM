const accountdatalist = [
    { id: 1, accountName: "Apty", status: "Active" },
    { id: 2, accountName: "TechCorp", status: "Inactive" },
    { id: 3, accountName: "InnoSolutions", status: "At-Risk" },
    { id: 4, accountName: "CloudNine", status: "Loyal" },
    { id: 5, accountName: "DevWorks", status: "VIP" },
    { id: 6, accountName: "NextGen", status: "Inactive" },
    { id: 7, accountName: "FutureTech", status: "Active" },
    { id: 8, accountName: "SoftInnovate", status: "At-Risk" },
    { id: 9, accountName: "ProSync", status: "Loyal" },
    { id: 10, accountName: "BrightAI", status: "VIP" },
  ];
  
  localStorage.setItem("accountsdata", JSON.stringify(accountdatalist));
  
  const tableBody = document.querySelector("#Accounts-table tbody");
  
  function navigateToProfile(account) {
      localStorage.setItem("selectedAccount", JSON.stringify(account));
      window.location.href = "/accounts-profile-page/index.html";
  }
  
  function populateTable(data) {
    data.forEach((item) => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = item.id;
      const nameCell = document.createElement("td");
      nameCell.textContent = item.accountName;
      const statusCell = document.createElement("td");
      statusCell.textContent = item.status;
      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(statusCell);
      row.addEventListener("click", () => navigateToProfile(item));
      tableBody.appendChild(row);
    });
  }
  
  const storedData = JSON.parse(localStorage.getItem("accountsdata"));
  if (storedData) {
    populateTable(storedData);
  }
  