import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store.ts";
import {HistoryElement} from "../stores/history/historySlice.ts";

const HistoryElementCard: FC<HistoryElement> = ({ bold, italic, text }) => {
    return <div className='history-container-element'>
        <p>Is bold: {bold ? 'True' : "False"}</p>
        <p>Is italic: {italic ? 'True' : "False"}</p>
        <p>{text}</p>
    </div>
}

export const HistoryColumns: FC = () => {
    const past = useSelector((state: RootState) => state.history.past)
    const future = useSelector((state: RootState) => state.history.future)
    const present = useSelector((state: RootState) => state.history.present)

    return <div className='history-container'>
        <div className='history-container-column'>
            Past: {past.length}
            {past.map(el => <HistoryElementCard {...el} />)}
        </div>
        <div className='history-container-column'>
            Present
            <HistoryElementCard {...present} />
        </div>
        <div className='history-container-column'>
            Future: {future.length}
            {future.map(el => <HistoryElementCard {...el} />)}
        </div>
    </div>
}