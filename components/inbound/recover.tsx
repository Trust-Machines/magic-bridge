import React, { useCallback, useMemo } from 'react';
import { useInboundSwap } from '../../common/hooks/use-inbound-swap';
import { Stack, Flex } from '@nelson-ui/react';
import { useBtcTx, useStxTx, useCoreApiInfo } from '../../common/store/api';
import { Alert, AlertHeader, AlertText } from '../alert';
import { Text } from '../text';
import { ErrorIcon } from '../icons/error';
import { Button } from '../button';
import { useInput } from '../../common/hooks/use-input';
import { useAtom } from 'jotai';
import { btcAddressState } from '../../common/store';
import { useRecoverSwap } from '../../common/hooks/use-recover-swap';
import { Input } from '../form';
import { useWaitTime } from '../../common/hooks/use-wait-time';

export const SwapRedeem: React.FC = () => {
  const { swap, updateSwap } = useInboundSwap();
  if (!('escrowTxid' in swap)) throw new Error('Invalid swap state');
  const [escrowTx] = useStxTx(swap.escrowTxid);
  const [btcTx] = useBtcTx(swap.btcTxid, swap.address);
  const [coreInfo] = useCoreApiInfo();
  const btcAddress = useInput(useAtom(btcAddressState));
  const { submit, txid } = useRecoverSwap();

  const submitRedeem = useCallback(async () => {
    await submit();
  }, [submit]);

  const confirmBlock = btcTx.burnHeight;
  const currentBlock = coreInfo.burn_block_height;
  const waitBlocks = confirmBlock - currentBlock + swap.expiration;
  const isExpired = waitBlocks <= 0;

  const waitTime = useWaitTime(waitBlocks);

  if (escrowTx?.status !== 'abort_by_response') return null;
  if ('recoveryTxid' in swap) return null;

  return (
    <Alert>
      <Stack spacing="$2">
        <AlertHeader>Supplier no longer has enough xBTC</AlertHeader>
        {isExpired ? (
          <>
            <AlertText>You can now safely withdraw your BTC from escrow.</AlertText>
            <AlertText>Enter the BTC address you&apos;d like to return funds to:</AlertText>
            {txid ? (
              <Text variant="Body02">{txid}</Text>
            ) : (
              <Stack spacing="$4" mt="$4">
                <Input {...btcAddress} placeholder="Enter a non-segwit address" />
                <Button onClick={submitRedeem}>Continue</Button>
              </Stack>
            )}
          </>
        ) : (
          <>
            <AlertText>
              Something is wrong with the supplier. They may add funds momentarily or you may need
              to cancel and recover.{' '}
            </AlertText>
            <AlertText>
              Your funds are safely escrowed, but for security you can only remove them {waitBlocks}{' '}
              blocks from now ({waitTime}).
            </AlertText>
            <AlertText>
              You can return to this swap anytime from your history page to check the countdown.
            </AlertText>
          </>
        )}
      </Stack>
    </Alert>
  );
};
