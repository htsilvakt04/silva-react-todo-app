import React from 'react';
import ReactDOM from 'react-dom';

class UserInputForm extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit}>
                <input type="text" onChange={this.props.onChange} name="todoText" placeholder="Add new item..." value={this.props.todoText} />
                <button type="submit" name="submit">Add</button>
            </form>
        );
    }
}
class TodoItem extends React.Component {
    render () {
        return (
            <li>{this.props.text}</li>
        )
    }
}
class ListTodo extends React.Component {
    constructor(props) {
        super(props);
        this.renderEachItem = this.renderEachItem.bind(this);
    }
    renderEachItem () {
        const itemList = [];
        this.props.todos.forEach((item, index) => {
            itemList.push(<TodoItem key={index} text={item.text}/>)
        });
        return itemList;
    }
    render () {
        const items = this.renderEachItem();

        return (
            <ul>
                {items}
            </ul>
        );
    }
}
class TodoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
       const userText = event.target.value;
       this.setState({todoText: userText});
    }

    handleSubmit (event) {
        event.preventDefault();
        alert('submit');
    }

    render () {
        return (
            <div id="todo-table">
                <UserInputForm onSubmit={this.handleSubmit} onChange={this.handleChange} todoText={this.state.todoText}/>
                <ListTodo todos={this.props.todos}/>
            </div>
        );
    }

}
const TODOS = [
    {text: "finish the excercise"}, {text: "drinking another cup of coffee"}, {text: "read English book"}
];


ReactDOM.render(<TodoTable todos={TODOS} />, document.getElementById('root'));
