import React, { useEffect, useState } from 'react';
import '../Resumcss/Printdata.css';

function KL() {
  const [personalData, setPersonalData] = useState(null);
  const [workList, setWorkList] = useState([]);
  const [academyList, setAcademyList] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);

  useEffect(() => {
    const storedPersonalData = sessionStorage.getItem('personalData');
    if (storedPersonalData) {
      const data = JSON.parse(storedPersonalData);
      setPersonalData(data);
    }

    const storedWorkData = sessionStorage.getItem('WorkData');
    if (storedWorkData) {
      const data = JSON.parse(storedWorkData);
      setWorkList(data);
    }

    const storedAcademyData = sessionStorage.getItem('academyData');
    if (storedAcademyData) {
      const data = JSON.parse(storedAcademyData);
      setAcademyList(data);
    }

    const uploadedImageData = sessionStorage.getItem('uploadedImage');
    if (uploadedImageData) {
      setUploadedImg(uploadedImageData);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };
  const fristname = personalData ? personalData.Fristname : '';
  return (
    <>
      <div className="resume">
        <div className="resume_left">
          <div className="resume_profile">
            {uploadedImg && <img src={uploadedImg} alt="profile_pic" />}
          </div>
          <div className="resume_content">
            <div className="resume_item resume_info">
              <div className="title1">
                <p className="bold">{fristname}</p>
              </div>
              {personalData ? (
                <table>
                  <tbody>
                    <tr>
                      <td><label className='Lab'>Email:</label></td>
                      <td>{personalData.Email}</td>
                    </tr>
                    <tr>
                      <td><label className='Lab'>Number:</label></td>
                      <td>{personalData.number}</td>
                    </tr>
                    <tr>
                      <td><label className='Lab'>Address:</label></td>
                      <td>{personalData.address.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                    </tr>
                    <tr>
                      <td><label className='Lab'>City:</label></td>
                      <td>{personalData.city.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                    </tr>
                    <tr>
                      <td><label className='Lab'>State:</label></td>
                      <td>{personalData.state.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                    </tr>
                    <tr>
                      <td><label className='Lab'>Pin Code:</label></td>
                      <td>{personalData.pinCode}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No personal data found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="resume_right">
          <div className="resume_item resume_about">
          <div className="resume_item resume_education">
              <p className="bold">Education</p>
              {academyList.length === 0 ? (
                <p>No academic details available.</p>
              ) : (
                <ul>
                  {academyList.map((academy, index) => (
                    <li key={index}>
                      <p>Institute/University: {academy.Institute.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p>Degree: {academy.Degree.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p>Completion Year: {academy.CYear}</p>
                      <p>Completion Month: {academy.CMonth}</p>
                      <p>Description: {academy.Description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="resume_item resume_work">
              <p className="bold">Work Experience</p>
              {workList.length === 0 ? (
                <p>No work details available.</p>
              ) : (
                <ul>
                  {workList.map((work, index) => (
                    <li key={index}>
                      <p>Company Name: {work.Compny.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p>Role: {work.Role.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p>Start Year: {work.StartYear}</p>
                      <p>End Year: {work.EndYear}</p>
                      <p>Description: {work.Description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          
          </div>
          <button className="Button" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </>
  );
}

export default KL;
