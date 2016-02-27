'use strict';

import React from 'react';
import { render as renderDOM } from 'react-dom';

import Item from './components/Item';
import ItemList from './components/ItemList';
import TimePicker from './components/TimePicker';
import AddItemForm from './components/AddItemForm';
import InventorySystem from './components/InventorySystem';

// TODO: notification on removing an item (toastr?)

// TODO: notification on item expiration

// TODO: handle removing an item by label (autocomplete?)

// TODO: validate unique label when adding item

// TODO: more tests (ui functionality & api, e2e)

renderDOM(
  <InventorySystem url='//localhost:3000/api/items' pollInterval={2000} />,
  document.getElementById('content')
);
