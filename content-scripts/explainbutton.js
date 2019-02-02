// This regex extracts the number from the URL, and only returns a
// match for valid pages on the site.
let extractNumber = /^https?:\/\/(?:www\.)?xkcd.com\/(?:(\d*)\/?)?$/i;
let match = extractNumber.exec(window.location);

if (match) {
  // Load the option to replace, then replace it.
  browser.storage.local.get(["replaced_button", "open_in_new_tab"]).then((res) => {

    // If the thing isn't set, then default to zero,
    // and replace first item.
    let replaceIndex = 0;

    if (res.replaced_button) {
      replaceIndex = parseInt(res.replaced_button);
    }

    // Select the appropriate nav button in the top-left div.
    let navButton = document.querySelectorAll("div#topLeft li")[replaceIndex];
    let buttonHref = navButton.firstChild;

    // Extract the comic number from the match. If no number in the URL
    // then this will be falsy, so we can easily handle that case.
    let comicNumber = match[1];

    if (comicNumber) {
      buttonHref.href = "https://explainxkcd.com/" + comicNumber + "/";
    } else {
      buttonHref.href = "https://explainxkcd.com/";
    }

    buttonHref.text = "Explain";
    
    if (res.open_in_new_tab) {
        buttonHref.target = "_blank";
    } else {
        buttonHref.target = "_self";
    }
  });
}
