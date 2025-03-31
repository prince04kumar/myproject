'use client'
import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';


const CMSDashboard = () => {
  

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    alt: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject({ ...project }); // Ensure the entire project object, including `_id`, is set
  };

  const handleUpdateProject = async () => {
    if (!editingProject._id) {
      setError('Project ID is missing');
      return;
    }
  
    try {
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editingProject._id, ...editingProject }), // Explicitly include `id` in the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
  
      // Refresh projects list
      fetchProjects();
      setEditingProject(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProject = async (id) => {
   // console.log(editingProject._id);
    if (!id) {
      setError('Project ID is missing');
      return;
    }
  
    if (!confirm('Are you sure you want to delete this project?')) return;
  
    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Pass `id` in the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
  
      // Refresh projects list
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleAddProject = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      // Refresh projects list
      fetchProjects();
      setNewProject({ title: '', category: '', alt: '' });
      setIsAddingNew(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading projects...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Showcase CMS</h1>
          <button 
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            disabled={isAddingNew}
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        {/* Add New Project Form */}
        {isAddingNew && (
          <div className="mb-6 p-4 border border-blue-200 rounded-md bg-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Project</h2>
              <button onClick={() => setIsAddingNew(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                <input
                  type="text"
                  value={newProject.alt}
                  onChange={(e) => setNewProject({...newProject, alt: e.target.value})}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleAddProject}
              className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
            >
              <Save size={16} /> Save Project
            </button>
          </div>
        )}

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Image Alt</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                    No projects available. Add your first project!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="border-b hover:bg-gray-50">
                    {editingProject && editingProject._id === project._id ? (
                      // Edit mode
                      <>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={editingProject.alt}
                            onChange={(e) => setEditingProject({...editingProject, alt: e.target.value})}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="py-2 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={handleUpdateProject}
                              className="p-1 text-green-600 hover:text-green-800"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={() => setEditingProject(null)}
                              className="p-1 text-gray-600 hover:text-gray-800"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td className="py-2 px-4">{project.title}</td>
                        <td className="py-2 px-4">{project.category}</td>
                        <td className="py-2 px-4">{project.alt}</td>
                        <td className="py-2 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditProject(project)} // Pass the entire project object
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;