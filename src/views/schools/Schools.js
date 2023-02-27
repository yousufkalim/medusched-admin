
// reactstrap components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
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
import AddSchool from "./AddSchool";
import EditSchool from "./EditSchool";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { schools } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [school, setSchool] = useState({
   name: "",
    domain_name:"",
    email: "",
    description: "",
    address: "",
  });

  useEffect(() => {
    getSchools();
  }, []);

  const getSchools = async () => {
    const data = await api("get", "/v1/schools");

    updateStore({ schools: data.schools });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setSchool({
        _id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        domain_name: item.domain_name,
        description: item.description,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/v1/schools/${id}`).then(() => {
      toast.success("User deleted successfully");
      getSchools();
    });
  };
  
  const getActiveSchools=(schools)=>{
      return schools?.filter(schoole=>schoole.active)
  }

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
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Users</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add School
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Domain_Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Description</th>
                    <th scope="col">Address</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {getActiveSchools(schools)?.map((item) => {
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
                        <td title={item.domain_name}>
                          {item.domain_name?.length > 30
                            ? item.domain_name?.substring(0, 30) + "..."
                            : item.domain_name}
                        </td>

                        <td>{item.email}</td>
                        <td>{item.description}</td>
                        <td>{(item.address)}</td>

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
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() =>
                                    history.push(`/admin/Schools/${item._id}`)
                                  }
                                >
                                  View
                                </DropdownItem>
                              )}
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
          <AddSchool
            openModal={openModal}
            handleModal={handleModal}
            getSchools={getSchools}
          />
        )}
        {editModal && (
          <EditSchool
            openModal={editModal}
            handleModal={handleEditModal}
            school={school}
            setSchool={setSchool}
            getSchools={getSchools}
          />
        )}
      </Container>
    </>
  );
};

export default Users;
