import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnoses from "../../services/diagnoses";

const ShowPatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnosesList, setDiagnosesList] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const fetchedPatient = await patientService.getPatient(id);
                setPatient(fetchedPatient);
            }
        };
        void fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const fetchedDiagnoses = await diagnoses.getAll();
            setDiagnosesList(fetchedDiagnoses);
        };
        void fetchDiagnoses();
    }, []);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>Gender: {patient.gender}</p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries && patient.entries.length > 0 ? (
            <ul>
                {patient.entries.map((entry) => (
                <li key={entry.id}>
                    <p>Date: {entry.date}</p>
                    <p>Description: {entry.description}</p>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                        <div>
                            <p>Diagnosis Codes:</p>
                            <ul>
                                {entry.diagnosisCodes.map(code => {
                                    const diagnosis = diagnosesList.find(d => d.code === code);
                                    return (
                                        <li key={code}>
                                            {code} {diagnosis ? `- ${diagnosis.name}` : ""}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </li>
                ))}
            </ul>
            ) : (
            <p>No entries</p>
            )}
        </div>
    );
};

export default ShowPatient;
