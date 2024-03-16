import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

const Comment = (props) => {
    const user = useUser();
    const decodedJwt = jwtDecode(user.jwt);
    const {id, emitEditComment, createdDate, createdBy, text, emitDeleteComment} = props;
    const [commentRelativeTime, setCommentRelativeTime] = useState("");

    useEffect(() => {
        updateCommentRelativeTime();
    }, [createdDate]);

    function updateCommentRelativeTime(){
        if(createdDate){
            dayjs.extend(relativeTime);
            setCommentRelativeTime( dayjs(createdDate).fromNow() );
        }
    }

    setInterval(() => {
        updateCommentRelativeTime();
    }, 1000*61);


    return (
        <>
            <div className="comment-bubble">
                <div
                    className="d-flex gap-3"
                    style={{fontWeight: 'bold'}}>
                    <div>
                        {`${createdBy.name}`}
                    </div>
                    {
                        decodedJwt.sub === createdBy.username ? (<>
                            <div
                                onClick={() => emitEditComment(id)}
                                className="ml-4"
                                style={{cursor: "pointer", color: 'blue'}}>Edit
                            </div>
                            <div onClick={() => emitDeleteComment(id)}
                                 className="ml-4"
                                 style={{cursor: "pointer", color: 'red'}}>Delete
                            </div>
                        </>) : (<></>)
                    }
                </div>
                <div>{text}</div>

            </div>
            <div style={{marginTop: "-1.25em", marginLeft: "1.3em", fontSize: "14px"}}>{ commentRelativeTime ? `Posted ${commentRelativeTime}` : ""}</div>
        </>

    );
};

export default Comment;