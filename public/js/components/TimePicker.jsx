'use strict';

import React from 'react';
const moment = require('moment');

export default React.createClass({
  displayName: 'TimePicker',
  getInitialState: function() {
    const min = 60000;
    const hour = 60*min;
    return {
      expirations: [
        min,
        5*min,
        15*min,
        hour,
        12*hour,
        24*hour,
        7*24*hour
      ]
    };
  },
  timeChange: function(e) {
    let val = parseInt(e.target.value, 10);
    this.props.onSetExpiration(val);
  },
  render: function() {
    let now = Date.now();
    let expireOpts = this.state.expirations.map((opt, i) => {
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
