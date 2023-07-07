import "./App.css";

function App() {
  const t = "tt";
  const test = () => {
    console.log(t === "tt");
  };

  test();
  return (
    <>
      <div className="text-lg text-red-700">TEST</div>
    </>
  );
}

export default App;
