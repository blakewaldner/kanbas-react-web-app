import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPlus,
    faCheckCircle,
    faEdit,
    faRocket,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import './Quiz.css';
import * as client from "./client";
import { Dropdown } from 'react-bootstrap';


function Quizzes() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const [quiz, setQuiz] = useState({
        title: "New Quiz Title",
        description: "New Quiz Description",
        published: false,
        points: 100,
        shuffleAnswers: true,
        timed: false,
        timeLimit: 45,
        dueDate: "2023-01-15",
        availableFrom: "2023-01-12",
        availableUntil: "2023-01-14",
        questions: [
            {
                title: "New Question Title",
                type: "MULTIPLE-CHOICE",
                question: "Question Description",
                points: 75,
                options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                correctAnswer: "Answer 3",
                possibleAnswers: ["", "", ""],
            }
        ]
    });

    const createQuiz = async () => {
        try {
            const newQuiz = await client.createQuiz(quiz);
            setQuizzes([newQuiz, ...quizzes]);
            const url = `/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}`;
            navigate(url)
            setError('')
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const fetchQuizzes = async () => {
        const quizzes = await client.findAllQuizzes();
        setQuizzes(quizzes);
    };
    const changePublish = async (quizId) => {
        try {
            const quizToUpdate = quizzes.find(q => q._id === quizId);
            if (!quizToUpdate) return;

            const updatedQuiz = {
                ...quizToUpdate,
                published: !quizToUpdate.published
            };
            await client.updateQuiz(updatedQuiz);

            setQuizzes(quizzes.map(q => q._id === quizId ? updatedQuiz : q));
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const deleteQuiz = async (quiz) => {
        try {
            await client.deleteQuiz(quiz);
            setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
            setError('')
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const handleDropdown = async (field, value, quiz) => {
        if (value === "delete") {
            deleteQuiz(quiz)
        } else {
            const updatedQuiz = {
                ...quiz,
                published: quiz.value
            };
            await client.updateQuiz(updatedQuiz);
            setQuizzes(quizzes.map(q => q._id === quiz._id ? updatedQuiz : q));
        }
    };


    useEffect(() => { fetchQuizzes(); }, []);
    return (
        <div class="half-width">
            <br />
            <input type="text" class="form-control input-sizing float-start" placeholder="Search for Quiz"
            ></input>
            {/* <button type="button" class="btn btn-light float-end button-spacing">
                <FontAwesomeIcon
                    icon={faEllipsisV}
                />
            </button> */}
            <button type="button" class="btn btn-danger float-end button-spacing" onClick={createQuiz}>
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: '12px', marginRight: '5px' }}
                />
                Quiz
            </button>

            <br />
            <br />
            <hr />
            <ul class="list-group">
                <li class="list-group-item list-group-item-secondary">
                    <div className="bold">
                        Assignment Quizzes
                    </div>
                </li>
                {quizzes
                    .slice()
                    .sort((a, b) => new Date(a.availableFrom) - new Date(b.availableFrom))
                    .map((quiz) => (
                        <li key={quiz._id} className="list-group-item green-border">
                            <FontAwesomeIcon icon={faRocket} className="float-start green-large-icon me-3" />
                            <div className="ms-5">

                                <FontAwesomeIcon icon={faCheckCircle}
                                    className={`${quiz.published ? 'published' : 'unpublished'} green-icon large-icon float-end ms-3`} />
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-icon float-end ms-3">
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {quiz.published === false && (
                                            <Dropdown.Item onClick={() => changePublish(quiz._id)}>Publish</Dropdown.Item>
                                        )}
                                        {quiz.published === true && (
                                            <Dropdown.Item onClick={() => changePublish(quiz._id)}>Unpublish</Dropdown.Item>
                                        )}
                                        <Dropdown.Item onClick={() => deleteQuiz(quiz)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <h5>
                                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} className="no-underline-gray">
                                        {quiz.title}
                                    </Link>
                                </h5>
                                <div>
                                    <strong>Due</strong> {quiz.dueDate} &nbsp;|&nbsp; {quiz.points} pts &nbsp;|&nbsp; {quiz.questions.length} Questions &nbsp;|&nbsp; Available from {quiz.availableFrom} to {quiz.availableUntil}
                                </div>

                            </div>
                        </li>
                    ))}
            </ul>

        </div>
    );
}
export default Quizzes;