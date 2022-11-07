import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";
import AddTask from "./components/AddTask";
function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTasks, setShowAddTasks] = useState(false);

  // get data/tasks when this Component loads
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  // fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  //fetch a single task from server wrt to id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  //toggle add-button functionality
  const toggleAdd = () => {
    setShowAddTasks(!showAddTasks);
  };
  // Add Task
  const addTask = async (task) => {
    // add task on the server
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    // in response we'll get the task back but we'll also have a unique id attached to it
    const data = await res.json();
    setTasks([...tasks, data]);
    // FOR UI ONLY  Only in UI we have to maually assign a unique id in server it auto assigns unique id to each task
    //add random id to the new task
    // const id = Math.floor(Math.random() * 1000);
    // const newTask = { ...task, id };
    // while adding a new task get hold of previous items of array
    // setTasks((prevTasks) => {
    //   return [...prevTasks, newTask];
    // });
  };
  // delete task
  const deleteTask = async (id) => {
    // delete from the server
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    // ----------------------------------
    // map,filter or reduce do not update the original array rather they perform operation on each element on array and return item according to the condition
    // here below filter returns back the items according to condition and those items are catched by setTasks so they are stored back in tasks variable or state
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // Toggle Reminder
  const toggleReminder = async (id) => {
    // update the task in server
    // get the task
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    //update the task
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updTask),
    });

    // update in UI
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" toggle={toggleAdd} show={showAddTasks} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTasks ? <AddTask addtask={addTask} /> : ""}

                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    deletetask={deleteTask}
                    toggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
