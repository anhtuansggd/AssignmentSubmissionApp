import React, {useEffect, useRef, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {json} from "react-router-dom";
import ajax from "../Services/fetchService";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";

const CodeReviewAssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
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
                    <Badge pill bg="info" style={{fontSize: "1em"}}>
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>


            {assignment ? <>
                <Form.Group as={Row} className="my-4" controlId="githubUrl">
                    <Form.Label column sm="3" md="2">
                        Github URL:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control
                            onChange={(event) =>
                                updateAssignment("githubUrl", event.target.value)}

                            value={assignment.githubUrl}
                            type="text"
                            readOnly
                            placeholder="https//github.com/username/repo-name"/>
                    </Col>
                </Form.Group>

                {/* - - - - - - - - - - - - */}

                <Form.Group as={Row} className="mb-3" controlId="githubUrl">
                    <Form.Label column sm="3" md="2">
                        Branch:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control
                            onChange={((event) =>
                                updateAssignment("branch", event.target.value))}
                            value={assignment.branch}
                            type="text" placeholder="branch_name" readOnly/>
                    </Col>
                </Form.Group>

                {/* - - - - - - - - - - - - */}

                <Form.Group as={Row} className="mb-3" controlId="githubUrl">
                    <Form.Label column sm="3" md="2">
                        Video Review URL:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control
                            onChange={((event) =>
                                updateAssignment("codeReviewVideoUrl", event.target.value))}
                            value={assignment.codeReviewVideoUrl}
                            type="text"
                            placeholder="https://screencast-o-matic.com/something"/>
                    </Col>
                </Form.Group>

            </> : <></>}
            <div className="d-flex gap-5">
                {assignment.status === "Completed" ? (
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => save(assignmentStatuses[2].status)}> Re-Claim</Button>
                    ) : (
                    <Button size="lg"
                            onClick={() => save(assignmentStatuses[4].status)}>Complete Review</Button>
                )}
                {assignment.status === "Needs Update" ? (
                    <Button size="lg"
                            variant="secondary"
                            onClick={() => save(assignmentStatuses[2].status)}>Re-Claim</Button>
                ) : (
                    <Button size="lg"
                            variant="danger"
                            onClick={() => save(assignmentStatuses[3].status)}>Reject Assignment</Button>)
                }
                <Button size="lg"
                        variant="secondary"
                        onClick={() => window.location.href = "/dashboard"}>Back</Button>
            </div>

        </Container>
    );
};

export default CodeReviewAssignmentView;