import React, { useContext } from "react";
import StepContext from "../../Context/Step/StepContext";
import FormContext from "../../Context/Form/FormContext";
import "./Control.css";
import { validateEmail, validatePhone } from "../../Utils/Validation";
import { FormOneDefault, FormOneErrorDefault } from "../../Utils/InitialStates";

const Control = () => {
    const { step, setStep } = useContext(StepContext);
    const { formOne, formOneError, setFormOneError } = useContext(FormContext);

    const handleNext = e => {
        switch (step) {
            case 1:
                let err = true;
                if (!formOne.name) {
                    setFormOneError(prev => ({ ...prev, name: true }));
                    err = false;
                } else setFormOneError(prev => ({ ...prev, name: false }));
                if (!formOne.email) {
                    setFormOneError(prev => ({
                        ...prev,
                        email: true,
                        emailError: "This field is required"
                    }));
                    err = false;
                } else if (!validateEmail(formOne.email)) {
                    setFormOneError(prev => ({
                        ...prev,
                        email: true,
                        emailError: "Invalid Email"
                    }));
                    err = false;
                } else
                    setFormOneError(prev => ({
                        ...prev,
                        email: false,
                        emailError: ""
                    }));
                if (!formOne.phone) {
                    setFormOneError(prev => ({
                        ...prev,
                        phone: true,
                        phoneError: "This field is required"
                    }));
                    err = false;
                } else if (!validatePhone(formOne.phone)) {
                    setFormOneError(prev => ({
                        ...prev,
                        phone: true,
                        phoneError: "Invalid  Phone Number"
                    }));
                    err = false;
                } else
                    setFormOneError(prev => ({
                        ...prev,
                        phone: false,
                        phoneError: ""
                    }));

                // no error
                if (err) setStep(prev => 2);
                return;

            default:
                console.log("Dont know what to do");
                return;
        }
    };

    return (
        <div className="Control">
            <button
                className="back"
                style={{ visibility: step === 1 && "hidden" }}
            >
                Go Back
            </button>
            {step === 4 ? (
                <button className="confirm">Confirm</button>
            ) : (
                <button className="next" onClick={handleNext}>
                    Next Step
                </button>
            )}
        </div>
    );
};

export default Control;
