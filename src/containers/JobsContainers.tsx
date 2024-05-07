import React from "react";
import { useSelector } from "react-redux";
import "../assets/styles/components/jobsContainer.css";

const JobsContainer: React.FC = () => {
  const newJob = useSelector((state:any) => state.cardData);

  return (
    <div className="jobs-container">
      {Array.isArray(newJob) && newJob.length > 0 ? (
        newJob.map((job) => (
          <div className="job-card" key={job.jdUid}>
            <p>Posted 10 days ago</p>
            <div className="job-card-body">
              <div className="job-card-title">
                <div className="job-card-logo">
                  <img src={job.logoUrl} alt="Company Logo" />
                </div>
                <div className="job-card-detail">
                  <p>{job.companyName}</p>
                  <p>{job.jobRole}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <p>
                Estimated Salary: {job.minJdSalary} - {job.maxJdSalary}{" "}
                {job.salaryCurrencyCode}
              </p>
              <h3>About Company</h3>
              {job.jobDetailsFromCompany}
              <h3>Minimum Experience: {job.minExp}</h3>
              <div>Apply Now</div>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobsContainer;
