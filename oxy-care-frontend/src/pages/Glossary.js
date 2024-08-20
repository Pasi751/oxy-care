import React from 'react';
import './glossary.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Glossary = ({userRole}) => {
    return (
        <>
        <Navbar userRole={userRole} />
        <div className='educational-container-1'>
            <h1> Carbon Management Glossary</h1>
            <div className='glossary-container'>
                <h2>1. Carbon Footprint</h2>
                <p>The total amount of greenhouse gases, especially carbon dioxide, that are emitted directly or indirectly by an individual, organization, event, or product throughout its lifecycle. It is usually measured in equivalent tons of carbon dioxide (CO2e).</p>

                <h2>2. Carbon Sequestration</h2>
                <p>The process of capturing and storing atmospheric carbon dioxide to mitigate or combat global warming and climate change. This can occur through natural processes (e.g., plant photosynthesis) or through human-engineered methods (e.g., carbon capture and storage technologies).</p>

                <h2>3. Carbon Capture And Storage (CCS)</h2>
                <p>A technology that captures carbon dioxide emissions produced from the use of fossil fuels in electricity generation and industrial processes, preventing it from entering the atmosphere. The captured CO2 is then transported and securely stored underground.</p>

                <h2>4. Carbon Offset</h2>
                <p>A reduction in emissions of greenhouse gases to compensate for emissions produced elsewhere. This is often achieved through projects that sequester or reduce the equivalent amount of carbon dioxide emitted.</p>

                <h2>5. Carbon Neutral</h2>
                <p>A state in which an individual, organization, or activity has a net zero carbon footprint, meaning that the amount of carbon dioxide emitted is offset by an equivalent amount of carbon removed from the atmosphere or by purchasing carbon credits.</p>

                <h2>6. Carbon Credits</h2>
                <p>Units of measurement representing a reduction or removal of one metric ton of carbon dioxide or its equivalent in other greenhouse gases. These credits can be traded or sold as part of a market-based approach to incentivize emissions reduction.</p>

                <h2>7. Carbon Cycle</h2>
                <p>The natural process by which carbon is exchanged between the Earth's atmosphere, oceans, soil, plants, and animals. It involves processes such as photosynthesis, respiration, decomposition, and combustion.</p>

                <h2>8. Carbon Trading</h2>
                <p>A system that allows entities to buy or sell carbon credits in order to meet their emission reduction targets. It is a market-based approach to incentivize the reduction of greenhouse gas emissions.</p>

                <h2>9. Carbon Offset Projects</h2>
                <p>Initiatives or activities designed to reduce or remove greenhouse gas emissions, such as reforestation, renewable energy projects, or methane capture from landfills. These projects generate carbon credits that can be used to offset emissions.</p>

                <h2>10. Carbon Management</h2>
                <p>The strategic planning and implementation of measures to monitor, reduce, and offset carbon emissions in order to minimize the impact on the environment and climate change.</p>

                <h2>11. Carbon Calculator</h2>
                <p>A Carbon Calculator is a digital tool that quantifies greenhouse gas emissions associated with activities, aiding individuals or organizations in understanding and mitigating their carbon footprint. By inputting relevant data, users receive estimates to make informed decisions for adopting more sustainable practices.</p>

            </div>
        </div>
        <Footer />
        </>
    )
}

export default Glossary
