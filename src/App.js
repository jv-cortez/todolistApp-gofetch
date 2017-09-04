import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

// const appContainer = document.querySelector('#appContainer');

const AppHead = ( {addTask} ) => {
  let input;

  return (
    <div className='input-group'>
      <input ref={node => {
        input = node;
      }} className='form-control' type='text' />
      <button onClick={ () => {
        addTask(input.value);
        input.value = '';
      }} className='input-group-addon'>
      Add task
      </button>
    </div>
  );
};

const Task = ( {className, task, remove, complete} ) => {
  return (
    <li className={className}>{task.text} 
      <span className='fa fa-trash-o task-remover pull-right' 
        onClick={ () => { remove(task.id) }}>
      </span>
      <span className='fa fa-check task-complete pull-right'
        onClick={ () => { complete(task.id) }}>
      </span>
    </li>
  );
};

const AppList = ( {className, tasks, remove, complete} ) => {
  const taskNode = tasks.map((task) => {
    return (<Task className={className} task={task} key={task.id} remove={remove} complete={complete} />)
  });
  return (<ul className='task-list'>{taskNode}</ul>);
}

window.id = 0;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      taskCompleted: false
    }
  }
  
  addTask(val) {
    const task = {
      text: val,
      id: window.id++
    }
    if (val.length > 0) this.state.data.push(task);
    this.setState({
      data: this.state.data
    });
  }
  
  removeTask(id) {
    // eslint-disable-next-line
    const taskCollection = this.state.data.filter((task) => {
      if (task.id !== id) return task;
    });
    this.setState({
      data: taskCollection 
    });
  }
  
  completeTask(id) {
    // eslint-disable-next-line
    const taskCollection = this.state.data.filter((task) => {
      if (task.id !== id) return task;
    });
    this.setState({
      taskCompleted: !this.state.taskCompleted
    });
  }
  render() {
    // eslint-disable-next-line
    const className = this.state.taskCompleted ? 'task-item-complete' : 'task-item';
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Victor's to do App</h2>
        </div>
        <p className="App-intro">
          <AppHead addTask ={this.addTask.bind (this) } />

          <AppList
            className={className}
            tasks={this.state.data}
            remove={this.removeTask.bind (this) } 
            complete={this.completeTask.bind (this) }/>
        </p>
      </div>
    );
  }
}

export default App;
