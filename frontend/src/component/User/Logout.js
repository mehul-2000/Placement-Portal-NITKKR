import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, logout } from "../../actions/userAction";
import { LOGOUT_RESET } from "../../constants/userConstants"
import { useAlert } from 'react-alert';

const Logout = () => {
	const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, loading, logoutSuccess } = useSelector(state => state.user)

    useEffect(() => {
        if(error) {
            console.log(error)
            alert.error(error);
            dispatch(clearErrors());
        }
        if(logoutSuccess) {
            alert.success("Logged out successfully.");
            dispatch({type:LOGOUT_RESET});
            navigate('/')
        }
    }, [dispatch, error, alert, logoutSuccess, navigate])

	useEffect(() => {
        dispatch(logout());
    }, [dispatch])

    return (
		<>
			{loading && <div class="page-header">
				<h1>
					Logging out .... please wait....
				</h1>
			</div>}
		</>
    )
}

export default Logout