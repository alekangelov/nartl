import "./App.css";
import { NartlProvider, toast, makeToast } from "nartl";
import "nartl/dist/index.css";
import { useState } from "react";

const customToast = makeToast((props) => {
  console.log({ props });
  return <div className="customToast">{props.message}</div>;
});

function App() {
  const [state, setState] = useState(0);
  return (
    <div className="App">
      <button
        onClick={() => {
          customToast(`some custom toast ${state}`);
          setState((state) => state + 1);
        }}
      >
        success
      </button>
      <NartlProvider
        // animationDuration={5000}
        // timeout={30000}
        position={"top-right"}
      />
    </div>
  );
}

export default App;
