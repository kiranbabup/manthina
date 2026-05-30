import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    IconButton,
    Stack,
    Alert,
    CircularProgress,
    MenuItem,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const vehicleTypes = [
    "Own Car",
    "Train",
    "RTC Bus",
    "Wedding Bus",
    "Bike",
    "Other"
];

const MemberVehicalAddingPage = () => {
    const [vehicalType, setVehicalType] = useState('');
    const [names, setNames] = useState(['']);
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (index, value) => {
        const newNames = [...names];
        newNames[index] = value;
        setNames(newNames);
    };

    const addNameField = () => {
        setNames([...names, '']);
    };

    const removeNameField = (index) => {
        if (names.length > 1) {
            const newNames = names.filter((_, i) => i !== index);
            setNames(newNames);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!vehicalType || !contactNumber || names.some(n => !n.trim())) {
            setError('Please fill all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await addDoc(collection(db, "mhvehicles"), {
                vehical_type: vehicalType,
                names: names.filter(n => n.trim() !== ''),
                contact_number: contactNumber,
                timestamp: new Date()
            });
            setSuccess(true);
            setTimeout(() => navigate('/transportation'), 2000);
        } catch (err) {
            console.error("Error adding document: ", err);
            setError('Failed to save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6, display: "flex", justifyContent: "center", width: "99vw" }}>
            <Container maxWidth="sm" >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/transportation')}
                    sx={{ mb: 4 }}
                >
                    Back to Transportation
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '30px' }}>
                        <Typography variant="h4" gutterBottom align="center">Add Journey Details</Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                            If you are travelling by your own transport, please let us know.
                        </Typography>

                        {success && <Alert severity="success" sx={{ mb: 3 }}>Details saved successfully! Redirecting...</Alert>}
                        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    select
                                    label="Vehicle Type"
                                    value={vehicalType}
                                    onChange={(e) => setVehicalType(e.target.value)}
                                    fullWidth
                                    required
                                >
                                    {vehicleTypes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Contact Number"
                                    value={contactNumber}
                                    onChange={(e) => {
                                        // Allow only digits
                                        const value = e.target.value.replace(/\D/g, "");

                                        // Limit to 10 digits
                                        if (value.length <= 10) {
                                            setContactNumber(value);
                                        }
                                    }}
                                    fullWidth
                                    required
                                    placeholder="Enter your phone number"
                                    inputProps={{
                                        maxLength: 10,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                        style: {
                                            textAlign: "center",
                                            fontWeight: "bold",
                                        },
                                    }}
                                />

                                <Divider sx={{ my: 1 }} />

                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Guest Names</Typography>

                                {names.map((name, index) => (
                                    <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            label={`Guest ${index + 1} Name`}
                                            value={name}
                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                            fullWidth
                                            required
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => removeNameField(index)}
                                            disabled={names.length === 1}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}

                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={addNameField}
                                    variant="outlined"
                                    sx={{ alignSelf: 'flex-start' }}
                                >
                                    Add Another Guest
                                </Button>

                                <Box sx={{ pt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                    >
                                        {loading ? 'Saving...' : 'Save Journey Details'}
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default MemberVehicalAddingPage;
