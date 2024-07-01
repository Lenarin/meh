import {FC, KeyboardEventHandler, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../stores/store.ts";
import {useDebouncedValue} from "../utils/useDebouncedValue.ts";
import {HistoryElement, push, redo, undo} from "../stores/history/historySlice.ts";

export const TextEditor: FC = () => {
    const currentValue = useSelector((state: RootState) => state.history.present);
    const { bold, italic, text } = currentValue;
    const dispatch = useDispatch();

    const [value, setValue] = useState<string>('Change me!')
    const [debouncedValue] = useDebouncedValue(value, 200)

    useEffect(() => {
        console.log(debouncedValue, value)
    }, [debouncedValue]);

    const handleChangeState = (partialNewValue: Partial<HistoryElement>) => {
        const newValue = { ...currentValue, text: value, ...partialNewValue }
        dispatch(push(newValue))
    }

    useEffect(() => {
        handleChangeState({ text: debouncedValue })
    }, [debouncedValue]);

    useEffect(() => {
        setValue(text)
    }, [text]);

    const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if ((e.key == 'z' || e.key == 'Z') && e.ctrlKey) {
            e.preventDefault()

            if (e.ctrlKey && e.shiftKey) {
                dispatch(redo())
            } else if (e.ctrlKey) {
                dispatch(undo())
            }
        }
    }

    return (<>
        <div className='buttons'>
            <button onClick={() => dispatch(undo())}>
                Undo
            </button>
            <button  onClick={() => dispatch(redo())}>
                Redo
            </button>
            <button
                className={bold ? 'active' : ''}
                onClick={() => handleChangeState({bold: !bold})}
            >
                Bold
            </button>
            <button
                className={italic ? 'active' : ''}
                onClick={() => handleChangeState({italic: !italic})}
            >
                Italic
            </button>
        </div>
        <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`${bold ? 'bold' : ''} ${italic ? 'italic' : ''}`}
        /></>)
}