// GalleryComponent
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";

const GalleryComponent = ({ galleryTitle, galleryImages }) => {
  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#DC143C",
          fontSize: { xs: "2rem", md: "3.5rem" },
          mb: 4,
        }}
      >
        {galleryTitle}
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {galleryImages.map((card, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={card.img}
                  alt={card.title}
                  sx={{
                    width: { xs: "300px", md: "360px" },
                    objectFit: "contain",
                    bgcolor: "#f9f9f9",
                    p: 2,
                  }}
                />
                <Typography variant="subtitle1" sx={{ py: 2, fontWeight: 600 }}>
                  {card.title}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GalleryComponent;
