import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carbon-history.css'
import historyImage from '../images/history-image.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const CarbonHistory = ({ userRole }) => {


    const [calculationHistory, setCalculationHistory] = useState([]);

    useEffect(() => {

        // Assuming you have a function to retrieve username from local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        const username = userData.username;

        axios.get(`http://localhost:8080/industrialist/${username}/id`)
            .then(response => {
                fetchCalculationHistory(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user ID:', error);
            });

    }, []);

    const fetchCalculationHistory = (userId) => {
        axios.get(`http://localhost:8080/carbon-emission-results/industrialist/${userId}`)
            .then(response => {
                setCalculationHistory(response.data);
            })
            .catch(error => {
                console.error('Error retrieving calculation history:', error);
            });
    };

    const downloadCSV = () => {
        const header = ['Date', 'Total Emissions (tons CO2)', 'Urban Trees'];
        const rows = calculationHistory.map(calculation => [
            calculation.date,
            calculation.totalCarbonEmissions,
            calculation.urbanTreesNeeded
        ]);

        const csvContent = [
            header.join(','), // Join header with commas
            ...rows.map(row => row.join(',')) // Join each row with commas
        ].join('\n'); // Join rows with newlines

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'calculation_history.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <>
            <Navbar userRole={userRole} />
            <div className='eco-history-container-1'>
                <div className='eco-history-container-left'>
                    <img src={historyImage} alt='history-image' />
                </div>
                <div className='eco-history-container-right'>
                    <h2>Calculation History</h2>
                    {calculationHistory.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Emissions (tons CO2)</th>
                                        <th>Urban Trees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calculationHistory.map((calculation, index) => (
                                        <tr key={index}>
                                            <td>{calculation.date}</td>
                                            <td>{calculation.totalCarbonEmissions}</td>
                                            <td>{calculation.urbanTreesNeeded}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={downloadCSV} className='download-report-btn'>Download Report</button>
                        </>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CarbonHistory
