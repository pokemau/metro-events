interface CreateNewEventProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewEvent: React.FC<CreateNewEventProps> = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
      <button>Create New Event</button>
    </div>
  );
};

export default CreateNewEvent;
