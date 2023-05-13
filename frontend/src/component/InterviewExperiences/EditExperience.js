import React, { useEffect, useState } from 'react';
import { editInterview, clearErrors, getInterviewDetails } from "../../actions/interviewAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_INTERVIEW_RESET } from "../../constants/interviewConstants"
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from 'react-html-parser'; 

const EditExperience = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {experience_id} = useParams();

    const { loading, error, interview } = useSelector((state) => state.interviewDetails);
    const { error:editError, success } = useSelector((state) => state.interview);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");
    const [experience, setExperience] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    const addTag = () => {
        if(tag) {
            if(tags.indexOf(tag.toLowerCase()) === -1) {
                const temp = [...tags];
                temp.push(tag);
                setTags(temp)
                setTag("");
            } else {
                alert.error("Tag already selected.");
            }
        } else {
            alert.error("Tag can't be empty!");
        }
    }

    const removeTag = (tag) => {
        const temp = [...tags];
        temp.splice(temp.indexOf(tag.toLowerCase()),1);
        setTags(temp)
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setExperience(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    const submitInterview = (e) => {
        e.preventDefault();
        if(tags.length === 0) {
            alert.error("Tags can't be empty!");
        }
        else if(!editorState.getCurrentContent().hasText()) {
            alert.error("Please add your interview experience");
        }
        else {
            const myForm = new FormData();
            myForm.set("_id", interview._id);
            myForm.set("title", title);
            myForm.set("experience", experience);
            myForm.set("tags", tags);
            dispatch(editInterview(myForm));
        }
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(editError) {
            alert.error(editError);
            dispatch(clearErrors());
        }
        if(success) {
            alert.success("Interview Experience successfully updated..")
            dispatch({type:EDIT_INTERVIEW_RESET});
            navigate("/interview-experiences")
        }
    }, [dispatch, error, alert, success, navigate, interview, editError])

    useEffect(() => {
        if(interview) {
            setTitle(interview.title);
            setExperience(interview.experience)
            setTags(interview.tags);
            setEditorState(EditorState.createWithContent(stateFromHTML(interview.experience)))
        }
    }, [dispatch, interview])

    useEffect(() => {
        dispatch(getInterviewDetails(experience_id));
    }, [dispatch, experience_id])

    return (
        <>
            <div className="row page-titles">
                <div className="col-lg-12">
                    <div className="card text-white bg-dark">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>Edit Interview Experience</h3>
                                    <h6 className="font-light m-t-0">Edit details about the interview process student has been through..</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitInterview}>
                                <div className="row p-t-20">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label">Interview Experience title</label>
                                            <input type="text" className="form-control" placeholder="Enter title here" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Editor
                                                editorState={editorState}
                                                onEditorStateChange={onEditorStateChange}
                                                editorStyle={{ border: "2px solid black", borderRadius:"5px", height: "200px", color: "black" }}
                                            />
                                            <br />
                                            {(title && editorState.getCurrentContent().hasText()) && <button type="button" data-bs-toggle="modal" data-bs-target="#previewExperienceModal" className="btn btn-outline-primary d-none d-lg-block m-l-15"><i className="fa fa-eye"></i> Preview</button>}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            {tags && tags.map((tag) => {
                                                return (<button type="button" onClick={() => removeTag(tag)} className="btn btn-danger" style={{marginRight: "10px",marginTop: "10px"}}> { tag } &nbsp; &nbsp;<i className="fa fa-close"></i> </button>)
                                            })}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Tags eg. Amazon, Placement" value={tag} onChange={(e) => setTag(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="button" onClick={addTag} className="btn btn-success btn-circle"><i className="fa fa-plus"></i> </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{textAlign: "center"}} className="text-center">
                                    {loading && <p className="text-primary"> Editing experience... Please wait!</p>}
                                    {!loading && <button type="submit" className="btn btn-primary btn-rounded"><i className="ti-check-box"></i> &nbsp; Post Interview Experience</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            <div className="modal fade" id="previewExperienceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel1">{ title }</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <div> { ReactHtmlParser(experience) } </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditExperience;