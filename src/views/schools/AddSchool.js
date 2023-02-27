import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
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

const { Option } = Select;


const AddSchool = ({ openModal, handleModal, getSchools }) => {
  let [school, setSchool] = useState({
    name: "",
    domain_name:"",
    email: "",
    description: "",
    address: "",
  });

  const handleInput = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (school.name == "") {
      return toast.error("Please enter school's name");
    }

    if (school.email == "") {
      return toast.error("Please enter email");
    }
    if (!(school.email.includes(".") && school.email.includes("@"))) {
      return toast.error("Please enter a valid email");
    }
    if (school.domain_name == "") {
      return toast.error("domain_name is required");
    }
  
    if (school.description == "") {
      return toast.error("Contact no. is required");
    }

    if (school.address == "") {
      return toast.error("address is required");
    }

    api("post", "/v1/schools", school).then((res) => {
      toast.success("School added successfully");
      getSchools();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a school
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
                            {school.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter school's name here"
                          type="text"
                          value={school.name}
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
                            {school.email ? "" : "*"}{" "}
                          </span>
                          Email
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter school's email here"
                          type="email"
                          value={school.email}
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
                            {school.domain_name ? "" : "*"}{" "}
                          </span>
                          Domain_Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-domain_name"
                          placeholder="domain_name"
                          type="text"
                          value={school.domain_name}
                          name="domain_name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {school.description ? "" : "*"}{" "}
                          </span>{" "}
                          Descripton
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter school's contact here"
                          type="text"
                          value={school.description}
                          name="description"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Address</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter school's address here"
                          type="text"
                          value={school.address}
                          name="address"
                          onChange={handleInput}
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

export default AddSchool;
