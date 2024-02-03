// import React from 'react';
import { Layout, Row, Col, Button, Card, Flex, Typography, Form, Input } from 'antd';
import './Home.css'
import { useState } from 'react';
// import {Link, } from "react-router-dom";
import { useCookies } from 'react-cookie';
// import Cookies from 'react-cookie';

import { useNavigate } from "react-router-dom";



const { Header, Content, Footer } = Layout;

const cardStyle = {
    width: '100%',
    backgroundImage: 'url("https://static.wixstatic.com/media/04df70_efc8b51ee67d4dec92b7f49d05e07c4a~mv2.png/v1/fill/w_1899,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/04df70_efc8b51ee67d4dec92b7f49d05e07c4a~mv2.png")',
    height: 446
    
};

const imgStyle = {
    display: 'inline',
    width: '374px',
    height: '288px',
    // objectFit: 'cover',
    // paddingTop: '10px',
    // paddingRight: '100px',
    // paddingBottom: '1px',
    // paddingLeft: '2px',
};

// const customBulletStyle = {
//     marginRight: '8px', // Adjust the spacing between the custom bullet and the text
//     color: '#0000FF',

//   };

const logoStyle = {
    // width: '50px', // Adjust the width of the logo as needed
    // marginRight: '8px', // Adjust the spacing between the logo and the text
};

const card2Style = {
    background: '#F1F4F8' ,
    height: 'fit-content' //'29vw',
}

const Home = () => {
    const [isHovered,setIsHovererd] = useState(false);

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');
    // const navigate = useNavigate();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['exeb2b-ccokie']);

    const formItemLayout = null;
    const buttonItemLayout = null;

    const buttonStyle = {
        background: isHovered ? '#ffffff' : '#035772',  // White background when hovered, dark green otherwise
        color: isHovered ? '#035772' : '#ffffff',  // Dark green text when hovered, white otherwise
    };

    const scrollToDiv = (divId) => {
        const element = document.getElementById(divId);
        const headerHeight = 66.1;
        if (element) {
            const offsetPosition = element.offsetTop - headerHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      };

    const getStarted = () => {
        // Check if Cookie is present (exeb2b-ccokie) and console.log its value
        const cookieValue = cookies['exeb2b-cookie'];

        // const cookieValue = Cookies.get('exeb2b-cookie');
        // console.log("cookieValue = ",cookieValue);

        if (cookieValue && cookieValue.userId !== null) { 
            navigate("/get");
        } else {
            navigate("/login");
        }
    }

    return (
        <>
        <Layout>
            <Header
                style={{
                position: 'sticky',
                background: 'white',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                }}
            >

                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col span={4} >
                    <img src={'https://static.wixstatic.com/media/04df70_8c515f0d383a41a8ac2c6b080c790953~mv2.png/v1/fill/w_53,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%203%20(1).png'} alt="Logo" style={{ width: '100%', maxWidth: '50px', marginRight: '8px',verticalAlign: 'middle'  }} />
                    <span style={{ color: '#153A5D', fontSize: '2vw', fontWeight: 'bold', verticalAlign: 'middle'  }}>Zionix</span>
                    </Col>
                    <Col span={4} offset={4}>
                        <Button
                            ghost
                            style={buttonStyle}
                            onMouseEnter={() => setIsHovererd(true)}
                            onMouseLeave={() => setIsHovererd(false)}
                            onClick={() => scrollToDiv('contactDiv')}
                        >
                            Connect
                        
                        </Button>
                    </Col>
                </Row>

            </Header>



            <Content

            >

                <Card
                    hoverable
                    style={cardStyle}
                    bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                    }}
                >
                    <Flex justify="space-between">
                        <Flex
                            vertical
                            align="flex-end"
                            justify="space-between"
                            style={{
                            paddingTop: "3%",
                            paddingLeft: "12%",
                            paddingRight: "3%",

                            }}
                        >
                            <span> 

                                <Typography.Title level={1} style={{ color: '#153A5D', fontSize: '3vw' }}>
                                Source electronic components with supply chain intelligence.
                                <br/>
                                Take actions in seconds, not weeks.
                                </Typography.Title>

                                <span style={{color:'white',fontSize:'1.5vw'}}>
                                Instant quote, one-click procurement & data platform for your electronic components
                                </span>


                                <Button type="primary" target="_blank" style={{ marginLeft: '1vw' }} onClick={getStarted}>
                                    Get Started
                                {/* <Link to={ {pathname: "/get"} }>Get Started</Link> */}
                                </Button>
                            </span>



                        </Flex>
                        
                        <Flex
                            vertical
                            align="flex-end"
                            justify="space-between"
                            style={{
                            paddingTop: "5%",
                            paddingLeft: "10%",
                            paddingRight: "5%",}}
                        >
                        <img
                            alt="avatar"
                            src="https://static.wixstatic.com/media/04df70_e38d49dde31e4b75a5d0fee870dff7e7~mv2.png/v1/fill/w_468,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Group%2076%20(1).png"
                            style={imgStyle}
                        />
                        </Flex>


                    </Flex>
                </Card>

{/* Second DIV */}
                <div>
                    <Row justify="center" gutter={26}>
                        
                        {/* First Card */}
                        <Col span={7}>
                            <Card style={card2Style}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={'https://static.wixstatic.com/media/04df70_8c515f0d383a41a8ac2c6b080c790953~mv2.png/v1/fill/w_53,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%203%20(1).png'} alt="Logo" style={{ width: '100%', maxWidth: '50px', marginRight: '8px' }} />
                                    <span style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>Zionix</span>
                                </div>

                                <h2 style={{textAlign: 'center' }}>Quote & Procurement</h2>

                                <ul>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span >Get Instant quote for your BOM from Global Authorised distributors along with Indian Authorised distributors</span>
                                    </div>

                                    <br/>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Procure components at the desired lead time</span>
                                    </div>

                                    <br/>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Get your products to market faster with order tracking and management</span>
                                    </div>

                                </ul>
                            </Card>
                        </Col>

                        <Col span={7}>
                            <Card style={card2Style}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={'https://static.wixstatic.com/media/04df70_8c515f0d383a41a8ac2c6b080c790953~mv2.png/v1/fill/w_53,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%203%20(1).png'} alt="Logo" style={{ width: '100%', maxWidth: '50px', marginRight: '8px' }} />
                                    <span style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>Zionix</span>
                                </div>
                            
                                <h2 style={{textAlign: 'center' }}>Intelligence for Indian supply chain</h2>

                                <ul>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Identify high-risk single-sourced parts </span>
                                    </div>

                                    <br/>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Get notified about changes with the components in your BOM with PCNs </span>
                                    </div>

                                    <br/>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Take actions with alternate suggestions, avoid redesigns, and mitigate obsolescence</span>
                                    </div>

                                    <br/>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={logoStyle}><img src='https://static.wixstatic.com/media/04df70_d7666e73b64b4e50ba9c31777bc65df0~mv2.png/v1/fill/w_44,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tick.png'></img></div>
                                        <span>Give your whole team access to detailed, accurate supply health and historical market data on millions of electronics components.</span>
                                    </div>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <br/>

{/* Third DIV */}
                <div id= "contactDiv" style={{ width: '580px', margin: 'auto' }}>

                    <b style={{fontSize: "1.5vw", marginBottom: '10px'}}>To try the product, let's get on a short meeting.</b>

                    <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{
                            layout: formLayout,
                        }}
                        style={{ marginTop: "1.5vw" }}
                    > 
                    

                        <Form.Item 
                        label="Name"
                        name="name"
                        className="custom-form-item"
                        >
                            <Input className="custom-input"/>
                        </Form.Item>

                        <Form.Item 
                        label="Company Name"
                        name="company_name"
                        className="custom-form-item"
                        >
                            <Input className="custom-input"/>
                        </Form.Item>

                        <Form.Item label="Email *" 
                        name="email"
                        className="custom-form-item"
                        >
                            <Input className="custom-input"/>
                        </Form.Item>

                        <Form.Item 
                        label="Contact Number *"
                        name="contact_number"
                        className="custom-form-item"
                        >
                            <Input className="custom-input"/>
                        </Form.Item>

                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" style={{width: '100%'}}>Request for demo</Button>
                        </Form.Item>
                    </Form>
                </div>

                <div style={{backgroundImage: 'url("https://static.wixstatic.com/media/04df70_dc86b8a5a82746e1a6f31330dc44a3a1~mv2.png/v1/fill/w_1613,h_437,al_c,q_90,enc_auto/Rectangle%20101%20(1).png")', height: '420px', width:'100%', textAlign: 'center'}}>
                    <img src='https://static.wixstatic.com/media/04df70_fe30bd73bf4d4b1989d787a4351b69a7~mv2.jpg/v1/fill/w_79,h_76,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/04df70_fe30bd73bf4d4b1989d787a4351b69a7~mv2.jpg' style={{marginTop:'2vw',height:61, width:63}}></img>
                    <h1 style={{color:'white', fontSize:'2.5vw'}}>Excess Component Community</h1>

                    <p style={{color: 'white',fontSize:'1.5vw'}}>- A trusted online community to sell your excess components</p>
                    <p style={{color: 'white',fontSize:'1.5vw',marginLeft:'0.45vw'}}>- A component marketplace built exclusively for reputed OEM</p>
                    <p style={{color: 'white',fontSize:'1.5vw',textAlign:'left',marginLeft:'29.6vw'}}>and EMS companies.</p> 

              
                    <Button>Interested to join!</Button>


                </div>

                {/* <div
                style={{
                    padding: 24,
                    minHeight: 380,
                }}
                >
                Content
                </div> */}
                <div style={{height:'3vw'}}>

                </div>

            </Content>


            
            <Footer
                style={{
                textAlign: 'left',
                backgroundColor: 'black',
                }}
            >

                <div style={{color:'white', paddingLeft: '6vw'}} >
                    <h4 style={{ marginTop: 0 }}>Contact Us</h4>
                    <p style={{ margin: 0,marginBottom: 2 }}>Contact Number : +91 6393 458 409</p>
                    <p style={{ margin: 0,marginBottom: 2 }}>Email : info@zionix.in</p>
                    <p style={{ margin: 0 }}>Office : Chennai, Pune</p>

                    <br/>
                    <div style={{ display: 'flex' }}>
                        <p style={{ margin: 0 }}>Terms & Conditions | Privacy Policy</p>
                        <p style={{ margin:0, marginLeft:100 }}>Copyright © 2023 Zionix All Rights Reserved.</p>
                    </div>
                </div>
            </Footer>
        </Layout>
        </>

    );
};

export default Home;