import { useContext, useState } from "react";
import { BasicTable } from "../components/BasicTable";
import { Tickets } from "../components/Columns";
import { SeatDataContext } from "../context/SeatDataProvider";
import Modal from "../components/ModalLayout";
import { message } from "antd";

function Dashboard() {
  const { seatsData, updateSeatsData } = useContext(SeatDataContext);

  let data = Object.values(seatsData.ticketDetails);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [seatType, setSeatType] = useState("");
  const [id, setId] = useState("");
  const [deckType, setDeckType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [modalType, setModalType] = useState("");

  const openModal = () => {
    setDisabled(false);
    setModalType("open");
    setModalOpen(true);
    setFirstName("");
    setEmail("");
    setLastName("");
    setDOB("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const setSelectedData = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setDeckType(data.deckType);
    setSeatType(data.seatType);
    setId(data.seatId);
  };

  const handleViewTickets = (data) => {
    openModal();
    setModalType("view");
    setDisabled(true);
    setSelectedData(data);
  };

  const handleDeleteTicket = (data) => {
    const { seatId } = data;

    // Create a copy of the current ticket details
    const updatedTicketDetails = { ...seatsData.ticketDetails };

    // Remove the ticket using the ticket ID
    delete updatedTicketDetails[seatId];

    // Update the seat data with the removed ticket
    const updatedSeatsData = {
      ...seatsData,

      ticketDetails: updatedTicketDetails,
    };

    // Update the seat data using setDataToRow
    updateSeatsData(updatedSeatsData);
    message.success("Ticket Deleted Successfully");
    // window.location.reload();
  };

  const handleUpdateTicket = () => {
    const formData = {
      firstName: firstname,
      lastName: lastname,
      email: email,
    };

    const updatedSeatsData = {
      ...seatsData,
      ticketDetails: seatsData.ticketDetails,
    };

    // Check if the email is already present in ticketDetails
    const emailExists = Object.values(seatsData.ticketDetails).some(
      (ticket) => ticket.email === formData.email && ticket.seatId !== id
    );
    if (emailExists) {
      message.error("This email has already used.");
      return;
    }
    updatedSeatsData["ticketDetails"][id] = {
      ...updatedSeatsData["ticketDetails"][id],
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    updateSeatsData(updatedSeatsData);
    closeModal();
    message.success("Ticket Updated successfully");
    //window.location.reload();
  };

  const handleEdit = () => {
    setModalType("edit");
    setDisabled(false);
  };

  return (
    <>
      <div className="dash-main">
        <div className="dash-table">
          <div className="table-div">
            <BasicTable
              columns={Tickets}
              data={data ?? []}
              onView={handleViewTickets}
              onDelete={handleDeleteTicket}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        modalType={modalType}
        onEdit={handleEdit}
        onUpdate={handleUpdateTicket}
      >
        <div className=" flex flex-col justify-center items-center">
          <div className="card w-400 p-2">
            <form className=" flex flex-col">
              <input
                type="hidden"
                name="deckType"
                disabled={disabled}
                value={deckType}
              />
              <input type="hidden" name="dob" disabled={disabled} value={dob} />
              <input type="hidden" name="id" disabled={disabled} value={id} />
              <input
                type="hidden"
                name="seatType"
                disabled={disabled}
                value={seatType}
              />

              <label className="text-sm text-grey mb-05" htmlFor="firtname">
                Fistname
              </label>
              <input
                className="p-1 pl-15 mb-1"
                type="text"
                name="firstname"
                placeholder="Firstname"
                disabled={disabled}
                value={firstname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <label className="text-sm text-grey mb-05" htmlFor="email">
                Lastname
              </label>
              <input
                className="p-1 pl-15 mb-1"
                type="text"
                name="lastname"
                placeholder="Lastname"
                disabled={disabled}
                value={lastname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />

              <label className="text-sm text-grey mb-05" htmlFor="password">
                Email
              </label>
              <input
                className="p-1 pl-15 mb-1"
                type="email"
                name="email"
                placeholder="Email"
                disabled={disabled}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              {modalType === "open" ?? (
                <button
                  type="submit"
                  className="p-1 mt-3 bg-primary text-white"
                >
                  BOOK
                </button>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Dashboard;
