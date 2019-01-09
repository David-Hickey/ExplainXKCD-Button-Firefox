// This regex extracts the number from the URL, and only returns a
// match for valid pages on the site.
let extractNumber = /^https?:\/\/(?:www\.)?xkcd.com\/(?:(\d*)\/?)?$/i;
let match = extractNumber.exec(window.location);

if (match) {
  // Select the fourth button in the top-left div, which is the
  // Store button.
  let storeButton = document.querySelectorAll("div#topLeft li")[3];
  let buttonHref = storeButton.firstChild;

  // Extract the comic number from the match. If no number in the URL
  // then this will be falsy, so we can easily handle that case.
  let comicNumber = match[1];

  if (comicNumber) {
    buttonHref.href = "https://explainxkcd.com/" + comicNumber + "/";
  } else {
    buttonHref.href = "https://explainxkcd.com/";
  }

  buttonHref.text = "Explain";
}
