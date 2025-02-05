import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import logo from './picture/logo.png';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
    const navigate = useNavigate(); 
    const [selectedMenu, setSelectedMenu] = useState("home"); 
    const [collapsed, setCollapsed] = useState(false); 

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTopMenuClick = (key) => {
        setSelectedMenu(key);
    };

    const toggleSider = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "fixed",
                    width: "100%",
                    zIndex: 1000,
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div
                    className="logo-container"
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={handleLogoClick}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: 80, height: 80 }}
                    />
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{
                        margin: 0,
                        padding: 0,
                        flex: 1,
                        justifyContent: "flex-start",
                    }}
                    className="custom-menu"
                    selectedKeys={[selectedMenu]}
                >
                    <Menu.Item key="toggle-menu" onClick={toggleSider}>
                        <MenuOutlined style={{ fontSize: "18px", color: "#fff" }} />
                    </Menu.Item>
                    <Menu.Item key="home" onClick={() => handleTopMenuClick("home")}>
                        <Link to="/">Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="employees" onClick={() => handleTopMenuClick("employees")}>
                        <Link to="/employee-list">Danh sách nhân viên</Link>
                    </Menu.Item>
                    <Menu.Item key="about" onClick={() => handleTopMenuClick("about")}>
                        <Link to="/about">Giới thiệu</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            <Layout style={{ marginTop: 64 }}>
                <Sider
                    width={200}
                    collapsed={collapsed} 
                    onCollapse={(collapsed) => setCollapsed(collapsed)}
                    style={{ background: "#fff" }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedMenu]}
                        style={{
                            height: "100%",
                            borderRight: 0,
                            paddingTop: 20,
                        }}
                    >
                        {selectedMenu === "home" && (
                            <>
                                <Menu.Item key="home-1">
                                    <Link to="/home/feature-1">Feature 1</Link>
                                </Menu.Item>
                                <Menu.Item key="home-2">
                                    <Link to="/home/feature-2">Feature 2</Link>
                                </Menu.Item>
                            </>
                        )}

                        {selectedMenu === "employees" && (
                            <>
                                <Menu.Item key="employees-1">
                                    <Link to="/employee-list/department-1">Department 1</Link>
                                </Menu.Item>
                                <Menu.Item key="employees-2">
                                    <Link to="/employee-list/department-2">Department 2</Link>
                                </Menu.Item>
                            </>
                        )}

                        {selectedMenu === "about" && (
                            <>
                                <Menu.Item key="about-1">
                                    <Link to="/about/team">Our Team</Link>
                                </Menu.Item>
                                <Menu.Item key="about-2">
                                    <Link to="/about/history">History</Link>
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                </Sider>

                <Content style={{ padding: "20px", minHeight: "calc(100vh - 64px)" }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
