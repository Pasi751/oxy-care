import React, { useState, useEffect } from 'react';
import './educational.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import map from '../images/map.png';
import temperatue from '../images/temperatue.png';
import greenhouse from '../images/greenhouse.png';

const pages = [
  {
    title: "Climate Chang In Pakistan",
    content: `
      Climate change in Pakistan is a major issue for the country.
      Pakistan is highly vulnerable to climate change. As with the
      changing climate in South Asia as a whole, the climate of Pakistan
      has changed over the past several decades, with significant impacts on
      the environment and people. In addition to increased heat, drought and
      extreme weather in parts of the country, the melting of glaciers in the
      Himalayas has impacted some of the important rivers of Pakistan.
      Between 1999 and 2018, Pakistan ranked 5th in the countries affected
      by extreme weather caused by climate change. Pakistan is prone to a
      range of natural disasters, including cyclones, floods, drought, intense
      rainfall, and earthquakes. According to scientific research, climate change
      played a substantial role in the devastating floods of 2022, which had a direct
      impact on over 30 million people in Pakistan, resulting in the loss of lives,
      damage to public infrastructure, and displacement from homes. Climate change
      poses a significant menace to Pakistan's economy and security.
    `,
    img: map
  },
  {
    title: "Temperature Change In Pakistan",
    content: `
    `,
    img: temperatue
  },
  {
    title: "Greenhouse Gases By Pakistan",
    content: `
    Pakistan's greenhouse gas (GHG) emissions are less than 1% of the world total, and GHG emissions per person, 
    at 2 tonnes per year, are less than half the global average. In 2015 GHG emissions totalled 408 
    million tonnes of CO2eq; of which 43% was from agriculture in Pakistan; and 46% from energy in 
    Pakistan, such as burning fuel for heat, to power transport, and generate electricity Agricultural 
    GHG are mostly methane and nitrous oxide. Methane comes from belching cattle, sheep and goats; 
    manure management; and rice cultivation. Nitrous oxide is mainly from agricultural soils due to 
    the application of synthetic fertilizers, farmyard manure, and crop residue mixes after burning.
    Energy GHG is mostly carbon dioxide: in 2019 burning fossil gas, coal and oil each emitted around 
    80 million tonnes.[8] It has been suggested[by whom?] that stricter measures against air pollution 
    in Pakistan might include actions that would also limit GHG emissions, such as increasing tax on motor 
    fuels. In 2020 Prime Minister Imran Khan said that no more coal-fired power stations in Pakistan would 
    be given permits. However coal-fired power stations which have already been given permits are expected 
    to be constructed
    `,
    img: greenhouse
  },

];



const Educational = ({ userRole }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='educational-container'>
        <div className='educational-page'>
          <h1>{pages[currentPage - 1].title}</h1>
          <p>{pages[currentPage - 1].content}</p>
          <img src={pages[currentPage - 1].img} alt='map' />
        </div>
        <div className='pagination'>
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          {Array.from({ length: pages.length }, (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
          ))}
          <button onClick={handleNext} disabled={currentPage === pages.length}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Educational;
