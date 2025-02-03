import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(part => (
                <div key={part.name}>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    {(() => {
                        switch (part.kind) {
                            case "basic":
                                return <p><em>{part.description}</em></p>;
                            case "group":
                                return <p>project exercises {part.groupProjectCount}</p>;
                            case "background":
                                return (
                                    <>
                                        <p><em>{part.description}</em></p>
                                        <p>required background: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                                    </>
                                );
                            case "special":
                                return (
                                    <>
                                        <p><em>{part.description}</em></p>
                                        <p>required skills: {part.requirements.join(", ")}</p>
                                    </>
                                );
                            // Add other cases here if needed
                            default:
                                return null;
                        }
                    })()}
                </div>
            ))}
        </div>
    );
}

