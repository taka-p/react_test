var TodoApp = React.createClass({displayName: "TodoApp",
    getInitialState: function () {
        return {
            todos: [{item: "sample", status: 0}]
        }
    },
    onAdd: function (newTodo) {
        this.setState({
            todos: this.state.todos.concat({item: newTodo, status: 0})
        });
    },
    onDelete: function(i){
        var targetTodo = this.state.todos[i];
        targetTodo.status = 1;
        this.setState({
            todos: this.state.todos
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "todoApp"}, 
                React.createElement(TodoForm, null), 
                React.createElement(TodoList, {todos: this.state.todos, onDelete: this.onDelete})
            )
        );
    }
});

var TodoList = React.createClass({displayName: "TodoList",
    _onDelete: function(i){
        this.props.onDelete(i);
    },
    render: function () {
        return (
            React.createElement("ul", null, 
                
                    this.props.todos.map(function (todo, i) {
                        if (todo.status == 0) {
                            return (
                                React.createElement("li", {key: i}, 
                                    React.createElement("input", {type: "checkbox", 
                                           onClick: this._onDelete.bind(this, i)}), 
                                    todo.item
                                )
                            )
                        } else {
                            return React.createElement("li", {key: i}, React.createElement("s", null, todo.item))
                        }
                    }, this)
                
            )
        );
    }
});

var TodoForm = React.createClass({displayName: "TodoForm",
    getInitialState: function () {
        return {
            value: ""
        }
    },

    _onAdd: function () {
        var newTodo = this.refs.inputText.getDOMNode().value;
        this.props.onAdd(newTodo);
        this.setState({value: ""});
    },

    _onChange: function (e) {
        this.setState({
            value: e.target.value
        });
    },

    render: function () {
        return (
            React.createElement("div", {className: "TodoCreator"}, 
                React.createElement("input", {type: "text", value: this.state.value, ref: "inputText", 
                       placeholder: "Input your new todo", onChange: this._onChange}), 
                React.createElement("button", {onClick: this._onAdd}, "Add")
            )
        );
    }
});

ReactDOM.render(
    React.createElement(TodoApp, null),
    document.getElementById('myApp')
);
