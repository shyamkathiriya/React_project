import React, { useState, useEffect } from 'react';
import '../Resumcss/WorkExpertion.css';

function WorkExpertion() {
  const [WorkList, setWorkList] = useState([]);
  const [Compny, setCompny] = useState('');
  const [Role, setRole] = useState('');
  const [StartYear, setStartYear] = useState('');
  const [EndYear, setEndYear] = useState('');
  const [Description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear(); 
  const startYears = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index).reverse();
  const endYears = Array.from({ length: currentYear - parseInt(StartYear) + 1 }, (_, index) => parseInt(StartYear) + index);

  const validateRequiredField = (fieldName, value) => {
    if (value.trim() === '') {
      return `${fieldName} is required.`;
    }
    return '';
  };

  const hCompny = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '');
    setCompny(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, Compny: validateRequiredField('Compny Name', sanitizedValue) }));
  };
  const hRole = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '');
    setRole(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, Role: validateRequiredField('Role', sanitizedValue) }));
  };

  const hStartYear = (event) => {
    const { value } = event.target;
    setStartYear(value);
    setErrors((prevErrors) => ({ ...prevErrors, StartYear: validateRequiredField('Start Year', value) }));
  };

  const hEndYear = (event) => {
    const { value } = event.target;
    setEndYear(value);
    setErrors((prevErrors) => ({ ...prevErrors, EndYear: validateRequiredField('End Year', value) }));
  };

  const hDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
    setErrors((prevErrors) => ({ ...prevErrors, Description: validateRequiredField('Description', value) }));
  };  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (Compny.trim() === '') {
      validationErrors.Compny = 'Compny name is required.';
    }

    if (Role.trim() === '') {
      validationErrors.Role = 'Role is required.';
    }

    if (StartYear.trim() === '') {
      validationErrors.StartYear = 'Start Year is required.';
    }

    if (EndYear.trim() === '') {
      validationErrors.EndYear = 'End Year is required.';
    } else if (parseInt(EndYear) < parseInt(StartYear) || parseInt(EndYear) > currentYear) {
      validationErrors.EndYear = `End Year should be between ${StartYear} and ${currentYear}.`;
    }

    if (Description.trim() === '') {
      validationErrors.Description = 'Description is required.';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const WorkData = {
        Compny,
        Role,
        StartYear,
        EndYear,
        Description,
      };

      setWorkList((prevList) => [...prevList, WorkData]);

      // Clear form fields
      setCompny('');
      setRole('');
      setStartYear('');
      setEndYear('');
      setDescription('');
    }
  };

  const handleNext = () => {
    if (WorkList.length === 0) {
      alert('Please add at least one work detail before proceeding to the next button.');
      return;
    }
    sessionStorage.setItem('WorkData', JSON.stringify(WorkList));
    window.location.href = '/Printdata';
  };

  useEffect(() => {
    sessionStorage.setItem('WorkData', JSON.stringify(WorkList));
  }, [WorkList]);

  return (
    <>
      <div className='Prson'>
        <form className='Prson-from' onSubmit={handleSubmit}>
          <h1>Work Details</h1>

          <label htmlFor='namedInput'>Compny Name:</label>
          <input type='text' value={Compny} onChange={hCompny} placeholder='Enter your Compny Name' />
          <span className='error'>{errors.Compny}</span>

          <label>Role:</label>
          <input type='text' value={Role} onChange={hRole} placeholder='Enter your Role' />
          <span className='error'>{errors.Role}</span>

          <label>Start Year:</label>
          <select className='Year' value={StartYear} onChange={hStartYear}>
            <option value=''>Select Start Year</option>
            {startYears.map((year) => (
              <option value={year} key={year}> {year} </option>
            ))}
          </select>
          <p className='error'>{errors.StartYear}</p>

          <label>End Year:</label>
          <select className='Year' value={EndYear} onChange={hEndYear}>
            <option value=''>Select End Year</option>
            {endYears.map((year) => (
              <option value={year} key={year}> {year} </option>
            ))}
          </select>
          <span className='error'>{errors.EndYear}</span>

          <label>Description:</label>
          <textarea name='postContent' rows={3} cols={20} value={Description} onChange={hDescription} placeholder='Enter your Description'></textarea>
          <span className='error'>{errors.Description}</span>

          <button type='submit' className='Add'>Add</button>
          <div className='Work-list'>
            <h2>Work Details List:</h2>
            {WorkList.length === 0 ? (
              <p>No work details added yet.</p>
            ) : (
              <ul>
                {WorkList.map((work, index) => (
                  <li key={index}>
                    <p>Compny Name: {work.Compny}</p>
                    <p>Role: {work.Role}</p>
                    <p>Start Year: {work.StartYear}</p>
                    <p>End Year: {work.EndYear}</p>
                    <p>Description: {work.Description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <button type='button' onClick={handleNext}> Submit </button>
        </form>
      </div>
    </>
  );
}

export default WorkExpertion;
