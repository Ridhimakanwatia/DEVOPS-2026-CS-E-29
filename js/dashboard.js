document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // DARK / LIGHT MODE
    // ==============================

    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        html.setAttribute("data-theme", "dark");
        themeToggle.textContent = "Light mode";
    } else {
        html.setAttribute("data-theme", "light");
        themeToggle.textContent = "Dark mode";
    }

    // Toggle theme
    themeToggle.addEventListener("click", function () {

        const currentTheme = html.getAttribute("data-theme");

        if (currentTheme === "light") {
            html.setAttribute("data-theme", "dark");
            themeToggle.textContent = "Light mode";

            // Save preference
            localStorage.setItem("theme", "dark");

        } else {
            html.setAttribute("data-theme", "light");
            themeToggle.textContent = "Dark mode";

            // Save preference
            localStorage.setItem("theme", "light");
        }
    });




    const actionCards = document.querySelectorAll(".action-card");

    actionCards.forEach(function (card) {

        card.addEventListener("click", function () {

            // Add a small click effect
            card.style.transform = "scale(0.98)";

            setTimeout(function () {
                card.style.transform = "";
            }, 100);

        });

    });




    const tickets = document.querySelectorAll(".mini-ticket");

    tickets.forEach(function (ticket) {

        ticket.addEventListener("click", function () {

            const laptopName = ticket.querySelector("h4").textContent;
            const details = ticket.querySelector("p").textContent;
            const percentage = ticket.querySelector(".stamp-mini").textContent;

            console.log("Selected Match:");
            console.log("Laptop:", laptopName);
            console.log("Details:", details);
            console.log("Match:", percentage);

        });

    });



    console.log("Spec Match Dashboard loaded successfully.");

});