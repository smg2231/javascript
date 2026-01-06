import { useState } from "react"
import "./CustomComponent.css"

function CustomComponent() {

const temp: number = 100
const [count, setCount] = useState(0)
function incrementCount() {
    setCount(count + 1)
}
return (

    <>

        <h1>Custom Component</h1>
        <p>Current Temp: {temp}</p>
        <p>Count: {count} </p>
    </>
)
}
export default CustomComponent