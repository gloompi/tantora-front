module.exports = {
  "schema": [
    "http://localhost:9999/graphql",
    {
      "http://localhost:9999/graphql/private": {
          "headers": {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6IjBmOGNhMjU3LTE1ZTgtNDRkYy1hZTg2LWIyNWRkMjJhYjQzZCIsImF1dGhvcml6ZWQiOnRydWUsImV4cCI6MTYyMDQ5MTU0MSwidXNlcl9pZCI6IjIifQ.GXLVpV1gyXI0cmGsbjfBQkMPfCaVbIWqTUbJxQXM3tk"
          }
      }
    }
  ],
  "documents": [
      "./src/**/*.tsx",
      "./src/**/*.ts"
  ],
  "overwrite": true,
  "generates": {
      "./src/generated/graphql.tsx": {
          "plugins": [
              "typescript",
              "typescript-operations",
              "typescript-react-apollo"
          ],
          "config": {
            "skipTypename": false,
            "withHooks": true,
            "withHOC": false,
            "withComponent": false
          }
      },
      "./graphql.schema.json": {
        "plugins": [
              "introspection"
        ]
      }
  }
};