import { useState } from 'react'
import logo from '/logo.svg'

function App() {
    const [count, setCount] = useState(0)
    return (<div>
        <img src={logo} className="logo" alt="Vite logo" />
        <p>Todo list</p>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
    </div>);
}

export default App;
