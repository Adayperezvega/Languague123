const totalSentenceNumber = 15; // replace with the total number of sentences

const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
];
console.log("username:", username);
console.log("password:", password);

document.querySelector("#toggle-login-form").addEventListener("click", function () {
    document.querySelector(".login-form-container").style.display = "flex";
    document.querySelector("#toggle-login-form").style.display = "none";
});

document.querySelector("#login-form form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    // Validate the user's credentials
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert("Invalid username or password");
        return;
    }

    console.log("Valid user:", user);

    // Retrieve the user's progress data from localStorage
    const progressString = localStorage.getItem(username);
    const progress = progressString ? JSON.parse(progressString) : { score: 0, usedSentences: [] };

    // Redirect to the appropriate exercise page based on progress
    if (progress.usedSentences.length < totalSentenceNumber) {
        window.location = "/A1/A1.html";
    } else {
        window.location = "/A1/A1dashboard.html";
    }
});

