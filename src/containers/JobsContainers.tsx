import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../assets/styles/components/jobsContainer.css";
import { Popover, Typography } from "@mui/material";

const JobsContainer: React.FC = () => {
  const newJob = useSelector((state: any) => state.cardData);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, job: any) => {
    setSelectedJob(job);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
                  <p className="company-name">{job.companyName}</p>
                  <h2 className="job-role">{job.jobRole}</h2>
                  <p className="job-location">{job.location}</p>
                </div>
              </div>
              <p className="estimated-salary">
                Estimated Salary: {0 || job.minJdSalary} - {job.maxJdSalary}{" "}
                {job.salaryCurrencyCode} ⚠️
              </p>
              <p className="about-company">About Company:</p>
              <div
                className="jobDetailsFromCompany"
              >
                {showMore
                  ? job.jobDetailsFromCompany
                  : job.jobDetailsFromCompany
                      .split("\n")
                      .slice(0, 10)
                      .join("\n")}
                
              </div>
              {!showMore && (
                <button className="show-more-btn" onClick={(e) => handlePopoverOpen(e, job)}>
                  Show More
                </button>
              )}

              <Popover
                open={open && selectedJob === job}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="popover-content">
                  <Typography variant="h6" className="popover-title">
                    Job Description
                  </Typography>
                  <Typography sx={{ p: 2 }}>
                    {job.jobDetailsFromCompany}
                  </Typography>
                </div>
              </Popover>

              <div className="minimum-exp">
                Minimum Experience
                <div> {job.minExp} years </div>
              </div>

              <button className="apply-btn">
                <a
                  href={job.jdLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ⚡ Easy Apply
                </a>
              </button>
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
