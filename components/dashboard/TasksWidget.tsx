'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Clock } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
}

export default function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Review pull requests', completed: true, priority: 'high', dueTime: '10:00 AM' },
    { id: '2', text: 'Team standup meeting', completed: true, priority: 'high', dueTime: '11:00 AM' },
    { id: '3', text: 'Update project documentation', completed: false, priority: 'medium', dueTime: '2:00 PM' },
    { id: '4', text: 'Code review for auth module', completed: false, priority: 'high', dueTime: '3:00 PM' },
    { id: '5', text: 'Write unit tests', completed: false, priority: 'low' },
    { id: '6', text: 'Deploy to staging', completed: false, priority: 'medium', dueTime: '5:00 PM' }
  ]);

  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask,
          completed: false,
          priority: 'medium'
        }
      ]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{completedCount} of {tasks.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#9152DE] to-[#5F29A1] h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {showAddTask && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            autoFocus
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-[#9152DE] text-white rounded-lg hover:bg-[#5F29A1] transition-colors"
          >
            Add
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group transition-colors"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 ${getPriorityColor(task.priority)}`}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-sm ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
              }`}>
                {task.text}
              </p>
              {task.dueTime && (
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {task.dueTime}
                </p>
              )}
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No tasks for today</p>
          </div>
        )}
      </div>
    </div>
  );
}