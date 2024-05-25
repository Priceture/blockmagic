import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import profilepic1 from "../assets/profile1.jpg";
import profilepic2 from "../assets/profile2.jpg";

export default function OurTeam() {
  return (
    <div id="ourteam" className="homepageCard">
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">Our Team</div>
        <div className="mainContent__header-explain">
          Indie hackers. Chainlink fans.
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <Card sx={{ maxWidth: 370 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={profilepic1}
              alt="Profile pic"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="text.secondary"
              >
                sitthaveet.eth
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Deadcat developer who feeds the fish inside my head.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 370 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={profilepic2}
              alt="Profile pic"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="text.secondary"
              >
                Punthira Chin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Wizard Deadcat who loves to make coding magic happen.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
