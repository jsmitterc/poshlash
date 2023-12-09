// resources/js/pages/ListPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = () => {
    const items = [
        {
            'name': 'Dashboard',
            'path': '/'
        },
        {
            'name': 'Profile',
            'path': '/profile'
        },
        {
            'name': 'Setting',
            'path': '/setting'
        }
    ];

    return (
    <Drawer variant="permanent" anchor="left">
        <List>
            {items.map((item, index) => (
                <ListItem key={index} component={Link} to={item.path}>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    </Drawer>
    );
};

export default Sidebar;