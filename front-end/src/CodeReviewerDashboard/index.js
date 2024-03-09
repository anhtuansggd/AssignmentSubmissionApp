import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link, Navigate, useNavigate} from "react-router-dom";
import ajax from "../Services/fetchService";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import StatusBadge from "../StatusBadge";

const CodeReviewerDashboard = () => {
    let navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    function editReview(assignment) {
        window.location.href = `/assignments/${assignment.id}`;
    }

    function claimAssignment(assignment) {
        const decodedJwt = jwtDecode(jwt);
        const user = {
            username: decodedJwt.sub,
        };
        assignment.codeReviewer = user;
        //Dont hardcode this status
        assignment.status = "In Review";
        ajax(`api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
            (updatedAssignment) => {
                //TODO: update the view for the assignment that changed
                const assignmentCopy = [...assignments];
                const i = assignmentCopy.findIndex(a => a.id === assignment.id);
                assignmentCopy[i] = updatedAssignment;
                setAssignments(assignmentCopy);
            })
    }

    useEffect(() => {
        ajax("/api/assignments/", "GET", jwt)
            .then((assignmentsData) => {
                setAssignments(assignmentsData);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            setJwt(null);
                            navigate('/login');
                        }}
                    >
                        Logout
                    </div>
                </Col>
                <Row>
                    <Col>
                        <div className="h1">Code Reviewer Dashboard</div>
                    </Col>
                </Row>
            </Row>

            <div className="assignment-wrapper  submitted">
                <div className="h3 px-2 assignment-wrapper-title">
                    In Review
                </div>
                {assignments && assignments.filter((assignment) => assignment.status === "In Review").length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
                        {assignments.filter((assignment) => assignment.status === "In Review")
                            .map(assignment => (
                                <Card key={assignment.id} style={{width: '18rem', height: '18rem'}}>
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                                        <div className="d-flex align-items-start">
                                            <StatusBadge text={assignment.status}/>
                                        </div>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                            <p><b>Branch:</b> {assignment.branch}</p>
                                        </Card.Text>
                                        <Button variant="secondary" onClick={() => {
                                            editReview(assignment);
                                        }}>Edit</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>
                        No assignments found
                    </div>
                )}
            </div>

            {/* --------------------------------------------- */}

            <div className="assignment-wrapper  submitted">
                <div className="h3 px-2 assignment-wrapper-title">
                    Awaiting Review
                </div>
                {assignments && assignments.filter((assignment) => assignment.status === "Submitted" || assignment.status === "Resubmitted").length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
                        {assignments.filter((assignment) => assignment.status === "Submitted" || assignment.status === "Resubmitted")
                            .sort((a,b) => {
                                if(a.status === "Resubmitted")
                                return -1;
                                else return 1;
                            })
                            .map(assignment => (
                                <Card key={assignment.id} style={{width: '18rem', height: '18rem'}}>
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                                        <div className="d-flex align-items-start">
                                            <StatusBadge text={assignment.status}/>
                                        </div>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                            <p><b>Branch:</b> {assignment.branch}</p>
                                        </Card.Text>
                                        <Button variant="secondary" onClick={() => {
                                            claimAssignment(assignment);
                                        }}>Claim</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>
                        No assignments found
                    </div>
                )}
            </div>

            {/* --------------------------------------------- */}

            <div className="assignment-wrapper  needs-update">
                <div className="h3 px-2 assignment-wrapper-title">
                    Needs Update
                </div>
                {assignments && assignments.filter((assignment) => assignment.status === "Needs Update").length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
                        {assignments.filter((assignment) => assignment.status === "Needs Update")
                            .map(assignment => (
                                <Card key={assignment.id} style={{width: '18rem', height: '18rem'}}>
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                                        <div className="d-flex align-items-start">
                                            <StatusBadge text={assignment.status}/>
                                        </div>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                            <p><b>Branch:</b> {assignment.branch}</p>
                                        </Card.Text>
                                        <Button variant="secondary" onClick={() => {
                                            window.location.href = `/assignments/${assignment.id}`;
                                        }}>View</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>
                        No assignments found
                    </div>
                )}
            </div>


        </Container>
    )
        ;
};

export default CodeReviewerDashboard;
