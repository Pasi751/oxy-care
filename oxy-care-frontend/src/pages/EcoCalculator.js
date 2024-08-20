import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import './eco-calculator.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ecoCalculator from '../images/eco-calculator.jpg';
import axios from 'axios';

const EcoCalculator = ({ userRole }) => {


    const fileInputRef = useRef(null);

    const [showUpload, setShowUpload] = useState(true);
    const [showDownload, setShowDownload] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [totalEmissions, setTotalEmissions] = useState(0);
    const [csvData, setCsvData] = useState([]);
    const [urbanTrees, setUrbanTrees] = useState(0);
    const [userId, setUserId] = useState(null);
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isoFactors, setIsoFactors] = useState({
        electricity: 0,
        naturalGas: 0,
        heatingOil: 0,
        propane: 0,
        gasoline: 0,
        diesel: 0,
        rawMaterials: 0,
        wasteGeneration: 0,
        productionOutput: 0,
        transportation: 0,
        processEmissions: 0,
        waterUsage: 0,
        chemicalUsage: 0,
        packagingMaterials: 0,
        coolantsRefrigerants: 0,
        byproductUtilization: 0,
        supplyChainEmissions: 0,
        renewableEnergyUsage: 0,
        ccs: 0,
        landUseChanges: 0,
        methaneEmissions: 0,
        nitrousOxideEmissions: 0
    });


    const [electricity, setElectricity] = useState('');
    const [naturalGas, setNaturalGas] = useState('');
    const [heatingOil, setHeatingOil] = useState('');
    const [propane, setPropane] = useState('');
    const [gasoline, setGasoline] = useState('');
    const [diesel, setDiesel] = useState('');

    const [rawMaterials, setRawMaterials] = useState('');
    const [wasteGeneration, setWasteGeneration] = useState('');
    const [productionOutput, setProductionOutput] = useState('');
    const [transportation, setTransportation] = useState('');
    const [processEmissions, setProcessEmissions] = useState('');

    const [waterUsage, setWaterUsage] = useState('');
    const [chemicalUsage, setChemicalUsage] = useState('');
    const [packagingMaterials, setPackagingMaterials] = useState('');
    const [coolantsRefrigerants, setCoolantsRefrigerants] = useState('');
    const [byproductUtilization, setByproductUtilization] = useState('');
    const [supplyChainEmissions, setSupplyChainEmissions] = useState('');
    const [renewableEnergyUsage, setRenewableEnergyUsage] = useState('');
    const [ccs, setCcs] = useState('');
    const [landUseChanges, setLandUseChanges] = useState('');
    const [methaneEmissions, setMethaneEmissions] = useState('');
    const [nitrousOxideEmissions, setNitrousOxideEmissions] = useState('');


    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'));

        const username = userData.username;

        console.log(username);
        console.log(userData);
        axios.get(`http://localhost:8080/industrialist/${username}/id`)
            .then(response => {
                setUserId(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user ID:', error);
            });

        const fetchIsoFactors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/iso-factors/1');
                setIsoFactors(response.data);
            } catch (error) {
                console.error('Error fetching ISO factors:', error);
            }
        };
        fetchIsoFactors();

    }, []);


    const resetFormValues = () => {
        setElectricity('');
        setNaturalGas('');
        setHeatingOil('');
        setPropane('');
        setGasoline('');
        setDiesel('');

        setRawMaterials('');
        setWasteGeneration('');
        setProductionOutput('');
        setTransportation('');
        setProcessEmissions('');

        setWaterUsage('');
        setChemicalUsage('');
        setPackagingMaterials('');
        setCoolantsRefrigerants('');
        setByproductUtilization('');
        setSupplyChainEmissions('');
        setRenewableEnergyUsage('');
        setCcs('');
        setLandUseChanges('');
        setMethaneEmissions('');
        setNitrousOxideEmissions('');
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === 3) {
            calculateAndShowResult();
            resetFormValues();
        } else {
            handleNext();
        }


    };

    const calculateAndShowResult = () => {
        // const electricity = parseFloat(document.getElementById('electricity').value);
        // const naturalGas = parseFloat(document.getElementById('naturalGas').value);
        // const heatingOil = parseFloat(document.getElementById('heatingOil').value);
        // const propane = parseFloat(document.getElementById('propane').value);
        // const gasoline = parseFloat(document.getElementById('gasoline').value);
        // const diesel = parseFloat(document.getElementById('diesel').value);

        const totalEmissions = calculateCarbonFootprint(electricity, naturalGas, heatingOil, propane, gasoline, diesel, rawMaterials, wasteGeneration, productionOutput, transportation, processEmissions, waterUsage, chemicalUsage, packagingMaterials, coolantsRefrigerants, byproductUtilization, supplyChainEmissions, renewableEnergyUsage, ccs, landUseChanges, methaneEmissions, nitrousOxideEmissions) / 1000; // Convert kg to tons

        console.log(totalEmissions);

        const urbanTrees = calculateUrbanTrees(totalEmissions);

        setTotalEmissions(totalEmissions.toFixed(2));
        setUrbanTrees(Math.ceil(urbanTrees));
        setShowResult(true);

        const date = new Date().toISOString().split('T')[0];

        const carbonEmissionResult = {
            date: date,
            totalCarbonEmissions: totalEmissions.toFixed(2),
            urbanTreesNeeded: Math.ceil(urbanTrees),
        };

        axios.post(`http://localhost:8080/carbon-emission-results/industrialist/${userId}`, carbonEmissionResult)
            .then(response => {
                alert(response.data);
                formRef.current.reset();

                setCurrentStep(1); // Go back to step 1
            })
            .catch(error => {
                console.error('Failed to save Carbon Emission Result:', error);
                alert('Failed to save Carbon Emission Result. Please try again later.');
            });

    };

    const calculateCarbonFootprint = (electricity, naturalGas, heatingOil, propane, gasoline, diesel, rawMaterials, wasteGeneration, productionOutput, transportation, processEmissions, waterUsage, chemicalUsage, packagingMaterials, coolantsRefrigerants, byproductUtilization, supplyChainEmissions, renewableEnergyUsage, ccs, landUseChanges, methaneEmissions, nitrousOxideEmissions) => {



        var totalEmissions = (
            (electricity * isoFactors.electricity) +
            (naturalGas * isoFactors.naturalGas) +
            (heatingOil * isoFactors.heatingOil) +
            (propane * isoFactors.propane) +
            (gasoline * isoFactors.gasoline) +
            (diesel * isoFactors.diesel) +
            (rawMaterials * isoFactors.rawMaterials) +
            (wasteGeneration * isoFactors.wasteGeneration) +
            (productionOutput * isoFactors.productionOutput) +
            transportation +
            processEmissions +
            (waterUsage * isoFactors.waterUsage) +
            (chemicalUsage * isoFactors.chemicalUsage) +
            (packagingMaterials * isoFactors.packagingMaterials) +
            (coolantsRefrigerants * isoFactors.coolantsRefrigerants) +
            (byproductUtilization * isoFactors.byproductUtilization) +
            (supplyChainEmissions * isoFactors.supplyChainEmissions) +
            (renewableEnergyUsage * isoFactors.renewableEnergyUsage) +
            (ccs * isoFactors.ccs) +
            (landUseChanges * isoFactors.landUseChanges) +
            (methaneEmissions * isoFactors.methaneEmissions) +
            (nitrousOxideEmissions * isoFactors.nitrousOxideEmissions)
        );


        return totalEmissions;
    };

    const calculateUrbanTrees = (carbonFootprint) => {

        const treesPerTonCO2 = 2205 / 48;

        const urbanTrees = carbonFootprint * treesPerTonCO2;
        return urbanTrees;
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
        setShowResult(false)
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        setShowUpload(false);
        setShowDownload(true);
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target.result;
                const rows = text.split('\n');
                const headers = rows[0].split(',');
                const data = rows.slice(1).map(row => {
                    const values = row.split(',');
                    return headers.reduce((obj, header, index) => {
                        const value = values[index] ? values[index].trim() : ''; // Check if values[index] is defined
                        obj[header.trim()] = value;
                        return obj;
                    }, {});
                });
                setCsvData(data);
            };
            reader.readAsText(file);
        }
    };


    const handleDownload = () => {
        const results = csvData.map((row) => {
            const totalEmissions = calculateCarbonFootprintForRow(row);
            const urbanTrees = calculateUrbanTrees(totalEmissions);
            const date = new Date().toISOString().split('T')[0];
            return {
                date: date,
                totalEmissions: totalEmissions.toFixed(2),
                urbanTrees: Math.ceil(urbanTrees)
            };
        });

        setShowUpload(true);
        setShowDownload(false);

        // Create CSV content with headers
        let csv = 'date,total emission,urban trees needed\n';
        csv += results.map((row) => {
            return `${row.date},${row.totalEmissions},${row.urbanTrees}`;
        }).join('\n');

        // Convert CSV content to Blob
        const csvBlob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(csvBlob);

        // Create a link to download the CSV file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'carbon-emission-results.csv';
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };


    const calculateCarbonFootprintForRow = (row) => {
        // Calculate carbon footprint for the row using values from the row and isoFactors
        // For example:
        const totalEmissions = (
            (parseFloat(row['Electricity Usage']) * isoFactors.electricity) +
            (parseFloat(row['Natural Gas Consumption']) * isoFactors.naturalGas) +
            (parseFloat(row['Heating Oil Usage']) * isoFactors.heatingOil) +
            (parseFloat(row['Propane Usage']) * isoFactors.propane) +
            (parseFloat(row['Gasoline Usage']) * isoFactors.gasoline) +
            (parseFloat(row['Diesel Usage']) * isoFactors.diesel) +
            (parseFloat(row['Raw Materials']) * isoFactors.rawMaterials) +
            (parseFloat(row['Waste Generation']) * isoFactors.wasteGeneration) +
            (parseFloat(row['Production Output']) * isoFactors.productionOutput) +
            parseFloat(row['Transportation']) +
            parseFloat(row['Process Emissions']) +
            (parseFloat(row['Water Usage']) * isoFactors.waterUsage) +
            (parseFloat(row['Chemical Usage']) * isoFactors.chemicalUsage) +
            (parseFloat(row['Packaging Materials']) * isoFactors.packagingMaterials) +
            (parseFloat(row['Coolants and Refrigerants']) * isoFactors.coolantsRefrigerants) +
            (parseFloat(row['Byproduct Utilization']) * isoFactors.byproductUtilization) +
            (parseFloat(row['Supply Chain Emissions']) * isoFactors.supplyChainEmissions) +
            (parseFloat(row['Renewable Energy Usage']) * isoFactors.renewableEnergyUsage) +
            (parseFloat(row['CCS (Carbon Capture and Storage)']) * isoFactors.ccs) +
            (parseFloat(row['Land Use Changes']) * isoFactors.landUseChanges) +
            (parseFloat(row['Methane Emissions']) * isoFactors.methaneEmissions) +
            (parseFloat(row['Nitrous Oxide Emissions']) * isoFactors.nitrousOxideEmissions)
        );
        return totalEmissions;
    };


    const renderForm = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h1>Eco-Credit calculator</h1>

                        <label htmlFor='electricity'>Electricity (kWh):</label>
                        <input type='number' id='electricity' name='electricity' value={electricity} onChange={(e) => setElectricity(e.target.value)} required />

                        <label htmlFor='naturalGas'>Natural Gas (cubic meters):</label>
                        <input type='number' id='naturalGas' name='naturalGas' value={naturalGas} onChange={(e) => setNaturalGas(e.target.value)} required />

                        <label htmlFor='heatingOil'>Heating Oil (liters):</label>
                        <input type='number' id='heatingOil' name='heatingOil' value={heatingOil} onChange={(e) => setHeatingOil(e.target.value)} required />

                        <label htmlFor='propane'>Propane (liters):</label>
                        <input type='number' id='propane' name='propane' value={propane} onChange={(e) => setPropane(e.target.value)} required />

                        <label htmlFor='gasoline'>Gasoline (liters):</label>
                        <input type='number' id='gasoline' name='gasoline' value={gasoline} onChange={(e) => setGasoline(e.target.value)} required />

                        <label htmlFor='diesel'>Diesel (liters):</label>
                        <input type='number' id='diesel' name='diesel' value={diesel} onChange={(e) => setDiesel(e.target.value)} required />

                    </>
                );
            case 2:
                return (
                    <>
                        <h2>Industry Parameters</h2>

                        <label for="rawMaterials">Raw Material Consumption (kg):</label>
                        <input type="number" id="rawMaterials" required value={rawMaterials} onChange={(e) => setRawMaterials(e.target.value)} />

                        <label for="wasteGeneration">Waste Generation (kg):</label>
                        <input type="number" id="wasteGeneration" required value={wasteGeneration} onChange={(e) => setWasteGeneration(e.target.value)} />

                        <label for="productionOutput">Production Output (units):</label>
                        <input type="number" id="productionOutput" required value={productionOutput} onChange={(e) => setProductionOutput(e.target.value)} />

                        <label for="transportation">Transportation Emissions (kgCO2):</label>
                        <input type="number" id="transportation" required value={transportation} onChange={(e) => setTransportation(e.target.value)} />

                        <label for="processEmissions">Process Emissions (kgCO2):</label>
                        <input type="number" id="processEmissions" required value={processEmissions} onChange={(e) => setProcessEmissions(e.target.value)} />
                    </>
                );
            case 3:
                return (
                    <>
                        <h2>Additional Industry Parameters</h2>

                        <label for="waterUsage">Water Usage (m3):</label>
                        <input type="number" id="waterUsage" required value={waterUsage} onChange={(e) => setWaterUsage(e.target.value)} />

                        <label for="chemicalUsage">Chemical Usage (kg):</label>
                        <input type="number" id="chemicalUsage" required value={chemicalUsage} onChange={(e) => setChemicalUsage(e.target.value)} />

                        <label for="packagingMaterials">Packaging Materials (kg):</label>
                        <input type="number" id="packagingMaterials" required value={packagingMaterials} onChange={(e) => setPackagingMaterials(e.target.value)} />

                        <label for="coolantsRefrigerants">Coolants/Refrigerants (kgCO2):</label>
                        <input type="number" id="coolantsRefrigerants" required value={coolantsRefrigerants} onChange={(e) => setCoolantsRefrigerants(e.target.value)} />

                        <label for="byproductUtilization">Byproduct Utilization (kgCO2):</label>
                        <input type="number" id="byproductUtilization" required value={byproductUtilization} onChange={(e) => setByproductUtilization(e.target.value)} />

                        <label for="supplyChainEmissions">Supply Chain Emissions (kgCO2):</label>
                        <input type="number" id="supplyChainEmissions" required value={supplyChainEmissions} onChange={(e) => setSupplyChainEmissions(e.target.value)} />

                        <label for="renewableEnergyUsage">Renewable Energy Usage (kgCO2):</label>
                        <input type="number" id="renewableEnergyUsage" required value={renewableEnergyUsage} onChange={(e) => setRenewableEnergyUsage(e.target.value)} />

                        <label for="ccs">Carbon Capture and Storage (kgCO2):</label>
                        <input type="number" id="ccs" required value={ccs} onChange={(e) => setCcs(e.target.value)} />

                        <label for="landUseChanges">Land Use Changes (kgCO2):</label>
                        <input type="number" id="landUseChanges" required value={landUseChanges} onChange={(e) => setLandUseChanges(e.target.value)} />

                        <label for="methaneEmissions">Methane Emissions (kgCO2):</label>
                        <input type="number" id="methaneEmissions" required value={methaneEmissions} onChange={(e) => setMethaneEmissions(e.target.value)} />

                        <label for="nitrousOxideEmissions">Nitrous Oxide Emissions (kgCO2):</label>
                        <input type="number" id="nitrousOxideEmissions" required value={nitrousOxideEmissions} onChange={(e) => setNitrousOxideEmissions(e.target.value)} />
                    </>
                );
            default:
                return null;
        }


    };

    return (
        <>
            <Navbar userRole={userRole} />
            <div className='eco-credit-calculator-container'>
                <div className='eco-credit-calculator-container-left'>
                    <img src={ecoCalculator} alt='eco-calculator' />
                </div>
                <div className='eco-credit-calculator-container-right'>
                    <form className='eco-calculator-form-grid' onSubmit={handleSubmit} ref={formRef}>
                        {renderForm()}
                        <div className='form-buttons'>
                            {currentStep !== 1 && <button type='button' onClick={handlePrevious}>Previous</button>}
                            {currentStep !== 3 ? <button type='submit'>Next</button> : <button type='submit'>Submit</button>}
                        </div>
                    </form>
                    {showResult && (
                        <div className='result-section'>
                            <h2>Result:</h2>
                            <p className='carbon-emission'>Your total carbon emissions: {totalEmissions} tons CO2</p>
                            <p className='trees'>Equivalent urban trees needed to offset the emissions: {urbanTrees} trees</p>
                        </div>
                    )}
                    <div className='upload-download-section'>
                        {showUpload && (
                            <div className='upload-section' onClick={() => fileInputRef.current.click()}>
                                <input
                                    id='file-upload'
                                    type='file'
                                    onChange={handleUpload}
                                    ref={fileInputRef}
                                    style={{ display: 'none', width: '100%', height: '150px' }}
                                />
                                <div className='upload-icon'>
                                    <faUpload />
                                </div>
                                <h2>Upload CSV File Here</h2>
                            </div>
                        )}
                        {showDownload && (
                            <div className='download-section' onClick={handleDownload}>
                                <div className='download-icon'>
                                    <faDownload />
                                </div>
                                <h2>Download Results:</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EcoCalculator;
