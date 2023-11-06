import "./PatientsList.css";
import { useNavigate } from "react-router-dom";
import { IPatient } from "../../features/patients/patientModel";
import { MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getVotPatientList,
} from "../../features/votPatients/votPatientSlice";
import Spinner from "../Spinner/Spinner";

type PatientsListProp = {
  title: string;
  list: IPatient[];
  isVOT: boolean;
};

const PatientsList = ({ title, list, isVOT }: PatientsListProp) => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(
    (state: RootState) => state.votPatientState.loading
  );

  const handleRefresh = () => {
    if (loading === "pending") {
      return;
    }
    dispatch(getVotPatientList());
  };

  const navigate = useNavigate();
  const iconStyles = { color: "white !important" };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="mb-0">{title}</h5>
        <div className="d-flex">
          <button
            className="btn action-button refresh-button"
            onClick={handleRefresh}
          >
            <MdRefresh size={20} style={iconStyles} />
          </button>
          <div className="line"></div>
          <button
            className="btn action-button"
            onClick={() => navigate("/add-patient")}
          >
            New Patient
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Township</th>
              <th>Serial Number</th>
              <th>Registration Date</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Address</th>
              <th>Treatment Start Date</th>
              <th>VOT</th>
              <th>Username</th>
              <th>Password</th>
              {isVOT && <th>VOT Status</th>}
            </tr>
          </thead>
          <tbody>
            {loading === "pending" ? (
              <tr>
                <td colSpan={12}>
                  <div className="empty">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : list.length == 0 ? (
              <tr>
                <td colSpan={12}>
                  <div className="empty">Empty</div>
                </td>
              </tr>
            ) : (
              list.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.township}</td>
                  <td>{patient.serialNo}</td>
                  <td>{new Date(patient.regdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td>{patient.name}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.age}</td>
                  <td>{patient.address}</td>
                  <td>{new Date(patient.treatmentStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td>{patient.vot ? "Yes" : "No"}</td>
                  <td>{patient.username}</td>
                  <td>{patient.password}</td>
                  {isVOT && (
                    <td>
                      {patient.votstatus == "001" && (
                        <span className="successful">Successful</span>
                      )}
                      {patient.votstatus == "002" && (
                        <span className="unsuccessful">Unsuccessful</span>
                      )}
                      {patient.votstatus == "" && <span>-</span>}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientsList;
