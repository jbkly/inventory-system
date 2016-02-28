'use strict';

import React from 'react';
import humanizeDuration from 'humanize-duration';
import { getExpirationTimes } from '../utility';

export default React.createClass({
  displayName: 'TimePicker',
  getInitialState: function() {
    return { expirations: getExpirationTimes() };
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
