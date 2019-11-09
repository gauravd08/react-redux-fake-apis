import React from "react";
import { Spinner } from "react-bootstrap";


export const loader = () => {
    return (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
}