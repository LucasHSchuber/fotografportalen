import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Sidemenu_teamleader from "../../components/teamleader/sidemenu_teamleader";

import '../../assets/css/teamleader/main_teamleader.css';


function Addleaderinfo_teamleader() {
    // Define states
    const [formData, setFormData] = useState({
        teamname: "",
        leader_firstname: "",
        leader_lastname: "",
        leader_mobile: "",
        leader_email: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        teamname: false,
        leader_firstname: false,
        leader_lastname: false,
        leader_mobile: false,
        leader_email: false
    });
    const navigate = useNavigate();





    useEffect(() => {
        let newteam_teamname = localStorage.getItem("newteam_teamname");
        let newteam_leaderfirstname = localStorage.getItem("newteam_leaderfirstname");
        let newteam_leaderlastname = localStorage.getItem("newteam_leaderlastname");
        let newteam_leaderemail = localStorage.getItem("newteam_leaderemail");
        let newteam_leadermobile = localStorage.getItem("newteam_leadermobile");
        if (newteam_teamname != "" || newteam_leaderfirstname != "" || newteam_leaderlastname != "" || newteam_leadermobile != "" || newteam_leaderemail != "") {
            setFormData({
                teamname: newteam_teamname,
                leader_firstname: newteam_leaderfirstname,
                leader_lastname: newteam_leaderlastname,
                leader_email: newteam_leaderemail,
                leader_mobile: newteam_leadermobile
            });
        }

    }, [])


    const handleCancel = () => {
        let project_id = localStorage.getItem("project_id");
        navigate(`/portal_teamleader/${project_id}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage({ ...errorMessage, [name]: false }); //clear error-border if typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let project_id = localStorage.getItem("project_id");
        // console.log(project_id);
        // try {
        //     const teamData = await window.api.createNewTeam({
        //         ...formData,
        //         // calendar_amount: amountNumber,
        //         project_id: project_id
        //     });
        //     console.log('Team response:', teamData);

        //     if (teamData && teamData.statusCode === 1) {
        //         //get latest tuppel in teams-table
        //         try {
        //             console.log("OK OK OK");
        //             const teamsData = await window.api.getTeamsByProjectId(project_id);
        //             console.log('Teams:', teamsData.teams);
        //             setTimeout(() => {
        //                 const lastObject = teamsData.teams[teamsData.teams.length - 1];
        //                 console.log('Last Object:', lastObject);
        //                 localStorage.setItem("team_id", lastObject.team_id);
        //             }, 1000);
        //         } catch (error) {
        //             console.error('Error fetching teams:', error);
        //         }
        //     }

        // } catch (error) {
        //     console.error('Error adding team:', error);
        // }

        // if (!formData.teamname && !formData.leader_firstname && !formData.leader_lastname && !formData.leader_email && !formData.leader_mobile) {
        //     setErrorMessage(prevState => ({
        //         ...prevState,
        //         teamname: true,
        //         leader_firstname: true,
        //         leader_lastname: true,
        //         leader_mobile: true,
        //         leader_email: true
        //     }));
        //     return;
        // } else if (!formData.teamname) {
        //     setErrorMessage(prevState => ({ ...prevState, teamname: true }));
        //     return;
        // } else if (!formData.leader_firstname) {
        //     setErrorMessage(prevState => ({ ...prevState, leader_firstname: true }));
        //     return;
        // } else if (!formData.leader_lastname) {
        //     setErrorMessage(prevState => ({ ...prevState, leader_lastname: true }));
        //     return;
        // } else if (!formData.leader_mobile) {
        //     setErrorMessage(prevState => ({ ...prevState, leader_mobile: true }));
        //     return;
        // } else if (!formData.leader_email) {
        //     setErrorMessage(prevState => ({ ...prevState, leader_email: true }));
        //     return;
        // } else {
        //     setErrorMessage(prevState => ({
        //         ...prevState,
        //         teamname: false,
        //         leader_firstname: false,
        //         leader_lastname: false,
        //         leader_mobile: false,
        //         leader_email: false
        //     }));
        // }


        // Set error messages
        let errors = {};
        if (!formData.teamname) errors.teamname = true;
        if (!formData.leader_firstname) errors.leader_firstname = true;
        if (!formData.leader_lastname) errors.leader_lastname = true;
        if (!formData.leader_mobile) errors.leader_mobile = true;
        if (!formData.leader_email) errors.leader_email = true;

        // Update error message state
        setErrorMessage(errors);

        // Check if any errors exist
        if (Object.keys(errors).length > 0) {
            return; // Exit the function if there are errors
        }


        //store data in localstorage
        localStorage.setItem("newteam_teamname", formData.teamname);
        localStorage.setItem("newteam_leaderfirstname", formData.leader_firstname);
        localStorage.setItem("newteam_leaderlastname", formData.leader_lastname);
        localStorage.setItem("newteam_leaderemail", formData.leader_email);
        localStorage.setItem("newteam_leadermobile", formData.leader_mobile);

        setFormData({
            teamname: "",
            leader_firstname: "",
            leader_lastname: "",
            leader_mobile: "",
            leader_email: "",
        });

        navigate(`/calendarsale_teamleader`);
    };



    return (
        <div className="teamleader-wrapper">

            <div className="breadcrumbs d-flex mb-4">
                <div className="breadcrumbs-box breadcrumbs-active">1. New team</div>
                <div className="breadcrumbs-box">2. Calander</div>
                <div className="breadcrumbs-box">3. Calendar information</div>
            </div>

            <div className="header">
                <h5><FontAwesomeIcon icon={faPlus} /> New team</h5>
            </div>

            {/* {errorMessage && (
                <ul className="error">
                    {errorMessage.teamname && <li>Fill out team name</li>}
                    {errorMessage.leader_firstname && <li>Fill out leader first name</li>}
                    {errorMessage.leader_lastname && <li>Fill out leader last name</li>}
                    {errorMessage.leader_email && <li>Fill out leader email</li>}
                    {errorMessage.leader_mobile && <li>Fill out leader mobile</li>}
                </ul>
            )} */}

            <form onSubmit={handleSubmit}>
                <div className="mt-4 mb-2">
                    <h6><b>Team info:</b></h6>
                    <div>
                        <input className={`form-input-field ${errorMessage.teamname ? "error-border" : ""}`} type="text" name="teamname" value={formData.teamname} onChange={handleChange} placeholder="Team Name" />
                    </div>
                    {/* <div>
                        <input className="form-input-field" type="number" name="calendar_amount" value={formData.calendar_amount} onChange={handleChange} placeholder="Amount of calendars" required />
                        <h6>All</h6>
                    </div> */}
                    <br></br>
                    <h6><b>Team leader info:</b></h6>
                    <div>
                        <input className={`form-input-field ${errorMessage.leader_firstname ? "error-border" : ""}`} type="text" name="leader_firstname" value={formData.leader_firstname} onChange={handleChange} placeholder="Leader First Name" />
                    </div>
                    <div>
                        <input className={`form-input-field ${errorMessage.leader_lastname ? "error-border" : ""}`} type="text" name="leader_lastname" value={formData.leader_lastname} onChange={handleChange} placeholder="Leader Last Name" />
                    </div>
                    {/* <div>
                        <input className="form-input-field" type="text" name="leader_address" value={formData.leader_address} onChange={handleChange} placeholder="Leader Address" required />
                    </div>
                    <div>
                        <input className="form-input-field" type="number" name="leader_postalcode" value={formData.leader_postalcode} onChange={handleChange} placeholder="Leader Postal Code" required />
                    </div>
                    <div>
                        <input className="form-input-field" type="text" name="leader_county" value={formData.leader_county} onChange={handleChange} placeholder="Leader County" required />
                    </div> */}
                    <div>
                        <input className={`form-input-field ${errorMessage.leader_email ? "error-border" : ""}`} type="email" name="leader_email" value={formData.leader_email} onChange={handleChange} placeholder="Leader Email" />
                    </div>
                    {/* <div>
                        <input className="form-input-field" type="number" name="leader_ssn" value={formData.leader_ssn} onChange={handleChange} placeholder="Leader SSN" required />
                    </div> */}
                    <div>
                        <input className={`form-input-field ${errorMessage.leader_mobile ? "error-border" : ""}`} type="text" name="leader_mobile" value={formData.leader_mobile} onChange={handleChange} placeholder="Leader Mobile" />
                    </div>
                </div>

                <div>
                    <button className="button cancel fixed-width mr-1" onClick={handleCancel}>Cancel</button>
                    <button className="button standard fixed-width" type="submit">Next</button>
                </div>
            </form>

            <Sidemenu_teamleader />
        </div>
    );
}
export default Addleaderinfo_teamleader;