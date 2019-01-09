
function saveOptions(e) {
  browser.storage.local.set({
    "replaced_button": getSelectedRadioValue()
  });
  e.preventDefault();
}


function getSelectedRadioValue() {
  let radios = document.getElementsByName("replaced_button_opt");

  for (let i = 0; i < radios.length; ++i) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }

  throw "this should never happen";
}


function setSelectedRadioValue(v) {
  let radios = document.getElementsByName("replaced_button_opt");

  for (let i = 0; i < radios.length; ++i) {
    radios[i].checked = (radios[i].value == v);
  }
}


function restoreOptions() {
  var storageItem = browser.storage.local.get('replaced_button');
  storageItem.then((res) => {
    if (!res.replaced_button) {
      browser.storage.local.set({
        "replaced_button": "0"
      });

      setSelectedRadioValue("0");
    } else {
      setSelectedRadioValue(res.replaced_button);
    }
  });
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("change", saveOptions);
