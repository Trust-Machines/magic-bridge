export const devnetDeployment = {
  id: 0,
  name: 'Devnet deployment',
  network: 'devnet',
  node: 'http://localhost:20443',
  plan: {
    batches: [
      {
        id: 0,
        transactions: [
          {
            'contract-publish': {
              'contract-name': 'clarity-bitcoin',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/clarity-bitcoin.clar',
              cost: 412540,
            },
          },
          {
            'contract-publish': {
              'contract-name': 'ft-trait',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/ft-trait.clar',
              cost: 8400,
            },
          },
          {
            'contract-publish': {
              'contract-name': 'xbtc',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/xbtc.clar',
              cost: 11570,
            },
          },
          {
            'contract-publish': {
              'contract-name': 'bridge',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/bridge.clar',
              cost: 301490,
            },
          },
          {
            'contract-publish': {
              'contract-name': 'test-utils',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/test/test-utils.clar',
              cost: 4970,
            },
          },
          {
            'contract-publish': {
              'contract-name': 'supplier-wrapper',
              'expected-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              path: 'contracts/supplier-wrapper.clar',
              cost: 23340,
            },
          },
        ],
      },
    ],
  },
} as const;
