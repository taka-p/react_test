var TodoApp = React.createClass({
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
            <div className="todoApp">
                <TodoForm onAdd={this.onAdd}/>
                <TodoList todos={this.state.todos} onDelete={this.onDelete}/>
            </div>
        );
    }
});

var TodoList = React.createClass({
    _onDelete: function(i){
        this.props.onDelete(i);
    },
    render: function () {
        return (
            <ul>
                {
                    this.props.todos.map(function (todo, i) {
                        if (todo.status == 0) {
                            return (
                                <li key={i}>
                                    <input type="checkbox"
                                           onClick={this._onDelete.bind(this, i)}/>
                                    {todo.item}
                                </li>
                            )
                        } else {
                            return <li key={i}><s>{todo.item}</s></li>
                        }
                    }, this)
                }
            </ul>
        );
    }
});

var TodoForm = React.createClass({
    getInitialState: function () {
        return {
            value: ""
        }
    },

    _onAdd: function () {
        var newTodo = this.refs.inputText.value;
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
            <div className="TodoCreator">
                <input type="text" value={this.state.value} ref="inputText"
                       placeholder="Input your new todo" onChange={this._onChange}/>
                <button onClick={this._onAdd}>Add</button>
            </div>
        );
    }
});

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('myApp')
);

