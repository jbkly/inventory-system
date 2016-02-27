
export function saveToLocalStorage(key, value) {
  if (!storageAvailable('localStorage')) return false;
  localStorage[key] = JSON.stringify(value);
}

export function getFromLocalStorage(key) {
  if (!storageAvailable('localStorage')) return false;
  if (!localStorage[key]) return null;
  return JSON.parse(localStorage[key]);
}

// check if localStorage is supported and available
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  try {
    let storage = window[type],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}
