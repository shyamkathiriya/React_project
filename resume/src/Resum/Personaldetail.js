import React, { useState, useEffect } from 'react';
import '../Resumcss/Personaldetail.css';

function Personal() {
  const [Fristname, setFristname] = useState('');
  const [Email, setEamil] = useState('');
  const [number, setnumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    Email: false,
    number: false,
  });

  useEffect(() => {
    const personalData = JSON.parse(sessionStorage.getItem('personalData'));
    if (personalData) {
      setFristname(personalData.Fristname || '');
      setEamil(personalData.Email || '');
      setnumber(personalData.number || '');
      setAddress(personalData.address || '');
      setCity(personalData.city || '');
      setState(personalData.state || '');
      setPinCode(personalData.pinCode || '');
    }
  }, []);

  const validateRequiredField = (fieldName, value) => {
    if (value.trim() === '') {
      return `${fieldName} is required.`;
    }
    return '';
  };

  const hfristname = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
    setFristname(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, Fristname: validateRequiredField('Name', sanitizedValue) }));
  };

  const hEmail = (event) => {
    const { value } = event.target;
    setEamil(value);
    setErrors((prevErrors) => ({ ...prevErrors, Email: '' }));

    if (touched.Email && value.trim() !== '') {
      const isValidEmail = validateEmail(value);
      if (!isValidEmail) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Email: 'Invalid email address.',
        }));
      }
    }
  };

  const handleEmailBlur = () => {
    const isValidEmail = validateEmail(Email);
    setTouched((prevTouched) => ({ ...prevTouched, Email: true }));

    if (!isValidEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Email: 'Invalid email address.',
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z]{3,}$/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail;
  };

  const validateNumber = (inputNumber) => {
    const numberRegex = /^\d+$/;
    const isValidNumber = numberRegex.test(inputNumber);
    return isValidNumber && inputNumber.length >= 8 && inputNumber.length <= 15;
  };

  const hnumber = (event) => {
    const { value } = event.target;
    setnumber(value);
    if (touched.number) {
      const isValidNumber = validateNumber(value);
      if (!isValidNumber) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          number: 'Number should be a numeric value between 8 and 15 characters.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, number: '' }));
      }
    }
  };

  const handleNumberBlur = () => {
    const isValidNumber = validateNumber(number);
    setTouched((prevTouched) => ({ ...prevTouched, number: true }));

    if (!isValidNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        number: 'Number should be a numeric value between 8 and 15 characters.',
      }));
    }
  };

  const hAddress = (event) => {
    const { value } = event.target;
    setAddress(value);
    setErrors((prevErrors) => ({ ...prevErrors, address: validateRequiredField('Address', value) }));
  };
//   const hcity = (event) => {
//     const { value } = event.target;
//     const cit = value.replace(/[^A-Za-z]/g, '');
//     setCity(cit);
//   };

//   const hstate = (event) => {
//     const { value } = event.target;
//     const stat = value.replace(/[^A-Za-z]/g, '');
//     setState(stat);
//   };
  const hcity = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '');
    setCity(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, city: validateRequiredField('City', sanitizedValue) }));
  };

  const hstate = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '');
    setState(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, state: validateRequiredField('State', sanitizedValue) }));
  };

  const hPin = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setPinCode(sanitizedValue);
    setErrors((prevErrors) => ({ ...prevErrors, pinCode: validateRequiredField('Pin code', sanitizedValue) }));
    fillCityAndState(sanitizedValue);
  };
  
  const fillCityAndState = (pin) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.postalpincode.in/pincode/${pin}`, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response[0].Status === 'Success') {
          const city = response[0].PostOffice[0].District;
          const state = response[0].PostOffice[0].State;
          setCity(city);
          setState(state);
        }
      }
    };
    xhr.send();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target.result;
      sessionStorage.setItem('uploadedImage', imageBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (Fristname.trim() === '') {
      validationErrors.Fristname = 'Name is required.';
    }

    if (Email.trim() === '') {
      validationErrors.Email = 'Email is required.';
    }

    if (number.trim() === '') {
      validationErrors.number = 'Number is required.';
    }

    if (address.trim() === '') {
      validationErrors.address = 'Address is required.';
    }

    if (city.trim() === '') {
      validationErrors.city = 'City is required.';
    }

    if (state.trim() === '') {
      validationErrors.state = 'State is required.';
    }

    if (pinCode.trim() === '') {
      validationErrors.pinCode = 'Pin code is required.';
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        Fristname,
        Email,
        number,
        address,
        city,
        state,
        pinCode,
      };
      sessionStorage.setItem('personalData', JSON.stringify(data));
      window.location.href = '/Acadamy';
    }
  };

  return (
    <>
      <div className='Prson'>
        <form className='Prson-from' onSubmit={handleSubmit}>
          <h1>Personal Details</h1>
          <label htmlFor='namedInput'>Name:</label>
          <input type='text' value={Fristname} onChange={hfristname} placeholder='Enter your First name' />
          {errors.Fristname && <span className='error'>{errors.Fristname}</span>}

          <label>Email:</label>
          <input type='text' value={Email} onChange={hEmail} onBlur={handleEmailBlur} placeholder='Enter your Email'/>
          {touched.Email} {<span className='error'>{errors.Email}</span>}

          <label>Number:</label>
          <input type='number' value={number} onChange={hnumber} onBlur={handleNumberBlur} placeholder='Enter your Number'/>
          {touched.number && <span className='error'>{errors.number}</span>}

          <label>Address:</label>
          <textarea name='postContent' rows={3} cols={20} onChange={hAddress} placeholder='Enter your Address'></textarea>
          {errors.address && <span className='error'>{errors.address}</span>}

          <label>Pin code:</label>
          <input type='text' value={pinCode} onChange={hPin} maxLength={6} placeholder='Enter your Pin Code' />
          {errors.pinCode && <span className='error'>{errors.pinCode}</span>}

          <label>City:</label>
          <input type='text' value={city} onChange={hcity} placeholder='Enter your City' />
          {errors.city && <span className='error'>{errors.city}</span>}

          <label>State:</label>
          <input type='text' value={state} onChange={hstate} placeholder='Enter your State' />
          {errors.state && <span className='error'>{errors.state}</span>}

          <label>Upload Image:</label>
          <input type='file' onChange={handleFileChange} />

          <button type='submit'>Next</button>
        </form>
      </div>
    </>
  );
}

export default Personal;
