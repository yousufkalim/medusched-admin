import { useEffect, useState } from "react";
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
} from "reactstrap";
// core components

const { Option } = Select;

const EditUser = ({ openModal, handleModal, school, setSchool, getSchools }) => {
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
      return toast.error("description is required");
    }
      if (school.address == "") {
      return toast.error("address is required");
    }

    api("put", `/v1/schools/${school._id}`, school).then((res) => {
      toast.success("school edited successfully");
      getSchools();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a school
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
                          {school.name ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">Name</label>
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
                        <span style={{ color: "red" }}>
                          {school.email ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">Email</label>
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
                          htmlFor="input-domain_name"
                        >
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
                        <span style={{ color: "red" }}>
                          {school.number ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">
                          Description
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter school's description here"
                          type="text"
                          value={school.description}
                          name="description"
                          onChange={handleInput}
                          maxLength="11"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditUser;
