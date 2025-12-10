import { useState, useEffect } from 'react'
import JobList from './components/JobList.jsx';
import AddJobForm from "./components/AddJobForm";
import EditJobForm from './components/EditJobForm.jsx';

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "", 
    sort: "date-desc"
  });

  // Fetch jobs once on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const filteredJobs = jobs.filter((job) => {
    // Hide rejected jobs by default
    if (job.status?.toLowerCase() === "rejected") return false;

    // Status filter
    if (filters.status !== "all" && job.status !== filters.status) {
      return false;
    }

    // Name filter (company or position)
    if (filters.search) {
      const text = filters.search.toLowerCase();
      const company = job.company?.toLowerCase() || "";
      const position = job.position?.toLowerCase() || "";

      if (!company.includes(text) && !position.includes(text)) {
        return false;
      }
    }

    return true;
  })
  .sort((a, b) => {
    if (filters.sort === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });


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
      <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow">
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Search by company or position..."
            className="border p-2 rounded flex-1"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />

          <select
            className="border p-2 rounded"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="all">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
          </select>
        </div>
      </div>
      <JobList jobs={filteredJobs} onEdit={(job) => setEditingJob(job)}  onDelete = {handleDelete}/>
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
