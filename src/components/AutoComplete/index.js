import React, { useState } from 'react';
import CompanyData from '../../assets/data.json';
import Autocomplete from '../SearchBar/index';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import './index.css';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  
const AutocompletePage = () => {
    const [name, setName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div className='d-flex justify-content-center mb-3'>
            <div className='search-bar-container'>
            {/* <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
                >
                All
                </Button> */}
                <Autocomplete
                    data={CompanyData}
                    onSelect={(name) => setName(name)}
                ></Autocomplete>

            </div>

                <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >

                    <StyledMenuItem>
                        <ListItemText primary="Projects" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemText primary="Contractors" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemText primary="Resources" />
                    </StyledMenuItem>
                </StyledMenu>

                

                {name && (
                        <pre className='text-left'>{JSON.stringify(name, 0, 2)}</pre>
                    )}
            
      </div>
)};
    
// const AutocompletePage = () => {
//     const [name, setName] = useState('');
//     return (
//         <>
//             <div className='d-flex justify-content-center mb-3'>
//                 <div className='search-bar-container'>
    
//                     <Autocomplete
//                         data={CompanyData}
//                         onSelect={(name) => setName(name)}
//                     />
//                 </div>
//             </div>

//             {name && (
//                 <pre className='text-left'>{JSON.stringify(name, 0, 2)}</pre>
//             )}
//         </>
//     );
// };

export default AutocompletePage;
