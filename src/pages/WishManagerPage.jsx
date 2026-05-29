import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Switch, 
  IconButton,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const WishManagerPage = () => {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'mhwishes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishes(wishesData);
    });

    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'mhwishes', id), {
        status: !currentStatus
      });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const toggleBest = async (id, currentBest) => {
    try {
      await updateDoc(doc(db, 'mhwishes', id), {
        best: !currentBest
      });
    } catch (error) {
      console.error("Error updating best status: ", error);
    }
  };

  const deleteWish = async (id) => {
    if (window.confirm("Are you sure you want to delete this wish?")) {
      try {
        await deleteDoc(doc(db, 'mhwishes', id));
      } catch (error) {
        console.error("Error deleting wish: ", error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fdf7f2', py: 8, width:"99vw", }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#880e4f', fontWeight: 'bold' }}>
          Wish Manager
        </Typography>
        
        <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#880e4f' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wishes</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Likes</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Best</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishes.map((wish) => (
                <TableRow key={wish.id} hover>
                  <TableCell>{wish.name}</TableCell>
                  <TableCell>{wish.contact || 'N/A'}</TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>{wish.wishes}</TableCell>
                  <TableCell>
                    <Chip label={wish.Likes || 0} size="small" color="secondary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch 
                        checked={wish.best || false} 
                        onChange={() => toggleBest(wish.id, wish.best)}
                        color="secondary"
                      />
                      <Typography variant="body2" sx={{ color: wish.best ? 'secondary.main' : 'text.disabled' }}>
                        {wish.best ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch 
                        checked={wish.status} 
                        onChange={() => toggleStatus(wish.id, wish.status)}
                        color="primary"
                      />
                      <Typography variant="body2" sx={{ color: wish.status ? 'success.main' : 'text.disabled' }}>
                        {wish.status ? 'Active' : 'Inactive'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteWish(wish.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default WishManagerPage;
