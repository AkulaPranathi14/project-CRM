const selectedAccount = JSON.parse(localStorage.getItem("selectedAccount"));

if (selectedAccount) {
  document.querySelector(
    "main h1"
  ).textContent = `${selectedAccount.accountName} Profile`;

  const contactSection = document.querySelector("section:nth-of-type(1)");
  contactSection.innerHTML = `
    <h2>Contact Details</h2>
    <p><strong>Name:</strong> ${selectedAccount.accountName}</p>
    <p><strong>Email:</strong> ${selectedAccount.accountName
      .toLowerCase()
      .replace(/\s+/g, "")}@example.com</p>
    <p><strong>Phone:</strong> (123) 456-789${selectedAccount.id}</p>
  `;

  const statusSection = document.querySelector("section:nth-of-type(2)");
  statusSection.innerHTML = `
    <h2>Status</h2>
    <p class="status ${selectedAccount.status.toLowerCase()}">${
    selectedAccount.status
  }</p>
  `;

  const issuesSection = document.querySelector("section:nth-of-type(3)");
  const notesData = JSON.parse(localStorage.getItem("notes-data")) || {};

  const existingNotes = notesData[selectedAccount.id] || [];
  const notesList = existingNotes.map((note) => `<li>${note}</li>`).join("");

  issuesSection.innerHTML = `
    <h2>Issues Raised</h2>
    ${
      selectedAccount.status.toLowerCase() === "active" ||
      selectedAccount.status.toLowerCase() === "vip"
        ? `<p>No issues raised for this account.</p>`
        : selectedAccount.status.toLowerCase() === "loyal"
        ? `<ul>
            <li>Issue 1: Billing discrepancy for ${selectedAccount.accountName}</li>
            <li>Issue 2: Support ticket pending for ${selectedAccount.accountName}</li>
          </ul>`
        : `<ul>
            <li>Issue 1: No support team provided for ${selectedAccount.accountName}</li>
          </ul>`
    }
    <div class="notes-box">
      <label for="notes-box">Notes</label>
      <ul id="notes">${notesList}</ul>
      <textarea id="notes-box" placeholder="Add your notes here..."></textarea><br>
      <button onclick="submitNotes()">Submit</button>
      <button onclick="goback()">Back</button>
    </div>
  `;
} else {
  document.querySelector(
    "main"
  ).innerHTML = `<p>No account data available. Return to the <a href="/accounts-home-page/index.html">Accounts List</a>.</p>`;
}

function submitNotes() {
  const notesBox = document.getElementById("notes-box");
  const newNote = notesBox.value.trim();
  if (newNote) {
    const notesData = JSON.parse(localStorage.getItem("notes-data")) || {};
    const accountNotes = notesData[selectedAccount.id] || [];
    accountNotes.push(newNote);
    notesData[selectedAccount.id] = accountNotes;
    localStorage.setItem("notes-data", JSON.stringify(notesData));
    document.getElementById("notes").innerHTML += `<li>${newNote}</li>`;
    notesBox.value = "";
  }
}

function goback() {
  window.history.back();
}
