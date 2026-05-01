import Button from "@/shared/ui/Button/Button"
import { Menu, MenuItem, Stack, Typography } from "@mui/material"
import { styles } from "./styles"
import { ID, ProposalListActions } from "@/shared/types/primitives.types"
import { useMemo, useState } from "react"
import { useAppSelector } from "@/shared/store/hooks"
import { IProposalsActionsProps } from "./ProposalsActions.types"
import { ProposalStatus } from "@/entities/proposal/model/types"
import getProposalListActions from "@/shared/utils/getProposalListActions"
import { proposalActionsDictionary } from "@/shared/data"

const ProposalsActions: React.FC<IProposalsActionsProps> = ({ user, proposals, isDisabled }) => {
    const selectedProposalsIds = useAppSelector(store => store.proposalsFilters.selectedIds)

    const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(null)
    const isActionsMenuOpened = !!actionsAnchorEl

    const availableActions: ProposalListActions[] = useMemo(() => {
        if (!user || !proposals || proposals.length === 0 || selectedProposalsIds.length === 0) return []

        const proposalsMap: Map<ID, ProposalStatus> = new Map(proposals.map(proposal => ([proposal.id, proposal.status])))

        const actions: ProposalListActions[][] = selectedProposalsIds.map(id => {
            const value = proposalsMap.get(id)
            if (!value) return []

            return getProposalListActions(user.role, value)
        })

        return actions[0].filter(action =>
            actions.every(arr => arr.includes(action))
        )

    }, [user, proposals, selectedProposalsIds])

    const sx = styles()

    const handleOpenActionsMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setActionsAnchorEl(event.currentTarget)
    }

    const handleCloseActionsMenu = () => {
        setActionsAnchorEl(null)
    }

    return <Stack direction='row' spacing={1} sx={sx.actionsWrapper}>
        <Button
            mode="button"
            variant="contained"
            size="small"
            isDisabled={isDisabled || selectedProposalsIds.length === 0}
            onClick={handleOpenActionsMenu}
        >
            Действия с выбранными заявками
        </Button>
        <Typography variant='body2'>Выбрано заявок: {selectedProposalsIds.length}</Typography>
        <Menu
            open={isActionsMenuOpened}
            anchorEl={actionsAnchorEl}
            onClose={handleCloseActionsMenu}
        >
            {availableActions.length !== 0 ? (availableActions.map((action) =>
                <MenuItem
                    key={`Actions-menu-item-${action}`}
                    onClick={handleCloseActionsMenu}
                >
                    {proposalActionsDictionary.get(action)}
                </MenuItem>))
                : (<MenuItem
                    key='actions-menu-item-empty}'
                    disabled
                >
                    Нет доступных действий
                </MenuItem>)}
        </Menu>
    </Stack>
}

export default ProposalsActions