import { formatDictionary, levelDictionary, proposalListItemKeys } from "@/shared/data"
import { Checkbox, TableCell, TableRow } from "@mui/material"
import React, { useMemo } from "react"
import ProposalsRowActions from "../ProposalsRowActions/ProposalsRowActions"
import getProposalListRowActions from "@/shared/utils/getProposalListRowActions"
import { ITableRowProps } from "../ProposalsTable/ProposalsTable.types"
import StatusChip from "@/shared/ui/StatusChip/StatusChip"
import isoToLocalDate from "@/shared/utils/isoToLocalDate"
import { useDispatch } from "react-redux"
import { toggleSelectedId } from "../../model/proposalsFiltersSlice"
import { ID } from "@/shared/types/primitives.types"
import { IProposalTableRowProps } from "./ProposalsTableRow.types"

const ProposalsTableRow = React.memo(({ proposal, sx, isSelected, role, tracks }: IProposalTableRowProps) => {
    const dispatch = useDispatch()

    const rowActins = useMemo(() =>
        getProposalListRowActions(
            role,
            proposal.status,
        ), [role, proposal.status]
    )

    const renderCell = ({ rowName, data, tracksList }: ITableRowProps) => {
        switch (rowName) {
            case 'status':
                return (
                    <StatusChip
                        status={data[rowName]}
                        shape="rounded"
                        size="small"
                        type="contained"
                    />
                );
            case 'format':
                return formatDictionary.get(data.format);
            case 'level':
                return levelDictionary.get(data.level);
            case 'trackId': {
                const trackName = tracksList.find((track) => track.id === data.trackId);
                return trackName ? trackName.title : 'ID отсутствует';
            }
            case 'updatedAt':
                return isoToLocalDate(data.updatedAt);
            case 'actions':
                return;
            case 'checkbox':
                return
            default:
                return data[rowName];
        }
    };

    const handleToggleSelectProposal = (id: ID) => {
        dispatch(toggleSelectedId(id))
    }

    return <TableRow>
        {proposalListItemKeys.map((key) =>
            <TableCell key={`Table-body-cell-${key}`}>
                {key === 'checkbox' ?
                    <Checkbox sx={sx} checked={isSelected} onChange={() => handleToggleSelectProposal(proposal.id)} />
                    :
                    key === 'actions' ? (
                        <ProposalsRowActions
                            actions={rowActins}
                            proposalId={proposal.id}
                        />
                    ) : (
                        renderCell({
                            rowName: key,
                            data: proposal,
                            tracksList: tracks,
                        })
                    )}
            </TableCell>
        )}
    </TableRow>
})

ProposalsTableRow.displayName = 'ProposalsTableRow'

export default ProposalsTableRow