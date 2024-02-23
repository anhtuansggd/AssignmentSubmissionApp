import './App.css';

function App() {

  const reqBody = {
    username: "test",
    password: "asdfasdf",
  };

  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(([body, headers]) => {
          const authValue = headers.get("authorization");
          console.log(authValue);
      }
    );

  return(
      <div className="App">
        <h1>Hello World</h1>
      </div>
  );
}

export default App;
