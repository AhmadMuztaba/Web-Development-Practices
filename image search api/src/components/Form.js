import React from 'react';

class Input extends React.Component {
    state = { term: '' }
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (<form className="ui segment" onSubmit={this.onFormSubmit}>
            <div className="ui inverted input">
                <input
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    value={this.state.term}
                    onChange={(event) => { this.setState({ term: event.target.value }) }}
                />
                <br></br>
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        </form>
        );
    }
}


export default Input;
