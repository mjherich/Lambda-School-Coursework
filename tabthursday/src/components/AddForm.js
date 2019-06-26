import React from 'react';
import { connect } from 'react-redux';
import { addTab } from '../actions';

class AddForm extends React.Component {
  state = {
    tab: {
      title: '',
      description: '',
      url: '',
      category: this.props.location.state.category
    }
  };

  handleChanges = e => {
    this.setState({
      tab: {
        ...this.state.tab,
        [e.target.name]: e.target.value
      }
    });
  };

  addTab = e => {
    e.preventDefault();
    this.props.addTab(this.state.tab).then(res => {
      res && this.props.history.push('/home');
    });
  };

  render() {
    // console.log(this.props.location.state);
    return (
      <div className='add-form'>
        <form onSubmit={this.addTab}>
          <h1>Add Tab</h1>
          <input
            type='text'
            placeholder='Enter Title'
            value={this.state.tab.title}
            onChange={this.handleChanges}
            name='title'
          />
          <input
            type='text'
            placeholder='Enter Description'
            value={this.state.tab.description}
            onChange={this.handleChanges}
            name='description'
          />
          <input
            type='text'
            placeholder='Enter URL'
            value={this.state.tab.url}
            onChange={this.handleChanges}
            name='url'
          />
          <select
            value={this.state.tab.category}
            onChange={this.handleChanges}
            name='category'
          >
            {this.props.categories.map(category => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addTab }
)(AddForm);
