import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const token = localStorage.token;

  const SecureRoutes = () => {
    if (!token) return <Redirect to="/login" />;
    else {
      return <Route exact path="/" component={Home} />;
    }
  };

  const UserLogged = ({ ...options }) => {
    if (token) {
      return <Redirect to="/" {...options} />;
    } else {
      return <Route {...options} />;
    }
  };

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <UserLogged exact path="/login" component={Login} />
          {SecureRoutes()}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
