const sampleData = [
  {
    id: 1,
    name: "John Doe",
    title: "Manager",
    company: "ABC Corp",
    phone: "(123) 456-7890",
    status: "Open - Not Contacted",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Director",
    company: "XYZ Inc",
    phone: "(987) 654-3210",
    status: "Working - Contacted",
  },
];

if (!localStorage.getItem("leadsData")) {
  localStorage.setItem("leadsData", JSON.stringify(sampleData));
}

function renderTable() {
  const leadsData = JSON.parse(localStorage.getItem("leadsData"));
  const tableBody = document.querySelector("#leads-table tbody");
  tableBody.innerHTML = "";

  leadsData.forEach((lead) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${lead.id}</td>
        <td>${lead.name}</td>
        <td>${lead.title}</td>
        <td>${lead.company}</td>
        <td>${lead.phone}</td>
        <td>
          <select class="status-dropdown" data-id="${lead.id}">
            <option value="Open - Not Contacted" ${
              lead.status === "Open - Not Contacted" ? "selected" : ""
            }>Open - Not Contacted</option>
            <option value="Working - Contacted" ${
              lead.status === "Working - Contacted" ? "selected" : ""
            }>Working - Contacted</option>
            <option value="Closed - Won" ${
              lead.status === "Closed - Won" ? "selected" : ""
            }>Closed-Converted</option>
            <option value="Closed - Lost" ${
              lead.status === "Closed - Lost" ? "selected" : ""
            }>Closed-Not Converted</option>
          </select>
        </td>
      `;

    tableBody.appendChild(row);
  });
  document.querySelectorAll(".status-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("change", updateStatus);
  });
}

function updateStatus(event) {
  const leadId = parseInt(event.target.getAttribute("data-id"));
  const newStatus = event.target.value;

  const leadsData = JSON.parse(localStorage.getItem("leadsData"));
  const updatedLeadsData = leadsData.map((lead) => {
    if (lead.id === leadId) {
      return { ...lead, status: newStatus };
    }
    return lead;
  });

  localStorage.setItem("leadsData", JSON.stringify(updatedLeadsData));
  renderTable();
}
renderTable();

function createNew() {
  window.location.href = "../leads-form-page/index.html";
}
