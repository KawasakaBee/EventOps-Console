import { Skeleton, TableCell, TableRow } from '@mui/material';
import {
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';

const MyProposalsTableRowSkeleton = () => {
  return (
    <TableRow>
      {myProposalListItemKeys.map((key) => {
        if (key === 'availableStatuses') return null;

        return (
          <TableCell key={`Table-body-cell-${key}`}>
            <Skeleton
              variant="text"
              width={myProposalTableWidthDictionary[key].skeletonWidth}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default MyProposalsTableRowSkeleton;
