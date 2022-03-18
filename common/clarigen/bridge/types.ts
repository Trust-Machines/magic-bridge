import { ClarityTypes, ContractCalls } from '@clarigen/core';

// prettier-ignore
export interface BridgeContract {
  concatBuffsFold: (b: Uint8Array, result: Uint8Array) => ContractCalls.Private<Uint8Array>;
  transfer: (amount: number | bigint, sender: string, recipient: string) => ContractCalls.Private<ClarityTypes.Response<boolean, bigint>>;
  updateUserInboundVolume: (user: string, amount: number | bigint) => ContractCalls.Private<boolean>;
  updateUserOutboundVolume: (user: string, amount: number | bigint) => ContractCalls.Private<boolean>;
  addFunds: (amount: number | bigint) => ContractCalls.Public<bigint, bigint>;
  escrowSwap: (block: {
  "header": Uint8Array;
  "height": bigint
    }, tx: Uint8Array, proof: {
  "hashes": Uint8Array[];
  "tree-depth": bigint;
  "tx-index": bigint
    }, outputIndex: number | bigint, sender: Uint8Array, recipient: Uint8Array, expirationBuff: Uint8Array, hash: Uint8Array, swapperBuff: Uint8Array, operatorId: number | bigint) => ContractCalls.Public<{
  "csv": bigint;
  "output-index": bigint;
  "redeem-script": Uint8Array;
  "sats": bigint;
  "sender-public-key": Uint8Array
    }, bigint>;
  finalizeOutboundSwap: (block: {
  "header": Uint8Array;
  "height": bigint
    }, tx: Uint8Array, proof: {
  "hashes": Uint8Array[];
  "tree-depth": bigint;
  "tx-index": bigint
    }, outputIndex: number | bigint, swapId: number | bigint) => ContractCalls.Public<boolean, bigint>;
  finalizeSwap: (txid: Uint8Array, preimage: Uint8Array) => ContractCalls.Public<boolean, bigint>;
  initializeSwapper: () => ContractCalls.Public<bigint, bigint>;
  initiateOutboundSwap: (xbtc: number | bigint, btcVersion: Uint8Array, btcHash: Uint8Array, operatorId: number | bigint) => ContractCalls.Public<bigint, bigint>;
  registerOperator: (publicKey: Uint8Array, inboundFee: bigint | null, outboundFee: bigint | null, outboundBaseFee: number | bigint, inboundBaseFee: number | bigint, name: string, funds: number | bigint) => ContractCalls.Public<bigint, bigint>;
  removeFunds: (amount: number | bigint) => ContractCalls.Public<bigint, bigint>;
  revokeExpiredOutbound: (swapId: number | bigint) => ContractCalls.Public<{
  "created-at": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "sats": bigint;
  "swapper": string;
  "version": Uint8Array;
  "xbtc": bigint
    }, bigint>;
  updateOperator: (publicKey: Uint8Array, inboundFee: bigint | null, outboundFee: bigint | null, outboundBaseFee: number | bigint, inboundBaseFee: number | bigint, name: string) => ContractCalls.Public<{
  "controller": string;
  "inbound-base-fee": bigint;
  "inbound-fee": bigint | null;
  "name": string;
  "outbound-base-fee": bigint;
  "outbound-fee": bigint | null;
  "public-key": Uint8Array
    }, bigint>;
  buffToU8: (byte: Uint8Array) => ContractCalls.ReadOnly<bigint>;
  bytesLen: (bytes: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  concatBuffs: (buffs: Uint8Array[]) => ContractCalls.ReadOnly<Uint8Array>;
  generateHtlcScript: (sender: Uint8Array, recipient: Uint8Array, expiration: Uint8Array, hash: Uint8Array, swapper: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  generateHtlcScriptHash: (sender: Uint8Array, recipient: Uint8Array, expiration: Uint8Array, hash: Uint8Array, swapper: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  generateOutput: (version: Uint8Array, hash: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  generateP2pkhOutput: (hash: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  generateP2shOutput: (hash: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  generateScriptHash: (script: Uint8Array) => ContractCalls.ReadOnly<Uint8Array>;
  getAmountWithFeeRate: (amount: number | bigint, feeRate: number | bigint) => ContractCalls.ReadOnly<bigint>;
  getCompletedOutboundSwapByTxid: (txid: Uint8Array) => ContractCalls.ReadOnly<bigint | null>;
  getCompletedOutboundSwapTxid: (id: number | bigint) => ContractCalls.ReadOnly<Uint8Array | null>;
  getEscrow: (id: number | bigint) => ContractCalls.ReadOnly<bigint | null>;
  getFullInbound: (txid: Uint8Array) => ContractCalls.ReadOnly<ClarityTypes.Response<{
  "csv": bigint;
  "expiration": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "output-index": bigint;
  "redeem-script": Uint8Array;
  "sats": bigint;
  "sender-public-key": Uint8Array;
  "swapper": bigint;
  "xbtc": bigint
    }, bigint>>;
  getFullOperator: (id: number | bigint) => ContractCalls.ReadOnly<ClarityTypes.Response<{
  "controller": string;
  "escrow": bigint;
  "funds": bigint;
  "inbound-base-fee": bigint;
  "inbound-fee": bigint | null;
  "name": string;
  "outbound-base-fee": bigint;
  "outbound-fee": bigint | null;
  "public-key": Uint8Array
    }, bigint>>;
  getFunds: (id: number | bigint) => ContractCalls.ReadOnly<bigint>;
  getInboundMeta: (txid: Uint8Array) => ContractCalls.ReadOnly<{
  "csv": bigint;
  "output-index": bigint;
  "redeem-script": Uint8Array;
  "sats": bigint;
  "sender-public-key": Uint8Array
    } | null>;
  getInboundSwap: (txid: Uint8Array) => ContractCalls.ReadOnly<{
  "expiration": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "swapper": bigint;
  "xbtc": bigint
    } | null>;
  getNextOperatorId: () => ContractCalls.ReadOnly<bigint>;
  getNextOutboundId: () => ContractCalls.ReadOnly<bigint>;
  getNextSwapperId: () => ContractCalls.ReadOnly<bigint>;
  getOperator: (id: number | bigint) => ContractCalls.ReadOnly<{
  "controller": string;
  "inbound-base-fee": bigint;
  "inbound-fee": bigint | null;
  "name": string;
  "outbound-base-fee": bigint;
  "outbound-fee": bigint | null;
  "public-key": Uint8Array
    } | null>;
  getOperatorByName: (name: string) => ContractCalls.ReadOnly<bigint | null>;
  getOperatorIdByController: (controller: string) => ContractCalls.ReadOnly<bigint | null>;
  getOperatorIdByPublicKey: (publicKey: Uint8Array) => ContractCalls.ReadOnly<bigint | null>;
  getOutboundSwap: (id: number | bigint) => ContractCalls.ReadOnly<{
  "created-at": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "sats": bigint;
  "swapper": string;
  "version": Uint8Array;
  "xbtc": bigint
    } | null>;
  getPreimage: (txid: Uint8Array) => ContractCalls.ReadOnly<Uint8Array | null>;
  getSwapAmount: (amount: number | bigint, feeRate: number | bigint, baseFee: number | bigint) => ContractCalls.ReadOnly<ClarityTypes.Response<bigint, bigint>>;
  getSwapperId: (swapper: string) => ContractCalls.ReadOnly<bigint | null>;
  getSwapperPrincipal: (id: number | bigint) => ContractCalls.ReadOnly<string | null>;
  getTotalInboundVolume: () => ContractCalls.ReadOnly<bigint>;
  getTotalOutboundVolume: () => ContractCalls.ReadOnly<bigint>;
  getTotalVolume: () => ContractCalls.ReadOnly<bigint>;
  getUserInboundVolume: (user: string) => ContractCalls.ReadOnly<bigint>;
  getUserOutboundVolume: (user: string) => ContractCalls.ReadOnly<bigint>;
  getUserTotalVolume: (user: string) => ContractCalls.ReadOnly<bigint>;
  readUint32: (num: Uint8Array, length: number | bigint) => ContractCalls.ReadOnly<ClarityTypes.Response<bigint, bigint>>;
  validateBtcAddr: (version: Uint8Array, hash: Uint8Array) => ContractCalls.ReadOnly<ClarityTypes.Response<boolean, bigint>>;
  validateExpiration: (expiration: number | bigint, minedHeight: number | bigint) => ContractCalls.ReadOnly<ClarityTypes.Response<boolean, bigint>>;
  validateFee: (feeOpt: bigint | null) => ContractCalls.ReadOnly<ClarityTypes.Response<boolean, bigint>>;
  validateOutboundRevocable: (swapId: number | bigint) => ContractCalls.ReadOnly<ClarityTypes.Response<{
  "created-at": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "sats": bigint;
  "swapper": string;
  "version": Uint8Array;
  "xbtc": bigint
    }, bigint>>;
  completedOutboundSwapTxids: (key: Uint8Array) => ContractCalls.Map<Uint8Array, bigint>;
  completedOutboundSwaps: (key: number | bigint) => ContractCalls.Map<number | bigint, Uint8Array>;
  inboundMeta: (key: Uint8Array) => ContractCalls.Map<Uint8Array, {
  "csv": bigint;
  "output-index": bigint;
  "redeem-script": Uint8Array;
  "sats": bigint;
  "sender-public-key": Uint8Array
    }>;
  inboundPreimages: (key: Uint8Array) => ContractCalls.Map<Uint8Array, Uint8Array>;
  inboundSwaps: (key: Uint8Array) => ContractCalls.Map<Uint8Array, {
  "expiration": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "swapper": bigint;
  "xbtc": bigint
    }>;
  operatorByController: (key: string) => ContractCalls.Map<string, bigint>;
  operatorById: (key: number | bigint) => ContractCalls.Map<number | bigint, {
  "controller": string;
  "inbound-base-fee": bigint;
  "inbound-fee": bigint | null;
  "name": string;
  "outbound-base-fee": bigint;
  "outbound-fee": bigint | null;
  "public-key": Uint8Array
    }>;
  operatorByName: (key: string) => ContractCalls.Map<string, bigint>;
  operatorByPublicKey: (key: Uint8Array) => ContractCalls.Map<Uint8Array, bigint>;
  operatorEscrow: (key: number | bigint) => ContractCalls.Map<number | bigint, bigint>;
  operatorFunds: (key: number | bigint) => ContractCalls.Map<number | bigint, bigint>;
  outboundSwaps: (key: number | bigint) => ContractCalls.Map<number | bigint, {
  "created-at": bigint;
  "hash": Uint8Array;
  "operator": bigint;
  "sats": bigint;
  "swapper": string;
  "version": Uint8Array;
  "xbtc": bigint
    }>;
  swapperById: (key: number | bigint) => ContractCalls.Map<number | bigint, string>;
  swapperByPrincipal: (key: string) => ContractCalls.Map<string, bigint>;
  userInboundVolumeMap: (key: string) => ContractCalls.Map<string, bigint>;
  userOutboundVolumeMap: (key: string) => ContractCalls.Map<string, bigint>;
}
