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
            <Container className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor='username' className="fs-4">Username</Form.Label>
                    <Form.Control type="email"
                                  placeholder="joe@gmail.com"
                                  size="lg"
                                  id="username"
                                  value={username}
                                  onChange={(event) => setUsername(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor='password' className="fs-4">Password</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Enter your password"
                                  size="lg"
                                  id="password"
                                  value={password}
                                  onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>
                <Row>
                    <Col className="mt-2">
                        <div>
                            <Button
                                id="submit"
                                type="button"
                                onClick={() => sendLoginRequest()}
                                size="lg"
                            >login</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Login;