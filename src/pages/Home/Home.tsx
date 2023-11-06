import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import Patients from './../../assets/patients.png';
import VOTPatients from './../../assets/patients.png';
import HomeCard from '../../components/HomeCard/HomeCard';

const Home = () => {
  return (
    <>
    <NavBar></NavBar>
    <div className="d-flex justify-content-center align-items-center menu-container">
      <div className="glass-card p-4">
        <HomeCard img={Patients} name="Patients" link="/patients"/>
        <HomeCard img={VOTPatients} name="VOT Patients" link="/vot-patients"/>
      </div>
    </div>
    </>
  );
}

export default Home;