import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Button, Toolbar, AppBar, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    '& button': {
      backgroundColor: '#002639',
      '&:hover': {
        backgroundColor: '#004c72'
      }
    }
  },
})

const Header = ({setDataEdit, handleOpen}) => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.header}>
        <Typography sx={{fontSize: '23px', fontWeight: 'bold'}}>medcloud</Typography>
        <Button  variant="contained" startIcon={<PersonAddIcon/>} onClick={() => {setDataEdit({}), handleOpen()}}>cadastro</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;