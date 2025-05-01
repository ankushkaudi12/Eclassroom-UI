import React, { useState, useEffect } from "react";
import StudentNavbar from "./Student/StudentNavbar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Score.css"; // Make sure this import matches your file structure

function Score() {
    const navigate = useNavigate();
    const location = useLocation();
    const [results, setResults] = useState([]);
    const { quizId, userId } = useParams();
    console.log("Quiz ID:", quizId);
    console.log("User ID:", userId);


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/quiz/results/${quizId}`);
                const data = await response.json();
                console.log("Quiz Results:", data);
                setResults(data);
            } catch (error) {
                console.error("Error fetching quiz results:", error);
            }
        };

        fetchResults();
    }, [quizId]);

    return (
        <div className="score-page">
            <StudentNavbar />
            <h2 className="score-title">📘 Quiz Results</h2>
            {results.length === 0 ? (
                <p className="loading-text">Loading results...</p>
            ) : (
                <div className="table-container">
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>👤 Name</th>
                                <th>📝 Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.name}</td>
                                    <td>{result.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Score;
