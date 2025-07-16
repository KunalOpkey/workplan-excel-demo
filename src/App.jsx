import { useState } from "react";



export default function App() {

  const [selectedIndex, setSelectedIndex] = useState(null);



  const [tasks, setTasks] = useState([

    { id: 1, name: "Task 1", assigned: "Kunal", start: "2025-07-16", finish: "2025-07-21", level: 0 },

    { id: 2, name: "Subtask 1", assigned: "QA Team", start: "2025-07-18", finish: "2025-07-19", level: 1 },

    { id: 3, name: "Subtask 2", assigned: "Dev Team", start: "2025-07-19", finish: "2025-07-20", level: 1 },

    { id: 4, name: "Task 2", assigned: "Manager", start: "2025-07-22", finish: "2025-07-25", level: 0 }

  ]);



  const indentTask = (index) => {

    if (index === 0) return; // first task can't be indented

    let updated = [...tasks];

    updated[index].level = Math.min(updated[index].level + 1, updated[index - 1].level + 1);

    setTasks(updated);

  };



  const outdentTask = (index) => {

    let updated = [...tasks];

    updated[index].level = Math.max(updated[index].level - 1, 0);

    setTasks(updated);

  };



  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Excel View</h1>



      {/* Buttons */}

      <div className="flex gap-3 mb-4">

        <button

          onClick={() => indentTask(selectedIndex)}

          disabled={selectedIndex === null}

          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"

        >

          Indent →

        </button>

        <button

          onClick={() => outdentTask(selectedIndex)}

          disabled={selectedIndex === null}

          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"

        >

          Outdent ←

        </button>

      </div>



      {/* Excel-like Grid */}

      <div className="border rounded shadow-sm">

        {/* Header Row */}

        <div className="grid grid-cols-4 bg-gray-200 font-semibold p-2 border-b">

          <div>Task Name</div>

          <div>Assigned To</div>

          <div>Start</div>

          <div>Finish</div>

        </div>



        {/* Data Rows */}

        {tasks.map((task, idx) => (

          <div

           key={task.id}

            className={`grid grid-cols-4 items-center p-2 border-b cursor-pointer ${

              selectedIndex === idx ? "bg-blue-100" : "hover:bg-gray-100"

            }`}

            onClick={() => setSelectedIndex(idx)}

          >

            <div style={{ paddingLeft: `${task.level * 20}px` }}>

            {task.name}

            </div>

            <div>{task.assigned}</div>

            <div>{task.start}</div>

            <div>{task.finish}</div>

          </div>

        ))}

      </div>

    </div>

  );

}
