import React, {useState, useEffect} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import style from "./BottomNavStyle";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import {useHistory, useLocation} from "react-router-dom";

const BottomNav = ({classes}) => {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        switch (location.pathname) {
            case "/app/dashboard":
                if (value !== 0) {
                    setValue(0);
                }
                break;
            case "/app/scanner":
                if (value !== 1) {
                    setValue(1);
                }
                break;
            case "/app/details":
                if (value !== 2) {
                    setValue(2);
                }
                break;
        }
    }, [location]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                history.push("/app/dashboard");
                break;
            case 1:
                history.push("/app/scanner");
                break;
            case 2:
                history.push("/app/details");
                break;
            default:
                history.push("/app/dashboard");
                break;
        }
    };

    return (
        <div className={classes.wrapper}>
            <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.root}>
                <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction label="Scanner" icon={<PhotoCameraIcon />} />
                <BottomNavigationAction label="Mobs" icon={<ArtTrackIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default withStyles(style)(BottomNav);
