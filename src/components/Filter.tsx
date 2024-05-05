import React, { useState } from 'react';
import '../assets/styles/components/filter.css';

interface FilterProps {
  // Define props here
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
          <option value="">1-10</option>
          {employeesOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        >
          <option value="">1</option>
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
          <option value="">0L</option>
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
