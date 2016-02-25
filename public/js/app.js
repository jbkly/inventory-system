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
    return {label: '', type: '', expiration: ''};
  },
  handleLabelChange: function(e) {
    this.setState({label: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let label = this.state.label.trim();
    let type = this.state.type.trim();
    if (!type || !label) return;
    this.props.onAddItem({label, type});
    this.setState({label: '', type: '', expiration: ''});
  },
  render: function() {
    return (
      <form className='addItemForm' onSubmit={this.handleSubmit}>
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
        <input type='submit' value='Post' />
      </form>
    );
  }
});

const Item = React.createClass({
  render: function() {
    return (
      <div className='item'>
        <h2 className='itemLabel'>{this.props.label}</h2>
        <p className='itemType'>Type: {this.props.type}</p>
        <p className='itemExpiration'>Expires: {this.props.expiration}</p>
      </div>
    );
  }
});

ReactDOM.render(
  <InventorySystem url='/api/items' pollInterval={2000} />,
  document.getElementById('content')
);
