import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";
// import { Select } from "antd";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
// core components
import Select from "react-select";

const { Option } = Select;

const AddHospital = ({ openModal, handleModal, getHospitals }) => {
    const [schools, setSchools] = useState([]);
    // const [selectedSchools, setSelectedSchools] = useState([]);
    useEffect(() => {
    getSchools();
  }, []);

  const getSchools = async () => {
    const data = await api("get", "/v1/schools");

    
      setSchools(data.schools?.filter(schoole=>schoole.active))
  
  };
  let [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    schools:[]
  });

  const handleInput = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
    if (hospital.name == "") {
      return toast.error("Please enter hospital's name");
    }

    if (hospital.email == "") {
      return toast.error("Please enter email");
    }
    if (!(hospital.email.includes(".") && hospital.email.includes("@"))) {
      return toast.error("Please enter a valid email");
    }
    if (hospital.password == "") {
      return toast.error("Password is required");
    }
    if (hospital.password.length < 8) {
      return toast.error("Passwords should be of atleast 8 letters");
    }
    if (hospital.address == "") {
      return toast.error("Address is required");
    }
    if (hospital.schools.length === 0) {
      return toast.error("Please Select School");
    }
    console.log(hospital)

    api("post", "/v1/hospitals", hospital).then((res) => {
      toast.success("Hospital added successfully");
      getHospitals();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a hospital
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {hospital.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter hospital's name here"
                          type="text"
                          value={hospital.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {hospital.email ? "" : "*"}{" "}
                          </span>
                          Email
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter hospital's email here"
                          type="email"
                          value={hospital.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          <span style={{ color: "red" }}>
                            {hospital.password ? "" : "*"}{" "}
                          </span>
                          Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="Password"
                          type="password"
                          value={hospital.password}
                          name="password"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                       <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {hospital.address ? "" : "*"}{" "}
                          </span>{" "}
                          Address
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter hospital's Address here"
                          type="text"
                          value={hospital.address}
                          name="address"
                          onChange={handleInput}
                          maxLength="11"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {hospital.address ? "" : "*"}{" "}
                          </span>{" "}
                          School
                        </label>
                         <Select
                              onChange={(e) =>
                                setHospital((hospital) => ({
                                  ...hospital,
                                  schools: e.map((school) => school.value),
                                }))
                              }
                              name="schools"
                              isMulti
                              className="form-control-alternative"
                              options={schools?.map((school) => ({
                                value: school?._id,
                                label: `${school?.name}`,
                              }))}
                            />
                      </FormGroup>
                    </Col>
                  </Row>
              
            
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddHospital;
