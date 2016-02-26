import React from 'react';
import { render as renderDOM } from 'react-dom';
const moment = require('moment');

const InventorySystem = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      removedItems: getFromLocalStorage('removedItems') || []
    };
  },
  loadInventory: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  },
  handleAddToInventory: function(item) {
    // optimistically update UI before hearing back from server
    let items = this.state.items;
    let updatedItems = Object.assign(items);
    updatedItems[item.label] = item;
    this.setState({items: updatedItems});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => {
        this.setState({items});
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  removeItem: function(label) {
    // store removed item for later undo
    let items = this.state.items;
    this.state.removedItems.push(items[label]);
    saveToLocalStorage('removedItems', this.state.removedItems);

    // optimistically update UI
    let updatedItems = Object.assign(items);
    delete updatedItems[label];
    this.setState({items: updatedItems});

    $.ajax({
      url: this.props.url + '/' + encodeURIComponent(label),
      dataType: 'json',
      type: 'DELETE',
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => {
        this.setState({items});
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  componentDidMount: function() {
    this.loadInventory();
    setInterval(this.loadInventory, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className='inventory'>
        <h1>Inventory System</h1>
        <ItemList items={this.state.items} onRemove={this.removeItem} />
        <AddItemForm onAddItem={this.handleAddToInventory} />
      </div>
    );
  }
});

const ItemList = React.createClass({
  handleRemove: function(label) {
    this.props.onRemove(label);
  },
  render: function() {
    let itemList = Array.from(Object.keys(this.props.items), key => {
      let item = this.props.items[key];
      return (
        <Item
          label={item.label}
          type={item.type}
          expiration={item.expiration}
          key={item.label}
          handleRemove={this.handleRemove.bind(this, item.label)}>
          {item.label}
        </Item>
      );
    });
    return (
      <div className='itemList'>
        {itemList}
      </div>
    );
  }
});

const AddItemForm = React.createClass({
  getInitialState: function() {
    return {label: '', type: '', expiration: 5*60000};
  },
  handleLabelChange: function(e) {
    this.setState({label: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleExpirationChange: function(expiration) {
    this.setState({expiration});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let label = this.state.label.trim();
    let type = this.state.type.trim();
    let lastDur = this.state.expiration;
    let expiration = Date.now() + this.state.expiration;

    // TODO: Validate that label is unique

    if (!type || !label) return;
    this.props.onAddItem({label, type, expiration});
    this.setState({label: '', type: '', expiration: lastDur});
  },
  render: function() {
    return (
      <form className='addItemForm' onSubmit={this.handleSubmit}>
        <h2>Add Item to Inventory: </h2>
        <input
          type='text'
          placeholder='Item Label'
          value={this.state.label}
          onChange={this.handleLabelChange}
        />
        <input
          type='text'
          placeholder='Type'
          value={this.state.type}
          onChange={this.handleTypeChange}
        />
        <TimePicker onSetExpiration={this.handleExpirationChange} default={this.state.expiration} />
        <input type='submit' value='Add Item' />
      </form>
    );
  }
});

const TimePicker = React.createClass({
  timeChange: function(e) {
    let val = parseInt(e.target.value, 10);
    this.props.onSetExpiration(val);
  },
  render: function() {
    let now = Date.now(),
        min = 60000,
        hour = 60*min,
        expirations = [
          min,
          5*min,
          15*min,
          hour,
          12*hour,
          24*hour,
          7*24*hour
        ];

    let expireOpts = expirations.map((opt, i) => {
      return (<option value={opt} key={i}>{moment().add(opt).fromNow(true)}</option>);
    });

    return (
      <div className='timePicker'>
        <span>Set expiration: </span>
        <select defaultValue={this.props.default} onChange={this.timeChange}>
          {expireOpts}
        </select>
      </div>
    );
  }
});

// TODO: handle removing an item by label (autocomplete?)

// TODO: notification on removing an item (toastr?)

// TODO: notification on item expiration

// TODO: TESTS

const Item = React.createClass({
  render: function() {
    let displayExpiration = moment(this.props.expiration).fromNow();
    let expires = this.props.expiration > Date.now() ? 'Expires:' : 'Expired:';
    return (
      <div className='item'>
        <h2 className='itemLabel'>{this.props.label}</h2>
        <p className='itemType'>Type: {this.props.type}</p>
        <p className='itemExpiration'>{expires} {displayExpiration}</p>
        <button className="removeButton" onClick={this.props.handleRemove}>Remove Item</button>
      </div>
    );
  }
});

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

function saveToLocalStorage(key, value) {
  if (!storageAvailable('localStorage')) return false;
  localStorage[key] = JSON.stringify(value);
}

function getFromLocalStorage(key) {
  if (!storageAvailable('localStorage')) return false;
  if (!localStorage[key]) return null;
  return JSON.parse(localStorage[key]);
}

renderDOM(
  <InventorySystem url='//localhost:3000/api/items' pollInterval={2000} />,
  document.getElementById('content')
);
