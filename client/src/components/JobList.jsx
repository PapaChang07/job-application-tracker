import { useEffect, useState } from "react";

export default function JobList({ jobs }) {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Job Applications</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs yet — add one above!</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <li key={job.id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-gray-600">
                    {job.position} — {job.status}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  Applied on: {new Date(job.date).toLocaleDateString()}
                </span>
              </div>
              {job.notes && (
                <p className="text-sm text-gray-500 mt-1">{job.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

