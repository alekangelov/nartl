import "./App.css";
import { NartlProvider, toast } from "nartl";
import "nartl/dist/index.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState(0)
  return (
    <div className="App">
      <NartlProvider timeout={5000}>
        <button onClick={() => {
          toast(`this is the ${state} toast`);
          setState(state => state+1)
        }}>success</button>
      </NartlProvider>
    </div>
  );
}

export default App;
