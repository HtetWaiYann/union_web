import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar"
import PatientsList from "../../components/PatientsList/PatientsList"
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getVotPatientList } from "../../features/votPatients/votPatientSlice";

const Patients = () => {
  const allPatientList =  useSelector((state: RootState) => state.votPatientState.patients);
  const patientList = allPatientList.filter((patient: any)=> !patient.vot)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getVotPatientList());
  }, [dispatch])


  return (
    <>
      <NavBar></NavBar>
      <div className="container-fluid pt-3">
        <PatientsList list={patientList} title="Patients" isVOT={false}></PatientsList>
      </div>
    </>
  )
}

export default Patients