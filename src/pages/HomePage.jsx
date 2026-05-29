import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    Chip,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import WishCoupleModal from '../components/WishCoupleModal';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GalleryComponent from '../components/GalleryComponent';

// Assets
import weddingCover from '../assets/wedding_card_cover_pic_jpg.png';
import landingPage from '../assets/landing_card.png';
import englishCard from '../assets/english_inner_card.png';
import teluguCard from '../assets/telugu_inner_card.png';
import { eventsData } from '../assets/content';

const REVEAL_DATE = new Date('2026-05-13T07:10:00');
const WEDDING_DATE = new Date('2026-06-22T13:35:00');

const galleryImages = [
    { img: weddingCover, title: "Wedding Card Cover" },
    { img: landingPage, title: "Wedding Card" },
    { img: englishCard, title: "English Invitation" },
    { img: teluguCard, title: "Telugu Invitation" }
];

const HomePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [isRevealed, setIsRevealed] = useState(new Date() >= REVEAL_DATE);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isWishModalOpen, setIsWishModalOpen] = useState(false);
    const [bestWishes, setBestWishes] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBestWishes();
    }, []);

    useEffect(() => {
        const modalTimer = setTimeout(() => {
            setIsWishModalOpen(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(modalTimer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            if (now >= REVEAL_DATE) setIsRevealed(true);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchBestWishes = async () => {
        try {
            const q = query(
                collection(db, 'mhwishes'),
                where('best', '==', true),
                where('status', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const wishes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // console.log("wishes", wishes);
            // Shuffle and take 3 random ones
            const shuffled = wishes.sort(() => 0.5 - Math.random());
            setBestWishes(shuffled.slice(0, 3));
        } catch (error) {
            console.error("Error fetching best wishes:", error);
        }
    };

    const isEventCompleted = (eventDate) => {
        return currentTime > eventDate;
    };

    return (
        <Box sx={{ overflowX: 'hidden', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    height: '100vh',
                    width: "99vw",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: "row" }, alignItems: 'center', gap: { xs: "0px", md: "12px" } }}>
                        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, mb: 2, color: "#C41E3A" }}>
                            Panigrahi's
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, mb: 2, color: "#C41E3A" }}>
                            Wedding Invitation
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: "row" }, alignItems: 'center', justifyContent: "center", gap: { xs: "0px", md: "12px" } }}>
                        <Typography variant="h5" className="wedding-font" sx={{ color: 'secondary.main', mb: 1, fontSize: { xs: "1.6rem", md: '2.2rem' } }}>
                            Kiran Babu
                        </Typography>
                        <Typography variant="h5" className="wedding-font" sx={{ color: 'secondary.main', mb: 1, fontSize: { xs: "1.6rem", md: '2.2rem' } }}>
                            &
                        </Typography>
                        <Typography variant="h5" className="wedding-font" sx={{ color: 'secondary.main', mb: 1, fontSize: { xs: "1.6rem", md: '2.2rem' } }}>
                            Bindusri
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ letterSpacing: 3, textTransform: 'uppercase', color: 'text.secondary', mb: 4, display: { xs: 'none', md: "block" } }}>
                        Save The Date - June 22, 2026
                    </Typography>
                    <Typography variant="h6" sx={{ letterSpacing: 3, textTransform: 'uppercase', color: 'text.secondary', display: { xs: 'block', md: "none" } }}>
                        Save The Date
                    </Typography>
                    <Typography variant="h6" sx={{ letterSpacing: 3, textTransform: 'uppercase', color: 'text.secondary', mb: 2, display: { xs: 'block', md: "none" } }}>
                        June 22, 2026
                    </Typography>
                </motion.div>

                {
                    !isRevealed ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <CountdownTimer targetDate={REVEAL_DATE} title="Revealing events in..." />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <CountdownTimer targetDate={WEDDING_DATE} title="Tying the knot in..." />
                        </motion.div>
                    )
                }

                <IconButton
                    sx={{ position: 'absolute', bottom: 30, color: 'primary.main' }}
                    component={motion.button}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <KeyboardArrowDownIcon fontSize="large" />
                </IconButton>
            </Box >

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Welcome Message */}
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            mb: 3,
                            fontSize: { xs: '2rem', md: '3.5rem' },
                            color: '#DC143C'
                        }}>
                        Welcome to Our Celebration
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: '700px', mx: 'auto', color: 'text.secondary', lineHeight: 1.5 }}>
                        "A successful marriage requires falling in love many times, always with the same person."
                        We are so excited to celebrate our special day with all our dear guests and relatives.
                        Join us as we embark on this beautiful journey of love and togetherness.
                    </Typography>
                </Box>

                {/* Events Timeline */}
                <Typography variant="h3" sx={{
                    textAlign: 'center', mb: 4, color: '#DC143C',
                    fontSize: { xs: '2rem', md: '3.5rem' },
                }}>Wedding Events</Typography>
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {eventsData.map((event, index) => (
                        (!isRevealed && !event.alwaysVisible) ? null : (
                            <Grid item xs={12} md={6} key={event.id}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            position: 'relative',
                                            opacity: isEventCompleted(event.date) ? 0.8 : 1,
                                            border: isEventCompleted(event.date) ? 'none' : `1px solid ${theme.palette.secondary.main}`,
                                            background: isEventCompleted(event.date) ? '#f5f5f5' : '#fff'
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography variant="h5" color="primary">{event.name}</Typography>
                                                {isEventCompleted(event.date) && (
                                                    <Chip label="Completed" color="success" size="small" />
                                                )}
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <AccessTimeIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 20 }} />
                                                <Typography variant="body2">
                                                    {event.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                    <br />
                                                    {event.muhurtham ? `Muhurtham: ${event.muhurtham}` : `Time: ${event.date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
                                                    {event.endDate && ` - ${event.endDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                <LocationOnIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 20, mt: 0.5 }} />
                                                <Typography variant="body2">{event.address}</Typography>
                                            </Box>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                href={event.page}
                                                disabled={event.page === "/"}
                                                sx={{ mb: 1 }}
                                            >
                                                View Event
                                            </Button>
                                            {(event.mapLink && !isEventCompleted(event.date)) && (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    href={event.mapLink}
                                                    target="_blank"
                                                    startIcon={<LocationOnIcon />}
                                                    sx={{ ml: 1 }}
                                                >
                                                    View on Maps
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        )
                    ))}
                </Grid>

                {/* Transportation Teaser */}
                <Box
                    sx={{
                        mt: 10,
                        p: { xs: 4, md: 8 },
                        borderRadius: '30px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: '#fff',
                        textAlign: 'center'
                    }}
                >
                    <DirectionsBusIcon sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h3" gutterBottom sx={{
                        fontSize: { xs: '2rem', md: '3.5rem' },
                    }}>Wanna Travel to Wedding Ceremony</Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        We've arranged a special bus for our guests' comfort.
                    </Typography>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 4 }} />
                    <Grid container spacing={2} sx={{ mb: 4, width: "100%", display: "flex", justifyContent: "center" }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5">Bus Schedule</Typography>
                            <Typography variant="body1">Departure: June 22, 2026</Typography>
                            <Typography variant="body1">Time: 4:00 AM - 5:00 AM</Typography>
                            <Typography variant="body1">From: Kiran's Home, Gopalapatnam</Typography>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate('/transportation')}
                        sx={{ px: 6, py: 2, fontWeight: 'bold' }}
                    >
                        View Transportation Details & Book Seats
                    </Button>
                </Box>

                {/* Wedding Cards Section Wedding Invitation*/}
                <GalleryComponent galleryTitle="Wedding Invitation" galleryImages={galleryImages} />

                {/* Display best 3 wishes and a view more option */}
                {
                    bestWishes.length >= 2 && (
                        <Box sx={{ mt: 10, textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom sx={{
                                color: '#DC143C',
                                fontSize: { xs: '2rem', md: '3.5rem' },
                                mb: 4
                            }}>Wishes of Near & Dear</Typography>

                            <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
                                {bestWishes.map((wish) => (
                                    <Grid item key={wish.id} xs={12} sm={6} md={4}>
                                        <motion.div whileHover={{ y: -5 }}>
                                            <Card sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 20px rgba(220, 20, 60, 0.1)',
                                                background: 'linear-gradient(135deg, #fff 0%, #fff5f8 100%)',
                                                border: '1px solid rgba(220, 20, 60, 0.1)'
                                            }}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ color: '#880e4f', fontWeight: 'bold', mb: 1 }}>
                                                        {wish.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#4a148c', lineHeight: 1.6 }}>
                                                        "{wish.wishes}"
                                                    </Typography>
                                                    <Divider sx={{ my: 2 }} />
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:5 }}>
                                                        <Typography variant="body2">Likes: {wish.Likes} <FavoriteIcon sx={{ color: "red", fontSize: "16px" }} /></Typography>
                                                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                                            {wish.createdAt?.toDate().toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>

                            {bestWishes.length > 0 && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate('/view-wishes')}
                                    sx={{
                                        borderRadius: '20px',
                                        px: 4,
                                        py: 1,
                                        fontWeight: 'bold',
                                        color: '#DC143C',
                                        borderColor: '#DC143C',
                                        '&:hover': {
                                            borderColor: '#880e4f',
                                            bgcolor: 'rgba(220, 20, 60, 0.05)'
                                        }
                                    }}
                                >
                                    View All Wishes
                                </Button>
                            )}
                        </Box>)}
            </Container>

            {/* Footer */}
            <Box sx={{ py: 6, textAlign: 'center', bgcolor: '#F5EBE1' }}>
                <Typography variant="h6" className="wedding-font" sx={{ fontSize: '2rem', color: 'primary.main' }}>
                    Designed with ❤️ by Panigrahi Kiran Babu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    © 2026 Wedding Celebration. All rights reserved.
                </Typography>
            </Box>
            <WishCoupleModal open={isWishModalOpen} handleClose={() => setIsWishModalOpen(false)} />
        </Box >
    );
};

export default HomePage;