import './App.css';
import {useEffect, useState} from "react";
import {useLocalState} from "./util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";

function App() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [roles, setRoles] = useState(getRolesFromJWT());

    function getRolesFromJWT() {
        if (jwt) {
            const decodedJWT = jwtDecode(jwt);
            return decodedJWT.authorities;
        }
        return [];
    }


    return (
        <Routes>
            <Route path="/dashboard" element={
                roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                    <PrivateRoute>
                        <CodeReviewerDashboard/>
                    </PrivateRoute>
                ) : (
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                )

            }/>
            <Route path="/assignments/:id" element={
                roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                    < PrivateRoute>
                        <CodeReviewAssignmentView/>
                    < /PrivateRoute>
                ) : (
                    < PrivateRoute>
                        <AssignmentView/>
                    < /PrivateRoute>
                )

            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Homepage/>}/>
        </Routes>
    );
}

export default App;
