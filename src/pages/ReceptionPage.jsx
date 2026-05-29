import React from "react";

import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import { motion } from "framer-motion";
import { eventsData } from "../assets/content";

const ReceptionPage = () => {
  const navigate = useNavigate();

  const event = eventsData[3];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F9F5FF", width: "99vw" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "65vh",
          background: "linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 2,
          color: "#fff",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "rgba(255,255,255,0.2)",
              margin: "0 auto",
              mb: 2,
            }}
          >
            <NightlifeIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: {
                xs: "2.8rem",
                md: "5rem",
              },
            }}
          >
            Reception Night
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.95,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            An elegant evening of celebration, togetherness, happiness and
            blessings.
          </Typography>

          <Chip
            label="You Are Invited"
            sx={{
              mt: 4,
              bgcolor: "#fff",
              color: "#6A1B9A",
              fontWeight: "bold",
              px: 2,
              py: 2.5,
            }}
          />
        </motion.div>
      </Box>

      {/* DETAILS */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: "30px" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#6A1B9A",
                    mb: 3,
                    fontSize: {
                      xs: "2rem",
                      md: "3rem",
                    },
                  }}
                >
                  Reception Details
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Stack spacing={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <AccessTimeIcon sx={{ color: "#6A1B9A", mt: 0.7 }} />

                    <Box>
                      <Typography variant="h6">Time</Typography>

                      <Typography color="text.secondary">
                        June 25, 2026
                      </Typography>

                      <Typography color="text.secondary">
                        7:00 PM - 11:00 PM
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <LocationOnIcon sx={{ color: "#6A1B9A", mt: 0.7 }} />

                    <Box>
                      <Typography variant="h6">Venue</Typography>

                      <Typography color="text.secondary">
                        {event.address}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <DinnerDiningIcon sx={{ color: "#6A1B9A", mt: 0.7 }} />

                    <Box>
                      <Typography variant="h6">Dinner</Typography>

                      <Typography color="text.secondary">
                        Traditional & Grand dinner arrangements will be provided
                        for all guests.
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  href={event.mapLink}
                  target="_blank"
                  sx={{
                    mt: 5,
                    borderRadius: "12px",
                  }}
                >
                  View Location in Map
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: "30px",
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  p: 5,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#F3E5F5",
                    color: "#6A1B9A",
                    margin: "0 auto",
                    mb: 3,
                  }}
                >
                  <NightlifeIcon sx={{ fontSize: 45 }} />
                </Avatar>

                <Typography variant="h4" sx={{ mb: 3 }}>
                  Celebrate Together
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 2,
                  }}
                >
                  Join us for a memorable evening filled with joy, laughter,
                  dinner and beautiful moments as we celebrate our new
                  beginning.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* BOTTOM CTA */}
        <Box
          sx={{
            mt: 5,
            textAlign: "center",
            p: {
              xs: 4,
              md: 8,
            },
            borderRadius: "35px",
            background: "linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontSize: {
                xs: "2rem",
                md: "3.5rem",
              },
            }}
          >
            Your Presence Means A Lot
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            We warmly invite you and your family to grace this auspicious
            occasion and make the celebration even more memorable with your
            blessings and presence.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              bgcolor: "white",
              color: "#6A1B9A",
              px: 5,
              py: 1.8,
              borderRadius: "15px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            See Wedding Details
          </Button>
        </Box>
      </Container>

      {/* FOOTER */}
      <Box
        sx={{
          py: 5,
          px: 2,
          textAlign: "center",
          bgcolor: "#F8EDEB",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#C2185B",
            mb: 1,
          }}
        >
          Manthina's Wedding Celebrations
        </Typography>

        <Typography color="text.secondary">
          Designed with ❤️ by Manthina Kiran Babu for our beloved guests
        </Typography>
      </Box>
    </Box>
  );
};

export default ReceptionPage;
