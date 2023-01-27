import React, { useState } from "react";
import ReactDOM from "react-dom";
import phoneMask from "../src/maskPhone";

const App = () => {
  const [telefone, setTelefone] = useState("");

  return (
    <phoneMask
      separaNono
      temDDD
      separaDDD
      value={telefone}
      onChange={(event) => setTelefone(event.target.value)}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
