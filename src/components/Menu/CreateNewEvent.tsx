const CreateNewEvent = () => {
  const createNewEvent = () => {
    console.log("Created new event");
  };

  return (
    <div
      onClick={() => createNewEvent()}
      className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
      <button>Create New Event</button>
    </div>
  );
};

export default CreateNewEvent;
