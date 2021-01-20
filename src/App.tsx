import { User } from "@metron/views/User";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <article style={{ height: "100%", display: "flex" }}>
          <span style={{ width: "33%", flex: "0 0 auto" }}>
            <User.List canAdd />
          </span>
          <span style={{ flex: "1 1 auto" }}>
            <Switch>
              <Route
                exact
                path="/user/:id/:edit?"
                render={({
                  match,
                }: RouteComponentProps<{ id: string; edit?: string }>) => (
                  <User.Read id={match.params.id} edit={!!match.params.edit} />
                )}
              />
              <Route exact path="/user/add" render={() => <User.Upsert />} />
            </Switch>
          </span>
        </article>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
