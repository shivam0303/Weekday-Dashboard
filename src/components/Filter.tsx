import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobs, Job } from "../services/api";
import '../assets/styles/components/filter.css';
import { setCardData } from '../store/action';

interface FilterProps {
  // props here
}

const Filter: React.FC<FilterProps> = ({}) => {
    const [minExperience, setMinExperience] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
  //   const [techStack, setTechStack] = useState<string>('');
    const [employees, setEmployees] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [minBasePay, setMinBasePay] = useState<string>('');

    const roleOptions = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer'];
    const locationOptions = ['Hybrid','In-Office'];
    const employeesOptions = ['1-10', '11-50', '51-200', '201-500', '500+']
    const baseSalaryOptions = ['0L', '10L', '20L', '30L', '40L', '50L', '60L', '70L'];
    const experienceOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    const dispatch = useDispatch();


    const [job, setJob] = useState<Job[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);

    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const { jobs: fetchedJobs, totalCount } = await fetchJobs(limit, offset);
        const updatedJobs = [...job, ...fetchedJobs]; // Combining fetched job
        setJob(updatedJobs); 

        //dispatching the job only is all the filters are empty
        if (role === '' && employees === '' && minExperience === '' && location === '' && minBasePay === '' && companyName === '') {
          dispatch(setCardData(updatedJobs)); 
        }
        setTotalCount(totalCount);
        setOffset((prevOffset) => prevOffset + limit);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    

    const filterJobs = () => {
      if (job.length > 0) {
        let filteredJobs = job.filter((job: any) => {
          const minExpNum = minExperience !== "" ? parseInt(minExperience) : -1;
          const lowerCaseRole = role.toLowerCase(); 
          const lowerCaseJobRole = job.jobRole.toLowerCase(); 
          console.log("role : ", role, "lowerCaseJobRole : ", lowerCaseJobRole, "lowerCaseRole : ", lowerCaseRole)
          return (
            (role === "" || lowerCaseRole.includes(lowerCaseJobRole)) && // Check if jobRole contains role
            (employees === "" || job.employees === employees) &&
            (minExperience === "" || job.minExp >= minExpNum) &&
            (location === "" || job.location === location) &&
            (minBasePay === "" || job.minJdSalary === minBasePay) &&
            (companyName === "" || job.companyName.toLowerCase().includes(companyName.toLowerCase()))
          );
        });
        // console.log("filtered jobs : ", filteredJobs);
        dispatch(setCardData(filteredJobs));
      }
    };
    
    useEffect(() => {
      //calling this only when a filter is applied by user
      filterJobs(); 
    }, [role, employees, minExperience, location, minBasePay, companyName]); 

    useEffect(() => {
      if (role === '' && employees === '' && minExperience === '' && location === '' && minBasePay === '' && companyName === '') {
        console.log("loading jobs");
        loadJobs();
      }
    }, []);

    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isAtBottom && !isLoading && job.length < totalCount) {
        loadJobs();
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isLoading, job, totalCount]);
 

  return (
    <div className="filter-container">
      <div className="filter-inputs">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          
        >
          <option value="">Select Role</option>
          {roleOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={employees}
          onChange={(e) => setEmployees(e.target.value)}
        >
          <option value="">Employees</option>
          {employeesOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        >
          <option value="">Experience</option>
          {experienceOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Remote</option>
          {locationOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        {/* <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="Tech Stack"
        /> */}
        <select
          value={minBasePay}
          onChange={(e) => setMinBasePay(e.target.value)}
        >
          <option value="">Salary</option>
          {baseSalaryOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Search Company Name"
        />
      </div>
    </div>
  );
};

export default Filter;
