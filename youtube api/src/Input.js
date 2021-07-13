import React from 'react';

class Input extends React.Component {
    state = { value: [] };

    render() {
        return (
            <form onSubmit={(event) => {
                this.props.search(this.state.value);
                event.preventDefault();
            }}
                className='ui fluid icon input'>
                <input type={this.props.type} name='search'
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    autoComplete='off' />
                <button type="submit" className='ui inverted olive button'>search</button>
            </form>);
    }
}
export default Input;