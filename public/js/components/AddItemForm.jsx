'use strict';

import React from 'react';
import TimePicker from './TimePicker';

export default React.createClass({
  displayName: 'AddItemForm',
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
        <TimePicker
          onSetExpiration={this.handleExpirationChange}
          default={this.state.expiration}
        />
        <input type='submit' value='Add Item' />
      </form>
    );
  }
});
