import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Avatar,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, updateDoc, increment, query, where, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WishCoupleModal from '../components/WishCoupleModal';

const ViewWishesPage = () => {
  const [wishes, setWishes] = useState([]);
  const [likedWishes, setLikedWishes] = useState(new Set());
  const navigate = useNavigate();
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      setIsWishModalOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(modalTimer);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'mhwishes'),
      where('status', '==', true)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Client-side sorting to avoid requiring a composite index
      wishesData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

      console.log(wishesData);
      setWishes(wishesData);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (id) => {
    if (likedWishes.has(id)) return;

    try {
      await updateDoc(doc(db, 'mhwishes', id), {
        Likes: increment(1)
      });
      setLikedWishes(prev => new Set(prev).add(id));
    } catch (error) {
      console.error("Error liking wish: ", error);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 5,
      width: "99vw",
      background: 'linear-gradient(180deg, #fff5f8 0%, #fff 100%)',
      display: "flex",
      justifyContent: "center",
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: '#880e4f',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Wishes of Near & Dear
          </Typography>
          <Typography variant="h6" sx={{ color: '#ad1457', opacity: 0.8 }}>
            Beautiful messages from the loved ones.
          </Typography>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Divider sx={{ width: 100, mx: 'auto', mt: 3, height: 4, bgcolor: '#e91e63', borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <Grid item key={wish.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card sx={{
                    width: 300,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    boxShadow: '0 10px 40px rgba(233, 30, 99, 0.1)',
                    overflow: 'hidden',
                    border: '1px solid rgba(233, 30, 99, 0.05)',
                    position: 'relative'
                  }}>
                    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'rgba(233, 30, 99, 0.03)' }}>
                      <Avatar sx={{ bgcolor: '#e91e63', fontWeight: 'bold' }}>
                        {wish.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#880e4f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {wish.name}
                      </Typography>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                      <Typography variant="body1" sx={{
                        fontStyle: 'italic',
                        color: '#4a148c',
                        lineHeight: 1.8,
                        position: 'relative',
                        paddingLeft: '6px',
                        '&::before': {
                          content: '"“"',
                          fontSize: '3rem',
                          position: 'absolute',
                          top: -20,
                          left: -10,
                          opacity: 0.1,
                          color: '#e91e63',
                        }
                      }}>
                        {wish.wishes}
                      </Typography>
                    </CardContent>

                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() => handleLike(wish.id)}
                          sx={{
                            color: likedWishes.has(wish.id) ? '#e91e63' : '#bdbdbd',
                            transition: 'all 0.3s ease',
                            '&:hover': { transform: 'scale(1.2)' }
                          }}
                        >
                          {likedWishes.has(wish.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#880e4f' }}>
                          {wish.Likes || 0} Likes
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {wish.createdAt?.toDate().toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
        {/* FOOTER */}
        <Box
          sx={{
            py: 5,
            px: 2,
            textAlign: "center",
            bgcolor: "#F8EDEB",
            mt: 5
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#C2185B",
              mb: 1
            }}
          >
            Panigrahi's Wedding Celebrations
          </Typography>

          <Typography color="text.secondary">
            Designed with ❤️ by Panigrahi Kiran Babu for our beloved guests
          </Typography>
        </Box>
      </Container>
      <WishCoupleModal open={isWishModalOpen} handleClose={() => setIsWishModalOpen(false)} />
    </Box>
  );
};

export default ViewWishesPage;
