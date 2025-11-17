import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID } from '../app/lib/appwrite';
import { ID } from 'react-native-appwrite';

interface ScoreData {
  userID: string;
  moduleID: string;
  score: number;
}

interface UseScoresReturn {
  saveScore: (scoreData: ScoreData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useScores = (): UseScoresReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveScore = async (scoreData: ScoreData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userID: scoreData.userID,
          moduleID: scoreData.moduleID,
          score: scoreData.score,
        }
      );
      
      console.log('Score saved successfully:', result);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to save score';
      setError(errorMessage);
      console.error('Error saving score:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveScore,
    loading,
    error
  };

};