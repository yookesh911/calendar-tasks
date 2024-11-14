import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import Login from './components/Login';
import TaskList from './components/TasksList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeGapiClient = async () => {
    await gapi.load("client:auth2", async () => {
      await gapi.client.init({
        clientId: "384968030757-84l6rb7gvlqqj217feftteq1rc0v2v95.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
        scope: "https://www.googleapis.com/auth/tasks",
      });

      const authInstance = gapi.auth2.getAuthInstance();
      console.log('AUTH INSTANCE', authInstance);
      setIsAuthenticated(authInstance.isSignedIn.get());
    });
  };

  useEffect(() => {
    initializeGapiClient();
  }, []);

  const signIn = async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn();
      initializeGapiClient();
    } catch (error) {
      console.log('Failed to Login')
    }
  }


  return (
    <div className="my-container">
      {isAuthenticated ? (
        <TaskList setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <Login onLogin={() => {
          signIn();
        }} />
      )}
    </div>
  );
};

export default App;
