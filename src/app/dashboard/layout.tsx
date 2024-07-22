import React, {useState} from "react";
import {Layout, Menu, MenuProps, Slider} from "antd";
import {
    DesktopOutlined,
    FileOutlined, LogoutOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Link from "next/link";


type MenuItem = Required<MenuProps>['items'][number];
export default function DashboardLayout({children}: { children: React.ReactNode }) {
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Cars', '1', <Link href={"/dashboard/all"}><PieChartOutlined/></Link>),
        getItem('New Car', '2', <Link href={"/dashboard/new"}><PlusOutlined/></Link>),
        getItem('Logout', '9', <Link href={"/logout"}><LogoutOutlined/></Link>),
    ];


    return (
        <Layout style={{minHeight: "100vh"}}>

            <Header>Header</Header>
                <Layout hasSider={true}>
                    <Sider>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>

                    </Sider>
                    <Layout>


                        <Content>
                            {children}
                        </Content>
                        <Footer>Footer</Footer>

                    </Layout>
                </Layout>


        </Layout>
    )
}