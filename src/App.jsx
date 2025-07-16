import { useState } from "react";



// ✅ Dummy task data

const initialTasks = [

  { id: 1, name: "Task 1", assigned: "Kunal", start: "2025-07-16", finish: "2025-07-21", level: 0 },
  { id: 2, name: "Subtask 1", assigned: "QA Team", start: "2025-07-18", finish: "2025-07-19", level: 1 },
  { id: 3, name: "Subtask 2", assigned: "Dev Team", start: "2025-07-19", finish: "2025-07-20", level: 1 },
  { id: 4, name: "Task 2", assigned: "Manager", start: "2025-07-22", finish: "2025-07-25", level: 0 }

];



export default function App() {

  // ✅ Tabs

  const tabs = [

    "Overview",
    "Dashboard",
    "List",
    "Gantt",
    "Board View",
    "Excel View",
    "Process Map",
    "Documents",
    "Test Cases",
    "Test Suites",
    "Test Run",
    "User Guide"
  ];

  const [activeTab, setActiveTab] = useState("Overview");

  // ✅ Excel View States

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tasks, setTasks] = useState(initialTasks);

  // ✅ Indent Logic

  const indentTask = (index) => {
    if (index === 0) return; // first task can't be indented
    let updated = [...tasks];
    updated[index].level = Math.min(updated[index].level + 1, updated[index - 1].level + 1);
    setTasks(updated);

  };

  // ✅ Outdent Logic

  const outdentTask = (index) => {
    let updated = [...tasks];
    updated[index].level = Math.max(updated[index].level - 1, 0);
    setTasks(updated);

  };



  // ✅ Disabling conditions

  const canIndent = () => {

    if (selectedIndex === null) return false;

    if (selectedIndex === 0) return false; // first task can't indent

    const current = tasks[selectedIndex];

    const prev = tasks[selectedIndex - 1];

    return current.level < prev.level + 1;

  };



  const canOutdent = () => {

    if (selectedIndex === null) return false;

    return tasks[selectedIndex].level > 0;

  };



  return (

    <div className="flex flex-col h-screen font-sans">

      {/* 🔹 TAB BAR */}

      <nav className="bg-gray-100 shadow p-2 flex flex-wrap gap-2">

        {tabs.map((tab) => (

          <button

            key={tab}

            onClick={() => setActiveTab(tab)}

            className={`px-4 py-2 rounded text-sm font-medium transition ${

              activeTab === tab

                ? "bg-blue-600 text-white shadow"

                : "bg-white hover:bg-gray-200 text-gray-700"

            }`}

          >

            {tab}

          </button>

        ))}

      </nav>



      {/* 🔹 MAIN CONTENT */}

      <div className="flex-1 p-4 overflow-auto bg-gray-50">

        {activeTab === "Excel View" ? (

          <>

            <h1 className="text-xl font-bold mb-4">Excel View</h1>



            {/* ✅ Indent / Outdent Buttons */}

            <div className="flex gap-3 mb-4">

              <button

                onClick={() => indentTask(selectedIndex)}

                disabled={!canIndent()}

                className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"

              >

                Indent ➡

              </button>



              <button

                onClick={() => outdentTask(selectedIndex)}

                disabled={!canOutdent()}

                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"

              >

                Outdent ⬅

              </button>

            </div>



            {/* ✅ Excel-like Grid */}

            <div className="border rounded shadow-sm bg-white">

              {/* Header Row */}

              <div className="grid grid-cols-4 bg-gray-200 font-semibold p-2 border-b">

                <div>Milestone 01<div>

                <div>Created By</div>


              </div>



              {/* Data Rows */}

              {tasks.map((task, idx) => (

                <div

                 key={task.id}

                  className={`grid grid-cols-4 items-center p-2 border-b cursor-pointer ${

                    selectedIndex === idx ? "bg-blue-100" : "hover:bg-gray-50"

                  }`}

                  onClick={() => setSelectedIndex(idx)}

                >

                  {/* ✅ Indentation padding */}

                  <div style={{ paddingLeft: `${task.level * 20}px` }}>

                   {task.Milestone 01}

                  </div>

                  <div>{task.Created By}</div>

                </div>

              ))}

            </div>

          </>

        ) : (

          <div className="text-gray-600 text-lg">

            ✅ {activeTab} content coming soon...

          </div>

        )}

      </div>

    </div>

  );

}
