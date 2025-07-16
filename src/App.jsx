import { useState } from "react";
 
// सभी tabs define
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
  "User Guide",
];
 
export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedIndex, setSelectedIndex] = useState(null);
 
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", assigned: "Kunal", start: "2025-07-16", finish: "2025-07-21", level: 0 },
    { id: 2, name: "Subtask 1", assigned: "QA Team", start: "2025-07-18", finish: "2025-07-19", level: 1 },
    { id: 3, name: "Subtask 2", assigned: "Dev Team", start: "2025-07-19", finish: "2025-07-20", level: 1 },
    { id: 4, name: "Task 2", assigned: "Manager", start: "2025-07-22", finish: "2025-07-25", level: 0 }
  ]);
 
  const indentTask = (index) => {
    if (index === 0) return;
    let updated = [...tasks];
    updated[index].level = Math.min(
      updated[index].level + 1,
      updated[index - 1].level + 1
    );
    setTasks(updated);
  };
 
  const outdentTask = (index) => {
    let updated = [...tasks];
    updated[index].level = Math.max(updated[index].level - 1, 0);
    setTasks(updated);
  };
 
  // ✅ Excel View का content
  const renderExcelView = () => (
    <div className="p-4">
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
{task.name}</div>
            <div>{task.assigned}</div>
            <div>{task.start}</div>
            <div>{task.finish}</div>
          </div>
        ))}
      </div>
    </div>
  );
 
  // ✅ बाकी tabs का dummy content
  const renderTabContent = () => {
    if (activeTab === "Excel View") return renderExcelView();
    return (
      <div className="p-6 text-gray-700 text-lg">
        <p><strong>{activeTab}</strong> content will be shown here.</p>
      </div>
    );
  };
 
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* ✅ Tabs Bar */}
      <div className="flex border-b bg-white shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
 
      {/* ✅ Active Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
