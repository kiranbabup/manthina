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
  Chip,
  Button,
} from "@mui/material";

import { motion } from "framer-motion";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useNavigate } from "react-router-dom";
import GalleryComponent from "../components/GalleryComponent";

import kiranHaldip1 from "../assets/haldi_p1.jpg";
import binduHaldib1 from "../assets/haldi_b1.png";
import { eventsData } from "../assets/content";

const galleryImages = [
  {
    img: kiranHaldip1,
    title: "Kiran's Haldi Poster-1",
  },
  {
    img: binduHaldib1,
    title: "Bindu's Haldi Poster-1",
  }
];

const HaldiFunctionPage = () => {
  const navigate = useNavigate();

    const event = eventsData[1];
    // console.log(event);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF9E6", width: "99vw" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "65vh",
          background: "linear-gradient(135deg, #F9A825 0%, #FFCA28 100%)",
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
            <WbSunnyIcon sx={{ fontSize: 50 }} />
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
            Haldi Event
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: "auto",
              opacity: 0.95,
            }}
          >
            A joyful celebration filled with turmeric, laughter, blessings,
            music and unforgettable memories for Kiran's Marraige.
          </Typography>

          <Chip
            label="You Are Invited"
            sx={{
              mt: 2,
              bgcolor: "#fff",
              color: "#F57F17",
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
            <Card
              sx={{
                borderRadius: "30px",
                boxShadow: "0 15px 50px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#F57F17",
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

                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <AccessTimeIcon sx={{ color: "#F9A825", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Date & Time</Typography>
                      <Typography color="text.secondary">
                        {event.date.toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Typography>
                      <Typography color="text.secondary">
                        7:00 AM - 6:00 PM
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <LocationOnIcon sx={{ color: "#F9A825", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Venue</Typography>

                      <Typography color="text.secondary">
                        {event.address}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              {[
                {
                  icon: <EmojiEmotionsIcon />,
                  title: "Fun & Joy",
                  desc: "Experience vibrant moments with family, laughter and blessings.",
                },
                {
                  icon: <RestaurantIcon />,
                  title: "Food Arrangements",
                  desc: "Delicious Breakfast, Lunch and Dinner will be served for the guests.",
                },
                {
                  icon: <MusicNoteIcon />,
                  title: "Music & Dance",
                  desc: "Traditional music and dance performances throughout the celebration.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card
                    sx={{
                      borderRadius: "25px",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          bgcolor: "#FFF3CD",
                          color: "#F57F17",
                          mb: 2,
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Typography variant="h5" sx={{ mb: 1 }}>
                        {item.title}
                      </Typography>

                      <Typography color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <GalleryComponent
          galleryTitle="Haldi Posters"
          galleryImages={galleryImages}
        />

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
            background: "linear-gradient(135deg, #F9A825 0%, #FFCA28 100%)",
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
          Designed with ❤️ by Manthina Kiran Babu for our beloved guests
        </Typography>
      </Box>
    </Box>
  );
};

export default HaldiFunctionPage;
