async function runQuery() {
  const input = document.getElementById("sql-input").value;
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  resultDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  const response = await fetch("http://localhost:5000/run-sql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: input })
  });

  const data = await response.json();

  if (response.ok) {
    // Zbuduj tabelę
    const table = document.createElement("table");
    table.border = 1;
    const headerRow = document.createElement("tr");
    data.columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.rows.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    resultDiv.appendChild(table);
  } else {
    errorDiv.textContent = "Błąd: " + data.error;
  }
}
