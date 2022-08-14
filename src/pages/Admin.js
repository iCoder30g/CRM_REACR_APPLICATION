import React, { useState, useEffect } from 'react'
import Sidebar from '../component/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import { Modal, Button } from 'react-bootstrap';
import { fetchTicket , ticketUpdation} from '../api/tickets';
import { getAllUsers } from '../api/user';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import "../styles/admin.css";



const Admin = () => {

  const [userModal, setUserModal] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  // old values  
  // const [ticketDetails, setTicketDetails] = useState([]);
  // new updated value
  const [selectedCurrTicket, SetSelectedCurrTicket] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  // {new obj} new values of user 
  // first update with selectedCrr ticket ==> grab the specific row ==> current value
  // second update: replacing old values with new data  ==> new values that you entered in modal
  const updateSelectedCurrTicket = (data) => SetSelectedCurrTicket(data)

  const onCloseTicketModal = () => {
    setTicketUpdateModal(false)
  }

  const showUserModal = () => {
    setUserModal(true)
  }
  const closeUserModal = () => {
    setUserModal(false)
  }

  // for ADMIN tickets API call . starts here

  useEffect(() => {
    (async () => {
      fetchTickets()
      fetchUsers()
    })()
  }, [])


  const fetchTickets = () => {
    fetchTicket().then(function (response) {
      if (response.status === 200) {
        console.log(response);
        setTicketList(response.data)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  // for ADMIN tickets API call . ends here


  // for customer ticket API call starts here
  const fetchUsers = (userId) => {
    getAllUsers(userId).then(function (response) {
      if (response.status === 200) {
        if (userId) {
          setUserDetails(response.data)
        } else {
          setUserDetails(response.data)
        }
      }
    }).catch((error) => {
      console.log(error);
    })

  }

  // for customer ticket API call ends here



  // ticket opening functionality from M.T row click starts here

  // read the existing values in the ticket 
  const editTicket = (ticketDetail) => {
    const ticket = {
      assignee: ticketDetail.assignee,
      description: ticketDetail.description,
      id: ticketDetail.id,
      reporter: ticketDetail.reporter,
      status: ticketDetail.status,
      ticketPriority: ticketDetail.ticketPriority,
      title: ticketDetail.title
    }

    console.log(ticket);
    // storing the exixting values that we grabbed in a state 
    SetSelectedCurrTicket(ticket);
    // open a modal 
    setTicketUpdateModal(true);
  }


// read the Updated values from the user in material table modal 
const onTicketUpdate = (e) => {
  if (e.target.name === "title") {
    selectedCurrTicket.title = e.target.value
  }

  // create a new object with new values ==> object.assign 
  // (target, source) target : new toHaveFormValues, source : destination where you want your updated values 
  updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket))
}


// call the update ticket API to update the ticket
const updateTicket = (e) => {
  e.preventDefault();
  ticketUpdation(selectedCurrTicket.id, selectedCurrTicket).then(function (response) {
    console.log("Ticket Updated Succcessfully");
    onCloseTicketModal();
  }).catch(function (error) {
    console.log(error);
  })
}



  return (
    <div className='bg-light min-vh-100 '>
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container col m-1">
          <h5 className="text-primary text-center">Welcome Admin</h5>
          <p className="text-muted text-center">Take a quick look at your ststus below</p>


          {/* CERDS STRTS HERE  */}
          <div className="row my-5 mx-2 text-center">
            <div className="col my-1 p-2">
              <div className="card shadow bg-primary bg-opacity-25 " style={{ width: 12 + "rem" }}>
                <div className="cardbody border-b">
                  <h5 className="card-subtitle">
                    <i className='bi bi-pen text-primary mx-2'></i>
                    OPEN
                  </h5>
                  <hr />

                  <div className="row">
                    <div className="col">8</div>
                    <div className="col">
                      <div style={{ width: 30, height: 30 }}>
                        <CircularProgressbar value={80} styles={buildStyles({
                          textColor: "blue",
                          pathColor: "darkBlue"
                        })} />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


          <hr />

          <div className='container'>

            <MaterialTable

              onRowClick={(event, ticketDetail) => editTicket(ticketDetail)}

              data={ticketList}

              columns={[
                {
                  title: "TicketId",
                  field: "id"
                },
                {
                  title: "Title",
                  field: "title"
                },
                {
                  title: "Description",
                  field: "description"
                },
                {
                  title: "Reporter",
                  field: "reporter"
                },
                {
                  title: "Priority",
                  field: "ticketPriority"
                },
                {
                  title: "Assignee",
                  field: "assignee"
                },
                {
                  title: "Status",
                  field: "status",
                  lookup: {
                    "OPEN": "OPEN",
                    "IN_PROGRESS": "IN_PROGRESS",
                    "BLOCKED": "BLOCKED",
                    "CLOSED": "CLOSED"
                  }
                }
              ]}


              options={{
                exportMenu: [{
                  label: "Export Pdf",
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, "Ticket Records")
                },
                {
                  label: "Export Csv",
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, "Ticket Records")
                },
                ],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: "#fff"
                },
                rowStyle: {
                  backgroundColor: "#eee"
                }
              }}


              title="TICKET RECORDS"

            />

            {ticketUpdateModal ? (
              <Modal
                show={ticketUpdateModal}
                onHide={onCloseTicketModal}
                backdrop="static"
                centered >

                <Modal.Header closeButton>
                  <Modal.Title>Update Ticket</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form onSubmit={updateTicket}>
                    <div className="p-1">
                      <h5 className="text-primary">Ticket ID: {selectedCurrTicket.id}</h5>
                      <div className="input-group">
                        <label className=" label input-group-text label-md">Title 
                          
                        </label>
                        <input type="text" className="form-control" name='title' value={selectedCurrTicket.title} onChange={onTicketUpdate} />
                      </div>
                      <Button type='submit' className='my-1'>Update</Button>
                    </div>
                  </form>
                </Modal.Body>

              </Modal>

            ) : ("")}

          </div>

          <hr />

          <div className='container'>

            <MaterialTable



              columns={[
                {
                  title: "User Id",
                  field: "userId"
                },
                {
                  title: "Name",
                  field: "name"
                },
                {
                  title: "Email",
                  field: "email"
                },
                {
                  title: "User Type",
                  field: "userTypes",
                  lookup: {
                    "CUSTOMER": "CUSTOMER",
                    "ENGINEER": "ENGINEER",
                    "ADMIN": "ADMIN"
                  }
                },
                {
                  title: "Status",
                  field: "userStatus",
                  lookup: {
                    "APPROVED": "APPROVED",
                    "PENDING": "PENDING",
                    "REJECTED": "REJECTED"

                  }
                }
              ]}


              options={{
                exportMenu: [{
                  label: "Export Pdf",
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, "Ticket Records")
                },
                {
                  label: "Export Csv",
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, "Ticket Records")
                },
                ],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: "#fff"
                },
                rowStyle: {
                  backgroundColor: "#eee"
                }
              }}

              data={userDetails}
              title="USER RECORDS"

            />

          </div>

          {/* CARD ENDS HERE  */}



          <button className="btn btn-primary" onClick={showUserModal}>Open Modal</button>




        </div>
      </div>
    </div>
  )
}


export default Admin;