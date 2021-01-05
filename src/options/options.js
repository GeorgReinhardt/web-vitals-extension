const optionsOverlayNode = document.getElementById('overlay');
const optionsSaveBtn = document.getElementById('save');
const optionsStatus = document.getElementById('status');


// Edit 1 ____________________________________________________________________________________
function showAll_options() {
  chrome.storage.local.get(null, function (data) {
    console.log(data);
    dataOutput = [];
    for (result in data) {
      if (typeof (data[result]) === 'object' && data[result] !== null) {
        var o = {
          CLS: data[result].cls.value,
          FID: data[result].fid.value,
          LCP: data[result].lcp.value,
          FCP: data[result].fcp.value,
          pId: data[result].pId,
          URL: data[result].location.url,
          date: new Date(parseInt([result]))
        };
        dataOutput.push(o);
      }

    }
    document.getElementById("resultText").value = JSON.stringify(dataOutput);
    console.log(dataOutput);
  });
}

function setId_options() {
  chrome.storage.local.get(null, function (data) {
    var pIdPrompt = prompt("Please enter the participants Id:", "");
    if (pIdPrompt == null || pIdPrompt == "") {

    } else {
      for (result in data) {
        if (data[result].pId == null && data[result]) {
          data[result].pId = pIdPrompt;
          chrome.storage.local.set({
            [result]: data[result]
          });
        }

      }
    }
  });
}
function clearAll_options() {
  if (confirm("Are you sure?")) {
      document.getElementById("resultText").value = "";
      chrome.storage.local.clear(function () {
          var error = chrome.runtime.lastError;
          if (error) {
              console.error(error);
          }
      });
  } else {
  }
}
// Edit 1 ____________________________________________________________________________________
/**
 * Save options to Chrome storage
 */
function saveOptions() {
  chrome.storage.sync.set({
    enableOverlay: optionsOverlayNode.checked,
  }, () => {
    // Update status to let user know options were saved.
    optionsStatus.textContent = 'Options saved.';
    setTimeout(() => {
      optionsStatus.textContent = '';
    }, 750);
  });
}

/**
 * Restores select box and checkbox state using the
 * preferences stored in chrome.storage
 */
function restoreOptions() {
  chrome.storage.sync.get({
    enableOverlay: false,
  }, ({enableOverlay}) => {
    optionsOverlayNode.checked = enableOverlay;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
optionsSaveBtn.addEventListener('click', saveOptions);

// Edit 2 ____________________________________________________________________________________
document.getElementById('showAll').addEventListener('click',
  showAll_options);
document.getElementById('setId').addEventListener('click',
  setId_options);
  document.getElementById('clearAll').addEventListener('click',
    clearAll_options);
// Edit 2 ____________________________________________________________________________________