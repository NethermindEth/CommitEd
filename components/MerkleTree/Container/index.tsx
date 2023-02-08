import Visualisation from "../Visualisation";
import { Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import { generateTree } from "./utils";

const Container = () => {
    const [input, setInput] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const leaves = input.split(",")
        .map((string) => string.trim())

    return (
        <Box padding="1rem">
            <Visualisation
                data={generateTree(leaves)}
            />
            <Box marginTop="0.5rem">Enter strings separated by commas</Box>
            <Input
                marginTop="0.5rem"
                value={input}
                onChange={handleChange}
            />
        </Box>
    )
}

export default Container;