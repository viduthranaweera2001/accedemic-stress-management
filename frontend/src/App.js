import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GameZone from "./components/GameZone";
import AiAssistance from "./components/AiAssistance";

// <<<<<<< HEAD
// const App = () => {
//   return (
//       <div className="app-container">
//         <h1>Game Zone & AI Assistance</h1>
//         <Tabs>
//           <TabList>
//             <Tab>Game Zone</Tab>
//             <Tab>AI Assistance</Tab>
//           </TabList>
//
//           <TabPanel>
//             <GameZone />
//           </TabPanel>
//
//           <TabPanel>
//             <AiAssistance />
//           </TabPanel>
//         </Tabs>
//       </div>
// =======
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AcademicStressForm from "./pages/AcademicStressForm";
import Sidebar from "./components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        {/* Navigation Menu */}
        {/* <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">My App</div>
            <div className="space-x-4">
              <Link
                  to="/"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Home
              </Link>
              <Link
                  to="/gaming"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Gaming
              </Link>
              <Link
                  to="/chat"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Chat
              </Link>
              <Link
                  to="/profile"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Profile
              </Link>
            </div>
          </div>
        </nav> */}

        {/* Main Content with Sidebar */}
        <div className="d-flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stress-form" element={<AcademicStressForm />} />
          {/*<Route path="/gaming" element={<GamingZone />} />*/}
          {/*<Route path="/chat" element={<ChatPage />} />*/}
          {/*<Route path="/profile" element={<ProfilePage />} />*/}
          {/*<Route path="/login" element={<LoginPage />} />*/}
        </Routes>
        </div>
      </Router>
  );
};

export default App;
