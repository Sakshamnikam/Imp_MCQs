fetch("mcqs.csv")
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n");
    rows.shift(); // remove header

    const mcqs = rows.map(row => {
      const cols = row.split(",");

      return {
        id: cols[0],
        question: cols[1],
        options: [cols[2], cols[3], cols[4], cols[5]],
        answer: cols[6].trim()
      };
    });

    renderNotes(mcqs);
  });

function renderNotes(mcqs) {
  const container = document.getElementById("mcq-container");
  container.innerHTML = "";

  mcqs.forEach((mcq, index) => {
    let card = `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h6 class="fw-bold">${index + 1}. ${mcq.question}</h6>
    `;

    mcq.options.forEach((opt, i) => {
      const letter = ["A", "B", "C", "D"][i];
      const isCorrect = letter === mcq.answer;

      card += `
        <div class="form-check">
          <input class="form-check-input" type="radio" disabled ${isCorrect ? "checked" : ""}>
          <label class="form-check-label ${isCorrect ? "text-success fw-semibold" : ""}">
            ${letter}) ${opt}
          </label>
        </div>
      `;
    });

    card += `
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}
