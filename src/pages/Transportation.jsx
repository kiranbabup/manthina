import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Paper,
    Divider,
    Tooltip,
    CircularProgress,
    Fab
} from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

const Transportation = () => {
    const [busSeats, setBusSeats] = useState({});
    const [ownVehicles, setOwnVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Bus Seats
        const busQuery = query(collection(db, "mhbus1"));
        const unsubscribeBus = onSnapshot(busQuery, (snapshot) => {
            const seats = {};
            snapshot.forEach((doc) => {
                seats[doc.data().seat_no] = doc.data();
            });
            setBusSeats(seats);
        });

        // Fetch Own Vehicles
        const vehiclesQuery = query(collection(db, "mhvehicles"));
        const unsubscribeVehicles = onSnapshot(vehiclesQuery, (snapshot) => {
            const vechData = [];
            snapshot.forEach((doc) => {
                vechData.push({ id: doc.id, ...doc.data() });
            });
            setOwnVehicles(vechData);
            setLoading(false);
        });

        return () => {
            unsubscribeBus();
            unsubscribeVehicles();
        };
    }, []);

    const renderSeat = (seatNo) => {
        const isOccupied = !!busSeats[seatNo];
        const seatData = busSeats[seatNo];

        return (
            <Tooltip title={isOccupied ? `Seat ${seatNo}: ${seatData.Name}` : `Seat ${seatNo}: Available`}>
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => isOccupied && setSelectedSeat(seatData)}
                    sx={{
                        width: 45,
                        height: 45,
                        m: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isOccupied ? 'primary.main' : 'rgba(0,0,0,0.05)',
                        color: isOccupied ? 'white' : 'text.disabled',
                        borderRadius: '8px',
                        cursor: isOccupied ? 'pointer' : 'default',
                        border: '2px solid',
                        borderColor: isOccupied ? 'primary.dark' : 'rgba(0,0,0,0.1)',
                        position: 'relative',
                        transition: '0.3s'
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{seatNo}</Typography>
                    {isOccupied && <PersonIcon sx={{ fontSize: 16, position: 'absolute', bottom: 2, right: 2, opacity: 0.7 }} />}
                </Box>
            </Tooltip>
        );
    };

    const renderBusLayout = () => {
        const rows = [];

        // Row 0: 1 + 2 front
        rows.push(
            <Box key="row0" sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
                {renderSeat(1)}
                <Box sx={{ width: 90 }} /> {/* Aisle */}
                {renderSeat(2)}
                {renderSeat(3)}
            </Box>
        );

        // Rows 1-8: 2 + 2
        for (let i = 0; i < 10; i++) {
            const start = 4 + (i * 4);
            rows.push(
                <Box key={`row${i + 1}`} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {renderSeat(start)}
                    {renderSeat(start + 1)}
                    <Box sx={{ width: 45 }} /> {/* Aisle */}
                    {renderSeat(start + 2)}
                    {renderSeat(start + 3)}
                </Box>
            );
        }

        // Last Row: 5 seats
        rows.push(
            <Box key="last-row" sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                {renderSeat(44)}
                {renderSeat(45)}
                {renderSeat(46)}
                {renderSeat(47)}
                {renderSeat(48)}
            </Box>
        );

        return rows;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: "100vw" }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', width: "99vw", py: 4 }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h3" gutterBottom>Transportation</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Check your bus seat or view guest travel details who are travelling to Haranath's Wedding.
                    </Typography>
                </Box>

                {/* <Grid container spacing={6} > */}
                    {/* Bus Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", mb: 4 }}>
                                <DirectionsBusIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                                <Typography variant="h4" sx={{
                                    mb: 1,
                                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                                }}>Wedding Bus</Typography>
                            </Box>

                            <Box sx={{
                                bgcolor: 'rgba(0,0,0,0.02)',
                                p: 3,
                                borderRadius: '20px',
                                border: '4px solid #ddd',
                                borderTop: '10px solid #555',
                                maxWidth: '300px',
                                mx: 'auto',
                                position: 'relative'
                            }}>
                                {/* Driver Seat Placeholder */}
                                <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: "column", mb: 4, px: 1 }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", width: "21%" }}> <ModeStandbyIcon /></Box>
                                    <Box sx={{ width: 45, height: 45, bgcolor: '#999', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <Typography variant="caption">Driver</Typography>
                                    </Box>
                                </Box>

                                {renderBusLayout()}

                                <Box sx={{ mt: 4, textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">Back of Bus</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 15, height: 15, bgcolor: 'primary.main', borderRadius: '3px', mr: 1 }} />
                                    <Typography variant="caption">Occupied</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 15, height: 15, bgcolor: 'rgba(0,0,0,0.05)', border: '1px solid #ddd', borderRadius: '3px', mr: 1 }} />
                                    <Typography variant="caption">Available</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Own Vehicles Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt:2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DriveEtaIcon color="secondary" sx={{ mr: 2, fontSize: 32 }} />
                                <Typography variant="h4">Own Transport</Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={2}>
                            {ownVehicles.length > 0 ? ownVehicles.map((veh, index) => (
                                <Grid item xs={12} key={veh.id}>
                                    <Card
                                        component={motion.div}
                                        whileHover={{ x: 5 }}
                                        onClick={() => setSelectedVehicle(veh)}
                                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(191, 149, 63, 0.05)' }, padding:"10px" }}
                                    >
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="h6">{veh.vehical_type || 'Vehicle'}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {veh.names ? `${veh.names.length} Person(s)` : 'Click for details'}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', ml:2 }}>View Details</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )) : (
                                <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>
                                    <Typography color="text.disabled">No own transport details added yet.</Typography>
                                </Box>
                            )}
                        </Grid>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/manthina/members-vehical')}
                            >
                                Add Your Journey
                            </Button>
                        </Box>
                    </Grid>
                {/* </Grid> */}
            </Container>

            {/* Seat Detail Dialog */}
            <Dialog open={!!selectedSeat} onClose={() => setSelectedSeat(null)} PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Seat #{selectedSeat?.seat_no} Details
                    <IconButton onClick={() => setSelectedSeat(null)} size="small"><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ py: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">Guest Name</Typography>
                        <Typography variant="h6" gutterBottom>{selectedSeat?.Name}</Typography>

                        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Relation with Groom</Typography>
                        <Typography variant="body1">{selectedSeat?.Relation || 'Guest'}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedSeat(null)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Vehicle Detail Dialog */}
            <Dialog open={!!selectedVehicle} onClose={() => setSelectedVehicle(null)} PaperProps={{ sx: { borderRadius: '20px', p: 1, minWidth: '300px' } }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Journey Details
                    <IconButton onClick={() => setSelectedVehicle(null)} size="small"><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ py: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">Vehicle Type</Typography>
                        <Typography variant="h6" gutterBottom>{selectedVehicle?.vehical_type}</Typography>

                        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Traveling Members</Typography>
                        {selectedVehicle?.names && selectedVehicle.names.map((name, i) => (
                            <Typography key={i} variant="body1">• {name}</Typography>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedVehicle(null)}>Close</Button>
                </DialogActions>
            </Dialog>

            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                onClick={() => navigate('/manthina/')}
            >
                <Typography variant="button" sx={{ fontWeight: 'bold' }}>Home</Typography>
            </Fab>
        </Box>
    );
};

export default Transportation;
