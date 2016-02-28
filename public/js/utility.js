
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

export function shuffleArray(array) {
  let i = 0,
      j = 0,
      temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
}

export function getExpirationTimes() {
  const min = 60000;
  const hour = 60*min;
  const day = 24*hour;
  return [
    10000,
    min,
    2*min,
    5*min,
    15*min,
    hour,
    12*hour,
    day,
    7*day,
    14*day
  ];
}

export function getSampleItems() {
  return [
    { label: 'taco',     type: 'mexican' },
    { label: 'pancake',  type: 'breakfast' },
    { label: 'burrito',  type: 'mexican' },
    { label: 'waffle',   type: 'belgian' },
    { label: 'chalupa',  type: 'taco bell' },
    { label: 'pizza',    type: 'italian' },
    { label: 'cake',     type: 'dessert' },
    { label: 'pie',      type: 'dessert' },
    { label: 'cookie',   type: 'dessert' },
    { label: 'cupcake',  type: 'dessert' },
    { label: 'apple',    type: 'fruit' },
    { label: 'banana',   type: 'fruit' },
    { label: 'eggplant', type: 'vegetable' },
    { label: 'quiche',   type: 'uhh' },
    { label: 'carrot',   type: 'vegetable' },
    { label: 'parsley',  type: 'inedible' },
    { label: 'spinach',  type: 'vegetable' },
    { label: 'cheese',   type: 'dairy' },
    { label: 'eggs',     type: 'dairy' },
    { label: 'crackers', type: 'snack' },
    { label: 'beer',     type: 'drink' },
    { label: 'wine',     type: 'drink' },
    { label: 'whiskey',  type: 'liquor' },
    { label: 'orange',   type: 'fruit' },
    { label: 'pear',     type: 'fruit' },
    { label: 'mango',    type: 'fruit' },
    { label: 'durian',   type: 'smelly fruit' },
    { label: 'burger',   type: 'murican' },
    { label: 'bacon',    type: 'meat' },
    { label: 'ham',      type: 'meat' },
    { label: 'salami',   type: 'meat' },
    { label: 'broccoli', type: 'vegetable' },
    { label: 'tomato',   type: 'fruit' }
  ];
}
