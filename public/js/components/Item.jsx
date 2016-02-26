'use strict';

import React from 'react';
const moment = require('moment');

export default React.createClass({
  displayName: 'Item',
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
