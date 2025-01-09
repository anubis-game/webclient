export const RegistryAbiV040 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "ben",
        type: "address",
      },
      {
        internalType: "address",
        name: "tok",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "buy",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "why",
        type: "string",
      },
    ],
    name: "Address",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "why",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "bal",
        type: "uint256",
      },
    ],
    name: "Balance",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "why",
        type: "string",
      },
    ],
    name: "Process",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "StringsInsufficientHexLength",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "grd",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "kil",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "win",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "los",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dep",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buy",
        type: "uint256",
      },
    ],
    name: "GuardianResolve",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pla",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "grd",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "kil",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "win",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "los",
        type: "address",
      },
    ],
    name: "WitnessPublish",
    type: "event",
  },
  {
    inputs: [],
    name: "BASIS_FEE",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASIS_GUARDIAN",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASIS_PROTOCOL",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASIS_SPLIT",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASIS_TOTAL",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bal",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "tim",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "sig",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "sgn",
        type: "bytes",
      },
    ],
    name: "Deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "tim",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "wal",
        type: "address",
      },
    ],
    name: "DepositMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "grd",
        type: "address",
      },
    ],
    name: "Escape",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "KILL_STATE_ESCAPE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "KILL_STATE_RELEASE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "kil",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "win",
        type: "address",
      },
      {
        internalType: "address",
        name: "los",
        type: "address",
      },
    ],
    name: "Publish",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "mes",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "sgn",
        type: "bytes",
      },
    ],
    name: "RecoverSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "los",
        type: "address",
      },
    ],
    name: "Release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "grd",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "tim",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "wal",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "sgn",
        type: "bytes",
      },
    ],
    name: "Request",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "grd",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "tim",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "pla",
        type: "address",
      },
    ],
    name: "RequestMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "kil",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "win",
        type: "address",
      },
      {
        internalType: "address",
        name: "los",
        type: "address",
      },
    ],
    name: "Resolve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wal",
        type: "address",
      },
    ],
    name: "SearchBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wal",
        type: "address",
      },
    ],
    name: "SearchSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ben",
        type: "address",
      },
    ],
    name: "UpdateBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bal",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "beneficiary",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
