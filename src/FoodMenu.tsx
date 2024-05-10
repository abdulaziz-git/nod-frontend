import React, {useContext, useEffect} from 'react';
import {QuantityContext} from "./CartProvider";
import WeekMenu from "./WeekMenu";
import {Box, Divider, Typography} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";

const FoodMenu: React.FC = () => {
    const theme = useTheme() as Theme;
    const {updateFoodMenu, weeklyMenu} = useContext(QuantityContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/menu.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                const data = await response.json();
                data.forEach((week:any) => {
                   week.days.forEach((day:any) => {
                        day.meals.forEach((meal:any) => {
                            meal.date = day.date
                        })
                   })
                });
                updateFoodMenu(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                window.alert('Error loading Menu')
            }
        };

        fetchData();
    }, []);

    if (!weeklyMenu || weeklyMenu.length === 0) return <div>loading menu...</div>

    return (
        <div>
            <Box mb={1}>
            <Typography variant={'h6'}>CREATE YOUR MEAL PROGRAM</Typography>
            <Typography variant={'body2'} style={{display:'flex', alignItems:'center'}}><CheckCircle sx={{fontSize:14, marginRight:1, color:theme.palette.grey[300]}} /> <span>5% off for 3 or more servings on any meal</span></Typography>
            <Typography variant={'body2'} style={{display:'flex', alignItems:'center'}}><CheckCircle sx={{fontSize:14, marginRight:1, color:theme.palette.grey[300]}} /> <span>10% for whole week subscriptions</span></Typography>
            <Typography variant={'body2'} style={{display:'flex', alignItems:'center'}}><CheckCircle sx={{fontSize:14, marginRight:1, color:theme.palette.grey[300]}} /> <span>Free addon with three or more days (select at checkout)</span></Typography>
            <Typography variant={'body2'} style={{display:'flex', alignItems:'center'}}><CheckCircle sx={{fontSize:14, marginRight:1, color:theme.palette.grey[300]}} /> <span>Enable substitutions and recipes requests with Monthly subscriptions</span></Typography>
            </Box>
            <Divider />
            {weeklyMenu.map((week, index) => (
                <WeekMenu key={`week-${week.week_name}`} week={week} index={index} />
            ))}
        </div>
    );
};

export default FoodMenu;
