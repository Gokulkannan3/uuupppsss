import React, { useState, useEffect } from 'react';
import './ProgressBar.css';
import Navbar from '../Nav';
import Footer from '../Footer';
import { Link, useParams, useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const [apiData, setApiData] = useState({ status: '' });
  const { awbNumber, sender_data, origin_data, destination_data } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("Received Data:", location.state);
    fetch(`http://192.168.43.215:8080/rfid/getstat/${awbNumber}`)
      .then((response) => response.text())
      .then((data) => {
        setApiData({ status: data.trim() });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [awbNumber, location.state]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 3000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, []);

  const labels = ['DISPATCHED', 'REACHED', 'REACHED HUB 1', 'REACHED HUB 2', 'OUTFORDEL'];

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className="progress-bar">
        <div className="progress-labels">
          {labels.map((label) => (
            <div
              key={label}
              className={`progress-label ${apiData.status === label ? 'active' : ''}`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      {apiData.status === 'OUTFORDEL' && (
        <Link to='/map'>
          <button className="bg-amber-400 hover:bg-amber-300 rounded-full h-11 w-24 text-black font-semibold mt-5 ml-56 -translate-y-20">
            Track
          </button>
        </Link>
      )}
      <div>
        <h2>Shipping Details</h2>
        <table>
          <tbody>
            <tr>
              <td>AWB:</td>
              <td>{awbNumber}</td>
            </tr>
            <tr>
              <td>Sender Data:</td>
              <td>{sender_data}</td>
            </tr>
            <tr>
              <td>Origin Data:</td>
              <td>{origin_data}</td>
            </tr>
            <tr>
              <td>Destination:</td>
              <td>{destination_data}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );
};

export default ProgressBar;
