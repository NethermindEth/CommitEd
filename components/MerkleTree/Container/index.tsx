import Visualisation from "../Visualisation";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { generateTree } from "./utils";

const Container = () => {
    const [input, setInput] = useState("")

    const handleChange = (e: any) => {
        setInput(e.target.value)
    }

    const leaves = input.split(",")
        .map((string) => string.trim())

    return (
        <>
            <Visualisation
                data={generateTree(leaves)}
            />
            <Input
                value={input}
                onChange={handleChange}
            />
        </>
    )
}

export default Container;