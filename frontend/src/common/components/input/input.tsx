import {FormEventHandler, ReactElement, useId} from "react";
import {InputEvent} from "../../interfaces.ts";

interface InputProps {
    inputText: string
    onChange: (event: InputEvent<string>) => void
    onSubmit: FormEventHandler<HTMLFormElement>
    placeholder?: string
    className?: string
    label?: string
}
const Input = (props: InputProps): ReactElement => {

        const id = useId()
        return (
            <form className="form-floating" onSubmit={props.onSubmit}>
                <input
                    autoFocus
                    id={id}
                    className={props.className}
                    placeholder={props.placeholder}
                    type="text"
                    value={props.inputText}
                    onChange={props.onChange}/>
                {props.label && <label htmlFor={id}>{props.label}</label>}
            </form>
        )
}

export default Input;