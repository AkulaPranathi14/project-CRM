localStorage.setItem(
  "users",
  JSON.stringify([
    { email: "abc@example.com", password: "password123" },
    { email: "john.doe@example.com", password: "12345678" },
  ])
);

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isUserValid = users.some(
    (user) => user.email === email && user.password === password
  );

  if (isUserValid) {
    window.location.href = "../home-page/index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
