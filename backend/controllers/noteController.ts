import { RequestHandler } from 'express';
import * as noteService from '../services/noteService';

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query._page as string) || 1;
    const limit = parseInt(req.query._limit as string) || 10;

    const { notes, count } = await noteService.getAllNotes(page, limit);

    res.set('X-Total-Count', count.toString());
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    if (!content || typeof content !== 'string') {
      res.status(400).json({ message: 'Invalid or missing note content' });
      return;
    }

    const note = await noteService.createNote({ title, content, author });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await noteService.deleteNote(id);
    res.status(204).send(); // No Content
  } catch (err) {
    next(err);
  }
};

export const updateNote: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await noteService.updateNote(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
