import { useEffect, useState } from "react";

export default function JobList({ jobs, onEdit }) {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Job Applications</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs yet — add one above!</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <li key={job.id} className="py-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-gray-600">
                    {job.position} — {job.status}
                  </p>
                  {job.notes && (
                    <p className="text-sm text-gray-500 mt-1">{job.notes}</p>
                  )}
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs text-gray-400">
                    Applied on: {new Date(job.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onEdit(job)}
                    className="mt-1 text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
