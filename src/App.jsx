
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import './App.css'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [inputTask, setInputTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!inputTask.trim()) return
    setTasks([...tasks, { id: Date.now(), text: inputTask }])
    setInputTask('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ))
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            {editingId === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-buttons">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Tasks</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}
