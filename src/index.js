import React from 'react';
import ReactDOM from 'react-dom';

class UserInputForm extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit}>
                <input type="text" onChange={this.props.onChange}
                       name="todoText" placeholder="Add new item..." value={this.props.todoText}
                />
                <button type="submit" name="submit">Add</button>
            </form>
        );
    }
}
class TodoItem extends React.Component {
    render () {
        return (
            <li data-id={this.props.id}>{this.props.text}</li>
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
        const filterText = this.props.todoText;
        this.props.todos.forEach((item, index) => {
            if (item.text.indexOf(filterText) === -1) {
                return;
            }
            itemList.push(<TodoItem key={index} id={index} text={item.text}/>)
        });
        return itemList;
    }
    render () {
        const items = this.renderEachItem();

        return (
            <ul onClick={this.props.onClick}>
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
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete (event) {
        const todoItemId = event.target.getAttribute('data-id');
        this.props.todos.splice(todoItemId, 1);
        this.setState(this.state);
    }
    handleChange (event) {
       const userText = event.target.value;
       this.setState({todoText: userText});
    }
    handleSubmit (event) {
        event.preventDefault();
        const todoToSave = this.state.todoText;
        if (todoToSave.trim() === '' || todoToSave === null || todoToSave === undefined) {
            return;
        }
        this.props.todos.push(
            {text: todoToSave}
        );
        this.setState((prevState, props) => {
           return {todoText: ''};
        });

    }

    render () {
        return (
            <div id="todo-table">
                <UserInputForm onSubmit={this.handleSubmit} onChange={this.handleChange} todoText={this.state.todoText}/>
                <ListTodo todoText={this.state.todoText} onClick={this.handleDelete} todos={this.props.todos}/>
            </div>
        );
    }

}
const TODOS = [
    {text: "finish the excercise"}, {text: "drinking another cup of coffee"}, {text: "read English book"},
    {text: "go bath"}, {text: "drink coffee right now"}, {text: "read English book"}
];


ReactDOM.render(<TodoTable todos={TODOS} />, document.getElementById('root'));
