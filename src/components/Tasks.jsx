import Task from "./Task";
function Tasks({ tasks, deletetask, toggle }) {
  return (
    <div>
      {tasks.map((task) => (
        // map performs ops on each item in array
        <Task
          key={task.id}
          task={task}
          deletetask={deletetask}
          toggle={toggle}
        />
      ))}
    </div>
  );
}

export default Tasks;
