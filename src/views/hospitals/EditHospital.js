import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Select from "react-select";
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
} from "reactstrap";
// core components

const { Option } = Select;

const EditHospital = ({ openModal, handleModal, hospital, setHospital, getHospitals }) => {
  console.log("hospitals",hospital)
      const [schools, setSchools] = useState([]);
    // const [selectedSchools, setSelectedSchools] = useState([]);
    useEffect(() => {
    getSchools();
  }, []);

  const getSchools = async () => {
    const data = await api("get", "/v1/schools");

    
      setSchools(data.schools?.filter(schoole=>schoole.active))
  
  };
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

    if (hospital.password && hospital.password.length < 8) {
      return toast.error("Passwords should be of atleast 8 letters");
    }

     if (hospital.address == "") {
      return toast.error("Address is required");
    }
    if (hospital.schools.length === 0) {
      return toast.error("Please Select School");
    }
    api("put", `/v1/hospitals/${hospital._id}`, hospital).then((res) => {
      toast.success("hospital edited successfully");
      getHospitals();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a hospital
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <span style={{ color: "red" }}>
                          {hospital.name ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">Name</label>
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
                        <span style={{ color: "red" }}>
                          {hospital.email ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">Email</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter hospital's email here"
                          type="email"
                          value={hospital.email}
                          disabled
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
                          Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="Password"
                          type="password"
                          value={hospital.password}
                          disabled
                          name="password"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <span style={{ color: "red" }}>
                          {hospital.number ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">
                          Address
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter hospital's contact here"
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
                              defaultValue={hospital.schools?.map((school) => ({
                                value: school?._id,
                                label: `${school?.name}`,
                              }))}
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditHospital;
