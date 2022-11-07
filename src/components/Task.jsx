// we can use icons as react components
import { FaTimes } from "react-icons/fa";
function Task({ task, deletetask, toggle }) {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => deletetask(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
}

export default Task;
