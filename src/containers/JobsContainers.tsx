import React, { useState, useEffect } from "react";
import { fetchJobs, Job } from "../services/api";
import "../assets/styles/components/jobsContainer.css";

const JobsContainer: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const { jobs, totalCount } = await fetchJobs(limit, offset);
      setJobs(jobs);
      console.log(jobs);
      setTotalCount(totalCount);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []); // Load jobs on component mount

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (isAtBottom && !isLoading && jobs.length < totalCount) {
      loadJobs();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, jobs, totalCount]);

  return (
    <div className="jobs-container">
      {jobs &&
        jobs.map((job) => (
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
              <h3>
                Minimum Experience: {job.minExp}
              </h3>
              <div>
                  Apply Now
              </div>
            </div>
          </div>
        ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default JobsContainer;
