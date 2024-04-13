function identifyEntities() {
  const text = document.getElementById("inputText").value;
  const nlp = window.nlp(text);
  let taggedText = text;

  // Extract entities and highlight them
  nlp
    .people()
    .out("array")
    .forEach(function (person) {
      taggedText = taggedText.replace(
        person,
        `<span class="entity">${person}</span>`
      );
    });
  nlp
    .places()
    .out("array")
    .forEach(function (place) {
      taggedText = taggedText.replace(
        place,
        `<span class="entity">${place}</span>`
      );
    });
  nlp
    .organizations()
    .out("array")
    .forEach(function (org) {
      taggedText = taggedText.replace(
        org,
        `<span class="entity">${org}</span>`
      );
    });

  // Display the processed text
  document.getElementById("output").innerHTML = taggedText.replace(
    /\n/g,
    "<br>"
  );
}
