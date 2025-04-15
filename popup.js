document.getElementById("showsLogs").addEventListener("click", () => {
    chrome.storage.local.get("logs", data => {
      const list = document.getElementById("logList");
      list.innerHTML = "";
      (data.logs || []).forEach(log => {
        const item = document.createElement("li");
        item.textContent = `${log.e} at ${new Date(log.timestamp).toLocaleTimeString()}`;
        list.appendChild(item);
      });
    });
  });

  document.getElementById("exportLogs").addEventListener("click", () => {
    chrome.storage.local.get("logs", data => {
        const logs = data.logs || [];

        if (logs.length === 0) {
            alert("No logs to export!");
            return;
        }

        const header = ["e", "typingSpeed", "problem", "timestamp"];
        const rows = logs.map(log =>
            header.map(field => {
                if (field === "timestamp") return new Date(log[field]).toLocaleString();
                return log[field] ?? "";
            }).join(",")
        );

        const csvContent = [header.join(","), ...rows].join("\n");

        const file = new File([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(file);

        const a = document.createElement("a");
        a.href = url;
        a.download = "ai_cheating_logs.csv";
        a.click();

        URL.revokeObjectURL(url);
    });
});