'use strict';

import React from 'react';
import ClassNames from 'classnames';
import TimeAgo from 'react-timeago';
const toastr = require('toastr');

export default React.createClass({
  displayName: 'Item',
  getInitialState: function() {
    let expired = this.props.expiration <= Date.now();
    return { expired: expired };
  },
  checkTimeToExpire: function(expiration) {
    // this method will be called once, when component mounts
    if (this.state.expired) return;
    let secsLeft = Math.round((expiration - Date.now())/1000,0);

    // wait till expiration is < 1min away, then call expiring handler
    if (secsLeft <= 60) {
      this.notifyExpiring(this.props.expiration);
    } else {
      this.waitTimer = setTimeout(() => {
        this.notifyExpiring(this.props.expiration);
      }, (secsLeft - 60) * 1000);
    }
  },
  notifyExpiring: function(expiration) {
    // Once expiration is near, start checking every second to notify user
    this.expiringChecker = setInterval(() => {
      let secsLeft = Math.round((expiration - Date.now())/1000,0);
      if (secsLeft <= 0) {
        this.setState({ expired: true });
        toastr.warning(`${this.props.label} has expired`);
        clearInterval(this.expiringChecker);
      }
      this.forceUpdate();
    }, 1000);
  },
  componentDidMount: function() {
    this.checkTimeToExpire(this.props.expiration);
  },
  componentWillUnmount: function() {
    clearInterval(this.expiringChecker);
    clearTimeout(this.waitTimer);
  },
  render: function() {
    let expires = this.state.expired ? 'Expired: ' : 'Expires: ';
    let itemClass = ClassNames({
      'item': true,
      'expired': this.state.expired
    })
    return (
      <div className={itemClass}>
        <h2 className='itemLabel'>{this.props.label}</h2>
        <p className='itemType'>Type: {this.props.type}</p>
        <p className='itemExpiration'>{expires}
          <TimeAgo date={this.props.expiration} />
        </p>
        <button className="removeButton" onClick={this.props.handleRemove}>Remove Item</button>
      </div>
    );
  }
});
