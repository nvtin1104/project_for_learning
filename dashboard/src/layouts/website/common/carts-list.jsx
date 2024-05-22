import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function CartsList({ carts }) {
CartsList.propTypes = {
    carts: PropTypes.array.isRequired,
};
return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {carts.map((cart, index) => (
            <div key={index}>
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar sx={{height: '100%', m: 0}}>
                        <Avatar alt={cart.name} src={cart.img}  variant="rounded"/>
                    </ListItemAvatar>
                    <ListItemText primary={cart.name} sx={{overflow: 'hidden'}}/>
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        ))}
    </List>
);
}