import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
            }).catch((message) => {
            alert(message);
        });
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">Username</Form.Label>
                            <Form.Control type="email"
                                          placeholder="joe@gmail.com"
                                          size="lg"
                                          value={username}
                                          onChange={(event) => setUsername(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-4">Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter your password"
                                          size="lg"
                                          value={password}
                                          onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-2 flex-md-row justify-content-between">
                        <Button
                            id="submit"
                            type="button"
                            onClick={() => sendLoginRequest()}
                            size="lg"
                        >login</Button>
                        <Button
                            variant="secondary"
                            id="submit"
                            type="button"
                            onClick={() => {
                                window.location.href = "/"
                            }}
                            size="lg"
                        >exit</Button>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Login;