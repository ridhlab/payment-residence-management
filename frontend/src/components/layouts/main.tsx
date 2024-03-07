import {
    DashboardOutlined,
    FieldTimeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Grid,
    Layout,
    Menu,
    Space,
    Typography,
    theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/list-route";

interface IProps {
    children: React.ReactNode;
    title: string;
    breadcrumbs?: { label: string; href: string }[];
}

const menuKey = {
    Dashboard: ROUTES.DASHBOARD,
    House: ROUTES.HOUSE_INDEX,
    Occupant: ROUTES.OCCUPANT_INDEX,
};

export default function MainLayout({ children, ...props }: IProps) {
    const [isSiderCollapsed, setIsSiderCollapsed] = React.useState(false);
    const [activeMenuKey, setActiveMenuKey] = React.useState(null);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();

    const { md } = Grid.useBreakpoint();

    const menuItems = React.useMemo<ItemType<MenuItemType>[]>(
        () => [
            {
                key: menuKey.Dashboard,
                icon: <DashboardOutlined />,
                label: <Link to={ROUTES.DASHBOARD}>Dashboard</Link>,
            },
            {
                key: menuKey.House,
                icon: <DashboardOutlined />,
                label: <Link to={ROUTES.HOUSE_INDEX}>Rumah</Link>,
            },
            {
                key: menuKey.Occupant,
                icon: <FieldTimeOutlined />,
                label: <Link to={ROUTES.OCCUPANT_INDEX}>Penghuni</Link>,
            },
        ],
        []
    );

    React.useEffect(() => {
        setIsSiderCollapsed(!md);
    }, [md]);

    React.useEffect(() => {
        setActiveMenuKey(location.pathname);
    }, [location]);

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                width={240}
                collapsed={isSiderCollapsed}
                style={{
                    height: "100vh",
                    overflow: "auto",
                    padding: "2rem 0",
                }}
            >
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
                    <h1
                        style={{
                            fontSize: "2rem",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        LOGO
                    </h1>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={activeMenuKey}
                        items={menuItems}
                    />
                </Space>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            isSiderCollapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setIsSiderCollapsed(!isSiderCollapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{ padding: "2rem 1rem" }}>
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size={24}
                    >
                        <Space direction="vertical" size={0}>
                            <Typography.Title level={4}>
                                {props.title}
                            </Typography.Title>
                            <Breadcrumb
                                items={props.breadcrumbs?.map(
                                    ({ href, label }) => ({
                                        title: <Link to={href}>{label}</Link>,
                                    })
                                )}
                            />
                        </Space>
                        {children}
                    </Space>
                </Content>
            </Layout>
        </Layout>
    );
}
