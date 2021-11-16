import React, { useEffect, useState } from "react";

const Button = ({text}) => {
    return (
        <button className="bg-yellow-700 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-4">
            {text}
        </button>
    )
}

export default Button;