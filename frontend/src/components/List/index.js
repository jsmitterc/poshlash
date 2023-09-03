import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import AutocompleteButton from '../AutocompleteButton';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(props) {
  const { list, handleListChange, defaultList } = props

  
   return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Elige tu especialista
          </Typography>
          <Demo>
            <List>
              {list.map(function(item,i){
                return (
                  <ListItem
                      key={i}
                      disablePadding={false}
                      alignItems='center'
                      disableGutters={true}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={item.duration}
                    />
                    <AutocompleteButton 
                      options={defaultList.find((element) => {
                        return element.title === item.title;
                      }).professional}
                      label="Servicios"
                      id={`autocompletelist-${i}`}
                      placeholder="Elige tus servicios"
                      multiple={false}
                      sx={{minWidth : 300}}
                      value={item.professional.length == 1 ? item.professional[0] : null}
                      onChange={(event, value) => {handleListChange(value)}}
                      />
                  </ListItem>
                )
              })

              }
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}