import { Component } from "react";
import { ListaDeNotas } from "./components/ListaDeNotas";
import { FormularioCadastro } from "./FormularioCadastro";
class App extends Component {
  render() {
    return (
      <section>
        <FormularioCadastro />
        <ListaDeNotas />
      </section>
    );
  }
}

export default App;
