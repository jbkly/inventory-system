'use strict';

import React from 'react';
import { render as renderDOM } from 'react-dom';

import Item from './components/Item';
import ItemList from './components/ItemList';
import TimePicker from './components/TimePicker';
import AddItemForm from './components/AddItemForm';
import InventorySystem from './components/InventorySystem';

// TODO: more tests (ui functionality & api, e2e)

// TODO: undo recent removals

// TODO: auto focus on label input additemform

// minify and deploy

renderDOM(
  <InventorySystem url='/api/items' />,
  document.getElementById('content')
);

