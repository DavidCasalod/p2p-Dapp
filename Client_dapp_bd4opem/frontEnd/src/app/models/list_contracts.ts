export interface ListContracts { 
    contractID: string,
    business_parameters: {
      accountID: string,
      contractType: string,
      contractName: string,
      contractedByOrgID: string,
      contractedByEmail: string,
      contractProviderID: string,
      contractProviderURL: string,
      contractStart: Date,
      contractEnd: Date,
      payment: string
    },
    version: number,
    status: string,
    service_parameters: {
      service_product_id: string,
      service_name: string,
      service_provisioning_type: string,
      service_execution_parameters: {
        selectedComposition: Array<JSON>,
        selectedData: [
          {
            id: string,
            name: string,
            selected: boolean
          }
        ]
      },
      selectedTecnicalParameters: Array<JSON>
    },
    data_parameters: [
      {
        dataId: string,
        dataName: string,
        dataDescription: string
      }
    ]
}