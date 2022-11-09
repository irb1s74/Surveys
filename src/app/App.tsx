import React, {useState} from 'react';

const App = () => {
    const [counter,setCounter] = useState(1);
    return (
        <div>
            app
            {counter}
            <button onClick={()=>setCounter((value)=> value + 1)}>increment</button>
        </div>
    );
};

export default App;
