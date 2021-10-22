import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Row, Col, Button, Spin, Typography, Tag, Input, Select, Space } from "antd";
import { HddOutlined, HomeOutlined } from "@ant-design/icons";
import { isElement } from "react-dom/test-utils";

const { Text, Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Job = (props) => {
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

    React.useEffect(() => {
        getJobList(false, [], "all");
        getDepartment();
        getLocation();
        getFunction();
    }, []);

    const getJobList = (urlFlag, value, type) => {
        //setLoading(true);
        let url = "https://teknorix.jobsoid.com/api/v1/jobs";
        if (urlFlag) {
            console.log("locationTags", locationTags);
            var newArray = locationTags.join(',');
            console.log("newArray", newArray);
            url = "https://teknorix.jobsoid.com/api/v1/jobs?dept=9277";
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
                console.log("filtered ", filtered);
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

    return (

        <div style={{ marginLeft: '180px' }}>

            <div style={{ width: '948px', backgroundColor: '#f0f0f0' }}>
                <Search placeholder="Search for Job" />
                <Space size="large">
                    <Select
                        style={{ width: 250 }}
                        placeholder="Department"
                        showSearch
                        allowClear
                        mode="multiple"
                        value={deptTags}
                        onChange={(value) => {
                            setDeptTags(value)
                            getJobList(true, value, "location")
                        }}
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
                        onChange={(value) => {
                            setLocationTags(value)
                            getJobList(true, value, "location")
                        }}
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
                    }}>
                        Clear All
                    </Button>
                </Space>
            </div>
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
                                        <Text>View</Text>
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
