'use client';
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Save, X } from 'lucide-react';


const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMember, setNewMember] = useState({
    Name: '',
    Role: '',
    image: '',
    alt: '',
    Exp: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);


  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Team');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch('/api/Team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error('Failed to add team member');
      }

      fetchTeamMembers();
      setNewMember({ Name: '', Role: '', image: '', alt: '', Exp: '' });
      setIsAddingNew(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!id) {
      setError('Team member ID is missing');
      return;
    }

    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const response = await fetch('/api/Team', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }

      fetchTeamMembers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading team members...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Team Management</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            disabled={isAddingNew}
          >
            <Plus size={16} /> Add Member
          </button>
        </div>

        {isAddingNew && (
          <div className="mb-6 p-4 border border-blue-200 rounded-md bg-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Member</h2>
              <button onClick={() => setIsAddingNew(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.Name}
                  onChange={(e) => setNewMember({ ...newMember, Name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={newMember.Role}
                  onChange={(e) => setNewMember({ ...newMember, Role: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={newMember.alt}
                  onChange={(e) => setNewMember({ ...newMember, alt: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <input
                  type="text"
                  value={newMember.Exp}
                  onChange={(e) => setNewMember({ ...newMember, Exp: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleAddMember}
              className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
            >
              <Save size={16} /> Save Member
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Alt Text</th>
                <th className="py-2 px-4 border-b text-left">Experience</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                    No team members available. Add your first member!
                  </td>
                </tr>
              ) : (
                teamMembers.map((member) => (
                  <tr key={member._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{member.Name}</td>
                    <td className="py-2 px-4">{member.Role}</td>
                    <td className="py-2 px-4">{member.alt}</td>
                    <td className="py-2 px-4">{member.Exp}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDeleteMember(member._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
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

export default Team;
