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

import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WcIcon from "@mui/icons-material/Wc";
import GalleryComponent from "../components/GalleryComponent";

import kiranWeddingp1 from "../assets/wedding_p1.jpg";
import binduWeddingb1 from "../assets/wedding_b1.png";
import { eventsData } from "../assets/content";

const galleryImages = [
  {
    img: kiranWeddingp1,
    title: "Kiran's Wedding Poster-1",
  },
  {
    img: binduWeddingb1,
    title: "Bindu's Wedding Poster-1",
  }
];

const WeddingCeremonyPage = () => {
  const navigate = useNavigate();

  const event = eventsData[2];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF5F7", width: "99vw" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "65vh",
          background: "linear-gradient(135deg, #C2185B 0%, #8E24AA 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
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
            <FavoriteIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: {
                xs: "2.2rem",
                md: "5rem",
              },
            }}
          >
            Wedding Ceremony
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: 800,
              mx: "auto",
              opacity: 0.95,
            }}
          >
            Two hearts, one journey, and a lifetime of togetherness.
          </Typography>

          <Chip
            label="You Are Invited"
            sx={{
              mt: 4,
              bgcolor: "#fff",
              color: "#C2185B",
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
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#C2185B",
                    mb: 3,
                    fontSize: {
                      xs: "2rem",
                      md: "3rem",
                    },
                  }}
                >
                  Wedding Details
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Stack spacing={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <WcIcon sx={{ color: "#C2185B", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Wedding Ceremony</Typography>

                      <Typography color="text.secondary">
                        Kiran Babu Weds Bindusri
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <AccessTimeIcon sx={{ color: "#C2185B", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Muhurtham</Typography>

                      <Typography color="text.secondary">
                        June 22, 2026
                      </Typography>

                      <Typography color="text.secondary">1:35 PM</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <LocationOnIcon sx={{ color: "#C2185B", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Venue</Typography>

                      <Typography color="text.secondary">
                        {event.address}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <RestaurantIcon sx={{ color: "#C2185B", mt: 0.7 }} />
                    <Box>
                      <Typography variant="h6">Lunch</Typography>

                      <Typography color="text.secondary">
                        Traditional wedding lunch will be served for all guests.
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
                    bgcolor: "#FCE4EC",
                    color: "#C2185B",
                    margin: "0 auto",
                    mb: 3,
                  }}
                >
                  <TempleHinduIcon sx={{ fontSize: 45 }} />
                </Avatar>

                <Typography variant="h4" sx={{ mb: 3 }}>
                  Near & Dear
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 2,
                  }}
                >
                  With the blessings of elders and loved ones, we invite you to
                  witness and celebrate the sacred bond of marriage.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <GalleryComponent
          galleryTitle="Wedding Posters"
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
            onClick={() => navigate("/")}
            sx={{
              bgcolor: "white",
              color: "#C2185B",
              px: 5,
              py: 1.8,
              borderRadius: "15px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#e6e2e2ff",
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

export default WeddingCeremonyPage;
