import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPlus,
    faCheckCircle,
    faEdit,
    faRocket,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
function QuizDetails() {
    const [error, setError] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const editUrl = `#/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`;
    const previewUrl = `#/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`;

    const fetchQuiz = async () => {
        try {
            const fetchedQuiz = await client.findQuizById(quizId);
            setQuiz(fetchedQuiz);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const changePublish = async () => {
        if (!quiz) return;

        try {
            const updatedQuiz = {
                ...quiz,
                published: !quiz.published
            };

            await client.updateQuiz(updatedQuiz);

            setQuiz(updatedQuiz);
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const cancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    }
    useEffect(() => {
        fetchQuiz();
    }, []);
    return (
        <div className="container mt-5">
            {quiz && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="card-title">{quiz.title}</h1>
                            <div>
                                <button className="btn btn-danger my-1" onClick={cancel}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${quiz.published ? 'btn-primary' : 'btn-success'} float-end button-spacing`}
                                    onClick={() => changePublish(quiz._id)}
                                >
                                    {quiz.published ? 'Unpublish' : 'Publish'}
                                </button>
                                <a href={editUrl} className="btn btn-light mx-2">Edit<FontAwesomeIcon className="ms-3" icon={faEdit} /></a>
                                <a href={previewUrl} className="btn btn-light mx-2">Preview</a>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6">
                                <dl className="row">

                                    <dt className="col-6">Points</dt>
                                    <dd className="col-6">{quiz.points}</dd>

                                    <dt className="col-6">Shuffle Answers</dt>
                                    <dd className="col-6">{quiz.shuffleAnswers ? 'Yes' : 'No'}</dd>

                                    <dt className="col-6">Timed Quiz</dt>
                                    <dd className="col-6">{quiz.timed ? 'Yes' : 'No'}</dd>

                                    <dt className="col-6">Time Limit</dt>
                                    <dd className="col-6">{quiz.timeLimit} Minutes</dd>

                                </dl>
                            </div>
                            <div className="col-6">
                                <d1 className="row">
                                    <dt className="col-6">Description</dt>
                                    <dd className="col-6 ">{quiz.description}</dd>
                                </d1>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-4">
                                    <strong>Due</strong>
                                    <p>{quiz.dueDate}</p>
                                </div>
                                <div className="col-4">
                                    <strong>Available from</strong>
                                    <p>{quiz.availableFrom}</p>
                                    <strong>Until</strong>
                                    <p>{quiz.availableUntil}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a href={previewUrl} className="btn btn-primary">Preview</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}</div>
    );
}
export default QuizDetails;