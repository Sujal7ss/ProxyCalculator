import { useState } from "react";
import "./App.css";

function App() {
  const [attended, setAttended] = useState();
  const [total, setTotal] = useState();
  const [required, setRequired] = useState();
  const [result, setResult] = useState(null);
  const [currPercent, setCurrPercent] = useState(0);

  const calculate = () => {
    // Validation
    if (attended < 0 || total < 0 || required < 0) {
      alert("Values cannot be negative.");
      return;
    }
    if (total === 0) {
      alert("Total classes cannot be zero.");
      return;
    }
    if (attended > total) {
      alert("Attended classes cannot be more than total classes.");
      return;
    }
    if (required > 100) {
      alert("Required percentage cannot be more than 100.");
      return;
    }

    // Calculate current attendance percentage
    const percent = Math.floor((attended / total) * 100);
    setCurrPercent(percent);

    // Calculate bunking or required attendance
    if (percent >= required) {
      const bunkable = Math.floor((attended - (total * required) / 100) / (required / 100));
      setResult(`You can bunk ${bunkable} more classes.`);
    } else {
      const m = required / 100;
      const neededClasses = Math.ceil((total * m - attended) / (1 - m));
      setResult(`You need to attend ${neededClasses} more classes regularly.`);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Proxy Calculator</h1>
        <div className="box">
          <div className="inp">
            <label htmlFor="attended">Attended</label>
            <input
              type="number"
              id="attended"
              placeholder="0"
              value={attended}
              onChange={(e) => setAttended(Number(e.target.value) || 0)}
            />
          </div>

          <div className="inp">
            <label htmlFor="total">Total Classes</label>
            <input
              type="number"
              id="total"
              placeholder="5"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value) || 0)}
            />
          </div>

          <div className="inp">
            <label htmlFor="required">Min Percentage Required</label>
            <input
              type="number"
              id="required"
              placeholder="75"
              value={required}
              onChange={(e) => setRequired(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <button onClick={calculate}>Calculate</button>

        {result && (
          <>
            <h2>Result</h2>
            <p>Current attendance: {currPercent}%</p>
            <div className="result">{result}</div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
