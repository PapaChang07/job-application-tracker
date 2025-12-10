import { useState, useEffect } from 'react'
import JobList from './components/JobList.jsx';
import AddJobForm from "./components/AddJobForm";
import EditJobForm from './components/EditJobForm.jsx';

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  // Fetch jobs once on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const handleJobAdded = () => {
    fetchJobs(); // refresh list when a new job is added
  };

  const handleDelete = async (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    try {
      const res = await fetch(`http://localhost:5000/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch (err) {
      // rollback if delete failed – re-fetch or restore
      console.error(err);
      await fetchJobs(); // simplest rollback
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Job Tracker</h1>
      <AddJobForm onJobAdded={handleJobAdded} />
      <JobList jobs={jobs} onEdit={(job) => setEditingJob(job)}  onDelete = {handleDelete}/>
      {editingJob && (
        <EditJobForm
          job={editingJob}
          onSave={(updatedJob) => {
            setJobs((prevJobs) =>
              prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
            );
            setEditingJob(null);
          }}
          onCancel={() => setEditingJob(null)}
        />
      )}
    </div>
  );
}

export default App;
