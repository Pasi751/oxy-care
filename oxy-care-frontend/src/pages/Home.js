import React from 'react'
import './Home.css';
import Navbar from '../components/Navbar';
import image1 from '../images/5278470.jpg';
import image2 from '../images/6230656.jpg';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const Home = () => {
  const cardData = [
    {
      title: 'Carbon Footprint Assessment',
      image: 'url_to_image',
      description: 'ORCMS is dedicated to providing comprehensive carbon footprint assessment services, ensuring a thorough evaluation of environmental impact and sustainability.'
    },
    {
      title: 'Collaboration Services',
      image: 'url_to_image',
      description: 'ORCMS facilitates seamless collaboration with agriculturists, creating a platform for industrialists to engage in environmentally impactful projects and initiatives.'
    },
    {
      title: 'Carbon Trading Platform',
      image: 'url_to_image',
      description: 'ORCMS establishes a robust carbon trading platform, fostering transparent exchange and efficient trading of carbon credits between industrialists and agriculturists.'
    },
    {
      title: 'Our Carbon Solutions',
      image: 'url_to_image',
      description: 'Embark on a sustainable journey with ORCMS, where cutting-edge carbon solutions meet a commitment to greening Pakistan, fostering eco-friendly practices for a sustainable future.'
    },
    {
      title: 'Education Module',
      image: 'url_to_image',
      description: 'Enroll in Climate Class, our educational hub empowering you with knowledge on climate change and carbon emissions for a sustainable tomorrow.'
    },
    {
      title: 'Agriculturist Platform',
      image: 'url_to_image',
      description: 'ORCMS empowers agriculturists with a user-friendly platform, making it easy to earn through sustainable initiatives like tree planting and carbon sequestration.'
    }
  ];

  return (
    <div>
      <Navbar />
      <div class="home-top-container">
        <div class="home-top-container-left">
          <img src={image1} alt="home-image" />
        </div>
        <div class="home-top-container-right">

          <h1>
            Oxygen Rich Carbon Management System
          </h1>
          <p>
            Bridging Industries and Agriculture for Sustainable Impact ORCMS revolutionizes
            carbon management by offering industrialists data-driven insights for informed
            decisions and proactive measures through transparent carbon credit trading.
            Simultaneously, agriculturists benefit from a user-friendly interface for tree
            planting initiatives and active participation in a fair marketplace. The system's
            Collaboration Module fosters partnerships, creating a harmonized ecosystem that
            maximizes emission reduction and promotes sustainable practices for both sectors.
            ORCMS stands as a unifying force, addressing the unique needs of industrial and
            agricultural stakeholders in the global mission to combat climate change.
          </p>
        </div>
      </div>

      <div className='home-card-container'>

        <div id='services' className='card-container-title'>
          <h1>
            Our services
          </h1>
        </div>
        <div className='card-container'>
          {cardData.map((card, index) => (
            <Card key={index} index={index} title={card.title} description={card.description} />
          ))}
        </div>
      </div>

      <div className='home-bottom-container'>
        <div className='home-bottom-container-left'>
          <h1>
            Our Business Model
          </h1>
          <p>
            ORCMS is your comprehensive partner in carbon management, offering a meticulous approach that begins with a thorough exploration of your business domain. Our adept team of experts and developers is committed to identifying the most fitting solution tailored to your specific needs. Upon approval, we initiate the development process, utilizing cutting-edge technology stacks and ensuring consistent client briefings. Rigorous testing, continuous maintenance, and steadfast operational support are seamlessly integrated into our deployment process. Moreover, ORCMS taps into the knowledge of our global network of academics and experts to deliver a solution that is both robust and innovative.
            Thorough understanding of your business domain to tailor solutions accordingly.
            A dedicated team of experts and developers committed to delivering optimal solutions.
            Employing state-of-the-art technology stacks for efficient and modern development.
            Ensuring consistent communication to keep clients informed and involved throughout the development journey.
            Rigorous testing processes to guarantee the reliability and functionality of the solution.
            Continuous post-deployment maintenance to address evolving needs and ensure sustained performance.
            Providing steadfast operational support to ensure seamless functionality.
          </p>
        </div>
        <div className='home-bottom-container-right'>
          <img src={image2} alt="home-image-bottom" />
        </div>
      </div>


      <div className="home-bottom-image-container">
        <div className='home-bottom-image-container-left'>
          <h1>
            Climate Change In Pakistan
          </h1>
          <p>
            As the specter of climate change casts its impact across Pakistan, 
            cities grapple with its effects on a heightened scale. 
            ORCMS (Oxygen Rich Carbon Management System) takes a stand 
            as a catalyst for change, actively raising awareness about the 
            pressing issue of climate change in various cities across the nation. 
            From Karachi to Islamabad, Lahore to Peshawar, ORCMS is committed to
             addressing the diverse challenges posed by climate change.
            "Join us in our mission to confront these issues head-on and foster 
            sustainable practices for a resilient and eco-friendly future."
          </p>
        </div>
        <div className='home-bottom-image-container-right'>
          <Carousel />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
