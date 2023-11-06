import { useNavigate } from "react-router-dom";
import './HomeCard.css'

type HomeCardProps = {
  img: any;
  name: string;
  link: string;
};

const HomeCard = ({ img, name, link }: HomeCardProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(link);
  };
  return (
    <>
      <div className="custom-card m-2 px-3" onClick={handleOnClick}>
        <div>
          <img src={img} alt="Patients"></img>
        </div>
        <div>{name}</div>
      </div>
    </>
  );
};

export default HomeCard;
