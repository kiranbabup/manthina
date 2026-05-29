import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Stack,
    Alert,
    CircularProgress,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

const MembersDataMyPage = () => {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [vehicleMembers, setVehicleMembers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentMember, setCurrentMember] = useState({ Name: '', Relation: '', seat_no: '' });
    const [error, setError] = useState('');

    const [vehicleOpen, setVehicleOpen] = useState(false);
    const [vehicleEditMode, setVehicleEditMode] = useState(false);

    const [currentVehicle, setCurrentVehicle] = useState({
        id: "",
        contact_number: "",
        vehical_type: "",
        names: []
    });

    useEffect(() => {
        busMembersFetch();
        vehicleMembersFetch();
    }, []);

    const handleOpen = (member = null) => {
        if (member) {
            setCurrentMember(member);
            setEditMode(true);
        } else {
            setCurrentMember({ Name: '', Relation: '', seat_no: '' });
            setEditMode(false);
        }
        setOpen(true);
    };

    const busMembersFetch = () => {
        const q = query(collection(db, "mhbus1"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memberList = [];
            snapshot.forEach((doc) => {
                memberList.push({ id: doc.id, ...doc.data() });
            });
            // Sort by seat number
            memberList.sort((a, b) => parseInt(a.seat_no) - parseInt(b.seat_no));
            setMembers(memberList);
            setLoading(false);
        });

        return () => unsubscribe();
    };

    const vehicleMembersFetch = () => {
        const q = query(collection(db, "mhvehicles"));
        const unsubscribeB = onSnapshot(q, (snapshot) => {
            const memberList = [];
            snapshot.forEach((doc) => {
                memberList.push({ id: doc.id, ...doc.data() });
            });
            console.log(memberList);

            setVehicleMembers(memberList);
            setLoading(false);
        });

        return () => unsubscribeB();
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const handleSave = async () => {
        if (!currentMember.Name || !currentMember.Relation || !currentMember.seat_no) {
            setError('All fields are required');
            return;
        }

        // Check if seat is already taken (if not editing the same member)
        const seatTaken = members.find(m => m.seat_no === currentMember.seat_no && m.id !== currentMember.id);
        if (seatTaken) {
            setError(`Seat #${currentMember.seat_no} is already assigned to ${seatTaken.Name}`);
            return;
        }

        try {
            if (editMode) {
                const memberRef = doc(db, "mhbus1", currentMember.id);
                await updateDoc(memberRef, {
                    Name: currentMember.Name,
                    Relation: currentMember.Relation,
                    seat_no: currentMember.seat_no
                });
            } else {
                await addDoc(collection(db, "mhbus1"), {
                    Name: currentMember.Name,
                    Relation: currentMember.Relation,
                    seat_no: currentMember.seat_no
                });
            }
            handleClose();
        } catch (err) {
            console.error("Error saving member: ", err);
            setError('Failed to save. Check your connection.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this member?')) {
            try {
                await deleteDoc(doc(db, "mhbus1", id));
            } catch (err) {
                console.error("Error deleting member: ", err);
            }
        }
    };

    const handleVehicleOpen = (member = null) => {
        if (member) {
            setCurrentVehicle({
                ...member,
                names: member.names || []
            });
            setVehicleEditMode(true);
        } else {
            setCurrentVehicle({
                contact_number: "",
                vehical_type: "",
                names: []
            });
            setVehicleEditMode(false);
        }

        setVehicleOpen(true);
    };

    const handleVehicleClose = () => {
        setVehicleOpen(false);
    };

    const handleVehicleDelete = async (id) => {
        if (window.confirm("Delete this entry?")) {
            try {
                await deleteDoc(doc(db, "mhvehicles", id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleVehicleSave = async () => {
        try {
            const vehicleRef = doc(db, "mhvehicles", currentVehicle.id);

            await updateDoc(vehicleRef, {
                contact_number: currentVehicle.contact_number,
                vehical_type: currentVehicle.vehical_type,
                names: currentVehicle.names
            });

            handleVehicleClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "99vw" }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h3">Bus Members Directory</Typography>
                        <Typography variant="body1" color="text.secondary">Manage guest seating for the wedding bus.</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                        sx={{ borderRadius: '15px' }}
                    >
                        Add Member
                    </Button>
                </Box>

                <Paper sx={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: 'primary.main' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Seat No</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Relation</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'right' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : members.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                                            <Typography color="text.disabled">No members added to the bus yet.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : members.map((member) => (
                                    <TableRow key={member.id} hover>
                                        <TableCell>
                                            <Box sx={{
                                                width: 35,
                                                height: 35,
                                                bgcolor: 'secondary.main',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>
                                                {member.seat_no}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{member.Name}</TableCell>
                                        <TableCell>{member.Relation}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Tooltip title="Edit">
                                                    <IconButton color="primary" onClick={() => handleOpen(member)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" onClick={() => handleDelete(member.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            {/* Add/Edit Dialog */}
            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '20px', width: '100%', maxWidth: 400 } }}>
                <DialogTitle>{editMode ? 'Edit Member' : 'Add New Member'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            label="Seat Number"
                            type="number"
                            fullWidth
                            value={currentMember.seat_no}
                            onChange={(e) => setCurrentMember({ ...currentMember, seat_no: e.target.value })}
                            inputProps={{ min: 1, max: 40 }}
                        />
                        <TextField
                            label="Full Name"
                            fullWidth
                            value={currentMember.Name}
                            onChange={(e) => setCurrentMember({ ...currentMember, Name: e.target.value })}
                        />
                        <TextField
                            label="Relation with Groom"
                            fullWidth
                            value={currentMember.Relation}
                            onChange={(e) => setCurrentMember({ ...currentMember, Relation: e.target.value })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Save Member
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Own members table */}
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h3">Own Members Directory</Typography>
                        <Typography variant="body1" color="text.secondary">Manage guests</Typography>
                    </Box>
                </Box>

                <Paper sx={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: 'primary.main' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vehicle Type</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'right' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : vehicleMembers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                                            <Typography color="text.disabled">
                                                No members added yet.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    vehicleMembers.map((member, index) => (
                                        <TableRow key={member.id} hover>
                                            <TableCell sx={{ fontWeight: 500 }}>
                                                &nbsp;&nbsp;{index + 1}
                                            </TableCell>

                                            <TableCell sx={{ fontWeight: 500 }}>
                                                {member.contact_number}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}>
                                                {member.vehical_type}
                                            </TableCell>
                                            <TableCell>
                                                <Stack spacing={0.5}>
                                                    {member.names?.map((name, idx) => (
                                                        <Typography key={idx}>
                                                            {name}
                                                        </Typography>
                                                    ))}
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="right">
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    justifyContent="flex-end"
                                                >
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleVehicleOpen(member)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleVehicleDelete(member.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            {/* VEHICLE EDIT DIALOG */}
            <Dialog
                open={vehicleOpen}
                onClose={handleVehicleClose}
                PaperProps={{
                    sx: {
                        borderRadius: "20px",
                        width: "100%",
                        maxWidth: 500
                    }
                }}
            >
                <DialogTitle>Edit Vehicle Member</DialogTitle>

                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>

                        <TextField
                            label="Contact Number"
                            fullWidth
                            value={currentVehicle.contact_number}
                            onChange={(e) =>
                                setCurrentVehicle({
                                    ...currentVehicle,
                                    contact_number: e.target.value
                                })
                            }
                        />

                        <TextField
                            label="Vehicle Type"
                            fullWidth
                            value={currentVehicle.vehical_type}
                            onChange={(e) =>
                                setCurrentVehicle({
                                    ...currentVehicle,
                                    vehical_type: e.target.value
                                })
                            }
                        />

                        <TextField
                            label="Names (comma separated)"
                            fullWidth
                            value={currentVehicle.names?.join(", ")}
                            onChange={(e) =>
                                setCurrentVehicle({
                                    ...currentVehicle,
                                    names: e.target.value
                                        .split(",")
                                        .map((n) => n.trim())
                                })
                            }
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleVehicleClose}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleVehicleSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MembersDataMyPage;
