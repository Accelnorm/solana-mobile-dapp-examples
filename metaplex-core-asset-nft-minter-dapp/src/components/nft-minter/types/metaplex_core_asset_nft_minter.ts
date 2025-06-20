/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/metaplex_core_asset_nft_minter.json`.
 */
export type MetaplexCoreAssetNftMinter = {
  "address": "AU7v6oJmoHWwHPNCAjSzjbCQpgvi8ZZ4vKGNZ33ScwJT",
  "metadata": {
    "name": "metaplexCoreAssetNftMinter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCoreAsset",
      "discriminator": [
        11,
        133,
        33,
        184,
        158,
        20,
        227,
        195
      ],
      "accounts": [
        {
          "name": "asset",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection",
          "writable": true,
          "optional": true
        },
        {
          "name": "authority",
          "signer": true,
          "optional": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "optional": true
        },
        {
          "name": "updateAuthority",
          "optional": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createAssetArgs"
            }
          }
        }
      ]
    }
  ],
  "types": [
    {
      "name": "createAssetArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    }
  ]
};
