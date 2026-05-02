import { Grid } from '@mui/material';
import { IReviewCardProps } from './ReviewCard.types';
import { recommendationDicrionary } from '@/shared/data';

const ReviewCard: React.FC<IReviewCardProps> = ({ review, reviewerName }) => {
  return (
    <Grid container columnSpacing={4} rowSpacing={1}>
      <Grid size={2}>Ревьюер:</Grid>
      <Grid size={10}>{reviewerName ? reviewerName : '—'}</Grid>
      <Grid size={2}>Оценка за контент:</Grid>
      <Grid size={10}>{review.scoreContent}</Grid>
      <Grid size={2}>Оценка за подачу материала:</Grid>
      <Grid size={10}>{review.scoreDelivery}</Grid>
      <Grid size={2}>Оценка за релевантность:</Grid>
      <Grid size={10}>{review.scoreRelevance}</Grid>
      <Grid size={2}>Рекомендации:</Grid>
      <Grid size={10}>{recommendationDicrionary[review.recommendation]}</Grid>
      <Grid size={2}>Комментарий:</Grid>
      <Grid size={10}>{review.comment}</Grid>
    </Grid>
  );
};

export default ReviewCard;
