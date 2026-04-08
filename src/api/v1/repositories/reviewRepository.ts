import { db } from "../../../config/firebaseConfig";
import { Review } from "../models/reviewModel";

const reviewCollection = db.collection("reviews");

export const createReview = async (review: Review): Promise<Review> => {
  const reviewData = {
    ...review,
    createdAt: new Date(),
  };

  const docRef = await reviewCollection.add(reviewData);

  return {
    id: docRef.id,
    ...reviewData,
  };
};

export const getAllReviews = async (): Promise<Review[]> => {
  const snapshot = await reviewCollection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Review, "id">),
  }));
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  const doc = await reviewCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...(doc.data() as Omit<Review, "id">),
  };
};

export const updateReview = async (
  id: string,
  review: Partial<Review>
): Promise<boolean> => {
  const docRef = reviewCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.update(review);
  return true;
};

export const deleteReview = async (id: string): Promise<boolean> => {
  const docRef = reviewCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};