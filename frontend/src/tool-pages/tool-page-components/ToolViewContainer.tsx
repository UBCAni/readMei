import { ReactElement } from "react";



const ToolViewContainer = (props: any): ReactElement => {
    return (<div className=" row justify-content-center">
        {props.children}
    </div>);
}
export default ToolViewContainer;
