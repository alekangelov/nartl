import "./App.css";
import { NartlProvider, toast } from "nartl";
import "nartl/dist/index.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState(0);
  return (
    <div className="App">
      <button
        onClick={() => {
          toast(() => <div>Jakoto {state}</div>);
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
