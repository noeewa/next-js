import { Children } from "react";

export default function Main({Children}) {

    return(
    <nav>
        <h1>Navigation</h1>
        {Children}
    </nav>)
}