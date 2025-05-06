'use client'
import { Images, Trash2, Edit, Plus } from 'lucide-react'
import React,{useState , useEffect} from 'react'

const Projects = () => {
        const [formdata, setFormdata] = useState({
            Title:"",
            Description:'',
            
        });
        const [imagefile, setImagefile] = useState<File | null>(null);
        const [loading , setLoading] = useState(false);
        const [message , setMessage] = useState('');
        const [errors , setErrors] = useState("");
        const [uplodeImages , setUplodeImages] = useState([]);
        const [showForm, setShowForm] = useState(false);
// projects fetching
        const fetchProjects = async ()=>{
            try{
                setLoading(true);
                const response = await fetch('/api/Team');
                if(!response.ok){
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setUplodeImages(data.projects || []);
            }
            catch(error){
                console.error('Error fetching projects:', error);
            }
            finally{
                setLoading(false);  
            }
        }
        
        useEffect(() => {
            fetchProjects();
        }, []);

// handle delete project
        const handleDelete = async (id: string) => {
            try {
                setLoading(true);
                const response = await fetch(`/api/Team?id=${id}`, {
                    method: 'DELETE',
                });
                
                if (!response.ok) {
                    throw new Error('Failed to delete project');
                }
                
                const data = await response.json();
                setMessage(data.message);
                
                // Refresh projects list after deletion
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
                setErrors('Failed to delete project');
            } finally {
                setLoading(false);
            }
        };

//handle image upload
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            setMessage('');
            setErrors('');
            // Form validation
            if(!formdata.Title || !formdata.Description || !imagefile){
                setErrors('Please fill all fields and upload an image');
                setLoading(false);
                return;
            }
           
            try{
                const formData = new FormData();
                formData.append('Title', formdata.Title);
                formData.append("Description", formdata.Description);
                if(imagefile){
                    formData.append('Image', imagefile);
                }

                const response = await fetch("/api/Team", {
                    method: "POST",
                    body: formData,
                });

                if(!response.ok){
                    throw new Error('Failed to upload project');
                }
                const data = await response.json();
                setMessage(data.message);
                setFormdata({
                    Title: "",
                    Description: "",
                });
                setImagefile(null);
                setShowForm(false);
                
                // Refresh projects list after adding a new one
                await fetchProjects();
            }
            catch(error){
                console.error('Error uploading project:', error);
                setErrors('Failed to upload project');
            }
            finally{
                setLoading(false);
            }
        }

        // handle change
const handleChange = (e:any) =>{
    const {name , value} = e.target;
    setFormdata((prev) => ({...prev , [name]: value}));
}

  return (
    <div className='min-h-screen relative bg-black/90 text-white'>
        {/* Background with animated blobs inspired by Landing page */}
        <div className="fixed h-screen w-screen overflow-hidden -z-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-700 opacity-20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-700 opacity-20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className='flex flex-col items-center justify-start w-full px-6 py-8 max-w-7xl mx-auto'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2 font-playfair'>Team Management</h1>
            <p className='text-blue-300 mb-6 text-center'>Add or manage team members</p>
            
            {message && (
                <div className='bg-blue-900/30 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-md mb-6 w-full max-w-xl text-center'>
                    {message}
                </div>
            )}
            
            {errors && (
                <div className='bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-md mb-6 w-full max-w-xl text-center'>
                    {errors}
                </div>
            )}
            
            {/* Add New Team Member Button */}
            {!showForm && (
                <button 
                    onClick={() => setShowForm(true)}
                    className='mb-8 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg'
                >
                    <Plus size={18} />
                    Add New Team Member
                </button>
            )}
            
            {/* Upload Form - Shown conditionally */}
            {showForm && (
                <div className='bg-gray-900/70 backdrop-blur border border-gray-700 shadow-lg rounded-xl p-6 mb-10 w-full max-w-xl'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className='text-xl font-semibold text-white'>Add Team Member</h2>
                        <button 
                            onClick={() => setShowForm(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-2 text-sm' htmlFor="Title">Name</label>
                            <input
                                type="text"
                                id="Title"
                                value={formdata.Title}
                                onChange={handleChange}
                                name="Title"
                                className='w-full bg-gray-800/80 border border-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter team member's name"
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2 text-sm' htmlFor="Description">Role/Position</label>
                            <textarea
                                id="Description"
                                value={formdata.Description}
                                onChange={handleChange}
                                name="Description"
                                className='w-full bg-gray-800/80 border border-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter member's role or description"
                                rows={3}
                            ></textarea>
                        </div>
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm' htmlFor="imagefile">Profile Photo</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-800/80 border border-gray-700 rounded-md px-3 py-2 relative">
                                    <input
                                        type="file"
                                        id="imagefile"
                                        onChange={(e) => setImagefile(e.target.files?.[0] || null)}
                                        name="imagefile"
                                        accept="image/*"
                                        className='w-full opacity-0 absolute inset-0 cursor-pointer'
                                    />
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Images size={18} />
                                        <span>{imagefile ? imagefile.name : 'Choose an image'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className='flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-md p-2 transition'
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md p-2 transition shadow-md'
                                disabled={loading}
                            >
                                {loading ? 'Uploading...' : 'Add Member'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Team Members List */}
            <div className='w-full'>
                <h2 className='text-xl font-semibold mb-4 text-blue-200'>Team Members</h2>
                
                {loading && !showForm ? (
                    <div className='flex justify-center py-10'>
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : uplodeImages.length > 0 ? (
                    <div className='space-y-4'>
                        {uplodeImages.map((project: any) => (
                            <div key={project.id} className='bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-blue-900/20 hover:border-gray-700'>
                                <div className="flex flex-col md:flex-row">
                                    {/* Image section */}
                                    <div className="md:w-1/4 h-[160px] md:h-[180px] flex-shrink-0 overflow-hidden">
                                        <img 
                                            src={`/api/Team/${project.id}`} 
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                console.error(`Failed to load image for project: ${project.id}`);
                                                e.currentTarget.src = '/digitalCube.png';
                                                e.currentTarget.className = "w-full h-full object-contain p-4 bg-gray-800";
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Content section */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <h3 className='font-medium text-xl text-blue-100 mb-2'>{project.title}</h3>
                                            <p className='text-gray-300'>{project.description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Actions section */}
                                    <div className="md:w-1/6 p-4 flex md:flex-col justify-end items-center gap-3 border-t md:border-l md:border-t-0 border-gray-800">
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className='flex items-center gap-2 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-300 rounded-lg transition-colors'
                                            disabled={loading}
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-16 px-6 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl'>
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-900/20 mb-4">
                            <Images size={24} className="text-blue-300" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-200 mb-2">No team members yet</h3>
                        <p className='text-gray-400 mb-6'>Add your first team member to display here</p>
                        <button 
                            onClick={() => setShowForm(true)}
                            className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition'
                        >
                            <Plus size={18} />
                            Add Team Member
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Projects
