import React, { useState } from 'react'
import { Card, CardBody, CardTitle, CardText, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaCalendar, FaLock, FaClock } from 'react-icons/fa'

const ProfileCard = ({ details }) => {
    const [activeTab, setActiveTab] = useState('1');

    return (
        <Card>
            <CardBody className='text-center'>
                <img alt="profile_pic" height="150" width="150" className="rounded-circle img-thumbnail" src={details.picture?.large} />
                <CardTitle>
                    <h1 className="mt-3">
                        <span>{details.name?.title}. {details.name?.first} {details.name?.last}</span>
                    </h1>
                </CardTitle>

                <Nav tabs className="justify-content-center mb-4">
                    <NavItem>
                        <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                            Basic Info
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                            Location
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                            Login Info
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <CardText className='m-3'>
                            <span><FaPhone className="me-2" />{details.phone}</span>
                        </CardText>
                        <CardText className='m-3'>
                            <span><FaEnvelope className="me-2" />{details.email}</span>
                        </CardText>
                        <CardText className='m-3'>
                            <span><FaCalendar className="me-2" />
                                {new Date(details.dob?.date).toLocaleDateString()}
                                {" ("}{details.dob?.age} years old)
                            </span>
                        </CardText>
                    </TabPane>

                    <TabPane tabId="2">
                        <CardText className='m-3'>
                            <span><FaMapMarkedAlt className="me-2" />
                                {details.location?.street?.number} {details.location?.street?.name}
                            </span>
                        </CardText>
                        <CardText className='m-3'>
                            <span>
                                {details.location?.city}, {details.location?.state}
                            </span>
                        </CardText>
                        <CardText className='m-3'>
                            <span>
                                {details.location?.country}, {details.location?.postcode}
                            </span>
                        </CardText>
                    </TabPane>

                    <TabPane tabId="3">
                        <CardText className='m-3'>
                            <span><FaLock className="me-2" />Username: {details.login?.username}</span>
                        </CardText>
                        <CardText className='m-3'>
                            <span>UUID: {details.login?.uuid}</span>
                        </CardText>
                        <CardText className='m-3'>
                            <span><FaClock className="me-2" />
                                Registered: {new Date(details.registered?.date).toLocaleDateString()}
                            </span>
                        </CardText>
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    )
}

export default ProfileCard