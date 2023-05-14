import React, { useEffect, useState } from 'react';
import { getAllInterviews, clearErrors } from "../../actions/interviewAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
const TruncHtml = require('trunc-html');

const InterviewExperiences = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, interviews } = useSelector((state) => state.interviews);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterInterviews, setFilterInterviews] = useState([]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        if (searchTerm === "") { setFilterInterviews(interviews); return; }
        setFilterInterviews(interviews.filter((item) => {
            return (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.experience.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags.map(tag => {return tag.toLowerCase()}).includes(searchTerm.toLowerCase()));
        }));
    }, [searchTerm, interviews])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    useEffect(() => {
        dispatch(getAllInterviews());
    }, [dispatch])

    return (
        <>
            <div className="row page-titles">
                <div className="col-lg-12">
                    <div className="card text-white bg-dark">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>Interview Experiences</h3>
                                    <h6 className="font-light m-t-0">Read about the interview processes your college-mates have been through..</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading && <div className="row" ng-show="!interview.fetchedInterviewExperiences">
                <div className="col-md-12">
                    <div className="card-body text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div> }

            {/* Interview Experiences */}
            {!loading && <div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card cc-widget">
                            <div className="card-body">
                                <Link to="/compose" className="btn btn-block btn-success"> <i className="fa fa-pencil"></i> &nbsp; Compose</Link>
                                <button type="button" className="btn btn-block btn-outline-secondary text-primary" data-bs-toggle="modal" data-bs-target="#guidelinesModal"> Guidelines</button>
                            </div>
                        </div>
                    </div>

                    {/* All Approved Interview Experience */}
                    {interviews && <div className="col-lg-9">
                        <div className="card cc-widget">
                            <div className="card-body">
                                <form className="form-material">
                                    <div className="form-group" style={{marginBottom: "0px"}}>
                                        <input type="text" className="form-control form-control-line" placeholder="Try zolostays, amazon, flipkart, placement etc." value={searchTerm} onChange={handleSearchTermChange}/>
                                        <br />{searchTerm && <span className="text-primary" ng-show="searchInterview">{ filterInterviews.length } Results found</span>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        {filterInterviews && filterInterviews.map(filterInterview => {
                        return (<div className="card cc-widget" key={filterInterview._id}>
                            <div className="card-body">
                                <div className="d-flex no-block flex-row">
                                    <div className="round align-self-center round-primary m-t-10 m-b-10"><i className="icon-rocket"></i></div>
                                    <div className="m-l-10 align-self-center">
                                        <h4 className="m-b-0"><Link to={`/experience/${filterInterview._id}`} style={{color: "black"}}>{ filterInterview.title }</Link></h4>
                                        <h5 className="text-muted m-b-0"><i className="fa fa-user"></i> { filterInterview.author_name }</h5>
                                    </div>
                                </div>
                                <div className="d-flex no-block flex-row m-t-20 cc-details interview">
                                    <div dangerouslySetInnerHTML={{ __html: TruncHtml(filterInterview.experience, 230).html }} />
                                    {/* <div ng-bind-html="experience.experience | limitHtml : 230"></div> */}
                                </div>
                                <br />
                                <div>
                                    {filterInterview.tags.map(tag => {return (<span className="label label-success" style={{marginRight: "10px"}}>{ tag }</span>)})}
                                </div>
                            </div>
                        </div>)})}
                    </div>}
                </div>
            </div> }

            {/* Guide Lines to write a interview experience */}
            <div className="modal fade" id="guidelinesModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel1">Interview Experience Guidelines</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <div className="container__K-8V">
                                <div className="post-area__3YJL"><div className="content-area__2vnF"><div className="discuss-markdown-container"><p style={{fontSize: "14px"}}>Here are some suggestions for what to include in your post:</p><p style={{fontSize: "14px"}}></p><ol><li><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}><strong>The title should at least include the company and position</strong> and ideally would follow this format:</p><p style={{fontSize: "14px"}}></p><pre style={{fontSize: "13px"}}><code style={{fontSize: "13px", color: "inherit", backgroundColor: "transparent"}}>Company <span className="hljs-type">Name</span> | Position (<span className="hljs-keyword">level</span>) | <span className="hljs-keyword">Location</span> | <span className="hljs-type">Date</span>     [Result (Reject, Passed, Offer)]<br/></code></pre><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}>For example, this could look like:</p><p style={{fontSize: "14px"}}></p><pre style={{fontSize: "13px"}}><code style={{fontSize: "13px", color: "inherit", backgroundColor: "transparent"}}>Amazon | <span className="hljs-type">SDE2</span> | <span className="hljs-type">Pune</span> | <span className="hljs-type">July</span> <span className="hljs-number">2019</span> [Reject]<br/>JPMC | <span className="hljs-type">Intern</span> | <span className="hljs-type">Mumbai</span> View | <span className="hljs-type">April</span> <span className="hljs-number">2019</span> [Offer]<br/></code></pre></li><li><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}><strong>The interview process and format of each interview</strong>, for example:</p><p style={{fontSize: "14px"}}></p><pre style={{fontSize: "13px"}}><code style={{fontSize: "13px", color: "inherit", backgroundColor: "transparent"}}>Technical Test Round(1 hour):<br/> - Behavioral + Aptitude questions<br/> - Algorithm + DP question<br/>1st technical interview round: <span className="hljs-built_in">..</span>.<br/>technical Round: <span className="hljs-built_in">..</span>. <br/>Result: <span className="hljs-built_in">..</span>.<br/></code></pre></li><li><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}><strong>Your thoughts, tips to candidates and anything else you’d like to add</strong>, e.g. questions types, what to focus more, HR questions etc.</p><p style={{fontSize: "14px"}}></p></li><li><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}><strong>Tag your post</strong>, e.g. <code style={{fontSize: "13px"}}>amazon</code>, <code style={{fontSize: "13px"}}>oncampus placement interview</code>, <code style={{fontSize: "13px"}}>technical interview</code></p><p style={{fontSize: "14px"}}></p></li></ol><p style={{fontSize: "14px"}}></p><p style={{fontSize: "14px"}}><em>Different stages of the same interview process belong in the same thread. For example, if you already shared your experience with a phone interview and you reach the onsite interview, you should update your post instead of creating a new one.</em></p></div></div><div className="tag-list-container__2cDj"><div className="css-9sdfuf"></div></div></div></div><div className="root__3XxC" style={{color: "rgba(0, 0, 0, 0.65)", fontSize: "14px"}}><div className="header___QdN"></div></div>
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

export default InterviewExperiences;