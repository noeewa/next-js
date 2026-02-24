import { Children } from "react";
import { Props } from '@/type/type'

export default function Main({Children} : Props) {

    return(
    <nav>
        <h1>Navigation</h1>
        {Children}
    </nav>)
}