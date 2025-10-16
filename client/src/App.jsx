import { useState, useEffect } from 'react'
import JobList from './components/JobList.jsx';
import AddJobForm from "./components/AddJobForm";

function App() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Job Tracker</h1>
      <AddJobForm onJobAdded={handleJobAdded} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
