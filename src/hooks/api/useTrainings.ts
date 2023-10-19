import { useEffect, useState } from 'react';
import TrainingsService from '../../services/trainings/TrainingsService';
import { ITraining } from '../../types/trainingTypes';

interface useTrainingsProps {
  limit?: number;
}

const useTrainings = ({ limit }: useTrainingsProps = {}) => {
  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrainings = async () => {
    setIsLoading(true);

    try {
      const trainings = await TrainingsService.getTrainings({ queryLimit: limit });

      setTrainings(trainings);
    } catch (error) {
      //TODO:
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return { trainings, isLoading };
};

export default useTrainings;
