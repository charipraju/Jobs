import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { Row, Col, Button, Spin, Typography, Tag, Input, Select, Space } from "antd";
import { HddOutlined, HomeOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Job = (props) => {
    let history = useHistory();
    const [alertVisible, setVisible] = useState(false);
    const [getMessage, setMessage] = useState("");
    const [getType, setType] = useState("error");
    const [loading, setLoading] = useState(false);
    const [jobList, setJobList] = useState([]);
    const [department, setDepartment] = useState([]);
    const [location, setLocation] = useState([]);
    const [functionData, setFunction] = useState([]);
    const [deptTags, setDeptTags] = useState([]);
    const [locationTags, setLocationTags] = useState([]);
    const [funcTags, setFuncTags] = useState([]);
    const [searchFlag, setSearchFlag] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    React.useEffect(() => {
        getJobList(false);
        getDepartment();
        getLocation();
        getFunction();
    }, []);

    React.useEffect(() => {
        //if (!firstTimeRender.current) {
        if (searchFlag) {
            getJobList(true);
        }
        //}
        setSearchFlag(true);
    }, [deptTags, locationTags, funcTags]);

    const getJobList = (urlFlag) => {
        //setLoading(true);
        let url = "https://teknorix.jobsoid.com/api/v1/jobs";
        if (urlFlag) {
            console.log("locationTags", locationTags);
            var newArray = "";
            var newArray1 = "";
            var newArray2 = "";
            var newArray3 = "";
            if (locationTags.length > 0) {
                newArray = locationTags.join('&loc=');
                newArray = "&loc=" + newArray;
            }
            if (deptTags.length > 0) {
                newArray1 = deptTags.join('&dept=');
                newArray1 = "&dept=" + newArray1;
            }
            if (funcTags.length > 0) {
                newArray2 = funcTags.join('&fun=');
                newArray2 = "&fun=" + newArray2;
            }
            if (searchQuery) {
                newArray3 = "&q=" + searchQuery;
            }
            let searchString = newArray1 + newArray + newArray2 + newArray3;
            searchString = searchString.substring(1);
            console.log("searchString", searchString);
            if (searchString) {
                url = "https://teknorix.jobsoid.com/api/v1/jobs?" + searchString;
            }
        }

        fetch(url, {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {

                let heading = [];
                response && response.map((item) => {
                    heading.push(item.function);
                });
                var filtered = heading.filter(function ({ id }) {
                    var key = `${id}`;
                    return !this.has(key) && this.add(key);
                }, new Set);

                filtered.map((item) => {
                    response && response.map((obj) => {
                        if (item.id === obj.function.id) {
                            if (item.content) {
                                item.content.push(obj);
                            }
                            else {
                                item.content = [];
                            }
                        }
                    });
                    return { ...item };
                });
                setJobList(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getDepartment = () => {
        ///setLoading(true);
        fetch("https://teknorix.jobsoid.com/api/v1/departments", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setDepartment(response);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getLocation = () => {
        ///setLoading(true);
        fetch("https://teknorix.jobsoid.com/api/v1/locations", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setLocation(response);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getFunction = () => {
        ///setLoading(true);
        fetch("https://teknorix.jobsoid.com/api/v1/functions", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setFunction(response);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const goToDetails = (id) => {
        history.push("/Detail", {
            jobId: id
        });
        //<Link to="/Detail" />
        // <Link to={{
        //     pathname: "/Detail",
        //     //state: id
        // }} />
    }

    return (

        <div style={{ marginLeft: '180px', marginTop:'90px' }}>

            <div style={{ width: '948px', backgroundColor: '#f0f0f0', padding:'10px' }}>
                <Search value={searchQuery} placeholder="Search for Job" onChange={(e) => setSearchQuery(e.target.value)} onSearch={() => getJobList(true)} style={{marginBottom:'10px'}} />
                <Space size="large">
                    <Select
                        style={{ width: 250 }}
                        placeholder="Department"
                        showSearch
                        allowClear
                        mode="multiple"
                        value={deptTags}
                        onChange={(value) =>
                            setDeptTags(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {department && department.map((item) => (
                            <Option key={item.id} value={item.id}>{item.title}</Option>
                        ))}
                    </Select>
                    <Select
                        style={{ width: 250 }}
                        placeholder="Location"
                        showSearch
                        allowClear
                        mode="multiple"
                        value={locationTags}
                        onChange={(value) =>
                            setLocationTags(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {location && location.map((item) => (
                            <Option key={item.id} value={item.id}>{item.title}</Option>
                        ))}
                    </Select>
                    <Select
                        style={{ width: 250 }}
                        placeholder="Function"
                        showSearch
                        allowClear
                        mode="multiple"
                        value={funcTags}
                        onChange={(value) => setFuncTags(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {functionData && functionData.map((item) => (
                            <Option key={item.id} value={item.id}>{item.title}</Option>
                        ))}
                    </Select>
                    <Button style={{ color: '#7be06e' }} type="text" onClick={() => {
                        setDeptTags([])
                        setLocationTags([])
                        setFuncTags([])
                        setSearchQuery("")
                    }}>
                        Clear All
                    </Button>
                </Space>
            </div>
            {/* TODO: make common component, same structure is used in details page */}
            {
                jobList.map((item) => (
                    <>
                        <Title level={2}>{item.title}</Title>

                        {item.content.map((obj) => (<>

                            <Title level={3}>{obj.title}</Title>
                            <Row gutter={[16, 24]}>
                                <Col span={12}>
                                    <Space>
                                        <span >
                                            <HddOutlined style={{ marginRight: '5px' }} />
                                            <Text>{obj.department.title}</Text>
                                        </span>
                                        <span>
                                            <HomeOutlined style={{ marginRight: '5px' }} />
                                            <Text>{obj.location.title}</Text>
                                        </span>

                                        <Tag>{obj.type}</Tag>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space size="large">
                                        <Button>Apply</Button>
                                        <Button onClick={() => goToDetails(obj.id)}>View</Button>
                                    </Space>
                                </Col>
                            </Row></>
                        ))}
                    </>
                ))
            }
        </div>
    );
}
export default Job;
