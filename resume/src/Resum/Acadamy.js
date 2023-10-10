import React, { useState, useEffect } from 'react';
import '../Resumcss/Personaldetail.css';

function Acadamy() {
  const [academyList, setAcademyList] = useState([]);
  const [Institute, setInstitute] = useState('');
  const [Degree, setDegree] = useState('');
  const [CYear, setCYear] = useState('');
  const [CMonth, setCMonth] = useState('');
  const [Description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const completionYears = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  useEffect(() => {
    const storedAcademyData = sessionStorage.getItem('academyData');
    if (storedAcademyData) {
      setAcademyList(JSON.parse(storedAcademyData));
    }
  }, []);

  const validateRequiredField = (fieldName, value) => {
    if (value.trim() === '') {
      return `The ${fieldName} field is required.`;
    }
    return '';
  };
  
  const validateCompletionYear = (value) => {
    if (value.trim() === '') {
      return 'Completion Year is required.';
    }
    const completionYear = parseInt(value);
    if (completionYear < startYear || completionYear > currentYear) {
      return `Completion Year should be between ${startYear} and ${currentYear}.`;
    }
    return '';
  };
  
  const hInstitute = (event) => {
    const { value } = event.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    const sanitizedValue = capitalizedValue.replace(/[^A-Za-z ]/g, '');
    setInstitute(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, Institute: validateRequiredField('Institute', sanitizedValue) }));
  };

  const hDegree = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z.]/g, '');
    setDegree(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, Degree: validateRequiredField('Degree', sanitizedValue) }));
  };

  const hCYear = (event) => {
    const { value } = event.target;
    setCYear(value);
    setErrors((prevErrors) => ({ ...prevErrors, CYear: validateCompletionYear(value) }));
  };

  const hCMonth = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '');
    setCMonth(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, CMonth: validateRequiredField('Completion Month', sanitizedValue) }));
  };

  const hDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
    setErrors((prevErrors) => ({ ...prevErrors, Description: validateRequiredField('Description', value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (Institute.trim() === '') {
      validationErrors.Institute = 'Institute name is required.';
    }

    if (Degree.trim() === '') {
      validationErrors.Degree = 'Degree is required.';
    }

    if (CYear.trim() === '') {
      validationErrors.CYear = 'Completion Year is required.';
    } else if (parseInt(CYear) < startYear || parseInt(CYear) > currentYear) {
      validationErrors.CYear = `Completion Year should be between ${startYear} and ${currentYear}.`;
    }

    if (CMonth.trim() === '') {
      validationErrors.CMonth = 'Completion Month is required.';
    }

    if (Description.trim() === '') {
      validationErrors.Description = 'Description is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const acadamyData = {
        Institute,
        Degree,
        CYear,
        CMonth,
        Description,
      };

      setAcademyList((prevList) => [...prevList, acadamyData]);
      // Clear form fields
      setInstitute('');
      setDegree('');
      setCYear('');
      setCMonth('');
      setDescription('');
    }
  };

  const handleNext = () => {
    if (academyList.length === 0) {
      alert('Please add at least one academic detail before proceeding to the next button.');
      return;
    }
    sessionStorage.setItem('academyData', JSON.stringify(academyList));
    window.location.href = '/WorkExpertion';
  };

  useEffect(() => {
    sessionStorage.setItem('academyData', JSON.stringify(academyList));
  }, [academyList]);

  return (
    <>
      <div className='Prson'>
        <form className='Prson-from' onSubmit={handleSubmit}>
          <h1>Academic Details</h1>

          <label htmlFor='namedInput'>Institute/University:</label>
          <input type='text' value={Institute} onChange={hInstitute} placeholder='Enter your Institute/University' />
          <span className='error'>{errors.Institute}</span>

          <label>Degree:</label>
          <input type='text' value={Degree} onChange={hDegree} placeholder='Enter your Degree' />
          <span className='error'>{errors.Degree}</span>

          <label>Completion Year:</label>
          <select className='Year' value={CYear} onChange={hCYear}>
            <option value=''>Select Completion Year</option>
            {completionYears.map((year) => (
              <option value={year} key={year}> {year} </option>
            ))} </select>
          <span className='error'>{errors.CYear}</span>

          <label>Completion Month:</label>
          <select className='CMonth' value={CMonth} onChange={hCMonth}>
            <option value=''>Select Completion Month</option>
            <option value='January'>January</option>
            <option value='February'>February</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option>
          </select>
          <span className='error'>{errors.CMonth}</span>

          <label>Description:</label>
          <textarea name='postContent' rows={3} cols={20} value={Description} onChange={hDescription} placeholder='Enter your Description'></textarea>
          <span className='error'>{errors.Description}</span>

          <button type='submit' className='Add'>Add</button>

          <div className='Academy-list'>
            <h2>Academic Details List:</h2>
            {academyList.length === 0 ? (
              <p>No academic details added yet.</p>
            ) : (
              <ul>
                {academyList.map((academy, index) => (
                  <li key={index}>
                    <p>Institute: {academy.Institute}</p>
                    <p>Degree: {academy.Degree}</p>
                    <p>Completion Year: {academy.CYear}</p>
                    <p>Completion Month: {academy.CMonth}</p>
                    <p>Description: {academy.Description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type='button' onClick={handleNext}>
            Next
          </button>
        </form>
      </div>
    </>
  );
}

export default Acadamy;
