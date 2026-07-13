import {
  deleteFlashcardById,
  findAllFlashcards,
  insertFlashcard,
} from "../repositories/flashcard.repository";
import type { FlashcardInput } from "../schemas/flashcard-schema";

export const createFlashcard = (data: FlashcardInput) => insertFlashcard(data);
export const getCurrentUserFlashcards = () => findAllFlashcards();
export const removeFlashcard = (id: string) => deleteFlashcardById(id);
