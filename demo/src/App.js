import "./App.css";
import { NartlProvider, toast } from "nartl";
import "nartl/dist/index.css";

function App() {
  return (
    <div className="App">
      <NartlProvider timeout={5000}>
        <button onClick={() => toast("jakoto")}>success</button>
      </NartlProvider>
    </div>
  );
}

export default App;
