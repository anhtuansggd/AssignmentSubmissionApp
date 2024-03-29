import React, {useEffect, useRef, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {json, useNavigate, useParams} from "react-router-dom";
import ajax from "../Services/fetchService";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import {useUser} from "../UserProvider";
import CommentContainer from "../CommentContainer";

const AssignmentView = () => {
        let navigate = useNavigate();
        const user = useUser();
        const {assignmentId} = useParams();
        const [assignment, setAssignment] = useState({
            branch: "",
            githubUrl: "",
            number: null,
            status: null,
        });
        const [jwt, setJwt] = useLocalState("", "jwt");

        const [assignmentEnums, setAssignmentEnums] = useState([]);
        const [assignmentStatuses, setAssignmentStatuses] = useState([]);


        const previousAssignmentValue = useRef(assignment);


        function updateAssignment(prop, value) {
            const newAssignment = {...assignment};
            newAssignment[prop] = value;
            setAssignment(newAssignment);
        }

        function save(status) {
            if (status && assignment.status !== status) {
                updateAssignment("status", status);
            } else {
                persist();
            }

        }

        function persist() {
            ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
                (assignmentData) => {
                    setAssignment(assignmentData);
                });
        }

        useEffect(() => {
            if (previousAssignmentValue.current.status !== assignment.status) {
                persist();
            }
            previousAssignmentValue.current = assignment;
        }, [assignment]);

        useEffect(() => {
            ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
                (assignmentResponse) => {
                    let assignmentData = assignmentResponse.assignment;
                    if (assignmentData.branch === null)
                        assignmentData.branch = "";
                    if (assignmentData.githubUrl === null)
                        assignmentData.githubUrl = "";
                    setAssignment(assignmentData);
                    setAssignmentEnums(assignmentResponse.assignmentEnums);
                    setAssignmentStatuses(assignmentResponse.statusEnums);
                });
        }, []);


        return (
            <Container className="mt-5">

                <Row className="d-flex align-items-center">
                    <Col>
                        {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
                    </Col>
                    <Col>
                        <StatusBadge text={assignment.status}/>
                    </Col>
                </Row>


                {assignment ? <>
                    <Form.Group as={Row} className="my-4" controlId="assignmentName">
                        <Form.Label column sm="3" md="2">
                            Assignment number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                variant={"info"}
                                title={assignment.number ? `Assignment ${assignment.number}` : "Select an assignment"}
                                onSelect={(selectedElement) => {
                                    updateAssignment("number", selectedElement)
                                }}
                            >
                                {assignmentEnums.map((assignmentEnum) =>
                                    <Dropdown.Item
                                        key={assignmentEnum.assignmentNum}
                                        eventKey={assignmentEnum.assignmentNum}>
                                        {assignmentEnum.assignmentNum}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="githubUrl">
                        <Form.Label column sm="3" md="2">
                            Github URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                onChange={(event) =>
                                    updateAssignment("githubUrl", event.target.value)}
                                value={assignment.githubUrl}
                                type="url" placeholder="https//github.com/username/repo-name"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="branch">
                        <Form.Label column sm="3" md="2">
                            Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                onChange={(event) =>
                                    updateAssignment("branch", event.target.value)}
                                value={assignment.branch}
                                type="url" placeholder="example_branch"/>
                        </Col>
                    </Form.Group>


                    {assignment.status === "Completed" ? (
                        <>
                            <div>
                                <Form.Group as={Row} className="d-flex align-items-center mb-3"
                                            controlId="codeReviewVideoUrl">
                                    <Form.Label column sm="3" md="2">
                                        Code Review Video URL:
                                    </Form.Label>
                                    <Col sm="9" md="8" lg="6">
                                        <a href={assignment.codeReviewVideoUrl} style={{fontWeight: "bold"}}>
                                            {assignment.codeReviewVideoUrl}
                                        </a>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className="d-flex gap-5">
                                <Button size="lg" variant="secondary"
                                        onClick={() => navigate("/dashboard")}>Back</Button>
                            </div>
                        </>

                    ) : assignment.status === "Pending Submission" ? (
                        <div className="d-flex gap-5">
                            <Button size="lg" onClick={() => save("Submitted")}>Submit Assignment</Button>
                            <Button size="lg" variant="secondary"
                                    onClick={() => navigate("/dashboard")}>Back</Button>
                        </div>) : (
                        <div className="d-flex gap-5">
                            <Button size="lg" onClick={() => save("Resubmitted")}>Resubmit Assignment</Button>
                            <Button size="lg" variant="secondary"
                                    onClick={() => navigate("/dashboard")}>Back</Button>
                        </div>
                    )}
                    <CommentContainer assignmentId={assignmentId}/>

                </> : <></>}


            </Container>
        );
    }
;

export default AssignmentView;