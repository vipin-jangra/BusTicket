import DeckLayout from "../components/DeckLayout";

function Reservation() {
  return (
    <div className="bg flex justify-center">
      <div className="w-50 p-05">
        <div className="label">
          Click on an available seat to proceed with your transaction
        </div>
        <h4 className="m-1">LOWER</h4>
        <DeckLayout deckType="lower"></DeckLayout>
        <h4 className="m-1">UPPER</h4>
        <DeckLayout deckType="upper" showSteeringIcon="hidden"></DeckLayout>
      </div>
    </div>
  );
}

export default Reservation;
