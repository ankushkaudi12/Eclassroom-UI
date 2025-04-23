import React, { useState } from "react";
import "./Questions.css"; // Import your CSS file for styling

function Questions() {
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0
        }
    ]);

    const handleChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === "question") {
            updatedQuestions[index].question = value;
        } else if (field.startsWith("option")) {
            const optionIndex = parseInt(field.slice(-1), 10);
            updatedQuestions[index].options[optionIndex] = value;
        } else if (field === "correctAnswer") {
            updatedQuestions[index].correctAnswer = parseInt(value, 10);
        }
        setQuestions(updatedQuestions);
        console.log("Updated Questions: ", updatedQuestions);
        
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0
        }]);
    };

    const handleSubmit = () => {
        console.log("Submitted Questions: ", questions);
        // You can send `questions` to backend or store in state
        setShowModal(false);
    };

    return (
        <div>
            <h2>Quiz Name</h2>
            <button className="open-modal-btn" onClick={() => setShowModal(true)}>Add Questions</button>

            {showModal && (
                <div className="modal">
                    <h2>Add Quiz Questions</h2>
                    {questions.map((q, index) => (
                        <div key={index} className="question-block">
                            <input
                                type="text"
                                placeholder="Enter question"
                                value={q.question}
                                onChange={(e) => handleChange(index, "question", e.target.value)}
                            />
                            {q.options.map((opt, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder={`Option ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => handleChange(index, `option${i}`, e.target.value)}
                                />
                            ))}
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                            >
                                <option value={0}> Select correct option</option>
                                <option value={1}>Option 1</option>
                                <option value={2}>Option 2</option>
                                <option value={3}>Option 3</option>
                                <option value={4}>Option 4</option>
                            </select>
                        </div>
                    ))}
                    <button onClick={addQuestion}>+ Add Another Question</button>
                    <button onClick={handleSubmit}>Submit Questions</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Questions;
