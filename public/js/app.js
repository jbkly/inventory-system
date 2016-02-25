

const InventorySystem = React.createClass({
  loadInventory: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: reply => this.setState({data: reply.data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  },
  handleAddToInventory: function(item) {
    // optimistically update UI before hearing back from server
    let items = this.state.data;
    let updatedItems = Object.assign(items);
    updatedItems[item.label] = item;
    this.setState({data: updatedItems});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: reply => this.setState({data: reply.data}),
      error: (xhr, status, err) => {
        this.setState({data: items});
        console.errer(this.props.url, status, err.toString())
      }
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadInventory();
    setInterval(this.loadInventory, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className='inventory'>
        <h1>Inventory System</h1>
        <ItemList data={this.state.data} />
        <AddItemForm onAddItem={this.handleAddToInventory} />
      </div>
    );
  }
});

const ItemList = React.createClass({
  render: function() {
    let itemList = Array.from(Object.keys(this.props.data), key => {
      let item = this.props.data[key];
      return (
        <Item label={item.label} type={item.type} expiration={item.expiration} key={item.label}>{item.label}</Item>
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

const Item = React.createClass({
  render: function() {
    let displayExpiration = moment(this.props.expiration).fromNow();
    let expires = this.props.expiration > Date.now() ? 'Expires:' : 'Expired:';
    return (
      <div className='item'>
        <h2 className='itemLabel'>{this.props.label}</h2>
        <p className='itemType'>Type: {this.props.type}</p>
        <p className='itemExpiration'>{expires} {displayExpiration}</p>
      </div>
    );
  }
});

ReactDOM.render(
  <InventorySystem url='/api/items' pollInterval={2000} />,
  document.getElementById('content')
);
