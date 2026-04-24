import { db } from "../../../config/firebaseConfig";
import { Review } from "../models/reviewModel";

const reviewCollection = db.collection("reviews");

interface ReviewQueryOptions {
  movieId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const createReview = async (review: Review): Promise<Review> => {
  const now = new Date().toISOString();

  const reviewData: Review = {
    ...review,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await reviewCollection.add(reviewData);

  return {
    id: docRef.id,
    ...reviewData,
  };
};

export const getAllReviews = async (
  options?: ReviewQueryOptions
): Promise<Review[]> => {
  const snapshot = await reviewCollection.get();

  let reviews = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Review, "id">),
  }));

  // Filter by movieId
  if (options?.movieId) {
    reviews = reviews.filter((review) => review.movieId === options.movieId);
  }

  // Sort by rating or createdAt
  if (options?.sortBy === "rating" || options?.sortBy === "createdAt") {
    reviews.sort((a, b) => {
      const aValue = a[options.sortBy as keyof Review];
      const bValue = b[options.sortBy as keyof Review];

      if (aValue === undefined || bValue === undefined) return 0;

      if (options.order === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  }

  return reviews;
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

  await docRef.update({
    ...review,
    updatedAt: new Date().toISOString(),
  });

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