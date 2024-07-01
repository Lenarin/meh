import {HistoryColumns} from "./components/HistoryColumns.tsx";
import {TextEditor} from "./components/TextEditor.tsx";

// Так как в задаче можно не заморачиваться использую самое глупое решение, но вообще я бы взял либо модули либо CSS in JS
import './App.css'

function App() {
    return (
        <>
            <h1>Text Editor</h1>
            <TextEditor />
            <h2>History</h2>
            <HistoryColumns/>
        </>
    )
}

export default App
