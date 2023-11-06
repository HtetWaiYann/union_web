import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { saveVOTPatient } from "../../features/votPatients/votPatientSlice";
import { IPatient } from "../../features/patients/patientModel";
import Spinner from "../../components/Spinner/Spinner";
import { notify } from "../../utils/toast";

export const AddPatient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.votPatientState.loading
  );
  const isLoading = loading === "pending";

  const townships = ["AMP", "AMT", "CAT", "CMT", "PTG", "PGT", "MHA"];
  const sexes = ["Male", "Female"];
  const votOptions = ["Yes", "No"];
  const navigate = useNavigate();

  const [patient, setPatient] = useState<IPatient>({
    township: "",
    serialNo: "",
    regdate: "",
    name: "",
    sex: "",
    age: "",
    address: "",
    treatmentStartDate: "",
    vot: "",
    username: "",
    password: "",
    votstatus: "",
  });

  const handleChange = (event: any) => {
    const updatedPatient = {
      ...patient,
      [event.target.name]: event.target.value,
    };

    setPatient(updatedPatient);

    if (
      event.target.name === "township" ||
      event.target.name === "serialNo" ||
      event.target.name === "regdate"
    ) {
      const year = updatedPatient.regdate.split("-")[0];
      setPatient({
        ...updatedPatient,
        username: `${updatedPatient.township}_${updatedPatient.serialNo}_${year}`,
      });
    }
  };


  const handleSubmit = (event: any) => {
    if (isLoading) {
      return;
    }
    event.preventDefault();
    const formattedAge = Number(patient.age);
    const formattedPassword = Number(patient.password);
    
    if (patient.township == "") {
      notify("Please select township.");
    } else if (patient.serialNo == "") {
      notify("Please fill serial number.");
    } else if (patient.regdate == "") {
      notify("Please fill registration date.");
    } else if (patient.name == "") {
      notify("Please fill name.");
    } else if (patient.sex == "") {
      notify("Please select sex.");
    } else if (patient.age == "") {
      notify("Please fill age.");
    } else if (patient.address == "") {
      notify("Please fill address.");
    } else if (patient.treatmentStartDate == "") {
      notify("Please fill treatment start date.");
    } else if (patient.vot == "") {
      notify("Please select VOT.");
    } else if (patient.password == "") {
      notify("Please fill password.");
    } else if (isNaN(formattedAge) || formattedAge < 0 || formattedAge > 120) {
      notify("Invalid Age");
    } else if (patient.address.length > 40) {
      notify("Address is too long");
    } else if (isNaN(formattedPassword) || formattedPassword < 0) {
      notify("Invalid Password");
    } else if (patient.password.length != 4) {
      notify("Password should be 4 digits.");
    } else {
      dispatch(saveVOTPatient(patient)).then((response: any) => {
        if (response.error) {
          notify(response.payload);
        } else {
          if (patient.vot === "Yes") {
            navigate("/vot-patients");
          } else {
            navigate("/patients");
          }
        }
      });
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="container-fluid pt-3">
        <h5 className="mb-4">Add Patient</h5>
        <div className="my-glass-card mx-auto ">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Township</label>
                <select
                  name="township"
                  value={patient.township}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                >
                  <option value="">Select...</option>
                  {townships.map((township) => (
                    <option key={township} value={township}>
                      {township}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Serial Number</label>
                <input
                  type="text"
                  name="serialNo"
                  value={patient.serialNo}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Registration Date</label>
                <input
                  type="date"
                  name="regdate"
                  value={patient.regdate}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Sex</label>
                <select
                  name="sex"
                  value={patient.sex}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                >
                  <option value="">Select...</option>
                  {sexes.map((sex) => (
                    <option key={sex} value={sex}>
                      {sex}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Treatment Start Date</label>
                <input
                  type="date"
                  name="treatmentStartDate"
                  value={patient.treatmentStartDate}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">VOT</label>
                <select
                  name="vot"
                  value={patient.vot as string}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                >
                  <option value="">Select...</option>
                  {votOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={patient.username}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="number"
                  name="password"
                  value={patient.password}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group col-md-6 d-flex align-items-end justify-content-end mb-3">
                <div>
                  <button
                    type="submit"
                    className="btn action-button"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
