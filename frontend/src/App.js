import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GameZone from "./components/GameZone";
import AiAssistance from "./components/AiAssistance";

const App = () => {
  return (
      <div className="app-container">
        <h1>Game Zone & AI Assistance</h1>
        <Tabs>
          <TabList>
            <Tab>Game Zone</Tab>
            <Tab>AI Assistance</Tab>
          </TabList>

          <TabPanel>
            <GameZone />
          </TabPanel>

          <TabPanel>
            <AiAssistance />
          </TabPanel>
        </Tabs>
      </div>
  );
};

export default App;
