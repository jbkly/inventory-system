'use strict';

import React from 'react';
import humanizeDuration from 'humanize-duration';

export default React.createClass({
  displayName: 'TimePicker',
  getInitialState: function() {
    const min = 60000;
    const hour = 60*min;
    const day = 24*hour;
    return {
      expirations: [
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
      ]
    };
  },
  timeChange: function(e) {
    let val = parseInt(e.target.value, 10);
    this.props.onSetExpiration(val);
  },
  render: function() {
    let expireOpts = this.state.expirations.map((opt, i) => {
      return (
        <option value={opt} key={i}>
          {humanizeDuration(opt,{round: true})}
        </option>
      );
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
