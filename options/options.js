
function saveOptions(e) {
  browser.storage.local.set({
    "replaced_button": getSelectedRadioValue(),
    "open_in_new_tab": document.getElementById("open_new_tab_id").checked
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
  browser.storage.local.get(["replaced_button", "open_in_new_tab"]).then((res) => {
    setSelectedRadioValue(res.replaced_button || "0");
    document.getElementById("open_new_tab_id").checked = res.open_in_new_tab || false;
  });
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("change", saveOptions);
