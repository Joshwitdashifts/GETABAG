document.addEventListener("DOMContentLoaded", () => {
    const startBotBtn = document.getElementById("startBot");
    const stopBotBtn = document.getElementById("stopBot");
    const botStatus = document.getElementById("botStatus");
    const tradeLog = document.getElementById("tradeLog");

    startBotBtn.addEventListener("click", () => {
        botStatus.textContent = "Active";
        botStatus.style.color = "green";
        tradeLog.innerHTML += `<p>Bot started at ${new Date().toLocaleTimeString()}</p>`;
    });

    stopBotBtn.addEventListener("click", () => {
        botStatus.textContent = "Inactive";
        botStatus.style.color = "red";
        tradeLog.innerHTML += `<p>Bot stopped at ${new Date().toLocaleTimeString()}</p>`;
    });
});
