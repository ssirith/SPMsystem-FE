import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
function Carditem(){
    const [group,setGroup] = useState([{id:1,name:"SPM system",detail:"This is group detail section", advisor: 'Dr.Siam Yamsaengsung'}])
    const classes = useStyles();    
    return (
        <>
        {group.map((group,index)=>(
        <Card className={classes.root} key= {index} style = {{marginLeft:300,marginTop:80}}>
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            IT60-0{group.id} : {group.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Advisor : {group.advisor}
          </Typography>
        </CardContent>
      
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>))}
            
    
        </>
    )
}
export default Carditem