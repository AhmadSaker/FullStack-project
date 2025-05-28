import express from 'express';
import * as noteController from '../controllers/noteController'; 

const router = express.Router();

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote); 

router.delete('/:id', noteController.deleteNote);
router.put('/:id', noteController.updateNote);

export default router;
