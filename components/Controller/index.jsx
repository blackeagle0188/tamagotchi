import React, { useEffect, useState } from "react";
import Button from "../Button"

const Controller = () => {
    return (
        <div className="mb-12">
            <Button text="Feeding"/>
            <Button text="Hygiene"/>
            <Button text="Playing"/>
            <Button text="Training"/>
            <Button text="Shopping"/>
            <Button text="Sleeping"/>
        </div>
    )
}

export default Controller;