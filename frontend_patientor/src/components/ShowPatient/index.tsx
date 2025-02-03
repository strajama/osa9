import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const ShowPatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const fetchedPatient = await patientService.getPatient(id);
                setPatient(fetchedPatient);
            }
        };

        void fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>Gender: {patient.gender}</p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
        </div>
    );
};

export default ShowPatient;
