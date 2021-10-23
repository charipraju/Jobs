import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import './job.css'
import { Row, Col, Button, Spin, Typography, Tag, Input, Select, Space } from "antd";
import { HddOutlined, HomeOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const JobDetail = (props) => {
    let history = useHistory();
    const [alertVisible, setVisible] = useState(false);
    const [getMessage, setMessage] = useState("");
    const [getType, setType] = useState("error");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [showList, setShowList] = useState(false);

    React.useEffect(() => {
        console.log("id", props.history.location.state.jobId);
        if (props.history && props.history.location.state.jobId) {
            getJobDetail(props.history.location.state.jobId);
            getJobList();
        }
        else {
            history.push("/");
        }

    }, []);

    const getJobDetail = async (id) => {
        console.log("jobId",);
        //setLoading(true);
        await fetch("https://teknorix.jobsoid.com/api/v1/jobs/" + id, {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setDetails(response);
                setShowDetail(true);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getJobList = () => {
        //setLoading(true);
        fetch("https://teknorix.jobsoid.com/api/v1/jobs", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setJobList(response);
                setLoading(false);
                setShowList(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const showContent = () => {
        return (
            <div style={{width:'755px', float: 'left', marginRight:'10px'}}>
                <h2>{details.department.title + " Department at " + details.company}</h2>
                <h1>{details.title}</h1>
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <Space>
                            <span >
                                <HddOutlined style={{ marginRight: '5px' }} />
                                <Text>{details.department.title}</Text>
                            </span>
                            <span>
                                <HomeOutlined style={{ marginRight: '5px' }} />
                                <Text>{details.location.title}</Text>
                            </span>

                            <Tag>{details.type}</Tag>
                        </Space>
                    </Col>
                </Row>
                <Button style={{margin: '10px'}} type="primary" shape="round">Apply</Button>
                <div dangerouslySetInnerHTML={{ __html: details.description }} />
                <div>

                </div>
            </div>
        )
    }

    const showListContent = () => {
        return (
            <div style={{backgroundColor: '#e1f1f7', width: '400px', height: '500px', overflow: 'auto'}}>
                {
                    jobList.map((obj) => (
                        <>
                            <Title level={4}>{obj.title}</Title>
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
                                        <Button onClick={() => getJobDetail(obj.id)}>View</Button>
                                    </Space>
                                </Col>
                            </Row>
                        </>
                    ))
                }
            </div>
        )
    }

    return (

        <div style={{ margin:'90px' }}>

            {showDetail ? showContent() : null}
            {showList ? showListContent() : null}
        </div>

    );
}
export default JobDetail;
