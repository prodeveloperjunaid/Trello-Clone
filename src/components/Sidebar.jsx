import React from "react";
import { useState } from "react";
import Card from "./Card";
import Column from "./Column";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newTask, setNewTask] = useState({
    name: "",
    role: "",
    description: "",
    status: "todo",
  });

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const [cardData, setCardData] = useState({
    todo: [
      {
        id: 1,
        name: "Bonnie Green",
        role: "Visual Designer",
        description: "Design new dashboard layout with improved navigation",
      },
    ],
    inProgress: [
      {
        id: 2,
        name: "Sarah Johnson",
        role: "UX Researcher",
        description: "Conducting user testing for new onboarding flow",
      },
    ],
    done: [
      {
        id: 3,
        name: "David Wilson",
        role: "Backend Developer",
        description: "Completed API integration for payment gateway",
      },
    ],
  });

  // Open modal for adding new task to specific column
  const openAddModal = (status) => {
    setNewTask({
      name: "",
      role: "",
      description: "",
      status: status,
    });
    setEditingCard(null);
    setShowModal(true);
  };

  // Open modal for editing existing task
  const openEditModal = (card, status) => {
    setEditingCard({ ...card, originalStatus: status });
    setNewTask({
      name: card.name,
      role: card.role,
      description: card.description,
      status: status,
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const card = {
      id: editingCard ? editingCard.id : Date.now(),
      name: newTask.name,
      role: newTask.role,
      description: newTask.description,
    };

    if (editingCard) {
      // Remove from original column if status changed
      if (editingCard.originalStatus !== newTask.status) {
        setCardData((prev) => ({
          ...prev,
          [editingCard.originalStatus]: prev[editingCard.originalStatus].filter(
            (c) => c.id !== editingCard.id
          ),
        }));
      } else {
        // Remove from current column if not changed (will be re-added below)
        setCardData((prev) => ({
          ...prev,
          [editingCard.originalStatus]: prev[editingCard.originalStatus].filter(
            (c) => c.id !== editingCard.id
          ),
        }));
      }
    }

    // Add to new column
    setCardData((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], card],
    }));

    // Reset form and close modal
    setNewTask({
      name: "",
      role: "",
      description: "",
      status: "todo",
    });
    setEditingCard(null);
    setShowModal(false);
  };

  // Delete a card
  const deleteCard = (id, status) => {
    setCardData((prev) => ({
      ...prev,
      [status]: prev[status].filter((card) => card.id !== id),
    }));
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
               <h1 className="text-3xl font-bold ">Trello Clone</h1>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-6 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="ms-3">Events</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="ms-3">From Geniuses</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M19 4h-1a1 1 0 100 2v11a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 100-2H1a1 1 0 100 2v11a3 3 0 003 3h14a3 3 0 003-3V6a1 1 0 100-2z" />
                  <path d="M15 4V3a1 1 0 00-1-1h-3a1 1 0 00-1 1v1h5z" />
                  <path d="M6 4V3a1 1 0 011-1h3a1 1 0 011 1v1H6z" />
                  <path d="M5 8h2v2H5V8z" />
                  <path d="M5 12h2v2H5v-2z" />
                  <path d="M9 8h2v2H9V8z" />
                  <path d="M9 12h2v2H9v-2z" />
                  <path d="M13 8h2v2h-2V8z" />
                  <path d="M13 12h2v2h-2v-2z" />
                </svg>
                <span className="ms-3">Painting</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 00-2-2h-2V1a1 1 0 00-2 0v1h-3V1a1 1 0 00-2 0v1H6V1a1 1 0 00-2 0v1H2a2 2 0 00-2 2v2h20V4zM0 18a2 2 0 002 2h16a2 2 0 002-2V8H0v10zm5-8h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z" />
                </svg>
                <span className="ms-3">Serials</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2.5V1a1 1 0 00-2 0v1.5H5.5a1 1 0 000 2H8v1.5H5.5a1 1 0 000 2H8v1.5H5.5a1 1 0 000 2H8v1.5H5.5a1 1 0 000 2H8V16a1 1 0 002 0v-1.5h2.5a1 1 0 000-2H10v-1.5h2.5a1 1 0 000-2H10v-1.5h2.5a1 1 0 000-2H10v-1.5h2.5a1 1 0 000-2H10z" />
                </svg>
                <span className="ms-3">Hostels</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ms-3">Preview</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#0a5fd9] hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="ms-3">Homes</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {/* To Do Column */}
            <Column title="To Do">
              {cardData.todo.map((card) => (
                <Card
                  key={`todo-${card.id}`}
                  {...card}
                  onEdit={() => openEditModal(card, "todo")}
                  onDelete={() => deleteCard(card.id, "todo")}
                />
              ))}
              <button
                onClick={() => openAddModal("todo")}
                className="w-full mt-4 flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2">Add Task</span>
              </button>
            </Column>

            {/* In Progress Column */}
            <Column title="In Progress">
              {cardData.inProgress.map((card) => (
                <Card
                  key={`progress-${card.id}`}
                  {...card}
                  onEdit={() => openEditModal(card, "inProgress")}
                  onDelete={() => deleteCard(card.id, "inProgress")}
                />
              ))}
              <button
                onClick={() => openAddModal("inProgress")}
                className="w-full mt-4 flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2">Add Task</span>
              </button>
            </Column>

            {/* Done Column */}
            <Column title="Done">
              {cardData.done.map((card) => (
                <Card
                  key={`done-${card.id}`}
                  {...card}
                  onEdit={() => openEditModal(card, "done")}
                  onDelete={() => deleteCard(card.id, "done")}
                />
              ))}
              <button
                onClick={() => openAddModal("done")}
                className="w-full mt-4 flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2">Add Task</span>
              </button>
            </Column>
          </div>
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCard ? "Edit Task" : "Add New Task"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newTask.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                >
                  {editingCard ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
