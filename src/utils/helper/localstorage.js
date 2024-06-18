export function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE SETTING LOCAL STORAGE ITEM',
      'KEY',
      key,
      'VALUE',
      value,
      e,
    );
  }
}

export function removeLocalStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE REMOVING LOCAL STORAGE ITEM',
      'KEY',
      key,
      e,
    );
  }
}

export function getLocalStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE GETTING LOCAL STORAGE ITEM',
      'KEY',
      key,
      e,
    );
  }
}

export function clearAll() {
  localStorage.clear();
}
