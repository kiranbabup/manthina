import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

import { motion } from "framer-motion";

import CelebrationIcon from "@mui/icons-material/Celebration";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import { eventsData } from "../assets/content";

const PandiriRataPage = () => {
  const navigate = useNavigate();

  const event = eventsData[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFF8F0",
        overflowX: "hidden",
        width: "99vw",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "60vh",
          background: "linear-gradient(135deg, #7B1FA2 0%, #C2185B 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          position: "relative",
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
              bgcolor: "rgba(255,255,255,0.15)",
              margin: "0 auto",
              mb: 2,
            }}
          >
            <CelebrationIcon sx={{ fontSize: 50 }} />
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
            Pandiri Rata
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              mb: 3,
              fontSize: {
                xs: "1.2rem",
                md: "2rem",
              },
            }}
          >
            Celebrating the Groom Haranath's Traditional Ceremony
          </Typography>

          <Chip
            label="You Are Invited"
            sx={{
              bgcolor: "white",
              color: "#C2185B",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 2,
              py: 2.5,
            }}
          />
        </motion.div>
      </Box>

      {/* EVENT DETAILS */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* LEFT CARD */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  borderRadius: "30px",
                  height: "100%",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#C2185B",
                      mb: 2,
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  >
                    Event Details
                  </Typography>

                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={4}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <AccessTimeIcon
                        sx={{
                          color: "#7B1FA2",
                          mt: 0.5,
                        }}
                      />

                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          Date & Time
                        </Typography>

                        <Typography color="text.secondary">
                          {event.date.toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </Typography>

                        <Typography color="text.secondary">
                          {event.date.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {event.endDate.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <LocationOnIcon
                        sx={{
                          color: "#7B1FA2",
                          mt: 0.5,
                        }}
                      />

                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          Venue
                        </Typography>

                        <Typography color="text.secondary">
                          {event.location}
                        </Typography>

                        <Typography color="text.secondary">
                          {event.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 2,
                      color: "text.secondary",
                      fontSize: "1.05rem",
                    }}
                  >
                    Join us as we celebrate the joyful occasion of{" "}
                    <strong>Pandiri Rata</strong> along with ongoing event of <strong>Uppanayanam</strong>, a cherished traditional
                    ceremony filled with blessings, happiness, laughter and
                    togetherness before the wedding festivities begin.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              {[
                {
                  icon: <FavoriteIcon />,
                  title: "Blessings",
                  desc: "Family and friends gather to bless the groom for a prosperous married life.",
                },
                {
                  icon: <RestaurantIcon />,
                  title: "Delicious Food",
                  desc: "Breakfast & Lunch will be served for all the guests.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      borderRadius: "25px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          bgcolor: "#F3E5F5",
                          color: "#7B1FA2",
                          mb: 2,
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Typography
                        variant="h5"
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.8,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
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
            background: "linear-gradient(135deg, #C2185B 0%, #7B1FA2 100%)",
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
            onClick={() => navigate("/manthina/")}
            sx={{
              bgcolor: "white",
              color: "#C2185B",
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
          Designed by Panigrahi Kiran Babu for Haranath's beloved guests.
        </Typography>
      </Box>
    </Box>
  );
};

export default PandiriRataPage;
