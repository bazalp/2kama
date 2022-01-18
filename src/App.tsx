import * as React from "react";
import { Link, Route } from "wouter";
import InboxPage from "./pages/InboxPage";

function App() {
  return (
    <div>
      <Link href="/about">
        <a className="link">About</a>
      </Link>
      <hr />
      <Link href="/users/2kama">
        <a className="link">hello</a>
      </Link>
      <hr />
      <Link href="/inbox">
        <a className="link">Inox</a>
      </Link>
      <hr />

      <Route path="/about">About Us</Route>
      <Route path="/users/:name">
        {(params) => <div>Hello, {params.name}!</div>}
      </Route>
      <Route path="/inbox" component={InboxPage} />
    </div>
  );
}
export default App;
