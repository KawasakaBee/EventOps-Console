import { Grid, Skeleton } from '@mui/material';
import { IInfoCardsProps } from './InfoCards.types';
import { useMemo } from 'react';
import SectionCard from '../SectionCard/SectionCard';
import { styles } from './styles';

const InfoCards: React.FC<IInfoCardsProps> = ({ items, isLoading }) => {
  const gridColumnSize = useMemo(
    () => Math.ceil(12 / items.length),
    [items.length],
  );

  const sx = styles();

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid
          key={`${item.label}-${item.value}`}
          size={gridColumnSize}
          sx={sx.infoCardsItemContainer}
        >
          {
            <SectionCard title={item.label} restSx={sx.infoCards}>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={20}
                  data-testid={`skeleton-${item.label}`}
                />
              ) : item.value === null || item.value === undefined ? (
                'Не удалось загрузить данные'
              ) : (
                item.value
              )}
            </SectionCard>
          }
        </Grid>
      ))}
    </Grid>
  );
};
export default InfoCards;
