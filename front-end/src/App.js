import './App.css';
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";
import {useUser} from "./UserProvider";
import {jwtDecode} from "jwt-decode";

function App() {
    // const [jwt, setJwt] = useLocalState("", "jwt");
    const [roles, setRoles] = useState([]);
    const user = useUser();

    useEffect(() => {
        console.log("JWT has changed");
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwtDecode(user.jwt);
            console.log("decoded JWT:", decodedJwt);

            return decodedJwt.authorities;
        }
        return [];
    }
    return (
        <Routes>
            <Route
                path="/dashboard"
                element={
                    roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                        <PrivateRoute>
                            <CodeReviewerDashboard />
                        </PrivateRoute>
                    ) : (
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    )
                }
            />
            <Route
                path="/assignments/:assignmentId"
                element={
                    roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                        <PrivateRoute>
                            <CodeReviewAssignmentView/>
                        </PrivateRoute>
                    ) : (
                        <PrivateRoute>
                            <AssignmentView />
                        </PrivateRoute>
                    )
                }
            />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
}
export default App;
