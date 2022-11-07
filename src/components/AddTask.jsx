import { useState } from "react";

function AddTask({ addtask }) {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onsubmit = (e) => {
    // prevent form from submittting it(here to a null location) rather to perform our custom tasks
    e.preventDefault();
    if (!text) {
      alert("Please add the task");
      return;
    }
    addtask({ text, day, reminder });
    // when we call the addtask it auto sends data as {text:'whatever' ,day:'hehe',reminder:true}
    setText("");
    setDay("");
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onsubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control ">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
}

export default AddTask;
