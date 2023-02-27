
// reactstrap components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
import ExportExecl from 'views/exportfiles/ExportExecl.js';
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
// import AddHospital from "./AddHospital";
// import EditHospital from "./EditHospital";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";
import AddHospital from "./AddHospital";
import EditHospital from "./EditHospital";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { hospitals } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    const data = await api("get", "/v1/hospitals");

    updateStore({ hospitals: data.hospitals });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setHospital({
        _id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        schools:item.schools
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/v1/hospitals/${id}`).then(() => {
      toast.success("Hospital deleted successfully");
      getHospitals();
    });
  };
   const getActiveHospitals=(hospitals)=>{
      return hospitals?.filter(hospital=>hospital.active)
  }

  const myHeader = ['Name', 'Email', 'Address'];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                  <h3 className="mb-0">Users</h3>
                <div className="d-flex justify-content-end ">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Hospital
                  </Button>
                  <ExportExecl hospitals={getActiveHospitals(hospitals)} myHeader={myHeader}/>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {getActiveHospitals(hospitals)?.map((item) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm" title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + "..."
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + "..."
                            : item.email}
                        </td>

                        <td>{item.address}</td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  onClick={() =>
                                    history.push(`/admin/hospitals/${item._id}`)
                                  }
                                >
                                  View
                                </DropdownItem>
                              
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddHospital
            openModal={openModal}
            handleModal={handleModal}
            getHospitals={getHospitals}
          />
        )}
        {editModal && (
          <EditHospital
            openModal={editModal}
            handleModal={handleEditModal}
            hospital={hospital}
            setHospital={setHospital}
            getHospitals={getHospitals}
          />
        )}
      </Container>
    </>
  );
};

export default Users;
