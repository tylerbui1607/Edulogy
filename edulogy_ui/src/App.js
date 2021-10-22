import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from "./pages/homPage";
import { AdminPage } from "./pages/adminPage";
import { TestPage } from "./pages/testPage";
import { ToeicInfoPage } from "./pages/toeicInfo";
import { ListTestPage } from "./pages/listtestPage";
import { DiscussionsPage } from "./pages/discussionsPage";
import { DiscussionDetailPage } from "./pages/discussionDetailPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/de-thi" component={ListTestPage} />
          <Route path="/kiem-tra/:id" component={TestPage} />
          <Route path="/thong-tin" component={ToeicInfoPage} />
          <Route path="/thao-luan" component={DiscussionsPage} />
          <Route path="/chi-tiet-thao-luan/:id" component={DiscussionDetailPage} />
          <Route path="/quan-ly" component={AdminPage} />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
