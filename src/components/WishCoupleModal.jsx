import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const WishCoupleModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    wishes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.wishes) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'mhwishes'), {
        ...formData,
        best: false,
        status: true,
        Likes: 0,
        createdAt: serverTimestamp()
      });
      handleClose();
      setFormData({ name: '', contact: '', wishes: '' });
    } catch (error) {
      console.error("Error adding wish: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteIcon sx={{ color: '#e91e63' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#880e4f' }}>
            Wish the upcoming Couple
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: '#880e4f' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Enter Your Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Contact Number"
              name="contact"
              variant="outlined"
              fullWidth
              required
              placeholder="Enter your Contact number"
              value={formData.contact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setFormData({ ...formData, contact: value });
                }
              }}
              inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  textAlign: "center",
                  fontWeight: "bold",
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Enter Wishes"
              name="wishes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={formData.wishes}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose} 
            sx={{ color: '#880e4f', fontWeight: 'bold' }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1,
              background: 'linear-gradient(45deg, #e91e63 30%, #ff4081 90%)',
              boxShadow: '0 3px 5px 2px rgba(233, 30, 99, .3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #d81b60 30%, #f06292 90%)',
              }
            }}
          >
            {loading ? 'Sending...' : 'Send Wishes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WishCoupleModal;
