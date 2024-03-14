import React from 'react';

const Comment = (props) => {
    const {id, emitEditComment, createdDate, createdBy, text, emitDeleteComment} = props;
    return (
        <div className="comment-bubble">
            <div
                className="d-flex gap-3"
                style={{fontWeight: 'bold'}}>
                <div>
                    {`${createdBy.name}`}
                </div>
                <div
                    onClick={() => emitEditComment(id)}
                    className="ml-4"
                    style={{cursor: "pointer", color: 'blue'}}>Edit
                </div>
                <div onClick={() => emitDeleteComment(id)}
                     className="ml-4"
                     style={{cursor: "pointer", color: 'red'}}>Delete
                </div>
            </div>
            <div>{text}</div>
        </div>
    );
};

export default Comment;