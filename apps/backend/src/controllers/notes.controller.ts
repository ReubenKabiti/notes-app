import express from "express";
import auth from "../middleware/auth";
import { PrismaNoteRepository } from "../repositories/note.repository";
import prismaClient from "../repositories/prisma-client";
import createNoteUseCase from "../use-cases/notes/create-note.use-case";
import handleError from "./error-handler";
import getNoteUseCase from "../use-cases/notes/get-note.use-case";
import getNotesUseCase from "../use-cases/notes/get-notes.use-case";
import { GetNotes, UpdateNote } from "shared";
import updateNoteUseCase from "../use-cases/notes/update-note.use-case";
import deleteNoteUseCase from "../use-cases/notes/delete-note.use-case";

const notesController = express.Router();

const repository = new PrismaNoteRepository(prismaClient);

notesController.post("/", auth, async (req, res) => {
  try {
    const { title, body, creator_name, user_id } = req.body;
    const result = await createNoteUseCase({
      repository,
      createNote: { title, body, creator_name, user_id },
    });
    res.status(201).json(result);
  } catch (error) {
    handleError(error, res);
  }
});

notesController.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await getNoteUseCase({ repository, id });
    res.status(200).json(note);
  } catch (error) {
    handleError(error, res);
  }
});

notesController.get("/", auth, async (req, res) => {
  try {
    const { by_user_id, by_user_id_and_date, count, cursor }: GetNotes =
      req.query;
    const notesPage = await getNotesUseCase({
      repository,
      by_user_id,
      by_user_id_and_date,
      count,
      cursor,
    });
    res.status(200).json(notesPage);
  } catch (error) {
    handleError(error, res);
  }
});

notesController.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body }: UpdateNote = req.body;
    const result = await updateNoteUseCase({ repository, id, title, body });
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
});

notesController.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteNoteUseCase({ repository, id });
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
});

export default notesController;
