import { primaryGaiaHubConfigAtom, stacksSessionAtom } from '@micro-stacks/react';
import { useAtom } from 'jotai';
import { atomFamilyWithQuery, useQueryAtom } from 'jotai-query-toolkit';
import { useAtomValue } from 'jotai/utils';
import { bytesToHex, hexToBytes } from 'micro-stacks/common';
import { getRandomBytes } from 'micro-stacks/crypto';
import { hashSha256 } from 'micro-stacks/crypto-sha';
import { getFile } from 'micro-stacks/storage';
import { generateHTLCAddress } from '../htlc';
import { Supplier, QueryKeys } from './index';
import { atomWithQuery } from 'jotai-query-toolkit';
import { fetchPrivate } from 'micro-stacks/common';

export interface InboundSwapStarted {
  id: string;
  supplier: Supplier;
  createdAt: number;
  secret: string;
  expiration: number;
  publicKey: string;
  inputAmount: string;
}

export interface InboundSwapReady extends InboundSwapStarted {
  address: string;
  swapperId: number;
}

export interface InboundSwapWarned extends InboundSwapReady {
  warned: true;
}

export interface InboundSwapSent extends InboundSwapReady {
  btcTxid: string;
  satsAmount: string;
  outputIndex: number;
}

export interface InboundSwapEscrowed extends InboundSwapSent {
  escrowTxid: string;
}

export interface InboundSwapRecovered extends InboundSwapEscrowed {
  recoveryTxid: string;
}

export interface InboundSwapFinalized extends InboundSwapEscrowed {
  finalizeTxid: string;
}

export type InboundSwap =
  | InboundSwapStarted
  | InboundSwapReady
  | InboundSwapWarned
  | InboundSwapSent
  | InboundSwapEscrowed
  | InboundSwapRecovered
  | InboundSwapFinalized;

export function getSwapStep(swap: InboundSwap) {
  if ('finalizeTxid' in swap) return 'finalize';
  if ('escrowTxid' in swap) return 'escrowed';
  if ('btcTxid' in swap) return 'sent';
  if ('warned' in swap) return 'warned';
  if ('swapperId' in swap) return 'ready';
  return 'start';
}

export type SwapStep = ReturnType<typeof getSwapStep>;

export function createId() {
  return `${new Date().getTime()}`;
}

export function createInboundSwap({
  supplier: supplier,
  swapperId,
  publicKey,
  inputAmount,
  expiration = 500,
}: {
  supplier: Supplier;
  swapperId?: number;
  publicKey: string;
  inputAmount: string;
  expiration?: number;
}): InboundSwapStarted | InboundSwapReady {
  const secret = getRandomBytes(32);
  const swap = {
    id: createId(),
    secret: bytesToHex(secret),
    createdAt: new Date().getTime(),
    supplier,
    publicKey,
    inputAmount,
    expiration,
  };
  if (swapperId !== undefined) {
    return createReadySwap(swap, swapperId);
  }
  return swap;
}

export function createReadySwap(swap: InboundSwapStarted, swapperId: number): InboundSwapReady {
  const { secret, publicKey, supplier } = swap;
  const hash = hashSha256(hexToBytes(secret));
  const payment = generateHTLCAddress({
    senderPublicKey: Buffer.from(publicKey, 'hex'),
    recipientPublicKey: Buffer.from(supplier.publicKey, 'hex'),
    swapper: swapperId,
    hash: Buffer.from(hash),
    expiration: swap.expiration,
  });
  return {
    ...swap,
    address: payment.address!,
    swapperId,
  };
}

export const SWAP_STORAGE_PREFIX = 'swaps-v6/';
export const INBOUND_SWAP_STORAGE_PREFIX = 'inbounds';
export const OUTBOUND_SWAP_STORAGE_PREFIX = 'outbounds';

export function inboundSwapKey(id: string) {
  return `${SWAP_STORAGE_PREFIX}${id}/${INBOUND_SWAP_STORAGE_PREFIX}`;
}

export const inboundSwapState = atomFamilyWithQuery<string, InboundSwap>(
  (get, param) => [QueryKeys.INBOUND_SWAPS, param],
  async (get, param) => {
    const session = get(stacksSessionAtom);
    const config = get(primaryGaiaHubConfigAtom);
    if (!config || !session) throw new Error('Not logged in');
    const key = inboundSwapKey(param);
    const contents = (await getFile(key, {
      gaiaHubConfig: config,
      privateKey: session.appPrivateKey,
    })) as string;
    const swap = JSON.parse(contents) as InboundSwapStarted;
    return swap;
  }
);

export const useInboundSwapStorage = (id: string) => useQueryAtom(inboundSwapState(id));

// outbound swaps
export interface OutboundSwapStarted {
  txId: string;
  id: string;
  createdAt: number;
  amount: string;
}

export function outboundSwapKey(id: string) {
  return `${SWAP_STORAGE_PREFIX}${id}/${OUTBOUND_SWAP_STORAGE_PREFIX}`;
}

export const outboundSwapStorageState = atomFamilyWithQuery<string, OutboundSwapStarted>(
  (get, param) => [QueryKeys.OUTBOUND_SWAPS_STORAGE, param],
  async (get, param) => {
    const session = get(stacksSessionAtom);
    const config = get(primaryGaiaHubConfigAtom);
    if (!config || !session) throw new Error('Not logged in');
    const key = outboundSwapKey(param);
    const contents = (await getFile(key, {
      gaiaHubConfig: config,
      privateKey: session.appPrivateKey,
    })) as string;
    const swap = JSON.parse(contents) as OutboundSwapStarted;
    return swap;
  }
);

export interface ListFilesResponse {
  entries: string[];
  nextPage: string;
}

export interface SwapListItem {
  dir: 'inbound' | 'outbound';
  id: string;
}

export const swapsListState = atomWithQuery<SwapListItem[]>(QueryKeys.SWAPS_LIST, async get => {
  const session = get(stacksSessionAtom);
  const hubConfig = get(primaryGaiaHubConfigAtom);
  if (!session || !hubConfig) return [];
  const pageRequest = JSON.stringify({ page: 0 });
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': `${pageRequest.length}`,
      Authorization: `bearer ${hubConfig.token}`,
    },
    body: pageRequest,
  };
  const response = await fetchPrivate(
    `${hubConfig.server}/list-files/${hubConfig.address}`,
    fetchOptions
  );
  if (!response.ok) {
    console.error(await response.text());
    throw new Error('Error in response');
  }
  const responseData = (await response.json()) as ListFilesResponse;
  const entries = responseData.entries
    .filter(path => path.startsWith(SWAP_STORAGE_PREFIX))
    .map(path => {
      const parts = path.split('/');
      const id = parts[1];
      const dir = path.includes(OUTBOUND_SWAP_STORAGE_PREFIX) ? 'outbound' : 'inbound';
      return {
        dir,
        id,
      } as SwapListItem;
    })
    .reverse();
  return entries;
});

export const useSwapKeys = () => useQueryAtom(swapsListState);
