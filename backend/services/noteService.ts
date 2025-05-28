import Note from '../models/Note';

export const getAllNotes = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const notes = await Note.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  const count = await Note.countDocuments();

  return { notes, count };
};

export const createNote = async (noteData: any) => {
  const newNote = await Note.create(noteData);
  return newNote;
};

export const deleteNote = async (id: string) => {
  await Note.findByIdAndDelete(id);
};

export const updateNote = async (id: string, updateData: any) => {
  return await Note.findByIdAndUpdate(id, updateData, { new: true });
};
